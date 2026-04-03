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

const BYLAWS = [
  {
    number: "I",
    title: "Name and Purpose",
    content: `Section 1 — Name
The name of this organization shall be All Ass No Gas Cycling Club, hereinafter referred to as "AANGCC" or "the Club."

Section 2 — Purpose
The purpose of AANGCC is to promote cycling as a means of physical fitness, community building, and charitable impact. The Club is committed to supporting the National Multiple Sclerosis Society, the Alzheimer's Association, and other charitable causes through organized rides, fundraising events, and community engagement.

Section 3 — Non-Discrimination
AANGCC shall not discriminate against any person on the basis of race, color, national origin, religion, sex, gender identity, sexual orientation, age, or disability.`,
  },
  {
    number: "II",
    title: "Membership",
    content: `Section 1 — Eligibility
Membership in AANGCC is open to any adult 18 years of age or older who agrees to abide by the Club's rules, bylaws, and code of conduct.

Section 2 — Membership Tiers
The Club shall offer the following membership tiers, with dues set by club leadership:
• Individual Membership — Single adult (18+)
• Family Membership — Up to 3 adults at the same address
• Small Business Membership — 1 to 14 employees
• Corporate Membership — 15 to 99 employees

Section 3 — Dues
Membership dues shall be determined by club leadership and reviewed annually. All dues are electronically debited and based on the member's anniversary date, not a calendar year.

Section 4 — Termination of Membership
Membership may be terminated for violation of club rules, code of conduct, or bylaws. Termination decisions shall be made by club leadership with reasonable notice to the member.`,
  },
  {
    number: "III",
    title: "Leadership and Officers",
    content: `Section 1 — Officers
The Club shall be led by the following officers:
• President — Overall leadership and vision of the club
• Vice President — Supports the President and leads in their absence
• Secretary — Maintains records, communications, and minutes
• Treasurer — Manages club finances and reporting
• Ride Captain(s) — Organizes and leads group rides

Section 2 — Election of Officers
Officers shall be selected by the founding leadership of the Club. Future officer transitions shall be handled through a vote of active members in good standing.

Section 3 — Terms
Officers shall serve terms of one year and may be re-elected or re-appointed without limit.

Section 4 — Vacancies
If an officer position becomes vacant, club leadership shall appoint a replacement to serve the remainder of the term.`,
  },
  {
    number: "IV",
    title: "Meetings",
    content: `Section 1 — Regular Meetings
AANGCC shall hold regular meetings as determined by club leadership. Members will be notified of meeting dates, times, and locations in advance.

Section 2 — Special Meetings
Special meetings may be called by the President or by a majority of officers when necessary.

Section 3 — Quorum
A quorum for conducting business shall consist of a majority of active club officers.

Section 4 — Meeting Format
Meetings may be held in person, virtually, or in a hybrid format at the discretion of club leadership.`,
  },
  {
    number: "V",
    title: "Finances",
    content: `Section 1 — Fiscal Year
The fiscal year of AANGCC shall run from January 1 through December 31.

Section 2 — Financial Management
The Treasurer shall maintain accurate financial records and provide regular reports to club leadership.

Section 3 — Charitable Donations
All charitable donations collected through AANGCC fundraising campaigns shall be transmitted in full to the designated charitable organization. AANGCC shall not retain any portion of charitable donations.

Section 4 — Club Funds
Membership dues and sponsorship revenue collected by the Club shall be used exclusively for club operations, events, equipment, and community programs.`,
  },
  {
    number: "VI",
    title: "Rides and Events",
    content: `Section 1 — Group Rides
AANGCC shall organize regular group rides open to all members in good standing. Ride schedules, routes, and policies shall be communicated through club channels.

Section 2 — Safety
All riders must comply with club safety requirements including wearing a helmet, obeying traffic laws, and riding an approved bicycle type.

Section 3 — Charity Events
AANGCC shall participate in at least one major annual charity cycling event in support of the National Multiple Sclerosis Society. The Club may also participate in additional charity events at the discretion of leadership.

Section 4 — Waivers
All members must sign the AANGCC Waiver of Liability before participating in any club ride or event.`,
  },
  {
    number: "VII",
    title: "Amendments",
    content: `Section 1 — Proposal of Amendments
Amendments to these bylaws may be proposed by any club officer or by a written petition signed by at least 10 active members.

Section 2 — Approval of Amendments
Amendments shall be approved by a majority vote of active club officers, with reasonable notice provided to the membership before any vote is taken.

Section 3 — Effective Date
Approved amendments shall take effect immediately upon adoption unless a future effective date is specified in the amendment.`,
  },
  {
    number: "VIII",
    title: "Dissolution",
    content: `In the event of dissolution of AANGCC, all remaining club assets — after payment of outstanding obligations — shall be distributed to one or more charitable organizations selected by club leadership, with preference given to the National Multiple Sclerosis Society and the Alzheimer's Association.

No assets of the Club shall be distributed to any individual member upon dissolution.`,
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
          Club <span className="text-gradient-gold">Bylaws</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] max-w-[540px] mx-auto leading-relaxed">
          The governing documents of All Ass No Gas Cycling Club — outlining our structure, membership, leadership, and mission.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function BylawsContent() {
  return (
    <section className="relative py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* Article navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-[#888] text-[11px] tracking-[0.2em] uppercase font-medium mb-4">Jump to Article</div>
          <div className="flex flex-wrap gap-2">
            {BYLAWS.map((article) => (
              <a key={article.number} href={`#article-${article.number}`}
                className="px-3 py-1.5 rounded-lg border border-[#14CFC4]/30 text-[#0FAFA5] text-[12px] font-medium hover:bg-[#14CFC4] hover:text-white hover:border-[#14CFC4] transition-all duration-200"
              >
                Article {article.number}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          {BYLAWS.map((article, i) => (
            <motion.div
              key={article.number}
              id={`article-${article.number}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-[#14CFC4] text-[28px] font-bold leading-none opacity-40">Art. {article.number}</span>
                  <h2 className="font-heading text-[#111111] text-[22px] font-semibold">{article.title}</h2>
                </div>
                <div className="text-[#555] text-[14px] leading-relaxed whitespace-pre-line">{article.content}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom nav */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-10 bg-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="font-heading text-[#111111] text-[24px] font-semibold mb-3">Related Documents</h3>
          <p className="text-[#666] text-[14px] mb-6 max-w-[400px] mx-auto">Review all club governance documents before joining AANGCC.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/more/club-rules" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Club Rules</Link>
            <Link href="/more/code-of-conduct" className="px-5 py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">Code of Conduct</Link>
            <Link href="/more/waiver" className="px-5 py-2.5 rounded-xl border border-[#FFD84D] text-[#b8960a] text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Waiver of Liability</Link>
            <Link href="/membership/why-join" className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-semibold hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-200">Join The Club</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function BylawsPage() {
  return (
    <>
      <PageHero />
      <BylawsContent />
    </>
  );
}
