import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!;
const CRON_SECRET = process.env.CRON_SECRET!;

// All events — must match member calendar
const ALL_EVENTS = [
  { id: "1", title: "Group Ride — Govalle Neighborhood Park", date: "2026-04-04", time: "8:00 a.m.", meetAt: "Govalle Neighborhood Park, 5200 Bolm Road, Austin TX 78721" },
  { id: "2", title: "Group Ride — Govalle Neighborhood Park", date: "2026-04-11", time: "8:00 a.m.", meetAt: "Govalle Neighborhood Park, 5200 Bolm Road, Austin TX 78721" },
  { id: "3", title: "Group Ride — Buescher State Park", date: "2026-04-18", time: "9:00 a.m.", meetAt: "100 Park Road C, Smithville TX 78957" },
  { id: "4", title: "Mandatory Team Meeting", date: "2026-04-24", time: "5:30 p.m.", meetAt: "8140 Ceberry Drive #B, Austin TX 78759" },
  { id: "5", title: "2026 Texas Bike MS-150 — Day 1", date: "2026-04-25", time: "6:15 a.m.", meetAt: "San Jacinto Parking Garage, 2400 San Jacinto Blvd, Austin TX 78701" },
  { id: "6", title: "2026 Texas Bike MS-150 — Day 2", date: "2026-04-26", time: "6:15 a.m.", meetAt: "Fayette County Fairgrounds, 1899 N. Jefferson St, La Grange TX 78945" },
  { id: "celebration-2026", title: "Team Celebration Party 🎉", date: "2026-05-16", time: "3:00 p.m.", meetAt: "Rose Kirk Home, 4901 Interlachen Lane, Austin TX 78747" },
  ...([
    "2026-05-09","2026-05-23","2026-05-30",
    "2026-06-06","2026-06-13","2026-06-20","2026-06-27",
    "2026-07-04","2026-07-11","2026-07-18","2026-07-25",
    "2026-08-01","2026-08-08","2026-08-15","2026-08-22","2026-08-29",
    "2026-09-05","2026-09-12","2026-09-19","2026-09-26",
    "2026-10-03","2026-10-10",
  ].map((date, i) => ({ id: `sat-${i + 1}`, title: "Group Ride — Govalle Neighborhood Park", date, time: "8:00 a.m.", meetAt: "Govalle Neighborhood Park, 5200 Bolm Road, Austin TX 78721" }))),
  { id: "alz-2026", title: "Ride to End ALZ", date: "2026-10-17", time: "8:00 a.m.", meetAt: "Speeding Springs, 7100 Creek Road, Dripping Springs TX 78620" },
  { id: "ms150-2027-day1", title: "2027 Texas Bike MS-150 — Day 1", date: "2027-04-24", time: "6:15 a.m.", meetAt: "San Jacinto Parking Garage, 2400 San Jacinto Blvd, Austin TX 78701" },
  { id: "ms150-2027-day2", title: "2027 Texas Bike MS-150 — Day 2", date: "2027-04-25", time: "6:15 a.m.", meetAt: "Fayette County Fairgrounds, 1899 N. Jefferson St, La Grange TX 78945" },
];

async function sendSMS(to: string, body: string) {
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: TWILIO_PHONE_NUMBER, Body: body }).toString(),
    }
  );
  return response.ok;
}

function getReminderMessage(event: typeof ALL_EVENTS[0], reminderType: "7day" | "3day" | "24hour"): string {
  const prefix = {
    "7day": "📅 1 WEEK AWAY",
    "3day": "⏰ 3 DAYS AWAY",
    "24hour": "🚨 TOMORROW",
  }[reminderType];

  return `${prefix} — AANGCC\n${event.title}\n📆 ${new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${event.time}\n📍 ${event.meetAt}\n\nSee full details at allassnogascyclingclub.com/portal/calendar\n\nReply STOP to unsubscribe.`;
}

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const results = {
      checked: 0,
      reminders_sent: 0,
      sms_sent: 0,
      errors: [] as string[],
    };

    // Get all active members with phone numbers
    const { data: members, error: membersError } = await supabaseAdmin
      .from("members")
      .select("id, full_name, phone, email")
      .eq("is_active", true)
      .not("phone", "is", null);

    if (membersError || !members?.length) {
      return NextResponse.json({ message: "No active members with phone numbers", results });
    }

    // Check each event for upcoming reminders
    for (const event of ALL_EVENTS) {
      const eventDate = new Date(event.date + "T12:00:00");
      eventDate.setHours(0, 0, 0, 0);
      const daysUntil = Math.round((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      results.checked++;

      // Determine if a reminder should fire today
      let reminderType: "7day" | "3day" | "24hour" | null = null;
      if (daysUntil === 7) reminderType = "7day";
      else if (daysUntil === 3) reminderType = "3day";
      else if (daysUntil === 1) reminderType = "24hour";

      if (!reminderType) continue;

      // Check if this reminder was already sent
      const { data: existing } = await supabaseAdmin
        .from("event_reminders")
        .select("id")
        .eq("event_id", event.id)
        .eq("reminder_type", reminderType)
        .single();

      if (existing) continue; // Already sent

      // Send SMS to all active members
      const message = getReminderMessage(event, reminderType);
      let sentCount = 0;

      for (const member of members) {
        if (!member.phone) continue;
        try {
          const sent = await sendSMS(member.phone, message);
          if (sent) sentCount++;
        } catch (err) {
          results.errors.push(`SMS failed for ${member.phone}: ${err}`);
        }
      }

      // Record that this reminder was sent
      await supabaseAdmin.from("event_reminders").insert({
        event_id: event.id,
        reminder_type: reminderType,
        sent_at: new Date().toISOString(),
        recipient_count: sentCount,
      });

      results.reminders_sent++;
      results.sms_sent += sentCount;

      console.log(`Sent ${reminderType} reminder for "${event.title}" to ${sentCount} members`);
    }

    return NextResponse.json({
      success: true,
      message: `Checked ${results.checked} events, sent ${results.reminders_sent} reminders to ${results.sms_sent} members`,
      results,
    });

  } catch (error) {
    console.error("Event reminders cron error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
