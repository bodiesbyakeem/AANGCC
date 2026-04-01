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

// ─── 1. HERO SECTION ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

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
            Austin, Texas · Est. AANGCC
          </span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-[1.0] mb-6"
          style={{ fontSize: "clamp(48px, 9vw, 120px)" }}
        >
          More Than Miles.
          <br />
          <span className="text-gradient-teal">A Movement.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/70 text-[16px] lg:text-[20px] font-light max-w-[560px] mx-auto mb-12 leading-relaxed"
        >
          A cycling community built on purpose, connection, and impact.
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
          <Link href="/rides" className="btn-outline">
            View Ride Calendar
          </Link>
        </motion.div>
      </div>

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

// ─── 2. VALUE STATEMENT ───────────────────────────────────────────────────────

function ValueStatement() {
  return (
    <section className="relative bg-black py-28 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">
            Who We Are
          </span>
          <h2
            className="font-heading text-white leading-tight mb-8"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            We don't just ride.
            <br />
            <span className="text-gradient-gold">We ride for something.</span>
          </h2>
          <p className="text-white/50 text-[17px] leading-relaxed max-w-[680px] mx-auto">
            All Ass No Gas Cycling Club is Austin's premier cycling community —
            a family of riders united by grit, generosity, and the belief that
            every mile can make a difference. We train hard, give back harder,
            and never leave a rider behind.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-[#2A9D9E]/40 to-transparent"
        />
      </div>
    </section>
  );
}

// ─── 3. ABOUT PREVIEW ────────────────────────────────────────────────────────

function AboutPreview() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#2A9D9E]" />
              <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
                About AANGCC
              </span>
            </div>

            <h2
              className="font-heading text-white leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              Born in Austin.
              <br />
              <span className="text-gradient-teal">Built on purpose.</span>
            </h2>

            <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
              <p>
                AANGCC started as a small group of riders who believed the
                best rides are the ones you take together. Over the years,
                we've grown into one of Austin's most passionate cycling
                communities — welcoming riders of every level, background,
                and pace.
              </p>
              <p>
                But what truly sets us apart is our commitment to giving back.
                Every mile we ride, every event we host, and every membership
                that joins our ranks supports the fight against Multiple
                Sclerosis through the National MS Society.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/about" className="btn-primary">
                Our Story
              </Link>
              <Link href="/about/we-support" className="btn-outline">
                Who We Support
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/2025 MS 150 48.jpg"
                alt="AANGCC Cycling Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-[#0a0a0a] border border-[#2A9D9E]/20 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="font-heading text-[#2A9D9E] text-[36px] font-bold leading-none">MS 150</div>
              <div className="text-white/40 text-[11px] tracking-wide uppercase mt-1">Annual Flagship Ride</div>
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
    {
      icon: "❤️",
      color: "teal",
      title: "We Ride for MS",
      body: "Every mile we log contributes to the fight against Multiple Sclerosis. The BP MS 150 is our flagship event — 150 miles from Houston to Austin for those who can't ride themselves.",
    },
    {
      icon: "🧠",
      color: "gold",
      title: "We Ride for ALZ",
      body: "Alzheimer's disease affects millions of families. Our Ride to End ALZ team raises critical funds and awareness for the Alzheimer's Association every year.",
    },
    {
      icon: "🤝",
      color: "teal",
      title: "We Ride for Community",
      body: "Cycling builds bonds that last far beyond the finish line. AANGCC is a family — we train together, celebrate together, and show up for each other on and off the road.",
    },
    {
      icon: "🏙️",
      color: "gold",
      title: "We Ride for Austin",
      body: "The Rosedale Ride, local events, and community partnerships keep us rooted in the city we love. Austin gives us a home — we give back with every pedal stroke.",
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD84D]/[0.04] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Our Purpose
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Why We{" "}
            <span className="text-gradient-gold">Ride</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col gap-5 p-8 group
                ${card.color === "gold"
                  ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div className={`h-[2px] w-full absolute top-0 left-0 ${card.color === "gold" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"}`} />
              <span className="text-4xl">{card.icon}</span>
              <h3 className={`font-heading text-white text-[22px] font-semibold group-hover:${card.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} transition-colors duration-300`}>
                {card.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {card.body}
              </p>
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
    {
      name: "Individual",
      price: "$99",
      period: "/ year",
      color: "teal",
      tag: "Most Popular",
      description: "Annual adult membership for single adults ages 18 and up.",
      features: [
        "Single adult (18+)",
        "Anniversary-based renewal",
        "Weekly group ride access",
        "Club newsletter & events",
        "MS Society fundraising",
        "Members-only community",
      ],
    },
    {
      name: "Family",
      price: "$149",
      period: "/ year",
      color: "gold",
      tag: "Best Value",
      description: "Up to 3 adults at the same address, plus a guest pass.",
      features: [
        "Up to 3 adults (18+)",
        "Same address required",
        "Guest pass included",
        "Anniversary-based renewal",
        "All Individual benefits",
        "Priority event registration",
      ],
    },
    {
      name: "Small Business",
      price: "$599",
      period: "/ year",
      color: "teal",
      tag: "1–14 Employees",
      description: "Holistic wellness programming that engages your entire workforce.",
      features: [
        "Covers 1–14 employees",
        "Employee wellness program",
        "Reduce healthcare costs",
        "Community involvement",
        "All Family benefits",
        "Corporate recognition",
      ],
    },
    {
      name: "Corporate",
      price: "$1,999",
      period: "/ year",
      color: "gold",
      tag: "15–99 Employees",
      description: "Enterprise wellness solution for larger organizations.",
      features: [
        "Covers 15–99 employees",
        "Full workforce engagement",
        "Executive visibility",
        "Dedicated account support",
        "All Small Business benefits",
        "Premium brand placement",
      ],
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Membership
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Choose your{" "}
            <span className="text-gradient-teal">level.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/40 text-[15px] mt-4 max-w-[480px] mx-auto"
          >
            Every membership tier supports our mission and gives you full access to the AANGCC community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col
                ${tier.color === "gold"
                  ? "border-[#FFD84D]/25 bg-[#FFD84D]/[0.03]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div className={`h-[3px] w-full ${tier.color === "gold" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"}`} />

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Tag */}
                <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full w-fit ${tier.color === "gold" ? "bg-[#FFD84D]/10 text-[#FFD84D]" : "bg-[#2A9D9E]/10 text-[#2A9D9E]"}`}>
                  {tier.tag}
                </span>

                {/* Name + Price */}
                <div>
                  <h3 className="font-heading text-white text-[24px] font-semibold">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={`font-heading text-[40px] font-bold ${tier.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                      {tier.price}
                    </span>
                    <span className="text-white/30 text-[13px]">{tier.period}</span>
                  </div>
                  <p className="text-white/40 text-[12px] leading-snug mt-2">{tier.description}</p>
                </div>

                {/* Divider */}
                <div className="divider-teal" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[12px] text-white/55">
                      <span className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${tier.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/membership/why-join"
                  className={`
                    mt-2 w-full text-center py-3 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/membership" className="btn-outline">
            View Full Membership Details
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 6. COMMUNITY / IMPACT SECTION ───────────────────────────────────────────

function CommunityImpact() {
  const metrics = [
    { value: "163+", label: "Ride Photos", sublabel: "Memories captured", color: "teal" },
    { value: "3", label: "Annual Events", sublabel: "MS 150, ALZ Ride, Rosedale", color: "gold" },
    { value: "$1M+", label: "Raised for MS", sublabel: "National MS Society", color: "teal" },
    { value: "ATX", label: "Home Base", sublabel: "Austin, Texas", color: "gold" },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-[#2A9D9E]/[0.05] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Community & Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            The numbers behind
            <br />
            <span className="text-gradient-teal">the movement.</span>
          </motion.h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-2xl border p-7 text-center ${m.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}
            >
              <div className={`font-heading text-[48px] lg:text-[56px] font-bold leading-none mb-2 ${m.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {m.value}
              </div>
              <div className="text-white text-[14px] font-semibold mb-1">{m.label}</div>
              <div className="text-white/30 text-[11px] tracking-wide">{m.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Community strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🚴",
              title: "Ride Together",
              body: "Weekly group rides for all levels across Austin's best routes. Nobody gets left behind.",
            },
            {
              icon: "❤️",
              title: "Give Back",
              body: "Proudly supporting the National MS Society and Alzheimer's Association through every mile.",
            },
            {
              icon: "🏆",
              title: "Push Limits",
              body: "From casual rides to the MS 150 — we train hard, support each other, and celebrate harder.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center text-center gap-4 p-8 card-premium"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-heading text-white text-[22px] font-semibold">{item.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. CTA SECTION ──────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">
            Ready to Ride?
          </span>

          <h2
            className="font-heading text-white leading-tight mb-6"
            style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
          >
            Ride With{" "}
            <span className="text-gradient-gold">Purpose.</span>
          </h2>

          <p className="text-white/50 text-[16px] lg:text-[18px] mb-12 max-w-[520px] mx-auto leading-relaxed">
            Join Austin's most passionate cycling community. Train with us,
            ride with us, and help us make every mile matter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="btn-primary">
              Join The Club
            </Link>
            <Link href="/rides/ms150" className="btn-outline">
              MS 150 Team
            </Link>
          </div>
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
      <ValueStatement />
      <AboutPreview />
      <WhyWeRide />
      <MembershipPreview />
      <CommunityImpact />
      <CTASection />
    </>
  );
}
