"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const FAQ_CATEGORIES = [
  {
    category: "Membership",
    icon: "🏅",
    questions: [
      { q: "Who can join AANGCC?", a: "AANGCC is open to adults 18 years of age and older. We welcome riders of all experience levels — from complete beginners to experienced cyclists." },
      { q: "How much does membership cost?", a: "Individual membership is $99/year. Family membership (up to 3 adults) is $149/year. Small Business (1–14 employees) is $599/year. Corporate (15–99 employees) is $1,999/year. All dues are electronically debited based on your anniversary date." },
      { q: "Is membership based on a calendar year?", a: "No. Membership is based on your anniversary date — the date you joined. For example, if you joined April 1, 2024, your membership is valid through March 31, 2025." },
      { q: "Can a minor join the club?", a: "No. We do not accept membership submitted by anyone under 18 years of age." },
    ],
  },
  {
    category: "Equipment & Bikes",
    icon: "🚲",
    questions: [
      { q: "What type of bike is required?", a: "Members may ride a standard road bike, gravel bike, or mountain bike. For safety and group consistency, fat tire bikes, triathlon (TT) bikes, tandem bicycles, and recumbent bikes are not permitted. A properly fitted helmet is mandatory at all times." },
      { q: "Do I need an expensive road bike?", a: "No. Any well-maintained, roadworthy bicycle that is safe and reliable is fully acceptable." },
      { q: "Are aerobars allowed on group rides?", a: "No. Aerobars are prohibited due to reduced braking control and limited maneuverability in close group settings." },
      { q: "What is a bottle cage?", a: "A bottle cage is the mounted holder on your bike frame used to carry hydration. For longer rides (e.g., 100 miles), riders should plan to carry at least two bottles." },
      { q: "Why is wearing a club jersey recommended?", a: "Club jerseys promote unity, enhance visibility on the road, and allow riders to easily identify fellow members within the group." },
    ],
  },
  {
    category: "Rides & Group Riding",
    icon: "🚴",
    questions: [
      { q: "What are your ride groups?", a: "We have three groups: Social Butterflies (10–15 miles, 10–11.5 mph, no drop), Roadsters (20–30 miles, 11.5–13.5 mph, regroup ride), and Cyclepaths (30+ miles, 13.5–15 mph, drop ride)." },
      { q: "Where do your rides start?", a: "Most Saturday rides start at Govalle Neighborhood Park, 5200 Bolm Road, Austin, TX 78721. Special event rides may have different starting points — always check the ride calendar." },
      { q: "What is a 'no drop' ride?", a: "A no drop ride means no rider gets left behind. If someone can't keep up or has a mechanical issue, the group waits or accompanies them back to the start." },
      { q: "What happens after the ride?", a: "Most rides conclude with a post-ride social gathering at a local coffee shop or café — typically Monkey Nest Coffee on Burnet Road — reinforcing the club's culture of community and connection." },
      { q: "Am I required to know how to fix a flat tire?", a: "While assistance is always available, riders are expected to be self-sufficient. Each rider should carry at least two spare inner tubes, tire levers, and a pump or CO₂ inflation system." },
      { q: "Is there a café stop during rides?", a: "Yes. Social stops are an integral part of the club experience. Riders should bring a form of payment for refreshments, typically scheduled mid-ride or post-ride." },
      { q: "What if I struggle on climbs?", a: "Ride within your capacity. The group will regroup at designated points, including the top of climbs. Avoid overexertion in an attempt to match stronger riders." },
      { q: "How should I notify the group if I leave early?", a: "Always inform a ride leader or nearby rider before departing. This ensures accountability and prevents unnecessary concern." },
    ],
  },
  {
    category: "Group Riding Techniques",
    icon: "⚡",
    questions: [
      { q: "Why is it easier to ride behind another cyclist?", a: "Riding behind another cyclist — known as drafting — reduces wind resistance by approximately 30–40%, allowing for greater efficiency and reduced energy expenditure." },
      { q: "What does 'taking a pull' mean?", a: "Taking a pull refers to rotating to the front of the group to share the workload of breaking the wind. Riders are expected to maintain the group's current pace — not accelerate." },
      { q: "How do I rotate in a paceline?", a: "When your turn at the front is complete, check for safety, signal your movement, and smoothly pull off to the side (typically left). Allow the group to pass before rejoining at the back of the line." },
      { q: "What is 'half-wheeling,' and why is it discouraged?", a: "Half-wheeling occurs when a rider overlaps their front wheel with the rear wheel of the cyclist ahead. This creates a significant safety risk and increases the likelihood of crashes." },
      { q: "Why should I avoid sudden braking?", a: "Abrupt braking can create a cascading 'accordion effect,' increasing the risk of collisions within the group. Riders should manage speed smoothly through cadence control and positioning." },
      { q: "What does 'holding your line' mean?", a: "Holding your line refers to maintaining a consistent, predictable path. Sudden or erratic movements can endanger riders behind you." },
      { q: "Why do we ride two-by-two?", a: "Riding side-by-side improves group visibility, shortens the length of the group, and enhances communication. Riders should transition to single file when required by traffic or road conditions." },
    ],
  },
  {
    category: "Ride Signals & Communication",
    icon: "🤝",
    questions: [
      { q: "What do 'Car Up' and 'Car Back' mean?", a: "'Car Up' alerts riders to a vehicle ahead, while 'Car Back' signals a vehicle approaching from behind." },
      { q: "What does the 'point down' hand signal indicate?", a: "A downward-pointing hand signals hazards such as potholes, gravel, or debris on the road surface." },
      { q: "Why do riders call out 'Clear!' at intersections?", a: "This indicates that the lead rider believes it is safe to proceed. However, all riders are responsible for confirming safety independently before crossing." },
    ],
  },
  {
    category: "Charitable Mission & Impact",
    icon: "❤️",
    questions: [
      { q: "Why does AANGCC ride for charity?", a: "Our mission extends beyond cycling. We are committed to supporting the National Multiple Sclerosis Society, the Alzheimer's Association, and the Rosedale Foundation. Every mile ridden and every dollar raised contributes to meaningful change." },
      { q: "Where do MS 150 donations go?", a: "100% of donations made through official MS 150 fundraising links go directly to the National MS Society. The club does not retain any portion." },
      { q: "Where do Ride to End ALZ donations go?", a: "All funds raised through official Ride to End ALZ links go directly to the Alzheimer's Association. AANGCC retains no portion of these donations." },
      { q: "Where do Rosedale Ride donations go?", a: "All contributions made through official Rosedale Ride links go directly to the Rosedale Foundation, with no funds retained by the club." },
      { q: "How are direct contributions to AANGCC used?", a: "Direct contributions support club operations, logistics, travel, and infrastructure, ensuring the continued execution of our mission and events." },
    ],
  },
  {
    category: "Fundraising Requirements",
    icon: "💰",
    questions: [
      { q: "Is fundraising required for MS 150 participation?", a: "Yes. Riders must meet a minimum fundraising requirement of $1,500. The club provides structured support, strategies, and community engagement to help each rider succeed." },
      { q: "Is fundraising required for Ride to End ALZ?", a: "Yes. A minimum fundraising commitment of $500 is required." },
      { q: "Is fundraising required for the Rosedale Ride?", a: "Yes. Participants are required to raise a minimum of $250." },
    ],
  },
  {
    category: "Events & Participation",
    icon: "🏆",
    questions: [
      { q: "What events does AANGCC participate in?", a: "The club participates in three primary annual events: Texas MS 150 (Austin to College Station), Ride to End ALZ (Dripping Springs), and the Rosedale Ride (Austin). All events and training rides are listed on the official club ride calendar." },
      { q: "What is the Texas MS 150?", a: "The Texas MS 150 is our flagship two-day charity cycling event — 156 miles from Austin to College Station in support of the National Multiple Sclerosis Society." },
      { q: "What is the Ride to End ALZ?", a: "The Ride to End ALZ is an annual 40-mile charity ride in Dripping Springs, Texas, benefiting the Alzheimer's Association. The post-ride celebration is sponsored by H.E.B." },
      { q: "What is the Rosedale Ride?", a: "The Rosedale Ride is our annual Austin community ride supporting The Rosedale School — a campus serving students with disabilities and complex medical needs." },
    ],
  },
  {
    category: "Sponsorship",
    icon: "🏢",
    questions: [
      { q: "How can my business sponsor AANGCC?", a: "We offer five sponsorship tiers from $1,000 to $5,000. Benefits include jersey placement, social media exposure, employee wellness perks, and direct community impact. Visit our sponsorship page to learn more." },
      { q: "What is the Diamond sponsorship?", a: "Our Diamond tier ($5,000) is our most impactful package — including logo on the front of our jersey, premium social media promotions, employee cycling perks, speaking opportunities, and co-branded recognition at all events." },
      { q: "Can employees participate through corporate membership?", a: "Yes. Our Small Business ($599) and Corporate ($1,999) memberships give your employees access to structured wellness programming through cycling." },
    ],
  },
];

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Got Questions?</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Frequently Asked <span className="text-gradient-gold">Questions</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed mb-8">
          Everything you need to know about AANGCC — membership, rides, charity, group riding, and more.
        </motion.p>
        {/* Category jump links */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-wrap items-center justify-center gap-2 max-w-[800px] mx-auto">
          {FAQ_CATEGORIES.map((cat) => (
            <a key={cat.category} href={`#${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 border border-white/20 text-white/70 text-[11px] font-medium hover:bg-white/25 hover:text-white transition-all duration-200"
            >
              <span>{cat.icon}</span>
              <span>{cat.category}</span>
            </a>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function FAQAccordion() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="relative py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-10">
          {FAQ_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.category}
              id={cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-heading text-white text-[24px] font-semibold">{cat.category}</h2>
                <div className="flex-1 h-[1px] bg-white/20 ml-2" />
                <span className="text-white/40 text-[12px]">{cat.questions.length} questions</span>
              </div>

              {/* Questions */}
              <div className="flex flex-col gap-3">
                {cat.questions.map((item, qi) => {
                  const key = `${ci}-${qi}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={key} className={`bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 ${isOpen ? "shadow-lg" : ""}`}>
                      <button onClick={() => toggleItem(key)} className="w-full flex items-center justify-between p-6 text-left group">
                        <span className="font-heading text-[#111111] text-[16px] font-semibold leading-snug pr-4 group-hover:text-[#14CFC4] transition-colors duration-200">
                          {item.q}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? "bg-[#FFD84D] rotate-180" : "bg-gray-100"}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 5L7 10L12 5" stroke={isOpen ? "#111111" : "#888888"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                              <p className="text-[#555] text-[14px] leading-relaxed">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-16 bg-white rounded-2xl p-10 text-center shadow-xl">
          <div className="text-3xl mb-4">💬</div>
          <h3 className="font-heading text-[#111111] text-[28px] font-semibold mb-3">Still have questions?</h3>
          <p className="text-[#666] text-[14px] mb-8 max-w-[400px] mx-auto leading-relaxed">
            We're a real team and we respond personally. Don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-300">Contact Us</Link>
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-[#14CFC4] text-[#14CFC4] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300">Join The Club</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <>
      <PageHero />
      <FAQAccordion />
    </>
  );
}
