import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Austin Cycling Community | All Ass No Gas Cycling Club",
  description:
    "Join Austin's most purpose-driven cycling community. AANGCC brings together riders of all levels for weekly group rides, charity events, and the fight against MS and Alzheimer's.",
  keywords: [
    "Austin cycling community",
    "cycling community Austin TX",
    "Austin cyclists",
    "cycling groups Austin",
    "Austin bike community",
  ],
  openGraph: {
    title: "Austin Cycling Community | AANGCC",
    description:
      "Austin's most purpose-driven cycling community. Weekly rides, charity events, and a community that shows up for each other.",
    url: "https://www.aangcc.com/austin-cycling-community",
  },
  alternates: {
    canonical: "https://www.aangcc.com/austin-cycling-community",
  },
};

export default function AustinCyclingCommunity() {
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
            "description": "Austin's premier purpose-driven cycling community raising thousands for the National MS Society and Alzheimer's Association.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "sport": "Cycling",
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
            Austin's Cycling Community Rides With Purpose
          </h1>
          <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            All Ass No Gas Cycling Club is more than a group of riders. We are a movement — built on connection, accountability, and a shared commitment to making every mile matter in the fight against MS and Alzheimer's.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join The Community</Link>
            <Link href="/rides" className="btn-outline">View Upcoming Rides</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">What Makes Austin's Cycling Community Unique</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Austin has always been a city that moves. From the greenbelt trails winding through South Austin to the rolling hills of the Hill Country just beyond city limits, this is a place where cycling is not just a hobby — it is a lifestyle. And within that lifestyle, community is everything.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            The Austin cycling community is made up of thousands of riders who show up before sunrise, push through summer heat, and celebrate every finish line together. What draws them together is not just the sport — it is the people, the culture, and the shared sense of purpose that comes from riding with others who genuinely care.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            All Ass No Gas Cycling Club was built to be a home for that kind of rider. We are not a club defined by pace or performance. We are defined by values — generosity, humility, accountability, and an unwillingness to quit on the people riding beside us.
          </p>

          <div className="p-8 rounded-2xl border border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.04] my-10">
            <p className="font-heading text-white text-[20px] font-semibold leading-relaxed">
              "All Ass No Gas Cycling Club is about fellowship, accountability, and impact. We move together. We grow together. We serve together."
            </p>
            <p className="text-[#2A9D9E] text-[13px] mt-4 font-medium">— AANGCC Founding Mission</p>
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Building Community Through Group Rides</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            The foundation of any cycling community is the group ride. It is where friendships are built, fitness improves, and riders learn what it means to show up for one another. AANGCC hosts weekly group rides throughout Austin and the surrounding area — structured, inclusive, and open to all levels.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Our regular Saturday rides depart from Govalle Neighborhood Park on Austin's east side. These 26-mile routes bring together riders from across the city for a morning of great cycling followed by a social gathering at Monkey Nest Coffee on Burnet Road. It is not just about the miles — it is about the conversation, the laughter, and the connections made over coffee after the ride.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            We also organize special event rides throughout the year — from scenic routes through Buescher State Park in Smithville to training rides leading up to the BP MS 150. Every event is listed on our <Link href="/rides" className="text-[#2A9D9E] hover:text-white transition-colors">ride calendar</Link> with full details.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">A Community United by Purpose</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            What elevates AANGCC beyond a typical cycling group is the mission that unites every rider. We ride for the National Multiple Sclerosis Society — a cause that touches millions of lives across the United States. Nearly 1 million Americans are living with MS, and the research, programs, and advocacy funded by donations like ours are making a measurable difference.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            We also ride for the Alzheimer's Association through the annual <Link href="/rides/alz" className="text-[#2A9D9E] hover:text-white transition-colors">Ride to End ALZ</Link> in Dripping Springs. With 6.7 million Americans living with Alzheimer's, every pedal stroke in support of this cause carries real weight.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            This shared purpose transforms a cycling club into something more meaningful. When a rider is struggling on a climb, they push through not just for themselves — but for every person their fundraising supports. That is the power of community tied to cause.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">How to Become Part of the Austin Cycling Community</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Joining Austin's cycling community through AANGCC is simple. Our membership is open to adults 18 and older, and we offer tiers for individuals, families, small businesses, and corporations. There are no fitness tests, no tryouts, and no ego — just a commitment to showing up and giving your best effort.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
            {[
              { step: "01", title: "Choose Your Membership", desc: "Select the tier that fits your situation — Individual ($99), Family ($149), Small Business ($599), or Corporate ($1,999).", color: "teal" },
              { step: "02", title: "Check the Ride Calendar", desc: "Browse upcoming rides, find one that fits your schedule and pace level, and show up ready to roll.", color: "gold" },
              { step: "03", title: "Ride With Your People", desc: "Join a group of riders who will push you, support you, and celebrate every mile with you.", color: "teal" },
              { step: "04", title: "Make an Impact", desc: "Your membership and fundraising efforts go directly toward the fight against MS and Alzheimer's.", color: "gold" },
            ].map((step) => (
              <div key={step.step} className={`p-7 rounded-2xl border flex flex-col gap-3 ${step.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                <span className={`font-heading text-[40px] font-bold leading-none opacity-30 ${step.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{step.step}</span>
                <h3 className="text-white font-semibold text-[16px]">{step.title}</h3>
                <p className="text-white/45 text-[13px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Community Values That Define AANGCC</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Austin's cycling community is only as strong as the values its members bring to every ride. At AANGCC, we hold ourselves to a clear set of principles that shape how we ride, how we communicate, and how we treat one another.
          </p>
          <div className="flex flex-col gap-4 my-8">
            {[
              { title: "No Rider Left Behind", desc: "In our no-drop groups, we do not leave people behind. If someone is struggling, we slow down, check in, and bring them home together." },
              { title: "Diversity and Inclusion", desc: "AANGCC welcomes riders of every race, gender, religion, background, and orientation. We stand united against all forms of discrimination." },
              { title: "Accountability", desc: "We show up. We come prepared. We do not make our teammates absorb preventable mistakes. Reliability is how trust is built in a cycling community." },
              { title: "Service Above Self", desc: "Our mission is not just fitness. It is service — to our riders, to the MS community, and to the city of Austin that gives us roads to ride." },
            ].map((value) => (
              <div key={value.title} className="p-6 rounded-xl border border-white/[0.07] bg-[#141414]">
                <h3 className="text-[#2A9D9E] font-semibold text-[15px] mb-2">{value.title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Supporting Austin Businesses Through Cycling</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            AANGCC is proud to be deeply rooted in the Austin business community. Our <Link href="/more/sponsorship" className="text-[#2A9D9E] hover:text-white transition-colors">corporate sponsorship program</Link> allows local and national brands to align with a cause-driven cycling community that genuinely resonates with Austin residents.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Sponsors receive real exposure — on jerseys, at events, across social media, and through direct community engagement. More importantly, they become part of a story that Austin talks about. That kind of authentic brand alignment is impossible to buy through traditional advertising.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            Our Small Business and Corporate membership tiers also give local companies a way to invest in employee wellness through cycling — reducing healthcare costs, improving morale, and building team cohesion one ride at a time.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Explore More of the AANGCC Community</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: "About AANGCC", href: "/about", desc: "Learn our story, our mission, and the meaning behind our name." },
              { label: "Ride Levels", href: "/rides/levels", desc: "Find the right pace group for your current fitness level." },
              { label: "Team Photos", href: "/rides/photos", desc: "Browse 163+ photos from our rides and events." },
              { label: "Blog", href: "/blog", desc: "Training tips, community stories, and cycling wisdom." },
              { label: "We Support", href: "/about/we-support", desc: "Learn about the causes we ride for every year." },
              { label: "FAQ", href: "/faq", desc: "Answers to the most common questions about AANGCC." },
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
            Be part of Austin's
            <br />
            <span className="text-gradient-teal">cycling community.</span>
          </h2>
          <p className="text-white/50 text-[16px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            AANGCC is open to every rider who shows up with heart. Join us and experience what it means to ride for something bigger than yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join AANGCC Today</Link>
            <Link href="/rides" className="btn-outline">View Ride Calendar</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/30 text-[13px]">
            <Link href="/cycling-club-austin" className="hover:text-[#2A9D9E] transition-colors">Cycling Club Austin</Link>
            <Link href="/charity-cycling-austin" className="hover:text-[#2A9D9E] transition-colors">Charity Cycling Austin</Link>
            <Link href="/bike-clubs-austin" className="hover:text-[#2A9D9E] transition-colors">Bike Clubs Austin</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
