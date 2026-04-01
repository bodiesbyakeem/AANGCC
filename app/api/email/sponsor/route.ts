import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Email Templates ──────────────────────────────────────────────────────────

function emailOne(name: string, company: string): string {
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
              <p style="color:#2A9D9E;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 24px;">Corporate Sponsorship</p>
              <h1 style="color:#ffffff;font-size:34px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">Let's Build Something Meaningful Together</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Hi ${name},</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Thank you for your interest in partnering with All Ass No Gas Cycling Club. We received your sponsorship inquiry and wanted to personally reach out.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">AANGCC is Austin's premier purpose-driven cycling community. We don't just ride — we raise thousands for the National MS Society and Alzheimer's Association every year, while building one of the most engaged communities in Austin.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">A partnership with AANGCC means ${company} gets:</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Real brand exposure to an engaged Austin audience</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Authentic community alignment — not vanity impressions</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Social impact tied directly to your brand</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">✓ &nbsp;Employee wellness benefits for your team</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/more/sponsorship" style="display:inline-block;background:#2A9D9E;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">View Sponsorship Packages</a>
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

function emailTwo(name: string, company: string): string {
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
              <p style="color:#FFD84D;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 24px;">Impact Story</p>
              <h1 style="color:#ffffff;font-size:34px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">What Your Sponsorship Actually Does</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Hi ${name},</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">We wanted to share what a sponsorship with AANGCC has looked like in practice — because impact is easier to understand through a story than a slide deck.</p>
              <div style="background:rgba(42,157,158,0.08);border:1px solid rgba(42,157,158,0.2);border-radius:12px;padding:24px;margin:24px 0;">
                <p style="color:#2A9D9E;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 12px;">The Impact</p>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.8;margin:0;">"Over the years, AANGCC has raised over $65,000 for the National MS Society through the BP MS 150 alone. Our sponsors don't just get logo placement — they get to be part of a story that Austin talks about."</p>
              </div>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">When ${company} sponsors AANGCC, your brand appears on jerseys worn by riders crossing finish lines. Your name shows up in social posts that reach thousands of engaged Austinites. Your investment goes toward something real — not just impressions.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0;">That's the difference between advertising and partnership.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/more/sponsorship#tiers" style="display:inline-block;background:#FFD84D;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">View Diamond Package</a>
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
              <p style="color:#2A9D9E;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 24px;">Let's Talk</p>
              <h1 style="color:#ffffff;font-size:34px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">Ready to make it official?</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Hi ${name},</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">This is our final follow-up — we don't want to fill your inbox. But we do want to make sure you have everything you need to move forward if the timing is right.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0 0 16px;">Our Diamond sponsorship ($5,000) is our most impactful package — and the spots are limited each season. If you're interested, the best next step is a quick 20-minute call so we can walk you through exactly what's included and answer any questions.</p>
              <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.8;margin:0;">If the timing isn't right, no hard feelings — just reply and let us know. We'd love to keep you in our community regardless.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/contact" style="display:inline-block;background:#2A9D9E;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;">Schedule a Call</a>
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
    const { type, name, email, company } = body;

    if (!email || !name || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (type === "sponsor_email1") {
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: "Let's Build Something Meaningful Together",
        html: emailOne(name, company || "your company"),
      });
      return NextResponse.json({ success: true, message: "Sponsor email 1 sent" });
    }

    if (type === "sponsor_email2") {
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: `What your sponsorship actually does — AANGCC Impact Story`,
        html: emailTwo(name, company || "your company"),
      });
      return NextResponse.json({ success: true, message: "Sponsor email 2 sent" });
    }

    if (type === "sponsor_email3") {
      await resend.emails.send({
        from: "AANGCC <hello@aangcc.com>",
        to: email,
        subject: "Ready to make it official? — AANGCC",
        html: emailThree(name),
      });
      return NextResponse.json({ success: true, message: "Sponsor email 3 sent" });
    }

    return NextResponse.json({ error: "Unknown email type" }, { status: 400 });

  } catch (error) {
    console.error("Sponsor email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

