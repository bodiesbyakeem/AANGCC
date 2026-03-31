"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black pt-[72px]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,157,158,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,157,158,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Make an Impact
          </span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(42px, 7vw, 96px)" }}
        >
          Donate to{" "}
          <span className="text-gradient-teal">AANGCC</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          You don't have to ride to make a difference. Every dollar you
          donate fuels our mission, supports our riders, and goes
          directly toward the causes we fight for.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Donation Section ─────────────────────────────────────────────────────────

function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  const displayAmount = customAmount
    ? `$${customAmount}`
    : selectedAmount
    ? `$${selectedAmount}`
    : "$0";

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── Left: Impact Info ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
              >
                Where It Goes
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-heading text-white leading-tight"
                style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
              >
                Every dollar{" "}
                <span className="text-gradient-teal">rides with us.</span>
              </motion.h2>
            </div>

            {/* Impact cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  amount: "$25",
                  impact: "Covers a rider's event registration supplies for one charity ride.",
                  color: "teal",
                },
                {
                  amount: "$50",
                  impact: "Funds team training materials and safety gear for one ride session.",
                  color: "gold",
                },
                {
                  amount: "$100",
                  impact: "Directly contributes to our MS Society fundraising team minimum.",
                  color: "teal",
                },
                {
                  amount: "$250",
                  impact: "Sponsors a new member's first year and gets them on the road.",
                  color: "gold",
                },
                {
                  amount: "$500+",
                  impact: "Becomes a named supporter in our annual MS 150 fundraising campaign.",
                  color: "teal",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.amount}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`
                    flex items-center gap-5 p-4 rounded-xl border
                    ${item.color === "gold"
                      ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"
                      : "border-white/[0.07] bg-[#141414]"
                    }
                  `}
                >
                  <div className={`font-heading text-[24px] font-bold flex-shrink-0 ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                    {item.amount}
                  </div>
                  <p className="text-white/40 text-[13px] leading-snug">
                    {item.impact}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Causes */}
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-4">
                Donations Support
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "National Multiple Sclerosis Society", color: "teal" },
                  { label: "Alzheimer's Association", color: "gold" },
                  { label: "AANGCC Club Operations & Events", color: "teal" },
                  { label: "Austin Local Community Causes", color: "gold" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 text-white/50 text-[13px]">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"}`} />
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Donation Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl border border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.02] overflow-hidden">
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />

              <div className="p-8 lg:p-10 flex flex-col gap-7">
                <div>
                  <h3 className="font-heading text-white text-[28px] font-semibold mb-1">
                    Make a Donation
                  </h3>
                  <p className="text-white/40 text-[13px]">
                    Choose an amount and frequency below. You'll be directed
                    to our secure payment processor to complete your donation.
                  </p>
                </div>

                {/* Frequency toggle */}
                <div>
                  <div className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium mb-3">
                    Frequency
                  </div>
                  <div className="flex rounded-xl border border-white/[0.08] overflow-hidden w-fit">
                    {(["one-time", "monthly"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFrequency(f)}
                        className={`
                          px-5 py-2.5 text-[12px] font-semibold tracking-wide capitalize transition-all duration-200
                          ${frequency === f
                            ? "bg-[#2A9D9E] text-black"
                            : "bg-transparent text-white/40 hover:text-white"
                          }
                        `}
                      >
                        {f === "one-time" ? "One-Time" : "Monthly"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount presets */}
                <div>
                  <div className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium mb-3">
                    Select Amount
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                    {PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`
                          py-3 rounded-xl text-[13px] font-semibold border transition-all duration-200
                          ${selectedAmount === amount && !customAmount
                            ? "bg-[#2A9D9E] text-black border-[#2A9D9E]"
                            : "bg-transparent text-white/50 border-white/[0.08] hover:border-[#2A9D9E]/40 hover:text-white"
                          }
                        `}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[14px]">$</span>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="
                        w-full pl-8 pr-5 py-3 rounded-xl
                        bg-white/[0.04] border border-white/[0.08]
                        text-white text-[14px] placeholder-white/25
                        focus:outline-none focus:border-[#2A9D9E]/50
                        transition-colors duration-200
                      "
                    />
                  </div>
                </div>

                {/* Donor info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", placeholder: "First name", type: "text" },
                    { label: "Last Name", placeholder: "Last name", type: "text" },
                    { label: "Email Address", placeholder: "your@email.com", type: "email" },
                    { label: "Phone (Optional)", placeholder: "+1 (555) 000-0000", type: "tel" },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-2">
                      <label className="text-white/40 text-[11px] tracking-[0.12em] uppercase font-medium">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="
                          w-full px-4 py-3 rounded-xl
                          bg-white/[0.04] border border-white/[0.08]
                          text-white text-[14px] placeholder-white/20
                          focus:outline-none focus:border-[#2A9D9E]/40
                          transition-colors duration-200
                        "
                      />
                    </div>
                  ))}
                </div>

                {/* Summary + CTA */}
                <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white/30 text-[11px] uppercase tracking-wide mb-1">
                      Your {frequency === "monthly" ? "Monthly" : ""} Donation
                    </div>
                    <div className="font-heading text-[#2A9D9E] text-[32px] font-bold leading-none">
                      {displayAmount}
                    </div>
                  </div>
                  <button className="btn-primary whitespace-nowrap">
                    Donate Now
                  </button>
                </div>

                <p className="text-white/25 text-[11px] text-center">
                  🔒 Secure payment processing. AANGCC will never share your information.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Other Ways to Help ───────────────────────────────────────────────────────

function OtherWaysToHelp() {
  return (
    <section className="relative py-24 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#FFD84D]/[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            Other ways to{" "}
            <span className="text-gradient-gold">give back.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🚴",
              title: "Ride With Us",
              body: "Join AANGCC and raise funds as a rider at the MS 150, Ride to End ALZ, or Rosedale Ride.",
              href: "/rides",
              cta: "View Rides",
              color: "teal",
            },
            {
              icon: "🏢",
              title: "Corporate Sponsorship",
              body: "Businesses can amplify our mission and reach through structured corporate sponsorship packages.",
              href: "/more/sponsorship",
              cta: "Sponsor AANGCC",
              color: "gold",
            },
            {
              icon: "🤝",
              title: "Join The Club",
              body: "Membership dues directly support club operations and our charitable fundraising efforts.",
              href: "/membership/why-join",
              cta: "Become a Member",
              color: "teal",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-premium p-8 flex flex-col gap-4"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-heading text-white text-[22px] font-semibold">
                {item.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed flex-1">
                {item.body}
              </p>
              <Link
                href={item.href}
                className={`
                  mt-2 text-center py-2.5 rounded-xl text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300
                  ${item.color === "gold"
                    ? "bg-[#FFD84D]/10 text-[#FFD84D] hover:bg-[#FFD84D] hover:text-black"
                    : "bg-[#2A9D9E]/10 text-[#2A9D9E] hover:bg-[#2A9D9E] hover:text-black"
                  }
                `}
              >
                {item.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function DonatePage() {
  return (
    <>
      <PageHero />
      <DonationSection />
      <OtherWaysToHelp />
    </>
  );
}

