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

// ─── Rules Data ───────────────────────────────────────────────────────────────

const RULE_SECTIONS = [
  {
    number: "01",
    title: "Safety First — Always",
    color: "teal",
    rules: [
      "Helmets are mandatory for all AANGCC rides and events — no exceptions, no excuses.",
      "All riders must obey all applicable traffic laws, including traffic signals, stop signs, and lane markings.",
      "Riders must remain visible and predictable at all times. No sudden movements, swerves, or stops without warning.",
      "All riders must call out road hazards (potholes, gravel, debris) and traffic warnings (car back, stopping, slowing) clearly and loudly.",
      "Front and rear lights are required for any rides occurring at dawn, dusk, or nighttime.",
      "Riders are responsible for ensuring their bicycle is in safe, roadworthy condition before every ride.",
    ],
  },
  {
    number: "02",
    title: "Group Riding Conduct",
    color: "gold",
    rules: [
      "Maintain a safe and consistent distance from the rider in front of you. Overlapping wheels is a leading cause of group crashes.",
      "Ride no more than two abreast where road conditions and traffic safely permit. Single up immediately when necessary.",
      "Do not use headphones or earbuds during group rides. You must be able to hear verbal commands and traffic at all times.",
      "No rider gets left behind. If a mechanical issue or flat occurs, the group stops and waits unless otherwise agreed upon before the ride.",
      "Respect the designated ride leader and sweep rider. Their decisions on pace, routing, and safety are final during the ride.",
      "Drafting is permitted in pace lines but riders must communicate clearly when pulling off or slowing.",
    ],
  },
  {
    number: "03",
    title: "Membership & Participation",
    color: "teal",
    rules: [
      "All participants in AANGCC rides and events must be current, active members in good standing — or invited guests of a current member.",
      "All members and guests must complete and sign the AANGCC Waiver of Liability before participating in any club activity.",
      "Members are expected to represent AANGCC with professionalism, positivity, and respect toward fellow riders, other road users, and the public.",
      "Membership does not confer the right to lead official club rides without prior authorization from club leadership.",
      "Members who repeatedly violate club rules may be suspended or removed from the club at the discretion of club leadership.",
    ],
  },
  {
    number: "04",
    title: "Communication & Respect",
    color: "gold",
    rules: [
      "AANGCC is an inclusive community. Harassment, discrimination, or disrespectful behavior of any kind will not be tolerated.",
      "All disputes or concerns should be raised directly with club leadership — not aired publicly or on social media.",
      "Club communications (newsletter, group chats, social media) should remain positive, constructive, and on-topic.",
      "Members are encouraged to welcome and mentor newer riders. The spirit of AANGCC is one of community, not exclusion.",
      "Any member found engaging in behavior that brings the club into disrepute may face immediate suspension pending review.",
    ],
  },
  {
    number: "05",
    title: "Equipment Standards",
    color: "teal",
    rules: [
      "All bicycles used in AANGCC rides must be properly maintained and mechanically sound prior to each ride.",
      "Riders are responsible for carrying a spare tube, CO2 or pump, tire levers, and a basic multi-tool on all rides of 20+ miles.",
      "Adequate hydration must be carried at all times. Plan for at least one water bottle per 20 miles.",
      "Appropriate cycling attire is strongly encouraged. Loose clothing that may catch in drivetrain components is not permitted on group rides.",
      "Aerobars (triathlon bars) are not permitted during group rides due to reduced reaction time and braking capability.",
    ],
  },
  {
    number: "06",
    title: "Events & Fundraising",
    color: "gold",
    rules: [
      "Members participating in charity events under the AANGCC name are expected to meet minimum fundraising requirements set by the event organizer.",
      "AANGCC team registration for charity events is coordinated by club leadership. Members must register through official club channels.",
      "Any public fundraising conducted under the AANGCC name must be approved by club leadership in advance.",
      "Members are encouraged — but not required — to participate in all club-organized charity events.",
      "Funds raised through AANGCC activities are directed to our designated charitable partners as publicly stated.",
    ],
  },
];

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A9D9E]/[0.05] blur-[120px] pointer-events-none rounded-full" />

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
            Club Documentation
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
          Club{" "}
          <span className="text-gradient-teal">Rules</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          These rules exist to keep every rider safe, every ride
          enjoyable, and our community strong. All members are expected
          to know and follow them.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Rules Content ────────────────────────────────────────────────────────────

function RulesContent() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">

        {/* Effective date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 p-5 rounded-xl border border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.03] mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-[#2A9D9E] animate-pulse flex-shrink-0" />
          <p className="text-white/50 text-[13px]">
            <span className="text-[#2A9D9E] font-semibold">Effective:</span>{" "}
            These rules apply to all AANGCC members and participants
            effective upon membership activation. Rules are subject to
            update by club leadership with reasonable notice.
          </p>
        </motion.div>

        {/* Rule sections */}
        <div className="flex flex-col gap-10">
          {RULE_SECTIONS.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative rounded-2xl border overflow-hidden
                ${section.color === "gold"
                  ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"
                  : "border-white/[0.07] bg-[#141414]"
                }
              `}
            >
              <div
                className={`h-[2px] w-full ${
                  section.color === "gold"
                    ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                }`}
              />

              <div className="p-8">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className={`font-heading text-[36px] font-bold leading-none opacity-30 ${
                      section.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"
                    }`}
                  >
                    {section.number}
                  </span>
                  <h2 className="font-heading text-white text-[22px] font-semibold">
                    {section.title}
                  </h2>
                </div>

                {/* Rules list */}
                <ul className="flex flex-col gap-4">
                  {section.rules.map((rule, ri) => (
                    <li key={ri} className="flex items-start gap-4">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${
                          section.color === "gold" ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"
                        }`}
                      />
                      <p className="text-white/55 text-[14px] leading-relaxed">
                        {rule}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Related docs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-5">
            Related Club Documents
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "Code of Conduct", href: "/more/code-of-conduct" },
              { label: "Club Bylaws", href: "/more/bylaws" },
              { label: "Waiver of Liability", href: "/more/waiver" },
            ].map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  border border-white/[0.08] bg-white/[0.02]
                  text-white/50 text-[13px] hover:text-[#2A9D9E]
                  hover:border-[#2A9D9E]/30 transition-all duration-200
                "
              >
                <span className="w-1 h-1 rounded-full bg-[#2A9D9E] flex-shrink-0" />
                {doc.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function ClubRulesPage() {
  return (
    <>
      <PageHero />
      <RulesContent />
    </>
  );
}

