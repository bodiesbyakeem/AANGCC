"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Blog Data ────────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    slug: "ms150-2024-recap",
    category: "Event Recap",
    color: "gold",
    title: "MS 150 2024 — Our Best Year Yet",
    excerpt:
      "From Houston to Austin, our team crushed every mile and raised more than ever before for the National MS Society. Here's the full story.",
    date: "November 12, 2024",
    readTime: "5 min read",
  },
  {
    slug: "ride-levels-explained",
    category: "Riding Tips",
    color: "teal",
    title: "Understanding AANGCC Ride Levels",
    excerpt:
      "Not sure which group ride is right for you? We break down our A, B, and C ride levels so you can show up confident and ready.",
    date: "October 3, 2024",
    readTime: "4 min read",
  },
  {
    slug: "why-we-ride-ms-society",
    category: "Community",
    color: "teal",
    title: "Why We Ride For The MS Society",
    excerpt:
      "Multiple Sclerosis affects millions of lives. AANGCC has made it our mission to ride, fundraise, and fight back — one pedal stroke at a time.",
    date: "September 18, 2024",
    readTime: "6 min read",
  },
  {
    slug: "rosedale-ride-2024",
    category: "Event Recap",
    color: "gold",
    title: "Rosedale Ride 2024 Highlights",
    excerpt:
      "Austin showed up and showed out. Relive the energy, the smiles, and the miles from this year's Rosedale Ride with AANGCC.",
    date: "August 29, 2024",
    readTime: "4 min read",
  },
  {
    slug: "cycling-nutrition-guide",
    category: "Training",
    color: "teal",
    title: "Fueling Your Ride — A Cyclist's Nutrition Guide",
    excerpt:
      "What you eat before, during, and after a ride makes a massive difference. Our experienced riders share their go-to nutrition strategies.",
    date: "July 15, 2024",
    readTime: "7 min read",
  },
  {
    slug: "corporate-sponsorship-impact",
    category: "Sponsorship",
    color: "gold",
    title: "How Corporate Sponsors Power Our Mission",
    excerpt:
      "AANGCC's community wouldn't be possible without the brands and businesses that believe in what we do. Meet our sponsors and see the impact.",
    date: "June 8, 2024",
    readTime: "4 min read",
  },
];

const CATEGORIES = ["All", "Event Recap", "Riding Tips", "Community", "Training", "Sponsorship"];

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-black pt-[72px]">

      {/* Grid background */}
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

      {/* Glow */}
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
            Stories & Updates
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
          The AANGCC{" "}
          <span className="text-gradient-teal">Blog</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="text-white/50 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed"
        >
          Ride recaps, training tips, community stories, and everything
          in between — straight from the AANGCC crew.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Blog Grid ────────────────────────────────────────────────────────────────

function BlogGrid() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-14"
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`
                px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide
                border transition-all duration-200
                ${i === 0
                  ? "bg-[#2A9D9E] text-black border-[#2A9D9E]"
                  : "bg-transparent text-white/40 border-white/[0.08] hover:border-[#2A9D9E]/40 hover:text-white/70"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured post — first item */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Link href={`/blog/${BLOG_POSTS[0].slug}`}>
            <div className="relative rounded-2xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.02] overflow-hidden group">
              {/* Top accent */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" />

              <div className="p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D]/10 text-[#FFD84D]">
                      Featured
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/[0.05] text-white/40">
                      {BLOG_POSTS[0].category}
                    </span>
                  </div>
                  <h2 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight group-hover:text-[#FFD84D] transition-colors duration-300">
                    {BLOG_POSTS[0].title}
                  </h2>
                  <p className="text-white/40 text-[14px] leading-relaxed max-w-[420px]">
                    {BLOG_POSTS[0].excerpt}
                  </p>
                </div>

                <div className="flex flex-col gap-6 lg:items-end">
                  <div className="flex items-center gap-4 text-white/30 text-[12px]">
                    <span>{BLOG_POSTS[0].date}</span>
                    <span>·</span>
                    <span>{BLOG_POSTS[0].readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[#FFD84D] text-[13px] font-semibold group-hover:gap-4 transition-all duration-300">
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Post grid — remaining posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(1).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div
                  className={`
                    relative rounded-2xl border overflow-hidden flex flex-col h-full group
                    ${post.color === "gold"
                      ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"
                      : "border-white/[0.07] bg-[#141414]"
                    }
                  `}
                >
                  {/* Top accent */}
                  <div
                    className={`h-[2px] w-full ${
                      post.color === "gold"
                        ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"
                        : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"
                    }`}
                  />

                  <div className="p-7 flex flex-col gap-4 flex-1">
                    {/* Category */}
                    <span
                      className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit ${
                        post.color === "gold"
                          ? "bg-[#FFD84D]/10 text-[#FFD84D]"
                          : "bg-[#2A9D9E]/10 text-[#2A9D9E]"
                      }`}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className={`font-heading text-white text-[22px] font-semibold leading-tight group-hover:${post.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} transition-colors duration-300`}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/40 text-[13px] leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-3 text-white/25 text-[11px]">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`${post.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ─── Newsletter CTA ───────────────────────────────────────────────────────────

function NewsletterCTA() {
  return (
    <section className="relative py-24 bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-[#2A9D9E]/[0.06] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-white leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Never miss a{" "}
          <span className="text-gradient-teal">story.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white/40 text-[14px] mb-8"
        >
          Join the AANGCC community and get ride updates, event recaps,
          and club news delivered straight to your inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="
              flex-1 px-5 py-3 rounded-xl
              bg-white/[0.04] border border-white/[0.08]
              text-white text-[14px] placeholder-white/25
              focus:outline-none focus:border-[#2A9D9E]/50
              transition-colors duration-200
            "
          />
          <button className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <>
      <PageHero />
      <BlogGrid />
      <NewsletterCTA />
    </>
  );
}
