"use client";

import { useState } from "react";
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
    name: "Diamond",
    price: "$5,000",
    color: "teal",
    featured: true,
    benefits: [
      "Logo on the FRONT of our jersey",
      "Premium social media promotions",
      "Speaking opportunity at club events",
      "Employee cycling perks",
      "Co-branded recognition at all events",
      "Featured in all club communications",
      "Priority sponsor renewal rights",
      "Dedicated account support",
    ],
  },
  {
    name: "Platinum",
    price: "$3,500",
    color: "gold",
    featured: false,
    benefits: [
      "Logo on the BACK of our jersey",
      "Social media promotions",
      "Employee cycling perks",
      "Recognition at major events",
      "Featured in club newsletter",
      "Co-branded opportunities",
      "Sponsor recognition post",
    ],
  },
  {
    name: "Gold",
    price: "$2,500",
    color: "teal",
    featured: false,
    benefits: [
      "Logo on club kit",
      "Social media shoutouts",
      "Employee cycling perks",
      "Event recognition",
      "Newsletter feature",
      "Community impact report",
    ],
  },
  {
    name: "Silver",
    price: "$1,500",
    color: "gold",
    featured: false,
    benefits: [
      "Logo on club website",
      "Social media mention",
      "Employee cycling perks",
      "Event recognition",
      "Newsletter mention",
    ],
  },
  {
    name: "Bronze",
    price: "$1,000",
    color: "teal",
    featured: false,
    benefits: [
      "Logo on club website",
      "Social media mention",
      "Community acknowledgment",
      "Newsletter mention",
    ],
  },
];

const CURRENT_SPONSORS = [
  { name: "Mercedes-Benz of Austin", img: "/images/mercedes-sponsor.png" },
  { name: "Austin Subaru", img: "/images/austin-subaru-sponsor.png" },
  { name: "Austin Infiniti", img: "/images/austin-infiniti-sponsor.png" },
  { name: "First Texas Honda", img: "/images/first-texas-sponsor.png" },
  { name: "Subaru of Georgetown", img: "/images/georgetown-subaru-sponsor.png" },
  { name: "Bodies By Akeem", img: "/images/bodiesbyakeem-sponsor.png" },
];

function PageHero() {
  return (
    <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Partnership</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Corporate <span className="text-gradient-gold">Sponsorship</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[600px] mx-auto leading-relaxed">
          Partner with Austin's most purpose-driven cycling community. Real brand exposure. Authentic community alignment. Measurable social impact.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function WhySponsor() {
  const reasons = [
    { icon: "👕", title: "Jersey Exposure", body: "Your logo worn by riders across Austin, at charity events, and at the MS 150 finish line — seen by thousands." },
    { icon: "📱", title: "Social Media Reach", body: "Authentic promotion to an engaged Austin audience that genuinely cares about the content they see." },
    { icon: "❤️", title: "Social Impact", body: "Your brand becomes part of a story that raises thousands for MS and Alzheimer's research every year." },
    { icon: "🏢", title: "Employee Wellness", body: "Give your team access to structured cycling programming — a powerful alternative to traditional wellness benefits." },
    { icon: "🤝", title: "Community Trust", body: "Sponsoring AANGCC is not vanity advertising — it's authentic community engagement that Austin notices." },
    { icon: "🏆", title: "Brand Legacy", body: "Previous sponsors include Mercedes-Benz, Subaru, Infiniti, and Honda. Join a distinguished group of community partners." },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Why Partner With Us</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            More than <span className="text-gradient-gold">advertising.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{r.icon}</span>
              <h3 className="font-heading text-[#111111] text-[20px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{r.title}</h3>
              <p className="text-[#666] text-[13px] leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorshipTiers() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Sponsorship Packages</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Choose your <span className="text-gradient-gold">partnership level.</span>
          </motion.h2>
        </div>

        {/* Diamond featured */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-6">
          <div className="h-[5px] w-full bg-[#FFD84D]" />
          <div className="p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-4">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D]/20 text-[#b8960a]">Most Impactful</span>
                <div className="font-heading text-[#14CFC4] text-[56px] font-bold leading-none mt-3">💎</div>
                <h3 className="font-heading text-[#111111] text-[36px] font-bold mt-2">Diamond</h3>
                <div className="font-heading text-[#FFD84D] text-[44px] font-bold leading-none mt-2" style={{ WebkitTextStroke: "1px #e6c235" }}>$5,000</div>
                <p className="text-[#888] text-[13px] mt-2">Per season · Limited spots</p>
              </div>
              <div className="lg:col-span-8">
                <div className="text-[#888] text-[11px] tracking-[0.2em] uppercase font-medium mb-5">What's Included</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIERS[0].benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="#14CFC4" fillOpacity="0.15" />
                        <path d="M5 8L7 10L11 6" stroke="#0FAFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#444] text-[13px]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.slice(1).map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-heading text-[#111111] text-[24px] font-bold">{tier.name}</h3>
                  <div className="font-heading text-[#FFD84D] text-[32px] font-bold leading-none mt-1" style={{ WebkitTextStroke: "1px #e6c235" }}>{tier.price}</div>
                </div>
                <div className="h-[1px] bg-gray-100" />
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[12px] text-[#555]">
                      <svg className="flex-shrink-0 mt-[2px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="#14CFC4" fillOpacity="0.15" />
                        <path d="M4 7L6 9L10 5" stroke="#0FAFA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurrentSponsors() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Our Partners</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Brands that <span className="text-gradient-gold">ride with us.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CURRENT_SPONSORS.map((sponsor, i) => (
            <motion.div key={sponsor.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-xl p-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 aspect-video"
            >
              <img src={sponsor.img} alt={sponsor.name} className="max-h-12 max-w-full object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorshipForm() {
  const [formState, setFormState] = useState({ name: "", company: "", email: "", phone: "", tier: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.company) return;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xgopybwn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (response.ok) { setStatus("success"); setFormState({ name: "", company: "", email: "", phone: "", tier: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section className="relative py-24">
      <div className="max-w-[860px] mx-auto px-6 lg:px-10">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-8 lg:p-12">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10 gap-6">
                <div className="w-16 h-16 rounded-full bg-[#14CFC4]/10 border border-[#14CFC4]/30 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <h3 className="font-heading text-[#111111] text-[28px] font-semibold mb-2">Inquiry Received!</h3>
                  <p className="text-[#666] text-[14px] max-w-[360px]">Thanks for your interest in partnering with AANGCC. We'll be in touch within 48 hours.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <h2 className="font-heading text-[#111111] text-[32px] font-semibold mb-2">Become a Sponsor</h2>
                  <p className="text-[#888] text-[14px]">Fill out the form below and we'll reach out to discuss your partnership.</p>
                </div>
                {status === "error" && <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-500 text-[13px]">Something went wrong. Please try again.</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name *", name: "name", placeholder: "Your name", type: "text" },
                    { label: "Company *", name: "company", placeholder: "Company name", type: "text" },
                    { label: "Email Address *", name: "email", placeholder: "your@email.com", type: "email" },
                    { label: "Phone Number", name: "phone", placeholder: "(512) 000-0000", type: "tel" },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                      <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">{field.label}</label>
                      <input type={field.type} name={field.name} value={(formState as any)[field.name]} onChange={handleChange} placeholder={field.placeholder} className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                    </div>
                  ))}
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">Sponsorship Tier</label>
                    <select name="tier" value={formState.tier} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 cursor-pointer">
                      <option value="">Select a tier</option>
                      {TIERS.map((t) => <option key={t.name} value={t.name}>{t.name} — {t.price}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">Message</label>
                    <textarea name="message" value={formState.message} onChange={handleChange} placeholder="Tell us about your company and goals..." rows={4} className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 resize-none" />
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={status === "sending" || !formState.name || !formState.email || !formState.company}
                  className={`py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${formState.name && formState.email && formState.company ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                >
                  {status === "sending" ? "Sending..." : "Submit Sponsorship Inquiry"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SponsorshipPage() {
  return (
    <>
      <PageHero />
      <WhySponsor />
      <SponsorshipTiers />
      <CurrentSponsors />
      <SponsorshipForm />
    </>
  );
}
