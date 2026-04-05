"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const TIERS = [
  {
    name: "Individual",
    price: "$9.99",
    period: "/ month",
    tag: "Most Popular",
    description: "Annual adult membership for single adults ages 18 and up. Dues are based on your anniversary date — not calendar year.",
    features: [
      "Single adult (18+)",
      "Anniversary-based renewal",
      "Weekly group ride access",
      "Club newsletter & events",
      "MS Society fundraising participation",
      "Members-only portal access",
      "Club shop access",
    ],
    cta: "Get Started",
  },
  {
    name: "Family",
    price: "$14.99",
    period: "/ month",
    tag: "Best Value",
    description: "Up to 3 adults at the same address, plus a guest pass for friends and family who are not current members.",
    features: [
      "Up to 3 adults (18+)",
      "Same address required",
      "Guest pass included",
      "Anniversary-based renewal",
      "All Individual benefits",
      "Priority event registration",
      "Club shop access",
    ],
    cta: "Get Started",
  },
  {
    name: "Small Business",
    price: "$119.99",
    period: "/ month",
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
    price: "$199.99",
    period: "/ month",
    tag: "15–99 Employees",
    description: "Enterprise wellness solution for larger organizations. Full workforce engagement and premium brand recognition.",
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

const BENEFITS = [
  { icon: "🚴", title: "Weekly Group Rides", body: "Join organized rides across Austin's best routes. All levels welcome — from casual to competitive." },
  { icon: "🏆", title: "Race & Event Access", body: "Priority access to the MS 150, Ride to End ALZ, Rosedale Ride, and exclusive club events." },
  { icon: "👕", title: "Club Kit & Gear", body: "Access to the members-only club shop — jerseys, socks, apparel, and exclusive branded merchandise." },
  { icon: "📸", title: "Team Photos & Media", body: "Full access to professional team photos and media from every club event and major ride." },
  { icon: "❤️", title: "MS Society Support", body: "Your membership directly contributes to fundraising efforts for the National Multiple Sclerosis Society." },
  { icon: "🤝", title: "Community Network", body: "Connect with a network of passionate cyclists, sponsors, and supporters across Austin and beyond." },
  { icon: "🧠", title: "ALZ Ride Team", body: "Join the AANGCC team for the Ride to End ALZ and help fight Alzheimer's disease mile by mile." },
  { icon: "🏙️", title: "Austin Roots", body: "Be part of Austin's most socially responsible and community-driven cycling club." },
];

function PageHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Membership</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Join The <span className="text-gradient-gold">Movement</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/80 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed mb-10">
          Become a member of Austin's most passionate cycling community. Ride with purpose. Train with family. Give back with every mile.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/membership/why-join" className="btn-primary">Why Join The Club?</Link>
          <Link href="/membership/members-only" className="btn-outline">Sign In to Portal</Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function PricingCards() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-black/[0.06] blur-[140px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Choose Your Plan</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Membership <span className="text-gradient-gold">Pricing</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="text-white/75 text-[15px] mt-4 max-w-[480px] mx-auto">
            Every tier supports our mission. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 flex flex-col gap-5 flex-1">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit bg-[#14CFC4]/10 text-[#0FAFA5]">{tier.tag}</span>
                <div>
                  <h3 className="font-heading text-[#111111] text-[26px] font-bold leading-tight">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-heading text-[#FFD84D] text-[40px] font-bold leading-none" style={{ WebkitTextStroke: "1px #e6c235" }}>{tier.price}</span>
                    <span className="text-[#888] text-[14px]">{tier.period}</span>
                  </div>
                  <p className="text-[#666] text-[13px] leading-snug mt-3 border-t border-[#eee] pt-3">{tier.description}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[13px] text-[#444]">
                      <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="#14CFC4" fillOpacity="0.15" />
                        <path d="M5 8L7 10L11 6" stroke="#0FAFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.cta === "Contact Us" ? "/contact" : "/membership/join"}
                  className="mt-4 w-full text-center py-3 rounded-xl bg-[#111111] text-white text-[12px] font-semibold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 block"
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }} className="text-center text-white/60 text-[12px] mt-10">
          * We do not accept membership submitted by a minor (under 18 years of age). Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}

function WhyJoin() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/75 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Member Benefits</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Everything included. <span className="text-gradient-gold">Nothing held back.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div key={benefit.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{benefit.icon}</span>
              <h3 className="font-heading text-[#111111] text-[19px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{benefit.title}</h3>
              <p className="text-[#555] text-[13px] leading-relaxed">{benefit.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-white/[0.08] blur-[100px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col gap-6">
          <span className="text-white/75 text-[11px] font-semibold tracking-[0.25em] uppercase">Ready to Ride?</span>
          <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(36px, 6vw, 76px)" }}>
            Become a <span className="text-gradient-gold">Member</span>
          </h2>
          <p className="text-white/80 text-[16px] leading-relaxed max-w-[520px] mx-auto">
            Join Austin's most passionate cycling community. Every membership supports our mission and connects you with riders who show up — for the miles and for each other.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <Link href="/membership/join" className="btn-primary">Become a Member</Link>
            <Link href="/contact" className="btn-outline">Have Questions? Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
