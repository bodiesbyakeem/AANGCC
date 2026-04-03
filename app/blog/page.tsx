"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BLOG_POSTS } from "./data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const CATEGORIES = ["All", "Beginner", "Intermediate", "Advanced", "Community"];

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Stories & Training</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          The AANGCC <span className="text-gradient-gold">Blog</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed">
          Training tips, community stories, and cycling wisdom — for riders at every level.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />
    </section>
  );
}

function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="relative py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Category filter */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap items-center gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide border transition-all duration-200 ${activeCategory === cat
                ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D]"
                : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
              {cat !== "All" && <span className="ml-2 opacity-60">({BLOG_POSTS.filter(p => p.category === cat).length})</span>}
            </button>
          ))}
        </motion.div>

        {/* Featured post */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8">
            <Link href={`/blog/${featured.slug}`}>
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                <div className="relative h-[320px] lg:h-[400px] overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D] text-[#111111]">Featured</span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/20 text-white/80">{featured.category}</span>
                    </div>
                    <h2 className="font-heading text-white text-[26px] lg:text-[38px] font-semibold leading-tight mb-3 max-w-[700px] group-hover:text-[#FFD84D] transition-colors duration-300">{featured.title}</h2>
                    <p className="text-white/65 text-[14px] max-w-[560px] leading-relaxed mb-4">{featured.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#FFD84D]">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}>
              <Link href={`/blog/${post.slug}`}>
                <div className="relative rounded-2xl overflow-hidden flex flex-col h-full group cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-[200px] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full bg-[#FFD84D] text-[#111111]">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3 className="font-heading text-[#111111] text-[19px] font-semibold leading-tight group-hover:text-[#14CFC4] transition-colors duration-300">{post.title}</h3>
                    <p className="text-[#666] text-[13px] leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[#aaa] text-[11px]">{post.readTime}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#14CFC4] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <>
      <PageHero />
      <BlogGrid />
    </>
  );
}
