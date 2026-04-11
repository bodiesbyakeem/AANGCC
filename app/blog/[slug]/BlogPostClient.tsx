"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

function getCtaConfig(category: string) {
  switch (category) {
    case "Beginner":
      return {
        heading: "New to cycling in Austin?",
        body: "AANGCC welcomes riders of all levels. Join our no-drop rides and build your confidence alongside Austin's most supportive cycling community.",
        links: [
          { label: "Join The Club", href: "/membership/join", primary: true },
          { label: "View Ride Levels", href: "/rides/levels", primary: false },
        ],
      };
    case "Community":
      return {
        heading: "Ride for something bigger.",
        body: "Every mile AANGCC rides supports the fight against MS, Alzheimer's disease, and the students at Rosedale School in Austin. Join us or donate today.",
        links: [
          { label: "Support MS ALZ RR", href: "/donate", primary: true },
          { label: "Who We Support", href: "/about/we-support", primary: false },
        ],
      };
    case "Advanced":
    case "Intermediate":
      return {
        heading: "Ready to push your limits?",
        body: "AANGCC's training rides will challenge you — from 26-mile Saturday rides to the 156-mile MS 150 from Austin to College Station. Find your group and get moving.",
        links: [
          { label: "View Ride Calendar", href: "/rides", primary: true },
          { label: "Become a Member", href: "/membership/join", primary: false },
        ],
      };
    default:
      return {
        heading: "Ready to ride with AANGCC?",
        body: "Join Austin's most purpose-driven cycling community. Every mile matters — for your health, your community, and the fight against MS.",
        links: [
          { label: "Join The Club", href: "/membership/join", primary: true },
          { label: "View Ride Calendar", href: "/rides", primary: false },
        ],
      };
  }
}

export default function BlogPostClient({ slug }: { slug: string }) {
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
  const cta = getCtaConfig(post.category);

  return (
    <div className="min-h-screen pt-[80px]">

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${post.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 pb-14 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-5 text-[12px] text-white/60">
              <Link href="/" className="hover:text-[#FFD84D] transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <Link href="/blog" className="hover:text-[#FFD84D] transition-colors">Blog</Link>
              <span className="text-white/30">/</span>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D] text-[#111111]">{post.category}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
            </nav>

            <h1 className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(28px, 5vw, 60px)" }}>{post.title}</h1>
            <div className="flex items-center gap-4 text-white/55 text-[13px] flex-wrap">
              <span>{post.author || "AANGCC"}</span>
              <span>·</span>
              <span>{post.date || "2025"}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              {post.date && <><span>·</span><span>Last updated: {post.date}</span></>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-16">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>

            {/* Author block */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/15">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center flex-shrink-0">
                <img src="/images/club-logo.png" alt="AANGCC" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <p className="text-white font-semibold text-[14px]">All Ass No Gas Cycling Club</p>
                <p className="text-white/50 text-[12px]">Austin, Texas · Cycling & Community</p>
              </div>
            </div>

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
                 <p>From weekly Saturday morning group rides in Austin at Govalle Neighborhood Park to the annual Texas Bike MS 150 from Austin to College Station, AANGCC's calendar is built around meaningful milestones — both on the road and in the community. Whether you're navigating the hills of Central Texas or riding through the heat of an Austin summer, AANGCC riders show up together.</p>
                  <p>If you're looking for a cycling club in Austin that challenges you physically, connects you to Austin's charity ride culture, and gives you a reason to ride beyond personal fitness — AANGCC is your home.</p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap gap-2">
              {["AANGCC", "Austin Cycling", post.category, "MS Society", "Austin Texas"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white/60 text-[11px] font-medium tracking-wide">
                  #{tag.toLowerCase().replace(/\s+/g, "")}
                </span>
              ))}
            </div>

            {/* Author block bottom */}
            <div className="mt-12 p-6 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center flex-shrink-0">
                <img src="/images/club-logo.png" alt="AANGCC" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <p className="text-white font-semibold text-[15px] mb-0.5">Written by All Ass No Gas Cycling Club</p>
                <p className="text-white/55 text-[13px] leading-relaxed">Austin, Texas · Raising funds for the MS Society, Alzheimer's Association, and Rosedale School since our founding. Over $93,000 raised and counting. Proud to serve the Austin cycling community on the roads of Central Texas.</p>
              </div>
            </div>

            {/* Local footer module */}
            <div className="mt-8 p-6 rounded-2xl border border-[#14CFC4]/30 bg-[#14CFC4]/5">
              <p className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">Based in Austin, Texas</p>
              <h4 className="font-heading text-white text-[20px] font-semibold mb-2">Ride with AANGCC in Austin, Texas</h4>
              <p className="text-white/60 text-[13px] leading-relaxed mb-5">
                From group rides in Austin's neighborhoods to charity cycling events across Central Texas — AANGCC is where purpose meets the pavement. Join our community of riders who show up every Saturday and give back every mile.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Join Membership", href: "/membership/join" },
                  { label: "Ride Calendar", href: "/rides" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <Link key={link.href} href={link.href}
                    className="px-4 py-2 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-bold tracking-wide uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dynamic CTA */}
            <div className="mt-10 bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-8 text-center">
                <h3 className="font-heading text-[#111111] text-[26px] font-semibold mb-3">{cta.heading}</h3>
                <p className="text-[#666] text-[14px] mb-6 max-w-[440px] mx-auto leading-relaxed">{cta.body}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {cta.links.map((link) => (
                    <Link key={link.href} href={link.href}
                      className={`inline-flex items-center justify-center px-8 py-3 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-colors duration-300 ${link.primary
                        ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"
                        : "border-2 border-[#14CFC4] text-[#14CFC4] hover:bg-[#14CFC4] hover:text-white"
                      }`}>
                      {link.label}
                    </Link>
                  ))}
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
