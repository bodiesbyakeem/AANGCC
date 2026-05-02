"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const PHOTO_COLLECTIONS = [
  {
    id: "ms150-2026",
    label: "MS 150 · 2026",
    count: 147,
    prefix: "IMG_",
    ext: ".JPG",
    start: 2116,
  },
  {
    id: "ms150-2025",
    label: "MS 150 · 2025",
    count: 58,
    prefix: "2025 MS 150 ",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "ms150-2024",
    label: "MS 150 · 2024",
    count: 20,
    prefix: "2024 MS 150 ",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "ms150-2023",
    label: "MS 150 · 2023",
    count: 27,
    prefix: "MS150_",
    ext: ".png",
    start: 1,
  },
  {
    id: "ms150-2022",
    label: "MS 150 · 2022",
    count: 42,
    prefix: "2022 MS 150 ",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "ms150-2021",
    label: "MS 150 · 2021",
    count: 10,
    prefix: "MS150_SA",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "alz-2025",
    label: "ALZ Ride · 2025",
    count: 21,
    prefix: "2025 ALZ RIDE ",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "rosedale-2026",
    label: "Rosedale Ride · 2026",
    count: 10,
    prefix: "2026 ROSEDALE RIDE ",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "comfort-cafe",
    label: "Comfort Cafe",
    count: 10,
    prefix: "COMFORT CAFE ",
    ext: ".jpg",
    start: 1,
  },
  {
    id: "team-captain",
    label: "Team Captain Award",
    count: 2,
    prefix: "TEAM CAPTAIN AWARD ",
    ext: ".jpg",
    start: 1,
  },
];

function buildPhotoUrl(collection: typeof PHOTO_COLLECTIONS[0], index: number): string {
  return `/images/${collection.prefix}${index}${collection.ext}`;
}

function getAllPhotos() {
  const photos: { src: string; collection: string; index: number }[] = [];
  PHOTO_COLLECTIONS.forEach((col) => {
    for (let i = col.start; i <= col.count; i++) {
      photos.push({ src: buildPhotoUrl(col, i), collection: col.label, index: i });
    }
  });
  return photos;
}

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">The Journey in Pictures</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Team <span className="text-gradient-gold">Photos</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed mb-4">
          320+ photos from our rides, events, and moments that define the AANGCC community.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-wrap items-center justify-center gap-3 mt-4">
          {PHOTO_COLLECTIONS.map((col) => (
            <span key={col.id} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/70">
              {col.label} · {col.count} photos
            </span>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function PhotoGallery() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; collection: string; index: number } | null>(null);
  const allPhotos = getAllPhotos();

  const filtered = activeCollection === "all"
    ? allPhotos
    : allPhotos.filter((p) => {
        const col = PHOTO_COLLECTIONS.find((c) => c.id === activeCollection);
        return col ? p.collection === col.label : true;
      });

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxPhoto) return;
    const currentIndex = filtered.findIndex((p) => p.src === lightboxPhoto.src);
    if (direction === "prev" && currentIndex > 0) setLightboxPhoto(filtered[currentIndex - 1]);
    if (direction === "next" && currentIndex < filtered.length - 1) setLightboxPhoto(filtered[currentIndex + 1]);
  };

  return (
    <section className="relative py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setActiveCollection("all")}
            className={`px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide border transition-all duration-200 ${activeCollection === "all" ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}
          >
            All Photos <span className="ml-1.5 opacity-60">({allPhotos.length})</span>
          </button>
          {PHOTO_COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              className={`px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide border transition-all duration-200 ${activeCollection === col.id ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}
            >
              {col.label} <span className="ml-1.5 opacity-60">({col.count})</span>
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
              className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => setLightboxPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={`${photo.collection} — Photo ${photo.index}`}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.collection}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="text-white/60 text-[12px] bg-black/50 rounded-lg px-3 py-1.5 backdrop-blur-sm">{lightboxPhoto.collection}</span>
              </div>
              <button onClick={() => setLightboxPhoto(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              {filtered.findIndex((p) => p.src === lightboxPhoto.src) > 0 && (
                <button onClick={() => navigateLightbox("prev")} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
              {filtered.findIndex((p) => p.src === lightboxPhoto.src) < filtered.length - 1 && (
                <button onClick={() => navigateLightbox("next")} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
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

export default function PhotosPage() {
  return (
    <>
      <PageHero />
      <PhotoGallery />
    </>
  );
}

