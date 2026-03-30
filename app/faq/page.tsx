"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  {
    category: "Membership",
    color: "teal",
    questions: [
      {
        q: "How do I join All Ass No Gas Cycling Club?",
        a: "Joining AANGCC is simple. Visit our Membership page, review the available tiers, and complete the sign-up process. Once your membership is confirmed, you'll receive access to all club resources, ride schedules, and our members-only community.",
      },
      {
        q: "Is there a minimum experience level required to join?",
        a: "Absolutely not. AANGCC welcomes cyclists of all experience levels — from complete beginners to seasoned racers. We have ride groups structured for every pace and distance so everyone can participate comfortably.",
      },
      {
        q: "What is included in my membership?",
        a: "Membership includes access to weekly group rides, club events, fundraising participation with the National MS Society, members-only content, and depending on your tier, club kits, priority event registration, and more.",
      },
      {
        q: "Can I upgrade my membership tier after joining?",
        a: "Yes. You can upgrade your membership at any time by contacting us directly. We'll walk you through the process and ensure a smooth transition to your new tier.",
      },
    ],
  },
  {
    category: "Rides & Events",
    color: "gold",
    questions: [
      {
        q: "What ride levels does AANGCC offer?",
        a: "We offer three ride levels — A (Advanced: 18–22+ mph), B (Intermediate: 14–18 mph), and C (Beginner: 10–14 mph). Each group is led by experienced riders and designed to challenge you at your current fitness level.",
      },
      {
        q: "Where do group rides typically start?",
        a: "Most AANGCC group rides depart from designated meeting points across Austin. Specific start locations and times are posted on the Ride Calendar. Members receive notifications directly via the club newsletter.",
      },
      {
        q: "Do I need special equipment to join a ride?",
        a: "You'll need a roadworthy bicycle, a properly fitted helmet, and appropriate cycling attire. We also strongly recommend a spare tube, CO2 inflator or pump, and water. Additional gear guidance is available in the Ride Levels section.",
      },
      {
        q: "What is the MS 150 and how do I join the AANGCC team?",
        a: "The BP MS 150 is a two-day, 150-mile charity ride from Houston to Austin benefiting the National Multiple Sclerosis Society. It is our flagship annual event. To join the AANGCC MS 150 team, visit the MS 150 Team page and register through our team link.",
      },
    ],
  },
  {
    category: "Fundraising & Mission",
    color: "teal",
    questions: [
      {
        q: "Which organizations does AANGCC support?",
        a: "Our primary charitable partner is the National Multiple Sclerosis Society. We also support the Alzheimer's Association through our Ride to End ALZ team and participate in local Austin community events like the Rosedale Ride.",
      },
      {
        q: "How can I donate to AANGCC's fundraising efforts?",
        a: "You can donate directly through our Donate page, or contribute through our individual rider fundraising pages for events like the MS 150. Every dollar goes directly to the cause.",
      },
      {
        q: "Can businesses sponsor AANGCC?",
        a: "Yes — we have a Corporate Sponsorship program that offers visibility across our events, social media, and club communications. Visit our Corporate Sponsorship page to learn about available packages.",
      },
    ],
  },
  {
    category: "Club Rules & Conduct",
    color: "gold",
    questions: [
      {
        q: "Where can I find the official club rules and bylaws?",
        a: "All official club documentation — including Club Rules, Code of Conduct, Club Bylaws, and Waiver of Liability — are available in the More section of the navigation menu.",
      },
      {
        q: "What is the club's policy on safety during rides?",
        a: "Safety is our top priority. All riders must wear helmets at all times, follow traffic laws, ride predictably within the group, and communicate hazards clearly. Detailed safety guidelines are outlined in our Club Rules document.",
      },
      {
        q: "Is a waiver required to participate in club rides?",
        a: "Yes. All members and participants in AANGCC rides are required to complete a Waiver of Liability before participating. This can be accessed and completed through the Waiver page in our More section.",
      },
    ],
  },
];

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({
  question,
  answer,
  color,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`
        rounded-2xl border overflow-hidden transition-colors duration-300
        ${isOpen
          ? color === "gold"
            ? "border-[#FFD84D]/30 bg-[#FFD84D]/[0.03]"
            : "border-[#2A9D9E]/30 bg-[#2A9D9E]/[0.03]"
          : "border-white/[0.07] bg-[#141414] hover:border-white/[0.12]"
        }
      `}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
      >
        <span className="font-heading text-white text-[18px] font-semibold leading-snug">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`
            flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center
            transition-colors duration-300
            ${isOpen
              ? color === "gold"
                ? "border-[#FFD84D]/40 bg-[#FFD84D]/10"
                : "border-[#2A9D9E]/40 bg-[#2A9D9E]/10"
              : "border-white/[0.1] bg-transparent"
            }
          `}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1V11M1 6H11"
              stroke={isOpen ? (color === "gold" ? "#FFD84D" : "#2A9D9E") : "white"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-6">
              <div
                className={`h-[1px] w-full mb-5 ${
                  color === "gold"
                    ? "bg-gradient-to-r from-[#FFD84D]/20 to-transparent"
                    : "bg-gradient-to-r from-[#2A9D9E]/20 to-transparent"
                }`}
              />
              <p className="text-white/50 text-[14px] leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-black pt-[72px]">
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
            Got Questions?
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
          Frequently Asked{" "}
          <span className="text-gradient-teal">Questions</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed"
        >
          Everything you need to know about AANGCC — membership, rides,
          fundraising, and more.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── FAQ Sections ─────────────────────────────────────────────────────────────

function FAQSections() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-16">
          {FAQ_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`h-[2px] w-8 ${
                    cat.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"
                  }`}
                />
                <h2
                  className={`text-[12px] font-semibold tracking-[0.2em] uppercase ${
                    cat.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"
                  }`}
                >
                  {cat.category}
                </h2>
              </div>

              {/* Accordion items */}
              <div className="flex flex-col gap-3">
                {cat.questions.map((item, qi) => {
                  const key = `${ci}-${qi}`;
                  return (
                    <AccordionItem
                      key={key}
                      question={item.q}
                      answer={item.a}
                      color={cat.color}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Still Have Questions CTA ─────────────────────────────────────────────────

function StillHaveQuestions() {
  return (
    <section className="relative py-24 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#FFD84D]/[0.05] blur-[100px] rounded-full" />
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
          Still have{" "}
          <span className="text-gradient-gold">questions?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white/40 text-[14px] mb-8 max-w-[400px] mx-auto"
        >
          Can't find what you're looking for? Reach out directly and a
          member of our team will get back to you quickly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
          <Link href="/membership/why-join" className="btn-outline">
            Join The Club
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function FAQPage() {
  return (
    <>
      <PageHero />
      <FAQSections />
      <StillHaveQuestions />
    </>
  );
}
