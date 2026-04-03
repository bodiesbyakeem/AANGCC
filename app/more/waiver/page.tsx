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

const WAIVER_SECTIONS = [
  {
    number: "01",
    title: "Acknowledgment of Risk",
    content: `I acknowledge that cycling, including participating in group rides and charity events organized by All Ass No Gas Cycling Club ("AANGCC"), involves inherent risks and dangers, including but not limited to:

• Collision with other cyclists, vehicles, pedestrians, or fixed objects
• Falls and crashes due to road conditions, weather, mechanical failure, or rider error
• Physical injury including fractures, sprains, abrasions, concussions, and other serious bodily harm
• Death or permanent disability
• Property damage or loss
• Exposure to traffic, environmental hazards, and unpredictable road conditions

I understand and acknowledge that these risks exist even when all safety precautions are followed, and that no amount of care or caution can eliminate them entirely.`,
  },
  {
    number: "02",
    title: "Assumption of Risk",
    content: `By participating in any AANGCC group ride, event, training ride, or activity, I voluntarily assume all risks associated with cycling and participation in club activities, whether those risks are known or unknown, foreseen or unforeseen.

I understand that AANGCC, its officers, directors, volunteers, sponsors, and members have no obligation to warn me of any particular risk beyond what is communicated through club rules and ride briefings.

I confirm that I am physically fit and medically able to participate in cycling activities and that I have consulted with a physician if I have any health conditions that may affect my ability to safely participate.`,
  },
  {
    number: "03",
    title: "Release of Liability",
    content: `In consideration of being permitted to participate in AANGCC activities, I hereby release, waive, discharge, and hold harmless AANGCC, its officers, directors, employees, volunteers, agents, sponsors, and members (collectively, "Released Parties") from any and all claims, demands, causes of action, damages, losses, or expenses — including attorney's fees — arising out of or in connection with my participation in any AANGCC activity.

This release applies to claims arising from the negligence of any Released Party, except where such negligence constitutes gross negligence or willful misconduct.

I understand that this release is intended to be as broad and inclusive as permitted by the laws of the State of Texas, and that if any portion is held invalid, the remainder shall continue in full force and effect.`,
  },
  {
    number: "04",
    title: "Indemnification",
    content: `I agree to indemnify and hold harmless all Released Parties from any claims, damages, or losses — including attorney's fees — arising out of or related to:

• My participation in any AANGCC activity
• My violation of any traffic law, club rule, or safety requirement
• My negligent or intentional conduct during club activities
• Any claim brought by a third party arising from my actions during AANGCC activities

This indemnification obligation shall survive the termination of my AANGCC membership.`,
  },
  {
    number: "05",
    title: "Equipment and Safety",
    content: `I represent and warrant that:

• My bicycle is in safe mechanical condition and appropriate for the type of ride I am participating in.
• I will wear a properly fitted cycling helmet during all AANGCC group rides and events.
• I will comply with all applicable traffic laws and club safety rules.
• I will not use headsets, earbuds, or any device that impairs my ability to hear traffic or communicate with other riders, except bone-conducting headphones.
• I understand and will follow the drop/no-drop policy of my designated ride group.
• I am solely responsible for ensuring I have adequate nutrition, hydration, and equipment for each ride.`,
  },
  {
    number: "06",
    title: "Medical Authorization",
    content: `In the event that I am injured or incapacitated during an AANGCC activity and am unable to make decisions on my own behalf, I authorize AANGCC representatives and emergency personnel to:

• Contact emergency medical services on my behalf
• Provide my emergency contact information to medical personnel
• Authorize emergency medical treatment as deemed necessary by medical professionals

I understand that AANGCC will make reasonable efforts to contact my emergency contact in the event of a medical emergency.

I agree to provide AANGCC with current emergency contact information and to notify the club of any significant changes to my health status that may affect my ability to safely participate.`,
  },
  {
    number: "07",
    title: "Photography and Media",
    content: `I grant AANGCC and its authorized representatives the right to photograph and record me during club activities, and to use such photographs, videos, and recordings for club promotional purposes — including social media, website content, newsletters, and event materials — without compensation or further consent.

I understand that I may opt out of being photographed or recorded by notifying a club officer before a ride or event begins.`,
  },
  {
    number: "08",
    title: "Governing Law",
    content: `This Waiver of Liability shall be governed by and construed in accordance with the laws of the State of Texas. Any disputes arising under this agreement shall be resolved exclusively in the courts of Travis County, Texas.

By participating in any AANGCC activity, I confirm that I have read this Waiver of Liability in its entirety, that I understand its terms and legal effect, and that I agree to be bound by its provisions voluntarily and without coercion.

This waiver applies to all current and future AANGCC activities for the duration of my membership.`,
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
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Legal</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 88px)" }}>
          Waiver of <span className="text-gradient-gold">Liability</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] max-w-[540px] mx-auto leading-relaxed">
          All AANGCC members must read and agree to this Waiver of Liability before participating in any club ride or event.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD84D]/20 border border-[#FFD84D]/40">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span className="text-[#FFD84D] text-[12px] font-medium">This is a legally binding document. Please read carefully.</span>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function WaiverContent() {
  return (
    <section className="relative py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* Intro card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-7 shadow-lg mb-8 border-l-4 border-[#FFD84D]">
          <p className="text-[#555] text-[14px] leading-relaxed">
            This Waiver of Liability, Assumption of Risk, and Indemnification Agreement ("Waiver") is entered into by any individual who participates in activities organized by All Ass No Gas Cycling Club ("AANGCC"), a cycling club based in Austin, Texas. By participating in any AANGCC activity, you agree to be bound by the terms of this Waiver.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {WAIVER_SECTIONS.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-[#14CFC4] text-[28px] font-bold leading-none opacity-40">{section.number}</span>
                  <h2 className="font-heading text-[#111111] text-[22px] font-semibold">{section.title}</h2>
                </div>
                <div className="text-[#555] text-[14px] leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agreement acknowledgment */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-[#14CFC4]/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#14CFC4]/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <h3 className="font-heading text-[#111111] text-[20px] font-semibold mb-2">Agreement</h3>
              <p className="text-[#555] text-[14px] leading-relaxed">
                By becoming a member of AANGCC and participating in any club activity, you confirm that you have read this Waiver of Liability in its entirety, that you understand its terms and legal effect, and that you voluntarily agree to be bound by its provisions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom nav */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-6 bg-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="font-heading text-[#111111] text-[24px] font-semibold mb-3">Ready to ride?</h3>
          <p className="text-[#666] text-[14px] mb-6 max-w-[400px] mx-auto">Once you've reviewed all club documents, join AANGCC and start riding with purpose.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/more/club-rules" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Club Rules</Link>
            <Link href="/more/code-of-conduct" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Code of Conduct</Link>
            <Link href="/more/bylaws" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Club Bylaws</Link>
            <Link href="/membership/why-join" className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Join The Club</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function WaiverPage() {
  return (
    <>
      <PageHero />
      <WaiverContent />
    </>
  );
}
