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
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[400px] bg-[#FFD84D]/[0.04] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[300px] bg-[#2A9D9E]/[0.04] blur-[100px] pointer-events-none rounded-full" />

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
            Austin Community Ride
          </span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-tight mb-4"
          style={{ fontSize: "clamp(42px, 7vw, 96px)" }}
        >
          Rosedale{" "}
          <span className="text-gradient-gold">Ride</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="font-heading text-white/40 text-[18px] lg:text-[24px] mb-6"
        >
          Austin's Beloved Annual Community Ride
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed"
        >
          The Rosedale Ride is a beloved Austin tradition that brings
          cyclists of all abilities together to celebrate community,
          give back, and ride through the heart of the city we love.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Ride With AANGCC
          </Link>
          <Link href="/more/donate" className="btn-outline">
            Support the Cause
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── About the Ride ───────────────────────────────────────────────────────────

function AboutTheRide() {
  const highlights = [
    { value: "ATX", label: "Austin Local", color: "gold" },
    { value: "All", label: "Levels Welcome", color: "teal" },
    { value: "Fun", label: "Community Atmosphere", color: "gold" },
    { value: "Annual", label: "Yearly Tradition", color: "teal" },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`
                rounded-2xl border p-6 text-center
                ${h.color === "gold"
                  ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div className={`font-heading text-[40px] lg:text-[48px] font-bold leading-none mb-2 ${h.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {h.value}
              </div>
              <div className="text-white/30 text-[11px] tracking-wide uppercase">
                {h.label}
              </div>
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
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">
                About the Ride
              </span>
            </div>
            <h2
              className="font-heading text-white leading-tight"
              style={{ fontSize: "clamp(28px, 3vw, 48px)" }}
            >
              Austin riding for{" "}
              <span className="text-gradient-gold">Austin.</span>
            </h2>
            <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
              <p>
                The Rosedale Ride is one of Austin's most cherished annual
                cycling events. Named for the historic Rosedale neighborhood,
                this ride winds through some of Austin's most iconic streets
                and communities — bringing cyclists together in celebration
                and service.
              </p>
              <p>
                Unlike our longer endurance events, the Rosedale Ride is
                designed to be accessible to everyone. Families, casual
                riders, seasoned cyclists — all are welcome. The focus is
                on community, connection, and giving back to Austin's local
                causes and organizations.
              </p>
              <p>
                AANGCC participates as a team every year, bringing our
                signature energy and community spirit to one of the city's
                most beloved cycling traditions. It's a ride that reminds
                us why we started pedaling in the first place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/contact" className="btn-primary">
                Join Our Team
              </Link>
              <Link href="/rides" className="btn-outline">
                View All Rides
              </Link>
            </div>
          </motion.div>

          {/* Ride features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              What to Expect
            </div>
            {[
              {
                icon: "🏙️",
                title: "Austin Neighborhood Routes",
                body: "Ride through the streets and neighborhoods that make Austin one of the most unique cities in America.",
                color: "gold",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family-Friendly Atmosphere",
                body: "The Rosedale Ride welcomes riders of all ages and abilities. Bring the whole family and enjoy the experience together.",
                color: "teal",
              },
              {
                icon: "🎉",
                title: "Post-Ride Celebration",
                body: "After the ride, join the community celebration with food, music, and the shared joy of a ride well done.",
                color: "gold",
              },
              {
                icon: "❤️",
                title: "Local Cause Support",
                body: "Proceeds from the Rosedale Ride benefit local Austin organizations and causes making a difference in our community.",
                color: "teal",
              },
              {
                icon: "🚴",
                title: "Multiple Route Options",
                body: "Choose from a range of route distances to match your fitness level and riding goals for the day.",
                color: "gold",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`
                  flex items-start gap-4 p-4 rounded-xl border
                  ${item.color === "gold"
                    ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"
                    : "border-white/[0.07] bg-[#141414]"
                  }
                `}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className={`text-[13px] font-semibold mb-1 ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                    {item.title}
                  </div>
                  <div className="text-white/40 text-[12px] leading-relaxed">
                    {item.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── AANGCC at Rosedale ───────────────────────────────────────────────────────

function AANGCCAtRosedale() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#FFD84D]/[0.04] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Team Spirit
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            AANGCC at the{" "}
            <span className="text-gradient-gold">Rosedale Ride</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              number: "01",
              title: "We Show Up Together",
              body: "AANGCC rides the Rosedale as a unified team — same kit, same energy, same commitment to representing Austin's cycling community with pride.",
              color: "teal",
            },
            {
              number: "02",
              title: "We Celebrate Every Rider",
              body: "From first-timers to veterans, every AANGCC member who crosses the Rosedale finish line is celebrated. We leave no rider behind.",
              color: "gold",
            },
            {
              number: "03",
              title: "We Give Back Locally",
              body: "The Rosedale Ride is our way of investing in the Austin community that supports us all year long. Local causes, local impact.",
              color: "teal",
            },
          ].map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-premium p-8 flex flex-col gap-4 group"
            >
              <span className={`font-heading text-[48px] font-bold leading-none opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {item.number}
              </span>
              <h3 className="font-heading text-white text-[22px] font-semibold">
                {item.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-white/40 text-[15px] mb-8 max-w-[480px] mx-auto">
            Ready to ride with AANGCC at the Rosedale Ride? Get in touch
            and we'll get you connected with our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Join Our Rosedale Team
            </Link>
            <Link href="/rides" className="btn-outline">
              View All Rides
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function RosedalePage() {
  return (
    <>
      <PageHero />
      <AboutTheRide />
      <AANGCCAtRosedale />
    </>
  );
}

