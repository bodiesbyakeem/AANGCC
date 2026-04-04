import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Use service role for webhook updates (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const status = subscription.status;
        const isActive = status === "active" || status === "trialing";
        const renewalDate = new Date(subscription.current_period_end * 1000).toISOString().split("T")[0];

        await supabase
          .from("members")
          .update({
            membership_status: status,
            is_active: isActive,
            renewal_date: renewalDate,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await supabase
          .from("members")
          .update({
            membership_status: "cancelled",
            is_active: false,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Refresh renewal date from subscription if available
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          const renewalDate = new Date(subscription.current_period_end * 1000)
            .toISOString()
            .split("T")[0];

          await supabase
            .from("members")
            .update({
              membership_status: "active",
              is_active: true,
              renewal_date: renewalDate,
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }
case "checkout.session.completed": {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.supabase_user_id;
  const customerId = session.customer as string;

  if (userId) {
    await supabase
      .from("members")
      .update({
        membership_status: "active",
        is_active: true,
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);
  }
  break;
}
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        await supabase
          .from("members")
          .update({
            membership_status: "past_due",
            is_active: false,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
