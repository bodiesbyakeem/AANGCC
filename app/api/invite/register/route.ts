import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { token, email, password, full_name, membership_type } = await request.json();

    if (!token || !email || !password || !full_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate token again
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from("invites")
      .select("*")
      .eq("token", token)
      .single();

    if (inviteError || !invite) {
      return NextResponse.json({ error: "Invalid invite token" }, { status: 400 });
    }

    if (invite.used_at) {
      return NextResponse.json({ error: "This invite has already been used" }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: "This invite has expired" }, { status: 400 });
    }

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (authError || !authData.user) {
      console.error("Auth create error:", authError);
      return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 });
    }

    // Create member record
    const { error: memberError } = await supabaseAdmin.from("members").insert({
      id: authData.user.id,
      full_name,
      email,
      membership_type,
      membership_status: "active",
      is_active: true,
      invited_by: invite.inviter_id,
      invite_status: "accepted",
      waiver_signed: false,
      joined_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (memberError) {
      console.error("Member insert error:", memberError);
      // Clean up auth user if member insert fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: "Failed to create member record." }, { status: 500 });
    }

    // Mark invite as used
    await supabaseAdmin.from("invites").update({
      used_at: new Date().toISOString(),
    }).eq("token", token);

    // Send welcome email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Akeem at AANGCC <info@allassnogascyclingclub.com>",
          to: [email],
          subject: "Welcome to AANGCC — your account is active!",
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #111;">Welcome to AANGCC, ${full_name}!</h1>
              <p style="color: #444; font-size: 15px; line-height: 1.7;">
                Your account has been activated. Sign in to the member portal to sign your waiver and complete your profile.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${SITE_URL}/membership/members-only"
                  style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                  Sign In to Portal →
                </a>
              </div>
              <p style="color: #888; font-size: 12px;">
                Questions? <a href="mailto:info@allassnogascyclingclub.com" style="color: #14CFC4;">info@allassnogascyclingclub.com</a>
              </p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
