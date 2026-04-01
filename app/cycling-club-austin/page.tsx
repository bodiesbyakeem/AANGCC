import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cycling Club Austin | All Ass No Gas Cycling Club",
  description:
    "Looking for a cycling club in Austin, Texas? All Ass No Gas Cycling Club is Austin's premier purpose-driven cycling community. Join us for weekly group rides, charity events, and the fight against MS.",
  keywords: [
    "cycling club Austin",
    "Austin cycling club",
    "bike club Austin TX",
    "cycling groups Austin Texas",
    "Austin cyclists",
  ],
  openGraph: {
    title: "Cycling Club Austin | AANGCC",
    description:
      "Austin's most purpose-driven cycling club. Weekly rides, charity events, and a community that shows up for each other.",
    url: "https://www.aangcc.com/cycling-club-austin",
  },
  alternates: {
    canonical: "https://www.aangcc.com/cycling-club-austin",
  },
};

export default function CyclingClubAustin() {
  return (
    <div className="min-h-screen bg-black pt-[72px]">

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "All Ass No Gas Cycling Club",
            "alternateName": "AANGCC",
            "url": "https://www.aangcc.com",
            "logo": "https://www.aangcc.com/images/AANGCC WEB LOGO.png",
            "description": "Austin's premier purpose-driven cycling club raising thousands for the National MS Society.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "sport": "Cycling",
            "foundingLocation": "Austin, Texas",
            "sameAs": [
              "https://www.facebook.com/allassnogascyclingclub",
              "https://www.instagram.com/allassnogascyclingclub",
              "https://www.tiktok.com/@allassnogascyclingclub"
            ]
          }),
        }}
      />

      {/* Hero */}
      <section className="relative py-24 bg-black border-b border-white/[0.06]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(42,157,158,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(42,157,158,0.8) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#2A9D9E]" />
            <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Austin, Texas</span>
          </div>
          <h1 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            The Best Cycling Club in Austin, Texas
          </h1>
          <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            All Ass No Gas Cycling Club (AANGCC) is Austin's most purpose-driven cycling community. Whether you're a first-time rider or a seasoned cyclist, we have a group for you — and a mission that makes every mile matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join The Club</Link>
            <Link href="/rides" className="btn-outline">View Ride Calendar</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <div className="prose prose-invert max-w-none">

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Why AANGCC Is Austin's Premier Cycling Club</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              Finding the right cycling club in Austin can feel overwhelming. There are dozens of groups, varying pace levels, and wildly different cultures. Some clubs are hyper-competitive. Others lack structure. Many come and go within a season. AANGCC is different — and not just because of our name.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              We are a cycling club built on people first. Our riders come from every background, every fitness level, and every corner of Austin. What unites us is not speed or watts — it is a shared belief that cycling should be purposeful, communal, and connected to something bigger than a leaderboard.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10">
              Since our founding, AANGCC has raised over $65,000 for the National Multiple Sclerosis Society through the BP MS 150 and other charity events. We also ride for the Alzheimer's Association and the Austin community at large. Every membership, every donation, and every mile moves us closer to a world free from MS and Alzheimer's disease.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10">
              {[
                { value: "$65,000+", label: "Raised for MS Society", color: "teal" },
                { value: "3", label: "Annual charity events", color: "gold" },
                { value: "ATX", label: "Proudly Austin-based", color: "teal" },
              ].map((s) => (
                <div key={s.label} className={`p-6 rounded-2xl border text-center ${s.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                  <div className={`font-heading text-[40px] font-bold mb-2 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{s.value}</div>
                  <div className="text-white/40 text-[12px] uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Ride Levels for Every Cyclist in Austin</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              One of the biggest challenges with cycling clubs in Austin is finding a group that actually fits your pace. Too many clubs cater exclusively to experienced riders and leave beginners behind — literally. At AANGCC, we have structured ride groups designed for every level.
            </p>

            <div className="flex flex-col gap-4 my-8">
              {[
                { name: "Social Butterflies 🦋", desc: "10–15 miles at 10–11.5 mph. A no-drop ride designed for newer cyclists or anyone looking for a relaxed, social experience. Nobody gets left behind.", color: "teal" },
                { name: "Roadsters 🚴", desc: "20–30 miles at 11.5–13.5 mph. Ideal for intermediate riders or those seeking a solid workout without extreme pace. Regular regroups keep the team together.", color: "gold" },
                { name: "Cyclepaths ⚡", desc: "30+ miles at 13.5–15 mph. Built for experienced riders who want to push their limits. This is a drop ride — so come prepared.", color: "teal" },
              ].map((group) => (
                <div key={group.name} className={`p-6 rounded-2xl border ${group.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                  <h3 className={`font-heading text-[20px] font-semibold mb-2 ${group.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{group.name}</h3>
                  <p className="text-white/55 text-[14px] leading-relaxed">{group.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10">
              Not sure which level is right for you? <Link href="/rides/levels" className="text-[#2A9D9E] hover:text-white transition-colors">Read our full ride levels guide</Link> or just show up to a Social Butterflies ride and let the road tell you where you belong.
            </p>

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Weekly Group Rides Across Austin</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              AANGCC runs weekly group rides throughout the Austin metro area. Our regular Saturday morning rides depart from Govalle Neighborhood Park at 8:00 a.m. from May through October — 26 miles, 866 feet of elevation, and a post-ride social at Monkey Nest Coffee on Burnet Road.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              We also run special event rides throughout the year, including trips to Buescher State Park in Smithville, pre-MS 150 training rides, and community routes that celebrate what Austin has to offer on two wheels.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10">
              All rides are listed on our <Link href="/rides" className="text-[#2A9D9E] hover:text-white transition-colors">ride calendar</Link>. You can filter by category — rides, meetings, and events — and click any event for full details including meeting point, distance, and post-ride social location.
            </p>

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Cycling for a Cause: The AANGCC Mission</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              What separates AANGCC from other cycling clubs in Austin is our commitment to purpose. Every membership tier, every group ride, and every event we host is tied to a larger mission: the fight against Multiple Sclerosis and Alzheimer's disease.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              The <Link href="/rides/ms150" className="text-[#2A9D9E] hover:text-white transition-colors">BP MS 150</Link> is our flagship event — a two-day, 150-mile ride from Houston to Austin that raises millions for the National MS Society each year. AANGCC riders train together for months, fundraise as a team, and cross that finish line as a family.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10">
              We also ride in the <Link href="/rides/alz" className="text-[#2A9D9E] hover:text-white transition-colors">Ride to End ALZ</Link> at Dripping Springs and the <Link href="/rides/rosedale" className="text-[#2A9D9E] hover:text-white transition-colors">Rosedale Ride</Link> right here in Austin. These are not just fitness events — they are commitments to the community.
            </p>

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Membership Options for Austin Cyclists</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              Joining AANGCC is straightforward. We offer four membership tiers designed for individuals, families, small businesses, and corporations. Every tier includes full access to our ride calendar, community, and charity events.
            </p>
            <div className="flex flex-col gap-3 my-8">
              {[
                { name: "Individual", price: "$99/year", desc: "Single adult membership. Anniversary-based renewal. Full ride access." },
                { name: "Family", price: "$149/year", desc: "Up to 3 adults at the same address. Includes a guest pass." },
                { name: "Small Business", price: "$599/year", desc: "1–14 employees. Employee wellness programming through cycling." },
                { name: "Corporate", price: "$1,999/year", desc: "15–99 employees. Full workforce engagement and premium brand recognition." },
              ].map((tier, i) => (
                <div key={tier.name} className={`flex items-center gap-5 p-5 rounded-xl border ${i % 2 === 0 ? "border-white/[0.07] bg-[#141414]" : "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]"}`}>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-[15px]">{tier.name}</div>
                    <div className="text-white/40 text-[13px] mt-1">{tier.desc}</div>
                  </div>
                  <div className={`font-heading text-[20px] font-bold flex-shrink-0 ${i % 2 === 0 ? "text-[#2A9D9E]" : "text-[#FFD84D]"}`}>{tier.price}</div>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10">
              Ready to join? <Link href="/membership/why-join" className="text-[#2A9D9E] hover:text-white transition-colors">Learn more about why cyclists choose AANGCC</Link> or go straight to our <Link href="/membership" className="text-[#2A9D9E] hover:text-white transition-colors">membership page</Link> to get started.
            </p>

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Corporate Sponsorship Opportunities in Austin</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-6">
              AANGCC partners with Austin-area businesses looking to align their brand with a purpose-driven community. Our <Link href="/more/sponsorship" className="text-[#2A9D9E] hover:text-white transition-colors">corporate sponsorship packages</Link> range from $1,000 to $5,000 and include jersey placement, social media exposure, employee wellness perks, and direct community impact.
            </p>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10">
              Previous sponsors include Mercedes-Benz of Austin, Subaru, Infiniti, and Honda. If your company is looking for authentic community engagement — not vanity impressions — we'd love to talk.
            </p>

            <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Frequently Asked Questions About AANGCC</h2>
            <div className="flex flex-col gap-6 mb-10">
              {[
                { q: "Do I need to be an experienced cyclist to join?", a: "Not at all. Our Social Butterflies group is specifically designed for new and returning riders. All you need is a road or gravel bike and a willingness to show up." },
                { q: "What kind of bike do I need?", a: "A standard road bike or gravel bike works best for most of our rides. We do not allow mountain bikes, fat tire bikes, triathlon bikes, or tandems on group rides." },
                { q: "Where do your rides start?", a: "Most of our weekly rides start at Govalle Neighborhood Park (5200 Bolm Road, Austin, TX 78721). Special event rides may have different starting points — always check the ride calendar." },
                { q: "How do I sign up?", a: "Simply join as a member through our membership page. Once you're a member, all ride information and event access is available to you." },
                { q: "Is AANGCC a nonprofit?", a: "AANGCC is a cycling club, not a registered nonprofit. However, all charitable donations made through our fundraising pages go directly to the National MS Society or the Alzheimer's Association." },
              ].map((faq) => (
                <div key={faq.q} className="p-6 rounded-xl border border-white/[0.07] bg-[#141414]">
                  <h3 className="text-white font-semibold text-[15px] mb-3">{faq.q}</h3>
                  <p className="text-white/50 text-[14px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-black border-t border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-[#2A9D9E]/[0.06] blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
            Austin's cycling community
            <br />
            <span className="text-gradient-teal">is waiting for you.</span>
          </h2>
          <p className="text-white/50 text-[16px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            Join AANGCC and become part of a cycling club that rides with purpose, gives back with every mile, and never leaves a rider behind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join The Club Today</Link>
            <Link href="/contact" className="btn-outline">Ask Us Anything</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/30 text-[13px]">
            <Link href="/austin-cycling-community" className="hover:text-[#2A9D9E] transition-colors">Austin Cycling Community</Link>
            <Link href="/charity-cycling-austin" className="hover:text-[#2A9D9E] transition-colors">Charity Cycling Austin</Link>
            <Link href="/bike-clubs-austin" className="hover:text-[#2A9D9E] transition-colors">Bike Clubs Austin</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
