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
            Our Story
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
          About{" "}
          <span className="text-gradient-teal">AANGCC</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          We are more than a cycling club. We are a community built on
          grit, camaraderie, and the belief that every mile matters.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

function OurStory() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">
              Who We Are
            </span>
            <h2
              className="font-heading text-white leading-tight mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Riding with{" "}
              <span className="text-gradient-gold">heart</span>{" "}
              since day one.
            </h2>
            <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
              <p>
                All Ass No Gas Cycling Club was born in Austin, Texas — a
                city that moves fast, lives loud, and never backs down from
                a challenge. We started as a small group of riders who
                shared one simple belief: the best rides are the ones you
                take together.
              </p>
              <p>
                Over the years, AANGCC has grown into one of Austin's most
                passionate cycling communities. We welcome riders of all
                levels — from first-timers clipping in for the first time
                to seasoned athletes chasing personal records.
              </p>
              <p>
                But what truly sets us apart is our commitment to giving
                back. Every mile we ride, every event we host, and every
                membership that joins our ranks supports the fight against
                Multiple Sclerosis through the National MS Society.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/about/we-support" className="btn-primary">
                Who We Support
              </Link>
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "ATX", label: "Home Base", color: "teal" },
              { value: "MS 150", label: "Annual Flagship Ride", color: "gold" },
              { value: "All", label: "Ride Levels Welcome", color: "teal" },
              { value: "100%", label: "Community Driven", color: "gold" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-premium p-6 flex flex-col gap-2"
              >
                <span
                  className={`font-heading text-[36px] font-semibold leading-none ${
                    stat.color === "teal" ? "text-[#2A9D9E]" : "text-[#FFD84D]"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-white/40 text-[12px] tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Core Values ──────────────────────────────────────────────────────────────

function CoreValues() {
  const values = [
    {
      number: "01",
      title: "Inclusivity",
      body: "Every rider belongs here. No matter your pace, experience, or background — AANGCC is your home.",
    },
    {
      number: "02",
      title: "Community",
      body: "We train together, celebrate together, and show up for each other on and off the road.",
    },
    {
      number: "03",
      title: "Purpose",
      body: "Our rides carry meaning. Every mile we log contributes to the fight against Multiple Sclerosis.",
    },
    {
      number: "04",
      title: "Excellence",
      body: "We push limits — setting personal goals, supporting each other's growth, and always riding smarter.",
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
            What Drives Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Our Core Values
          </motion.h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className="text-[#2A9D9E]/30 font-heading text-[48px] font-bold leading-none group-hover:text-[#2A9D9E]/50 transition-colors duration-300">
                {v.number}
              </span>
              <h3 className="font-heading text-white text-[22px] font-semibold">
                {v.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function AboutCTA() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#2A9D9E]/[0.07] blur-[100px] rounded-full" />
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
          Be part of something{" "}
          <span className="text-gradient-teal">bigger.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white/50 text-[15px] mb-10 max-w-[440px] mx-auto"
        >
          Join AANGCC and ride with purpose. Every membership supports
          our mission and grows our community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/membership/why-join" className="btn-primary">
            Join The Club
          </Link>
          <Link href="/contact" className="btn-outline">
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <OurStory />
      <CoreValues />
      <AboutCTA />
    </>
  );
}
