import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.allassnogascyclingclub.com";

async function triggerEmailSequence(endpoint: string, payload: Record<string, unknown>) {
  try {
    const response = await fetch(`${SITE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error(`Failed to trigger ${endpoint}:`, error);
    return null;
  }
}

export async function GET(request: Request) {
  // Verify this is a legitimate Vercel cron request
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const results = {
    waiver_reminders: 0,
    first_ride_invites: 0,
    donor_impact_stories: 0,
    donor_referrals: 0,
    sponsor_renewals: 0,
    errors: [] as string[],
  };

  try {
    // ── RIDER SEQUENCES ──────────────────────────────────────────────────────

    // Waiver reminder — members who joined 24hrs ago and haven't signed waiver
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

    const { data: waiverReminders } = await supabaseAdmin
      .from("members")
      .select("id, full_name, email")
      .eq("waiver_signed", false)
      .eq("is_active", true)
      .gte("joined_at", twoDaysAgo)
      .lte("joined_at", yesterday);

    for (const member of waiverReminders || []) {
      if (!member.email) continue;
      await triggerEmailSequence("/api/email/sequences/rider", {
        sequence: "waiver-reminder",
        email: member.email,
        name: member.full_name?.split(" ")[0] || "Rider",
      });
      results.waiver_reminders++;
    }

    // First ride invite — members who joined 48hrs ago and have signed waiver
    const { data: firstRideInvites } = await supabaseAdmin
      .from("members")
      .select("id, full_name, email")
      .eq("waiver_signed", true)
      .eq("is_active", true)
      .gte("joined_at", new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString())
      .lte("joined_at", twoDaysAgo);

    for (const member of firstRideInvites || []) {
      if (!member.email) continue;

      // Check if we already sent first ride invite via audit log
      const { data: alreadySent } = await supabaseAdmin
        .from("audit_log")
        .select("id")
        .eq("action", "email_first_ride_sent")
        .eq("user_id", member.id)
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      await triggerEmailSequence("/api/email/sequences/rider", {
        sequence: "first-ride",
        email: member.email,
        name: member.full_name?.split(" ")[0] || "Rider",
      });

      // Log so we don't send again
      await supabaseAdmin.from("audit_log").insert({
        user_id: member.id,
        action: "email_first_ride_sent",
        entity: "members",
        entity_id: member.id,
        metadata: { email: member.email, timestamp: now.toISOString() },
      });

      results.first_ride_invites++;
    }

    // ── DONOR SEQUENCES ──────────────────────────────────────────────────────

    // Impact story — donors who donated 7 days ago
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString();

    const { data: impactDonors } = await supabaseAdmin
      .from("donations")
      .select("id, donor_name, donor_email, campaign, amount")
      .eq("status", "pending")
      .gte("created_at", eightDaysAgo)
      .lte("created_at", sevenDaysAgo);

    for (const donation of impactDonors || []) {
      if (!donation.donor_email) continue;

      const { data: alreadySent } = await supabaseAdmin
        .from("audit_log")
        .select("id")
        .eq("action", "email_impact_story_sent")
        .contains("metadata", { donor_email: donation.donor_email })
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      await triggerEmailSequence("/api/email/sequences/donor", {
        sequence: "impact-story",
        email: donation.donor_email,
        name: donation.donor_name?.split(" ")[0] || "Friend",
        campaign: donation.campaign,
      });

      await supabaseAdmin.from("audit_log").insert({
        action: "email_impact_story_sent",
        entity: "donations",
        entity_id: donation.id,
        metadata: { donor_email: donation.donor_email, timestamp: now.toISOString() },
      });

      results.donor_impact_stories++;
    }

    // Referral ask — donors who donated 14 days ago
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString();

    const { data: referralDonors } = await supabaseAdmin
      .from("donations")
      .select("id, donor_name, donor_email, campaign")
      .eq("status", "pending")
      .gte("created_at", fifteenDaysAgo)
      .lte("created_at", fourteenDaysAgo);

    for (const donation of referralDonors || []) {
      if (!donation.donor_email) continue;

      const { data: alreadySent } = await supabaseAdmin
        .from("audit_log")
        .select("id")
        .eq("action", "email_referral_sent")
        .contains("metadata", { donor_email: donation.donor_email })
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      await triggerEmailSequence("/api/email/sequences/donor", {
        sequence: "referral",
        email: donation.donor_email,
        name: donation.donor_name?.split(" ")[0] || "Friend",
      });

      await supabaseAdmin.from("audit_log").insert({
        action: "email_referral_sent",
        entity: "donations",
        entity_id: donation.id,
        metadata: { donor_email: donation.donor_email, timestamp: now.toISOString() },
      });

      results.donor_referrals++;
    }

    // ── SPONSOR SEQUENCES ────────────────────────────────────────────────────

    // Monthly report — send on 1st of each month
    const isFirstOfMonth = now.getDate() === 1;

    if (isFirstOfMonth) {
      const { data: activeSponsors } = await supabaseAdmin
        .from("sponsors")
        .select("id, company_name, contact_name, email, tier")
        .eq("is_active", true)
        .eq("contract_signed", true);

      const month = now.toLocaleString("default", { month: "long", year: "numeric" });

      for (const sponsor of activeSponsors || []) {
        if (!sponsor.email) continue;
        await triggerEmailSequence("/api/email/sequences/sponsor", {
          sequence: "monthly-report",
          email: sponsor.email,
          contactName: sponsor.contact_name,
          companyName: sponsor.company_name,
          tier: sponsor.tier,
          month,
          stats: {
            websiteViews: 1200,
            socialMentions: 8,
            eventAttendees: 45,
            ridesHosted: 4,
          },
        });
      }
    }

    // Renewal reminder — sponsors whose anniversary is 30 days away
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const thirtyOneDaysFromNow = new Date(now.getTime() + 31 * 24 * 60 * 60 * 1000);

    const { data: renewalSponsors } = await supabaseAdmin
      .from("sponsors")
      .select("id, company_name, contact_name, email, tier, created_at")
      .eq("is_active", true);

    for (const sponsor of renewalSponsors || []) {
      if (!sponsor.email || !sponsor.created_at) continue;

      const createdAt = new Date(sponsor.created_at);
      const anniversaryThisYear = new Date(
        now.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate()
      );

      const isRenewingSoon =
        anniversaryThisYear >= thirtyDaysFromNow &&
        anniversaryThisYear <= thirtyOneDaysFromNow;

      if (!isRenewingSoon) continue;

      const { data: alreadySent } = await supabaseAdmin
        .from("audit_log")
        .select("id")
        .eq("action", "email_renewal_sent")
        .eq("entity_id", sponsor.id)
        .gte("created_at", new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      await triggerEmailSequence("/api/email/sequences/sponsor", {
        sequence: "renewal",
        email: sponsor.email,
        contactName: sponsor.contact_name,
        companyName: sponsor.company_name,
        tier: sponsor.tier,
        renewalDate: anniversaryThisYear.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      });

      await supabaseAdmin.from("audit_log").insert({
        action: "email_renewal_sent",
        entity: "sponsors",
        entity_id: sponsor.id,
        metadata: { email: sponsor.email, timestamp: now.toISOString() },
      });

      results.sponsor_renewals++;
    }

    // Log cron run
    await supabaseAdmin.from("audit_log").insert({
      action: "cron_sequences_run",
      entity: "system",
      metadata: { ...results, timestamp: now.toISOString() },
    });

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      results,
    });

  } catch (error) {
    console.error("Cron sequences error:", error);
    return NextResponse.json({ error: "Cron job failed", details: String(error) }, { status: 500 });
  }
}
