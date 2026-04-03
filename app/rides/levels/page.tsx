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

const LEVELS = [
  {
    id: "social-butterflies",
    name: "Social Butterflies",
    emoji: "🦋",
    tag: "Beginner · No Drop",
    pace: "10–11.5 mph",
    distance: "10–15 Miles",
    dropPolicy: "No Drop Ride",
    dropDefinition: "A \"no drop\" ride means no rider gets left behind, even if a rider is unable to keep up the pace or has a mechanical issue. The group will either wait for the rider to catch up or accompany them back to the starting point.",
    description: "The Social Butterfly is ideal for new riders, especially those new to cycling. Expect moderate hills, regular regroups, and breaks in a welcoming and supportive environment.",
    terrain: "Moderate hills · Regular regroups & breaks",
    requirements: [
      "Must be able to ride 10–15 miles",
      "Maintain a pace of 10–11.5 mph",
      "Ride a standard road or gravel bike",
      "No mountain bikes",
      "No fat tire bikes",
      "No triathlon (TT) bikes",
      "No tandems or recumbent bikes",
      "No use of aero bars",
      "No headsets or earbuds — bone-conducting headphones are ok",
      "Comfortably ride with good balance",
      "Comfortable with others riding around you",
      "Able to take on nutrition and drink from water bottle while riding",
      "Point out debris/hazards to others while riding with one hand",
      "Regular, cage, or clip-in pedals",
      "Help is always available for flat tires — we will help you",
    ],
  },
  {
    id: "roadsters",
    name: "Roadsters",
    emoji: "🚴",
    tag: "Intermediate · Regroup",
    pace: "11.5–13.5 mph",
    distance: "20–30 Miles",
    dropPolicy: "Regroup Ride",
    dropDefinition: "\"Regroup\" means that all group riders will slow down and wait for slower riders who may have fallen behind, allowing everyone to come back together as a pack before continuing at the group's ride pace.",
    description: "The Roadster is ideal for intermediate riders or those seeking a recovery ride. Expect moderately intense rolling hills with regular regroup stops.",
    terrain: "Moderately intense rolling hills · Regular regroup stops",
    requirements: [
      "Comfortably ride 25 miles",
      "Maintain a pace of 11.5–13.5 mph",
      "Ride a standard road bike",
      "No mountain bikes",
      "No fat tire bikes",
      "No triathlon (TT) bikes",
      "No tandem or recumbent bikes",
      "No use of aero bars",
      "No headsets or earbuds — bone-conducting headphones are ok",
      "Able to take on nutrition and drink from water bottle while riding",
      "Point out debris/hazards to others while riding with one hand",
      "Clip in/out of your pedals",
      "Change a flat tire — we will guide you through it",
      "Comfortably ride on public roads with tight shoulders and/or traffic",
    ],
  },
  {
    id: "cyclepaths",
    name: "Cyclepaths",
    emoji: "⚡",
    tag: "Advanced · Drop Ride",
    pace: "13.5–15 mph",
    distance: "30+ Miles",
    dropPolicy: "Drop Ride",
    dropDefinition: "A \"drop ride\" means faster cyclists will not wait for slower riders who fall behind. Riders who can't keep up will be left behind to make it on their own to the next planned stop or the finish line.",
    description: "Just as the name indicates, Cyclepath is ideal for more experienced riders who can ride distance. We regroup only at pre-determined rest stops for a quick break and refuel.",
    terrain: "Distance focused · Pre-determined rest stops only",
    requirements: [
      "Comfortably ride 30+ miles",
      "Maintain a pace of 13.5–15 mph",
      "Ride a standard road bike",
      "No mountain bikes",
      "No fat tire bikes",
      "No triathlon (TT) bikes",
      "No tandem or recumbent bikes",
      "No use of aero bars",
      "No headsets or earbuds — bone-conducting headphones are ok",
      "Able to take on nutrition and drink from water bottle while riding",
      "Point out debris/hazards while riding with one hand",
      "Clip in/out of your pedals",
      "Change a flat tire — we will guide you through it",
      "Comfortably ride on public roads with tight shoulders and/or traffic",
      "Can ride within a paceline or peloton",
      "Comfortable taking tight corners",
      "Can battle elevations of up to 2,800 feet",
      "Comfortable descending at 30+ mph",
      "Comfortable with hand signals",
    ],
  },
];

function PageHero() {
  return (
    <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Find Your Pace</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Ride <span className="text-gradient-gold">Levels</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed">
          AANGCC has a group for every rider. Find your level, show up, and ride with people who push you forward.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {LEVELS.map((level) => (
            <a key={level.id} href={`#${level.id}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/40 text-white/80 text-[13px] font-semibold tracking-wide hover:border-[#FFD84D] hover:text-[#FFD84D] transition-all duration-200">
              <span>{level.emoji}</span>{level.name}
            </a>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function LevelCard({ level, index }: { level: typeof LEVELS[0]; index: number }) {
  return (
    <motion.div
      id={level.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="h-[4px] w-full bg-[#FFD84D]" />
      <div className="p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Overview */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <span className="text-5xl flex-shrink-0">{level.emoji}</span>
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{level.tag}</span>
                <h2 className="font-heading text-[#111111] text-[36px] lg:text-[44px] font-semibold leading-tight mt-2">{level.name}</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-[#14CFC4]/20 bg-[#14CFC4]/[0.05] text-center">
                <div className="font-heading text-[#14CFC4] text-[20px] font-bold mb-1">{level.pace}</div>
                <div className="text-[#888] text-[10px] uppercase tracking-wide">Avg Pace</div>
              </div>
              <div className="p-4 rounded-xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.05] text-center">
                <div className="font-heading text-[#14CFC4] text-[20px] font-bold mb-1">{level.distance}</div>
                <div className="text-[#888] text-[10px] uppercase tracking-wide">Distance</div>
              </div>
            </div>

            <p className="text-[#555] text-[15px] leading-relaxed">{level.description}</p>

            <div className="flex items-center gap-3 text-[#888] text-[13px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 4 4-6 4 6" /></svg>
              {level.terrain}
            </div>

            <div className="p-5 rounded-xl bg-[#14CFC4]/[0.08] border border-[#14CFC4]/20">
              <div className="text-[#0FAFA5] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2">{level.dropPolicy}</div>
              <p className="text-[#555] text-[13px] leading-relaxed italic">{level.dropDefinition}</p>
            </div>
          </div>

          {/* Right: Requirements */}
          <div className="lg:col-span-7">
            <div className="text-[#888] text-[11px] tracking-[0.2em] uppercase font-medium mb-5">Group Minimum Requirements</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {level.requirements.map((req, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} className="flex items-start gap-3">
                  <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#14CFC4" fillOpacity="0.15" />
                    <path d="M5 8L7 10L11 6" stroke="#0FAFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[#555] text-[13px] leading-snug">{req}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EtiquetteStrip() {
  const rules = [
    { icon: "👋", title: "Call Out Hazards", body: "Shout 'hole', 'gravel', 'car back', or 'stopping' to warn riders behind you." },
    { icon: "🚦", title: "Obey Traffic Laws", body: "AANGCC follows all traffic laws on every ride — no exceptions." },
    { icon: "📏", title: "Hold Your Line", body: "Ride predictably. No sudden swerves or braking without warning." },
    { icon: "🔋", title: "Come Prepared", body: "Water, a snack, a spare tube, and CO2. Don't rely on others for your essentials." },
    { icon: "🤝", title: "Support Your Group", body: "Encourage fellow riders. Cycling is hard — bring energy that lifts the group." },
    { icon: "😊", title: "Good Vibes Only", body: "We move together, grow together, and serve together. That's the AANGCC way." },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Ride Safe. Ride Smart.</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Group Ride <span className="text-gradient-gold">Etiquette</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rules.map((rule, i) => (
            <motion.div key={rule.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{rule.icon}</span>
              <h3 className="font-heading text-[#111111] text-[20px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{rule.title}</h3>
              <p className="text-[#666] text-[13px] leading-relaxed">{rule.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LevelsCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
          Not sure which level?
          <br /><span className="text-gradient-gold">Start with Social Butterflies.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="text-white/75 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
          Everyone is welcome here. Join us for a no-drop ride and let the road show you where you belong. We'll be right there with you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Club</Link>
          <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">View Ride Calendar</Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function RideLevelsPage() {
  return (
    <>
      <PageHero />
      <section className="relative py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col gap-8">
          {LEVELS.map((level, i) => <LevelCard key={level.id} level={level} index={i} />)}
        </div>
      </section>
      <EtiquetteStrip />
      <LevelsCTA />
    </>
  );
}

