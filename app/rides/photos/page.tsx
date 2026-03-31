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

// ─── Gallery Data ─────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "MS 150", "Ride to End ALZ", "Rosedale Ride", "Group Rides", "Events"];

const GALLERY_ITEMS = [
  { id: 1, category: "MS 150", title: "MS 150 Team at Start Line", year: "2024", size: "large" },
  { id: 2, category: "MS 150", title: "Day 1 Finish — La Grange", year: "2024", size: "small" },
  { id: 3, category: "Group Rides", title: "Saturday Morning Ride", year: "2024", size: "small" },
  { id: 4, category: "Rosedale Ride", title: "Rosedale Team Photo", year: "2024", size: "medium" },
  { id: 5, category: "MS 150", title: "Austin Finish Line Celebration", year: "2024", size: "medium" },
  { id: 6, category: "Ride to End ALZ", title: "ALZ Team Ready to Roll", year: "2024", size: "small" },
  { id: 7, category: "Events", title: "Club Awards Night", year: "2023", size: "small" },
  { id: 8, category: "Group Rides", title: "A Group Pace Line", year: "2024", size: "large" },
  { id: 9, category: "Rosedale Ride", title: "Rosedale Finish Celebration", year: "2023", size: "small" },
  { id: 10, category: "MS 150", title: "MS 150 Training Ride", year: "2024", size: "small" },
  { id: 11, category: "Events", title: "Club Kickoff Meeting 2024", year: "2024", size: "medium" },
  { id: 12, category: "Group Rides", title: "C Group — First Ride", year: "2024", size: "small" },
];

// Teal/gold palette for placeholder tiles
const TILE_COLORS = [
  "from-[#2A9D9E]/20 to-[#2A9D9E]/5",
  "from-[#FFD84D]/20 to-[#FFD84D]/5",
  "from-[#2A9D9E]/15 to-transparent",
  "from-[#FFD84D]/15 to-transparent",
  "from-white/10 to-transparent",
  "from-[#2A9D9E]/25 to-[#FFD84D]/10",
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
          group rides, charity events, and celebrations across the year.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
            </button>
          ))}
        </motion.div>

        {/* Notice banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 p-5 rounded-xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.03] mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFD84D] animate-pulse flex-shrink-0" />
          <p className="text-white/50 text-[13px]">
            <span className="text-[#FFD84D] font-semibold">Members Only:</span>{" "}
            Full-resolution photos and complete event galleries are available
            in the{" "}
            <Link href="/membership/members-only" className="text-[#2A9D9E] hover:text-white transition-colors duration-200 underline underline-offset-2">
              Members Only
            </Link>{" "}
            area. Photos below are preview thumbnails.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => {
            const colorClass = TILE_COLORS[i % TILE_COLORS.length];
            const heightClass =
              item.size === "large"
                ? "h-[320px]"
                : item.size === "medium"
                ? "h-[240px]"
                : "h-[180px]";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                className={`
                  relative ${heightClass} rounded-2xl overflow-hidden
                  border border-white/[0.06] group cursor-pointer
                  break-inside-avoid mb-4
                `}
              >
                {/* Placeholder gradient tile */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass}`} />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Camera icon center */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white text-[13px] font-semibold leading-snug">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#2A9D9E] text-[11px]">{item.category}</span>
                    <span className="text-white/30 text-[11px]">·</span>
                    <span className="text-white/30 text-[11px]">{item.year}</span>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-semibold tracking-wide px-2 py-1 rounded-lg bg-black/50 text-white/60 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Members CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-[14px] mb-6">
            Want access to full-resolution photos from every event?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/members-only" className="btn-primary">
              Access Members Gallery
            </Link>
            <Link href="/membership/why-join" className="btn-outline">
              Join The Club
            </Link>
          </div>
        </motion.div>
      </div>
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

