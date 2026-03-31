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

// ─── Ride Level Data ──────────────────────────────────────────────────────────

const RIDE_LEVELS = [
  {
    level: "A",
    name: "Advanced",
    pace: "18–22+ mph",
    distance: "40–80+ miles",
    color: "gold",
    tag: "Competitive",
    description:
      "The A group is for strong, experienced cyclists who are comfortable riding in a tight pack at high speeds. Expect minimal stops, aggressive pacing, and a competitive atmosphere. Riders are expected to know group riding etiquette and be able to hold their position in the peloton.",
    expectations: [
      "Comfortable riding at 18+ mph for extended periods",
      "Strong group riding and drafting skills",
      "Knowledge of hand signals and verbal calls",
      "Ability to handle rolling terrain at pace",
      "Self-sufficient with flat repair and basic bike maintenance",
      "Appropriate road cycling gear and equipment",
    ],
    notFor: "New cyclists or those still building base fitness.",
  },
  {
    level: "B",
    name: "Intermediate",
    pace: "14–18 mph",
    distance: "25–50 miles",
    color: "teal",
    tag: "Building",
    description:
      "The B group is for confident riders who are building their endurance, speed, and group riding skills. Rides include occasional regrouping stops and a supportive but progressively challenging environment. This is where many AANGCC members spend their early months before moving to the A group.",
    expectations: [
      "Comfortable riding 14+ mph on flat roads",
      "Basic understanding of group riding",
      "Ability to complete 25+ miles without difficulty",
      "Proper road cycling attire and helmet",
      "Willingness to push your limits in a supportive setting",
      "Some experience riding outdoors on a road or hybrid bike",
    ],
    notFor: "Complete beginners or those who have never ridden in a group.",
  },
  {
    level: "C",
    name: "Beginner",
    pace: "10–14 mph",
    distance: "10–25 miles",
    color: "teal",
    tag: "All Welcome",
    description:
      "The C group is the perfect entry point for new cyclists and those returning to riding after a break. Rides are relaxed, social, and encouraging. Experienced AANGCC members lead and sweep every C group ride to ensure nobody gets left behind. If you can ride a bike, you belong here.",
    expectations: [
      "Ability to ride a bike safely on the road",
      "A roadworthy bicycle in good working condition",
      "A properly fitted helmet — non-negotiable",
      "Water bottle and basic snacks for longer rides",
      "Willingness to learn and ask questions",
      "Comfortable clothing — no special gear required",
    ],
    notFor: "No one. Everyone is welcome in the C group.",
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
            Find Your Pace
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
          Ride{" "}
          <span className="text-gradient-teal">Levels</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed"
        >
          AANGCC has a group for every rider. Whether you're just
          getting started or chasing personal records — find your level,
          show up, and ride.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Level Cards ──────────────────────────────────────────────────────────────

function LevelCards() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Quick compare row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {RIDE_LEVELS.map((l) => (
            <div
              key={l.level}
              className={`
                rounded-2xl border p-5 text-center
                ${l.color === "gold"
                  ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div className={`font-heading text-[48px] font-bold leading-none mb-1 ${l.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                {l.level}
              </div>
              <div className="text-white/60 text-[13px] font-medium">{l.name}</div>
              <div className="text-white/30 text-[11px] mt-1">{l.pace}</div>
            </div>
          ))}
        </motion.div>

        {/* Full level breakdowns */}
        <div className="flex flex-col gap-8">
          {RIDE_LEVELS.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden
                ${level.color === "gold"
                  ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              {/* Top accent */}
              <div
                className={`h-[3px] w-full ${
                  level.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />

              <div className="p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Level badge + overview */}
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center font-heading text-[36px] font-bold flex-shrink-0 ${
                        level.color === "gold"
                          ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                          : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                      }`}
                    >
                      {level.level}
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full ${
                          level.color === "gold"
                            ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                            : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                        }`}
                      >
                        {level.tag}
                      </span>
                      <h2 className="font-heading text-white text-[28px] font-semibold mt-1">
                        {level.name}
                      </h2>
                    </div>
                  </div>

                  {/* Pace + Distance */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Avg Pace", value: level.pace },
                      { label: "Distance", value: level.distance },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center"
                      >
                        <div className={`text-[14px] font-semibold mb-1 ${level.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                          {stat.value}
                        </div>
                        <div className="text-white/30 text-[10px] uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/40 text-[14px] leading-relaxed">
                    {level.description}
                  </p>
                </div>

                {/* Expectations + Not For */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div>
                    <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-4">
                      What We Expect
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {level.expectations.map((exp) => (
                        <div
                          key={exp}
                          className="flex items-start gap-3 text-white/50 text-[13px] leading-snug"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px] ${
                              level.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"
                            }`}
                          />
                          {exp}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`
                      p-5 rounded-xl border
                      ${level.color === "gold"
                        ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.03]"
                        : "border-white/[0.07] bg-white/[0.02]"
                      }
                    `}
                  >
                    <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
                      Not Right For
                    </div>
                    <p className={`text-[13px] font-medium ${level.color === "gold" ? "text-[#FFD84D]/70" : "text-[#2A9D9E]/70"}`}>
                      {level.notFor}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Group Ride Etiquette ─────────────────────────────────────────────────────

function RideEtiquette() {
  const rules = [
    {
      icon: "👋",
      title: "Call Out Hazards",
      body: "Shout 'hole', 'gravel', 'car back', or 'stopping' to warn riders behind you. Communication keeps everyone safe.",
    },
    {
      icon: "🚦",
      title: "Obey Traffic Laws",
      body: "Run red lights and stop signs and you're off the ride. AANGCC follows all traffic laws — no exceptions.",
    },
    {
      icon: "📏",
      title: "Hold Your Line",
      body: "Ride predictably. No sudden swerves or braking without warning. Steady lines keep the group safe.",
    },
    {
      icon: "🔋",
      title: "Come Prepared",
      body: "Bring water, a snack, a spare tube, and CO2. Don't rely on others to carry your essentials.",
    },
    {
      icon: "🤝",
      title: "No One Gets Left",
      body: "We ride as a group and finish as a group. If someone flats, we wait. That's the AANGCC way.",
    },
    {
      icon: "😊",
      title: "Good Vibes Only",
      body: "Encourage your fellow riders. Cycling is hard enough — bring energy that lifts the group, not brings it down.",
    },
  ];

  return (
    <section className="relative bg-black py-24 border-t border-white/[0.06] overflow-hidden">
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
            Ride Safe. Ride Smart.
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Group Ride{" "}
            <span className="text-gradient-gold">Etiquette</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-premium p-7 flex flex-col gap-4"
            >
              <span className="text-3xl">{rule.icon}</span>
              <h3 className="font-heading text-white text-[20px] font-semibold">
                {rule.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {rule.body}
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="btn-primary">
              Join The Club
            </Link>
            <Link href="/rides" className="btn-outline">
              View Ride Calendar
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function RideLevelsPage() {
  return (
    <>
      <PageHero />
      <LevelCards />
      <RideEtiquette />
    </>
  );
}

