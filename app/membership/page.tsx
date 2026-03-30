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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFD84D]/[0.05] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">

        {/* Eyebrow */}
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
          Join the{" "}
          <span className="text-gradient-gold">Movement</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          Become a member of Austin's most passionate cycling community.
          Ride with purpose. Train with family. Give back with every mile.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/membership/why-join" className="btn-primary">
            Why Join The Club?
          </Link>
          <Link href="/membership/members-only" className="btn-outline">
            Members Only
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────

function MemberBenefits() {
  const benefits = [
    {
      icon: "🚴",
      title: "Weekly Group Rides",
      body: "Join organized rides across Austin's best routes. All levels welcome — from casual to competitive.",
    },
    {
      icon: "🏆",
      title: "Race & Event Access",
      body: "Get priority access to club-organized events including the MS 150, Rosedale Ride, and more.",
    },
    {
      icon: "👕",
      title: "Club Kit & Gear",
      body: "Represent AANGCC in style with exclusive member-only club kits and branded merchandise.",
    },
    {
      icon: "📸",
      title: "Team Photos & Media",
      body: "Access to professional team photos and media from every club event and major ride.",
    },
    {
      icon: "❤️",
      title: "MS Society Support",
      body: "Your membership directly contributes to fundraising efforts for the National Multiple Sclerosis Society.",
    },
    {
      icon: "🤝",
      title: "Community Network",
      body: "Connect with a network of passionate cyclists, sponsors, and supporters across Austin and beyond.",
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
            Member Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Everything included.{" "}
            <span className="text-gradient-teal">Nothing held back.</span>
          </motion.h2>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-heading text-white text-[22px] font-semibold group-hover:text-[#2A9D9E] transition-colors duration-300">
                {b.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Membership Tiers ─────────────────────────────────────────────────────────

function MembershipTiers() {
  const tiers = [
    {
      name: "Rider",
      tag: "Get Started",
      color: "teal",
      features: [
        "Weekly group ride access",
        "Club newsletter",
        "Event invitations",
        "MS Society fundraising participation",
        "Members-only community access",
      ],
    },
    {
      name: "Elite",
      tag: "Most Popular",
      color: "gold",
      features: [
        "Everything in Rider",
        "Club kit & branded gear",
        "Priority event registration",
        "Team photo access",
        "Dedicated ride team placement",
        "Corporate sponsor recognition",
      ],
    },
    {
      name: "Founding",
      tag: "Premium",
      color: "teal",
      features: [
        "Everything in Elite",
        "Founding member badge",
        "VIP event access",
        "Club leadership input",
        "Lifetime recognition on club roster",
        "Exclusive founding member kit",
      ],
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Choose Your Level
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Membership Tiers
          </motion.h2>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col
                ${tier.color === "gold"
                  ? "border-[#FFD84D]/30 bg-[#FFD84D]/[0.03]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              {/* Top accent bar */}
              <div
                className={`h-[3px] w-full ${
                  tier.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />

              <div className="p-8 flex flex-col gap-6 flex-1">
                {/* Tag */}
                <span
                  className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit ${
                    tier.color === "gold"
                      ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                      : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                  }`}
                >
                  {tier.tag}
                </span>

                {/* Name */}
                <h3
                  className={`font-heading text-[36px] font-semibold ${
                    tier.color === "gold" ? "text-[#FFD84D]" : "text-white"
                  }`}
                >
                  {tier.name}
                </h3>

                {/* Divider */}
                <div className="divider-teal" />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[13px] text-white/60">
                      <span
                        className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          tier.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/membership/why-join"
                  className={`
                    mt-4 w-full text-center py-3 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300
                    ${tier.color === "gold"
                      ? "bg-[#FFD84D] text-black hover:bg-white"
                      : "bg-[#2A9D9E] text-black hover:bg-[#FFD84D]"
                    }
                  `}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function MembershipCTA() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#FFD84D]/[0.05] blur-[100px] rounded-full" />
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
          Have questions?{" "}
          <span className="text-gradient-gold">We've got answers.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white/50 text-[15px] mb-10 max-w-[440px] mx-auto"
        >
          Check out our FAQ or reach out directly — we're happy to help
          you find the right membership for your riding goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/faq" className="btn-primary">
            View FAQ
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function MembershipPage() {
  return (
    <>
      <PageHero />
      <MemberBenefits />
      <MembershipTiers />
      <MembershipCTA />
    </>
  );
}
