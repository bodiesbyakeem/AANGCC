"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav Structure ────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "We Support", href: "/about/we-support" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    dropdown: [
      { label: "Why Join The Club?", href: "/membership/why-join" },
      { label: "Members Only", href: "/membership/members-only" },
    ],
  },
  {
    label: "Ride Calendar",
    href: "/rides",
    dropdown: [
      { label: "Team Photos", href: "/rides/photos" },
      { label: "Ride Levels", href: "/rides/levels" },
      { label: "MS 150 Team", href: "/rides/ms150" },
      { label: "Ride To End ALZ Team", href: "/rides/alz" },
      { label: "Rosedale Ride Team", href: "/rides/rosedale" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    href: "#",
    dropdown: [
      { label: "Corporate Sponsorship", href: "/more/sponsorship" },
      { label: "Donate to AANGCC", href: "/more/donate" },
      { label: "Club Rules", href: "/more/club-rules" },
      { label: "Code of Conduct", href: "/more/code-of-conduct" },
      { label: "Club Bylaws", href: "/more/bylaws" },
      { label: "Waiver of Liability", href: "/more/waiver" },
    ],
  },
];

// ─── Dropdown Menu ────────────────────────────────────────────────────────────

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[200px] z-50"
    >
      {/* Arrow */}
      <div className="flex justify-center mb-1">
        <div className="w-2 h-2 bg-[#141414] border-t border-l border-white/[0.08] rotate-45" />
      </div>
      <div className="bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              block px-5 py-3 text-[13px] text-white/60
              hover:text-white hover:bg-white/[0.04]
              transition-colors duration-150
              ${i !== 0 ? "border-t border-white/[0.05]" : ""}
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Navbar Component ─────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Left: Logo ── */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-[42px] h-[42px] flex-shrink-0">
                <img
                  src="/images/AANGCC WEB LOGO.png"
                  alt="AANGCC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden xl:flex flex-col leading-none">
                <span
                  className="text-white font-bold text-[14px] tracking-[0.06em] uppercase group-hover:text-[#2A9D9E] transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  All Ass No Gas
                </span>
                <span className="text-[#2A9D9E] text-[9px] tracking-[0.18em] uppercase font-medium mt-[2px]">
                  Cycling Club · Austin, TX
                </span>
              </div>
            </Link>

            {/* ── Center: Navigation ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-1 px-3 py-2 rounded-lg
                      text-[13px] font-medium tracking-wide
                      transition-colors duration-200
                      ${activeDropdown === link.label
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                      }
                    `}
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>

                  {/* Underline indicator */}
                  {activeDropdown === link.label && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2A9D9E] rounded-full"
                    />
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <DropdownMenu items={link.dropdown} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Right: CTA + Hamburger ── */}
            <div className="flex items-center gap-3">
              <Link
                href="/membership/why-join"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2A9D9E] text-black text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] transition-colors duration-300 shadow-[0_0_20px_rgba(42,157,158,0.3)] hover:shadow-[0_0_20px_rgba(255,216,77,0.3)]"
              >
                Join The Club
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
                aria-label="Toggle menu"
              >
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 w-0" : "w-4"}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Teal glow line on scroll */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2A9D9E]/30 to-transparent" />
        )}
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[360px] bg-[#0a0a0a] border-l border-white/[0.08] overflow-y-auto lg:hidden"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                  <img src="/images/AANGCC WEB LOGO.png" alt="AANGCC" className="w-9 h-9 object-contain" />
                  <span className="text-white text-[13px] font-semibold tracking-wide">AANGCC</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Panel links */}
              <div className="p-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors duration-150 text-[14px] font-medium"
                        >
                          {link.label}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className={`transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""}`}
                          >
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {mobileExpanded === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 flex flex-col gap-1 py-1">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/40 hover:text-[#2A9D9E] text-[13px] transition-colors duration-150"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#2A9D9E] flex-shrink-0" />
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors duration-150 text-[14px] font-medium"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Panel CTA */}
              <div className="p-6 border-t border-white/[0.06] mt-4">
                <Link
                  href="/membership/why-join"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-4 rounded-xl bg-[#2A9D9E] text-black text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] transition-colors duration-300"
                >
                  Join The Club
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
