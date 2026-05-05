"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// ── DATA ──────────────────────────────────────────────────────────────────────

// Known .jpeg files in 2026 collection (these will be skipped)
const JPEG_2026 = new Set([
  // Photos 1-40 not loading
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
  // Known .jpeg files
  41,42,43,44,45,46,48,50,55,58,61,66,73,75,76,137
]);

const PHOTO_COLLECTIONS = [
  { id: "ms150-2026", label: "MS 150 · 2026", count: 146, prefix: "2026 MS 150 ", ext: ".jpg", start: 1 },
  { id: "ms150-2025", label: "MS 150 · 2025", count: 58, prefix: "2025 MS 150 ", ext: ".jpg", start: 1 },
  { id: "ms150-2024", label: "MS 150 · 2024", count: 20, prefix: "2024 MS 150 ", ext: ".jpg", start: 1 },
  { id: "ms150-2023", label: "MS 150 · 2023", count: 7, prefix: "2023 MS 150 ", ext: ".jpg", start: 1 },
  { id: "ms150-2022", label: "MS 150 · 2022", count: 42, prefix: "2022 MS 150 ", ext: ".jpg", start: 1 },
  { id: "ms150-2021", label: "MS 150 · 2021", count: 10, prefix: "MS150_SA", ext: ".jpg", start: 1 },
  { id: "alz-2025", label: "ALZ Ride · 2025", count: 21, prefix: "2025 ALZ RIDE ", ext: ".jpg", start: 1 },
  { id: "rosedale-2026", label: "Rosedale Ride · 2026", count: 10, prefix: "2026 ROSEDALE RIDE ", ext: ".jpg", start: 1 },
  { id: "comfort-cafe", label: "Comfort Cafe", count: 10, prefix: "COMFORT CAFE ", ext: ".jpg", start: 1 },
  { id: "team-captain", label: "Team Captain Award", count: 2, prefix: "TEAM CAPTAIN AWARD ", ext: ".jpg", start: 1 },
];

function buildPhotoUrl(collection: typeof PHOTO_COLLECTIONS[0], index: number): string {
  return `/images/${collection.prefix}${index}${collection.ext}`;
}

function getAllPhotos() {
  const photos: { src: string; collection: string; collectionId: string; index: number }[] = [];
  PHOTO_COLLECTIONS.forEach((col) => {
    for (let i = col.start; i < col.start + col.count; i++) {
      // Skip known .jpeg files in 2026 collection
      if (col.id === "ms150-2026" && JPEG_2026.has(i)) continue;
      photos.push({ src: buildPhotoUrl(col, i), collection: col.label, collectionId: col.id, index: i });
    }
  });
  return photos;
}

const totalPhotos = PHOTO_COLLECTIONS.reduce((sum, c) => sum + c.count, 0);

// ── HERO ──────────────────────────────────────────────────────────────────────

function PageHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-end justify-start overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.3em] uppercase">The Journey in Pictures</span>
          </div>
          <h1 className="font-heading text-white leading-[0.95] mb-6" style={{ fontSize: "clamp(52px, 9vw, 120px)" }}>
            This is what<br />
            <span className="text-gradient-gold">we ride for.</span>
          </h1>
          <p className="text-white/70 text-[17px] lg:text-[20px] max-w-[560px] leading-relaxed mb-10">
            {totalPhotos}+ moments captured across years of rides, community, and cause. Every photo tells a story worth fighting for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/join"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">
              Join The Club
            </Link>
            <Link href="/rides/ride-calendar"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/30 text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:border-white hover:bg-white/10 transition-colors duration-300">
              View Ride Calendar
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-10 flex flex-col items-center gap-2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}

// ── FEATURED MS150 ────────────────────────────────────────────────────────────

function FeaturedMS150() {
  const ms2026 = PHOTO_COLLECTIONS.find(c => c.id === "ms150-2026")!;
  const featured = [104, 70, 49, 65, 72, 143].map(n => buildPhotoUrl(ms2026, n));

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Flagship Event</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
              MS 150 · <span className="text-gradient-gold">2026</span>
            </h2>
            <p className="text-white/60 text-[15px] mt-2">156 miles. Two days. One mission.</p>
          </div>
          <Link href="/rides/ms150" className="text-[#FFD84D] text-[12px] font-semibold tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 flex items-center gap-2">
            About The Ride →
          </Link>
        </motion.div>

        <div className="flex gap-3 h-[600px]">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer flex-[7]">
            <img src={featured[0]} alt="MS 150 2026" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <div className="flex flex-col gap-3 flex-[5]">
            {featured.slice(1, 5).map((src, i) => (
              <motion.div key={src} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer flex-1">
                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STORY SECTIONS ────────────────────────────────────────────────────────────

function StorySection({ title, subtitle, tag, photos, reverse = false }: {
  title: string; subtitle: string; tag: string; photos: string[]; reverse?: boolean;
}) {
  return (
    <section className="relative py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
          <motion.div initial={{ opacity: 0, x: reverse ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
              <span className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-medium">{tag}</span>
            </div>
            <h3 className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              {title}
            </h3>
            <p className="text-white/65 text-[16px] leading-relaxed">{subtitle}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: reverse ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-3">
            {photos.slice(0, 4).map((src, i) => (
              <div key={src} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? "col-span-2 h-[240px]" : "h-[160px]"}`}>
                <img src={src} alt="" style={i === 2 ? { objectPosition: "center 30%" } : {}} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── MAIN GALLERY ──────────────────────────────────────────────────────────────

function PhotoGallery() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; collection: string; index: number } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const allPhotos = getAllPhotos();

  const filtered = activeCollection === "all"
    ? allPhotos
    : allPhotos.filter((p) => p.collectionId === activeCollection);

  const handleFilterChange = (id: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCollection(id);
      setIsTransitioning(false);
    }, 200);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxPhoto) return;
    const currentIndex = filtered.findIndex((p) => p.src === lightboxPhoto.src);
    if (direction === "prev" && currentIndex > 0) setLightboxPhoto(filtered[currentIndex - 1]);
    if (direction === "next" && currentIndex < filtered.length - 1) setLightboxPhoto(filtered[currentIndex + 1]);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === "Escape") setLightboxPhoto(null);
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxPhoto, filtered]);

  return (
    <section className="relative py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Full Archive</span>
          </div>
          <h2 className="font-heading text-white text-[36px] lg:text-[48px] font-semibold">
            Every <span className="text-gradient-gold">Mile. Every Moment.</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <motion.button whileTap={{ scale: 0.96 }}
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold tracking-wide border transition-all duration-200 ${activeCollection === "all" ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D] shadow-lg shadow-[#FFD84D]/20" : "bg-white/8 text-white/60 border-white/15 hover:border-white/30 hover:text-white"}`}>
            All <span className="ml-1 opacity-60">({allPhotos.length})</span>
          </motion.button>
          {PHOTO_COLLECTIONS.map((col) => (
            <motion.button key={col.id} whileTap={{ scale: 0.96 }}
              onClick={() => handleFilterChange(col.id)}
              className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold tracking-wide border transition-all duration-200 ${activeCollection === col.id ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D] shadow-lg shadow-[#FFD84D]/20" : "bg-white/8 text-white/60 border-white/15 hover:border-white/30 hover:text-white"}`}>
              {col.label} <span className="ml-1 opacity-60">({col.count})</span>
            </motion.button>
          ))}
        </div>

        {/* Photo grid */}
        <motion.div animate={{ opacity: isTransitioning ? 0 : 1 }} transition={{ duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.015, 0.3) }}
              className="relative rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 aspect-square"
              onClick={() => setLightboxPhoto(photo)}
            >
              <img
                src={photo.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 right-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">📷</span>
            <p className="text-white/50 text-[15px]">No photos in this collection yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[90vw] max-h-[88vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.collection}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="text-white/50 text-[12px] font-medium">{lightboxPhoto.collection}</span>
                <span className="text-white/30 text-[11px]">
                  {filtered.findIndex(p => p.src === lightboxPhoto.src) + 1} / {filtered.length}
                </span>
              </div>
              <button onClick={() => setLightboxPhoto(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              {filtered.findIndex(p => p.src === lightboxPhoto.src) > 0 && (
                <button onClick={() => navigateLightbox("prev")}
                  className="absolute left-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
              {filtered.findIndex(p => p.src === lightboxPhoto.src) < filtered.length - 1 && (
                <button onClick={() => navigateLightbox("next")}
                  className="absolute right-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── BOTTOM CTA ─────────────────────────────────────────────────────────────────

function BottomCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.3em] uppercase">Your Story Starts Here</span>
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
          </div>
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
            Be in the next<br /><span className="text-gradient-gold">photo.</span>
          </h2>
          <p className="text-white/70 text-[17px] lg:text-[20px] leading-relaxed mb-12 max-w-[600px] mx-auto">
            Every photo on this page represents a rider who chose to show up — for the cause, for the team, for something bigger than themselves. Your chapter is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/join"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300 shadow-xl shadow-[#FFD84D]/20">
              Join The Club
            </Link>
            <Link href="/rides/ride-calendar"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl border border-white/30 text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:border-white hover:bg-white/10 transition-colors duration-300">
              View Ride Calendar
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── EXPORT ────────────────────────────────────────────────────────────────────

export default function PhotosPage() {
  const ms2026 = PHOTO_COLLECTIONS.find(c => c.id === "ms150-2026")!;
  const alz2025 = PHOTO_COLLECTIONS.find(c => c.id === "alz-2025")!;

  const ridePhotos = [53, 46, 95, 57].map(i => buildPhotoUrl(ms2026, i));
  const communityPhotos = [81, 144, 63, 79].map(i => buildPhotoUrl(ms2026, i));
  const impactPhotos = [128, 118, 115, 146].map(i => buildPhotoUrl(ms2026, i));

  return (
    <>
      <PageHero />
      <FeaturedMS150 />
      <StorySection
        tag="The Ride"
        title="Where the road demands everything."
        subtitle="Mile after mile, our riders push through heat, hills, and fatigue — united by a single purpose. These are the moments where character is built."
        photos={ridePhotos}
      />
      <StorySection
        tag="The Community"
        title="The people make the journey."
        subtitle="Rest stops become reunions. Climbs become conversations. This is what happens when a group of strangers becomes a team."
        photos={communityPhotos}
        reverse
      />
      <StorySection
        tag="The Impact"
        title="Every finish line is a promise kept."
        subtitle="When we cross the finish line, we're not just completing a ride. We're delivering on a commitment to every person fighting MS, ALZ, and beyond."
        photos={impactPhotos}
      />
      <PhotoGallery />
      <BottomCTA />
    </>
  );
}
