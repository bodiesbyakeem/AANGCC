import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: members, error } = await supabaseAdmin
      .from("members")
      .select(
        "id, full_name, avatar_url, membership_type, city, state_location, bio, phone, email, show_phone, show_email, joined_at"
      )
      .eq("is_active", true)
      .order("full_name", { ascending: true });

    if (error) {
      console.error("Directory fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
    }

    // Apply privacy controls — only expose contact info if member has opted in
    const sanitized = (members || []).map((m) => ({
      id: m.id,
      full_name: m.full_name,
      avatar_url: m.avatar_url || null,
      membership_type: m.membership_type,
      city: m.city || null,
      state_location: m.state_location || null,
      bio: m.bio || null,
      joined_at: m.joined_at,
      show_phone: m.show_phone || false,
      show_email: m.show_email || false,
      // Only include actual contact data if member has opted in
      phone: m.show_phone ? m.phone : null,
      email: m.show_email ? m.email : null,
    }));

    return NextResponse.json({ members: sanitized, total: sanitized.length });

  } catch (error) {
    console.error("Directory error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
