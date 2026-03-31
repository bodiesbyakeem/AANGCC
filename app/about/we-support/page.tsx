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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Our Mission
          </span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(42px, 7vw, 96px)" }}
        >
          Who We{" "}
          <span className="text-gradient-teal">Support</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed"
        >
          Every mile we ride carries a purpose. AANGCC is committed to
          making a real difference in the lives of those affected by
          Multiple Sclerosis and beyond.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Primary Cause ────────────────────────────────────────────────────────────

function PrimaryCause() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
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
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">
                Primary Cause
              </span>
            </div>

            <h2
              className="font-heading text-white leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              National Multiple{" "}
              <span className="text-gradient-gold">Sclerosis Society</span>
            </h2>

            <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
              <p>
                Multiple Sclerosis is an unpredictable, often disabling
                disease of the central nervous system that disrupts the
                flow of information within the brain, and between the brain
                and body. Nearly 1 million people in the United States are
                living with MS.
              </p>
              <p>
                The National Multiple Sclerosis Society mobilizes people
                and resources to drive research for a cure and to address
                the challenges of everyone affected by MS. AANGCC is proud
                to ride in their honor every single year.
              </p>
              <p>
                Through the BP MS 150 and other fundraising efforts,
                AANGCC members collectively raise thousands of dollars
                annually — every cent going directly toward MS research,
                programs, and advocacy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/rides/ms150" className="btn-primary">
                Join Our MS 150 Team
              </Link>
              <Link href="/more/donate" className="btn-outline">
                Donate Now
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {[
              {
                value: "~1M",
                label: "Americans living with MS",
                color: "gold",
              },
              {
                value: "2.9M",
                label: "People affected by MS worldwide",
                color: "teal",
              },
              {
                value: "MS 150",
                label: "Our annual flagship fundraising ride",
                color: "gold",
              },
              {
                value: "100%",
                label: "Of donations go to MS research & programs",
                color: "teal",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`
                  flex items-center gap-5 p-5 rounded-2xl border
                  ${stat.color === "gold"
                    ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]"
                    : "border-white/[0.07] bg-[#141414]"
                  }
                `}
              >
                <div
                  className={`text-[32px] font-heading font-bold leading-none flex-shrink-0 ${
                    stat.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-[13px] leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Additional Causes ────────────────────────────────────────────────────────

function AdditionalCauses() {
  const causes = [
    {
      tag: "Charity Ride",
      color: "teal",
      name: "Alzheimer's Association",
      subtitle: "Ride to End ALZ",
      body: "Alzheimer's disease is the most common cause of dementia, affecting millions of families across the country. Our Ride to End ALZ team raises critical funds for research, care, and support programs through the Alzheimer's Association.",
      cta: "Ride To End ALZ Team",
      href: "/rides/alz",
    },
    {
      tag: "Community Ride",
      color: "gold",
      name: "Austin Community",
      subtitle: "Rosedale Ride",
      body: "The Rosedale Ride is a beloved Austin tradition that brings cyclists together to support local causes. AANGCC participates annually as a way to give back to the city we call home and celebrate the spirit of community cycling.",
      cta: "Rosedale Ride Team",
      href: "/rides/rosedale",
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
            Beyond MS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            We Also Support
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {causes.map((cause, i) => (
            <motion.div
              key={cause.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col
                ${cause.color === "gold"
                  ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div
                className={`h-[3px] w-full ${
                  cause.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />

              <div className="p-8 flex flex-col gap-5 flex-1">
                <span
                  className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit ${
                    cause.color === "gold"
                      ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                      : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                  }`}
                >
                  {cause.tag}
                </span>

                <div>
                  <h3 className="font-heading text-white text-[26px] font-semibold leading-tight">
                    {cause.name}
                  </h3>
                  <p
                    className={`text-[13px] font-medium mt-1 ${
                      cause.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"
                    }`}
                  >
                    {cause.subtitle}
                  </p>
                </div>

                <p className="text-white/40 text-[13px] leading-relaxed flex-1">
                  {cause.body}
                </p>

                <Link
                  href={cause.href}
                  className={`
                    w-full text-center py-3 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 mt-auto
                    ${cause.color === "gold"
                      ? "bg-[#FFD84D] text-black hover:bg-white"
                      : "bg-[#2A9D9E] text-black hover:bg-[#FFD84D]"
                    }
                  `}
                >
                  {cause.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How You Can Help ─────────────────────────────────────────────────────────

function HowToHelp() {
  const actions = [
    {
      number: "01",
      title: "Join The Club",
      body: "Your membership directly supports our fundraising efforts and grows the community riding for these causes.",
      href: "/membership/why-join",
      cta: "Become a Member",
      color: "teal",
    },
    {
      number: "02",
      title: "Donate Directly",
      body: "Can't ride? You can still make an impact. Every donation goes directly to the causes we support.",
      href: "/more/donate",
      cta: "Make a Donation",
      color: "gold",
    },
    {
      number: "03",
      title: "Ride With Us",
      body: "Join one of our ride teams for the MS 150, Ride to End ALZ, or Rosedale Ride and earn fundraising milestones.",
      href: "/rides",
      cta: "View Ride Calendar",
      color: "teal",
    },
    {
      number: "04",
      title: "Sponsor AANGCC",
      body: "Businesses can amplify our impact through corporate sponsorship packages that offer visibility and community goodwill.",
      href: "/more/sponsorship",
      cta: "Sponsorship Info",
      color: "gold",
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#2A9D9E]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Get Involved
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            How You Can{" "}
            <span className="text-gradient-gold">Help</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, i) => (
            <motion.div
              key={action.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className="text-[#2A9D9E]/20 font-heading text-[48px] font-bold leading-none group-hover:text-[#2A9D9E]/40 transition-colors duration-300">
                {action.number}
              </span>
              <h3 className="font-heading text-white text-[22px] font-semibold">
                {action.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed flex-1">
                {action.body}
              </p>
              <Link
                href={action.href}
                className={`
                  mt-2 text-center py-2.5 rounded-xl text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300
                  ${action.color === "gold"
                    ? "bg-[#FFD84D]/10 text-[#FFD84D] hover:bg-[#FFD84D] hover:text-black"
                    : "bg-[#2A9D9E]/10 text-[#2A9D9E] hover:bg-[#2A9D9E] hover:text-black"
                  }
                `}
              >
                {action.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function WeSupportPage() {
  return (
    <>
      <PageHero />
      <PrimaryCause />
      <AdditionalCauses />
      <HowToHelp />
    </>
  );
}

