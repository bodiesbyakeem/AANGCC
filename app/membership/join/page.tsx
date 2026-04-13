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
    id: "individual",
    name: "Individual",
    price: "$9.99",
    period: "/ month",
    tag: "Most Popular",
    description: "Single adult (18+). Full access to rides, events, and community.",
    priceId: "price_1TIHiO1NFAGhz748kcFMxZN6",
    features: ["Single adult (18+)", "Weekly group ride access", "All charity events", "Members-only portal", "Club newsletter"],
  },
  {
    id: "family",
    name: "Family",
    price: "$14.99",
    period: "/ month",
    tag: "Best Value",
    description: "Up to 3 adults at the same address. Includes a guest pass.",
    priceId: "price_1TIHkZ1NFAGhz748uQt3jF0e",
    features: ["Up to 3 adults (18+)", "Guest pass included", "All Individual benefits", "Priority event registration"],
  },
  {
    id: "small-business",
    name: "Small Business",
    price: "$119.99",
    period: "/ month",
    tag: "1–14 Employees",
    description: "Employee wellness programming through cycling.",
    priceId: "price_1TIHmA1NFAGhz7485agpe20I",
    features: ["Covers 1–14 employees", "Employee wellness program", "Community involvement", "Corporate recognition"],
  },
  {
    id: "corporate",
    name: "Corporate",
    price: "$199.99",
    period: "/ month",
    tag: "15–99 Employees",
    description: "Full workforce engagement and premium brand recognition.",
    priceId: "price_1TIHoK1NFAGhz748TLdajFqW",
    features: ["Covers 15–99 employees", "Full workforce engagement", "Executive visibility", "Premium brand placement"],
  },
];

export default function JoinPage() {
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [step, setStep] = useState<"tier" | "account">("tier");
  const [isTrial, setIsTrial] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToWaiver, setAgreedToWaiver] = useState(false);
  const [agreedToArbitration, setAgreedToArbitration] = useState(false);

  const handleContinue = () => {
    setStep("account");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: isTrial && selectedTier.trialPriceId ? selectedTier.trialPriceId : selectedTier.priceId,
          email: form.email,
          full_name: form.full_name,
          password: form.password,
          membership_type: selectedTier.name,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center py-14">
          <Link href="/">
            <img src="/images/club-logo.png" alt="AANGCC" className="w-16 h-16 object-contain mx-auto mb-4" />
          </Link>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
            <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Join AANGCC</span>
          </div>
          <h1 className="font-heading text-white text-[36px] lg:text-[52px] font-semibold leading-tight mb-3">
            Become a <span className="text-gradient-gold">Member</span>
          </h1>
          <p className="text-white/65 text-[15px] max-w-[480px] mx-auto leading-relaxed">
            Join Austin's most purpose-driven cycling community. Cancel anytime.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="flex items-center justify-center gap-3 mb-10">
          {["Choose Plan", "Create Account", "Payment"].map((s, i) => {
            const active = i === (step === "tier" ? 0 : 1);
            const done = (step === "account" && i === 0);
            return (
              <div key={s} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${done ? "bg-[#14CFC4] text-white" : active ? "bg-[#FFD84D] text-[#111]" : "bg-white/15 text-white/40"}`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <span className={`text-[12px] font-medium ${active ? "text-white" : done ? "text-[#14CFC4]" : "text-white/40"}`}>{s}</span>
                </div>
                {i < 2 && <div className={`w-8 h-[1px] ${done ? "bg-[#14CFC4]" : "bg-white/20"}`} />}
              </div>
            );
          })}
        </motion.div>

        {/* Step 1: Tier Selection */}
        {step === "tier" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
className={`text-left rounded-2xl overflow-hidden transition-all duration-300 h-full ${selectedTier.id === tier.id ? "ring-2 ring-[#FFD84D] shadow-xl scale-[1.01]" : "hover:shadow-lg hover:-translate-y-0.5"}`}
                  >
                  <div className="bg-white h-full flex flex-col">
                    <div className={`h-[4px] w-full ${selectedTier.id === tier.id ? "bg-[#FFD84D]" : "bg-gray-200"}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{tier.tag}</span>
                          <h3 className="font-heading text-[#111111] text-[22px] font-bold mt-2">{tier.name}</h3>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200 ${selectedTier.id === tier.id ? "border-[#FFD84D] bg-[#FFD84D]" : "border-gray-300"}`}>
                          {selectedTier.id === tier.id && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5L4 7L8 3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="font-heading text-[#FFD84D] text-[32px] font-bold leading-none" style={{ WebkitTextStroke: "1px #e6c235" }}>{tier.price}</span>
                        <span className="text-[#888] text-[12px]">{tier.period}</span>
                      </div>
                      <p className="text-[#666] text-[12px] leading-snug mb-4">{tier.description}</p>
                      <ul className="flex flex-col gap-1.5 flex-1">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[12px] text-[#555]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="6" fill="#14CFC4" fillOpacity="0.15" />
                              <path d="M3 6L5 8L9 4" stroke="#0FAFA5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Trial toggle — Individual and Family only */}
            {(selectedTier.id === "individual" || selectedTier.id === "family") && (
              <div className="max-w-[480px] mx-auto mb-6 p-5 rounded-2xl bg-[#FFD84D]/10 border border-[#FFD84D]/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold text-[14px]">🎯 Try for {selectedTier.trialPrice} — First Month</p>
                    <p className="text-white/60 text-[12px] mt-0.5">Then {selectedTier.price}/month. Cancel anytime within 30 days.</p>
                  </div>
                  <div onClick={() => setIsTrial(!isTrial)}
                    className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 cursor-pointer ${isTrial ? "bg-[#FFD84D]" : "bg-white/20"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${isTrial ? "left-6" : "left-1"}`} />
                  </div>
                </div>
                {isTrial && (
                  <p className="text-[#FFD84D] text-[11px] leading-relaxed">
                    ✓ Trial activated — you'll be charged {selectedTier.trialPrice} today. After 30 days your membership automatically continues at {selectedTier.price}/month unless cancelled.
                  </p>
                )}
              </div>
            )}
            <div className="text-center">
              <button onClick={handleContinue} className="inline-flex items-center justify-center px-12 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">
                {isTrial ? `Start Trial — ${selectedTier.trialPrice}` : `Continue with ${selectedTier.name} — ${selectedTier.price}/mo`}
              </button>
              <p className="text-white/40 text-[12px] mt-4">
                {isTrial ? `After 30 days, auto-renews at ${selectedTier.price}/month. Cancel anytime.` : "Cancel anytime. No long-term commitment."}
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 2: Account Creation */}
        {step === "account" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="max-w-[520px] mx-auto">

            {/* Selected plan summary */}
            <div className="bg-white/15 border border-white/20 rounded-2xl p-5 mb-6 flex items-center justify-between">
              <div>
                <div className="text-white/60 text-[11px] uppercase tracking-wide mb-0.5">Selected Plan</div>
                <div className="text-white font-semibold text-[15px]">{selectedTier.name} Membership</div>
              </div>
              <div className="text-right">
                <div className="font-heading text-[#FFD84D] text-[22px] font-bold">{selectedTier.price}</div>
                <div className="text-white/50 text-[11px]">per month</div>
              </div>
              <button onClick={() => setStep("tier")} className="text-white/40 text-[12px] hover:text-white/70 transition-colors underline ml-4">Change</button>
            </div>

            {/* Account form */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-8">
                <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-1">Create Your Account</h2>
                <p className="text-[#888] text-[13px] mb-6">You'll use these credentials to sign in to the member portal.</p>

                {error && (
                  <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Name *</label>
                    <input type="text" value={form.full_name} onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))} placeholder="Your full name" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Password *</label>
                    <input type="password" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min. 8 characters" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Confirm Password *</label>
                    <input type="password" value={form.confirm_password} onChange={(e) => setForm(p => ({ ...p, confirm_password: e.target.value }))} placeholder="Repeat your password" required className={inputClass} />
                  </div>

                <div className="flex flex-col gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-[#888] text-[11px] font-medium tracking-wide uppercase mb-1">Waiver Agreement — Required</p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={agreedToWaiver} onChange={(e) => setAgreedToWaiver(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0" />
                      <span className="text-[#555] text-[13px] leading-relaxed">
                        I have read and agree to the AANGCC <Link href="/waiver" target="_blank" className="text-[#14CFC4] hover:underline font-semibold">Waiver of Liability</Link>, including the assumption of risk, release of liability, and indemnification provisions.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={agreedToArbitration} onChange={(e) => setAgreedToArbitration(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0" />
                      <span className="text-[#555] text-[13px] leading-relaxed">
                        I specifically acknowledge the <strong>Arbitration Clause and Class Action Waiver</strong> — I waive my right to a jury trial and class action participation.
                      </span>
                    </label>
                  </div>

                  <button type="submit" disabled={loading || !form.full_name || !form.email || !form.password || !form.confirm_password || !agreedToWaiver || !agreedToArbitration}
                    className={`mt-2 w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${form.full_name && form.email && form.password && form.confirm_password && agreedToWaiver && agreedToArbitration && !loading ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Redirecting to Payment...
                      </>
                    ) : (
                      "Continue to Payment →"
                    )}
                  </button>

                  <p className="text-[#aaa] text-[11px] text-center leading-relaxed">
                    By continuing you agree to AANGCC's{" "}
                    <Link href="/more/waiver" className="text-[#14CFC4] hover:underline">Waiver of Liability</Link>{" "}
                    and{" "}
                    <Link href="/more/club-rules" className="text-[#14CFC4] hover:underline">Club Rules</Link>.
                  </p>
                </form>
              </div>
            </div>

            <p className="text-center text-white/40 text-[12px] mt-6">
              Already a member?{" "}
              <Link href="/membership/members-only" className="text-white/60 hover:text-[#FFD84D] transition-colors">Sign in here</Link>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
