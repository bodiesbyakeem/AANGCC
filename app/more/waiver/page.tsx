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
    title: "Acknowledgment of Inherent and Extraordinary Risks",
    content: `I acknowledge that cycling and participation in activities organized, sponsored, or facilitated by All Ass No Gas Cycling Club ("AANGCC") involve significant, inherent, and unpredictable risks, including but not limited to:

• Collisions with vehicles, cyclists, pedestrians, animals, or stationary objects
• Road hazards including debris, potholes, uneven surfaces, and construction zones
• Mechanical failure of equipment, whether personal or third-party
• Weather-related hazards including heat, wind, rain, and reduced visibility
• Acts or omissions of other participants, motorists, or third parties
• Physical exertion risks including dehydration, cardiac events, and overexertion

I understand these risks may result in serious bodily injury, permanent disability, paralysis, or death, as well as property damage or loss, and that such risks cannot be eliminated without fundamentally altering the nature of the activity.`,
  },
  {
    number: "02",
    title: "Voluntary Assumption of All Risks",
    content: `I knowingly, voluntarily, and expressly assume all risks, both known and unknown, foreseeable and unforeseeable, arising out of or related to my participation in any AANGCC activity.

I certify that:

• I am physically and medically capable of participating
• I have not been advised otherwise by a qualified medical professional
• I accept full responsibility for my participation`,
  },
  {
    number: "03",
    title: "Broad Release of Liability (Including Negligence)",
    content: `To the maximum extent permitted by Texas law, I hereby release, waive, discharge, and covenant not to sue AANGCC and all affiliated parties, including but not limited to:

• Officers, directors, employees, contractors, and volunteers
• Ride leaders, organizers, and coordinators
• Other participants and members
• Sponsors, partners, advertisers, and affiliated businesses
• Property owners, municipalities, and venues

(collectively, the "Released Parties")

from any and all claims, demands, damages, losses, liabilities, or causes of action, including those arising from ordinary negligence, relating to:

• Personal injury or death
• Property damage or loss
• Any incident occurring before, during, or after participation

This release explicitly includes claims based on the NEGLIGENCE of any Released Party, to the fullest extent allowed by law.`,
  },
  {
    number: "04",
    title: "Express Indemnification and Duty to Defend",
    content: `I agree to defend, indemnify, and hold harmless the Released Parties from and against any and all claims, liabilities, damages, judgments, costs, and expenses (including attorney's fees) arising from:

• My participation in AANGCC activities
• My negligent, reckless, or intentional acts or omissions
• My violation of traffic laws, safety rules, or club policies
• Any claim brought by third parties arising from my conduct

This obligation includes a duty to defend the Released Parties against such claims at my own expense.`,
  },
  {
    number: "05",
    title: "Third-Party Beneficiary Protection",
    content: `I expressly agree that all Released Parties are intended third-party beneficiaries of this Agreement and are entitled to enforce its terms as if they were signatories.`,
  },
  {
    number: "06",
    title: "Equipment, Conduct, and Safety Compliance",
    content: `I represent and warrant that:

• My bicycle is in safe and proper working condition
• I will wear a properly fitted helmet at all times during all AANGCC group rides and events
• I will comply with all applicable traffic laws and AANGCC safety protocols
• I understand that headphones and earbuds are prohibited except bone-conducting devices

I accept full responsibility for my equipment and conduct during all AANGCC activities.`,
  },
  {
    number: "07",
    title: "Medical Consent and Liability Waiver",
    content: `In the event of injury or incapacity:

• I authorize AANGCC representatives to seek emergency medical care on my behalf
• I consent to treatment deemed necessary by licensed medical professionals
• I agree to assume full financial responsibility for any medical care provided

I release all Released Parties from any liability related to medical response decisions made on my behalf during an AANGCC activity.`,
  },
  {
    number: "08",
    title: "Arbitration Agreement and Class Action Waiver",
    content: `Any dispute arising from this Agreement or my participation in AANGCC activities shall be resolved through:

• Binding individual arbitration only
• Governed by the Federal Arbitration Act (FAA)
• Conducted in Travis County, Texas

I expressly waive:

• The right to a jury trial
• The right to participate in class actions or class arbitration`,
  },
  {
    number: "09",
    title: "Governing Law and Venue",
    content: `This Agreement shall be governed by the laws of the State of Texas.

Any claims not subject to arbitration shall be resolved exclusively in the courts of Travis County, Texas.`,
  },
  {
    number: "10",
    title: "Photography, Media, and Likeness Release",
    content: `I grant AANGCC and its affiliates the irrevocable right to:

• Photograph, record, and use my likeness during club activities
• Use such media for marketing, promotional, and commercial purposes
• Do so without compensation or further consent

I understand that I may opt out of being photographed or recorded by notifying a club officer before a ride or event begins.`,
  },
  {
    number: "11",
    title: "Severability",
    content: `If any provision of this Agreement is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect and shall be construed to give maximum effect to the original intent of the parties.`,
  },
  {
    number: "12",
    title: "Survival of Agreement",
    content: `This Agreement shall survive indefinitely and apply to all current and future participation in AANGCC activities, regardless of any change in membership status.`,
  },
  {
    number: "13",
    title: "Acknowledgment of Understanding",
    content: `I acknowledge that:

• I have read this Agreement in full
• I understand its legal significance
• I am giving up substantial rights, including the right to sue
• I am signing this Agreement freely and voluntarily without coercion

By participating in any AANGCC activity, I confirm that I have read this Waiver of Liability, Assumption of Risk, Release, and Indemnification Agreement (Version 3.0) in its entirety, that I understand its terms and legal effect, and that I voluntarily agree to be bound by its provisions.`,
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
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] max-w-[540px] mx-auto leading-relaxed mb-4">
          All AANGCC members and guests must read and agree to this Waiver of Liability before participating in any club ride or event.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 mb-3">
          <span className="text-white/60 text-[11px] font-medium">Version 3.0 — Enhanced Protection</span>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD84D]/20 border border-[#FFD84D]/40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-[#FFD84D] text-[12px] font-medium">This is a legally binding document. Please read carefully.</span>
          </div>
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
          <p className="text-[#333] text-[15px] font-semibold mb-2">ALL ASS NO GAS CYCLING CLUB</p>
          <p className="text-[#555] text-[13px] font-medium mb-3 text-[#14CFC4]">Comprehensive Waiver of Liability, Assumption of Risk, Release, and Indemnification Agreement · Version 3.0</p>
          <p className="text-[#555] text-[14px] leading-relaxed">
            This Waiver of Liability, Assumption of Risk, Release, and Indemnification Agreement ("Agreement") is entered into by any individual who participates in activities organized, sponsored, or facilitated by All Ass No Gas Cycling Club ("AANGCC"), a cycling club based in Austin, Texas. By participating in any AANGCC activity, you agree to be bound by the terms of this Agreement.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {WAIVER_SECTIONS.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-[#14CFC4] text-[28px] font-bold leading-none opacity-40">{section.number}</span>
                  <h2 className="font-heading text-[#111111] text-[20px] font-semibold leading-tight">{section.title}</h2>
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
                By becoming a member of AANGCC or participating in any club activity as a guest, you confirm that you have read this Waiver of Liability, Assumption of Risk, Release, and Indemnification Agreement (Version 3.0) in its entirety, that you understand its terms and legal effect, and that you voluntarily agree to be bound by its provisions without coercion.
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
            <Link href="/waiver" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Guest Waiver</Link>
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
