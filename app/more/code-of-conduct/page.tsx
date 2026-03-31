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

// ─── Conduct Data ─────────────────────────────────────────────────────────────

const CONDUCT_SECTIONS = [
  {
    number: "01",
    title: "Our Commitment to Inclusion",
    color: "teal",
    content: [
      "AANGCC is committed to providing a welcoming, safe, and inclusive environment for all members, guests, and participants regardless of race, ethnicity, gender, gender identity, sexual orientation, age, disability, religion, national origin, or socioeconomic background.",
      "We believe that diversity makes our community stronger. Every person who shows up to ride deserves to feel respected, valued, and welcomed — from their very first pedal stroke.",
      "Inclusive language is expected in all club communications, events, and interactions. Members should actively work to make newer and underrepresented riders feel at home in our community.",
    ],
  },
  {
    number: "02",
    title: "Respect for All People",
    color: "gold",
    content: [
      "All members, guests, and participants are expected to treat others with dignity and respect at all times — on rides, at events, in digital communications, and in any context where they represent AANGCC.",
      "Personal attacks, insults, intimidation, or any form of bullying are strictly prohibited. This applies to in-person interactions and all digital platforms including group chats, social media, and email.",
      "Constructive disagreement is healthy — but it must remain respectful. Disagreements should be addressed privately or through club leadership, never publicly or in ways that embarrass others.",
      "Members are expected to be patient and encouraging with newer riders. Condescending behavior, unsolicited criticism, or making others feel unwelcome based on their skill level is unacceptable.",
    ],
  },
  {
    number: "03",
    title: "Zero Tolerance for Harassment",
    color: "teal",
    content: [
      "AANGCC has a strict zero-tolerance policy for harassment of any kind. Harassment includes but is not limited to: unwanted physical contact, verbal abuse, sexual comments or advances, stalking, intimidation, and sustained disruption of rides or events.",
      "Harassment will not be tolerated regardless of the identities or relationship of those involved. This applies equally to members, guests, sponsors, and anyone present at an AANGCC activity.",
      "Any member found to have engaged in harassment will face immediate suspension pending a full review, and may be permanently removed from the club.",
      "Members who experience or witness harassment are encouraged to report it directly to club leadership as soon as possible. All reports will be taken seriously and handled with discretion.",
    ],
  },
  {
    number: "04",
    title: "Responsible Use of Social Media",
    color: "gold",
    content: [
      "Members who post content related to AANGCC on social media are representing the club. Posts should reflect the values of our community — positive, respectful, and inclusive.",
      "Do not share photos or videos of other members without their explicit consent. This includes ride footage, event photos, and any content where individuals are clearly identifiable.",
      "Negative, inflammatory, or divisive content about AANGCC, its members, or its charitable partners should never be posted publicly. Concerns should always be raised through proper club channels.",
      "Tagging AANGCC in content that is inappropriate, offensive, or contrary to our values may result in disciplinary action.",
    ],
  },
  {
    number: "05",
    title: "Substance Use Policy",
    color: "teal",
    content: [
      "The consumption of alcohol or recreational substances immediately before or during any AANGCC ride or event is strictly prohibited.",
      "Members who appear to be impaired at a ride start will be asked to sit out for their safety and the safety of the group.",
      "Post-ride social gatherings where alcohol is present are subject to individual responsibility and local law. AANGCC does not sanction or organize events centered on alcohol consumption.",
      "Any illegal substance use in connection with AANGCC activities is grounds for immediate removal from the club.",
    ],
  },
  {
    number: "06",
    title: "Reporting & Enforcement",
    color: "gold",
    content: [
      "Members who experience or witness a violation of this Code of Conduct are encouraged to report it to club leadership promptly. Reports may be made in person, by email, or through any official club communication channel.",
      "All reports will be reviewed by club leadership in a timely manner. The reporting member's identity will be kept confidential to the extent possible.",
      "Consequences for violations may include: a formal warning, temporary suspension from rides and events, or permanent removal from AANGCC depending on the nature and severity of the conduct.",
      "AANGCC leadership reserves the right to make final decisions on all conduct matters. Decisions will be communicated to involved parties with reasonable explanation.",
      "Retaliation against any member who reports a conduct violation in good faith is itself a violation of this Code of Conduct and will be treated with equal seriousness.",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFD84D]/[0.04] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">
            Club Documentation
          </span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(42px, 7vw, 96px)" }}
        >
          Code of{" "}
          <span className="text-gradient-gold">Conduct</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed"
        >
          AANGCC is built on respect, inclusion, and shared purpose.
          This Code of Conduct defines the standard of behavior we
          expect from every member of our community.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Conduct Content ──────────────────────────────────────────────────────────

function ConductContent() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">

        {/* Preamble */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-4 p-6 rounded-xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.03] mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFD84D] animate-pulse flex-shrink-0 mt-1" />
          <p className="text-white/50 text-[14px] leading-relaxed">
            <span className="text-[#FFD84D] font-semibold">Our Promise: </span>
            All Ass No Gas Cycling Club is committed to being a community
            where every rider — regardless of background, ability, or
            experience — is treated with dignity and respect. This Code of
            Conduct applies to all club activities, communications, and
            events. Membership in AANGCC constitutes agreement to abide
            by this Code.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {CONDUCT_SECTIONS.map((section, i) => (
            <motion.div
              key={section.number}
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

                <div className="flex flex-col gap-4">
                  {section.content.map((para, pi) => (
                    <p key={pi} className="text-white/50 text-[14px] leading-relaxed pl-4 border-l border-white/[0.06]">
                      {para}
                    </p>
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

export default function CodeOfConductPage() {
  return (
    <>
      <PageHero />
      <ConductContent />
    </>
  );
}

