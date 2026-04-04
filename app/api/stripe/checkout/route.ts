import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Use service role to create auth users
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { priceId, email, full_name, password, membership_type } = await request.json();

    if (!priceId || !email || !full_name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find((u) => u.email === email);

    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists. Please sign in instead." }, { status: 400 });
    }

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (authError || !authData.user) {
      console.error("Auth error:", authError);
      return NextResponse.json({ error: authError?.message || "Failed to create account" }, { status: 500 });
    }

    const userId = authData.user.id;

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      name: full_name,
      metadata: { supabase_user_id: userId },
    });

    // Create member record in Supabase
    const { error: memberError } = await supabaseAdmin
      .from("members")
      .insert({
        id: userId,
        email,
        full_name,
        membership_type,
        membership_status: "pending",
        is_active: false,
        stripe_customer_id: customer.id,
        joined_at: new Date().toISOString(),
      });

    if (memberError) {
      console.error("Member insert error:", memberError);
      // Clean up auth user if member insert fails
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Failed to create member record" }, { status: 500 });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membership/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membership/join`,
      metadata: {
        supabase_user_id: userId,
        membership_type,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: userId,
          membership_type,
        },
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
