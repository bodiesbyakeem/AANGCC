"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Waiver Sections ──────────────────────────────────────────────────────────

const WAIVER_SECTIONS = [
  {
    number: "1",
    title: "Assumption of Risk",
    color: "teal",
    content:
      "I acknowledge that cycling and participation in AANGCC activities, including group rides, training rides, organized events, and all related activities (collectively, 'Activities'), involve inherent risks, dangers, and hazards. These risks include, but are not limited to: physical exertion, traffic and road hazards, collisions with other cyclists or vehicles, falls, equipment failure, weather conditions, and other unforeseen circumstances. I understand that these risks may result in serious injury, disability, death, or property damage. I voluntarily assume all such risks, known and unknown, associated with my participation in AANGCC Activities.",
  },
  {
    number: "2",
    title: "Release of Liability",
    color: "gold",
    content:
      "In consideration of being permitted to participate in AANGCC Activities, I, on behalf of myself, my heirs, personal representatives, and assigns, hereby release, waive, discharge, and covenant not to sue All Ass No Gas Cycling Club, its officers, directors, members, volunteers, sponsors, and agents (collectively, 'Released Parties') from any and all liability, claims, demands, actions, or causes of action arising out of or related to any loss, damage, injury, or death that may be sustained by me while participating in any AANGCC Activity, whether caused by the negligence of the Released Parties or otherwise.",
  },
  {
    number: "3",
    title: "Indemnification",
    color: "teal",
    content:
      "I agree to indemnify and hold harmless the Released Parties from any loss, liability, damage, or costs, including attorney's fees, that they may incur due to my participation in AANGCC Activities, whether caused by my negligence or otherwise. I agree that if any Released Party incurs legal costs or expenses as a result of claims made by me or on my behalf, I will be responsible for those costs and expenses.",
  },
  {
    number: "4",
    title: "Medical Authorization",
    color: "gold",
    content:
      "I authorize AANGCC and its representatives to seek emergency medical treatment on my behalf if I am incapacitated and unable to make decisions for myself during or after any AANGCC Activity. I agree to be financially responsible for any medical expenses incurred on my behalf. I represent that I am in good physical condition and have no medical conditions that would prevent my safe participation in cycling activities. I acknowledge that AANGCC strongly recommends consulting a physician before beginning any new physical activity program.",
  },
  {
    number: "5",
    title: "Rules & Conduct Agreement",
    color: "teal",
    content:
      "I agree to abide by all AANGCC Club Rules, Code of Conduct, and any instructions given by ride leaders during AANGCC Activities. I understand that failure to comply with these rules may result in my removal from a ride or event and potential suspension of my membership. I agree to wear a properly fitted helmet at all times during all AANGCC rides, and to comply with all applicable traffic laws and regulations.",
  },
  {
    number: "6",
    title: "Photography & Media Release",
    color: "gold",
    content:
      "I grant AANGCC permission to photograph or video record my participation in club Activities and to use such images or recordings in club publications, website, social media, and promotional materials without compensation. I understand I may opt out of photography by notifying club leadership in writing. I retain the right to revoke this permission at any time with written notice to club leadership.",
  },
  {
    number: "7",
    title: "Governing Law & Severability",
    color: "teal",
    content:
      "This Waiver of Liability shall be governed by the laws of the State of Texas. If any provision of this Waiver is found to be unenforceable or invalid, the remaining provisions shall continue in full force and effect. This Waiver constitutes the entire agreement between me and AANGCC with respect to its subject matter and supersedes all prior or contemporaneous understandings regarding such subject matter.",
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
            Legal Document
          </span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-white leading-tight mb-6"
          style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
        >
          Waiver of{" "}
          <span className="text-gradient-teal">Liability</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[15px] lg:text-[17px] max-w-[560px] mx-auto leading-relaxed"
        >
          This waiver must be read, understood, and agreed to by all
          members and participants before taking part in any AANGCC
          ride, event, or activity.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Waiver Content ───────────────────────────────────────────────────────────

function WaiverContent() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!agreed || !formData.fullName || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">

        {/* Legal notice banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-4 p-6 rounded-xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.03] mb-12"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-[2px]">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p className="text-white/50 text-[13px] leading-relaxed">
            <span className="text-[#FFD84D] font-semibold">Important Legal Notice: </span>
            This is a legally binding document. By agreeing to this waiver, you are
            giving up certain legal rights, including the right to sue AANGCC for
            negligence. Please read every section carefully before signing.
            If you have questions, consult a licensed attorney before proceeding.
          </p>
        </motion.div>

        {/* Waiver sections */}
        <div className="flex flex-col gap-6 mb-12">
          {WAIVER_SECTIONS.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
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

              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                      section.color === "gold"
                        ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                        : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                    }`}
                  >
                    {section.number}
                  </span>
                  <h2 className="font-heading text-white text-[19px] font-semibold">
                    {section.title}
                  </h2>
                </div>
                <p className="text-white/50 text-[14px] leading-relaxed pl-10">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Digital Signature Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.02] overflow-hidden"
        >
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />

          <div className="p-8 lg:p-10">
            {!submitted ? (
              <div className="flex flex-col gap-7">
                <div>
                  <h3 className="font-heading text-white text-[26px] font-semibold mb-2">
                    Digital Acknowledgment & Signature
                  </h3>
                  <p className="text-white/40 text-[13px] leading-relaxed">
                    By completing and submitting this form, you acknowledge that
                    you have read, understood, and agree to be bound by the
                    AANGCC Waiver of Liability in its entirety.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="As it appears on your ID"
                      className="
                        w-full px-5 py-3 rounded-xl
                        bg-white/[0.04] border border-white/[0.08]
                        text-white text-[14px] placeholder-white/20
                        focus:outline-none focus:border-[#2A9D9E]/50
                        transition-colors duration-200
                      "
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="
                        w-full px-5 py-3 rounded-xl
                        bg-white/[0.04] border border-white/[0.08]
                        text-white text-[14px] placeholder-white/20
                        focus:outline-none focus:border-[#2A9D9E]/50
                        transition-colors duration-200
                      "
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="
                        w-full px-5 py-3 rounded-xl
                        bg-white/[0.04] border border-white/[0.08]
                        text-white text-[14px]
                        focus:outline-none focus:border-[#2A9D9E]/50
                        transition-colors duration-200
                      "
                    />
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`
                    flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200
                    ${agreed
                      ? "border-[#2A9D9E]/40 bg-[#2A9D9E]/[0.05]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    }
                  `}
                >
                  <div
                    className={`
                      w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-[1px] transition-all duration-200
                      ${agreed ? "bg-[#2A9D9E] border-[#2A9D9E]" : "border-white/20 bg-transparent"}
                    `}
                  >
                    {agreed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    I confirm that I have read and fully understand the AANGCC
                    Waiver of Liability. I voluntarily agree to its terms and
                    acknowledge that this digital acknowledgment is legally
                    binding to the same extent as a handwritten signature.
                  </p>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!agreed || !formData.fullName || !formData.email}
                  className={`
                    w-full sm:w-auto px-8 py-3 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300
                    ${agreed && formData.fullName && formData.email
                      ? "bg-[#2A9D9E] text-black hover:bg-[#FFD84D] cursor-pointer shadow-[0_0_24px_rgba(42,157,158,0.25)]"
                      : "bg-white/[0.05] text-white/20 cursor-not-allowed"
                    }
                  `}
                >
                  Submit Waiver
                </button>
              </div>
            ) : (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-10 gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#2A9D9E]/10 border border-[#2A9D9E]/30 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A9D9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-white text-[28px] font-semibold mb-2">
                    Waiver Submitted
                  </h3>
                  <p className="text-white/40 text-[14px] max-w-[400px]">
                    Thank you, <span className="text-white">{formData.fullName}</span>.
                    Your waiver has been received. A confirmation will be sent
                    to <span className="text-[#2A9D9E]">{formData.email}</span>.
                    You're now cleared to ride with AANGCC.
                  </p>
                </div>
                <Link href="/rides" className="btn-primary">
                  View Ride Calendar
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Related docs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-medium mb-5">
            Related Club Documents
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Club Rules", href: "/more/club-rules" },
              { label: "Code of Conduct", href: "/more/code-of-conduct" },
              { label: "Club Bylaws", href: "/more/bylaws" },
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

export default function WaiverPage() {
  return (
    <>
      <PageHero />
      <WaiverContent />
    </>
  );
}

