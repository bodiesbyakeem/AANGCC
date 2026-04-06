import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      full_name,
      email,
      signature,
      version = "2.0",
      agreed_to_terms,
    } = body;

    if (!full_name || !email || !signature || !agreed_to_terms) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get IP address from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Insert waiver record
    const { data: waiver, error: waiverError } = await supabaseAdmin
      .from("waivers")
      .insert({
        user_id: user_id || null,
        version,
        signed_at: new Date().toISOString(),
        ip_address: ipAddress,
        signature,
        full_name,
        email,
        agreed_to_terms,
      })
      .select()
      .single();

    if (waiverError) {
      console.error("Waiver insert error:", waiverError);
      return NextResponse.json(
        { error: "Failed to save waiver" },
        { status: 500 }
      );
    }

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      user_id: user_id || null,
      action: "waiver_signed",
      entity: "waivers",
      entity_id: waiver.id,
      ip_address: ipAddress,
      metadata: {
        full_name,
        email,
        version,
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get("user-agent") || "unknown",
      },
    });

    // Update member record if user_id provided
    if (user_id) {
      await supabaseAdmin
        .from("members")
        .update({
          waiver_signed: true,
          waiver_id: waiver.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user_id);
    }

    return NextResponse.json({
      success: true,
      waiver_id: waiver.id,
      signed_at: waiver.signed_at,
    });

  } catch (error) {
    console.error("Waiver signing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("waivers")
      .select("id, version, signed_at, full_name, email")
      .eq("email", email)
      .order("signed_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ signed: false });
    }

    return NextResponse.json({
      signed: true,
      waiver_id: data.id,
      version: data.version,
      signed_at: data.signed_at,
    });

  } catch (error) {
    console.error("Waiver check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

