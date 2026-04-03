import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bike Clubs Austin TX | All Ass No Gas Cycling Club",
  description:
    "Looking for bike clubs in Austin, TX? AANGCC is Austin's most purpose-driven cycling club with weekly group rides, charity events, and membership for all skill levels.",
  keywords: ["bike clubs Austin", "bike clubs near me Austin", "Austin bike club", "cycling clubs Austin TX", "best bike clubs Austin Texas"],
  openGraph: {
    title: "Bike Clubs Austin TX | AANGCC",
    description: "Austin's best bike club for all skill levels. Weekly rides, charity events, and a welcoming community that rides with purpose.",
    url: "https://www.allassnogascyclingclub.com/bike-clubs-austin",
  },
  alternates: { canonical: "https://www.allassnogascyclingclub.com/bike-clubs-austin" },
};

export default function BikeClubsAustin() {
  return (
    <div className="min-h-screen pt-[80px]">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "SportsOrganization",
        "name": "All Ass No Gas Cycling Club", "alternateName": "AANGCC",
        "url": "https://www.allassnogascyclingclub.com",
        "description": "One of Austin's premier bike clubs, riding for purpose and raising thousands for the National MS Society.",
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
            The Best Bike Club <span className="text-gradient-gold">Near You in Austin</span>
          </h1>
          <p className="text-white/75 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            If you're searching for bike clubs in Austin, your search ends here. All Ass No Gas Cycling Club is Austin's most welcoming, purpose-driven cycling community — open to every skill level and every rider who wants to make their miles mean something.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join AANGCC</Link>
            <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">See Upcoming Rides</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 flex flex-col gap-10">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">What to Look for in an Austin Bike Club</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">Austin has no shortage of bike clubs. From casual weekend cruisers to high-performance road cycling teams, there is a group for almost every kind of rider. But finding the right fit — a club that matches your pace, your values, and your schedule — can take time.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">The best bike clubs in Austin share a few qualities. They have structured ride groups so newer riders do not feel overwhelmed and experienced riders are still challenged. They have a clear culture — one that makes every member feel welcomed and valued. And they have a sense of purpose that extends beyond the ride itself.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">AANGCC was designed with all of these qualities in mind. We are not just a cycling group — we are a community, a team, and a family built around shared values and a shared mission.</p>
          </div>

          {/* What sets AANGCC apart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🎯", title: "Purpose-Driven", desc: "Every ride is tied to a mission. We raise funds for MS and ALZ research — not just miles.", color: "teal" },
              { icon: "🏠", title: "Truly Inclusive", desc: "All skill levels, all backgrounds, all ages 18+. Nobody gets left behind in our no-drop groups.", color: "gold" },
              { icon: "📅", title: "Consistent Schedule", desc: "Weekly rides every Saturday plus special events throughout the year.", color: "teal" },
              { icon: "🤝", title: "Real Community", desc: "Post-ride socials, team dinners, group chats, and friendships that last far beyond the finish line.", color: "gold" },
              { icon: "💼", title: "Business-Friendly", desc: "Small business and corporate memberships bring wellness programming to your entire workforce.", color: "teal" },
              { icon: "📍", title: "Austin-Rooted", desc: "We ride Austin roads, support Austin businesses, and give back to the Austin community we call home.", color: "gold" },
            ].map((item) => (
              <div key={item.title} className={`p-5 rounded-xl border flex gap-4 bg-white shadow-md ${item.color === "gold" ? "border-[#FFD84D]/20" : "border-[#14CFC4]/20"}`}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className={`font-semibold text-[14px] mb-1 ${item.color === "gold" ? "text-[#b8960a]" : "text-[#14CFC4]"}`}>{item.title}</h3>
                  <p className="text-[#555] text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-5">Ride Groups for Every Level</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-5">AANGCC has three structured groups — each with clear pace expectations, distance ranges, and drop policies.</p>
            <div className="flex flex-col gap-4">
              {[
                { name: "Social Butterflies 🦋", pace: "10–11.5 mph · 10–15 miles", type: "No Drop", color: "teal", desc: "Perfect for new cyclists, returning riders, or anyone who wants a fun, supportive ride without pressure. No one gets dropped. We ride together and finish together." },
                { name: "Roadsters 🚴", pace: "11.5–13.5 mph · 20–30 miles", type: "Regroup", color: "gold", desc: "Ideal for intermediate riders looking to build fitness and confidence. The group regroups at regular intervals so no one falls too far behind." },
                { name: "Cyclepaths ⚡", pace: "13.5–15 mph · 30+ miles", type: "Drop Ride", color: "teal", desc: "Built for experienced cyclists who want to push their limits. Riders are expected to keep pace or navigate to the next rest stop independently." },
              ].map((group) => (
                <div key={group.name} className={`p-6 rounded-xl border ${group.color === "gold" ? "border-[#FFD84D]/25 bg-[#FFD84D]/[0.04]" : "border-[#14CFC4]/20 bg-[#14CFC4]/[0.04]"}`}>
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <h3 className="font-heading text-white text-[20px] font-semibold">{group.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${group.color === "gold" ? "bg-[#FFD84D]/20 text-[#FFD84D]" : "bg-[#14CFC4]/20 text-[#14CFC4]"}`}>{group.type}</span>
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/10 text-white/60">{group.pace}</span>
                    </div>
                  </div>
                  <p className="text-white/65 text-[13px] leading-relaxed">{group.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[#666] text-[13px] mt-5">Not sure which group is right for you? <Link href="/rides/levels" className="text-[#14CFC4] font-semibold hover:underline">Read our full ride levels guide</Link>.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Membership Options for Austin Cyclists</h2>
            <div className="flex flex-col gap-3 mb-5">
              {[
                { name: "Individual", price: "$99/year", desc: "Full access for one adult. Weekly rides, events, charity participation, and community membership.", color: "teal" },
                { name: "Family", price: "$149/year", desc: "Up to 3 adults at the same address plus a guest pass for friends and family.", color: "gold" },
                { name: "Small Business", price: "$599/year", desc: "Employee wellness programming for 1–14 employees through structured cycling participation.", color: "teal" },
                { name: "Corporate", price: "$1,999/year", desc: "Full workforce engagement for 15–99 employees with premium brand recognition.", color: "gold" },
              ].map((tier) => (
                <div key={tier.name} className={`flex items-center gap-4 p-4 rounded-xl ${tier.color === "gold" ? "border border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border border-[#14CFC4]/20 bg-[#14CFC4]/[0.03]"}`}>
                  <div className="flex-1">
                    <div className="text-[#111111] font-semibold text-[14px]">{tier.name}</div>
                    <div className="text-[#888] text-[12px] mt-0.5">{tier.desc}</div>
                  </div>
                  <div className={`font-heading text-[18px] font-bold flex-shrink-0 ${tier.color === "gold" ? "text-[#b8960a]" : "text-[#14CFC4]"}`}>{tier.price}</div>
                </div>
              ))}
            </div>
            <p className="text-[#666] text-[13px]"><Link href="/membership" className="text-[#14CFC4] font-semibold hover:underline">View full membership details</Link> or <Link href="/membership/why-join" className="text-[#14CFC4] font-semibold hover:underline">learn why Austin cyclists choose AANGCC</Link>.</p>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-6">Frequently Asked Questions About Austin Bike Clubs</h2>
            <div className="flex flex-col gap-5">
              {[
                { q: "What is the best bike club in Austin for beginners?", a: "AANGCC is one of Austin's most beginner-friendly bike clubs. Our Social Butterflies group runs no-drop rides at 10–11.5 mph, covering 10–15 miles. Nobody gets left behind." },
                { q: "Do Austin bike clubs require a specific type of bike?", a: "AANGCC rides require a standard road or gravel bike. We do not allow mountain bikes, fat tire bikes, triathlon bikes, tandems, or recumbent bikes. A helmet is always required." },
                { q: "How often does AANGCC ride?", a: "We run weekly Saturday morning rides from May through October, plus special event rides year-round including the MS 150, Ride to End ALZ, and Rosedale Ride." },
                { q: "Is there a social component to Austin bike clubs?", a: "Absolutely. Post-ride socials are a core part of the AANGCC experience. Our regular Saturday rides end at Monkey Nest Coffee on Burnet Road." },
                { q: "Can my company join as a group?", a: "Yes. Our Small Business ($599/year) and Corporate ($1,999/year) memberships give your employees access to structured wellness programming through cycling." },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="text-[#111111] font-semibold text-[14px] mb-2">{faq.q}</h3>
                  <p className="text-[#666] text-[13px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "About AANGCC", href: "/about", desc: "Our story, our mission, and the meaning behind our name." },
              { label: "Ride Calendar", href: "/rides", desc: "Every upcoming ride, meeting, and event in one place." },
              { label: "Ride Levels", href: "/rides/levels", desc: "Social Butterflies, Roadsters, and Cyclepaths — find your group." },
              { label: "Team Photos", href: "/rides/photos", desc: "163+ photos from our rides and charity events." },
              { label: "MS 150 Team", href: "/rides/ms150", desc: "Join our flagship charity ride from Houston to Austin." },
              { label: "Sponsorship", href: "/more/sponsorship", desc: "Partner with AANGCC as a corporate sponsor." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="p-5 rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-lg hover:border-[#14CFC4]/30 transition-all duration-200 group">
                <div className="text-[#111111] font-semibold text-[14px] group-hover:text-[#14CFC4] transition-colors duration-200 mb-1">{link.label} →</div>
                <div className="text-[#888] text-[12px]">{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
          <h2 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
            Stop searching for a bike club.
            <br /><span className="text-gradient-gold">You just found one.</span>
          </h2>
          <p className="text-white/70 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            AANGCC is Austin's most purpose-driven bike club — welcoming riders of every level, riding for causes that matter, and building community one mile at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join AANGCC Today</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Ask Us Anything</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/50 text-[12px]">
            <Link href="/cycling-club-austin" className="hover:text-[#FFD84D] transition-colors">Cycling Club Austin</Link>
            <Link href="/austin-cycling-community" className="hover:text-[#FFD84D] transition-colors">Austin Cycling Community</Link>
            <Link href="/charity-cycling-austin" className="hover:text-[#FFD84D] transition-colors">Charity Cycling Austin</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
