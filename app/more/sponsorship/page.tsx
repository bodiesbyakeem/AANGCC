"use client";

import { useState } from "react";
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

// ─── Sponsorship Tiers ────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Diamond",
    price: "$5,000",
    tag: "Most Impactful",
    featured: true,
    color: "teal",
    benefits: [
      "Logo on front of team jersey",
      "Premium social media promotions",
      "Employee cycling perks & passes",
      "Logo on team vehicle & equipment",
      "Featured in all event communications",
      "Speaking opportunity at team events",
      "Dedicated sponsor spotlight post",
      "Logo on AANGCC website homepage",
      "Co-branded charity ride recognition",
      "Executive team introductions",
    ],
  },
  {
    name: "Platinum",
    price: "$3,500",
    tag: "High Visibility",
    featured: false,
    color: "gold",
    benefits: [
      "Logo on back of team jersey",
      "Monthly social media mentions",
      "Employee cycling discounts",
      "Logo on team equipment",
      "Featured in event communications",
      "Sponsor spotlight post",
      "Logo on AANGCC website",
      "Charity ride recognition",
    ],
  },
  {
    name: "Gold",
    price: "$2,500",
    tag: "Community Partner",
    featured: false,
    color: "teal",
    benefits: [
      "Logo on team jersey sleeve",
      "Bi-monthly social media mentions",
      "Logo on AANGCC website",
      "Featured in newsletters",
      "Charity ride recognition",
      "Event signage placement",
    ],
  },
  {
    name: "Silver",
    price: "$1,500",
    tag: "Supporter",
    featured: false,
    color: "gold",
    benefits: [
      "Logo on AANGCC website",
      "Quarterly social media mention",
      "Newsletter recognition",
      "Charity ride acknowledgment",
      "Community impact report",
    ],
  },
  {
    name: "Bronze",
    price: "$1,000",
    tag: "Friend of AANGCC",
    featured: false,
    color: "teal",
    benefits: [
      "Name on AANGCC website",
      "Social media thank-you post",
      "Newsletter acknowledgment",
      "Community impact recognition",
    ],
  },
];

// ─── Why Sponsor Benefits ─────────────────────────────────────────────────────

const WHY_SPONSOR = [
  {
    icon: "👁️",
    title: "Real Brand Exposure",
    body: "Your logo on jerseys, equipment, and digital channels reaching thousands of engaged Austin cyclists and supporters.",
    color: "teal",
  },
  {
    icon: "🤝",
    title: "Community Alignment",
    body: "Associate your brand with a purpose-driven community that Austin residents genuinely love and respect.",
    color: "gold",
  },
  {
    icon: "❤️",
    title: "Social Impact",
    body: "Every dollar you invest directly contributes to the fight against MS and Alzheimer's — causes that resonate deeply.",
    color: "teal",
  },
  {
    icon: "📊",
    title: "Real Audience",
    body: "Not vanity impressions. Real cyclists, real donors, real community members with real purchasing power.",
    color: "gold",
  },
  {
    icon: "🏆",
    title: "Employee Wellness",
    body: "Diamond and Platinum sponsors unlock cycling perks and wellness programming for their entire workforce.",
    color: "teal",
  },
  {
    icon: "📣",
    title: "Authentic Storytelling",
    body: "We tell your story authentically through our channels — not as an ad, but as a valued community partner.",
    color: "gold",
  },
];

// ─── Impact Items ─────────────────────────────────────────────────────────────

const IMPACT_ITEMS = [
  {
    org: "National MS Society",
    description: "Funds research, patient programs, and advocacy for the nearly 1 million Americans living with Multiple Sclerosis.",
    icon: "🎗️",
    color: "teal",
    link: "https://events.nationalmssociety.org/teams/90906/donate",
  },
  {
    org: "Alzheimer's Association",
    description: "Supports Alzheimer's research, care programs, and awareness for the 6.7 million Americans affected by the disease.",
    icon: "💜",
    color: "gold",
    link: "https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056",
  },
  {
    org: "Austin Community",
    description: "Local rides, outreach events, and partnerships that keep AANGCC rooted in and giving back to the city we call home.",
    icon: "🏙️",
    color: "teal",
    link: "/about/we-support",
  },
];

// ─── 1. HERO SECTION ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-[72px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Corporate Sponsorship</span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(38px, 7vw, 96px)" }}>
          Partner With a Movement
          <br />
          <span className="text-gradient-teal">That Rides for Impact</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/70 text-[17px] lg:text-[20px] max-w-[620px] mx-auto leading-relaxed mb-12">
          Align your brand with a purpose-driven cycling community raising thousands for life-changing causes.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact-form" className="btn-primary">Become a Sponsor</a>
          <a href="#tiers" className="btn-outline">View Sponsorship Tiers</a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── 2. SOCIAL PROOF ──────────────────────────────────────────────────────────

function SocialProof() {
  const stats = [
    { value: "$65,000+", label: "Raised for MS Society", color: "teal" },
    { value: "163+", label: "Team photos captured", color: "gold" },
    { value: "3", label: "Annual charity events", color: "teal" },
    { value: "ATX", label: "Austin's cycling community", color: "gold" },
  ];

  const sponsors = [
    "Mercedes-Benz of Austin",
    "Subaru",
    "Infiniti",
    "Honda",
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border p-7 text-center ${s.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}
            >
              <div className={`font-heading text-[40px] lg:text-[52px] font-bold leading-none mb-2 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {s.value}
              </div>
              <div className="text-white/40 text-[12px] tracking-wide uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Past/Current Sponsors */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-8"
          >
            Trusted by Austin's Leading Brands
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {sponsors.map((sponsor, i) => (
              <motion.div
                key={sponsor}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-6 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/50 text-[13px] font-medium hover:border-[#2A9D9E]/30 hover:text-white/70 transition-all duration-200"
              >
                {sponsor}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. WHY SPONSOR ───────────────────────────────────────────────────────────

function WhySponsor() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">
            Why Partner With Us
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            More than a logo.{" "}
            <span className="text-gradient-teal">A partnership.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_SPONSOR.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className={`font-heading text-white text-[22px] font-semibold group-hover:${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} transition-colors duration-300`}>
                {item.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. SPONSORSHIP TIERS ─────────────────────────────────────────────────────

function SponsorshipTiers() {
  return (
    <section id="tiers" className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-[#FFD84D]/[0.04] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">
            Sponsorship Packages
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Choose your{" "}
            <span className="text-gradient-gold">partnership level.</span>
          </motion.h2>
        </div>

        {/* Diamond — Featured Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6, transition: { duration: 0.3 } }}
          className="relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(42,157,158,0.2)] hover:shadow-[0_20px_80px_rgba(42,157,158,0.3)] transition-shadow duration-300 mb-6"
        >
          <div className="h-[4px] w-full bg-[#2A9D9E]" />
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#2A9D9E]/10 text-[#1a6b6c]">Most Impactful</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D]/20 text-[#8a7000]">Recommended</span>
                </div>
                <h3 className="font-heading text-[#0a0a0a] text-[42px] font-bold mb-2">Diamond</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-[#2A9D9E] text-[56px] font-bold leading-none">$5,000</span>
                  <span className="text-[#666] text-[15px]">/ year</span>
                </div>
                <p className="text-[#555] text-[15px] leading-relaxed mb-6">
                  The highest tier of partnership. Your brand rides front and center with AANGCC — on jerseys, at events, across social media, and throughout our community.
                </p>
                <a href="#contact-form" className="inline-block bg-[#0a0a0a] text-white px-8 py-4 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase hover:bg-[#2A9D9E] transition-colors duration-300">
                  Become a Diamond Sponsor
                </a>
              </div>
              <div>
                <div className="text-[#333] text-[12px] tracking-[0.15em] uppercase font-semibold mb-4">What's Included</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIERS[0].benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="#2A9D9E" fillOpacity="0.15" />
                        <path d="M5 8L7 10L11 6" stroke="#2A9D9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#444] text-[13px] leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.slice(1).map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_50px_rgba(255,216,77,0.15)] transition-shadow duration-300 flex flex-col"
            >
              <div className={`h-[4px] w-full ${tier.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"}`} />
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full w-fit ${tier.color === "gold" ? "bg-[#FFD84D]/15 text-[#8a7000]" : "bg-[#2A9D9E]/10 text-[#1a6b6c]"}`}>
                  {tier.tag}
                </span>
                <div>
                  <h3 className="font-heading text-[#0a0a0a] text-[26px] font-bold">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`font-heading text-[36px] font-bold leading-none ${tier.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`} style={{ WebkitTextStroke: tier.color === "gold" ? "1px #b8960a" : "1px #1a6b6c" }}>
                      {tier.price}
                    </span>
                    <span className="text-[#888] text-[13px]">/ yr</span>
                  </div>
                </div>
                <div className="divider-teal" />
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[12px] text-[#444]">
                      <svg className="flex-shrink-0 mt-[3px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill={tier.color === "gold" ? "#FFD84D" : "#2A9D9E"} fillOpacity="0.2" />
                        <path d="M4 7L6 9L10 5" stroke={tier.color === "gold" ? "#8a7000" : "#1a6b6c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="#contact-form" className="mt-4 w-full text-center py-3 rounded-xl bg-[#0a0a0a] text-white text-[11px] font-semibold tracking-[0.08em] uppercase hover:bg-[#2A9D9E] transition-colors duration-300 block">
                  Get Started
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. IMPACT SECTION ────────────────────────────────────────────────────────

function ImpactSection() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">
            Your Investment in Action
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Where your money{" "}
            <span className="text-gradient-teal">goes.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMPACT_ITEMS.map((item, i) => (
            <motion.div
              key={item.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-2xl border overflow-hidden flex flex-col gap-5 p-8 ${item.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}
            >
              <div className={`h-[2px] w-full absolute top-0 left-0 ${item.color === "gold" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"}`} />
              <span className="text-4xl">{item.icon}</span>
              <h3 className={`font-heading text-white text-[24px] font-semibold ${item.color === "gold" ? "group-hover:text-[#FFD84D]" : "group-hover:text-[#2A9D9E]"}`}>
                {item.org}
              </h3>
              <p className="text-white/40 text-[14px] leading-relaxed flex-1">{item.description}</p>
              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`text-[12px] font-semibold tracking-wide flex items-center gap-2 ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. CTA SECTION ───────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#FFD84D]/[0.05] blur-[100px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">Ready to Partner?</span>
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Become Part of
            <br />
            <span className="text-gradient-gold">Something Bigger</span>
          </h2>
          <p className="text-white/50 text-[16px] mb-10 max-w-[500px] mx-auto leading-relaxed">
            Join the brands already making an impact alongside AANGCC. Schedule a call and let's build something meaningful together.
          </p>
          <a href="#contact-form" className="btn-primary">Schedule a Sponsorship Call</a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 7. CONTACT FORM ─────────────────────────────────────────────────────────

function SponsorshipForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const inputClass = "w-full px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#2A9D9E]/50 transition-colors duration-200";

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.company) return;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xgopybwn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "New Sponsorship Inquiry — AANGCC" }),
      });
      if (response.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", phone: "", budget: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact-form" className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[760px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">
            Get In Touch
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Start the{" "}
            <span className="text-gradient-teal">conversation.</span>
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-2xl border border-white/[0.07] bg-[#141414] overflow-hidden">
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />

          <div className="p-8 lg:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
                <div className="w-16 h-16 rounded-full bg-[#2A9D9E]/10 border border-[#2A9D9E]/30 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A9D9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-white text-[28px] font-semibold mb-2">Message Received!</h3>
                  <p className="text-white/40 text-[14px] max-w-[360px]">Thanks for your interest in sponsoring AANGCC. We'll be in touch within 24–48 hours.</p>
                </div>
                <button onClick={() => setStatus("idle")} className="btn-outline">Send Another Inquiry</button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h3 className="font-heading text-white text-[24px] font-semibold">Sponsorship Inquiry</h3>
                {status === "error" && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-[13px]">
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] uppercase tracking-wide font-medium">Full Name *</label>
                    <input className={inputClass} placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] uppercase tracking-wide font-medium">Company *</label>
                    <input className={inputClass} placeholder="Company name" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] uppercase tracking-wide font-medium">Email *</label>
                    <input type="email" className={inputClass} placeholder="your@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] uppercase tracking-wide font-medium">Phone</label>
                    <input className={inputClass} placeholder="(512) 000-0000" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] uppercase tracking-wide font-medium">Budget Range</label>
                    <select className={inputClass + " cursor-pointer"} value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}>
                      <option value="" className="bg-[#141414]">Select a budget range</option>
                      <option value="Diamond — $5,000" className="bg-[#141414]">Diamond — $5,000</option>
                      <option value="Platinum — $3,500" className="bg-[#141414]">Platinum — $3,500</option>
                      <option value="Gold — $2,500" className="bg-[#141414]">Gold — $2,500</option>
                      <option value="Silver — $1,500" className="bg-[#141414]">Silver — $1,500</option>
                      <option value="Bronze — $1,000" className="bg-[#141414]">Bronze — $1,000</option>
                      <option value="Custom / Not Sure" className="bg-[#141414]">Custom / Not Sure</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name || !form.email || !form.company}
                  className={`w-full py-4 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${form.name && form.email && form.company ? "bg-[#2A9D9E] text-black hover:bg-[#FFD84D]" : "bg-white/[0.05] text-white/20 cursor-not-allowed"} ${status === "sending" ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {status === "sending" ? "Sending..." : "Submit Sponsorship Inquiry"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function SponsorshipPage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <WhySponsor />
      <SponsorshipTiers />
      <ImpactSection />
      <CTASection />
      <SponsorshipForm />
    </>
  );
}
