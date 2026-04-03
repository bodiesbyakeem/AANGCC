import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setAll(cookiesToSet: any[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }: any) => {
                cookieStore.set(name, value, options);
              });
            } catch {}
          },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get member record with stripe_customer_id
    const { data: member, error: memberError } = await supabase
      .from("members")
      .select("stripe_customer_id, email, full_name")
      .eq("id", user.id)
      .single();

    if (memberError || !member) {
      return NextResponse.json({ error: "Member record not found" }, { status: 404 });
    }

    let customerId = member.stripe_customer_id;

    // If no Stripe customer exists yet, create one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: member.email || user.email || undefined,
        name: member.full_name || undefined,
        metadata: { supabase_user_id: user.id },
      });

      customerId = customer.id;

      // Save the new customer ID back to Supabase
      await supabase
        .from("members")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Create Stripe billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/portal`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json({ error: "Failed to create billing session" }, { status: 500 });
  }
}
