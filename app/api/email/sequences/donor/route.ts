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
        100% of charitable donations go directly to the cause.<br />
        <a href="${SITE_URL}" style="color: #14CFC4; text-decoration: none;">allassnogascyclingclub.com</a>
      </p>
    </div>
  `;
}

// Sequence 1: Thank You Email
async function sendThankYouEmail(
  to: string,
  name: string,
  amount: number,
  campaign: string,
  recurring: boolean
) {
  const html = emailWrapper(`
    <h1 style="font-size: 28px; color: #111111; margin-bottom: 8px;">Thank you, ${name}. ❤️</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Your generosity is making a real difference</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Your donation of <strong>$${amount.toLocaleString()}${recurring ? "/month" : ""}</strong> to <strong>${campaign}</strong> has been received. Every dollar you contributed goes directly to the cause — AANGCC retains nothing.
    </p>
    <div style="background: #f0fffe; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
      <p style="color: #0FAFA5; font-size: 28px; font-weight: 700; margin: 0;">$${amount.toLocaleString()}${recurring ? "/mo" : ""}</p>
      <p style="color: #888; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 0.1em;">${campaign}</p>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Because of supporters like you, AANGCC has raised over <strong>$93,000</strong> for the National Multiple Sclerosis Society since our founding. You are part of that story.
    </p>
    ${recurring ? `
    <div style="background: #fff8e1; border-left: 4px solid #FFD84D; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
      <p style="color: #b8960a; font-size: 14px; font-weight: 600; margin: 0;">♻️ Monthly Recurring Donation</p>
      <p style="color: #666; font-size: 13px; margin: 8px 0 0;">Thank you for your ongoing commitment. Your monthly donation creates sustained impact that our team counts on.</p>
    </div>
    ` : ""}
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/donate" style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">View Our Mission</a>
    </div>
    <p style="color: #444; font-size: 14px;">With gratitude,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, `Thank You for Supporting AANGCC's Mission, ${name}`, html);
}

// Sequence 2: Impact Story (sent 7 days after donation)
async function sendImpactStoryEmail(to: string, name: string, campaign: string) {
  const html = emailWrapper(`
    <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">This is why we ride, ${name}</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">The impact of your donation</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      A week ago, you made a donation to support <strong>${campaign}</strong>. We wanted to share something with you — a story that reminds us all why this mission matters.
    </p>
    <div style="background: #f9f9f9; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #14CFC4;">
      <p style="color: #111; font-size: 16px; font-style: italic; line-height: 1.8; margin: 0;">
        "We ride for the mother who was diagnosed in her thirties and refuses to let MS define her life. We ride for the father who shows up at every finish line to cheer on his daughter. We ride for the friend who once cycled beside us and now stands at the sidelines, reminding us that our efforts make a real difference."
      </p>
      <p style="color: #888; font-size: 13px; margin: 16px 0 0;">— AANGCC Founding Mission</p>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Nearly <strong>1 million Americans</strong> are living with MS. The Alzheimer's Association supports <strong>6.7 million</strong> families. Your contribution — no matter the size — is part of a collective force that is moving research forward and changing lives.
    </p>
    <div style="background: #f0fffe; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">AANGCC Impact Since Founding</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li><strong>$93,062+</strong> raised for the National MS Society</li>
        <li><strong>3</strong> annual charity events</li>
        <li><strong>Hundreds</strong> of donors and supporters like you</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${SITE_URL}/about/we-support" style="background: #FFD84D; color: #111111; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">See Who We Support</a>
    </div>
    <p style="color: #444; font-size: 14px;">Thank you for being part of the fight,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, "The Story Behind Every Mile We Ride", html);
}

// Sequence 3: Referral Ask (sent 14 days after donation)
async function sendReferralEmail(to: string, name: string) {
  const html = emailWrapper(`
    <h1 style="font-size: 26px; color: #111111; margin-bottom: 8px;">Know someone who'd love AANGCC, ${name}?</h1>
    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Help us grow the movement</p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Two weeks ago, you supported our mission with a donation. That means more to us than you know. Today, we're asking for something different — your voice.
    </p>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Do you know someone who loves cycling, believes in giving back, or is looking for a community that actually shows up? Send them our way.
    </p>
    <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Share AANGCC With Someone Who Would Love Us</p>
      <ul style="color: #444; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
        <li>Friends who want to ride for a cause</li>
        <li>Colleagues looking for a wellness community</li>
        <li>Anyone inspired by MS or ALZ advocacy</li>
        <li>Businesses looking for corporate sponsorship opportunities</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 32px 0; display: flex; flex-direction: column; gap: 12px;">
      <a href="${SITE_URL}/membership/join" style="background: #14CFC4; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; display: block;">Share Membership Page</a>
      <a href="${SITE_URL}/donate" style="background: #FFD84D; color: #111111; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-top: 12px;">Share Donation Page</a>
    </div>
    <p style="color: #444; font-size: 15px; line-height: 1.7;">
      Every new rider, donor, and supporter moves us closer to our goal. Your referral could change someone's life — and fund research that changes many more.
    </p>
    <p style="color: #444; font-size: 14px;">With appreciation,<br /><strong>Akeem</strong><br /><span style="color: #888;">Founder, All Ass No Gas Cycling Club</span></p>
  `);
  return sendEmail(to, "Know Someone Who'd Love AANGCC? 🚴", html);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sequence, email, name, amount, campaign, recurring } = body;

    if (!email || !name || !sequence) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let result;
    switch (sequence) {
      case "thank-you":
        result = await sendThankYouEmail(email, name, amount || 0, campaign || "AANGCC", recurring || false);
        break;
      case "impact-story":
        result = await sendImpactStoryEmail(email, name, campaign || "AANGCC");
        break;
      case "referral":
        result = await sendReferralEmail(email, name);
        break;
      default:
        return NextResponse.json({ error: "Invalid sequence" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Donor email sequence error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

