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

// ─── Bylaws Data ──────────────────────────────────────────────────────────────

const BYLAW_SECTIONS = [
  {
    article: "Article I",
    title: "Name & Purpose",
    color: "teal",
    content: [
      {
        heading: "Section 1.1 — Name",
        body: "The name of this organization shall be All Ass No Gas Cycling Club, hereinafter referred to as 'AANGCC' or 'the Club'.",
      },
      {
        heading: "Section 1.2 — Purpose",
        body: "The purpose of AANGCC is to promote cycling as a sport and lifestyle in the Austin, Texas community; to foster camaraderie among cyclists of all levels; to organize group rides, events, and charitable fundraising activities; and to support the National Multiple Sclerosis Society and other designated charitable causes through organized cycling events.",
      },
      {
        heading: "Section 1.3 — Non-Profit Status",
        body: "AANGCC operates as a non-profit cycling club. No portion of club revenues shall inure to the benefit of individual members, except as reasonable compensation for services rendered to the club.",
      },
    ],
  },
  {
    article: "Article II",
    title: "Membership",
    color: "gold",
    content: [
      {
        heading: "Section 2.1 — Eligibility",
        body: "Membership in AANGCC is open to any individual who supports the purposes of the Club, agrees to abide by its rules, bylaws, and Code of Conduct, and completes the required membership registration and Waiver of Liability.",
      },
      {
        heading: "Section 2.2 — Membership Tiers",
        body: "The Club may establish multiple membership tiers with varying benefits and dues as determined by club leadership. Current membership tiers and associated benefits are published on the club website.",
      },
      {
        heading: "Section 2.3 — Membership Dues",
        body: "Annual membership dues shall be set by club leadership and communicated to members prior to each renewal period. Dues are non-refundable once membership is activated.",
      },
      {
        heading: "Section 2.4 — Termination of Membership",
        body: "Membership may be terminated voluntarily by written notice to club leadership, or involuntarily for failure to pay dues, violation of club rules, or conduct deemed detrimental to the club, at the discretion of club leadership.",
      },
    ],
  },
  {
    article: "Article III",
    title: "Leadership & Governance",
    color: "teal",
    content: [
      {
        heading: "Section 3.1 — Club Leadership",
        body: "AANGCC shall be governed by a Club Leadership team consisting of, at minimum, a President, Vice President, Treasurer, and Secretary. Additional officer positions may be created as needed.",
      },
      {
        heading: "Section 3.2 — Term of Office",
        body: "Club officers shall serve terms of one (1) year, renewable. Officers may be re-elected without limit. Terms begin on January 1st of each year.",
      },
      {
        heading: "Section 3.3 — Election of Officers",
        body: "Officers shall be elected by a majority vote of active members in good standing. Elections shall be held annually in November for the following calendar year. In the event of a vacancy, club leadership may appoint an interim officer.",
      },
      {
        heading: "Section 3.4 — Removal of Officers",
        body: "Any officer may be removed from their position by a two-thirds vote of active members in good standing, or by unanimous agreement of all other officers, for conduct unbecoming an officer or failure to fulfill duties.",
      },
      {
        heading: "Section 3.5 — Decision Making",
        body: "Routine club decisions may be made by the President or designated officers. Significant decisions — including changes to dues, major expenditures, and bylaw amendments — require a majority vote of the leadership team.",
      },
    ],
  },
  {
    article: "Article IV",
    title: "Finances",
    color: "gold",
    content: [
      {
        heading: "Section 4.1 — Fiscal Year",
        body: "The fiscal year of AANGCC shall begin on January 1st and end on December 31st of each calendar year.",
      },
      {
        heading: "Section 4.2 — Club Funds",
        body: "All club funds shall be deposited in a financial institution designated by the Treasurer and President. Funds shall only be disbursed for purposes consistent with the club's mission and approved budget.",
      },
      {
        heading: "Section 4.3 — Expenditure Authority",
        body: "The Treasurer, with approval of the President, may authorize expenditures up to $500 without full leadership approval. Expenditures exceeding $500 require approval from a majority of the leadership team.",
      },
      {
        heading: "Section 4.4 — Charitable Funds",
        body: "Funds raised through designated charitable events (e.g., MS 150, Ride to End ALZ) are separate from club operating funds and shall be remitted in full to the designated charitable organization as directed by event guidelines.",
      },
      {
        heading: "Section 4.5 — Financial Reporting",
        body: "The Treasurer shall provide a financial report to club members at least annually, summarizing revenues, expenditures, and current fund balances.",
      },
    ],
  },
  {
    article: "Article V",
    title: "Meetings & Voting",
    color: "teal",
    content: [
      {
        heading: "Section 5.1 — General Meetings",
        body: "AANGCC shall hold at least two (2) general membership meetings per year. Additional meetings may be called by the President or by written request of at least 25% of active members.",
      },
      {
        heading: "Section 5.2 — Notice of Meetings",
        body: "Members shall receive at least seven (7) days notice of any general membership meeting. Notice may be provided via email, club newsletter, or other official club communication channels.",
      },
      {
        heading: "Section 5.3 — Quorum",
        body: "A quorum for general membership meetings shall consist of at least 20% of active members in good standing, or a minimum of ten (10) members, whichever is greater.",
      },
      {
        heading: "Section 5.4 — Voting Rights",
        body: "All active members in good standing are entitled to one vote on any matter brought before the membership. Proxy voting is not permitted. Officers have the same voting rights as general members.",
      },
    ],
  },
  {
    article: "Article VI",
    title: "Amendments",
    color: "gold",
    content: [
      {
        heading: "Section 6.1 — Amendment Process",
        body: "These bylaws may be amended at any general membership meeting by a two-thirds vote of members present, provided a quorum is met and the proposed amendment was included in the meeting notice.",
      },
      {
        heading: "Section 6.2 — Emergency Amendments",
        body: "In urgent circumstances, the leadership team may adopt temporary rule changes by unanimous vote, subject to ratification by the membership at the next general meeting.",
      },
      {
        heading: "Section 6.3 — Effective Date",
        body: "Amendments to these bylaws take effect immediately upon approval unless otherwise specified in the amendment motion.",
      },
    ],
  },
  {
    article: "Article VII",
    title: "Dissolution",
    color: "teal",
    content: [
      {
        heading: "Section 7.1 — Dissolution Process",
        body: "AANGCC may be dissolved by a two-thirds vote of all active members in good standing at a meeting called for that purpose, with at least thirty (30) days advance notice.",
      },
      {
        heading: "Section 7.2 — Distribution of Assets",
        body: "Upon dissolution, after payment of all outstanding liabilities, any remaining club assets shall be distributed to one or more charitable organizations aligned with the club's mission, as determined by the final vote of the membership.",
      },
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
          <span className="text-gradient-teal">Bylaws</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed"
        >
          The official governing document of All Ass No Gas Cycling Club.
          These bylaws define how our organization operates, how decisions
          are made, and how members are governed.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Bylaws Content ───────────────────────────────────────────────────────────

function BylawsContent() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">

        {/* Header notice */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-4 p-6 rounded-xl border border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.03] mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-[#2A9D9E] animate-pulse flex-shrink-0 mt-1" />
          <p className="text-white/50 text-[14px] leading-relaxed">
            <span className="text-[#2A9D9E] font-semibold">Official Document: </span>
            These bylaws constitute the governing framework of All Ass No Gas
            Cycling Club. All members agree to be bound by these bylaws upon
            joining the club. Bylaws are reviewed annually and amended by
            membership vote as outlined in Article VI.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-12"
        >
          <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-4">
            Table of Contents
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BYLAW_SECTIONS.map((section) => (
              <div key={section.article} className="flex items-center gap-3 text-[13px]">
                <span className={`text-[11px] font-semibold ${section.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                  {section.article}
                </span>
                <span className="text-white/40">{section.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bylaw Articles */}
        <div className="flex flex-col gap-8">
          {BYLAW_SECTIONS.map((section, i) => (
            <motion.div
              key={section.article}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
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
                {/* Article header */}
                <div className="flex items-center gap-4 mb-7">
                  <span
                    className={`text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${
                      section.color === "gold"
                        ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                        : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                    }`}
                  >
                    {section.article}
                  </span>
                  <h2 className="font-heading text-white text-[22px] font-semibold">
                    {section.title}
                  </h2>
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-6">
                  {section.content.map((item, ci) => (
                    <div key={ci} className="flex flex-col gap-2">
                      <h3
                        className={`text-[12px] font-semibold tracking-wide ${
                          section.color === "gold" ? "text-[#FFD84D]/70" : "text-[#2A9D9E]/70"
                        }`}
                      >
                        {item.heading}
                      </h3>
                      <p className="text-white/50 text-[14px] leading-relaxed pl-4 border-l border-white/[0.06]">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Club Rules", href: "/more/club-rules" },
              { label: "Code of Conduct", href: "/more/code-of-conduct" },
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

export default function BylawsPage() {
  return (
    <>
      <PageHero />
      <BylawsContent />
    </>
  );
}

