import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const FROM = process.env.TWILIO_PHONE_NUMBER!;

// ─── SMS Messages ─────────────────────────────────────────────────────────────

const MESSAGES = {
  new_donor: (name: string) =>
    `Hi ${name}! Thank you for supporting AANGCC. Your contribution is making a real difference in the fight against MS and Alzheimer's. Ride on! 🚴 — AANGCC Austin`,

  abandoned: (name: string) =>
    `Hi ${name}, we'd love to have you be part of this movement. Every dollar helps us fight MS and Alzheimer's. Donate at aangcc.com/more/donate — AANGCC Austin`,

  new_sponsor: (name: string, company: string) =>
    `Hi ${name}, thanks for your interest in sponsoring AANGCC! We'll be in touch shortly to discuss how ${company} can partner with our mission. — AANGCC Austin`,

  fundraising_push: () =>
    `🚴 AANGCC Update: We're pushing toward our next $10,000 goal! Every dollar counts. Donate or share at aangcc.com/more/donate — Thank you for riding with us!`,
};

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, phone, name, company } = body;

    if (!phone || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let message = "";

    if (type === "new_donor") {
      message = MESSAGES.new_donor(name || "there");
    } else if (type === "abandoned") {
      message = MESSAGES.abandoned(name || "there");
    } else if (type === "new_sponsor") {
      message = MESSAGES.new_sponsor(name || "there", company || "your company");
    } else if (type === "fundraising_push") {
      message = MESSAGES.fundraising_push();
    } else {
      return NextResponse.json({ error: "Unknown SMS type" }, { status: 400 });
    }

    await client.messages.create({
      body: message,
      from: FROM,
      to: phone,
    });

    return NextResponse.json({ success: true, message: "SMS sent" });

  } catch (error) {
    console.error("SMS error:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}

