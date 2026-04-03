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
    <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Our Mission</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Who We <span className="text-gradient-gold">Support</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/80 text-[17px] lg:text-[20px] max-w-[640px] mx-auto leading-relaxed">
          Every mile we ride supports causes that matter deeply to our community. Here are the organizations we proudly ride for.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#14CFC4]/50 to-transparent pointer-events-none" />
    </section>
  );
}

function MSSection() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Flagship Cause</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              National Multiple
              <br /><span className="text-gradient-gold">Sclerosis Society</span>
            </h2>
            <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
              <p>Multiple Sclerosis is a potentially disabling disease of the brain and spinal cord. In MS, the immune system attacks the protective sheath that covers nerve fibers, causing communication problems between the brain and the rest of the body.</p>
              <p>Nearly 1 million Americans are living with MS. The National MS Society leads the way to end MS and all other dementia — through accelerating research, driving risk reduction and early detection, and maximizing quality care and support.</p>
              <p>AANGCC has supported the National MS Society through the BP MS 150 since our founding — raising over $65,000 and counting. Every dollar raised goes directly toward MS research, programs, and advocacy.</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "1M", label: "Americans with MS" },
                { value: "$65K+", label: "Raised by AANGCC" },
                { value: "100%", label: "Goes to MS Society" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-md">
                  <div className="font-heading text-[#14CFC4] text-[24px] font-bold mb-1">{stat.value}</div>
                  <div className="text-[#888] text-[10px] tracking-wide uppercase leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Donate to MS Team</a>
              <Link href="/rides/ms150" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">MS 150 Team Page</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img src="/images/2025 MS 150 48.jpg" alt="AANGCC MS 150 Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-heading text-white text-[20px] font-semibold">BP MS 150</div>
                <div className="text-white/70 text-[13px]">Houston → Austin · 150 Miles · 2 Days</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ALZSection() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img src="/images/2025 ALZ RIDE 1.jpg" alt="AANGCC ALZ Ride Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-heading text-white text-[20px] font-semibold">Ride to End ALZ</div>
                <div className="text-white/70 text-[13px]">Dripping Springs, Texas · 40 Miles</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-white/60" />
              <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Annual Ride</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Alzheimer's
              <br /><span className="text-gradient-gold">Association</span>
            </h2>
            <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
              <p>Alzheimer's disease is the most common cause of dementia — accounting for 60–80% of dementia cases. It is a disease that robs people of their memories, their independence, and ultimately their lives.</p>
              <p>6.7 million Americans are currently living with Alzheimer's disease. The Alzheimer's Association is the leading voluntary health organization in Alzheimer's care, support, and research.</p>
              <p>AANGCC rides in the annual Ride to End ALZ at Dripping Springs, Texas — a 40-mile course with 2,434 feet of elevation gain. The post-ride celebration is sponsored by H.E.B. and brings the entire community together at the finish line.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Donate to ALZ Team</a>
              <Link href="/rides/alz" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">ALZ Ride Team Page</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RosedaleSection() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Community Ride</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              The Rosedale
              <br /><span className="text-gradient-gold">School</span>
            </h2>
            <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
              <p>The Rosedale School is an Austin Independent School District campus serving students with disabilities and complex medical needs. It is one of Austin's most vital educational institutions — and one that holds a special place in the heart of AANGCC.</p>
              <p>The Rosedale Ride keeps us rooted in the Austin community we love. Supporting The Rosedale School is important to the club because funds raised support students with disabilities and complex medical needs who deserve every opportunity to thrive.</p>
              <p>Every pedal stroke in the Rosedale Ride is an investment in Austin's future — in the children who will shape this city for generations to come.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/rides/rosedale" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Rosedale Ride Page</Link>
              <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">View Ride Calendar</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img src="/images/2026 ROSEDALE RIDE 1.jpg" alt="Rosedale Ride" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-heading text-white text-[20px] font-semibold">Rosedale Ride</div>
                <div className="text-white/70 text-[13px]">Austin, Texas · Annual Community Ride</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WeSupportCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 block">Join the Fight</span>
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            Ride for something
            <br /><span className="text-gradient-gold">that matters.</span>
          </h2>
          <p className="text-white/75 text-[15px] mb-10 max-w-[500px] mx-auto leading-relaxed">
            Join AANGCC and help us fight MS, Alzheimer's, and support the Austin community we love — one mile at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Club</Link>
            <Link href="/more/donate" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Make a Donation</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function WeSupportPage() {
  return (
    <>
      <PageHero />
      <MSSection />
      <ALZSection />
      <RosedaleSection />
      <WeSupportCTA />
    </>
  );
}

