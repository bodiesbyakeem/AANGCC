import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bike Clubs Austin TX | All Ass No Gas Cycling Club",
  description:
    "Looking for bike clubs in Austin, TX? AANGCC is Austin's most purpose-driven cycling club with weekly group rides, charity events, and membership for all skill levels.",
  keywords: [
    "bike clubs Austin",
    "bike clubs near me Austin",
    "Austin bike club",
    "cycling clubs Austin TX",
    "best bike clubs Austin Texas",
  ],
  openGraph: {
    title: "Bike Clubs Austin TX | AANGCC",
    description:
      "Austin's best bike club for all skill levels. Weekly rides, charity events, and a welcoming community that rides with purpose.",
    url: "https://www.aangcc.com/bike-clubs-austin",
  },
  alternates: {
    canonical: "https://www.aangcc.com/bike-clubs-austin",
  },
};

export default function BikeClubsAustin() {
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
            "description": "One of Austin's premier bike clubs, riding for purpose and raising thousands for the National MS Society.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "sport": "Cycling",
            "memberOf": {
              "@type": "Organization",
              "name": "National Multiple Sclerosis Society"
            }
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
            The Best Bike Club Near You in Austin, Texas
          </h1>
          <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            If you're searching for bike clubs in Austin, your search ends here. All Ass No Gas Cycling Club is Austin's most welcoming, purpose-driven cycling community — open to every skill level, every background, and every rider who wants to make their miles mean something.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join AANGCC</Link>
            <Link href="/rides" className="btn-outline">See Upcoming Rides</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">What to Look for in an Austin Bike Club</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Austin has no shortage of bike clubs. From casual weekend cruisers to high-performance road cycling teams, there is a group for almost every kind of rider. But finding the right fit — a club that matches your pace, your values, and your schedule — can take time.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            The best bike clubs in Austin share a few qualities. They have structured ride groups so newer riders do not feel overwhelmed and experienced riders are still challenged. They have a clear culture — one that makes every member feel welcomed and valued regardless of how fast they pedal. And they have a sense of purpose that extends beyond the ride itself.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            AANGCC was designed with all of these qualities in mind. We are not just a cycling group — we are a community, a team, and a family built around shared values and a shared mission.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Why AANGCC Stands Out Among Austin Bike Clubs</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            There are several things that set AANGCC apart from other bike clubs in Austin. The first is our name — which tells you immediately that we are not a club afraid to be different. The second is our mission. While many bike clubs ride for fitness or recreation, AANGCC rides for a cause. Every mile we log contributes to the fight against Multiple Sclerosis and Alzheimer's disease.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
            {[
              { icon: "🎯", title: "Purpose-Driven", desc: "Every ride is tied to a mission. We raise funds for MS and ALZ research — not just miles.", color: "teal" },
              { icon: "🏠", title: "Truly Inclusive", desc: "All skill levels, all backgrounds, all ages 18+. Nobody gets left behind in our no-drop groups.", color: "gold" },
              { icon: "📅", title: "Consistent Schedule", desc: "Weekly rides every Saturday plus special events throughout the year. Always something on the calendar.", color: "teal" },
              { icon: "🤝", title: "Real Community", desc: "Post-ride socials, team dinners, group chats, and friendships that last far beyond the finish line.", color: "gold" },
              { icon: "💼", title: "Business-Friendly", desc: "Small business and corporate memberships bring wellness programming to your entire workforce.", color: "teal" },
              { icon: "📍", title: "Austin-Rooted", desc: "We ride Austin roads, support Austin businesses, and give back to the Austin community we call home.", color: "gold" },
            ].map((item) => (
              <div key={item.title} className={`p-6 rounded-2xl border flex gap-4 ${item.color === "gold" ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]" : "border-white/[0.07] bg-[#141414]"}`}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className={`font-semibold text-[15px] mb-1 ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{item.title}</h3>
                  <p className="text-white/50 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Ride Groups for Every Level</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            One of the most important things to consider when choosing a bike club in Austin is whether they have a ride group that fits your current fitness level. AANGCC has three structured groups — each with clear pace expectations, distance ranges, and drop policies.
          </p>
          <div className="flex flex-col gap-4 my-8">
            {[
              {
                name: "Social Butterflies 🦋",
                pace: "10–11.5 mph · 10–15 miles",
                type: "No Drop",
                color: "teal",
                desc: "Perfect for new cyclists, returning riders, or anyone who wants a fun, supportive ride without pressure. No one gets dropped. We ride together and finish together.",
              },
              {
                name: "Roadsters 🚴",
                pace: "11.5–13.5 mph · 20–30 miles",
                type: "Regroup",
                color: "gold",
                desc: "Ideal for intermediate riders looking to build fitness and confidence. The group regroups at regular intervals so no one falls too far behind.",
              },
              {
                name: "Cyclepaths ⚡",
                pace: "13.5–15 mph · 30+ miles",
                type: "Drop Ride",
                color: "teal",
                desc: "Built for experienced cyclists who want to push their limits. This is a drop ride — riders are expected to keep pace or navigate to the next rest stop independently.",
              },
            ].map((group) => (
              <div key={group.name} className={`p-7 rounded-2xl border ${group.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <h3 className={`font-heading text-white text-[22px] font-semibold`}>{group.name}</h3>
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${group.color === "gold" ? "bg-[#FFD84D]/15 text-[#FFD84D]" : "bg-[#2A9D9E]/15 text-[#2A9D9E]"}`}>{group.type}</span>
                    <span className="text-[10px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-white/[0.05] text-white/40">{group.pace}</span>
                  </div>
                </div>
                <p className="text-white/55 text-[14px] leading-relaxed">{group.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            Not sure which group is right for you? <Link href="/rides/levels" className="text-[#2A9D9E] hover:text-white transition-colors">Read our full ride levels guide</Link> for a complete breakdown of requirements and expectations for each group.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Where AANGCC Rides in Austin</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Austin offers some of the best cycling routes in Texas — and AANGCC takes full advantage. Our weekly Saturday rides start at Govalle Neighborhood Park on the east side of Austin, with routes covering 26 miles and 866 feet of elevation gain through some of the city's most scenic corridors.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            We also venture outside the city limits for special event rides. Buescher State Park in Smithville offers a challenging 22-mile route with 1,584 feet of elevation — a favorite for riders looking to build hill climbing strength ahead of the MS 150. The Ride to End ALZ takes us to Dripping Springs for a 40-mile course through the Hill Country.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            Every ride includes a post-ride social. Our regular Saturday rides end at Monkey Nest Coffee on Burnet Road — one of Austin's most beloved coffee shops and a perfect spot to refuel, reconnect, and debrief on the ride. Special event rides include on-site celebrations or local venue gatherings. Community is built in these moments just as much as on the road.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Membership Options for Austin Cyclists</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Joining AANGCC is easy and accessible at every level. We offer four membership tiers — Individual, Family, Small Business, and Corporate — all designed to give you full access to our rides, events, and community.
          </p>
          <div className="flex flex-col gap-3 my-8">
            {[
              { name: "Individual", price: "$99/year", desc: "Full access for one adult. Weekly rides, events, charity participation, and community membership.", color: "teal" },
              { name: "Family", price: "$149/year", desc: "Up to 3 adults at the same address plus a guest pass for friends and family.", color: "gold" },
              { name: "Small Business", price: "$599/year", desc: "Employee wellness programming for 1–14 employees through structured cycling participation.", color: "teal" },
              { name: "Corporate", price: "$1,999/year", desc: "Full workforce engagement for 15–99 employees with premium brand recognition.", color: "gold" },
            ].map((tier) => (
              <div key={tier.name} className={`flex items-center gap-5 p-5 rounded-xl border ${tier.color === "gold" ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]" : "border-white/[0.07] bg-[#141414]"}`}>
                <div className="flex-1">
                  <div className="text-white font-semibold text-[15px]">{tier.name}</div>
                  <div className="text-white/40 text-[13px] mt-0.5">{tier.desc}</div>
                </div>
                <div className={`font-heading text-[20px] font-bold flex-shrink-0 ${tier.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{tier.price}</div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            All membership dues are electronically debited and based on your anniversary date — not a calendar year. <Link href="/membership" className="text-[#2A9D9E] hover:text-white transition-colors">View full membership details</Link> or <Link href="/membership/why-join" className="text-[#2A9D9E] hover:text-white transition-colors">learn why Austin cyclists choose AANGCC</Link>.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Frequently Asked Questions About Austin Bike Clubs</h2>
          <div className="flex flex-col gap-5 mb-10">
            {[
              { q: "What is the best bike club in Austin for beginners?", a: "AANGCC is one of Austin's most beginner-friendly bike clubs. Our Social Butterflies group runs no-drop rides at 10–11.5 mph, covering 10–15 miles. Nobody gets left behind, and help is always available for flat tires or mechanical issues." },
              { q: "Do Austin bike clubs require a specific type of bike?", a: "AANGCC rides require a standard road or gravel bike. We do not allow mountain bikes, fat tire bikes, triathlon (TT) bikes, tandems, or recumbent bikes on group rides. A helmet is always required." },
              { q: "How often does AANGCC ride?", a: "We run weekly Saturday morning rides from May through October, plus special event rides year-round including the MS 150, Ride to End ALZ, and Rosedale Ride. All rides are listed on our ride calendar." },
              { q: "Is there a social component to Austin bike clubs?", a: "Absolutely. Post-ride socials are a core part of the AANGCC experience. Our regular Saturday rides end at Monkey Nest Coffee on Burnet Road, and special event rides include on-site celebrations or local venue gatherings." },
              { q: "Can my company join as a group?", a: "Yes. Our Small Business ($599/year) and Corporate ($1,999/year) memberships give your employees access to structured wellness programming through cycling. It is a powerful alternative to gym memberships and siloed wellness programs." },
            ].map((faq) => (
              <div key={faq.q} className="p-6 rounded-xl border border-white/[0.07] bg-[#141414]">
                <h3 className="text-white font-semibold text-[15px] mb-3">{faq.q}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Explore Everything AANGCC Has to Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: "About AANGCC", href: "/about", desc: "Our story, our mission, and the meaning behind our name." },
              { label: "Ride Calendar", href: "/rides", desc: "Every upcoming ride, meeting, and event in one place." },
              { label: "Ride Levels", href: "/rides/levels", desc: "Social Butterflies, Roadsters, and Cyclepaths — find your group." },
              { label: "Team Photos", href: "/rides/photos", desc: "163+ photos from our rides and charity events." },
              { label: "MS 150 Team", href: "/rides/ms150", desc: "Join our flagship charity ride from Houston to Austin." },
              { label: "Sponsorship", href: "/more/sponsorship", desc: "Partner with AANGCC as a corporate sponsor." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="p-5 rounded-xl border border-white/[0.07] bg-[#141414] hover:border-[#2A9D9E]/30 transition-colors duration-200 group">
                <div className="text-white font-semibold text-[14px] group-hover:text-[#2A9D9E] transition-colors duration-200 mb-1">{link.label} →</div>
                <div className="text-white/35 text-[12px]">{link.desc}</div>
              </Link>
            ))}
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
            Stop searching for a bike club.
            <br />
            <span className="text-gradient-teal">You just found one.</span>
          </h2>
          <p className="text-white/50 text-[16px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            AANGCC is Austin's most purpose-driven bike club — welcoming riders of every level, riding for causes that matter, and building community one mile at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join AANGCC Today</Link>
            <Link href="/contact" className="btn-outline">Ask Us Anything</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/30 text-[13px]">
            <Link href="/cycling-club-austin" className="hover:text-[#2A9D9E] transition-colors">Cycling Club Austin</Link>
            <Link href="/austin-cycling-community" className="hover:text-[#2A9D9E] transition-colors">Austin Cycling Community</Link>
            <Link href="/charity-cycling-austin" className="hover:text-[#2A9D9E] transition-colors">Charity Cycling Austin</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

