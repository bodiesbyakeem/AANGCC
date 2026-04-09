import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = "AANGCC Members <info@allassnogascyclingclub.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      recipient_id,
      recipient_name,
      recipient_email,
      sender_name,
      sender_email,
      subject,
      body: messageBody,
    } = body;

    if (!recipient_id || !recipient_name || !sender_name || !sender_email || !subject || !messageBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify recipient exists and is active
    const { data: recipient, error: recipientError } = await supabaseAdmin
      .from("members")
      .select("id, full_name, email, is_active")
      .eq("id", recipient_id)
      .single();

    if (recipientError || !recipient || !recipient.is_active) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
    }

    const recipientEmailAddress = recipient_email || recipient.email;

    if (!recipientEmailAddress) {
      return NextResponse.json({ error: "Recipient has no email address" }, { status: 400 });
    }

    // Send email to recipient via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [recipientEmailAddress],
        reply_to: sender_email,
        subject: `[AANGCC Member Message] ${subject}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="${SITE_URL}/images/club-logo.png" alt="AANGCC" style="width: 64px; height: 64px; object-fit: contain;" />
            </div>

            <div style="background: #f0fffe; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; border-left: 4px solid #14CFC4;">
              <p style="color: #0FAFA5; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px;">Message from a fellow AANGCC member</p>
              <p style="color: #555; font-size: 13px; margin: 0;">This message was sent through the AANGCC Member Directory</p>
            </div>

            <h1 style="font-size: 22px; color: #111111; margin-bottom: 4px;">Hi ${recipient_name.split(" ")[0]},</h1>
            <p style="color: #888; font-size: 13px; margin-bottom: 24px;">You have a new message from <strong>${sender_name}</strong></p>

            <div style="background: #f9f9f9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Subject</p>
              <p style="color: #111; font-size: 16px; font-weight: 600; margin: 0 0 20px;">${subject}</p>
              <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
              <p style="color: #444; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${messageBody}</p>
            </div>

            <div style="background: #fff8e1; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="color: #b8960a; font-size: 13px; font-weight: 600; margin: 0 0 4px;">Reply directly to ${sender_name}</p>
              <p style="color: #666; font-size: 13px; margin: 0;">Hit reply on this email to respond directly to <strong>${sender_email}</strong></p>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${SITE_URL}/portal/directory"
                style="background: #14CFC4; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                View Member Directory
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="color: #aaa; font-size: 11px; text-align: center; line-height: 1.6;">
              All Ass No Gas Cycling Club · Austin, Texas<br />
              This message was relayed through AANGCC. The sender's email address is included so you can reply directly.<br />
              <a href="${SITE_URL}" style="color: #14CFC4; text-decoration: none;">allassnogascyclingclub.com</a>
            </p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend error:", await emailResponse.text());
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // Also send sender a confirmation
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [sender_email],
        subject: `Message sent to ${recipient_name} ✓`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="${SITE_URL}/images/club-logo.png" alt="AANGCC" style="width: 64px; height: 64px; object-fit: contain;" />
            </div>
            <h1 style="font-size: 22px; color: #111111; margin-bottom: 8px;">Message Sent ✓</h1>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">Your message to <strong>${recipient_name}</strong> has been delivered. They can reply directly to your email address.</p>
            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px;">Your Message</p>
              <p style="color: #111; font-size: 14px; font-weight: 600; margin: 0 0 8px;">${subject}</p>
              <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${messageBody}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="color: #aaa; font-size: 11px; text-align: center;">All Ass No Gas Cycling Club · Austin, Texas</p>
          </div>
        `,
      }),
    });

    // Log message to database
    await supabaseAdmin.from("messages").insert({
      sender_id: null,
      recipient_id,
      sender_name,
      sender_email,
      recipient_email: recipientEmailAddress,
      subject,
      body: messageBody,
      sent_at: new Date().toISOString(),
    });

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      action: "member_message_sent",
      entity: "messages",
      metadata: {
        sender_name,
        sender_email,
        recipient_name,
        recipient_id,
        subject,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Message error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

