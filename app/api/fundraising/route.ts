import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Fundraising Email Template ───────────────────────────────────────────────

function fundraisingEmail(
  name: string,
  raised: number,
  goal: number,
  week: number
): string {
  const percent = Math.min(Math.round((raised / goal) * 100), 100);
  const remaining = goal - raised;
  const progressWidth = `${percent}%`;

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
              <p style="color:#FFD84D;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 16px;">Week ${week} Fundraising Update</p>
              <h1 style="color:#ffffff;font-size:32px;font-weight:700;line-height:1.2;margin:0 0 16px;font-family:Georgia,serif;">We're ${percent}% to our goal.</h1>
              <p style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7;margin:0;">Hi ${name}, here's where we stand — and how you can help push us over the line.</p>
            </td>
          </tr>

          <!-- Progress Bar -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:rgba(255,255,255,0.06);border-radius:8px;height:12px;overflow:hidden;margin-bottom:12px;">
                <div style="background:linear-gradient(90deg,#2A9D9E,#FFD84D);height:12px;width:${progressWidth};border-radius:8px;"></div>
              </div>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color:#2A9D9E;font-size:13px;font-weight:600;">\$${raised.toLocaleString()} raised</td>
                  <td align="right" style="color:rgba(255,255,255,0.4);font-size:13px;">\$${goal.toLocaleString()} goal</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgency -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:rgba(255,216,77,0.06);border:1px solid rgba(255,216,77,0.2);border-radius:12px;padding:20px;text-align:center;">
                <p style="color:#FFD84D;font-size:14px;font-weight:600;margin:0 0 8px;">We need \$${remaining.toLocaleString()} more to hit our goal.</p>
                <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0;">Every donation — no matter the size — moves us forward.</p>
              </div>
            </td>
          </tr>

          <!-- Leaderboard placeholder -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 16px;">Top Fundraisers This Week</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:#FFD84D;font-weight:700;font-size:14px;">🥇 </span>
                    <span style="color:rgba(255,255,255,0.7);font-size:14px;">AANGCC Team</span>
                    <span style="float:right;color:#2A9D9E;font-weight:600;font-size:14px;">\$${Math.round(raised * 0.4).toLocaleString()}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:rgba(255,255,255,0.4);font-weight:700;font-size:14px;">🥈 </span>
                    <span style="color:rgba(255,255,255,0.7);font-size:14px;">Community Donors</span>
                    <span style="float:right;color:#2A9D9E;font-weight:600;font-size:14px;">\$${Math.round(raised * 0.35).toLocaleString()}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="color:rgba(255,255,255,0.4);font-weight:700;font-size:14px;">🥉 </span>
                    <span style="color:rgba(255,255,255,0.7);font-size:14px;">Corporate Partners</span>
                    <span style="float:right;color:#2A9D9E;font-weight:600;font-size:14px;">\$${Math.round(raised * 0.25).toLocaleString()}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.aangcc.com/more/donate" style="display:inline-block;background:#FFD84D;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:16px 32px;border-radius:12px;text-decoration:none;margin-bottom:12px;">Donate Now</a>
              <br />
              <a href="https://www.aangcc.com/more/sponsorship" style="color:#2A9D9E;font-size:13px;text-decoration:none;">Become a Sponsor Instead →</a>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">All Ass No Gas Cycling Club · Austin, Texas</p>
              <p style="color:rgba(255,255,255,0.15);font-size:11px;margin:8px 0 0;">You're receiving this because you're part of the AANGCC community.</p>
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
    const { name, email, raised, goal, week } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const currentRaised = raised || 6500;
    const currentGoal = goal || 10000;
    const currentWeek = week || 1;

    await resend.emails.send({
      from: "AANGCC <hello@aangcc.com>",
      to: email,
      subject: `Week ${currentWeek} Update: We're ${Math.round((currentRaised / currentGoal) * 100)}% to our goal 🚴`,
      html: fundraisingEmail(name, currentRaised, currentGoal, currentWeek),
    });

    return NextResponse.json({ success: true, message: "Fundraising email sent" });

  } catch (error) {
    console.error("Fundraising email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

