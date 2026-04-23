import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = "Akeem at AANGCC <info@allassnogascyclingclub.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";
const INVITE_EXPIRY_HOURS = 48;

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
    } = body;

    if (!inviter_id || !invitee_name || !invitee_email || !membership_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const allowedTiers = ["Family", "Small Business", "Corporate"];
    if (!allowedTiers.includes(membership_type)) {
      return NextResponse.json({ error: "Your membership tier does not support additional members." }, { status: 403 });
    }

    // Check if invitee email already exists as active member
    const { data: existingMember } = await supabaseAdmin
      .from("members")
      .select("id, email, is_active")
      .eq("email", invitee_email)
      .single();

    if (existingMember?.is_active) {
      return NextResponse.json({ error: "A member with this email already exists." }, { status: 409 });
    }

    // Get inviter member info
    const { data: inviterMember } = await supabaseAdmin
      .from("members")
      .select("renewal_date, membership_status")
      .eq("id", inviter_id)
      .single();

    // Generate unique token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + INVITE_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    // Store invite in invites table
    const { error: inviteError } = await supabaseAdmin.from("invites").insert({
      token,
      inviter_id,
      invitee_email,
      invitee_name,
      membership_type,
      expires_at: expiresAt,
    });

    if (inviteError) {
      console.error("Invite insert error:", inviteError);
      return NextResponse.json({ error: "Failed to create invite." }, { status: 500 });
    }

    // Create pending member record
    const tempId = randomBytes(16).toString("hex");
    await supabaseAdmin.from("members").upsert({
      full_name: invitee_name,
      email: invitee_email,
      membership_type,
      membership_status: "pending",
      is_active: false,
      invited_by: inviter_id,
      invite_status: "pending",
      renewal_date: inviterMember?.renewal_date || null,
      joined_at: new Date().toISOString(),
      waiver_signed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "email", ignoreDuplicates: true });

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      user_id: inviter_id,
      action: "member_invited",
      entity: "invites",
      entity_id: token,
      metadata: {
        inviter_name,
        inviter_email,
        invitee_name,
        invitee_email,
        membership_type,
        expires_at: expiresAt,
        timestamp: new Date().toISOString(),
      },
    });

    // Send branded invite email
    const inviteUrl = `${SITE_URL}/invite?token=${token}`;

    if (RESEND_API_KEY) {
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
      message: `Invitation sent to ${invitee_email}`,
      expires_at: expiresAt,
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
