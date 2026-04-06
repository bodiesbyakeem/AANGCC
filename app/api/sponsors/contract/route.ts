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
      company_name,
      contact_name,
      email,
      phone,
      tier,
      tier_name,
      amount,
      contract_text,
      ip_address,
      version = "1.0",
    } = body;

    if (!company_name || !contact_name || !email || !tier || !contract_text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const resolvedIp = ip_address || (forwarded ? forwarded.split(",")[0].trim() : "unknown");

    // Insert sponsor record
    const { data: sponsor, error: sponsorError } = await supabaseAdmin
      .from("sponsors")
      .insert({
        company_name,
        contact_name,
        email,
        phone: phone || null,
        tier: tier_name,
        contract_signed: true,
        is_active: false, // activated upon payment
        notes: `Contract signed electronically. Version ${version}. IP: ${resolvedIp}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (sponsorError) {
      console.error("Sponsor insert error:", sponsorError);
      return NextResponse.json(
        { error: "Failed to save sponsor record" },
        { status: 500 }
      );
    }

    // Log to audit trail
    await supabaseAdmin.from("audit_log").insert({
      action: "sponsor_contract_signed",
      entity: "sponsors",
      entity_id: sponsor.id,
      ip_address: resolvedIp,
      sponsor_id: sponsor.id,
      metadata: {
        company_name,
        contact_name,
        email,
        tier: tier_name,
        amount,
        version,
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get("user-agent") || "unknown",
        contract_length: contract_text.length,
      },
    });

    // Send notification email via Resend if configured
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
            to: [email],
            bcc: ["info@allassnogascyclingclub.com"],
            subject: `Welcome to AANGCC — ${tier_name} Sponsorship Agreement Executed`,
            html: `
              <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <img src="https://www.allassnogascyclingclub.com/images/club-logo.png" alt="AANGCC" style="width: 80px; margin-bottom: 24px;" />
                <h1 style="font-size: 28px; color: #111111; margin-bottom: 8px;">Sponsorship Agreement Executed</h1>
                <p style="color: #888; font-size: 13px; margin-bottom: 24px;">${tier_name} Tier · $${amount.toLocaleString()}</p>
                <p style="color: #444; font-size: 15px; line-height: 1.6;">Dear ${contact_name},</p>
                <p style="color: #444; font-size: 15px; line-height: 1.6;">
                  Thank you for partnering with All Ass No Gas Cycling Club. Your <strong>${tier_name} Sponsorship Agreement</strong> has been successfully executed and stored securely in our system.
                </p>
                <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">What Happens Next</p>
                  <ul style="color: #444; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
                    <li>Payment link will be sent within 24 hours</li>
                    <li>Sponsorship benefits activate upon payment receipt</li>
                    <li>Onboarding call scheduled within 48 hours</li>
                    <li>Logo and brand assets request to follow</li>
                  </ul>
                </div>
                <p style="color: #444; font-size: 14px; line-height: 1.6;">
                  Questions? Reply to this email or contact us at <a href="mailto:info@allassnogascyclingclub.com" style="color: #14CFC4;">info@allassnogascyclingclub.com</a>
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
                <p style="color: #aaa; font-size: 11px;">All Ass No Gas Cycling Club · Austin, Texas · Contract Version ${version} · Signed: ${new Date().toISOString()}</p>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      sponsor_id: sponsor.id,
      message: "Contract executed successfully",
    });

  } catch (error) {
    console.error("Sponsor contract error:", error);
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
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("sponsors")
      .select("id, company_name, tier, contract_signed, is_active, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({ found: true, sponsor: data });

  } catch (error) {
    console.error("Sponsor lookup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
