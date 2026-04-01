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
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-black pt-[72px]">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Charity Ride</span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Ride to{" "}
          <span className="text-gradient-teal">End ALZ</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="font-heading text-white/40 text-[18px] lg:text-[24px] mb-6">
          Riding to End Alzheimer's Disease
        </motion.p>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed">
          AANGCC rides in support of the Alzheimer's Association — joining
          cyclists nationwide to raise funds, awareness, and hope for
          millions of families affected by Alzheimer's disease.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Donate to Our Team
          </a>
          <a
            href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Join Our ALZ Team
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── About the Cause ──────────────────────────────────────────────────────────

function AboutTheCause() {
  const stats = [
    { value: "6.7M", label: "Americans living with Alzheimer's", color: "teal" },
    { value: "#1", label: "Most common form of dementia", color: "gold" },
    { value: "11M", label: "Unpaid caregivers in the US", color: "teal" },
    { value: "2050", label: "Projected 13M cases by 2050", color: "gold" },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border p-6 text-center ${s.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}
            >
              <div className={`font-heading text-[36px] lg:text-[44px] font-bold leading-none mb-3 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {s.value}
              </div>
              <div className="text-white/30 text-[11px] tracking-wide uppercase leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#2A9D9E]" />
              <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Why We Ride</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 3vw, 48px)" }}>
              Alzheimer's touches{" "}
              <span className="text-gradient-teal">every community.</span>
            </h2>
            <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
              <p>
                Alzheimer's disease is the most common cause of dementia
                — a general term for memory loss and other cognitive
                abilities serious enough to interfere with daily life.
                Alzheimer's disease accounts for 60–80% of dementia cases.
              </p>
              <p>
                The Alzheimer's Association leads the way to end
                Alzheimer's and all other dementia — by accelerating global
                research, driving risk reduction and early detection, and
                maximizing quality care and support.
              </p>
              <p>
                AANGCC's Ride to End ALZ team joins thousands of cyclists
                nationwide every year in a powerful statement: we will
                not stop riding until this disease is defeated.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Donate Now
              </a>
              <a
                href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Ride With Us
              </a>
            </div>
          </motion.div>

          {/* What the funds do */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              Where Your Donations Go
            </div>
            {[
              {
                icon: "🔬",
                title: "Research & Clinical Trials",
                body: "Funding groundbreaking research into the causes, treatments, and prevention of Alzheimer's disease.",
                color: "teal",
              },
              {
                icon: "💙",
                title: "Care & Support Programs",
                body: "Resources, education, and support groups for the millions of families and caregivers affected by Alzheimer's.",
                color: "gold",
              },
              {
                icon: "📢",
                title: "Advocacy & Awareness",
                body: "Fighting for policies that improve care and drive increased funding for Alzheimer's research at every level.",
                color: "teal",
              },
              {
                icon: "🌐",
                title: "Global Collaboration",
                body: "Supporting international research partnerships that accelerate the path toward effective treatments and a cure.",
                color: "gold",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-start gap-4 p-5 rounded-xl border ${item.color === "gold" ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]" : "border-white/[0.07] bg-[#141414]"}`}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className={`text-[13px] font-semibold mb-1 ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{item.title}</div>
                  <div className="text-white/40 text-[12px] leading-relaxed">{item.body}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Join The Team ────────────────────────────────────────────────────────────

function JoinTheTeam() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              number: "01",
              title: "Join AANGCC",
              body: "Become a club member to ride on the official AANGCC Ride to End ALZ team.",
              color: "teal",
            },
            {
              number: "02",
              title: "Register for the Ride",
              body: "Sign up through the Alzheimer's Association and join the AANGCC team page.",
              color: "gold",
            },
            {
              number: "03",
              title: "Fundraise & Ride",
              body: "Set up your fundraising page, get your miles in, and ride with purpose.",
              color: "teal",
            },
          ].map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className={`font-heading text-[48px] font-bold leading-none opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${step.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {step.number}
              </span>
              <h3 className="font-heading text-white text-[22px] font-semibold">{step.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            Ride for those who{" "}
            <span className="text-gradient-teal">can't.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Our ALZ Team
            </a>
            <a
              href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Make a Donation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function ALZPage() {
  return (
    <>
      <PageHero />
      <AboutTheCause />
      <JoinTheTeam />
    </>
  );
}
