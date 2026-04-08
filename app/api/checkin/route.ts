import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = "Akeem at AANGCC <info@allassnogascyclingclub.com>";
const ADMIN_EMAIL = "info@allassnogascyclingclub.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

// POST — Submit a check-in
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      event_id,
      event_name,
      name,
      email,
      phone,
      waiver_verified,
      is_member,
    } = body;

    if (!event_id || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Check if already checked in
    const { data: existing } = await supabaseAdmin
      .from("event_checkins")
      .select("id")
      .eq("event_name", event_name)
      .eq("waiver_id", null)
      .ilike("notes", `%${email}%`)
      .limit(1);

    // Better duplicate check using metadata
    const { data: duplicateCheck } = await supabaseAdmin
      .from("audit_log")
      .select("id")
      .eq("action", "event_checkin")
      .eq("entity", "event_checkins")
      .contains("metadata", { email, event_name })
      .limit(1);

    if (duplicateCheck && duplicateCheck.length > 0) {
      return NextResponse.json({ already_checked_in: true });
    }

    // Get user_id if member
    let userId = null;
    if (is_member && email) {
      const { data: member } = await supabaseAdmin
        .from("members")
        .select("id")
        .eq("email", email)
        .single();
      if (member) userId = member.id;
    }

    // Get waiver ID if signed
    let waiverIdVal = null;
    if (waiver_verified && email) {
      const { data: waiver } = await supabaseAdmin
        .from("waivers")
        .select("id")
        .eq("email", email)
        .order("signed_at", { ascending: false })
        .limit(1)
        .single();
      if (waiver) waiverIdVal = waiver.id;
    }

    // Insert check-in record
    const { data: checkin, error: checkinError } = await supabaseAdmin
      .from("event_checkins")
      .insert({
        user_id: userId,
        event_name,
        check_in_time: new Date().toISOString(),
        waiver_verified: waiver_verified || false,
        waiver_id: waiverIdVal,
        notes: JSON.stringify({ email, phone, is_member, event_id }),
      })
      .select()
      .single();

    if (checkinError) {
      console.error("Check-in insert error:", checkinError);
      return NextResponse.json({ error: "Failed to record check-in" }, { status: 500 });
    }

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      user_id: userId,
      action: "event_checkin",
      entity: "event_checkins",
      entity_id: checkin.id,
      ip_address: ipAddress,
      metadata: {
        name,
        email,
        phone,
        event_id,
        event_name,
        is_member,
        waiver_verified,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      checkin_id: checkin.id,
      waiver_verified,
    });

  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET — Fetch check-ins for an event
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("event_id");

    if (!eventId) {
      return NextResponse.json({ error: "event_id required" }, { status: 400 });
    }

    // Decode event name from event_id
    const eventName = decodeURIComponent(eventId.replace(/-/g, " "));

    const { data: checkins, error } = await supabaseAdmin
      .from("event_checkins")
      .select("id, user_id, event_name, check_in_time, waiver_verified, notes")
      .eq("event_name", eventName)
      .order("check_in_time", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch check-ins" }, { status: 500 });
    }

    // Parse notes JSON to extract name, email, is_member
    const parsed = (checkins || []).map((c) => {
      let notes: Record<string, unknown> = {};
      try { notes = JSON.parse(c.notes || "{}"); } catch {}
      return {
        id: c.id,
        name: (notes.name as string) || "Unknown",
        email: (notes.email as string) || "",
        phone: (notes.phone as string) || null,
        is_member: (notes.is_member as boolean) || false,
        waiver_verified: c.waiver_verified,
        check_in_time: c.check_in_time,
      };
    });

    return NextResponse.json({
      checkins: parsed,
      total: parsed.length,
      members: parsed.filter((c) => c.is_member).length,
      guests: parsed.filter((c) => !c.is_member).length,
    });

  } catch (error) {
    console.error("Check-in fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT — Send event report email
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { event_name, checkins, send_report } = body;

    if (!send_report || !event_name || !checkins) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const members = checkins.filter((c: { is_member: boolean }) => c.is_member);
    const guests = checkins.filter((c: { is_member: boolean }) => !c.is_member);
    const waiverVerified = checkins.filter((c: { waiver_verified: boolean }) => c.waiver_verified);
    const date = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const attendeeRows = checkins.map((c: {
      name: string;
      email: string;
      is_member: boolean;
      waiver_verified: boolean;
      check_in_time: string;
    }) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 12px; font-size: 13px; color: #111;">${c.name}</td>
        <td style="padding: 10px 12px; font-size: 13px; color: #666;">${c.email}</td>
        <td style="padding: 10px 12px; font-size: 12px; text-align: center;">
          <span style="background: ${c.is_member ? "#f0fffe" : "#fff8e1"}; color: ${c.is_member ? "#0FAFA5" : "#b8960a"}; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600;">
            ${c.is_member ? "Member" : "Guest"}
          </span>
        </td>
        <td style="padding: 10px 12px; font-size: 12px; text-align: center;">
          ${c.waiver_verified ? '<span style="color: #10b981; font-weight: 600;">✓ Yes</span>' : '<span style="color: #ef4444;">✗ No</span>'}
        </td>
        <td style="padding: 10px 12px; font-size: 12px; color: #888; text-align: right;">
          ${new Date(c.check_in_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </td>
      </tr>
    `).join("");

    const html = `
      <div style="font-family: Inter, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <img src="${SITE_URL}/images/club-logo.png" alt="AANGCC" style="width: 64px; height: 64px; object-fit: contain;" />
        </div>
        <h1 style="font-size: 24px; color: #111111; margin-bottom: 4px;">Event Check-In Report</h1>
        <p style="color: #888; font-size: 13px; margin-bottom: 32px;">${event_name} · ${date}</p>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 32px;">
          <div style="background: #f0fffe; border-radius: 10px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #14CFC4;">${checkins.length}</div>
            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Total</div>
          </div>
          <div style="background: #fff8e1; border-radius: 10px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #b8960a;">${members.length}</div>
            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Members</div>
          </div>
          <div style="background: #f9f9f9; border-radius: 10px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #555;">${guests.length}</div>
            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Guests</div>
          </div>
          <div style="background: #f0fff4; border-radius: 10px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #10b981;">${waiverVerified.length}</div>
            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Waiver ✓</div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <thead>
            <tr style="background: #f9f9f9;">
              <th style="padding: 10px 12px; font-size: 11px; color: #888; text-align: left; text-transform: uppercase; letter-spacing: 0.1em;">Name</th>
              <th style="padding: 10px 12px; font-size: 11px; color: #888; text-align: left; text-transform: uppercase; letter-spacing: 0.1em;">Email</th>
              <th style="padding: 10px 12px; font-size: 11px; color: #888; text-align: center; text-transform: uppercase; letter-spacing: 0.1em;">Type</th>
              <th style="padding: 10px 12px; font-size: 11px; color: #888; text-align: center; text-transform: uppercase; letter-spacing: 0.1em;">Waiver</th>
              <th style="padding: 10px 12px; font-size: 11px; color: #888; text-align: right; text-transform: uppercase; letter-spacing: 0.1em;">Time</th>
            </tr>
          </thead>
          <tbody>${attendeeRows}</tbody>
        </table>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #aaa; font-size: 11px; text-align: center;">
          All Ass No Gas Cycling Club · Austin, Texas · <a href="${SITE_URL}/admin/checkin" style="color: #14CFC4;">Admin Dashboard</a>
        </p>
      </div>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `AANGCC Check-In Report — ${event_name} · ${checkins.length} Attendees`,
        html,
      }),
    });

    return NextResponse.json({ success: true, sent_to: ADMIN_EMAIL });

  } catch (error) {
    console.error("Report email error:", error);
    return NextResponse.json({ error: "Failed to send report" }, { status: 500 });
  }
}

