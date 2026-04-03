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
    category: "Rides",
    icon: "🚴",
    questions: [
      { q: "What type of bike do I need?", a: "A standard road bike or gravel bike is required for group rides. We do not allow mountain bikes, fat tire bikes, triathlon (TT) bikes, tandems, or recumbent bikes. A helmet is always required." },
      { q: "What are your ride groups?", a: "We have three groups: Social Butterflies (10–15 miles, 10–11.5 mph, no drop), Roadsters (20–30 miles, 11.5–13.5 mph, regroup ride), and Cyclepaths (30+ miles, 13.5–15 mph, drop ride)." },
      { q: "Where do your rides start?", a: "Most Saturday rides start at Govalle Neighborhood Park, 5200 Bolm Road, Austin, TX 78721. Special event rides may have different starting points — always check the ride calendar." },
      { q: "What is a 'no drop' ride?", a: "A no drop ride means no rider gets left behind. If someone can't keep up or has a mechanical issue, the group waits or accompanies them back to the start." },
      { q: "What happens after the ride?", a: "Most Saturday rides end with a post-ride social at Monkey Nest Coffee, 5353 Burnet Road, Austin, TX 78757. Special event rides include on-site celebrations or local venue gatherings." },
    ],
  },
  {
    category: "Charity & Fundraising",
    icon: "❤️",
    questions: [
      { q: "Why does AANGCC ride for charity?", a: "Our mission goes beyond cycling. We ride to support the National Multiple Sclerosis Society, the Alzheimer's Association, and the Austin community. Every mile we ride, every dollar we raise moves us closer to a world free from these diseases." },
      { q: "Where does my donation go?", a: "100% of charitable donations made through AANGCC's fundraising pages go directly to the National MS Society or the Alzheimer's Association. AANGCC does not retain any portion of charitable donations." },
      { q: "Do I have to fundraise to ride?", a: "Charity events like the MS 150 require a minimum fundraising amount set by the National MS Society. AANGCC provides team support, tips, and a community of donors to help every rider meet their goals." },
      { q: "What events does AANGCC participate in?", a: "We participate in three major annual events: the BP MS 150 (Houston to Austin), the Ride to End ALZ (Dripping Springs), and the Rosedale Ride (Austin). All events are listed on our ride calendar." },
    ],
  },
  {
    category: "Sponsorship",
    icon: "🏢",
    questions: [
      { q: "How can my business sponsor AANGCC?", a: "We offer five sponsorship tiers from $1,000 to $5,000. Benefits include jersey placement, social media exposure, employee wellness perks, and direct community impact. Visit our sponsorship page to learn more." },
      { q: "What is the Diamond sponsorship?", a: "Our Diamond tier ($5,000) is our most impactful package — including logo on the front of our jersey, premium social media promotions, employee cycling perks, speaking opportunities, and co-branded recognition at all events." },
      { q: "Can employees participate through corporate membership?", a: "Yes. Our Small Business ($599) and Corporate ($1,999) memberships give your employees access to structured wellness programming through cycling. It's a powerful employee health benefit." },
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
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed">
          Everything you need to know about AANGCC — membership, rides, charity, and more.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function FAQAccordion() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-10">
          {FAQ_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-heading text-white text-[24px] font-semibold">{cat.category}</h2>
                <div className="flex-1 h-[1px] bg-white/20 ml-2" />
              </div>

              {/* Questions */}
              <div className="flex flex-col gap-3">
                {cat.questions.map((item, qi) => {
                  const key = `${ci}-${qi}`;
                  const isOpen = openItems[key];
                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 ${isOpen ? "shadow-lg" : ""}`}
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-6 text-left group"
                      >
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 bg-white rounded-2xl p-10 text-center shadow-xl"
        >
          <div className="text-3xl mb-4">💬</div>
          <h3 className="font-heading text-[#111111] text-[28px] font-semibold mb-3">Still have questions?</h3>
          <p className="text-[#666] text-[14px] mb-8 max-w-[400px] mx-auto leading-relaxed">
            We're a real team and we respond personally. Don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-300">
              Contact Us
            </Link>
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-[#14CFC4] text-[#14CFC4] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300">
              Join The Club
            </Link>
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
