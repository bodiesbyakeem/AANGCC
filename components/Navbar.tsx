"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    dropdown: [{ label: "We Support", href: "/about/we-support" }],
  },
  {
    label: "Membership",
    dropdown: [
      { label: "Why Join The Club?", href: "/membership/why-join" },
      { label: "Members Only", href: "/membership/members-only" },
    ],
  },
  {
    label: "Ride Calendar",
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

// ─── Dropdown Panel ───────────────────────────────────────────────────────────

function DropdownPanel({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
    >
      {/* Connector line */}
      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[1px] h-[6px] bg-[#2A9D9E]/40" />

      <div
        className="
          relative min-w-[220px] rounded-2xl overflow-hidden
          bg-[#0d0d0d] border border-white/[0.07]
          shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(44,157,158,0.08)]
        "
      >
        {/* Top teal accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />

        <ul className="py-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  group flex items-center gap-3 px-5 py-[10px]
                  text-[13px] font-medium tracking-wide text-white/70
                  hover:text-white transition-colors duration-150
                  hover:bg-white/[0.04]
                "
              >
                {/* Teal dot indicator */}
                <span className="w-1 h-1 rounded-full bg-[#2A9D9E] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Desktop Nav Item ─────────────────────────────────────────────────────────

function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.dropdown) {
    return (
      <Link
        href={item.href || "#"}
        className="
          relative text-[13px] font-medium tracking-[0.06em] uppercase text-white/70
          hover:text-white transition-colors duration-200
          after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
          after:bg-[#2A9D9E] after:transition-all after:duration-300
          hover:after:w-full
        "
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="
          flex items-center gap-[5px]
          text-[13px] font-medium tracking-[0.06em] uppercase
          text-white/70 hover:text-white transition-colors duration-200
          relative
          after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
          after:bg-[#2A9D9E] after:transition-all after:duration-300
          hover:after:w-full
        "
      >
        {item.label}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="opacity-50"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && <DropdownPanel items={item.dropdown!} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) =>
    setExpanded((prev) => (prev === label ? null : label));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="
              fixed top-0 right-0 h-full w-[300px] z-50
              bg-[#080808] border-l border-white/[0.06]
              flex flex-col overflow-y-auto
            "
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <span className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium">
                Navigation
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#2A9D9E]/50 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="mb-1">
                  {!item.dropdown ? (
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      className="
                        flex items-center px-3 py-3 rounded-xl
                        text-[13px] font-medium tracking-[0.06em] uppercase text-white/70
                        hover:text-white hover:bg-white/[0.04] transition-all duration-150
                      "
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggle(item.label)}
                        className="
                          w-full flex items-center justify-between px-3 py-3 rounded-xl
                          text-[13px] font-medium tracking-[0.06em] uppercase text-white/70
                          hover:text-white hover:bg-white/[0.04] transition-all duration-150
                        "
                      >
                        {item.label}
                        <motion.svg
                          animate={{
                            rotate: expanded === item.label ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          className="opacity-40"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden ml-3 pl-3 border-l border-[#2A9D9E]/20"
                          >
                            {item.dropdown.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className="
                                    flex items-center gap-2 px-2 py-[9px]
                                    text-[12px] text-white/50 hover:text-white
                                    transition-colors duration-150
                                  "
                                >
                                  <span className="w-1 h-1 rounded-full bg-[#FFD84D] flex-shrink-0" />
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-6 py-6 border-t border-white/[0.06]">
              <Link
                href="/membership/why-join"
                onClick={onClose}
                className="
                  block w-full text-center py-3 rounded-xl
                  bg-[#2A9D9E] text-black text-[13px] font-semibold tracking-[0.08em] uppercase
                  hover:bg-[#FFD84D] transition-colors duration-300
                "
              >
                Join The Club
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-[#000000]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* ── Left: Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-[48px] h-[48px]">
              <Image
                src="/images/aang-logo.webp"
                alt="All Ass No Gas Cycling Club"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Wordmark — hidden on small screens */}
            <div className="hidden xl:flex flex-col leading-none">
              <span
                className="text-white font-bold text-[15px] tracking-[0.08em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                All Ass No Gas
              </span>
              <span className="text-[#2A9D9E] text-[10px] tracking-[0.18em] uppercase font-medium mt-[2px]">
                Cycling Club
              </span>
            </div>
          </Link>

          {/* ── Center: Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* ── Right: CTA + Hamburger ── */}
          <div className="flex items-center gap-4">
            {/* Join CTA — desktop only */}
            <Link
              href="/membership/why-join"
              className="
                hidden lg:inline-flex items-center gap-2
                px-5 py-[9px] rounded-xl
                bg-[#2A9D9E] text-black text-[12px] font-semibold tracking-[0.08em] uppercase
                hover:bg-[#FFD84D] transition-colors duration-300
                shadow-[0_0_20px_rgba(42,157,158,0.25)]
                hover:shadow-[0_0_20px_rgba(255,216,77,0.3)]
              "
            >
              Join The Club
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-[5px] hover:border-[#2A9D9E]/50 transition-colors"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-white rounded-full" />
              <span className="w-3.5 h-[1.5px] bg-white/60 rounded-full self-end mr-[10px]" />
            </button>
          </div>
        </div>

        {/* Bottom teal glow line — visible when scrolled */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2A9D9E]/40 to-transparent"
        />
      </motion.header>

      {/* Mobile slide-in menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}


// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    dropdown: [{ label: "We Support", href: "/about/we-support" }],
  },
  {
    label: "Membership",
    dropdown: [
      { label: "Why Join The Club?", href: "/membership/why-join" },
      { label: "Members Only", href: "/membership/members-only" },
    ],
  },
  {
    label: "Ride Calendar",
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

// ─── Dropdown Panel ───────────────────────────────────────────────────────────

function DropdownPanel({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
    >
      {/* Connector line */}
      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[1px] h-[6px] bg-[#2A9D9E]/40" />

      <div
        className="
          relative min-w-[220px] rounded-2xl overflow-hidden
          bg-[#0d0d0d] border border-white/[0.07]
          shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(44,157,158,0.08)]
        "
      >
        {/* Top teal accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />

        <ul className="py-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  group flex items-center gap-3 px-5 py-[10px]
                  text-[13px] font-medium tracking-wide text-white/70
                  hover:text-white transition-colors duration-150
                  hover:bg-white/[0.04]
                "
              >
                {/* Teal dot indicator */}
                <span className="w-1 h-1 rounded-full bg-[#2A9D9E] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Desktop Nav Item ─────────────────────────────────────────────────────────

function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.dropdown) {
    return (
      <Link
        href={item.href || "#"}
        className="
          relative text-[13px] font-medium tracking-[0.06em] uppercase text-white/70
          hover:text-white transition-colors duration-200
          after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
          after:bg-[#2A9D9E] after:transition-all after:duration-300
          hover:after:w-full
        "
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="
          flex items-center gap-[5px]
          text-[13px] font-medium tracking-[0.06em] uppercase
          text-white/70 hover:text-white transition-colors duration-200
          relative
          after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
          after:bg-[#2A9D9E] after:transition-all after:duration-300
          hover:after:w-full
        "
      >
        {item.label}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="opacity-50"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && <DropdownPanel items={item.dropdown!} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) =>
    setExpanded((prev) => (prev === label ? null : label));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="
              fixed top-0 right-0 h-full w-[300px] z-50
              bg-[#080808] border-l border-white/[0.06]
              flex flex-col overflow-y-auto
            "
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <span className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium">
                Navigation
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#2A9D9E]/50 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="mb-1">
                  {!item.dropdown ? (
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      className="
                        flex items-center px-3 py-3 rounded-xl
                        text-[13px] font-medium tracking-[0.06em] uppercase text-white/70
                        hover:text-white hover:bg-white/[0.04] transition-all duration-150
                      "
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggle(item.label)}
                        className="
                          w-full flex items-center justify-between px-3 py-3 rounded-xl
                          text-[13px] font-medium tracking-[0.06em] uppercase text-white/70
                          hover:text-white hover:bg-white/[0.04] transition-all duration-150
                        "
                      >
                        {item.label}
                        <motion.svg
                          animate={{
                            rotate: expanded === item.label ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          className="opacity-40"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden ml-3 pl-3 border-l border-[#2A9D9E]/20"
                          >
                            {item.dropdown.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className="
                                    flex items-center gap-2 px-2 py-[9px]
                                    text-[12px] text-white/50 hover:text-white
                                    transition-colors duration-150
                                  "
                                >
                                  <span className="w-1 h-1 rounded-full bg-[#FFD84D] flex-shrink-0" />
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-6 py-6 border-t border-white/[0.06]">
              <Link
                href="/membership/why-join"
                onClick={onClose}
                className="
                  block w-full text-center py-3 rounded-xl
                  bg-[#2A9D9E] text-black text-[13px] font-semibold tracking-[0.08em] uppercase
                  hover:bg-[#FFD84D] transition-colors duration-300
                "
              >
                Join The Club
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-[#000000]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* ── Left: Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-[48px] h-[48px]">
              <Image
                src="/images/aang-logo.webp"
                alt="All Ass No Gas Cycling Club"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Wordmark — hidden on small screens */}
            <div className="hidden xl:flex flex-col leading-none">
              <span
                className="text-white font-bold text-[15px] tracking-[0.08em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                All Ass No Gas
              </span>
              <span className="text-[#2A9D9E] text-[10px] tracking-[0.18em] uppercase font-medium mt-[2px]">
                Cycling Club
              </span>
            </div>
          </Link>

          {/* ── Center: Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* ── Right: CTA + Hamburger ── */}
          <div className="flex items-center gap-4">
            {/* Join CTA — desktop only */}
            <Link
              href="/membership/why-join"
              className="
                hidden lg:inline-flex items-center gap-2
                px-5 py-[9px] rounded-xl
                bg-[#2A9D9E] text-black text-[12px] font-semibold tracking-[0.08em] uppercase
                hover:bg-[#FFD84D] transition-colors duration-300
                shadow-[0_0_20px_rgba(42,157,158,0.25)]
                hover:shadow-[0_0_20px_rgba(255,216,77,0.3)]
              "
            >
              Join The Club
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-[5px] hover:border-[#2A9D9E]/50 transition-colors"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-white rounded-full" />
              <span className="w-3.5 h-[1.5px] bg-white/60 rounded-full self-end mr-[10px]" />
            </button>
          </div>
        </div>

        {/* Bottom teal glow line — visible when scrolled */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2A9D9E]/40 to-transparent"
        />
      </motion.header>

      {/* Mobile slide-in menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

