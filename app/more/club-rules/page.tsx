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

const RULES = [
  {
    number: "01",
    title: "Membership Eligibility",
    rules: [
      "Membership is open to adults 18 years of age and older.",
      "We do not accept membership submitted by a minor (under 18 years of age).",
      "All membership dues are electronically debited.",
      "Membership is based on your anniversary date, not a calendar year.",
    ],
  },
  {
    number: "02",
    title: "Approved Bikes",
    rules: [
      "Standard road bikes and gravel bikes are approved for all group rides.",
      "Mountain bikes are NOT permitted on group rides.",
      "Fat tire bikes are NOT permitted on group rides.",
      "Triathlon (TT) bikes are NOT permitted on group rides.",
      "Tandem bikes are NOT permitted on group rides.",
      "Recumbent bikes are NOT permitted on group rides.",
      "Use of aero bars is NOT permitted during group rides.",
    ],
  },
  {
    number: "03",
    title: "Safety Requirements",
    rules: [
      "A properly fitted helmet must be worn at all times during group rides.",
      "Riders must obey all traffic laws, signals, and signs.",
      "No headsets or earbuds are permitted. Bone-conducting headphones are acceptable.",
      "Riders must be able to take on nutrition and drink from a water bottle while riding.",
      "Riders must be able to point out debris and hazards to others while riding with one hand.",
      "All riders must be able to ride with good balance and be comfortable with others riding around them.",
    ],
  },
  {
    number: "04",
    title: "Group Ride Conduct",
    rules: [
      "Riders must follow the designated pace for their assigned group.",
      "Call out road hazards, potholes, gravel, and obstacles to alert riders behind you.",
      "Use hand signals for turns, stops, and slowing down.",
      "Hold your line — no sudden swerving or unpredictable movements.",
      "Announce when you are slowing or stopping.",
      "No riding more than two abreast unless the road is clear and safe.",
      "Riders are responsible for their own mechanical preparedness — bring a spare tube, CO2, and basic tools.",
    ],
  },
  {
    number: "05",
    title: "Drop & No-Drop Policies",
    rules: [
      "Social Butterflies rides are NO DROP — no rider is left behind.",
      "Roadsters rides REGROUP at regular intervals to allow the group to reassemble.",
      "Cyclepaths rides are DROP rides — faster riders will not wait for slower riders.",
      "All riders must understand and accept the policy for their chosen group before joining.",
    ],
  },
  {
    number: "06",
    title: "Fundraising Requirements",
    rules: [
      "AANGCC members participating in the BP MS 150 must meet the minimum fundraising requirement set by the National MS Society.",
      "Members are encouraged to actively fundraise for all charity events.",
      "AANGCC provides fundraising support, tips, and resources for all team members.",
      "100% of charitable donations go directly to the designated charity — AANGCC retains nothing.",
    ],
  },
  {
    number: "07",
    title: "Conduct & Community Standards",
    rules: [
      "All members are expected to treat fellow riders, volunteers, and the public with respect.",
      "Harassment, discrimination, or bullying of any kind will not be tolerated.",
      "AANGCC is a diverse and inclusive community — all backgrounds, orientations, and identities are welcome.",
      "Members who violate community standards may be removed from the club at the discretion of club leadership.",
      "Disputes between members should be resolved respectfully and privately before escalating to leadership.",
    ],
  },
  {
    number: "08",
    title: "Liability",
    rules: [
      "All members must sign and agree to the AANGCC Waiver of Liability before participating in any group ride or event.",
      "Cycling involves inherent risks. Members participate at their own risk.",
      "AANGCC, its officers, and its members are not responsible for accidents, injuries, or losses sustained during rides or events.",
      "Members are encouraged to carry personal cycling insurance and/or health insurance.",
    ],
  },
];

function PageHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Club Governance</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 88px)" }}>
          Club <span className="text-gradient-gold">Rules</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] max-w-[540px] mx-auto leading-relaxed">
          Our rules exist to keep every rider safe, every ride enjoyable, and our community strong. Please read them carefully before joining.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function RulesContent() {
  return (
    <section className="relative py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-6">
          {RULES.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-[#14CFC4] text-[32px] font-bold leading-none opacity-40">{section.number}</span>
                  <h2 className="font-heading text-[#111111] text-[22px] font-semibold">{section.title}</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {section.rules.map((rule, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="flex-shrink-0 mt-[3px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="#14CFC4" fillOpacity="0.15" />
                        <path d="M5 8L7 10L11 6" stroke="#0FAFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#444] text-[14px] leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom links */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-10 bg-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="font-heading text-[#111111] text-[24px] font-semibold mb-3">Ready to ride by the rules?</h3>
          <p className="text-[#666] text-[14px] mb-6 max-w-[400px] mx-auto">Review our other governance documents and sign your waiver before your first ride.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/more/code-of-conduct" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Code of Conduct</Link>
            <Link href="/more/bylaws" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Club Bylaws</Link>
            <Link href="/more/waiver" className="px-5 py-2.5 rounded-xl border border-[#FFD84D] text-[#b8960a] text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Waiver of Liability</Link>
            <Link href="/membership/why-join" className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Join The Club</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ClubRulesPage() {
  return (
    <>
      <PageHero />
      <RulesContent />
    </>
  );
}
