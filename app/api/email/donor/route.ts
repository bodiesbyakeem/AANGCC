import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Email Templates ──────────────────────────────────────────────────────────

function emailOne(name: string, cause: string): string {
  const causeLabel = cause === "ms150"
    ? "National Multiple Sclerosis Society"
    : "Alzheimer's Association";
  const causeName = cause === "ms150" ? "MS 150" : "Ride to End ALZ";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>You Just Made an Impact</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header accent -->
          <tr>
            <td style="background:linear-gradient(90deg,transparent,#2A9D9E,transparent);height:3px;"></td>
          </tr>
          <!-- Logo area -->
          <tr>
            <td style="padding:32px 40px 24px;text-align:center;">
              <p style="color:#2A9D9E;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0;">All Ass No Gas Cycling Club</p>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <h1 style="color:#ffffff;font-size:36px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">You Just Made an Impact</h1>
              <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0;">Hi ${name}, thank you for supporting the AANGCC ${causeName} team. Your generosity means more than you know.</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:rgba(255,255,255,0.08);"></div>
            </td>
          </tr>
          <!-- Where money goes -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="color:#2A9D9E;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 16px;">Where Your Donation Goes</p>
              <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 16px;">100% of your donation goes directly to the <strong style="color:#ffffff;">${causeLabel}</strong> — funding:</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${cause === "ms150" ? `
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;MS research and clinical trials</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Patient support programs nationwide</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;MS advocacy and policy work</td></tr>
                ` : `
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Alzheimer's research and trials</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Care programs for patients and families</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Awareness and early detection</td></tr>
                `}
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/more/donate" style="display:inline-block;background:#2A9D9E;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">View Your Impact</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">All Ass No Gas Cycling Club · Austin, Texas</p>
              <p style="color:rgba(255,255,255,0.15);font-size:11px;margin:8px 0 0;">You received this because you donated to AANGCC.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function emailTwo(name: string, cause: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000000;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
          <tr><td style="background:linear-gradient(90deg,transparent,#2A9D9E,transparent);height:3px;"></td></tr>
          <tr>
            <td style="padding:40px 40px 24px;text-align:center;">
              <p style="color:#2A9D9E;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 24px;">A Story Worth Sharing</p>
              <h1 style="color:#ffffff;font-size:32px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">"Our pedals turn for those who can't."</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Hi ${name},</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Two days ago you made a donation that will fund real change. We wanted to share why that matters so deeply to our team.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">We ride for the mother diagnosed with ${cause === "ms150" ? "MS" : "Alzheimer's"} in her thirties who refuses to let it define her life. We ride for the father at the finish line cheering on his daughter. We ride for the friend who once cycled beside us and now stands at the sidelines — reminding us that our efforts make a real difference.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">These are not statistics. They are people. And your donation helps us show up for them — every single ride.</p>
              <p style="color:#ffffff;font-size:15px;line-height:1.8;margin:0;font-weight:600;">Thank you for riding with us, even from the sidelines.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/about/we-support" style="display:inline-block;background:#2A9D9E;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">Learn Who We Ride For</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">All Ass No Gas Cycling Club · Austin, Texas</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function emailThree(name: string): string {
  const shareUrl = encodeURIComponent("https://www.aangcc.com/more/donate");
  const shareText = encodeURIComponent("I just donated to the AANGCC cycling team fighting MS and Alzheimer's. Join the movement!");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000000;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
          <tr><td style="background:linear-gradient(90deg,transparent,#FFD84D,transparent);height:3px;"></td></tr>
          <tr>
            <td style="padding:40px 40px 24px;text-align:center;">
              <p style="color:#FFD84D;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 24px;">Spread the Word</p>
              <h1 style="color:#ffffff;font-size:32px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">One share could change everything.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Hi ${name},</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Your donation is already making an impact. But imagine what happens when your friends and family learn about what you've done — and decide to join you.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 24px;">A single share on social media could bring in another donation, another rider, another believer in the mission. It takes 30 seconds and could make a real difference.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 16px;text-align:center;">
              <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" style="display:inline-block;background:#1877F2;color:#ffffff;font-size:13px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;margin:0 6px 12px;">Share on Facebook</a>
              <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" style="display:inline-block;background:rgba(255,255,255,0.1);color:#ffffff;font-size:13px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;margin:0 6px 12px;">Share on X</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/membership/why-join" style="display:inline-block;background:#FFD84D;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">Join The Club</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">All Ass No Gas Cycling Club · Austin, Texas</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function abandonedEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000000;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
          <tr><td style="background:linear-gradient(90deg,transparent,#2A9D9E,transparent);height:3px;"></td></tr>
          <tr>
            <td style="padding:40px 40px 24px;text-align:center;">
              <h1 style="color:#ffffff;font-size:32px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">Still thinking about supporting the mission?</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Hi ${name},</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">We noticed you were looking at our donation page. No pressure at all — we just wanted to make sure you had everything you needed to make a decision that feels right.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Every dollar donated to AANGCC goes directly to the National MS Society or the Alzheimer's Association. We don't keep any portion of charitable donations.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0;">If you have any questions, just reply to this email. We're a real team and we'll respond personally.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/more/donate" style="display:inline-block;background:#2A9D9E;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">Complete Your Donation</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">All Ass No Gas Cycling Club · Austin, Texas</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, cause } = body;

    if (!email || !name || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const causeLabel = cause === "ms150" ? "MS 150" : "ALZ Ride";

    if (type === "new_donor") {
      // Email 1 — immediate
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: "You Just Made an Impact 🎗️",
        html: emailOne(name, cause),
      });

      return NextResponse.json({ success: true, message: "Donor welcome email sent" });
    }

    if (type === "donor_day2") {
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: `The story behind why we ride for ${causeLabel}`,
        html: emailTwo(name, cause),
      });

      return NextResponse.json({ success: true, message: "Donor day 2 email sent" });
    }

    if (type === "donor_day5") {
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: "One share could change everything",
        html: emailThree(name),
      });

      return NextResponse.json({ success: true, message: "Donor day 5 email sent" });
    }

    if (type === "abandoned") {
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: "Still thinking about supporting the mission?",
        html: abandonedEmail(name),
      });

      return NextResponse.json({ success: true, message: "Abandoned donor email sent" });
    }

    return NextResponse.json({ error: "Unknown email type" }, { status: 400 });

  } catch (error) {
    console.error("Donor email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

