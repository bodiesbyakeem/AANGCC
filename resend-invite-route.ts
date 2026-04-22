import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY!;

export async function POST(request: Request) {
  try {
    const { member_id, email, full_name } = await request.json();

    if (!member_id || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Delete existing auth user so we can re-invite
    await supabaseAdmin.auth.admin.deleteUser(member_id);

    // Re-invite via Supabase
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo: `${SITE_URL}/auth/confirm`,
        data: { full_name },
      }
    );

    if (inviteError || !inviteData?.user) {
      return NextResponse.json({ error: "Failed to resend invite" }, { status: 500 });
    }

    // Update member record with new auth user ID
    await supabaseAdmin.from("members").update({
      id: inviteData.user.id,
      invite_status: "pending",
      updated_at: new Date().toISOString(),
    }).eq("id", member_id);

    // Send branded email
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
          subject: "Your AANGCC invitation — activate your account",
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #111;">Hi ${full_name},</h1>
              <p style="color: #444; font-size: 15px; line-height: 1.7;">
                Your invitation to join All Ass No Gas Cycling Club has been resent. Click the link in the Supabase system email you just received to activate your account and set your password.
              </p>
              <p style="color: #444; font-size: 15px; line-height: 1.7;">
                Once activated, sign in at the link below to access the member portal.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${SITE_URL}/membership/members-only"
                  style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                  Sign In to AANGCC →
                </a>
              </div>
              <p style="color: #888; font-size: 12px;">
                Questions? Contact us at <a href="mailto:info@allassnogascyclingclub.com" style="color: #14CFC4;">info@allassnogascyclingclub.com</a>
              </p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend invite error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
