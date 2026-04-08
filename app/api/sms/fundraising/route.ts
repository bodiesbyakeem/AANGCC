import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER || "+17373831807";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function sendSMS(to: string, body: string) {
  const credentials = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: TWILIO_PHONE,
        To: to,
        Body: body,
      }),
    }
  );

  return response.json();
}

const SMS_TEMPLATES = {
  // Weekly fundraising update
  "weekly-update": (name: string, raised: number, goal: number) => {
    const remaining = Math.max(goal - raised, 0);
    const pct = Math.min(Math.round((raised / goal) * 100), 100);
    return `Hey ${name}! AANGCC MS 150 Update: We've raised $${raised.toLocaleString()} (${pct}% of our $${goal.toLocaleString()} goal). ${remaining > 0 ? `$${remaining.toLocaleString()} to go!` : "Goal reached! 🎉"} Donate: ${SITE_URL}/donate`;
  },

  // Urgency message - close to deadline
  "urgency-deadline": (name: string, raised: number, goal: number, daysLeft: number) => {
    const remaining = Math.max(goal - raised, 0);
    return `${name}, only ${daysLeft} days left to hit our MS 150 goal! We're $${remaining.toLocaleString()} away. Every dollar counts. Help us finish strong: ${SITE_URL}/donate 🚴`;
  },

  // Personal fundraising reminder
  "personal-goal": (name: string, personalRaised: number, personalGoal: number) => {
    const remaining = Math.max(personalGoal - personalRaised, 0);
    return `Hey ${name}! You're $${remaining.toLocaleString()} away from your $${personalGoal.toLocaleString()} MS 150 fundraising goal. You've got this! ${SITE_URL}/donate 💪`;
  },

  // Milestone celebration
  "milestone": (name: string, milestone: number) => {
    return `🎉 ${name}, AANGCC just hit $${milestone.toLocaleString()} raised for MS research! Thank you for being part of this. Keep the momentum going: ${SITE_URL}/donate`;
  },

  // First ride reminder
  "first-ride": (name: string) => {
    return `Hey ${name}! Your first AANGCC ride is Saturday at 8AM — Govalle Neighborhood Park, 5200 Bolm Rd. Bring water, a helmet, and your energy. See you there! 🚴`;
  },

  // Waiver reminder
  "waiver-reminder": (name: string) => {
    return `Hi ${name}, quick reminder — sign your AANGCC waiver before Saturday's ride! Takes 2 minutes: ${SITE_URL}/waiver`;
  },

  // Event day reminder
  "event-day": (name: string, eventName: string, location: string) => {
    return `Good morning ${name}! Today's the day — ${eventName} is happening NOW. Meet at ${location}. Let's ride for MS! 🎗️`;
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      template,
      phone,
      name,
      // Template-specific params
      raised,
      goal,
      daysLeft,
      personalRaised,
      personalGoal,
      milestone,
      eventName,
      location,
      // Bulk send option
      bulk,
      campaign,
    } = body;

    if (!template) {
      return NextResponse.json({ error: "Template required" }, { status: 400 });
    }

    // Single SMS send
    if (phone && name && !bulk) {
      let message = "";

      switch (template) {
        case "weekly-update":
          message = SMS_TEMPLATES["weekly-update"](name, raised || 0, goal || 30000);
          break;
        case "urgency-deadline":
          message = SMS_TEMPLATES["urgency-deadline"](name, raised || 0, goal || 30000, daysLeft || 7);
          break;
        case "personal-goal":
          message = SMS_TEMPLATES["personal-goal"](name, personalRaised || 0, personalGoal || 1500);
          break;
        case "milestone":
          message = SMS_TEMPLATES["milestone"](name, milestone || 0);
          break;
        case "first-ride":
          message = SMS_TEMPLATES["first-ride"](name);
          break;
        case "waiver-reminder":
          message = SMS_TEMPLATES["waiver-reminder"](name);
          break;
        case "event-day":
          message = SMS_TEMPLATES["event-day"](name, eventName || "AANGCC Ride", location || "Govalle Neighborhood Park");
          break;
        default:
          return NextResponse.json({ error: "Invalid template" }, { status: 400 });
      }

      const result = await sendSMS(phone, message);

      // Log to audit trail
      await supabaseAdmin.from("audit_log").insert({
        action: "sms_sent",
        entity: "sms",
        metadata: {
          template,
          phone: phone.replace(/\d(?=\d{4})/g, "*"), // mask phone
          name,
          campaign: campaign || template,
          timestamp: new Date().toISOString(),
          message_length: message.length,
        },
      });

      return NextResponse.json({ success: true, result });
    }

    // Bulk SMS send to all members with phone numbers
    if (bulk) {
      const { data: members, error } = await supabaseAdmin
        .from("members")
        .select("full_name, phone")
        .eq("is_active", true)
        .not("phone", "is", null);

      if (error) {
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
      }

      const results = [];
      let sent = 0;
      let failed = 0;

      for (const member of members || []) {
        if (!member.phone) continue;

        try {
          let message = "";
          const firstName = member.full_name?.split(" ")[0] || "Rider";

          switch (template) {
            case "weekly-update":
              message = SMS_TEMPLATES["weekly-update"](firstName, raised || 0, goal || 30000);
              break;
            case "urgency-deadline":
              message = SMS_TEMPLATES["urgency-deadline"](firstName, raised || 0, goal || 30000, daysLeft || 7);
              break;
            case "milestone":
              message = SMS_TEMPLATES["milestone"](firstName, milestone || 0);
              break;
            case "first-ride":
              message = SMS_TEMPLATES["first-ride"](firstName);
              break;
            case "waiver-reminder":
              message = SMS_TEMPLATES["waiver-reminder"](firstName);
              break;
            case "event-day":
              message = SMS_TEMPLATES["event-day"](firstName, eventName || "AANGCC Ride", location || "Govalle Neighborhood Park");
              break;
            default:
              continue;
          }

          const result = await sendSMS(member.phone, message);
          results.push({ phone: member.phone.replace(/\d(?=\d{4})/g, "*"), status: "sent" });
          sent++;

          // Small delay between messages to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch {
          failed++;
          results.push({ phone: member.phone.replace(/\d(?=\d{4})/g, "*"), status: "failed" });
        }
      }

      // Log bulk send to audit trail
      await supabaseAdmin.from("audit_log").insert({
        action: "sms_bulk_sent",
        entity: "sms",
        metadata: {
          template,
          sent,
          failed,
          campaign: campaign || template,
          timestamp: new Date().toISOString(),
        },
      });

      return NextResponse.json({
        success: true,
        sent,
        failed,
        total: members?.length || 0,
      });
    }

    return NextResponse.json({ error: "Missing phone/name or bulk flag" }, { status: 400 });

  } catch (error) {
    console.error("SMS fundraising error:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}

// GET endpoint to preview available templates
export async function GET() {
  return NextResponse.json({
    templates: [
      { id: "weekly-update", description: "Weekly fundraising progress update", params: ["name", "raised", "goal"] },
      { id: "urgency-deadline", description: "Urgency message close to deadline", params: ["name", "raised", "goal", "daysLeft"] },
      { id: "personal-goal", description: "Personal fundraising goal reminder", params: ["name", "personalRaised", "personalGoal"] },
      { id: "milestone", description: "Milestone celebration message", params: ["name", "milestone"] },
      { id: "first-ride", description: "First ride reminder", params: ["name"] },
      { id: "waiver-reminder", description: "Waiver signing reminder", params: ["name"] },
      { id: "event-day", description: "Event day reminder", params: ["name", "eventName", "location"] },
    ],
    examples: {
      single: { template: "weekly-update", phone: "+15125551234", name: "Sarah", raised: 27428, goal: 30000 },
      bulk: { template: "urgency-deadline", bulk: true, raised: 27428, goal: 30000, daysLeft: 5 },
    },
  });
}

