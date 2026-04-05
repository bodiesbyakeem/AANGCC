"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="text-center">
          <h1 className="font-heading text-white text-[48px] font-semibold mb-4">Post Not Found</h1>
          <p className="text-white/60 text-[15px] mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen pt-[80px]">

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${post.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 pb-14 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <Link href="/blog" className="text-white/60 text-[12px] hover:text-[#FFD84D] transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Blog
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D] text-[#111111]">{post.category}</span>
            </div>
            <h1 className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(28px, 5vw, 60px)" }}>{post.title}</h1>
            <div className="flex items-center gap-4 text-white/55 text-[13px]">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-16">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>

            {/* Excerpt lead */}
            <p className="text-white/85 text-[18px] leading-relaxed font-light mb-8 pb-8 border-b border-white/15">
              {post.excerpt}
            </p>

            {/* Article body */}
            <div className="prose-aangcc">
              {post.content ? (
                <div className="text-white/75 text-[15px] leading-relaxed space-y-5"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="flex flex-col gap-5 text-white/75 text-[15px] leading-relaxed">
                  <p>All Ass No Gas Cycling Club is Austin's most purpose-driven cycling community — a family of riders united by grit, generosity, and the belief that every mile can make a difference.</p>
                  <p>Whether you're training for your first group ride or your fifth MS 150, AANGCC provides the structure, community, and accountability you need to reach your goals while giving back to causes that matter.</p>
                  <div className="my-8 p-7 rounded-2xl bg-white/10 border border-white/20">
                    <p className="font-heading text-white text-[20px] font-semibold leading-relaxed">
                      "Every mile we ride is a mile in the fight against MS and Alzheimer's disease."
                    </p>
                    <p className="text-white/50 text-[13px] mt-3">— AANGCC Mission</p>
                  </div>
                  <p>From weekly Saturday morning rides at Govalle Neighborhood Park to the annual BP MS 150 from Houston to Austin, AANGCC's calendar is built around meaningful milestones — both on the road and in the community.</p>
                  <p>If you're looking for a cycling club in Austin that challenges you physically, connects you socially, and gives you a reason to ride beyond personal fitness — AANGCC is your home.</p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap gap-2">
              {["AANGCC", "Austin Cycling", post.category, "MS Society"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white/60 text-[11px] font-medium tracking-wide">
                  #{tag.toLowerCase().replace(/\s+/g, "")}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-8 text-center">
                <h3 className="font-heading text-[#111111] text-[26px] font-semibold mb-3">Ready to ride with AANGCC?</h3>
                <p className="text-[#666] text-[14px] mb-6 max-w-[400px] mx-auto leading-relaxed">
                  Join Austin's most purpose-driven cycling community. Every mile matters.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/membership/join" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-300">
                    Join The Club
                  </Link>
                  <Link href="/rides" className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-[#14CFC4] text-[#14CFC4] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300">
                    View Ride Calendar
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="relative py-16 border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10">
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium block mb-2">Keep Reading</span>
              <h2 className="font-heading text-white text-[28px] font-semibold">Related Articles</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((relPost, i) => (
                <motion.div key={relPost.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Link href={`/blog/${relPost.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      <div className="relative h-[180px] overflow-hidden">
                        <img src={relPost.image} alt={relPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-[#FFD84D] text-[#111111]">{relPost.category}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-[#111111] text-[17px] font-semibold leading-snug group-hover:text-[#14CFC4] transition-colors duration-300 mb-2">{relPost.title}</h3>
                        <p className="text-[#888] text-[12px]">{relPost.readTime}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/blog" className="btn-outline">View All Articles</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
