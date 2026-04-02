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

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[72px]" style={{ backgroundColor: "#0FAFA5" }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">About Us</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          About <span className="text-gradient-gold">AANGCC</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/80 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed">
          We are not built on ego, speed, or podium finishes. We are built on people.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #14CFC4, transparent)" }} />
    </section>
  );
}

// ─── 1. INTRO ─────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#14CFC4" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-white/[0.06] blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[860px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-8">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white text-[18px] lg:text-[20px] leading-relaxed font-light">
            If you're looking for a team obsessed with watts, rankings, and competition, we may not be your lane. But if you're looking for a community that rides with purpose, laughs at rest stops, checks on one another during climbs, and shows up when it matters — you'll feel right at home.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/80 text-[16px] leading-relaxed">
            Our club is rooted in connection. We ride to build relationships. We ride to support causes greater than ourselves. We ride to give back. The miles are important, but the mission is bigger.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/80 text-[16px] leading-relaxed">
            We welcome individuals who embody generosity, humility, and camaraderie. Those who understand that strength isn't just about how hard you pedal, but how deeply you care.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-7">
            <p className="text-white text-[18px] font-heading font-semibold leading-relaxed">
              All Ass No Gas Cycling Club is about fellowship, accountability, and impact. We move together. We grow together. We serve together.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. MEANING BEHIND THE NAME ───────────────────────────────────────────────

function MeaningBehindTheName() {
  return (
    <section className="relative py-24" style={{ backgroundColor: "#0FAFA5" }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.05] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">The Name</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              The Meaning<br /><span className="text-gradient-gold">Behind the Name</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-8 flex flex-col gap-6">
            <p className="text-white/85 text-[17px] leading-relaxed">
              The name might raise a few eyebrows — and honestly, that's exactly the point. All Ass No Gas isn't here to blend in, play it safe, or tiptoe around expectations. We chose a name that gets attention because the work we do deserves attention.
            </p>
            <div className="bg-white rounded-2xl p-7 shadow-lg">
              <p className="text-[#111111] text-[17px] leading-relaxed font-heading font-semibold">
                "All Ass No Gas" is far more than a catchy phrase. It's a statement of who we are and how we show up.
              </p>
            </div>
            <p className="text-white/80 text-[16px] leading-relaxed">
              It reflects our values: we give everything we've got, we don't hold back, and we never coast. When we ride, we ride with purpose. When we advocate, we speak loudly. When we support those living with MS, we go all in — no hesitation, no half-effort, no apologies.
            </p>
            <p className="text-white font-semibold text-[16px] leading-relaxed">
              Because at the end of the day, we stand for effort, action, and a team that shows up fully — every time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. BUILDING A COMMUNITY ─────────────────────────────────────────────────

function BuildingACommunity() {
  return (
    <section className="relative py-24" style={{ backgroundColor: "#14CFC4" }}>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-8 flex flex-col gap-6 order-2 lg:order-1">
            <p className="text-white/85 text-[17px] leading-relaxed">
              From the start, the vision was to create more than just a cycling team. The goal was a space where people could come together to do something bigger than themselves — a space for those willing to train, raise funds, and give everything they've got to fight MS.
            </p>
            <p className="text-white/80 text-[16px] leading-relaxed">
              Every year, our team sets bold goals, both in miles and dollars raised. Fundraising isn't optional — it's essential. The money we raise goes directly toward research, advocacy, and life-changing programs for people living with MS.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              {[
                { value: "Miles", label: "Bold annual goals" },
                { value: "Dollars", label: "Raised for MS research" },
                { value: "People", label: "Committed to change" },
              ].map((item, i) => (
                <div key={item.label} className="bg-white rounded-2xl p-5 text-center shadow-lg">
                  <div className="font-heading text-[#14CFC4] text-[22px] font-bold mb-1">{item.value}</div>
                  <div className="text-[#555] text-[11px] tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-white font-semibold text-[16px] leading-relaxed">
              When someone joins our team, they commit to more than riding. They commit to making a difference.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-4 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-white/60" />
              <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">Community</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Building a Community,<br /><span className="text-gradient-gold">Not Just a Club</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. WHY WE RIDE ───────────────────────────────────────────────────────────

function WhyWeRide() {
  return (
    <section className="relative py-24" style={{ backgroundColor: "#0FAFA5" }}>
      <div className="relative z-10 max-w-[860px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Our Purpose</span>
            <div className="h-[2px] w-8 bg-[#FFD84D]" />
          </div>
          <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Why We <span className="text-gradient-gold">Ride</span>
          </h2>
        </motion.div>
        <div className="flex flex-col gap-8">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white/85 text-[17px] leading-relaxed text-center">
            The All Ass No Gas Cycling Club continues to ride for the National Multiple Sclerosis Society because every mile reminds us why this mission matters.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "👩", story: "We ride for the mother who was diagnosed in her thirties and refuses to let MS define her life." },
              { icon: "👨", story: "We ride for the father who shows up at every finish line to cheer on his daughter living with MS." },
              { icon: "🚴", story: "We ride for the friend who once cycled beside us and now stands at the sidelines, reminding us that our efforts make a real difference." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-lg"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-[#444] text-[14px] leading-relaxed italic">{item.story}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="text-center">
            <p className="text-white font-heading text-[20px] font-semibold">
              We ride because their stories stay with us.
              <br />
              <span className="text-gradient-gold">And as long as those stories exist, so will our commitment.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. MOVEMENT SECTION ─────────────────────────────────────────────────────

function MovementSection() {
  return (
    <section className="relative py-24" style={{ backgroundColor: "#14CFC4" }}>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-white/60" />
              <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">The Movement</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              More Than a Club —<br /><span className="text-gradient-gold">A Movement</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-8 flex flex-col gap-6">
            <p className="text-white/85 text-[17px] leading-relaxed">
              Over time, All Ass No Gas has grown into something far greater than ever imagined. What started as a simple idea — a group of friends coming together to ride — has transformed into a movement grounded in action, compassion, and unwavering unity.
            </p>
            <p className="text-white/80 text-[16px] leading-relaxed">
              Every ride we complete, every dollar we raise, and every conversation we have about multiple sclerosis sends a ripple out into the world. It spreads awareness, offers hope, and reminds others that ordinary people can accomplish extraordinary things.
            </p>
            <div className="bg-white rounded-2xl p-7 shadow-lg">
              <p className="text-[#111111] text-[16px] leading-relaxed font-semibold">
                What we do isn't just about cycling — it's about lifting others up, amplifying their stories, and making sure no one living with MS feels alone in their fight.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. VISION FOR THE FUTURE ────────────────────────────────────────────────

function VisionForTheFuture() {
  const pillars = [
    { number: "01", title: "Expand the Team", body: "We are committed to welcoming more passionate riders who share our drive to make a difference. With every new member, we strengthen our presence and impact." },
    { number: "02", title: "Raise More Funds", body: "We aim to raise more for the National MS Society and grow our own team — giving us the resources to serve the MS community even more effectively." },
    { number: "03", title: "Increase Awareness", body: "We want to help ensure that MS is understood, that newly diagnosed individuals feel supported, and that no one facing this disease walks their journey alone." },
    { number: "04", title: "Build a Legacy", body: "We want the name All Ass No Gas to stand as a symbol — one that immediately conveys action, compassion, and an unbreakable commitment to ending MS." },
  ];

  return (
    <section className="relative py-24" style={{ backgroundColor: "#0FAFA5" }}>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Looking Ahead</span>
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Our Vision for<br /><span className="text-gradient-gold">the Future</span>
            </h2>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="font-heading text-[48px] font-bold leading-none text-[#14CFC4] opacity-40 group-hover:opacity-70 transition-opacity duration-300">{pillar.number}</span>
              <h3 className="font-heading text-[#111111] text-[20px] font-semibold">{pillar.title}</h3>
              <p className="text-[#555] text-[13px] leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. STATEMENT OF VALUE ────────────────────────────────────────────────────

function StatementOfValue() {
  return (
    <section className="relative py-24" style={{ backgroundColor: "#14CFC4" }}>
      <div className="relative z-10 max-w-[860px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-white/50" />
            <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">Our Values</span>
            <div className="h-[2px] w-8 bg-white/50" />
          </div>
          <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Statement of <span className="text-gradient-gold">Value</span>
          </h2>
        </motion.div>
        <div className="flex flex-col gap-6">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white/85 text-[17px] leading-relaxed text-center">
            While we are a cycling club, we take pride in being Austin's friendliest and most socially responsible biking community. Our members come together to enjoy rides throughout the Austin metropolitan area, fostering an environment where everyone feels safe, supported, and encouraged.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <p className="text-[#111111] text-[17px] leading-relaxed font-heading font-semibold">
              This statement of values reflects our commitment to creating a space built on mutual respect and shared purpose for the benefit of all.
            </p>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/80 text-[16px] leading-relaxed text-center">
            AANGCC is dedicated to maintaining a welcoming, diverse, and inclusive community for all members, regardless of race, creed, gender, religion, socioeconomic status, or sexual orientation.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#FFD84D] rounded-2xl p-7 text-center shadow-lg">
            <p className="text-[#111111] text-[16px] leading-relaxed font-semibold">
              We stand united against racism, intolerance, bigotry, and all forms of discrimination, reaffirming our commitment to equity and inclusion in everything we do.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── JOIN THE FIGHT CTA ───────────────────────────────────────────────────────

function JoinTheFight() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: "#0FAFA5" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-white/[0.08] blur-[100px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-white/50" />
            <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">Join the Fight</span>
            <div className="h-[2px] w-8 bg-white/50" />
          </div>
          <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            Supporting the MS Society isn't just
            <br /><span className="text-gradient-gold">part of our story.</span>
            <br />It's the foundation of who we are.
          </h2>
          <p className="text-white/80 text-[16px] leading-relaxed max-w-[600px] mx-auto">
            All Ass No Gas Cycling Club is more than just cyclists riding together. We are a living, breathing example of what happens when purpose meets passion. Together, we ride. Together, we fight. Together, we believe in building a stronger, united community — one pedal stroke at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <Link href="/membership/why-join" className="btn-primary">Join The Club</Link>
            <Link href="/about/we-support" className="btn-outline">Who We Support</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <Intro />
      <MeaningBehindTheName />
      <BuildingACommunity />
      <WhyWeRide />
      <MovementSection />
      <VisionForTheFuture />
      <StatementOfValue />
      <JoinTheFight />
    </>
  );
}

