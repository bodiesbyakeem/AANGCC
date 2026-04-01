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
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-black pt-[72px]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(42,157,158,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(42,157,158,0.8) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Stories & Training</span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          The AANGCC <span className="text-gradient-teal">Blog</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/50 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed">
          Training tips, community stories, and cycling wisdom — for riders at every level.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap items-center gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide border transition-all duration-200 ${activeCategory === cat ? "bg-[#2A9D9E] text-black border-[#2A9D9E]" : "bg-transparent text-white/40 border-white/[0.08] hover:border-[#2A9D9E]/40 hover:text-white/70"}`}>
              {cat}
              {cat !== "All" && <span className="ml-2 opacity-60">({BLOG_POSTS.filter(p => p.category === cat).length})</span>}
            </button>
          ))}
        </motion.div>

        {featured && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8">
            <Link href={`/blog/${featured.slug}`}>
              <div className={`relative rounded-2xl border overflow-hidden group cursor-pointer ${featured.color === "gold" ? "border-[#FFD84D]/20" : "border-[#2A9D9E]/20"}`}>
                <div className="relative h-[320px] lg:h-[400px] overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${featured.color === "gold" ? "bg-[#FFD84D]/20 text-[#FFD84D]" : "bg-[#2A9D9E]/20 text-[#2A9D9E]"}`}>Featured</span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/10 text-white/50">{featured.category}</span>
                    </div>
                    <h2 className="font-heading text-white text-[26px] lg:text-[38px] font-semibold leading-tight mb-3 max-w-[700px] group-hover:text-[#2A9D9E] transition-colors duration-300">{featured.title}</h2>
                    <p className="text-white/50 text-[14px] max-w-[560px] leading-relaxed mb-4">{featured.excerpt}</p>
                    <span className={`inline-flex items-center gap-2 text-[13px] font-semibold ${featured.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}>
              <Link href={`/blog/${post.slug}`}>
                <div className={`relative rounded-2xl border overflow-hidden flex flex-col h-full group cursor-pointer bg-[#141414] ${post.color === "gold" ? "border-[#FFD84D]/15" : "border-white/[0.07]"}`}>
                  <div className="relative h-[200px] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full ${post.color === "gold" ? "bg-[#FFD84D]/20 text-[#FFD84D]" : "bg-[#2A9D9E]/20 text-[#2A9D9E]"}`}>{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3 className="font-heading text-white text-[19px] font-semibold leading-tight group-hover:text-[#2A9D9E] transition-colors duration-300">{post.title}</h3>
                    <p className="text-white/40 text-[13px] leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-white/25 text-[11px]">{post.readTime}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${post.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
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

