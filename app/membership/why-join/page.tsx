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

const REASONS = [
  { icon: "🚴", title: "Ride With Purpose", body: "Every mile you ride with AANGCC contributes to the fight against MS and Alzheimer's disease. Your membership is an act of service." },
  { icon: "👥", title: "Real Community", body: "Post-ride coffees, team dinners, group chats, and friendships that last far beyond the finish line. This is not just a club — it is a family." },
  { icon: "📅", title: "Structured Rides", body: "Weekly group rides, special events, and charity rides throughout the year. Always something on the calendar. Always someone to ride with." },
  { icon: "🏆", title: "Three Charity Events", body: "MS 150, Ride to End ALZ, and the Rosedale Ride. Participate in all three or choose the ones that speak to you most." },
  { icon: "💪", title: "All Levels Welcome", body: "Social Butterflies, Roadsters, and Cyclepaths — we have a group for every pace. No rider is ever too slow or too new." },
  { icon: "🏢", title: "Corporate Wellness", body: "Small Business and Corporate memberships bring structured wellness programming to your entire team through cycling." },
  { icon: "📸", title: "Team Photos & Media", body: "Access to professional photos from every ride and event. Your miles, your memories, beautifully captured." },
  { icon: "❤️", title: "Stand for Something", body: "AANGCC stands against MS, Alzheimer's, and everything that holds people back. When you join, you stand with us." },
];

const TIERS = [
  {
    name: "Individual",
    price: "$99",
    period: "/ year",
    tag: "Most Popular",
    description: "Single adult (18+). Anniversary-based renewal. Full access to rides, events, and community.",
    href: "/membership",
  },
  {
    name: "Family",
    price: "$149",
    period: "/ year",
    tag: "Best Value",
    description: "Up to 3 adults at the same address. Includes a guest pass and all Individual benefits.",
    href: "/membership",
  },
  {
    name: "Small Business",
    price: "$599",
    period: "/ year",
    tag: "1–14 Employees",
    description: "Employee wellness programming through cycling. Reduce healthcare costs and build team culture.",
    href: "/membership",
  },
  {
    name: "Corporate",
    price: "$1,999",
    period: "/ year",
    tag: "15–99 Employees",
    description: "Full workforce engagement, premium brand recognition, and executive visibility.",
    href: "/contact",
  },
];

function PageHero() {
  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Membership</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Why Join <span className="text-gradient-gold">AANGCC?</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/80 text-[17px] lg:text-[20px] max-w-[620px] mx-auto leading-relaxed mb-10">
          There are hundreds of cycling clubs in Austin. There is only one that rides for something this important.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/membership" className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">View Membership Plans</Link>
          <Link href="/rides" className="inline-flex items-center justify-center px-10 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">See Upcoming Rides</Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#14CFC4]/50 to-transparent pointer-events-none" />
    </section>
  );
}

function ReasonsToJoin() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">8 Reasons</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Why riders choose <span className="text-gradient-gold">AANGCC.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{r.icon}</span>
              <h3 className="font-heading text-[#111111] text-[19px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{r.title}</h3>
              <p className="text-[#666] text-[13px] leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionStatement() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Our Mission</span>
          <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            More than a club.
            <br /><span className="text-gradient-gold">A movement.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { stat: "$65,000+", label: "Raised for MS Society", sublabel: "Since founding" },
            { stat: "3", label: "Annual charity events", sublabel: "MS 150, ALZ, Rosedale" },
            { stat: "163+", label: "Team photos", sublabel: "Memories captured" },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 text-center shadow-lg"
            >
              <div className="font-heading text-[#14CFC4] text-[42px] font-bold leading-none mb-2">{item.stat}</div>
              <div className="text-[#111111] text-[14px] font-semibold mb-1">{item.label}</div>
              <div className="text-[#888] text-[11px] tracking-wide">{item.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Membership Tiers</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Find your <span className="text-gradient-gold">membership.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit bg-[#14CFC4]/10 text-[#0FAFA5]">{tier.tag}</span>
                <div>
                  <h3 className="font-heading text-[#111111] text-[24px] font-bold">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-heading text-[#FFD84D] text-[36px] font-bold leading-none" style={{ WebkitTextStroke: "1px #e6c235" }}>{tier.price}</span>
                    <span className="text-[#888] text-[13px]">{tier.period}</span>
                  </div>
                </div>
                <p className="text-[#666] text-[13px] leading-relaxed flex-1">{tier.description}</p>
                <Link href={tier.href} className="mt-2 w-full text-center py-3 rounded-xl bg-[#111111] text-white text-[12px] font-semibold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 block">
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="text-center mt-10">
          <Link href="/membership" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">
            View Full Membership Details
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function WhyJoinCTA() {
  return (
    <section className="relative py-24">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">Ready?</span>
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 76px)" }}>
            Stop watching.
            <br /><span className="text-gradient-gold">Start riding.</span>
          </h2>
          <p className="text-white/75 text-[16px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            Join AANGCC and become part of Austin's most passionate cycling community. We ride with purpose. We give back with every mile. And we never leave a rider behind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership" className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Club Today</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Ask Us Anything</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function WhyJoinPage() {
  return (
    <>
      <PageHero />
      <ReasonsToJoin />
      <MissionStatement />
      <PricingPreview />
      <WhyJoinCTA />
    </>
  );
}

