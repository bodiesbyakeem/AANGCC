import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = "Akeem at AANGCC <info@allassnogascyclingclub.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
  return response.json();
}

function emailWrapper(content: string) {
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 32px;">
        <img src="${SITE_URL}/images/club-logo.png" alt="AANGCC" style="width: 72px; height: 72px; object-fit: contain;" />
      </div>
      ${content}
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="color: #aaa; font-size: 11px; text-align: center; line-height: 1.6;">
        All Ass No Gas Cycling Club · Austin, Texas<br />
        <a href="${SITE_URL}" style="color: #14CFC4; text-decoration: none;">allassnogascyclingclub.com</a>
      </p>
    </div>
  `;
}

// Sequence 1: Welcome Email
async function sendWelcomeEmail(to: string, name: string) {
  const html = emailWrapper(`
    <h1 style="font-size: 28px; color: #111111; margin-bottom: 8px;">Welcome to AANGCC, ${name}! 🎉</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Austin's most purpose-driven cycling community</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      We are thrilled to have you as part of the All Ass No Gas Cycling Club family. You've just joined a community of riders who show up — for every ride, for every cause, and for every rider who needs support.
    </p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Here's what to do next:
    </p>
    <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Your Next Steps</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li>Sign your <a href="${SITE_URL}/waiver" style="color: #14CFC4;">Waiver of Liability</a> before your first ride</li>
        <li>Check the <a href="${SITE_URL}/rides" style="color: #14CFC4;">Ride Calendar</a> for upcoming group rides</li>
        <li>Access your <a href="${SITE_URL}/portal" style="color: #14CFC4;">Member Portal</a> to complete your profile</li>
        <li>Learn about <a href="${SITE_URL}/rides/levels" style="color: #14CFC4;">Ride Levels</a> to find your perfect group</li>
      </ul>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Our weekly Saturday rides depart from Govalle Neighborhood Park at 8:00 AM. We can't wait to ride with you.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/rides" style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">View Ride Calendar</a>
    </div>
    <p style="color: #444; font-size: 14px; line-height: 1.7;">
      Questions? Reply to this email or reach us at <a href="mailto:info@allassnogascyclingclub.com" style="color: #14CFC4;">info@allassnogascyclingclub.com</a>
    </p>
    <p style="color: #444; font-size: 14px;">Ride with purpose,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, "Welcome to AANGCC — Let's Ride! 🚴", html);
}

// Sequence 2: Waiver Reminder (sent 24 hours after welcome if waiver not signed)
async function sendWaiverReminderEmail(to: string, name: string) {
  const html = emailWrapper(`
    <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">One thing before you ride, ${name}</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Action required before your first group ride</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      We noticed you haven't signed your Waiver of Liability yet. This is required before you can participate in any AANGCC group ride or event.
    </p>
    <div style="background: #fff8e1; border-left: 4px solid #FFD84D; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
      <p style="color: #b8960a; font-size: 14px; font-weight: 600; margin: 0;">
        ⚠️ Waiver required before your first ride
      </p>
      <p style="color: #666; font-size: 13px; margin: 8px 0 0;">
        It takes less than 2 minutes to complete. Your digital signature is legally binding and permanently stored for your protection.
      </p>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      The waiver covers assumption of risk, release of liability, and includes our arbitration clause — all standard for cycling clubs in Texas.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/waiver" style="background: #FFD84D; color: #111111; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Sign Waiver Now</a>
    </div>
    <p style="color: #444; font-size: 14px;">See you on the road,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, "Action Required: Sign Your Waiver Before Your First Ride", html);
}

// Sequence 3: First Ride Invite (sent 48 hours after welcome)
async function sendFirstRideInviteEmail(to: string, name: string) {
  const html = emailWrapper(`
    <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">Your first ride is waiting, ${name} 🚴</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Join us this Saturday morning</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Every Saturday morning, AANGCC riders gather at Govalle Neighborhood Park for our weekly group ride. Whether you're a first-timer or a seasoned cyclist, there's a group for you.
    </p>
    <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Saturday Ride Details</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li><strong>When:</strong> Every Saturday · 8:00 AM</li>
        <li><strong>Where:</strong> Govalle Neighborhood Park, 5200 Bolm Rd, Austin TX</li>
        <li><strong>Distance:</strong> 26 miles · 866 ft elevation</li>
        <li><strong>After:</strong> Post-ride social at Monkey Nest Coffee</li>
      </ul>
    </div>
    <div style="background: #f0fffe; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #0FAFA5; font-size: 13px; font-weight: 600; margin: 0 0 8px;">🦋 New to group riding?</p>
      <p style="color: #444; font-size: 13px; margin: 0; line-height: 1.6;">Join our <strong>Social Butterflies</strong> group — a no-drop ride at 10–11.5 mph covering 10–15 miles. Nobody gets left behind.</p>
    </div>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/rides" style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">View Full Ride Calendar</a>
    </div>
    <p style="color: #444; font-size: 14px; line-height: 1.7;">
      Remember to bring water, a helmet, and your energy. We'll take care of the rest.
    </p>
    <p style="color: #444; font-size: 14px;">See you Saturday,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, "Your First AANGCC Ride Is This Saturday 🚴", html);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sequence, email, name } = body;

    if (!email || !name || !sequence) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let result;
    switch (sequence) {
      case "welcome":
        result = await sendWelcomeEmail(email, name);
        break;
      case "waiver-reminder":
        result = await sendWaiverReminderEmail(email, name);
        break;
      case "first-ride":
        result = await sendFirstRideInviteEmail(email, name);
        break;
      default:
        return NextResponse.json({ error: "Invalid sequence" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Rider email sequence error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

