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

// ─── Membership Tiers ─────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Individual",
    price: "$99",
    period: "/ year",
    tag: "Most Popular",
    description: "Annual adult membership for single adults ages 18 and up. Dues are based on your anniversary date — not calendar year.",
    features: [
      "Single adult (18+)",
      "Anniversary-based renewal",
      "Weekly group ride access",
      "Club newsletter & events",
      "MS Society fundraising participation",
      "Members-only community access",
      "Electronically debited dues",
    ],
    cta: "Get Started",
  },
  {
    name: "Family",
    price: "$149",
    period: "/ year",
    tag: "Best Value",
    description: "Up to 3 adults at the same address, plus a guest pass for friends and family who are not current members.",
    features: [
      "Up to 3 adults (18+)",
      "Same address required",
      "Guest pass included",
      "Anniversary-based renewal",
      "All Individual benefits",
      "Priority event registration",
      "Electronically debited dues",
    ],
    cta: "Get Started",
  },
  {
    name: "Small Business",
    price: "$599",
    period: "/ year",
    tag: "1–14 Employees",
    description: "Holistic wellness programming that engages your entire workforce. Encourage employees to cycle to work or for leisure.",
    features: [
      "Covers 1–14 employees",
      "Employee wellness program",
      "Reduce healthcare costs via cycling",
      "Cardiovascular health improvement",
      "Mental health & energy benefits",
      "Community involvement",
      "Corporate recognition",
    ],
    cta: "Get Started",
  },
  {
    name: "Corporate",
    price: "$1,999",
    period: "/ year",
    tag: "15–99 Employees",
    description: "Enterprise wellness solution for larger organizations. Say goodbye to siloed wellness programs and hello to holistic programming.",
    features: [
      "Covers 15–99 employees",
      "Full workforce engagement",
      "Executive visibility & recognition",
      "Dedicated account support",
      "All Small Business benefits",
      "Premium brand placement",
      "Co-branded opportunities",
    ],
    cta: "Contact Us",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: "🚴",
    title: "Weekly Group Rides",
    body: "Join organized rides across Austin's best routes. All levels welcome — from casual to competitive.",
  },
  {
    icon: "🏆",
    title: "Race & Event Access",
    body: "Priority access to the MS 150, Ride to End ALZ, Rosedale Ride, and exclusive club events.",
  },
  {
    icon: "👕",
    title: "Club Kit & Gear",
    body: "Represent AANGCC in style with exclusive member-only club kits and branded merchandise.",
  },
  {
    icon: "📸",
    title: "Team Photos & Media",
    body: "Full access to professional team photos and media from every club event and major ride.",
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
  {
    icon: "🧠",
    title: "ALZ Ride Team",
    body: "Join the AANGCC team for the Ride to End ALZ and help fight Alzheimer's disease mile by mile.",
  },
  {
    icon: "🏙️",
    title: "Austin Roots",
    body: "Be part of Austin's most socially responsible and community-driven cycling club.",
  },
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FFD84D]/[0.05] blur-[120px] pointer-events-none rounded-full" />

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
          Join The{" "}
          <span className="text-gradient-gold">Movement</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed mb-10"
        >
          Become a member of Austin's most passionate cycling community.
          Ride with purpose. Train with family. Give back with every mile.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/membership/why-join" className="btn-primary">
            Why Join The Club?
          </Link>
          <Link href="/membership/members-only" className="btn-outline">
            Members Only
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── 2. PRICING CARDS ─────────────────────────────────────────────────────────

function PricingCards() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-[#FFD84D]/[0.04] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Choose Your Plan
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Membership{" "}
            <span className="text-gradient-gold">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/40 text-[15px] mt-4 max-w-[480px] mx-auto"
          >
            Every tier supports our mission. All membership dues are
            electronically debited and based on your anniversary date.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="
                relative bg-white rounded-2xl overflow-hidden flex flex-col
                shadow-[0_4px_40px_rgba(0,0,0,0.4)]
                hover:shadow-[0_20px_60px_rgba(255,216,77,0.15)]
                transition-shadow duration-300
              "
            >
              {/* Gold top accent bar */}
              <div className="h-[4px] w-full bg-[#FFD84D]" />

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Tag */}
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit bg-[#FFD84D]/20 text-[#1a1a1a]">
                  {tier.tag}
                </span>

                {/* Name */}
                <h3 className="font-heading text-[#0a0a0a] text-[26px] font-bold leading-tight">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-[#FFD84D] text-[48px] font-bold leading-none" style={{ textShadow: "none", WebkitTextStroke: "1px #e6c235" }}>
                    {tier.price}
                  </span>
                  <span className="text-[#666] text-[14px]">{tier.period}</span>
                </div>

                {/* Description */}
                <p className="text-[#555] text-[13px] leading-relaxed border-t border-[#eee] pt-4">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[13px] text-[#333]">
                      <svg
                        className="flex-shrink-0 mt-[3px]"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <circle cx="7" cy="7" r="7" fill="#FFD84D" />
                        <path
                          d="M4 7L6 9L10 5"
                          stroke="#1a1a1a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.cta === "Contact Us" ? "/contact" : "/membership/why-join"}
                  className="
                    mt-4 w-full text-center py-3 rounded-xl
                    bg-[#0a0a0a] text-white text-[12px] font-semibold tracking-[0.08em] uppercase
                    hover:bg-[#FFD84D] hover:text-[#0a0a0a]
                    transition-colors duration-300
                    block
                  "
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center text-white/25 text-[12px] mt-10"
        >
          * We do not accept membership submitted by a minor (under 18 years of age).
          All membership dues are electronically debited.
        </motion.p>
      </div>
    </section>
  );
}

// ─── 3. WHY JOIN SECTION ──────────────────────────────────────────────────────

function WhyJoin() {
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
            Member Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Everything included.{" "}
            <span className="text-gradient-teal">Nothing held back.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="card-premium p-7 flex flex-col gap-4 group"
            >
              <span className="text-3xl">{benefit.icon}</span>
              <h3 className="font-heading text-white text-[19px] font-semibold group-hover:text-[#2A9D9E] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {benefit.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. CTA ───────────────────────────────────────────────────────────────────

function MembershipCTA() {
  return (
    <section className="relative py-28 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.07] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Ready to Ride?
          </span>

          <h2
            className="font-heading text-white leading-tight"
            style={{ fontSize: "clamp(36px, 6vw, 76px)" }}
          >
            Become a{" "}
            <span className="text-gradient-teal">Member</span>
          </h2>

          <p className="text-white/50 text-[16px] leading-relaxed max-w-[520px] mx-auto">
            Join Austin's most passionate cycling community. Every membership
            supports our mission and connects you with riders who show up —
            for the miles and for each other.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <Link href="/membership/why-join" className="btn-primary">
              Become a Member
            </Link>
            <Link href="/contact" className="btn-outline">
              Have Questions? Contact Us
            </Link>
          </div>
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
      <PricingCards />
      <WhyJoin />
      <MembershipCTA />
    </>
  );
}
