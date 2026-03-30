"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─── Footer Data ──────────────────────────────────────────────────────────────

const FOOTER_LINKS = [
  {
    heading: "Club",
    links: [
      { label: "About Us", href: "/about" },
      { label: "We Support", href: "/about/we-support" },
      { label: "Club Rules", href: "/more/club-rules" },
      { label: "Code of Conduct", href: "/more/code-of-conduct" },
      { label: "Club Bylaws", href: "/more/bylaws" },
    ],
  },
  {
    heading: "Membership",
    links: [
      { label: "Why Join The Club?", href: "/membership/why-join" },
      { label: "Members Only", href: "/membership/members-only" },
      { label: "Waiver of Liability", href: "/more/waiver" },
      { label: "Corporate Sponsorship", href: "/more/sponsorship" },
      { label: "Donate to AANGCC", href: "/more/donate" },
    ],
  },
  {
    heading: "Rides",
    links: [
      { label: "Ride Calendar", href: "/rides" },
      { label: "Ride Levels", href: "/rides/levels" },
      { label: "MS 150 Team", href: "/rides/ms150" },
      { label: "Ride To End ALZ Team", href: "/rides/alz" },
      { label: "Rosedale Ride Team", href: "/rides/rosedale" },
      { label: "Team Photos", href: "/rides/photos" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Strava",
    href: "https://strava.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
      </svg>
    ),
  },
];

// ─── Footer Component ─────────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.06] overflow-hidden">

      {/* Top teal accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2A9D9E]/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* ── Main Footer Grid ── */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="relative w-[52px] h-[52px]">
                <Image
                  src="/images/aang-logo.webp"
                  alt="All Ass No Gas Cycling Club"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-white font-bold text-[16px] tracking-[0.06em] uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  All Ass No Gas
                </span>
                <span className="text-[#2A9D9E] text-[10px] tracking-[0.18em] uppercase font-medium mt-[3px]">
                  Cycling Club · Austin, TX
                </span>
              </div>
            </Link>

            <p className="text-white/40 text-[13px] leading-relaxed max-w-[300px]">
              Austin's premier cycling community. We ride hard, build
              bonds, and support the National Multiple Sclerosis Society
              with every mile.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-9 h-9 rounded-xl border border-white/[0.08]
                    flex items-center justify-center
                    text-white/40 hover:text-[#2A9D9E]
                    hover:border-[#2A9D9E]/40
                    transition-all duration-200
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* MS Society badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] w-fit">
              <div className="w-2 h-2 rounded-full bg-[#FFD84D] animate-pulse" />
              <span className="text-white/50 text-[11px] tracking-[0.1em] uppercase font-medium">
                Proud Supporter · National MS Society
              </span>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-white text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="
                          text-white/40 text-[13px] hover:text-[#2A9D9E]
                          transition-colors duration-200
                        "
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[12px] tracking-wide">
            © {currentYear} All Ass No Gas Cycling Club. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/more/waiver"
              className="text-white/25 text-[12px] hover:text-white/50 transition-colors duration-200"
            >
              Waiver of Liability
            </Link>
            <Link
              href="/more/club-rules"
              className="text-white/25 text-[12px] hover:text-white/50 transition-colors duration-200"
            >
              Club Rules
            </Link>
            <Link
              href="/contact"
              className="text-white/25 text-[12px] hover:text-white/50 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
