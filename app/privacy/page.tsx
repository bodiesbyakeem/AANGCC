"use client";

import { useState } from "react";
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
    number: 1,
    title: "Who We Are",
    content: `All Ass No Gas Cycling Club ("AANGCC") is a purpose-driven cycling club based in Austin, Texas. We operate the website allassnogascyclingclub.com and provide cycling club membership, group rides, charity events, and associated digital services to members and supporters in the Austin area and beyond.

For the purposes of this Privacy Notice, AANGCC is the data controller responsible for the personal information you provide to us. Questions and requests regarding your data may be directed to info@allassnogascyclingclub.com.`,
  },
  {
    number: 2,
    title: "Information We Collect",
    content: `Information You Provide Directly. We collect personal information you voluntarily submit through website forms, membership enrollment, event registration, waiver signing, donation processing, and direct communications. This includes your name, email address, phone number, mailing address, emergency contact information, and payment details.

Health and Fitness Data. As part of delivering our cycling services and ensuring rider safety, we may collect health-related information including medical history disclosures, emergency contact details, and physical condition representations made through our Waiver of Liability. This information is used exclusively to protect your safety during club activities and comply with our legal obligations.

Waiver and Legal Records. When you sign our electronic Waiver of Liability, we collect your full legal name, email address, IP address, electronic signature, and timestamp. This information is permanently stored as part of our legally required audit trail.

Website Usage Data. When you visit our website, we may automatically collect certain technical information, including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages. This data is collected via standard web server logs and, where applicable, analytics services.

Member Portal Data. If you create a member account through our portal, we collect profile information including your name, address, phone number, email address, and membership tier. Payment processing is handled securely through Stripe — AANGCC does not store raw credit card or payment method data on our servers.

Communications. We retain records of email correspondence, event communications, and other communications you initiate with us for member service and record-keeping purposes.

Donation Records. If you make a donation through our platform, we retain records of your name, email address, donation amount, campaign, and date for compliance, tax, and impact reporting purposes.

Sponsorship Records. If you execute a sponsorship agreement with AANGCC, we retain your company name, contact information, signed contract, IP address, and timestamp as part of our legally required audit trail.`,
  },
  {
    number: 3,
    title: "How We Use Your Information",
    content: `We use the information we collect for the following purposes:

• To process and manage membership enrollment, renewals, and billing
• To deliver group ride information, event communications, and club updates
• To verify waiver completion before ride or event participation
• To process charitable donations and provide donation records
• To execute and store sponsorship agreements
• To manage member portal access and profile information
• To send service-related communications, including ride reminders and policy updates
• To send optional marketing communications, including newsletters and event announcements (with your consent)
• To operate and improve our website and member portal
• To maintain legally required audit trails for waivers, contracts, and financial records
• To comply with applicable legal obligations
• To protect the safety and security of our members, volunteers, and the public

We do not sell, rent, or trade your personal information to third parties for their independent marketing purposes under any circumstances.`,
  },
  {
    number: 4,
    title: "Legal Basis for Processing",
    content: `We process your personal information on the following legal bases:

Contract Performance. Processing necessary to deliver the membership services you have purchased, including ride access, event participation, and member portal features.

Legal Obligation. Processing required to comply with applicable laws, including retention of signed waivers, financial records, and audit logs as required under the E-SIGN Act and applicable Texas law.

Legitimate Interests. Processing necessary for our legitimate business interests, including website security, fraud prevention, member communications, service improvement, and charitable mission reporting, where those interests are not overridden by your rights.

Consent. Processing based on your explicit consent, such as receiving marketing communications or being featured in promotional photography or media content. You may withdraw consent at any time without affecting the lawfulness of prior processing.`,
  },
  {
    number: 5,
    title: "Information Sharing and Disclosure",
    content: `We do not sell your personal information. We may share your information only in the following limited circumstances:

Service Providers. We engage trusted third-party vendors to assist in operating our club, including payment processors (Stripe), email platforms (Resend), SMS providers (Twilio), authentication services (Supabase), and website hosting (Vercel). These vendors are contractually required to handle your information only as directed by AANGCC and may not use it for their own purposes.

Charitable Partners. To facilitate fundraising for the National Multiple Sclerosis Society, the Alzheimer's Association, and the Rosedale Foundation, we may share aggregated fundraising data with those organizations. We do not share individual donor personal information without your explicit consent.

Legal Requirements. We may disclose your information if required to do so by law, regulation, subpoena, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect the rights, property, or safety of AANGCC, our members, or the public.

Business Transfers. In the event of a merger, acquisition, or dissolution of AANGCC, member records may be transferred to any successor organization. You will be notified of any such change and your privacy options.

With Your Consent. We may share your information for any other purpose with your explicit prior consent.`,
  },
  {
    number: 6,
    title: "Waiver and Contract Audit Trail",
    content: `AANGCC is required by law and best legal practice to permanently retain records of all signed waivers and executed contracts. These records include your full legal name, email address, electronic signature, IP address, timestamp, and the version of the document signed.

These records are stored securely in our database and are not deleted upon membership cancellation or account closure. Retention of these records is required to protect both AANGCC and its members in the event of a legal dispute, insurance claim, or regulatory inquiry.

By signing the AANGCC Waiver of Liability or executing a sponsorship agreement, you acknowledge and consent to the permanent retention of these records.`,
  },
  {
    number: 7,
    title: "Cookies and Tracking Technologies",
    content: `Our website may use cookies — small text files stored on your device — to remember your preferences, maintain session state, and understand how visitors interact with our site. We use the following categories of cookies:

Strictly Necessary. Required for the website and member portal to function correctly, including authentication sessions. These cannot be disabled without disrupting core site functionality.

Analytics. Used to understand aggregate website usage patterns. Analytics cookies collect anonymous, non-identifying data.

Preferences. Used to remember settings and preferences you have chosen to improve your experience on return visits.

You may control cookie preferences through your browser settings. Note that disabling certain cookies may affect the functionality of the member portal and other website features.`,
  },
  {
    number: 8,
    title: "Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Specifically:

• Signed waiver records are retained permanently as required for liability protection and legal compliance.
• Executed sponsorship contracts are retained permanently as required for legal and financial compliance.
• Member profile data is retained for the duration of active membership and for 3 years following membership termination.
• Payment and billing records are retained for a minimum of 5 years for tax and accounting purposes.
• Donation records are retained for a minimum of 7 years for tax and charitable reporting purposes.
• Marketing consent records are retained until consent is withdrawn and for a reasonable period thereafter as evidence of that consent.

Upon request, we will delete personal information that we are not legally required to retain. Deletion requests may be submitted to info@allassnogascyclingclub.com.`,
  },
  {
    number: 9,
    title: "Data Security",
    content: `We implement commercially reasonable technical and organizational security measures designed to protect your personal information against unauthorized access, disclosure, alteration, or destruction. These measures include:

• Encrypted transmission via HTTPS across all website pages and member portal features
• Row-level security policies restricting database access to authenticated users' own records only
• Secure authentication managed through Supabase with industry-standard session handling
• Payment processing handled entirely through Stripe — no raw card data is stored on AANGCC servers
• Access controls limiting who within our organization can access member data

No method of electronic transmission or storage is completely secure. While we strive to use appropriate safeguards, we cannot guarantee the absolute security of your information. In the event of a data breach likely to result in risk to your rights and freedoms, we will notify affected individuals and applicable authorities as required by law.`,
  },
  {
    number: 10,
    title: "Your Privacy Rights",
    content: `Depending on your jurisdiction, you may have the following rights regarding your personal information:

Access. The right to request a copy of the personal information we hold about you.

Correction. The right to request correction of inaccurate or incomplete personal information. Members may update most profile information directly through the member portal.

Deletion. The right to request deletion of your personal information, subject to certain legal retention obligations. Please note that signed waiver records and executed contracts cannot be deleted due to legal retention requirements.

Opt-Out of Marketing. The right to unsubscribe from marketing communications at any time by clicking the unsubscribe link in any email or by contacting us at info@allassnogascyclingclub.com.

Withdrawal of Consent. Where processing is based on consent, the right to withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing that occurred prior to withdrawal.

To exercise any of these rights, please contact us at info@allassnogascyclingclub.com. We will respond to verifiable requests within 30 days.`,
  },
  {
    number: 11,
    title: "Photography and Media Consent",
    content: `By participating in AANGCC rides, events, and activities, you acknowledge that AANGCC and its authorized representatives may photograph and record participants. These images and recordings may be used for club promotional purposes including social media, website content, newsletters, and event materials.

If you wish to opt out of photography or recording, you must notify a club officer or ride leader before the activity begins. Opt-out requests will be respected on a best-efforts basis during group events.

Media consent is separate from waiver consent and may be withdrawn at any time by contacting info@allassnogascyclingclub.com.`,
  },
  {
    number: 12,
    title: "Children's Privacy",
    content: `AANGCC membership is restricted to adults 18 years of age or older. Our website and services are not directed at children under the age of 18. We do not knowingly collect personal information from individuals under 18. If we become aware that we have inadvertently collected personal information from a minor, we will take prompt steps to delete that information.

Parents or guardians who believe their child's information has been collected without consent should contact us at info@allassnogascyclingclub.com.`,
  },
  {
    number: 13,
    title: "Third-Party Links",
    content: `This website contains links to third-party websites, including the National MS Society, the Alzheimer's Association, the Rosedale Foundation, Stripe, social media platforms, and other organizations associated with our mission. AANGCC is not responsible for the privacy practices of these third-party sites and encourages you to review their privacy policies before submitting any personal information to them.`,
  },
  {
    number: 14,
    title: "Changes to This Privacy Notice",
    content: `We may update this Privacy Notice periodically to reflect changes in our practices, legal requirements, or technology. We will post any revised Notice on this page with an updated "Last updated" date. For material changes, we will provide additional notice via email to active members where applicable.

Your continued use of our website or services following any update constitutes acceptance of the revised Notice.

For privacy-related questions, requests, or concerns, please contact us at info@allassnogascyclingclub.com or by mail at All Ass No Gas Cycling Club, Austin, Texas. We will respond to all verifiable privacy requests within 30 days.`,
  },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-[80px] pb-20">

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-white/50" />
            <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Legal</span>
            <span className="h-[1px] w-10 bg-white/50" />
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Privacy <span className="text-gradient-gold">Notice</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-white/70 text-[15px] max-w-[520px] mx-auto leading-relaxed mb-6">
            This Privacy Notice describes how All Ass No Gas Cycling Club collects, uses, stores, and protects your personal information when you visit our website or engage our services.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-[12px]">
            <span>Last updated: April 7, 2026</span>
            <span>·</span>
            <span>Effective date: April 7, 2026</span>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
      </section>

      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* Quick nav */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <p className="text-[#888] text-[11px] tracking-[0.2em] uppercase font-medium mb-4">Jump to Section</p>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section) => (
              <a key={section.number} href={`#section-${section.number}`}
                className="px-3 py-1.5 rounded-lg border border-[#14CFC4]/30 text-[#0FAFA5] text-[11px] font-medium hover:bg-[#14CFC4] hover:text-white hover:border-[#14CFC4] transition-all duration-200">
                {section.number}. {section.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-5">
          {SECTIONS.map((section, i) => (
            <motion.div key={section.number} id={`section-${section.number}`}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.04 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-[#14CFC4] text-[28px] font-bold leading-none opacity-40">{String(section.number).padStart(2, "0")}</span>
                  <h2 className="font-heading text-[#111111] text-[22px] font-semibold">{section.title}</h2>
                </div>
                <div className="text-[#555] text-[14px] leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-8 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="font-heading text-[#111111] text-[24px] font-semibold mb-3">Privacy Questions?</h3>
          <p className="text-[#666] text-[14px] mb-6 max-w-[400px] mx-auto leading-relaxed">
            For privacy-related questions, requests, or concerns, contact us directly. We respond to all verifiable requests within 30 days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:info@allassnogascyclingclub.com" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              info@allassnogascyclingclub.com
            </a>
            <Link href="/more/waiver" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-bold tracking-wide uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300">
              Waiver of Liability
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
