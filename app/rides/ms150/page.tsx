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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Flagship Event</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          BP MS <span className="text-gradient-gold">150</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="font-heading text-white/70 text-[20px] lg:text-[26px] mb-6">
          Houston → Austin · 150 Miles · 2 Days
        </motion.p>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-white/75 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed">
          The BP MS 150 is our most important ride of the year. Two days, 150 miles, and thousands of cyclists united in the fight against Multiple Sclerosis.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Donate to Our Team</a>
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Join Our MS 150 Team</a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#14CFC4]/50 to-transparent pointer-events-none" />
    </section>
  );
}

function EventOverview() {
  const stats = [
    { value: "150", unit: "Miles", label: "Total Distance" },
    { value: "2", unit: "Days", label: "Ride Duration" },
    { value: "HTX", unit: "→ ATX", label: "Houston to Austin" },
    { value: "$65K+", unit: "Raised", label: "For MS Society" },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="font-heading text-[#14CFC4] text-[40px] lg:text-[52px] font-bold leading-none mb-1">{s.value}</div>
              <div className="text-[#FFD84D] text-[12px] font-semibold mb-2">{s.unit}</div>
              <div className="text-[#888] text-[11px] tracking-wide uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">About The Ride</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
              The ride that defines <span className="text-gradient-gold">our season.</span>
            </h2>
            <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
              <p>The BP MS 150 is one of the largest fundraising cycling events in the United States. Each year, thousands of cyclists make the journey from Houston to Austin across two days of riding — all in support of the National Multiple Sclerosis Society.</p>
              <p>For AANGCC, the MS 150 is more than a race. It's our annual commitment to the fight against MS — a disease that affects nearly 1 million Americans. Every dollar raised goes directly toward MS research, programs, and advocacy.</p>
              <p>Whether you're a first-timer or a seasoned MS 150 veteran, riding with the AANGCC team means you never ride alone. We train together, ride together, and celebrate every finish line as a family.</p>
            </div>
          </motion.div>

          {/* Day breakdown */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-4">
            {[
              { day: "Day 1", route: "Houston → La Grange", miles: "~90 Miles", details: ["Depart from NRG Park in Houston", "Scenic Texas Hill Country roads", "Rest stops with food and support", "Overnight at La Grange camp"] },
              { day: "Day 2", route: "La Grange → Austin", miles: "~60 Miles", details: ["Morning departure from camp", "Final push into Austin", "Finish line celebration", "Post-ride festivities and awards"] },
            ].map((day) => (
              <div key={day.day} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[4px] w-full bg-[#FFD84D]" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">{day.day}</span>
                      <h3 className="font-heading text-[#111111] text-[20px] font-semibold mt-1">{day.route}</h3>
                    </div>
                    <span className="text-[13px] font-semibold px-3 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{day.miles}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {day.details.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-[#555] text-[13px]">
                        <span className="w-1 h-1 rounded-full bg-[#14CFC4] flex-shrink-0" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrainingAndFundraising() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-6 bg-[#14CFC4]" />
              <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">Team Training</span>
            </div>
            <h3 className="font-heading text-[#111111] text-[26px] font-semibold">We train together.</h3>
            <p className="text-[#555] text-[14px] leading-relaxed">AANGCC runs a structured MS 150 training program in the months leading up to the event. Weekly long rides, pace groups, and nutrition guidance help every rider cross that finish line with confidence.</p>
            <ul className="flex flex-col gap-3 mt-2">
              {["Weekly training rides from January through April", "Structured long ride schedule building to 90 miles", "Pace groups for all rider levels", "Nutrition and hydration coaching", "Gear and bike fit guidance"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#555] text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14CFC4] flex-shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-6 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#b8960a" }}>Fundraising</span>
            </div>
            <h3 className="font-heading text-[#111111] text-[26px] font-semibold">Every dollar counts.</h3>
            <p className="text-[#555] text-[14px] leading-relaxed">Each MS 150 rider is required to raise a minimum amount through the National MS Society's fundraising platform. AANGCC provides team support, fundraising tips, and a community of donors who believe in what we ride for.</p>
            <ul className="flex flex-col gap-3 mt-2">
              {["Personal fundraising page setup guidance", "Team donation matching opportunities", "Fundraising milestone recognition", "Corporate sponsorship connections", "Ongoing team fundraising support"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#555] text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D] flex-shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MS150CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
          Ready to ride <span className="text-gradient-gold">150?</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="text-white/75 text-[15px] mb-10 max-w-[460px] mx-auto">
          Join the AANGCC MS 150 team and be part of something that matters. We train together, ride together, and finish together.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join Our MS 150 Team</a>
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Donate to the Cause</a>
        </motion.div>
      </div>
    </section>
  );
}

export default function MS150Page() {
  return (
    <>
      <PageHero />
      <EventOverview />
      <TrainingAndFundraising />
      <MS150CTA />
    </>
  );
}

