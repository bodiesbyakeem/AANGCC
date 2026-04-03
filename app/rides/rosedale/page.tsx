"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

function PageHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2026 ROSEDALE RIDE 1.jpg')" }} />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Community Ride</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          The <span className="text-gradient-gold">Rosedale Ride</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="font-heading text-white/70 text-[18px] lg:text-[24px] mb-6">
          Supporting The Rosedale School · Austin, Texas
        </motion.p>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-white/75 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed">
          The Rosedale Ride keeps us rooted in the Austin community we love. Every mile we ride supports students with disabilities and complex medical needs at The Rosedale School.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Ride With Us</Link>
          <Link href="/more/donate" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Make a Donation</Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#14CFC4]/50 to-transparent pointer-events-none" />
    </section>
  );
}

function AboutTheRide() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">About the Ride</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 3vw, 48px)" }}>
              Rooted in <span className="text-gradient-gold">Austin.</span>
            </h2>
            <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
              <p>The Rosedale Ride is AANGCC's community event right here in Austin. It keeps us connected to the city we call home and committed to causes that matter to our neighbors.</p>
              <p>Supporting The Rosedale School is important to the club because funds raised support students with disabilities and complex medical needs — children who deserve every opportunity to thrive.</p>
              <p>Every pedal stroke in the Rosedale Ride is an investment in Austin's future — in the children who will shape this city for generations to come.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img src="/images/2026 ROSEDALE RIDE 1.jpg" alt="Rosedale Ride" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
              <div className="font-heading text-[#14CFC4] text-[24px] font-bold leading-none">Rosedale</div>
              <div className="text-[#111111] text-[11px] tracking-wide uppercase mt-1 font-medium">Annual Community Ride</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutTheSchool() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">Why We Ride</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Supporting <span className="text-gradient-gold">The Rosedale School</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "🎓", title: "Students with Disabilities", body: "The Rosedale School serves students with a wide range of disabilities and complex medical needs, providing specialized education and support." },
            { icon: "❤️", title: "Life-Changing Programs", body: "Funds raised through the Rosedale Ride support programs that give students the tools, therapies, and opportunities they need to succeed." },
            { icon: "🏙️", title: "Austin Community", body: "The Rosedale School has been part of the Austin community for decades. Supporting it means investing in the heart of our city." },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-heading text-[#111111] text-[22px] font-semibold group-hover:text-[#14CFC4] transition-colors duration-300">{item.title}</h3>
              <p className="text-[#666] text-[13px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.div key={n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: n * 0.06 }}
              className="relative rounded-xl overflow-hidden aspect-square shadow-md group"
            >
              <img src={`/images/2026 ROSEDALE RIDE ${n}.jpg`} alt={`Rosedale Ride ${n}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RosedaleCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/2026 ROSEDALE RIDE 3.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
          Ride for <span className="text-gradient-gold">Austin's future.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="text-white/75 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
          Join AANGCC for the Rosedale Ride and help support students with disabilities right here in Austin.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Club</Link>
          <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">View Ride Calendar</Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function RosedalePage() {
  return (
    <>
      <PageHero />
      <AboutTheRide />
      <AboutTheSchool />
      <RosedaleCTA />
    </>
  );
}

