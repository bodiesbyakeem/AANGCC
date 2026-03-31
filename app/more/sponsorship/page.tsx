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

// ─── Sponsorship Tiers ────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Bronze",
    tag: "Entry Level",
    color: "teal",
    benefits: [
      "Logo on club website sponsor page",
      "Social media shoutout (1x per quarter)",
      "Name in club newsletter",
      "Certificate of appreciation",
    ],
  },
  {
    name: "Silver",
    tag: "Community Partner",
    color: "teal",
    benefits: [
      "Everything in Bronze",
      "Logo on club jersey (sleeve)",
      "Featured in 2 newsletter spotlights",
      "Social media feature (1x per month)",
      "Booth at one AANGCC event",
    ],
  },
  {
    name: "Gold",
    tag: "Premier Sponsor",
    color: "gold",
    benefits: [
      "Everything in Silver",
      "Logo on club jersey (chest)",
      "Featured sponsor on all event materials",
      "Dedicated social media campaign",
      "VIP access to all AANGCC events",
      "Co-branded fundraising opportunities",
      "Quarterly impact report",
    ],
  },
  {
    name: "Platinum",
    tag: "Title Sponsor",
    color: "gold",
    benefits: [
      "Everything in Gold",
      "Title naming rights for one annual event",
      "Logo on all club kits (front & back)",
      "Executive speaking opportunity at events",
      "Custom partnership package",
      "MS Society co-fundraising recognition",
      "Annual partnership review meeting",
      "Premium media placement across all channels",
    ],
  },
];

// ─── Page Hero ────────────────────────────────────────────────────────────────

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
            Partner With Us
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
          Corporate{" "}
          <span className="text-gradient-gold">Sponsorship</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed"
        >
          Partner with AANGCC and align your brand with Austin's most
          passionate cycling community — and a mission that truly matters.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Become a Sponsor
          </Link>
          <a href="#tiers" className="btn-outline">
            View Packages
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Why Sponsor ──────────────────────────────────────────────────────────────

function WhySponsor() {
  const reasons = [
    {
      icon: "🎯",
      title: "Targeted Audience",
      body: "Reach a highly engaged community of Austin cyclists, fitness enthusiasts, and charitable givers — a premium demographic for most brands.",
      color: "teal",
    },
    {
      icon: "❤️",
      title: "Purpose-Driven Alignment",
      body: "Associate your brand with the fight against Multiple Sclerosis and Alzheimer's disease. Sponsoring AANGCC is sponsoring a cause.",
      color: "gold",
    },
    {
      icon: "📣",
      title: "Multi-Channel Visibility",
      body: "Your brand appears on club kits, social media, event materials, newsletters, and our website — consistent exposure across every touchpoint.",
      color: "teal",
    },
    {
      icon: "🤝",
      title: "Authentic Partnership",
      body: "We don't do hollow sponsorships. Every partner we work with becomes part of the AANGCC family — with genuine recognition and engagement.",
      color: "gold",
    },
    {
      icon: "🏙️",
      title: "Austin Community Presence",
      body: "AANGCC is deeply rooted in Austin. Sponsoring us puts your brand in front of the Austin community at rides, events, and beyond.",
      color: "teal",
    },
    {
      icon: "📊",
      title: "Measurable Impact",
      body: "Gold and Platinum sponsors receive quarterly impact reports showing exactly how your investment is reaching our community and beyond.",
      color: "gold",
    },
  ];

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
            Why Partner With Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Sponsorship that{" "}
            <span className="text-gradient-teal">means something.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className="text-3xl">{r.icon}</span>
              <h3 className={`font-heading text-white text-[22px] font-semibold group-hover:${r.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} transition-colors duration-300`}>
                {r.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sponsorship Tiers ────────────────────────────────────────────────────────

function SponsorshipTiers() {
  return (
    <section id="tiers" className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#FFD84D]/[0.04] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Sponsorship Packages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Choose Your{" "}
            <span className="text-gradient-gold">Partnership Level</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/40 text-[14px] mt-4 max-w-[480px] mx-auto"
          >
            All packages are customizable. Contact us to build a
            partnership that fits your brand and budget perfectly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => (
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
              <div
                className={`h-[3px] w-full ${
                  tier.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />

              <div className="p-7 flex flex-col gap-5 flex-1">
                <div>
                  <span
                    className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full ${
                      tier.color === "gold"
                        ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                        : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                    }`}
                  >
                    {tier.tag}
                  </span>
                  <h3
                    className={`font-heading text-[32px] font-semibold mt-3 ${
                      tier.color === "gold" ? "text-[#FFD84D]" : "text-white"
                    }`}
                  >
                    {tier.name}
                  </h3>
                </div>

                <div className="divider-teal" />

                <ul className="flex flex-col gap-3 flex-1">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[12px] text-white/50">
                      <span
                        className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          tier.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"
                        }`}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`
                    mt-2 w-full text-center py-3 rounded-xl text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300
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

function SponsorCTA() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#2A9D9E]/[0.06] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading text-white leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Ready to ride{" "}
          <span className="text-gradient-teal">with us?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white/40 text-[14px] mb-8 max-w-[480px] mx-auto"
        >
          Reach out and let's build a partnership that works for your
          brand. All packages are flexible and fully customizable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Contact Us Today
          </Link>
          <Link href="/more/donate" className="btn-outline">
            Make a Donation Instead
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function SponsorshipPage() {
  return (
    <>
      <PageHero />
      <WhySponsor />
      <SponsorshipTiers />
      <SponsorCTA />
    </>
  );
}

