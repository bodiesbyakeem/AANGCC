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
      donor_name,
      donor_email,
      amount,
      campaign,
      recurring = false,
      status = "pending",
      stripe_id,
      user_id,
    } = body;

    if (!donor_name || !donor_email || !amount || !campaign) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Insert donation record
    const { data: donation, error: donationError } = await supabaseAdmin
      .from("donations")
      .insert({
        user_id: user_id || null,
        amount,
        currency: "usd",
        recurring,
        stripe_id: stripe_id || null,
        campaign,
        donor_name,
        donor_email,
        status,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (donationError) {
      console.error("Donation insert error:", donationError);
      return NextResponse.json(
        { error: "Failed to save donation" },
        { status: 500 }
      );
    }

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      user_id: user_id || null,
      action: "donation_initiated",
      entity: "donations",
      entity_id: donation.id,
      ip_address: ipAddress,
      metadata: {
        donor_name,
        donor_email,
        amount,
        campaign,
        recurring,
        status,
        timestamp: new Date().toISOString(),
      },
    });

    // Send thank you email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AANGCC <info@allassnogascyclingclub.com>",
            to: [donor_email],
            subject: "Thank You for Supporting AANGCC's Mission",
            html: `
              <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <img src="https://www.allassnogascyclingclub.com/images/club-logo.png" alt="AANGCC" style="width: 80px; margin-bottom: 24px;" />
                <h1 style="font-size: 28px; color: #111111; margin-bottom: 8px;">Thank You, ${donor_name}!</h1>
                <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Your donation to ${campaign} is making a difference.</p>
                <p style="color: #444; font-size: 15px; line-height: 1.6;">
                  Every dollar you contribute goes directly toward the fight against MS and Alzheimer's disease. Your generosity fuels our riders, supports our mission, and helps families who need it most.
                </p>
                <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Donation Summary</p>
                  <p style="color: #111; font-size: 15px; margin: 0;"><strong>Campaign:</strong> ${campaign}</p>
                  <p style="color: #111; font-size: 15px; margin: 4px 0 0;"><strong>Amount:</strong> $${amount.toLocaleString()}${recurring ? " / month" : ""}</p>
                  ${recurring ? '<p style="color: #14CFC4; font-size: 13px; margin: 8px 0 0;">♻️ Monthly recurring donation — thank you for your ongoing support!</p>' : ""}
                </div>
                <p style="color: #444; font-size: 14px; line-height: 1.6;">
                  Want to do more? <a href="https://www.allassnogascyclingclub.com/membership/join" style="color: #14CFC4;">Join AANGCC</a> and ride with us at the next event.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
                <p style="color: #aaa; font-size: 11px;">All Ass No Gas Cycling Club · Austin, Texas · 100% of donations go to the cause.</p>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      donation_id: donation.id,
      message: "Donation recorded successfully",
    });

  } catch (error) {
    console.error("Donation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaign = searchParams.get("campaign");
    const limit = parseInt(searchParams.get("limit") || "10");

    let query = supabaseAdmin
      .from("donations")
      .select("id, donor_name, amount, campaign, recurring, created_at")
      .eq("status", "completed")
      .order("amount", { ascending: false })
      .limit(limit);

    if (campaign) {
      query = query.eq("campaign", campaign);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }

    // Calculate totals
    const { data: totals } = await supabaseAdmin
      .from("donations")
      .select("amount, campaign")
      .eq("status", "completed");

    const totalRaised = totals?.reduce((sum, d) => sum + d.amount, 0) || 0;

    return NextResponse.json({
      leaderboard: data || [],
      total_raised: totalRaised,
      count: data?.length || 0,
    });

  } catch (error) {
    console.error("Donation fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
