"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

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
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Make an Impact</span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Donate to{" "}
          <span className="text-gradient-teal">AANGCC</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed">
          You don't have to ride to make a difference. Every dollar you
          donate fuels our mission, supports our riders, and goes
          directly toward the causes we fight for.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Donation Cards ───────────────────────────────────────────────────────────

function DonationCards() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Choose Your Cause
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Every dollar{" "}
            <span className="text-gradient-teal">rides with us.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">

          {/* MS Society Donation Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-[#2A9D9E]/25 bg-[#2A9D9E]/[0.03] overflow-hidden flex flex-col"
          >
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />
            <div className="p-8 flex flex-col gap-5 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2A9D9E] animate-pulse" />
                <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.2em] uppercase">Flagship Event</span>
              </div>

              <div>
                <h3 className="font-heading text-white text-[28px] font-semibold mb-2">
                  MS 150 Team
                </h3>
                <p className="text-[#2A9D9E] text-[13px] font-medium">
                  National Multiple Sclerosis Society
                </p>
              </div>

              <p className="text-white/50 text-[14px] leading-relaxed flex-1">
                Support the AANGCC MS 150 team and help fight Multiple
                Sclerosis. Every dollar donated goes directly to the
                National MS Society's research, programs, and advocacy.
                Nearly 1 million Americans live with MS — your donation
                helps change that.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  "Funds MS research and clinical trials",
                  "Supports MS patient programs nationwide",
                  "Drives advocacy for MS policy",
                  "100% goes to the National MS Society",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/50 text-[13px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D9E] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="https://events.nationalmssociety.org/teams/90906/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4 w-full text-center py-4 rounded-xl
                  bg-[#2A9D9E] text-black text-[13px] font-semibold tracking-[0.08em] uppercase
                  hover:bg-[#FFD84D] transition-colors duration-300
                  shadow-[0_0_24px_rgba(42,157,158,0.25)]
                  hover:shadow-[0_0_24px_rgba(255,216,77,0.25)]
                  block
                "
              >
                Donate to MS 150 Team →
              </a>
            </div>
          </motion.div>

          {/* ALZ Donation Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-[#FFD84D]/25 bg-[#FFD84D]/[0.03] overflow-hidden flex flex-col"
          >
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" />
            <div className="p-8 flex flex-col gap-5 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD84D] animate-pulse" />
                <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.2em] uppercase">Charity Ride</span>
              </div>

              <div>
                <h3 className="font-heading text-white text-[28px] font-semibold mb-2">
                  Ride to End ALZ
                </h3>
                <p className="text-[#FFD84D] text-[13px] font-medium">
                  Alzheimer's Association
                </p>
              </div>

              <p className="text-white/50 text-[14px] leading-relaxed flex-1">
                Support the AANGCC Ride to End ALZ team and help fight
                Alzheimer's disease. Over 6.7 million Americans are
                living with Alzheimer's. Your donation funds research,
                care programs, and the fight for a cure.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  "Funds Alzheimer's research and clinical trials",
                  "Supports care programs for patients and families",
                  "Drives awareness and early detection",
                  "100% goes to the Alzheimer's Association",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/50 text-[13px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4 w-full text-center py-4 rounded-xl
                  bg-[#FFD84D] text-black text-[13px] font-semibold tracking-[0.08em] uppercase
                  hover:bg-white transition-colors duration-300
                  shadow-[0_0_24px_rgba(255,216,77,0.25)]
                  block
                "
              >
                Donate to ALZ Ride Team →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Impact Section ───────────────────────────────────────────────────────────

function ImpactSection() {
  const stats = [
    { value: "~1M", label: "Americans with MS", color: "teal" },
    { value: "6.7M", label: "Americans with Alzheimer's", color: "gold" },
    { value: "100%", label: "Goes to the cause", color: "teal" },
    { value: "Every", label: "Mile makes a difference", color: "gold" },
  ];

  return (
    <section className="relative bg-black py-24 border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Why your donation{" "}
            <span className="text-gradient-gold">matters.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border p-6 text-center ${s.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}
            >
              <div className={`font-heading text-[36px] lg:text-[44px] font-bold leading-none mb-3 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {s.value}
              </div>
              <div className="text-white/30 text-[11px] tracking-wide uppercase leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other ways to help */}
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
              body: "Businesses can amplify our mission through structured corporate sponsorship packages.",
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
              <h3 className="font-heading text-white text-[22px] font-semibold">{item.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed flex-1">{item.body}</p>
              <Link
                href={item.href}
                className={`mt-2 text-center py-2.5 rounded-xl text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${item.color === "gold" ? "bg-[#FFD84D]/10 text-[#FFD84D] hover:bg-[#FFD84D] hover:text-black" : "bg-[#2A9D9E]/10 text-[#2A9D9E] hover:bg-[#2A9D9E] hover:text-black"}`}
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
      <DonationCards />
      <ImpactSection />
    </>
  );
}
