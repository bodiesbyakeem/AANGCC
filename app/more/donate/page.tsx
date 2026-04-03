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

function PageHero() {
  return (
    <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Make an Impact</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Donate to <span className="text-gradient-gold">AANGCC</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[600px] mx-auto leading-relaxed">
          Your donation goes directly to the fight against MS and Alzheimer's. Every dollar raised by AANGCC makes a measurable difference in the lives of people living with these diseases.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function DonateOptions() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Choose Your Cause</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Every mile. <span className="text-gradient-gold">Every dollar.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MS 150 Donation */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="h-[5px] w-full bg-[#14CFC4]" />
            <div className="p-8 lg:p-10 flex flex-col gap-6 flex-1">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🎗️</span>
                <div>
                  <div className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">Flagship Cause</div>
                  <h3 className="font-heading text-[#111111] text-[28px] font-bold">MS 150 Team</h3>
                </div>
              </div>
              <p className="text-[#555] text-[14px] leading-relaxed">
                Support AANGCC's MS 150 fundraising team. Your donation goes directly to the National Multiple Sclerosis Society — funding research, advocacy, and life-changing programs for the nearly 1 million Americans living with MS.
              </p>
              <div className="flex flex-col gap-3">
                {["100% goes to the National MS Society", "Supports MS research & patient programs", "Fuels our team's 150-mile ride from Houston to Austin", "Tax-deductible contribution"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#14CFC4" fillOpacity="0.15" />
                      <path d="M5 8L7 10L11 6" stroke="#0FAFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#444] text-[13px]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4">
                <a
                  href="https://events.nationalmssociety.org/teams/90906/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-300"
                >
                  Donate to MS 150 Team
                </a>
              </div>
            </div>
          </motion.div>

          {/* ALZ Donation */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="h-[5px] w-full bg-[#FFD84D]" />
            <div className="p-8 lg:p-10 flex flex-col gap-6 flex-1">
              <div className="flex items-start gap-4">
                <span className="text-4xl">💜</span>
                <div>
                  <div className="text-[#b8960a] text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">Annual Ride</div>
                  <h3 className="font-heading text-[#111111] text-[28px] font-bold">ALZ Ride Team</h3>
                </div>
              </div>
              <p className="text-[#555] text-[14px] leading-relaxed">
                Support AANGCC's Ride to End ALZ team. Your donation goes directly to the Alzheimer's Association — the leading voluntary health organization in Alzheimer's care, support, and research.
              </p>
              <div className="flex flex-col gap-3">
                {["100% goes to the Alzheimer's Association", "Supports ALZ research & caregiver programs", "Fuels our team's 40-mile ride in Dripping Springs", "Tax-deductible contribution"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#FFD84D" fillOpacity="0.25" />
                      <path d="M5 8L7 10L11 6" stroke="#b8960a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#444] text-[13px]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4">
                <a
                  href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300"
                >
                  Donate to ALZ Ride Team
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const impacts = [
    { value: "$65,000+", label: "Raised for MS Society", icon: "💰" },
    { value: "2021–2026", label: "Years of giving back", icon: "📅" },
    { value: "100%", label: "Goes directly to the cause", icon: "✅" },
    { value: "3", label: "Annual charity events", icon: "🏆" },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Our Impact</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Your donation <span className="text-gradient-gold">matters.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {impacts.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 text-center shadow-lg"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-heading text-[#14CFC4] text-[32px] font-bold mb-2">{item.value}</div>
              <div className="text-[#888] text-[12px] tracking-wide uppercase leading-snug">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 bg-white/15 border border-white/25 rounded-2xl p-8 text-center backdrop-blur-sm">
          <p className="text-white/80 text-[16px] leading-relaxed max-w-[700px] mx-auto">
            AANGCC does not retain any portion of charitable donations. Every dollar raised through our MS 150 and ALZ Ride fundraising pages goes directly to the National MS Society or the Alzheimer's Association.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function DonateCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
          Can't ride?<br /><span className="text-gradient-gold">Your donation rides for you.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="text-white/75 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
          Every contribution — no matter the size — moves us closer to a world free from MS and Alzheimer's disease.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Donate to MS 150</a>
          <a href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Donate to ALZ Ride</a>
        </motion.div>
      </div>
    </section>
  );
}

export default function DonatePage() {
  return (
    <>
      <PageHero />
      <DonateOptions />
      <ImpactSection />
      <DonateCTA />
    </>
  );
}
