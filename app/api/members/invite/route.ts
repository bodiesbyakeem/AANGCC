import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = "Akeem at AANGCC <info@allassnogascyclingclub.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      inviter_id,
      inviter_name,
      inviter_email,
      invitee_name,
      invitee_email,
      membership_type,
      stripe_customer_id,
    } = body;

    if (!inviter_id || !invitee_name || !invitee_email || !membership_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check membership tier allows invites
    const allowedTiers = ["Family", "Small Business", "Corporate"];
    if (!allowedTiers.includes(membership_type)) {
      return NextResponse.json(
        { error: "Your membership tier does not support additional members." },
        { status: 403 }
      );
    }

    // Check if invitee email already exists
    const { data: existingUser } = await supabaseAdmin
      .from("members")
      .select("id, email")
      .eq("email", invitee_email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "A member with this email address already exists." },
        { status: 409 }
      );
    }

    // Get inviter's member record for renewal date
    const { data: inviterMember } = await supabaseAdmin
      .from("members")
      .select("renewal_date, membership_status")
      .eq("id", inviter_id)
      .single();

    // Send Supabase invite email
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      invitee_email,
      {
        redirectTo: `${SITE_URL}/auth/confirm`,
        data: {
          full_name: invitee_name,
          invited_by: inviter_id,
          membership_type,
        },
      }
    );

    if (inviteError || !inviteData?.user) {
      console.error("Supabase invite error:", inviteError);
      return NextResponse.json(
        { error: "Failed to send invite. Please try again." },
        { status: 500 }
      );
    }

    // Create member record for invitee
    await supabaseAdmin.from("members").insert({
      id: inviteData.user.id,
      full_name: invitee_name,
      email: invitee_email,
      membership_type,
      membership_status: "pending",
      is_active: false,
      invited_by: inviter_id,
      invite_status: "pending",
      stripe_customer_id: stripe_customer_id || null,
      renewal_date: inviterMember?.renewal_date || null,
      joined_at: new Date().toISOString(),
      waiver_signed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      user_id: inviter_id,
      action: "member_invited",
      entity: "members",
      entity_id: inviteData.user.id,
      metadata: {
        inviter_name,
        inviter_email,
        invitee_name,
        invitee_email,
        membership_type,
        timestamp: new Date().toISOString(),
      },
    });

    // Send branded invite email via Resend
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: FROM,
            to: [invitee_email],
            subject: `${inviter_name} invited you to join AANGCC`,
            html: `
              <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <img src="${SITE_URL}/images/club-logo.png" alt="AANGCC" style="width: 72px; height: 72px; object-fit: contain;" />
                </div>

                <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">You've been invited to AANGCC!</h1>
                <p style="color: #888; font-size: 13px; margin-bottom: 24px;">${membership_type} Membership · Austin, Texas</p>

                <p style="color: #444; font-size: 15px; line-height: 1.7;">Hi ${invitee_name},</p>
                <p style="color: #444; font-size: 15px; line-height: 1.7;">
                  <strong>${inviter_name}</strong> has invited you to join All Ass No Gas Cycling Club as part of their <strong>${membership_type} Membership</strong>. You'll get full access to the member portal, group rides, club events, and the AANGCC community.
                </p>

                <div style="background: #f0fffe; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">What's included with your membership</p>
                  <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
                    <li>Weekly group rides in Austin every Saturday</li>
                    <li>Access to the members-only portal</li>
                    <li>Club newsletter and event updates</li>
                    <li>Charity ride participation — MS Society, ALZ, Rosedale</li>
                    <li>Member directory and messaging</li>
                  </ul>
                </div>

                <p style="color: #444; font-size: 15px; line-height: 1.7;">
                  To get started, click the button below to set your password and activate your account. You'll then be asked to sign your Waiver of Liability before your first ride.
                </p>

                <div style="text-align: center; margin: 32px 0;">
                  <p style="color: #888; font-size: 12px; margin-bottom: 12px;">Check your Supabase invite email for the activation link, or click below once you've set your password:</p>
                  <a href="${SITE_URL}/membership/members-only"
                    style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                    Sign In to AANGCC →
                  </a>
                </div>

                <p style="color: #444; font-size: 14px; line-height: 1.7;">
                  Questions? Reply to this email or contact us at <a href="mailto:info@allassnogascyclingclub.com" style="color: #14CFC4;">info@allassnogascyclingclub.com</a>
                </p>

                <p style="color: #444; font-size: 14px;">See you on the road,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>

                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
                <p style="color: #aaa; font-size: 11px; text-align: center;">
                  All Ass No Gas Cycling Club · Austin, Texas<br />
                  <a href="${SITE_URL}" style="color: #14CFC4; text-decoration: none;">allassnogascyclingclub.com</a>
                </p>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Branded email error:", emailError);
        // Don't fail — Supabase already sent the invite
      }
    }

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${invitee_email}`,
      invitee_id: inviteData.user.id,
    });

  } catch (error) {
    console.error("Invite error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET — Check how many invites a member has used
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const inviter_id = searchParams.get("inviter_id");

    if (!inviter_id) {
      return NextResponse.json({ error: "inviter_id required" }, { status: 400 });
    }

    const { data: invites, error } = await supabaseAdmin
      .from("members")
      .select("id, full_name, email, invite_status, joined_at, waiver_signed")
      .eq("invited_by", inviter_id);

    if (error) {
      return NextResponse.json({ error: "Failed to fetch invites" }, { status: 500 });
    }

    return NextResponse.json({
      invites: invites || [],
      count: invites?.length || 0,
    });

  } catch (error) {
    console.error("Invite fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
