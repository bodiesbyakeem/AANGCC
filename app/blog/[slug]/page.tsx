"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "../data";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return null;

  const isGold = post.color === "gold";
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const paragraphs = post.content.split("\n\n");

  return (
    <div className="min-h-screen bg-black pt-[72px]">

      {/* Hero Image */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        <div className="absolute top-8 left-6 lg:left-10 z-10">
          <Link href="/blog" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-[13px] font-medium">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-16 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${isGold ? "bg-[#FFD84D]/20 text-[#FFD84D]" : "bg-[#2A9D9E]/20 text-[#2A9D9E]"}`}>
                {post.category}
              </span>
              <span className="text-white/30 text-[12px]">{post.readTime}</span>
            </div>
            <h1 className="font-heading text-white leading-tight max-w-[800px]" style={{ fontSize: "clamp(28px, 5vw, 64px)" }}>
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
      <section className="relative bg-black py-16">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10">
          <div className={`h-[3px] w-16 mb-10 ${isGold ? "bg-[#FFD84D]" : "bg-[#2A9D9E]"}`} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col gap-6">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-white/65 text-[17px] leading-[1.85] font-light">{paragraph}</p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className={`p-8 rounded-2xl border ${isGold ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.03]"}`}>
              <p className="text-white/50 text-[14px] mb-5 leading-relaxed">
                Ready to ride with purpose? Join Austin's most passionate cycling community and be part of something bigger than miles.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/membership/why-join" className="btn-primary">Join The Club</Link>
                <Link href="/blog" className="btn-outline">More Articles</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="relative bg-[#0a0a0a] py-20 border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10">
              <span className={`text-[11px] font-semibold tracking-[0.25em] uppercase mb-3 block ${isGold ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                More from {post.category}
              </span>
              <h2 className="font-heading text-white text-[28px] lg:text-[36px] font-semibold">Related Articles</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div key={rel.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                  <Link href={`/blog/${rel.slug}`}>
                    <div className={`relative rounded-2xl border overflow-hidden group cursor-pointer bg-[#141414] ${rel.color === "gold" ? "border-[#FFD84D]/15" : "border-white/[0.07]"}`}>
                      <div className="relative h-[180px] overflow-hidden">
                        <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded-full ${rel.color === "gold" ? "bg-[#FFD84D]/20 text-[#FFD84D]" : "bg-[#2A9D9E]/20 text-[#2A9D9E]"}`}>
                            {rel.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col gap-2">
                        <h3 className="font-heading text-white text-[17px] font-semibold leading-snug group-hover:text-[#2A9D9E] transition-colors duration-300">{rel.title}</h3>
                        <span className="text-white/25 text-[11px]">{rel.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
