import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Austin Cycling Community | All Ass No Gas Cycling Club",
  description:
    "Join Austin's most purpose-driven cycling community. AANGCC brings together riders of all levels for weekly group rides, charity events, and the fight against MS and Alzheimer's.",
  keywords: ["Austin cycling community", "cycling community Austin TX", "Austin cyclists", "cycling groups Austin", "Austin bike community"],
  openGraph: {
    title: "Austin Cycling Community | AANGCC",
    description: "Austin's most purpose-driven cycling community. Weekly rides, charity events, and a community that shows up for each other.",
    url: "https://www.allassnogascyclingclub.com/austin-cycling-community",
  },
  alternates: { canonical: "https://www.allassnogascyclingclub.com/austin-cycling-community" },
};

export default function AustinCyclingCommunity() {
  return (
    <div className="min-h-screen pt-[80px]">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "SportsOrganization",
        "name": "All Ass No Gas Cycling Club", "alternateName": "AANGCC",
        "url": "https://www.allassnogascyclingclub.com",
        "description": "Austin's premier purpose-driven cycling community raising thousands for the National MS Society and Alzheimer's Association.",
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
            Austin's Cycling Community <span className="text-gradient-gold">Rides With Purpose</span>
          </h1>
          <p className="text-white/75 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            All Ass No Gas Cycling Club is more than a group of riders. We are a movement — built on connection, accountability, and a shared commitment to making every mile matter in the fight against MS and Alzheimer's.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Community</Link>
            <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">View Upcoming Rides</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 flex flex-col gap-10">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">What Makes Austin's Cycling Community Unique</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">Austin has always been a city that moves. From the greenbelt trails winding through South Austin to the rolling hills of the Hill Country just beyond city limits, this is a place where cycling is not just a hobby — it is a lifestyle. And within that lifestyle, community is everything.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">The Austin cycling community is made up of thousands of riders who show up before sunrise, push through summer heat, and celebrate every finish line together. What draws them together is not just the sport — it is the people, the culture, and the shared sense of purpose that comes from riding with others who genuinely care.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">All Ass No Gas Cycling Club was built to be a home for that kind of rider. We are not a club defined by pace or performance. We are defined by values — generosity, humility, accountability, and an unwillingness to quit on the people riding beside us.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#FFD84D]">
            <p className="font-heading text-[#111111] text-[20px] font-semibold leading-relaxed">
              "All Ass No Gas Cycling Club is about fellowship, accountability, and impact. We move together. We grow together. We serve together."
            </p>
            <p className="text-[#14CFC4] text-[13px] mt-4 font-medium">— AANGCC Founding Mission</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Building Community Through Group Rides</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">The foundation of any cycling community is the group ride. AANGCC hosts weekly group rides throughout Austin and the surrounding area — structured, inclusive, and open to all levels.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">Our regular Saturday rides depart from Govalle Neighborhood Park on Austin's east side. These 26-mile routes bring together riders from across the city for a morning of great cycling followed by a social gathering at Monkey Nest Coffee on Burnet Road.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">Every ride is listed on our <Link href="/rides" className="text-[#14CFC4] font-semibold hover:underline">ride calendar</Link> with full details.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">A Community United by Purpose</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">What elevates AANGCC beyond a typical cycling group is the mission that unites every rider. We ride for the National Multiple Sclerosis Society — a cause that touches millions of lives across the United States.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">We also ride for the Alzheimer's Association through the annual <Link href="/rides/alz" className="text-[#14CFC4] font-semibold hover:underline">Ride to End ALZ</Link> in Dripping Springs.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">This shared purpose transforms a cycling club into something more meaningful. When a rider is struggling on a climb, they push through not just for themselves — but for every person their fundraising supports.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-6">How to Become Part of the Austin Cycling Community</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: "01", title: "Choose Your Membership", desc: "Individual ($99), Family ($149), Small Business ($599), or Corporate ($1,999).", color: "teal" },
                { step: "02", title: "Check the Ride Calendar", desc: "Browse upcoming rides, find one that fits your schedule and pace level.", color: "gold" },
                { step: "03", title: "Ride With Your People", desc: "Join a group of riders who will push you, support you, and celebrate every mile.", color: "teal" },
                { step: "04", title: "Make an Impact", desc: "Your membership and fundraising efforts go toward the fight against MS and Alzheimer's.", color: "gold" },
              ].map((step) => (
                <div key={step.step} className={`p-6 rounded-xl border flex flex-col gap-2 ${step.color === "gold" ? "border-[#FFD84D]/30 bg-[#FFD84D]/[0.04]" : "border-[#14CFC4]/20 bg-[#14CFC4]/[0.04]"}`}>
                  <span className={`font-heading text-[36px] font-bold leading-none opacity-25 ${step.color === "gold" ? "text-[#b8960a]" : "text-[#14CFC4]"}`}>{step.step}</span>
                  <h3 className="text-[#111111] font-semibold text-[15px]">{step.title}</h3>
                  <p className="text-[#666] text-[13px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-5">Community Values That Define AANGCC</h2>
            <div className="flex flex-col gap-4">
              {[
                { title: "No Rider Left Behind", desc: "In our no-drop groups, we do not leave people behind. If someone is struggling, we slow down, check in, and bring them home together." },
                { title: "Diversity and Inclusion", desc: "AANGCC welcomes riders of every race, gender, religion, background, and orientation. We stand united against all forms of discrimination." },
                { title: "Accountability", desc: "We show up. We come prepared. Reliability is how trust is built in a cycling community." },
                { title: "Service Above Self", desc: "Our mission is not just fitness. It is service — to our riders, to the MS community, and to the city of Austin." },
              ].map((value) => (
                <div key={value.title} className="p-5 rounded-xl border border-[#14CFC4]/20 bg-[#14CFC4]/[0.03]">
                  <h3 className="text-[#14CFC4] font-semibold text-[14px] mb-1">{value.title}</h3>
                  <p className="text-[#555] text-[13px] leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "About AANGCC", href: "/about", desc: "Our story, mission, and the meaning behind our name." },
              { label: "Ride Calendar", href: "/rides", desc: "Every upcoming ride, meeting, and event." },
              { label: "Ride Levels", href: "/rides/levels", desc: "Find the right pace group for your level." },
              { label: "Team Photos", href: "/rides/photos", desc: "163+ photos from our rides and events." },
              { label: "MS 150 Team", href: "/rides/ms150", desc: "Join our flagship charity ride." },
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
            Be part of Austin's
            <br /><span className="text-gradient-gold">cycling community.</span>
          </h2>
          <p className="text-white/70 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            AANGCC is open to every rider who shows up with heart. Join us and ride for something bigger than yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join AANGCC Today</Link>
            <Link href="/rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">View Ride Calendar</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/50 text-[12px]">
            <Link href="/cycling-club-austin" className="hover:text-[#FFD84D] transition-colors">Cycling Club Austin</Link>
            <Link href="/charity-cycling-austin" className="hover:text-[#FFD84D] transition-colors">Charity Cycling Austin</Link>
            <Link href="/bike-clubs-austin" className="hover:text-[#FFD84D] transition-colors">Bike Clubs Austin</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
