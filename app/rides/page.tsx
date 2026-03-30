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

      {/* Grid background */}
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

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Get Out & Ride
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
          Ride{" "}
          <span className="text-gradient-teal">Calendar</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          From casual weekend rides to major charity events — find your
          next ride and show up ready to roll.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Ride Teams ───────────────────────────────────────────────────────────────

function RideTeams() {
  const teams = [
    {
      name: "MS 150 Team",
      tag: "Flagship Event",
      color: "gold",
      description:
        "Our largest and most celebrated ride. The BP MS 150 takes our team from Houston to Austin across two days of powerful cycling in support of the National Multiple Sclerosis Society.",
      details: ["150 Miles", "2 Days", "Houston → Austin", "Annual Event"],
      href: "/rides/ms150",
    },
    {
      name: "Ride To End ALZ",
      tag: "Charity Ride",
      color: "teal",
      description:
        "Riding to end Alzheimer's disease. Our Ride to End ALZ team joins thousands of cyclists nationwide to raise funds and awareness for one of the most challenging diseases of our time.",
      details: ["Multi-Day", "Team Fundraising", "Nationwide Event", "Annual"],
      href: "/rides/alz",
    },
    {
      name: "Rosedale Ride",
      tag: "Community Ride",
      color: "teal",
      description:
        "A beloved Austin tradition. The Rosedale Ride brings our community together for a fun, accessible ride through Austin's iconic neighborhoods with proceeds supporting local causes.",
      details: ["Austin Local", "All Levels", "Community Fun", "Annual"],
      href: "/rides/rosedale",
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Our Teams
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Rides that{" "}
            <span className="text-gradient-gold">matter.</span>
          </motion.h2>
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-6">
          {teams.map((team, i) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden
                ${team.color === "gold"
                  ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                  team.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"
                }`}
              />

              <div className="p-8 pl-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Info */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${
                        team.color === "gold"
                          ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                          : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                      }`}
                    >
                      {team.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-white text-[28px] lg:text-[36px] font-semibold leading-tight">
                    {team.name}
                  </h3>
                  <p className="text-white/40 text-[14px] leading-relaxed max-w-[480px]">
                    {team.description}
                  </p>
                </div>

                {/* Details + CTA */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-3">
                    {team.details.map((d) => (
                      <div
                        key={d}
                        className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/50 text-[12px] font-medium tracking-wide text-center"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={team.href}
                    className={`
                      w-full text-center py-3 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300
                      ${team.color === "gold"
                        ? "bg-[#FFD84D] text-black hover:bg-white"
                        : "bg-[#2A9D9E] text-black hover:bg-[#FFD84D]"
                      }
                    `}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Ride Levels ──────────────────────────────────────────────────────────────

function RideLevels() {
  const levels = [
    {
      level: "A",
      name: "Advanced",
      pace: "18–22+ mph",
      distance: "40–80+ miles",
      body: "For strong, experienced cyclists. Fast-paced group riding with minimal stops. Competitive atmosphere.",
      color: "gold",
    },
    {
      level: "B",
      name: "Intermediate",
      pace: "14–18 mph",
      distance: "25–50 miles",
      body: "For confident riders building endurance and speed. Moderate pace with occasional regrouping.",
      color: "teal",
    },
    {
      level: "C",
      name: "Beginner",
      pace: "10–14 mph",
      distance: "10–25 miles",
      body: "For new cyclists and those returning to riding. Relaxed pace, lots of encouragement, nobody left behind.",
      color: "teal",
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Find Your Pace
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Ride Levels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/40 text-[15px] mt-4 max-w-[440px] mx-auto"
          >
            Every rider has a place in AANGCC. Find the level that fits
            where you are today — and grow from there.
          </motion.p>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((l, i) => (
            <motion.div
              key={l.level}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col
                ${l.color === "gold"
                  ? "border-[#FFD84D]/30 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              {/* Top accent */}
              <div
                className={`h-[3px] w-full ${
                  l.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />

              <div className="p-8 flex flex-col gap-5 flex-1">
                {/* Level badge */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-heading text-[28px] font-bold ${
                    l.color === "gold"
                      ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                      : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                  }`}
                >
                  {l.level}
                </div>

                <div>
                  <h3 className="font-heading text-white text-[24px] font-semibold mb-1">
                    {l.name}
                  </h3>
                  <p className="text-white/40 text-[13px] leading-relaxed">
                    {l.body}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-auto pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                  <div>
                    <div className={`text-[13px] font-semibold mb-1 ${l.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                      {l.pace}
                    </div>
                    <div className="text-white/30 text-[11px] uppercase tracking-wide">Avg Pace</div>
                  </div>
                  <div>
                    <div className={`text-[13px] font-semibold mb-1 ${l.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                      {l.distance}
                    </div>
                    <div className="text-white/30 text-[11px] uppercase tracking-wide">Distance</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/rides/levels" className="btn-outline">
            Full Ride Level Details
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Photos CTA ───────────────────────────────────────────────────────────────

function PhotosCTA() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#2A9D9E]/[0.06] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          See us in{" "}
          <span className="text-gradient-teal">action.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white/50 text-[15px] mb-10 max-w-[440px] mx-auto"
        >
          Browse our team photo gallery from rides, events, and
          celebrations across the year.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/rides/photos" className="btn-primary">
            View Team Photos
          </Link>
          <Link href="/membership/why-join" className="btn-outline">
            Join The Club
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function RidesPage() {
  return (
    <>
      <PageHero />
      <RideTeams />
      <RideLevels />
      <PhotosCTA />
    </>
  );
}
