"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Sponsor {
  name: string;
  logo: string;
  tier: string;
  href?: string;
}

interface Tier {
  name: string;
  price: string;
  color: string;
  accent: string;
  perks: string[];
  jerseyImg: string;
  jerseyLabel: string;
  jerseyDesc: string;
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIERS: Tier[] = [
  {
    name: "Diamond",
    price: "$5,000+",
    color: "#2A9D9E",
    accent: "#1CCFC9",
    featured: true,
    jerseyImg: "/images/jersey-diamond.png",
    jerseyLabel: "Front of Jersey",
    jerseyDesc:
      "Your logo takes the most coveted position on the front of our team jersey. This gives maximum visibility for every rider on every ride.",
    perks: [
      "Primary logo — front of jersey",
      "Logo on team water bottles",
      "Website sponsor listing",
      "10 social media recognitions",
      "Banner placement at club events",
      "Dedicated sponsor spotlight post",
      "MS 150, ALZ, and Rosedale Ride team recognition",
      "Professionally framed team photo",
    ],
  },
  {
    name: "Platinum",
    price: "$3,500",
    color: "#ffffff",
    accent: "#cccccc",
    jerseyImg: "/images/jersey-platinum.png",
    jerseyLabel: "Back of Jersey",
    jerseyDesc:
      "Prominent placement across the back panel — seen by every rider following our pack and every spectator watching from the sidelines.",
    perks: [
      "Logo on back panel of jersey",
      "Website sponsor listing",
      "7 social media recognitions per year",
      "Event banner placement",
      "Newsletter recognition",
      "Certificate of appreciation",
    ],
  },
  {
    name: "Gold",
    price: "$2,500",
    color: "#FFD84D",
    accent: "#E6C235",
    jerseyImg: "/images/jersey-gold-right.png",
    jerseyLabel: "Front Jersey Sleeve",
    jerseyDesc:
      "Your logo appears on the sleeves of every AANGCC rider, visible from the front.",
    perks: [
      "Logo on front jersey sleeve",
      "Website sponsor listing",
      "5 social media recognitions per year",
      "Newsletter mention",
      "Professionally framed team photo",
    ],
  },
  {
    name: "Silver",
    price: "$1,500",
    color: "#C0C0C0",
    accent: "#999999",
    jerseyImg: "/images/jersey-silver.png",
    jerseyLabel: "Back Sleeves",
    jerseyDesc:
      "Your brand rides with us on the back sleeve of our team jersey. Clean and professional placement visible to trailing riders and event photographers.",
    perks: [
      "Logo on back jersey sleeves",
      "Website sponsor listing",
      "3 social media recognitions per year",
      "Professionally framed team photo",
    ],
  },
  {
    name: "Bronze",
    price: "$1,000",
    color: "#CD7F32",
    accent: "#A0622A",
    jerseyImg: "/images/right-armpit-sponsors.png",
    jerseyLabel: "Right Armpit Panel",
    jerseyDesc:
      "Your brand rides with us on the right armpit panel of every AANGCC jersey — a unique, high-contact placement seen up close at every event.",
    perks: [
      "Logo on right armpit jersey panel",
      "Website sponsor listing",
      "2 social media recognitions per year",
      "Professionally framed team photo",
    ],
  },
  {
    name: "Hydration Partner",
    price: "$750",
    color: "#4FC3F7",
    accent: "#0288D1",
    jerseyImg: "/images/hydration-partners.png",
    jerseyLabel: "Team Water Bottle",
    jerseyDesc:
      "Designed for businesses seeking a physical branding opportunity without purchasing jersey space.",
    perks: [
      "Company logo on official team water bottles",
      "Website sponsor listing",
      "1 social media acknowledgment",
    ],
  },
  {
    name: "Community Ride Partner",
    price: "$500",
    color: "#81C784",
    accent: "#388E3C",
    jerseyImg: "/images/community-ride-partner.png",
    jerseyLabel: "Community Partner",
    jerseyDesc:
      "Ideal for restaurants, fitness studios, local retailers, and other small businesses.",
    perks: [
      "Website sponsorship listing",
      "1 social media acknowledgment",
    ],
  },
  {
    name: "Friends of the Club",
    price: "$250",
    color: "#F48FB1",
    accent: "#C2185B",
    jerseyImg: "/images/friends-of-club.png",
    jerseyLabel: "Club Supporter",
    jerseyDesc:
      "Available to individuals, families, and smaller businesses who want to support the charitable mission of the club.",
    perks: [
      "Name or business recognition on the club website",
      "1 social media thank-you post",
      "Recognition in a seasonal supporter appreciation message",
    ],
  },
];

const CURRENT_SPONSORS: Sponsor[] = [
  {
    name: "Austin Infiniti",
    logo: "/images/austin-infiniti-sponsor.png",
    tier: "Diamond",
    href: "https://www.austininfiniti.com",
  },
  {
    name: "First Texas Honda",
    logo: "/images/first-texas-sponsor.png",
    tier: "Platinum",
    href: "https://www.firsttexashonda.com",
  },
  {
    name: "Georgetown Subaru",
    logo: "/images/georgetown-subaru-sponsor.png",
    tier: "Gold",
    href: "https://www.georgetownsubaru.com",
  },
  {
    name: "Austin Subaru",
    logo: "/images/austin-subaru-sponsor.png",
    tier: "Gold",
    href: "https://www.austinsubaru.com",
  },
  {
    name: "North Austin Nissan",
    logo: "/images/north-austin-nissan-sponsor.png",
    tier: "Silver",
    href: "https://www.northaustinnissan.com",
  },
  {
    name: "Mercedes-Benz of Austin",
    logo: "/images/mercedes-sponsor.png",
    tier: "Silver",
    href: "https://www.mercedesbenzaustin.com",
  },
  {
    name: "Bodies By Akeem",
    logo: "/images/bodiesbyakeem-sponsor.png",
    tier: "Bronze",
    href: "https://www.bodiesbyakeem.com",
  },
  {
    name: "Statewide Patrol",
    logo: "/images/statewide-patrol-sponsor.png",
    tier: "Bronze",
    href: "https://www.statewidepatrol.com",
  },
];

// ─── Why Sponsor Section ──────────────────────────────────────────────────────

function WhySponsor() {
  const stats = [
    { value: "100+", label: "Active Members" },
    { value: "50+", label: "Annual Rides" },
    { value: "$35K+", label: "Raised for MS Society" },
    { value: "ATX", label: "Community Reach" },
  ];

  return (
    <section className="py-20 bg-[#2A9D9E] border-b border-white/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">
            Why Partner With Us
          </span>
          <h2
            className="font-heading text-white mt-3 mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            More Than a Logo. A Movement.
          </h2>
          <p className="text-white/80 text-[15px] max-w-[580px] mx-auto leading-relaxed">
            AANGCC is Austin's most active cycling community — riding hard,
            giving back, and building real connections. Your sponsorship goes
            on the jersey, on the road, and into the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/20 border border-white/30"
            >
              <div className="font-heading text-white text-[36px] font-semibold leading-none mb-2">
                {s.value}
              </div>
              <div className="text-white/70 text-[11px] tracking-[0.15em] uppercase font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Current Sponsors Section ─────────────────────────────────────────────────

function CurrentSponsors() {
  return (
    <section className="py-20 bg-[#2A9D9E] border-b border-white/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2
            className="font-heading text-white"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Brands that <span style={{ color: "#FFD84D" }}>ride</span> with us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CURRENT_SPONSORS.map((sponsor, i) => (
            <motion.a
              key={sponsor.name}
              href={sponsor.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex items-center justify-center p-6 rounded-2xl bg-white hover:bg-white/90 transition-all duration-300 min-h-[140px] shadow-md"
            >
              <div className="relative w-full max-h-20 flex items-center justify-center">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={200}
                  height={80}
                  className="object-contain max-h-20 w-auto mx-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tier Card — Diamond (Featured / Full-Width) ──────────────────────────────

function DiamondCard({ tier }: { tier: Tier }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative rounded-3xl overflow-hidden border mb-6"
      style={{
        borderColor: `${tier.color}60`,
        background: "#ffffff",
        boxShadow: `0 0 60px ${tier.color}20`,
      }}
    >
      {/* "Most Visible" badge */}
      <div
        className="absolute top-5 right-5 z-10 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
        style={{
          color: "#000",
          background: tier.color,
        }}
      >
        Most Visible
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Jersey photo — left column */}
        <div className="relative bg-black flex items-center justify-center min-h-[320px] lg:min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at center, ${tier.color}40, transparent 70%)`,
            }}
          />
          <Image
            src={tier.jerseyImg}
            alt={tier.jerseyLabel}
            width={400}
            height={400}
            className="relative z-10 object-contain max-h-[340px] w-auto drop-shadow-2xl"
          />
          {/* Label strip */}
          <div
            className="absolute bottom-0 left-0 right-0 py-3 text-center text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: `linear-gradient(to top, ${tier.color}30, transparent)`,
              color: tier.color,
            }}
          >
            {tier.jerseyLabel}
          </div>
        </div>

        {/* Content — right column */}
        <div className="p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Tier name & price */}
            <div className="flex items-baseline gap-4 mb-2">
              <h3
                className="font-heading text-[42px] font-bold leading-none"
                style={{ color: tier.name === "Diamond" ? "#2A9D9E" : tier.color === "#ffffff" ? "#555555" : tier.color }}
              >
                {tier.name}
              </h3>
              <span className="text-black/40 text-[14px] font-medium">
                Sponsorship
              </span>
            </div>
            <div className="text-[28px] font-semibold text-[#2A9D9E] mb-4">
              {tier.price}
            </div>

            {/* Jersey description */}
            <p className="text-black/60 text-[14px] leading-relaxed mb-8 max-w-[440px]">
              {tier.jerseyDesc}
            </p>

            {/* Perks */}
            <ul className="space-y-3">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[13px] text-black/70">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mt-[2px] flex-shrink-0"
                  >
                    <circle cx="7" cy="7" r="7" fill={tier.color} fillOpacity="0.15" />
                    <path
                      d="M4 7l2 2 4-4"
                      stroke={tier.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="#become-a-sponsor"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-black text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300"
              style={{
                background: tier.color,
                boxShadow: `0 0 24px ${tier.color}40`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
              }}
            >
              Become a Diamond Sponsor
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tier Card — Standard (2×2 Grid) ─────────────────────────────────────────

function StandardTierCard({ tier, delay }: { tier: Tier; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="rounded-3xl overflow-hidden border flex flex-col"
      style={{
        borderColor: `${tier.color}60`,
        background: "#ffffff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Jersey photo — top half */}
      <div
  className="relative flex items-center justify-center min-h-[220px] overflow-hidden"
  style={{ background: tier.name === "Hydration Partner" ? "#f5f5f5" : "#000000" }}
>
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at center, ${tier.color}50, transparent 70%)`,
          }}
        />
        <Image
          src={tier.jerseyImg}
          alt={tier.jerseyLabel}
          width={300}
          height={260}
          className="relative z-10 object-contain max-h-[200px] w-auto drop-shadow-xl"
          style={tier.name === "Hydration Partner" ? { mixBlendMode: "multiply" } : undefined}
        />
        {/* Label strip */}
        <div
          className="absolute bottom-0 left-0 right-0 py-2 text-center text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{
            background: `linear-gradient(to top, ${tier.color}28, transparent)`,
            color: tier.color,
          }}
        >
          {tier.jerseyLabel}
        </div>
      </div>

      {/* Content — bottom half */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tier name & price */}
        <div className="flex items-baseline justify-between mb-1">
          <h3
            className="font-heading text-[28px] font-bold leading-none"
            style={{ color: tier.color === "#ffffff" ? "#555555" : tier.color }}
          >
            {tier.name}
          </h3>
          <span className="text-[#2A9D9E] font-semibold text-[20px]">{tier.price}</span>
        </div>

        {/* Jersey description */}
        <p className="text-black/50 text-[12px] leading-relaxed mb-5 mt-2">
          {tier.jerseyDesc}
        </p>

        {/* Perks */}
        <ul className="space-y-2 flex-1">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-[12px] text-black/60">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                className="mt-[2px] flex-shrink-0"
              >
                <circle cx="7" cy="7" r="7" fill={tier.color} fillOpacity="0.15" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke={tier.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {perk}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#become-a-sponsor"
          className="mt-6 block w-full text-center py-2.5 rounded-xl text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-300 text-black"
          style={{
            background: tier.color === "#ffffff" ? "#333333" : tier.color,
            color: tier.color === "#ffffff" ? "#ffffff" : "#000000",
            boxShadow: `0 0 16px ${tier.color}40`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
          }}
        >
          Become a {tier.name} Sponsor
        </a>
      </div>
    </motion.div>
  );
}

// ─── Sponsorship Tiers Section ────────────────────────────────────────────────

function SponsorshipTiers() {
  const [diamond, ...rest] = TIERS;

  return (
    <section className="py-20 bg-[#2A9D9E]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">
            Sponsorship Levels
          </span>
          <h2
            className="font-heading text-white mt-3 mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            Find Your Place on the Jersey
          </h2>
          <p className="text-white/80 text-[14px] max-w-[480px] mx-auto">
            Every tier earns real jersey placement — your logo rides with our
            team across Austin and beyond.
          </p>
        </motion.div>

        {/* Diamond — full width */}
        <DiamondCard tier={diamond} />

        {/* Remaining tiers — responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          {rest.map((tier, i) => (
            <StandardTierCard key={tier.name} tier={tier} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sponsorship Form / CTA ───────────────────────────────────────────────────

function SponsorshipForm() {
  return (
    <section id="become-a-sponsor" className="py-24 bg-[#2A9D9E] border-t border-white/20">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">
            Get Started
          </span>
          <h2
            className="font-heading text-white mt-3 mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Ready to Ride With Us?
          </h2>
          <p className="text-white/80 text-[15px] mb-10 leading-relaxed">
            Reach out and we'll get you set up with the right sponsorship level
            for your brand. Every dollar supports Austin's cycling community and
            the National Multiple Sclerosis Society.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us to Sponsor
            </Link>
            <Link href="/more/donate" className="btn-outline">
              Make a Donation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#2A9D9E] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-white/60" />
            <span className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">
              Corporate Sponsorship
            </span>
            <span className="h-[1px] w-8 bg-white/60" />
          </div>
          <h1
            className="font-heading text-white leading-tight mb-5"
            style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
          >
            Put Your Brand
            <br />
            <span style={{ color: "#FFD84D" }}>On the Road</span>
          </h1>
          <p className="text-white/80 text-[16px] max-w-[520px] mx-auto leading-relaxed">
            Partner with AANGCC and your logo rides with Austin's most
            dedicated cycling community — on every jersey, every mile,
            every event.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function SponsorshipPage() {
  return (
    <>
      <Hero />
      <WhySponsor />
      <SponsorshipTiers />
      <CurrentSponsors />
      <SponsorshipForm />
    </>
  );
}
