import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Max 3 checkout attempts per IP per 10 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    // Rate limit check
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please wait 10 minutes and try again." },
        { status: 429 }
      );
    }

    const { priceId, email, full_name, password, membership_type } = await request.json();

    if (!priceId || !email || !full_name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
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
    const { error: memberError } = await supabaseAdmin.from("members").insert({
      id: userId, email, full_name, membership_type,
      membership_status: "pending", is_active: false,
      stripe_customer_id: customer.id,
      joined_at: new Date().toISOString(),
    });

    if (memberError) {
      console.error("Member insert error:", memberError);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Failed to create member record" }, { status: 500 });
    }

    const TRIAL_PRICE_IDS: Record<string, string> = {
      "price_1TLr2l1NFAGhz748RgkDuoxr": "price_1TIHiO1NFAGhz748kcFMxZN6",
      "price_1TLr4J1NFAGhz748ChDNAabI": "price_1TIHkZ1NFAGhz748uQt3jF0e",
    };
    const isTrialPrice = priceId in TRIAL_PRICE_IDS;
    const regularPriceId = TRIAL_PRICE_IDS[priceId] || null;

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membership/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membership/join`,
      metadata: {
        supabase_user_id: userId, membership_type,
        is_trial: isTrialPrice ? "true" : "false",
        regular_price_id: regularPriceId || "",
      },
      subscription_data: {
        metadata: {
          supabase_user_id: userId, membership_type,
          is_trial: isTrialPrice ? "true" : "false",
          regular_price_id: regularPriceId || "",
        },
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
