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

const FEATURED_CATEGORIES = [
  { label: "Beginner Cycling", icon: "🚲", filter: "Beginner" },
  { label: "Group Rides in Austin", icon: "🚴", filter: "Community" },
  { label: "Charity Rides", icon: "❤️", filter: "Community" },
  { label: "Training & Performance", icon: "💪", filter: "Advanced" },
  { label: "Community Stories", icon: "🌟", filter: "Community" },
];

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
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed mb-6">
          Training tips, community stories, and cycling wisdom — for riders at every level in the Austin cycling community.
        </motion.p>

        {/* SEO intro paragraph */}
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="text-white/55 text-[14px] max-w-[640px] mx-auto leading-relaxed">
          All Ass No Gas Cycling Club is Austin's most purpose-driven cycling club. Whether you're new to group rides in Austin, training for your first charity cycling event, or a seasoned rider looking to give back — this blog was written for you.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />
    </section>
  );
}

function WhoThisBlogIsFor() {
  return (
    <section className="py-10 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/10 border border-white/15 rounded-2xl p-7 lg:p-8">
          <p className="text-white/80 text-[15px] leading-relaxed max-w-[860px]">
            This blog is for <strong className="text-white">beginner cyclists</strong> just discovering the joy of two wheels, <strong className="text-white">intermediate riders</strong> building their fitness and community, <strong className="text-white">advanced riders</strong> pushing their limits in training and race prep, and <strong className="text-white">Austin-area riders</strong> looking for a cycling community rooted in purpose, connection, and charitable impact. Every article is written by riders, for riders — real stories from the roads of Austin, Texas.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories({ onFilter }: { onFilter: (filter: string) => void }) {
  return (
    <section className="px-6 lg:px-10 pb-8">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Browse by Topic</p>
        <div className="flex flex-wrap gap-3">
          {FEATURED_CATEGORIES.map((cat) => (
            <button key={cat.label} onClick={() => onFilter(cat.filter)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white/80 text-[13px] font-medium hover:bg-[#FFD84D] hover:text-[#111] hover:border-[#FFD84D] transition-all duration-200">
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogGrid({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (c: string) => void }) {
  const filtered = activeCategory === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="relative py-8">
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

function PopularTopics() {
  return (
    <section className="py-14 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/10 border border-white/15 rounded-2xl p-8">
          <h2 className="font-heading text-white text-[22px] font-semibold mb-2">Popular topics for Austin cyclists</h2>
          <p className="text-white/60 text-[13px] mb-6 leading-relaxed">
            Whether you're looking to join a cycling club in Austin, prepare for your first charity ride, or find group rides near you — AANGCC has you covered. Explore our most popular topics below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Beginner Cycling Tips", desc: "Everything you need to start riding with confidence in Austin." },
              { label: "Group Rides in Austin", desc: "Find your pace and your people on Austin's best cycling routes." },
              { label: "Charity Cycling in Austin", desc: "Ride for the MS Society, Alzheimer's Association, and Rosedale School." },
              { label: "Training & Performance", desc: "Level up your riding with expert tips from AANGCC coaches and riders." },
            ].map((topic) => (
              <div key={topic.label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                <p className="text-white font-semibold text-[13px] mb-1">{topic.label}</p>
                <p className="text-white/55 text-[12px] leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <p className="text-white/50 text-[12px] w-full mb-2">Ready to ride with us?</p>
            {[
              { label: "Join The Club", href: "/membership/join" },
              { label: "Ride Calendar", href: "/rides" },
              { label: "Support MS ALZ RR", href: "/donate" },
              { label: "Corporate Sponsorship", href: "/more/sponsorship" },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="px-4 py-2 rounded-xl bg-[#FFD84D] text-[#111111] text-[12px] font-bold tracking-wide uppercase hover:bg-white transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <PageHero />
      <WhoThisBlogIsFor />
      <FeaturedCategories onFilter={setActiveCategory} />
      <BlogGrid activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <PopularTopics />
    </>
  );
}
