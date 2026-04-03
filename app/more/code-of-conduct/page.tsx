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

const SECTIONS = [
  {
    number: "01",
    title: "Our Commitment",
    content: `All Ass No Gas Cycling Club is committed to providing a safe, welcoming, and inclusive environment for all members, regardless of race, ethnicity, gender, gender identity, sexual orientation, religion, national origin, disability, age, or socioeconomic status.

We believe that cycling is for everyone, and that our community is stronger when it reflects the full diversity of Austin and beyond. Every member of AANGCC is expected to uphold this commitment in everything they do — on the bike and off it.`,
  },
  {
    number: "02",
    title: "Expected Behavior",
    content: `All AANGCC members are expected to:

• Treat all fellow members, volunteers, event staff, and the public with dignity and respect.
• Be welcoming to new riders regardless of their experience level or background.
• Communicate constructively and professionally — both in person and online.
• Support and encourage fellow riders, especially those who are struggling.
• Follow all club rules, ride policies, and event guidelines.
• Arrive prepared for rides — with proper gear, nutrition, and mechanical readiness.
• Represent AANGCC with pride and professionalism at all events.`,
  },
  {
    number: "03",
    title: "Unacceptable Behavior",
    content: `The following behaviors are strictly prohibited within the AANGCC community:

• Harassment, intimidation, or bullying of any kind — including verbal, physical, or online.
• Discrimination based on race, gender, sexual orientation, religion, nationality, disability, or any other protected characteristic.
• Use of derogatory, demeaning, or offensive language toward any individual or group.
• Deliberate exclusion or marginalization of members from rides, events, or communications.
• Reckless riding that endangers fellow cyclists, pedestrians, or motorists.
• Misrepresentation of the club or its mission in any public forum.
• Theft, vandalism, or damage to any property at club events or venues.`,
  },
  {
    number: "04",
    title: "Online & Social Media Conduct",
    content: `AANGCC members are ambassadors of the club in all online spaces — including social media, group chats, forums, and comment sections. Members are expected to:

• Represent the club with professionalism and positivity online.
• Refrain from posting content that could harm the reputation of AANGCC or fellow members.
• Avoid engaging in online arguments, hate speech, or inflammatory behavior.
• Respect the privacy of other members — do not share personal information without consent.
• Report any online harassment or harmful content to club leadership immediately.`,
  },
  {
    number: "05",
    title: "Reporting & Enforcement",
    content: `If you experience or witness behavior that violates this Code of Conduct, we encourage you to report it promptly through the following steps:

1. If safe to do so, address the behavior directly with the individual involved.
2. If you are uncomfortable doing so, or the behavior continues, report it to a club officer or leadership member.
3. All reports will be treated confidentially and investigated promptly and fairly.

Violations of this Code of Conduct may result in:
• A formal warning
• Temporary suspension from rides or events
• Permanent removal from AANGCC membership

Club leadership reserves the right to take any action deemed appropriate to protect the safety and integrity of the community.`,
  },
  {
    number: "06",
    title: "Diversity & Inclusion Statement",
    content: `AANGCC stands firmly against racism, intolerance, bigotry, and all forms of discrimination. We are committed to building a community where every person — regardless of their background, identity, or circumstances — feels genuinely welcomed, valued, and included.

We recognize that meaningful inclusion requires ongoing effort, not just good intentions. As a club, we commit to:

• Actively recruiting and welcoming riders from underrepresented communities.
• Listening to and learning from the experiences of our diverse members.
• Challenging bias and discrimination when we see it — even when it is uncomfortable.
• Creating events, programs, and communications that are accessible and welcoming to all.

This is not just a policy. It is a reflection of who we are and who we choose to be.`,
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
          Code of <span className="text-gradient-gold">Conduct</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] max-w-[540px] mx-auto leading-relaxed">
          AANGCC is built on respect, inclusion, and accountability. These standards apply to every member — on every ride, at every event, and in every interaction.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function ConductContent() {
  return (
    <section className="relative py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-6">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-[#14CFC4] text-[32px] font-bold leading-none opacity-40">{section.number}</span>
                  <h2 className="font-heading text-[#111111] text-[22px] font-semibold">{section.title}</h2>
                </div>
                <div className="text-[#555] text-[14px] leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom nav */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-10 bg-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="font-heading text-[#111111] text-[24px] font-semibold mb-3">Questions or concerns?</h3>
          <p className="text-[#666] text-[14px] mb-6 max-w-[400px] mx-auto">If you have questions about our Code of Conduct or need to report an incident, please reach out to us directly.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Contact Us</Link>
            <Link href="/more/club-rules" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Club Rules</Link>
            <Link href="/more/bylaws" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Club Bylaws</Link>
            <Link href="/more/waiver" className="px-5 py-2.5 rounded-xl border border-[#FFD84D] text-[#b8960a] text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Waiver of Liability</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CodeOfConductPage() {
  return (
    <>
      <PageHero />
      <ConductContent />
    </>
  );
}
