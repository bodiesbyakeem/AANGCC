import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ valid: false, reason: "missing_token" });
  }

  const { data: invite, error } = await supabaseAdmin
    .from("invites")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !invite) {
    return NextResponse.json({ valid: false, reason: "not_found" });
  }

  if (invite.used_at) {
    return NextResponse.json({ valid: false, reason: "used" });
  }

  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, reason: "expired" });
  }

  return NextResponse.json({
    valid: true,
    invite: {
      invitee_name: invite.invitee_name,
      invitee_email: invite.invitee_email,
      membership_type: invite.membership_type,
    },
  });
}
