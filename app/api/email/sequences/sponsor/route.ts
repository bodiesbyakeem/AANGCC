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

// Sequence 1: Sponsor Onboarding
async function sendOnboardingEmail(
  to: string,
  contactName: string,
  companyName: string,
  tier: string
) {
  const html = emailWrapper(`
    <h1 style="font-size: 28px; color: #111111; margin-bottom: 8px;">Welcome aboard, ${contactName}! 🎉</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">${companyName} · ${tier} Sponsor</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      On behalf of the entire All Ass No Gas Cycling Club team, thank you for choosing to partner with us. Your ${tier} sponsorship puts ${companyName} at the heart of Austin's most purpose-driven cycling community.
    </p>
    <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Your Onboarding Checklist</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li>Submit your company logo (PNG, SVG preferred) — reply to this email</li>
        <li>Provide your preferred website URL for logo links</li>
        <li>Share your social media handles for tags and mentions</li>
        <li>Confirm your primary contact for monthly reports</li>
      </ul>
    </div>
    <div style="background: #f0fffe; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">What Happens Next</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li>Payment link sent within 24 hours</li>
        <li>Benefits activated upon payment receipt</li>
        <li>Logo placement begins within 5 business days</li>
        <li>Monthly exposure reports delivered on the 1st of each month</li>
        <li>Onboarding call scheduled within 48 hours</li>
      </ul>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      We are committed to making this partnership meaningful — both for your brand and for the thousands of Austinites we serve through our rides, events, and charitable mission.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/more/sponsorship" style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">View Sponsorship Page</a>
    </div>
    <p style="color: #444; font-size: 14px; line-height: 1.7;">
      Questions? Reply to this email or call us directly. We respond fast.
    </p>
    <p style="color: #444; font-size: 14px;">With excitement,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, `Welcome to AANGCC, ${companyName} — Let's Get Started`, html);
}

// Sequence 2: Monthly Exposure Report
async function sendMonthlyReportEmail(
  to: string,
  contactName: string,
  companyName: string,
  tier: string,
  month: string,
  stats: {
    websiteViews?: number;
    socialMentions?: number;
    eventAttendees?: number;
    ridesHosted?: number;
  }
) {
  const html = emailWrapper(`
    <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">${companyName} — Monthly Exposure Report</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">${month} · ${tier} Sponsorship</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Hi ${contactName}, here's your monthly summary of brand exposure through your AANGCC ${tier} sponsorship.
    </p>
    <div style="background: #f9f9f9; border-radius: 12px; padding: 24px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px;">${month} Performance Summary</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="background: white; border-radius: 10px; padding: 16px; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: #14CFC4;">${stats.websiteViews?.toLocaleString() || "—"}</div>
          <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Website Views</div>
        </div>
        <div style="background: white; border-radius: 10px; padding: 16px; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: #FFD84D;">${stats.socialMentions || "—"}</div>
          <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Social Mentions</div>
        </div>
        <div style="background: white; border-radius: 10px; padding: 16px; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: #14CFC4;">${stats.eventAttendees || "—"}</div>
          <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Event Attendees</div>
        </div>
        <div style="background: white; border-radius: 10px; padding: 16px; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: #FFD84D;">${stats.ridesHosted || "—"}</div>
          <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Rides Hosted</div>
        </div>
      </div>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Your logo and brand were displayed across our website, social media channels, and at all AANGCC events throughout ${month}. We appreciate your continued partnership.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/more/sponsorship" style="background: #FFD84D; color: #111111; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">View Sponsorship Details</a>
    </div>
    <p style="color: #444; font-size: 14px;">Questions about your report? Reply to this email.<br /><br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, `${companyName} · AANGCC Exposure Report — ${month}`, html);
}

// Sequence 3: Renewal Pitch
async function sendRenewalEmail(
  to: string,
  contactName: string,
  companyName: string,
  tier: string,
  renewalDate: string
) {
  const html = emailWrapper(`
    <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">It's almost time to renew, ${contactName}</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">${companyName} · ${tier} Sponsorship · Renewal: ${renewalDate}</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Your AANGCC ${tier} sponsorship is coming up for renewal. Over the past year, your partnership has helped us ride further, raise more, and make a greater impact in the fight against MS and Alzheimer's disease.
    </p>
    <div style="background: #f0fffe; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #0FAFA5; font-size: 14px; font-weight: 600; margin: 0 0 8px;">What your sponsorship accomplished this year:</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li>Brand exposure to Austin's cycling community</li>
        <li>Logo placement across all AANGCC channels</li>
        <li>Association with $93,000+ raised for MS and ALZ</li>
        <li>Recognition at every AANGCC event</li>
      </ul>
    </div>
    <div style="background: #fff8e1; border-left: 4px solid #FFD84D; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
      <p style="color: #b8960a; font-size: 14px; font-weight: 600; margin: 0;">🔄 Renew before ${renewalDate} to maintain uninterrupted benefits</p>
      <p style="color: #666; font-size: 13px; margin: 8px 0 0;">Early renewal ensures your logo stays on the jersey, your social mentions continue, and your brand remains part of every ride we do.</p>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      We'd love to continue this partnership. If you're interested in upgrading your tier or have questions about renewal, reply to this email and we'll set up a call.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/sponsors/contract" style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Renew Sponsorship</a>
    </div>
    <p style="color: #444; font-size: 14px;">Thank you for an incredible year,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, `Time to Renew — ${companyName} · AANGCC ${tier} Sponsorship`, html);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sequence,
      email,
      contactName,
      companyName,
      tier,
      month,
      stats,
      renewalDate,
    } = body;

    if (!email || !contactName || !companyName || !sequence) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let result;
    switch (sequence) {
      case "onboarding":
        result = await sendOnboardingEmail(email, contactName, companyName, tier || "Bronze");
        break;
      case "monthly-report":
        result = await sendMonthlyReportEmail(
          email, contactName, companyName,
          tier || "Bronze",
          month || new Date().toLocaleString("default", { month: "long", year: "numeric" }),
          stats || {}
        );
        break;
      case "renewal":
        result = await sendRenewalEmail(
          email, contactName, companyName,
          tier || "Bronze",
          renewalDate || "soon"
        );
        break;
      default:
        return NextResponse.json({ error: "Invalid sequence" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Sponsor email sequence error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

