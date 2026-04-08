"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};
function CountdownClock({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-white text-[12px] font-bold tracking-[0.25em] uppercase" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>2026 Texas Bike MS 150 · April 25</p>
      <div className="flex items-center gap-3">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(12px)" }}>
                <span className="font-heading text-white text-[32px] font-bold leading-none">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-medium">{unit.label}</span>
            </div>
            {i < 3 && <span className="text-white/40 text-[28px] font-light mb-5">:</span>}
          </div>
        ))}
      </div>
      <Link href="/rides/ms150"
        className="mt-2 text-[#FFD84D] text-[12px] font-semibold tracking-[0.15em] uppercase hover:text-white transition-colors duration-200">
        Join Our MS 150 Team →
      </Link>
    </div>
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────────────


function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-8">
          <span className="h-[1px] w-10 bg-white/60" />
          <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">Austin, Texas · Est. AANGCC</span>
          <span className="h-[1px] w-10 bg-white/60" />
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-[1.0] mb-6" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
          More Than Miles.
          <br />
          <span className="text-gradient-gold">A Movement.</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/80 text-[17px] lg:text-[20px] font-light max-w-[560px] mx-auto mb-12 leading-relaxed">
          A cycling community built on purpose, connection, and impact.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex items-center justify-center">
          <CountdownClock targetDate="2026-04-25T06:00:00" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}

// ─── 2. VALUE STATEMENT ───────────────────────────────────────────────────────

function ValueStatement() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-white/[0.08] blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">Who We Are</span>
          <h2 className="font-heading text-white leading-tight mb-8" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            We don't just ride.
            <br />
            <span className="text-gradient-gold">We ride for something.</span>
          </h2>
          <p className="text-white/80 text-[17px] leading-relaxed max-w-[680px] mx-auto">
            All Ass No Gas Cycling Club is Austin's premier cycling community — a family of riders united by grit, generosity, and the belief that every mile can make a difference. We train hard, give back harder, and never leave a rider behind.
          </p>
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── 3. ABOUT PREVIEW ────────────────────────────────────────────────────────

function AboutPreview() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-white/60" />
              <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">About AANGCC</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 54px)" }}>
              Born in Austin.
              <br />
              <span className="text-gradient-gold">Built on purpose.</span>
            </h2>
            <div className="space-y-4 text-white/80 text-[15px] leading-relaxed">
              <p>AANGCC started as a small group of riders who believed the best rides are the ones you take together. Over the years, we've grown into one of Austin's most passionate cycling communities — welcoming riders of every level, background, and pace.</p>
              <p>But what truly sets us apart is our commitment to giving back. Every mile we ride, every event we host, and every membership that joins our ranks supports the fight against Multiple Sclerosis through the National MS Society.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/about" className="btn-primary">Our Story</Link>
              <Link href="/about/we-support" className="btn-outline">Who We Support</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="/images/2025 MS 150 48.jpg" alt="AANGCC Cycling Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
              <div className="font-heading text-[#14CFC4] text-[28px] font-bold leading-none">MS 150</div>
              <div className="text-[#111111] text-[11px] tracking-wide uppercase mt-1 font-medium">Annual Flagship Ride</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. WHY WE RIDE ───────────────────────────────────────────────────────────

function WhyWeRide() {
  const cards = [
    { icon: "❤️", title: "We Ride for MS", body: "Every mile we log contributes to the fight against Multiple Sclerosis. The Texas MS 150 is our flagship event — 156 miles from Austin to College Station, Texas to support individuals battling MS." },
    { icon: "🧠", title: "We Ride for ALZ", body: "Alzheimer's disease affects millions of families. Our Ride to End ALZ team raises critical funds and awareness for the Alzheimer's Association every year." },
    { icon: "🌹", title: "Rosedale Ride", body: "The Rosedale Ride keeps us rooted in the Austin community we love. Supporting The Rosedale School is important to the club because funds raised support students with disabilities and complex medical needs." },
  ];

  return (
    <section className="relative py-24">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Our Purpose</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Why We <span className="text-gradient-gold">Ride</span>
          </motion.h2>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-[1000px] mx-auto">
          {cards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex-1"
            >
              <span className="text-4xl">{card.icon}</span>
              <h3 className="font-heading text-[#111111] text-[22px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{card.title}</h3>
              <p className="text-[#444444] text-[13px] leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. MEMBERSHIP PREVIEW ────────────────────────────────────────────────────

function MembershipPreview() {
  const tiers = [
    { name: "Individual", price: "$9.99", period: "/ month", tag: "Most Popular", features: ["Single adult (18+)", "Anniversary-based renewal", "Weekly group ride access", "Club newsletter & events", "MS Society fundraising", "Members-only portal"] },
    { name: "Family", price: "$14.99", period: "/ month", tag: "Best Value", features: ["Up to 2 adults (18+)", "Same address required", "Guest pass included", "Anniversary-based renewal", "All Individual benefits", "Priority event registration"] },
    { name: "Small Business", price: "$119.99", period: "/ month", tag: "1–14 Employees", features: ["Covers 1–14 employees", "Employee wellness program", "Reduce healthcare costs", "Community involvement", "All Family benefits", "Corporate recognition"] },
    { name: "Corporate", price: "$199.99", period: "/ month", tag: "15–99 Employees", features: ["Covers 15–99 employees", "Full workforce engagement", "Executive visibility", "Dedicated account support", "All Small Business benefits", "Premium brand placement"] },
  ];

  return (
    <section className="relative py-24">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Membership</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Choose your <span className="text-gradient-gold">level.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 flex flex-col gap-5 flex-1">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit bg-[#14CFC4]/10 text-[#0FAFA5]">{tier.tag}</span>
                <div>
                  <h3 className="font-heading text-[#111111] text-[24px] font-bold">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-heading text-[#FFD84D] text-[36px] font-bold leading-none" style={{ WebkitTextStroke: "1px #e6c235" }}>{tier.price}</span>
                    <span className="text-[#888] text-[13px]">{tier.period}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-[#eee]" />
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[12px] text-[#444]">
                      <svg className="flex-shrink-0 mt-[3px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="#14CFC4" fillOpacity="0.2" />
                        <path d="M4 7L6 9L10 5" stroke="#0FAFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/membership/join" className="mt-4 w-full text-center py-3 rounded-xl bg-[#111111] text-white text-[12px] font-semibold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 block">
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="text-center mt-10">
          <Link href="/membership" className="btn-outline">View Full Membership Details</Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 6. COMMUNITY IMPACT ─────────────────────────────────────────────────────

const YEAR_DATA = [
  { year: "2021", org: "MS Society", raised: "$1,100", donations: 21, avg: "$58.38", largest: "$100", members: 2 },
  { year: "2022", org: "MS Society", raised: "$7,788", donations: 141, avg: "$55.24", largest: "$250", members: 11 },
  { year: "2023", org: "MS Society", raised: "$7,565", donations: 107, avg: "$70.70", largest: "$815", members: 7 },
  { year: "2024", org: "MS Society", raised: "$19,464", donations: 192, avg: "$101.38", largest: "$1,000", members: 11 },
  { year: "2025", org: "MS Society", raised: "$29,977", donations: 326, avg: "$91.95", largest: "$1,000", members: 14 },
  { year: "2026", org: "MS Society", raised: "$29,074", donations: 258, avg: "$92.98", largest: "$1,000", members: 11 },
  { year: "2027", org: null, raised: null, donations: null, avg: null, largest: null, members: null },
  { year: "2028", org: null, raised: null, donations: null, avg: null, largest: null, members: null },
];

function CommunityImpact() {
  return (
    <section className="relative py-24">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Community & Impact</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            The numbers behind<br /><span className="text-gradient-gold">the movement.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {YEAR_DATA.map((item, i) => (
            <motion.div key={item.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div style={{ backgroundColor: "#FFD84D", padding: "12px 14px 10px" }}>
                <div className="font-heading text-[#111111] text-[24px] font-bold leading-none">{item.year}</div>
                {item.org && <div className="text-[#111111] text-[9px] tracking-[0.12em] uppercase mt-1 font-medium opacity-60">{item.org}</div>}
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                {item.raised ? (
                  <>
                    <div>
                      <div className="text-[#aaa] text-[9px] tracking-[0.1em] uppercase mb-1">Total Raised</div>
                      <div className="font-heading text-[#111111] text-[18px] font-bold leading-none">{item.raised}</div>
                    </div>
                    <div className="h-[1px] bg-[#f0f0f0]" />
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center"><span className="text-[#bbb] text-[9px] uppercase tracking-wide">Donations</span><span className="text-[#111] text-[11px] font-semibold">{item.donations}</span></div>
                      <div className="flex justify-between items-center"><span className="text-[#bbb] text-[9px] uppercase tracking-wide">Avg.</span><span className="text-[#111] text-[11px] font-semibold">{item.avg}</span></div>
                      <div className="flex justify-between items-center"><span className="text-[#bbb] text-[9px] uppercase tracking-wide">Largest</span><span className="text-[#111] text-[11px] font-semibold">{item.largest}</span></div>
                      <div className="flex justify-between items-center"><span className="text-[#bbb] text-[9px] uppercase tracking-wide">Members</span><span className="text-[#111] text-[11px] font-semibold">{item.members}</span></div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-6">
                    <span className="text-[#14CFC4] text-[10px] font-semibold tracking-wide uppercase text-center leading-relaxed">Upcoming<br />In Progress</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. CTA ──────────────────────────────────────────────────────────────────

function CTASection() {
  const communityCards = [
    { icon: "🚴", title: "Ride Together", body: "Weekly group rides for all levels across Austin's best routes. Nobody gets left behind." },
    { icon: "❤️", title: "Give Back", body: "Proudly supporting the National MS Society and Alzheimer's Association through every mile." },
    { icon: "🏆", title: "Push Limits", body: "From casual rides to the MS 150 — we train hard, support each other, and celebrate harder." },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {communityCards.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-8 flex flex-col items-center text-center gap-4"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-heading text-white text-[22px] font-semibold">{item.title}</h3>
              <p className="text-white/75 text-[13px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">Ready to Ride?</span>
            <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(40px, 7vw, 88px)" }}>
              Ride With <span className="text-gradient-gold">Purpose.</span>
            </h2>
            <p className="text-white/80 text-[16px] lg:text-[18px] mb-12 max-w-[520px] mx-auto leading-relaxed">
              Join Austin's most passionate cycling community. Train with us, ride with us, and help us make every mile matter.
            </p>
            <div className="flex items-center justify-center">
              <Link href="/membership/join" className="btn-primary">Join The Club</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueStatement />
      <AboutPreview />
      <WhyWeRide />
      <MembershipPreview />
      <CommunityImpact />
      <CTASection />
    </>
  );
}
