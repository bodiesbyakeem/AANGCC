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

const MEMBER_BENEFITS = [
  { icon: "🗓️", title: "Full Ride Calendar Access", body: "View all upcoming rides, events, and meetings. Filter by category and get full details including meeting points, distances, and post-ride socials." },
  { icon: "📸", title: "Team Photo Gallery", body: "Access the full AANGCC photo library — 163+ images from rides, charity events, and community moments." },
  { icon: "🎽", title: "Club Kit & Merchandise", body: "Members get access to order official AANGCC club kits, jerseys, and branded merchandise through our member portal." },
  { icon: "📰", title: "Club Newsletter", body: "Stay up to date with ride recaps, upcoming events, fundraising milestones, and club announcements delivered directly to your inbox." },
  { icon: "🏆", title: "Charity Event Priority", body: "AANGCC members get priority registration and team placement for the MS 150, Ride to End ALZ, and Rosedale Ride." },
  { icon: "🤝", title: "Community Network", body: "Connect with fellow AANGCC members, sponsors, and supporters across Austin. Our network is one of the most engaged cycling communities in the city." },
  { icon: "💼", title: "Sponsor Discounts", body: "Exclusive discounts and offers from AANGCC's corporate partners and sponsors — available to members only." },
  { icon: "🎯", title: "Fundraising Tools", body: "Access personalized fundraising pages, team dashboards, and resources to help you hit your fundraising goals for every charity event." },
];

const RESOURCES = [
  { title: "Ride Calendar", description: "Every upcoming ride, event, and meeting.", href: "/rides", icon: "📅" },
  { title: "Ride Levels Guide", description: "Social Butterflies, Roadsters, and Cyclepaths.", href: "/rides/levels", icon: "🚴" },
  { title: "Team Photos", description: "163+ photos from our rides and events.", href: "/rides/photos", icon: "📸" },
  { title: "MS 150 Team Page", description: "Join and support our flagship charity ride.", href: "/rides/ms150", icon: "🎗️" },
  { title: "ALZ Ride Team Page", description: "Support the Alzheimer's Association.", href: "/rides/alz", icon: "💜" },
  { title: "Rosedale Ride", description: "Our Austin community charity ride.", href: "/rides/rosedale", icon: "🌹" },
  { title: "Donate", description: "Support our MS and ALZ fundraising teams.", href: "/more/donate", icon: "💰" },
  { title: "Contact Leadership", description: "Questions? Reach out directly.", href: "/contact", icon: "✉️" },
];

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Member Resources</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Members <span className="text-gradient-gold">Only</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[560px] mx-auto leading-relaxed">
          Welcome to the AANGCC members hub. Everything you need — ride info, team resources, fundraising tools, and community connections — all in one place.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD84D]/20 border border-[#FFD84D]/30">
          <span className="text-[#FFD84D] text-[12px] font-medium">🔒 This page is for AANGCC members in good standing.</span>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function MemberBenefits() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">What's Included</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Your member <span className="text-gradient-gold">benefits.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MEMBER_BENEFITS.map((benefit, i) => (
            <motion.div key={benefit.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{benefit.icon}</span>
              <h3 className="font-heading text-[#111111] text-[18px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{benefit.title}</h3>
              <p className="text-[#666] text-[13px] leading-relaxed">{benefit.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberResources() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Quick Access</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Member <span className="text-gradient-gold">resources.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESOURCES.map((resource, i) => (
            <motion.div key={resource.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
              <Link href={resource.href} className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                <span className="text-3xl mb-4 block">{resource.icon}</span>
                <h3 className="font-heading text-[#111111] text-[18px] font-semibold mb-2 group-hover:text-[#14CFC4] transition-colors duration-300">{resource.title}</h3>
                <p className="text-[#888] text-[12px] leading-relaxed">{resource.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[#14CFC4] text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCommunity() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">Stay Connected</span>
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            You're part of <span className="text-gradient-gold">something real.</span>
          </h2>
          <p className="text-white/75 text-[16px] mb-10 max-w-[560px] mx-auto leading-relaxed">
            AANGCC is built on people who show up — for every ride, for every cause, and for every rider who needs support. As a member, you are part of that commitment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "🚴", title: "Show Up", body: "Check the ride calendar and join us every Saturday morning." },
              { icon: "💰", title: "Give Back", body: "Set up your fundraising page and help us hit our annual goals." },
              { icon: "📢", title: "Spread the Word", body: "Share AANGCC with friends, family, and coworkers who'd love to ride." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6 text-center"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-heading text-white text-[18px] font-semibold mb-2">{item.title}</h3>
                <p className="text-white/65 text-[13px] leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">View Ride Calendar</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Contact Leadership</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function MembersOnlyPage() {
  return (
    <>
      <PageHero />
      <MemberBenefits />
      <MemberResources />
      <MemberCommunity />
    </>
  );
}

