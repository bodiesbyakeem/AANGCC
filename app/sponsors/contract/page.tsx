"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const TIERS = [
  {
    id: "bronze",
    name: "Bronze",
    price: "$1,000",
    amount: 1000,
    benefits: [
      "Logo on AANGCC website",
      "Social media mention (2x)",
      "Recognition at events",
      "Certificate of sponsorship",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "$2,500",
    amount: 2500,
    benefits: [
      "All Bronze benefits",
      "Logo on club jersey (back)",
      "Social media mention (4x)",
      "Email newsletter feature",
      "Event banner placement",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$3,500",
    amount: 3500,
    benefits: [
      "All Silver benefits",
      "Logo on club jersey (sleeve)",
      "Dedicated social media post",
      "Speaking opportunity at events",
      "Employee cycling perks (5)",
      "Co-branded content",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: "$5,000",
    amount: 5000,
    benefits: [
      "All Gold benefits",
      "Logo on club jersey (front)",
      "Premium social media promotions",
      "Employee cycling perks (unlimited)",
      "Speaking opportunity at all events",
      "Co-branded recognition",
      "Dedicated sponsor spotlight",
      "Annual impact report",
    ],
  },
];

const CONTRACT_VERSION = "1.0";

function generateContract(data: {
  company_name: string;
  contact_name: string;
  email: string;
  tier: typeof TIERS[0];
  date: string;
}) {
  return `SPONSORSHIP AGREEMENT

This Sponsorship Agreement ("Agreement") is entered into as of ${data.date} by and between:

SPONSOR: ${data.company_name}
CONTACT: ${data.contact_name}
EMAIL: ${data.email}

AND

ORGANIZATION: All Ass No Gas Cycling Club ("AANGCC")
ADDRESS: Austin, Texas
EMAIL: info@allassnogascyclingclub.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SPONSORSHIP TIER & PAYMENT

Sponsor agrees to the ${data.tier.name} Sponsorship Tier at ${data.tier.price} for the current annual sponsorship period.

Payment is due within 30 days of contract execution. AANGCC will provide a Stripe payment link upon contract signing.

Sponsorship benefits are activated upon receipt of full payment.

2. SPONSORSHIP BENEFITS

In exchange for sponsorship payment, AANGCC agrees to provide the following benefits:

${data.tier.benefits.map((b, i) => `${i + 1}. ${b}`).join("\n")}

3. LOGO USAGE RIGHTS

Sponsor grants AANGCC a non-exclusive, royalty-free license to display Sponsor's logo, name, and branding materials in connection with AANGCC's activities, events, and promotional materials during the sponsorship term.

AANGCC grants Sponsor a non-exclusive license to reference their AANGCC sponsorship in Sponsor's own marketing materials during the sponsorship term.

4. TERM LENGTH

This Agreement shall commence on the date of signing and continue for one (1) year, unless terminated earlier in accordance with Section 6.

5. PAYMENT TERMS

Full payment of ${data.tier.price} is due within 30 days of contract execution. Failure to remit payment within this period may result in suspension of sponsorship benefits and termination of this Agreement.

6. TERMINATION

Either party may terminate this Agreement with 30 days written notice. In the event of termination by AANGCC without cause, a pro-rated refund will be issued. In the event of termination by Sponsor, no refund will be issued for the current sponsorship period.

7. LIABILITY PROTECTION

AANGCC shall not be liable for any indirect, incidental, special, or consequential damages arising from this Agreement. Sponsor assumes all risk associated with participation in AANGCC events and activities.

8. INDEMNIFICATION

Each party agrees to indemnify and hold harmless the other party from any claims, damages, losses, or expenses — including attorney's fees — arising out of the indemnifying party's breach of this Agreement or negligent acts.

9. ARBITRATION & CLASS ACTION WAIVER

Any dispute arising from this Agreement shall be resolved through binding individual arbitration in Travis County, Texas under the Federal Arbitration Act. BOTH PARTIES WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT.

10. GOVERNING LAW & VENUE

This Agreement shall be governed by the laws of the State of Texas. Venue for any disputes not subject to arbitration shall be Travis County, Texas.

11. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

By signing below, both parties agree to the terms of this Sponsorship Agreement.

SPONSOR: ${data.company_name}
SIGNATORY: ${data.contact_name}
DATE: ${data.date}

AANGCC
AUTHORIZED REPRESENTATIVE: Akeem Disu
DATE: ${data.date}

Contract Version: ${CONTRACT_VERSION}`;
}

export default function SponsorContractPage() {
  const [step, setStep] = useState<"info" | "tier" | "contract" | "success">("info");
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [agreedArbitration, setAgreedArbitration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const contractText = generateContract({
    ...form,
    tier: selectedTier,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  });

  const handleSubmit = async () => {
    setError("");
    if (!agreed || !agreedArbitration) {
      setError("You must agree to all terms to proceed.");
      return;
    }

    setLoading(true);
    try {
      let ipAddress = "unknown";
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      } catch {}

      const response = await fetch("/api/sponsors/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tier: selectedTier.id,
          tier_name: selectedTier.name,
          amount: selectedTier.amount,
          contract_text: contractText,
          ip_address: ipAddress,
          version: CONTRACT_VERSION,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setStep("success");
    } catch (err: unknown) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="w-full max-w-[540px]">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#FFD84D]" />
            <div className="p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M8 18L14 24L28 12" stroke="#14CFC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-heading text-[#111111] text-[30px] font-semibold mb-3">Contract Signed!</h2>
              <p className="text-[#666] text-[14px] leading-relaxed mb-4">
                Your <strong>{selectedTier.name} Sponsorship Agreement</strong> has been executed and stored securely. Our team will be in touch within 24 hours with your payment link and onboarding details.
              </p>
              <div className="bg-[#14CFC4]/5 border border-[#14CFC4]/20 rounded-xl p-4 mb-8 text-left">
                <p className="text-[#555] text-[13px] font-semibold mb-2">What happens next:</p>
                <ul className="flex flex-col gap-1.5">
                  {["You'll receive a confirmation email within minutes", "Payment link sent within 24 hours", "Benefits activated upon payment receipt", "Onboarding call scheduled within 48 hours"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[#666] text-[12px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14CFC4] flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/more/sponsorship" className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300 block text-center">View Sponsorship Page</Link>
                <Link href="/" className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-[#555] text-[13px] font-bold tracking-[0.08em] uppercase hover:border-[#14CFC4] hover:text-[#14CFC4] transition-colors duration-300 block text-center">Back to Home</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] pb-20">

      {/* Hero */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-5">
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Corporate Partnership</span>
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            Secure Your <span className="text-gradient-gold">Sponsorship</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-white/70 text-[15px] max-w-[520px] mx-auto leading-relaxed">
            Complete the form below to generate and sign your AANGCC sponsorship contract. Your agreement will be stored securely with a full audit trail.
          </motion.p>

          {/* Progress */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="flex items-center justify-center gap-3 mt-8">
            {["Company Info", "Select Tier", "Sign Contract"].map((s, i) => {
              const stepIndex = step === "info" ? 0 : step === "tier" ? 1 : 2;
              const done = i < stepIndex;
              const active = i === stepIndex;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${done ? "bg-[#14CFC4] text-white" : active ? "bg-[#FFD84D] text-[#111]" : "bg-white/15 text-white/40"}`}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={`text-[12px] font-medium hidden sm:block ${active ? "text-white" : done ? "text-[#14CFC4]" : "text-white/40"}`}>{s}</span>
                  </div>
                  {i < 2 && <div className={`w-8 h-[1px] ${done ? "bg-[#14CFC4]" : "bg-white/20"}`} />}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="max-w-[800px] mx-auto px-6 lg:px-10">

        {/* Step 1: Company Info */}
        {step === "info" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-[4px] w-full bg-[#FFD84D]" />
            <div className="p-8">
              <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-1">Company Information</h2>
              <p className="text-[#888] text-[13px] mb-7">Tell us about your company. This information will appear on your sponsorship contract.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Company Name *</label>
                  <input type="text" value={form.company_name} onChange={(e) => setForm(p => ({ ...p, company_name: e.target.value }))} placeholder="Your company name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Contact Name *</label>
                  <input type="text" value={form.contact_name} onChange={(e) => setForm(p => ({ ...p, contact_name: e.target.value }))} placeholder="Your full name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@company.com" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(512) 000-0000" className={inputClass} />
                </div>
              </div>
              <button onClick={() => setStep("tier")} disabled={!form.company_name || !form.contact_name || !form.email}
                className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${form.company_name && form.contact_name && form.email ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                Continue → Select Tier
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Tier Selection */}
        {step === "tier" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {TIERS.map((tier) => (
                <button key={tier.id} onClick={() => setSelectedTier(tier)}
                  className={`text-left rounded-2xl overflow-hidden transition-all duration-300 h-full ${selectedTier.id === tier.id ? "ring-2 ring-[#FFD84D] shadow-xl scale-[1.01]" : "hover:shadow-lg"}`}
                >
                  <div className="bg-white h-full flex flex-col">
                    <div className={`h-[4px] w-full ${selectedTier.id === tier.id ? "bg-[#FFD84D]" : "bg-gray-200"}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-[#111111] text-[22px] font-bold">{tier.name}</h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedTier.id === tier.id ? "border-[#FFD84D] bg-[#FFD84D]" : "border-gray-300"}`}>
                          {selectedTier.id === tier.id && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      </div>
                      <div className="font-heading text-[#FFD84D] text-[28px] font-bold mb-4" style={{ WebkitTextStroke: "1px #e6c235" }}>{tier.price}</div>
                      <ul className="flex flex-col gap-1.5 flex-1">
                        {tier.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-[12px] text-[#555]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 mt-[2px]">
                              <circle cx="6" cy="6" r="6" fill="#14CFC4" fillOpacity="0.15"/>
                              <path d="M3 6L5 8L9 4" stroke="#0FAFA5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("info")} className="flex-1 py-4 rounded-xl border-2 border-white/20 text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:border-white/40 transition-colors duration-200">← Back</button>
              <button onClick={() => setStep("contract")} className="flex-1 py-4 rounded-xl bg-[#FFD84D] text-[#111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">
                Review Contract → {selectedTier.name} ({selectedTier.price})
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contract Review & Sign */}
        {step === "contract" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="flex flex-col gap-6">

            {/* Contract preview */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[#888] text-[12px] font-medium">Sponsorship Agreement — {form.company_name} · {selectedTier.name} Tier</span>
                <span className="text-[#14CFC4] text-[11px] font-semibold">Version {CONTRACT_VERSION}</span>
              </div>
              <div className="p-6 overflow-y-auto" style={{ maxHeight: "400px" }}>
                <pre className="text-[#555] text-[12px] leading-relaxed whitespace-pre-wrap font-mono">{contractText}</pre>
              </div>
            </div>

            {/* Sign form */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-7">
                <h2 className="font-heading text-[#111111] text-[22px] font-semibold mb-5">Execute Contract</h2>

                {error && <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

                <div className="flex flex-col gap-4 mb-6 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0" />
                    <span className="text-[#555] text-[13px] leading-relaxed">
                      I, <strong>{form.contact_name}</strong>, on behalf of <strong>{form.company_name}</strong>, have read this Sponsorship Agreement in its entirety and agree to be bound by its terms.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreedArbitration} onChange={(e) => setAgreedArbitration(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0" />
                    <span className="text-[#555] text-[13px] leading-relaxed">
                      I acknowledge the <strong>Arbitration Clause and Class Action Waiver</strong> (Section 9) and waive my right to a jury trial and class action participation.
                    </span>
                  </label>
                </div>

                <div className="p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/20 mb-6">
                  <p className="text-[#555] text-[12px] leading-relaxed">
                    <strong>Legal Notice:</strong> By clicking "Execute Contract," you are creating a legally binding electronic signature under the E-SIGN Act. Your name, company, IP address, and timestamp will be permanently recorded. Venue: Travis County, Texas.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("tier")} className="flex-1 py-4 rounded-xl border-2 border-gray-200 text-[#555] text-[13px] font-bold tracking-[0.08em] uppercase hover:border-gray-400 transition-colors duration-200">← Back</button>
                  <button onClick={handleSubmit} disabled={loading || !agreed || !agreedArbitration}
                    className={`flex-2 flex-1 py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${agreed && agreedArbitration && !loading ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                    {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Executing...</> : "Execute Contract"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
