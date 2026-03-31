"use client";

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFD84D]/[0.05] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Membership
          </span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(42px, 7vw, 96px)" }}
        >
          Why Join{" "}
          <span className="text-gradient-gold">The Club?</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed"
        >
          AANGCC isn't just a cycling club. It's a movement — built on
          shared miles, shared purpose, and a community that shows up
          for each other every single ride.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Apply for Membership
          </Link>
          <Link href="/membership/members-only" className="btn-outline">
            Members Only Area
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Top Reasons ──────────────────────────────────────────────────────────────

function TopReasons() {
  const reasons = [
    {
      number: "01",
      title: "You'll Ride With Purpose",
      body: "Every group ride, every fundraising event, and every mile logged as an AANGCC member contributes to something bigger — the fight against Multiple Sclerosis and other causes close to our hearts.",
      color: "teal",
    },
    {
      number: "02",
      title: "All Levels Are Welcome",
      body: "Whether you're clipping in for the first time or training for your tenth century ride, AANGCC has a group, a pace, and a community for you. Nobody gets left behind.",
      color: "gold",
    },
    {
      number: "03",
      title: "Built-In Accountability",
      body: "When you ride with a crew, you show up. Our weekly group rides, training schedules, and event calendar keep you consistent, motivated, and moving forward.",
      color: "teal",
    },
    {
      number: "04",
      title: "Real Community",
      body: "AANGCC members don't just ride together — they celebrate together, support each other, and build friendships that last far beyond the finish line.",
      color: "gold",
    },
    {
      number: "05",
      title: "Access to Premier Events",
      body: "As a member, you'll have priority access to some of Austin's most exciting cycling events — the MS 150, Ride to End ALZ, Rosedale Ride, and exclusive club-only experiences.",
      color: "teal",
    },
    {
      number: "06",
      title: "Represent Something Great",
      body: "The AANGCC kit is more than gear — it's a badge of honor. When you roll through Austin in club colors, you're representing a community that rides with heart.",
      color: "gold",
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            6 Reasons
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Why AANGCC is{" "}
            <span className="text-gradient-teal">different.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col group
                ${r.color === "gold"
                  ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div
                className={`h-[2px] w-full ${
                  r.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />
              <div className="p-8 flex flex-col gap-4 flex-1">
                <span
                  className={`font-heading text-[48px] font-bold leading-none opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${
                    r.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"
                  }`}
                >
                  {r.number}
                </span>
                <h3 className="font-heading text-white text-[22px] font-semibold leading-snug">
                  {r.title}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What To Expect ───────────────────────────────────────────────────────────

function WhatToExpect() {
  const steps = [
    {
      step: "1",
      title: "Apply for Membership",
      body: "Fill out our contact form or reach out directly. We'll get back to you quickly with next steps and membership tier details.",
    },
    {
      step: "2",
      title: "Complete Your Waiver",
      body: "All members complete a simple Waiver of Liability before participating in any club ride or event.",
    },
    {
      step: "3",
      title: "Join Your First Ride",
      body: "Check the Ride Calendar, find a group that matches your level, and show up. That's it — you're part of the crew.",
    },
    {
      step: "4",
      title: "Get Your Kit",
      body: "Elite and Founding members receive access to exclusive AANGCC club kits. Represent the club every time you ride.",
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#FFD84D]/[0.04] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Getting Started
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            What to{" "}
            <span className="text-gradient-gold">expect.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%_-_12px)] w-[calc(100%_-_24px)] h-[1px] bg-gradient-to-r from-[#2A9D9E]/30 to-transparent z-0" />
              )}

              <div className="card-premium p-8 flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#2A9D9E]/10 border border-[#2A9D9E]/20 flex items-center justify-center">
                  <span className="font-heading text-[#2A9D9E] text-[20px] font-bold">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-heading text-white text-[20px] font-semibold">
                  {s.title}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/contact" className="btn-primary">
            Apply for Membership
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonial Strip ────────────────────────────────────────────────────────

function TestimonialStrip() {
  const quotes = [
    {
      quote: "Joining AANGCC changed the way I ride. The community, the purpose, the energy — there's nothing like it in Austin.",
      name: "Marcus T.",
      role: "Member since 2021",
    },
    {
      quote: "I came in as a beginner and never felt out of place. The group rides, the support, the friendships — all real.",
      name: "Priya S.",
      role: "MS 150 Rider",
    },
    {
      quote: "Every mile I ride with AANGCC feels like it matters. Because it does. The fundraising we do is real impact.",
      name: "Jerome W.",
      role: "Founding Member",
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(28px, 3vw, 48px)" }}
          >
            Straight from the{" "}
            <span className="text-gradient-teal">crew.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-premium p-8 flex flex-col gap-6"
            >
              {/* Quote mark */}
              <span className="font-heading text-[#2A9D9E]/30 text-[64px] leading-none -mb-4">
                "
              </span>
              <p className="text-white/60 text-[14px] leading-relaxed italic">
                {q.quote}
              </p>
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-white text-[14px] font-semibold">{q.name}</div>
                <div className="text-[#2A9D9E] text-[12px] mt-1">{q.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function WhyJoinPage() {
  return (
    <>
      <PageHero />
      <TopReasons />
      <WhatToExpect />
      <TestimonialStrip />
    </>
  );
}

