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

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "MS 150 2022",
  "MS 150 2024",
  "MS 150 2025",
  "ALZ Ride 2025",
  "Rosedale Ride 2026",
  "Comfort Cafe",
  "Team Captain Award",
];

// ─── Gallery Data ─────────────────────────────────────────────────────────────

const GALLERY_ITEMS = [
  // MS 150 2022
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `ms150-2022-${i + 1}`,
    src: `/images/2022 MS 150 ${i + 1}.jpg`,
    title: `MS 150 2022 — Photo ${i + 1}`,
    category: "MS 150 2022",
    year: "2022",
  })),

  // MS 150 2024
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `ms150-2024-${i + 1}`,
    src: `/images/2024 MS 150 ${i + 1}.jpg`,
    title: `MS 150 2024 — Photo ${i + 1}`,
    category: "MS 150 2024",
    year: "2024",
  })),

  // MS 150 2025
  ...Array.from({ length: 58 }, (_, i) => ({
    id: `ms150-2025-${i + 1}`,
    src: `/images/2025 MS 150 ${i + 1}.jpg`,
    title: `MS 150 2025 — Photo ${i + 1}`,
    category: "MS 150 2025",
    year: "2025",
  })),

  // ALZ Ride 2025 (note: #18 is named 78)
  ...Array.from({ length: 21 }, (_, i) => {
    const num = i + 1 === 18 ? 78 : i + 1;
    return {
      id: `alz-2025-${i + 1}`,
      src: `/images/2025 ALZ RIDE ${num}.jpg`,
      title: `ALZ Ride 2025 — Photo ${i + 1}`,
      category: "ALZ Ride 2025",
      year: "2025",
    };
  }),

  // Rosedale Ride 2026
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `rosedale-2026-${i + 1}`,
    src: `/images/2026 ROSEDALE RIDE ${i + 1}.jpg`,
    title: `Rosedale Ride 2026 — Photo ${i + 1}`,
    category: "Rosedale Ride 2026",
    year: "2026",
  })),

  // Comfort Cafe
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `comfort-cafe-${i + 1}`,
    src: `/images/COMFORT CAFE ${i + 1}.jpg`,
    title: `Comfort Cafe — Photo ${i + 1}`,
    category: "Comfort Cafe",
    year: "2025",
  })),

  // Team Captain Award
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `team-captain-${i + 1}`,
    src: `/images/TEAM CAPTAIN AWARD ${i + 1}.jpg`,
    title: `Team Captain Award — Photo ${i + 1}`,
    category: "Team Captain Award",
    year: "2025",
  })),
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#2A9D9E]/50 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 1L2 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#2A9D9E]/50 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 1L12 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-contain max-h-[80vh] rounded-xl"
        />
        <div className="mt-3 text-center">
          <p className="text-white/50 text-[13px]">{item.title}</p>
        </div>
      </div>
    </div>
  );
}

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

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
            Memories on Two Wheels
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
          Team{" "}
          <span className="text-gradient-teal">Photos</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed"
        >
          Every ride tells a story. Browse our gallery of moments from
          group rides, charity events, and celebrations across the years.
        </motion.p>

        {/* Photo count */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.05]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D9E] animate-pulse" />
          <span className="text-[#2A9D9E] text-[12px] font-medium tracking-wide">
            {GALLERY_ITEMS.length} Photos
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextPhoto = () => setLightboxIndex((i) => i !== null ? (i + 1) % filtered.length : null);

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide border transition-all duration-200
                ${activeCategory === cat
                  ? "bg-[#2A9D9E] text-black border-[#2A9D9E]"
                  : "bg-transparent text-white/40 border-white/[0.08] hover:border-[#2A9D9E]/40 hover:text-white/70"
                }
              `}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-2 opacity-60">
                  ({GALLERY_ITEMS.filter(i => i.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Photo count for current filter */}
        <div className="mb-8 text-white/30 text-[13px]">
          Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` from ${activeCategory}` : ""}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              className="relative rounded-xl overflow-hidden group cursor-pointer break-inside-avoid mb-4"
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-white text-[12px] font-semibold">{item.title}</div>
                <div className="text-[#2A9D9E] text-[11px] mt-0.5">{item.category}</div>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1H5M1 1V5M1 1L5 5M11 1H7M11 1V5M11 1L7 5M1 11H5M1 11V7M1 11L5 7M11 11H7M11 11V7M11 11L7 7" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}

// ─── Submit Photos CTA ────────────────────────────────────────────────────────

function SubmitPhotos() {
  return (
    <section className="relative py-20 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[200px] bg-[#2A9D9E]/[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading text-white leading-tight mb-4"
          style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
        >
          Have photos to{" "}
          <span className="text-gradient-teal">share?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white/40 text-[14px] mb-8 max-w-[400px] mx-auto"
        >
          Captured some great moments on a ride or at an event? Send
          them our way and we'll add them to the gallery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link href="/contact" className="btn-primary">
            Submit Your Photos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function PhotosPage() {
  return (
    <>
      <PageHero />
      <Gallery />
      <SubmitPhotos />
    </>
  );
}
