import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const INVITE_EXPIRY_HOURS = 48;

export async function POST(request: Request) {
  try {
    const { member_id, email, full_name, membership_type } = await request.json();

    if (!email || !full_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate fresh 48-hour token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + INVITE_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    // Get the inviter_id from the member record
    const { data: memberRecord } = await supabaseAdmin
      .from("members")
      .select("invited_by, membership_type")
      .eq("email", email)
      .single();

    const inviterId = memberRecord?.invited_by || null;
    const membershipType = membership_type || memberRecord?.membership_type || "Individual";

    // Invalidate any existing unused tokens for this email
    await supabaseAdmin
      .from("invites")
      .update({ used_at: new Date().toISOString() })
      .eq("invitee_email", email)
      .is("used_at", null);

    // Insert fresh invite token
    const { error: inviteError } = await supabaseAdmin.from("invites").insert({
      token,
      inviter_id: inviterId,
      invitee_email: email,
      invitee_name: full_name,
      membership_type: membershipType,
      expires_at: expiresAt,
    });

    if (inviteError) {
      console.error("Invite insert error:", inviteError);
      return NextResponse.json({ error: "Failed to generate invite token." }, { status: 500 });
    }

    // Update member record to reflect resent invite
    if (member_id) {
      await supabaseAdmin.from("members").update({
        invite_status: "pending",
        updated_at: new Date().toISOString(),
      }).eq("id", member_id);
    }

    // Send branded 48-hour invite email
    const inviteUrl = `${SITE_URL}/invite?token=${token}`;

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
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
              <div style="text-align: center; margin-bottom: 32px;">
                <img src="${SITE_URL}/images/club-logo.png" alt="AANGCC" style="width: 72px; height: 72px; object-fit: contain;" />
              </div>

              <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">Your AANGCC Invite Has Been Resent</h1>

              <p style="color: #444; font-size: 15px; line-height: 1.7;">Hi ${full_name},</p>
              <p style="color: #444; font-size: 15px; line-height: 1.7;">
                Your invitation to join All Ass No Gas Cycling Club has been resent with a fresh link. Click the button below to activate your account.
              </p>

              <div style="background: #fff8e1; border-radius: 12px; padding: 16px; margin: 24px 0; border-left: 4px solid #FFD84D;">
                <p style="color: #8a7000; font-size: 13px; margin: 0; font-weight: 600;">⏰ This invite link expires in 48 hours</p>
                <p style="color: #8a7000; font-size: 12px; margin: 4px 0 0;">Please activate your account before ${new Date(expiresAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}</p>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${inviteUrl}"
                  style="background: #14CFC4; color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; display: inline-block;">
                  Activate My Account →
                </a>
              </div>

              <p style="color: #888; font-size: 12px; text-align: center;">
                If the button doesn't work, copy and paste this link:<br/>
                <a href="${inviteUrl}" style="color: #14CFC4; word-break: break-all;">${inviteUrl}</a>
              </p>

              <p style="color: #444; font-size: 14px; margin-top: 32px;">See you on the road,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
              <p style="color: #aaa; font-size: 11px; text-align: center;">
                All Ass No Gas Cycling Club · Austin, Texas<br />
                <a href="${SITE_URL}" style="color: #14CFC4; text-decoration: none;">allassnogascyclingclub.com</a>
              </p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Fresh 48-hour invite sent to ${email}`,
      expires_at: expiresAt,
    });

  } catch (error) {
    console.error("Resend invite error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
