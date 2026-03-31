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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFD84D]/[0.05] blur-[120px] pointer-events-none rounded-full" />

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
            Exclusive Access
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
          Members{" "}
          <span className="text-gradient-gold">Only</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          This area is reserved for active AANGCC members. Access ride
          resources, club documents, event details, and member
          communications — all in one place.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Access Gate ──────────────────────────────────────────────────────────────

function AccessGate() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Login Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.02] overflow-hidden">
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" />

              <div className="p-8 lg:p-10 flex flex-col gap-6">
                <div>
                  <h2 className="font-heading text-white text-[28px] font-semibold mb-2">
                    Member Sign In
                  </h2>
                  <p className="text-white/40 text-[13px]">
                    Enter your member credentials to access the exclusive
                    members area.
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[12px] font-medium tracking-wide uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="
                      w-full px-5 py-3 rounded-xl
                      bg-white/[0.04] border border-white/[0.08]
                      text-white text-[14px] placeholder-white/25
                      focus:outline-none focus:border-[#FFD84D]/40
                      transition-colors duration-200
                    "
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-white/50 text-[12px] font-medium tracking-wide uppercase">
                      Password
                    </label>
                    <button className="text-[#FFD84D] text-[12px] hover:text-white transition-colors duration-200">
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="
                      w-full px-5 py-3 rounded-xl
                      bg-white/[0.04] border border-white/[0.08]
                      text-white text-[14px] placeholder-white/25
                      focus:outline-none focus:border-[#FFD84D]/40
                      transition-colors duration-200
                    "
                  />
                </div>

                {/* Sign in button */}
                <button
                  className="
                    w-full py-3 rounded-xl
                    bg-[#FFD84D] text-black text-[13px] font-semibold tracking-[0.08em] uppercase
                    hover:bg-white transition-colors duration-300
                    shadow-[0_0_24px_rgba(255,216,77,0.2)]
                  "
                >
                  Sign In
                </button>

                <div className="text-center">
                  <span className="text-white/30 text-[12px]">
                    Not a member yet?{" "}
                  </span>
                  <Link
                    href="/membership/why-join"
                    className="text-[#2A9D9E] text-[12px] hover:text-white transition-colors duration-200"
                  >
                    Join The Club
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── What's Inside ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="mb-2">
              <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">
                Inside Members Area
              </span>
            </div>

            {[
              {
                icon: "📅",
                title: "Ride Schedule",
                body: "Full calendar of upcoming rides, routes, and event details.",
              },
              {
                icon: "📋",
                title: "Club Documents",
                body: "Bylaws, code of conduct, waivers, and member resources.",
              },
              {
                icon: "📸",
                title: "Team Photo Gallery",
                body: "Exclusive access to full-resolution event and ride photos.",
              },
              {
                icon: "💬",
                title: "Member Communications",
                body: "Club announcements, newsletters, and ride updates.",
              },
              {
                icon: "🏆",
                title: "Event Priority Access",
                body: "Early registration for AANGCC events and partner rides.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-white text-[13px] font-semibold mb-1">
                    {item.title}
                  </div>
                  <div className="text-white/40 text-[12px] leading-snug">
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

// ─── Not A Member CTA ─────────────────────────────────────────────────────────

function NotAMemberCTA() {
  return (
    <section className="relative py-24 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#2A9D9E]/[0.06] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-white leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Not a member{" "}
          <span className="text-gradient-teal">yet?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white/40 text-[14px] mb-8 max-w-[400px] mx-auto"
        >
          Join AANGCC and get full access to everything in the members
          area — plus all the rides, events, and community that come with it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/membership/why-join" className="btn-primary">
            Why Join The Club?
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function MembersOnlyPage() {
  return (
    <>
      <PageHero />
      <AccessGate />
      <NotAMemberCTA />
    </>
  );
}

