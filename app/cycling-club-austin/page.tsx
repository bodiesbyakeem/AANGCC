import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cycling Club Austin | All Ass No Gas Cycling Club",
  description:
    "Looking for a cycling club in Austin, Texas? All Ass No Gas Cycling Club is Austin's premier purpose-driven cycling community. Join us for weekly group rides, charity events, and the fight against MS.",
  keywords: ["cycling club Austin", "Austin cycling club", "bike club Austin TX", "cycling groups Austin Texas", "Austin cyclists"],
  openGraph: {
    title: "Cycling Club Austin | AANGCC",
    description: "Austin's most purpose-driven cycling club. Weekly rides, charity events, and a community that shows up for each other.",
    url: "https://www.allassnogascyclingclub.com/cycling-club-austin",
  },
  alternates: { canonical: "https://www.allassnogascyclingclub.com/cycling-club-austin" },
};

export default function CyclingClubAustin() {
  return (
    <div className="min-h-screen pt-[80px]">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "SportsOrganization",
        "name": "All Ass No Gas Cycling Club", "alternateName": "AANGCC",
        "url": "https://www.allassnogascyclingclub.com",
        "description": "Austin's premier purpose-driven cycling club raising thousands for the National MS Society.",
        "address": { "@type": "PostalAddress", "addressLocality": "Austin", "addressRegion": "TX", "addressCountry": "US" },
        "sport": "Cycling",
      }) }} />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-white/50" />
            <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Austin, Texas</span>
          </div>
          <h1 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            The Best Cycling Club in <span className="text-gradient-gold">Austin, Texas</span>
          </h1>
          <p className="text-white/75 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            All Ass No Gas Cycling Club (AANGCC) is Austin's most purpose-driven cycling community. Whether you're a first-time rider or a seasoned cyclist, we have a group for you — and a mission that makes every mile matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Club</Link>
            <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">View Ride Calendar</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 flex flex-col gap-10">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Why AANGCC Is Austin's Premier Cycling Club</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">Finding the right cycling club in Austin can feel overwhelming. There are dozens of groups, varying pace levels, and wildly different cultures. Some clubs are hyper-competitive. Others lack structure. Many come and go within a season. AANGCC is different — and not just because of our name.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">We are a cycling club built on people first. Our riders come from every background, every fitness level, and every corner of Austin. What unites us is not speed or watts — it is a shared belief that cycling should be purposeful, communal, and connected to something bigger than a leaderboard.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">Since our founding, AANGCC has raised over $65,000 for the National Multiple Sclerosis Society through the BP MS 150 and other charity events. We also ride for the Alzheimer's Association and the Austin community at large.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "$65,000+", label: "Raised for MS Society", color: "teal" },
              { value: "3", label: "Annual charity events", color: "gold" },
              { value: "ATX", label: "Proudly Austin-based", color: "teal" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className={`font-heading text-[36px] font-bold mb-2 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#14CFC4]"}`}>{s.value}</div>
                <div className="text-[#888] text-[11px] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Ride Levels for Every Cyclist in Austin</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-6">One of the biggest challenges with cycling clubs in Austin is finding a group that actually fits your pace. AANGCC has structured ride groups designed for every level.</p>
            <div className="flex flex-col gap-4">
              {[
                { name: "Social Butterflies 🦋", desc: "10–15 miles at 10–11.5 mph. A no-drop ride designed for newer cyclists. Nobody gets left behind.", color: "teal" },
                { name: "Roadsters 🚴", desc: "20–30 miles at 11.5–13.5 mph. Ideal for intermediate riders. Regular regroups keep the team together.", color: "gold" },
                { name: "Cyclepaths ⚡", desc: "30+ miles at 13.5–15 mph. Built for experienced riders who want to push their limits.", color: "teal" },
              ].map((group) => (
                <div key={group.name} className={`p-5 rounded-xl border ${group.color === "gold" ? "border-[#FFD84D]/30 bg-[#FFD84D]/[0.05]" : "border-[#14CFC4]/20 bg-[#14CFC4]/[0.05]"}`}>
                  <h3 className={`font-heading text-[18px] font-semibold mb-1 ${group.color === "gold" ? "text-[#b8960a]" : "text-[#14CFC4]"}`}>{group.name}</h3>
                  <p className="text-[#555] text-[13px] leading-relaxed">{group.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[#666] text-[14px] mt-5">Not sure which level is right for you? <Link href="/rides/levels" className="text-[#14CFC4] font-semibold hover:underline">Read our full ride levels guide</Link>.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Weekly Group Rides Across Austin</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">AANGCC runs weekly group rides throughout the Austin metro area. Our regular Saturday morning rides depart from Govalle Neighborhood Park at 8:00 a.m. from May through October — 26 miles, 866 feet of elevation, and a post-ride social at Monkey Nest Coffee on Burnet Road.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">All rides are listed on our <Link href="/rides" className="text-[#14CFC4] font-semibold hover:underline">ride calendar</Link>.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Cycling for a Cause: The AANGCC Mission</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">What separates AANGCC from other cycling clubs in Austin is our commitment to purpose. Every membership tier, every group ride, and every event we host is tied to a larger mission: the fight against Multiple Sclerosis and Alzheimer's disease.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">The <Link href="/rides/ms150" className="text-[#14CFC4] font-semibold hover:underline">BP MS 150</Link> is our flagship event — a two-day, 150-mile ride from Houston to Austin that raises millions for the National MS Society each year.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">We also ride in the <Link href="/rides/alz" className="text-[#14CFC4] font-semibold hover:underline">Ride to End ALZ</Link> at Dripping Springs and the <Link href="/rides/rosedale" className="text-[#14CFC4] font-semibold hover:underline">Rosedale Ride</Link> right here in Austin.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Membership Options for Austin Cyclists</h2>
            <div className="flex flex-col gap-3 mb-5">
              {[
                { name: "Individual", price: "$99/year", desc: "Single adult membership. Anniversary-based renewal. Full ride access." },
                { name: "Family", price: "$149/year", desc: "Up to 3 adults at the same address. Includes a guest pass." },
                { name: "Small Business", price: "$599/year", desc: "1–14 employees. Employee wellness programming through cycling." },
                { name: "Corporate", price: "$1,999/year", desc: "15–99 employees. Full workforce engagement and premium brand recognition." },
              ].map((tier, i) => (
                <div key={tier.name} className={`flex items-center gap-5 p-4 rounded-xl ${i % 2 === 0 ? "bg-[#14CFC4]/[0.05] border border-[#14CFC4]/20" : "bg-[#FFD84D]/[0.05] border border-[#FFD84D]/20"}`}>
                  <div className="flex-1">
                    <div className="text-[#111111] font-semibold text-[14px]">{tier.name}</div>
                    <div className="text-[#888] text-[12px] mt-0.5">{tier.desc}</div>
                  </div>
                  <div className={`font-heading text-[18px] font-bold flex-shrink-0 ${i % 2 === 0 ? "text-[#14CFC4]" : "text-[#b8960a]"}`}>{tier.price}</div>
                </div>
              ))}
            </div>
            <p className="text-[#666] text-[14px]">Ready to join? <Link href="/membership/why-join" className="text-[#14CFC4] font-semibold hover:underline">Learn more about why cyclists choose AANGCC</Link>.</p>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-5">
              {[
                { q: "Do I need to be an experienced cyclist to join?", a: "Not at all. Our Social Butterflies group is specifically designed for new and returning riders. All you need is a road or gravel bike and a willingness to show up." },
                { q: "What kind of bike do I need?", a: "A standard road bike or gravel bike works best. We do not allow mountain bikes, fat tire bikes, triathlon bikes, or tandems on group rides." },
                { q: "Where do your rides start?", a: "Most of our weekly rides start at Govalle Neighborhood Park (5200 Bolm Road, Austin, TX 78721)." },
                { q: "How do I sign up?", a: "Simply join as a member through our membership page. Once you're a member, all ride information and event access is available to you." },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="text-[#111111] font-semibold text-[14px] mb-2">{faq.q}</h3>
                  <p className="text-[#666] text-[13px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
            Austin's cycling community
            <br /><span className="text-gradient-gold">is waiting for you.</span>
          </h2>
          <p className="text-white/70 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            Join AANGCC and become part of a cycling club that rides with purpose, gives back with every mile, and never leaves a rider behind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Club Today</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Ask Us Anything</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/50 text-[12px]">
            <Link href="/austin-cycling-community" className="hover:text-[#FFD84D] transition-colors">Austin Cycling Community</Link>
            <Link href="/charity-cycling-austin" className="hover:text-[#FFD84D] transition-colors">Charity Cycling Austin</Link>
            <Link href="/bike-clubs-austin" className="hover:text-[#FFD84D] transition-colors">Bike Clubs Austin</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
