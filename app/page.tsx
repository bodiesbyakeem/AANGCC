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

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Background grid pattern */}
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

      {/* Radial glow — teal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none" />

      {/* Top-right gold accent glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFD84D]/[0.04] blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Austin, Texas
          </span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-[1.0] mb-6"
          style={{ fontSize: "clamp(52px, 9vw, 130px)" }}
        >
          All Ass.
          <br />
          <span className="text-gradient-teal">No Gas.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/60 text-[16px] lg:text-[18px] font-light max-w-[560px] mx-auto mb-12 leading-relaxed"
        >
          Austin's premier cycling club — riding hard, building community,
          and giving back to those who need it most.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/membership/why-join" className="btn-primary">
            Join The Club
          </Link>
          <Link href="/rides/ms150" className="btn-outline">
            MS 150 Team
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="mt-20 grid grid-cols-3 gap-8 max-w-[600px] mx-auto"
        >
          {[
            { value: "MS 150", label: "Annual Ride" },
            { value: "ATX", label: "Based & Proud" },
            { value: "100%", label: "Pedal Powered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-heading text-white text-[28px] lg:text-[36px] font-semibold leading-none mb-2"
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#2A9D9E] to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Mission Strip ─────────────────────────────────────────────────────────────

function MissionStrip() {
  return (
    <section className="relative bg-[#0a0a0a] border-y border-white/[0.06] py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "🚴",
              title: "Ride Together",
              body: "Weekly group rides for all levels across Austin's best routes.",
            },
            {
              icon: "❤️",
              title: "Give Back",
              body: "Proudly supporting the National Multiple Sclerosis Society through every mile.",
            },
            {
              icon: "🏆",
              title: "Push Limits",
              body: "From casual rides to the MS 150 — we train hard and celebrate harder.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-4"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-heading text-white text-[24px] font-semibold">
                {item.title}
              </h3>
              <p className="text-white/50 text-[14px] leading-relaxed max-w-[260px]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.07] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
        >
          Ready to ride with{" "}
          <span className="text-gradient-gold">purpose?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-[16px] mb-10 max-w-[480px] mx-auto"
        >
          Join a community that trains together, fundraises together,
          and never runs out of reasons to ride.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/membership/why-join" className="btn-primary">
            Become a Member
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionStrip />
      <CTABanner />
    </>
  );
}

