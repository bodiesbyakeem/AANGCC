import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Charity Cycling Austin | All Ass No Gas Cycling Club",
  description:
    "AANGCC is Austin's premier charity cycling club. We ride for the National MS Society and Alzheimer's Association, raising thousands through the BP MS 150 and Ride to End ALZ.",
  keywords: [
    "charity cycling Austin",
    "charity bike ride Austin TX",
    "MS 150 Austin",
    "cycling for charity Austin",
    "fundraising cycling Austin",
  ],
  openGraph: {
    title: "Charity Cycling Austin | AANGCC",
    description:
      "Austin's most purpose-driven charity cycling club. Join us to ride for MS, Alzheimer's, and the Austin community.",
    url: "https://www.aangcc.com/charity-cycling-austin",
  },
  alternates: {
    canonical: "https://www.aangcc.com/charity-cycling-austin",
  },
};

export default function CharityCyclingAustin() {
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
            "description": "Austin's premier charity cycling club raising thousands for MS and Alzheimer's research.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "sport": "Cycling",
            "event": [
              {
                "@type": "Event",
                "name": "BP MS 150",
                "description": "150-mile charity cycling event from Houston to Austin benefiting the National MS Society.",
                "location": {
                  "@type": "Place",
                  "name": "Austin, Texas"
                }
              },
              {
                "@type": "Event",
                "name": "Ride to End ALZ",
                "description": "Charity cycling event benefiting the Alzheimer's Association.",
                "location": {
                  "@type": "Place",
                  "name": "Dripping Springs, Texas"
                }
              }
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
            <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Riding for a Cause</span>
          </div>
          <h1 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Charity Cycling in Austin That Actually Makes a Difference
          </h1>
          <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            All Ass No Gas Cycling Club is Austin's most committed charity cycling team. Every mile we ride, every dollar we raise, and every rider we welcome to our team goes toward the fight against Multiple Sclerosis and Alzheimer's disease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/more/donate" className="btn-primary">Donate Now</Link>
            <Link href="/membership/why-join" className="btn-outline">Ride With Us</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Why Charity Cycling Matters in Austin</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Charity cycling events in Austin raise millions of dollars each year for causes ranging from cancer research to community health initiatives. But not all charity rides are created equal. The difference between a ride that generates real impact and one that fades after the finish line comes down to one thing: the people behind it.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            AANGCC was founded on the belief that cycling is one of the most powerful fundraising vehicles available to a community. It brings people together, builds endurance, and creates shared experiences that donors, sponsors, and supporters can directly witness and participate in. When someone sees a jersey cross a finish line, they feel the impact of their contribution in a way that no gala dinner or email campaign can replicate.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            Since our founding, AANGCC has raised over $65,000 for the National Multiple Sclerosis Society — and we are not done. Our goal is to raise more, reach more, and inspire more with every passing year.
          </p>

          {/* Cause Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="relative p-8 rounded-2xl border border-[#2A9D9E]/25 bg-[#2A9D9E]/[0.03] overflow-hidden flex flex-col gap-4">
              <div className="h-[3px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />
              <span className="text-3xl">🎗️</span>
              <h3 className="font-heading text-white text-[24px] font-semibold">National MS Society</h3>
              <p className="text-[#2A9D9E] text-[13px] font-medium">Our flagship cause</p>
              <p className="text-white/50 text-[14px] leading-relaxed flex-1">
                Nearly 1 million Americans live with MS. Through the BP MS 150 and year-round fundraising, AANGCC is committed to funding research, patient programs, and advocacy that moves us closer to a cure.
              </p>
              <Link href="/rides/ms150" className="text-[#2A9D9E] text-[13px] font-semibold flex items-center gap-2">
                Learn About MS 150
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="relative p-8 rounded-2xl border border-[#FFD84D]/25 bg-[#FFD84D]/[0.03] overflow-hidden flex flex-col gap-4">
              <div className="h-[3px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" />
              <span className="text-3xl">💜</span>
              <h3 className="font-heading text-white text-[24px] font-semibold">Alzheimer's Association</h3>
              <p className="text-[#FFD84D] text-[13px] font-medium">Annual charity ride</p>
              <p className="text-white/50 text-[14px] leading-relaxed flex-1">
                6.7 million Americans are living with Alzheimer's. The AANGCC Ride to End ALZ team rides annually in Dripping Springs to raise funds and awareness for families facing this disease.
              </p>
              <Link href="/rides/alz" className="text-[#FFD84D] text-[13px] font-semibold flex items-center gap-2">
                Learn About ALZ Ride
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Austin's Premier Charity Cycling Events</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            AANGCC participates in three major charity cycling events each year. Each one is a different test of endurance, community, and purpose — and each one raises critical funds for causes that matter to Austin and beyond.
          </p>

          <div className="flex flex-col gap-5 my-8">
            {[
              {
                name: "BP MS 150",
                subtitle: "Houston → Austin · 150 Miles · 2 Days",
                color: "teal",
                desc: "The BP MS 150 is one of the largest fundraising cycling events in the United States. AANGCC riders train for months, raise individual minimums, and ride two days from Houston to Austin in support of the National MS Society. It is our most important ride of the year — and our most emotional.",
                link: "/rides/ms150",
                cta: "Join Our MS 150 Team",
              },
              {
                name: "Ride to End ALZ",
                subtitle: "Dripping Springs · 40 Miles",
                color: "gold",
                desc: "The Ride to End ALZ takes place annually at Dripping Springs, Texas — 40 miles and 2,434 feet of elevation in support of the Alzheimer's Association. The post-ride celebration is sponsored by H.E.B. and brings the entire community together at the finish line.",
                link: "/rides/alz",
                cta: "Join Our ALZ Team",
              },
              {
                name: "Rosedale Ride",
                subtitle: "Austin Community Ride",
                color: "teal",
                desc: "The Rosedale Ride is our community event right here in Austin. It keeps us grounded in the city we love and connected to the local causes that make Austin the city it is.",
                link: "/rides/rosedale",
                cta: "Learn About Rosedale",
              },
            ].map((event) => (
              <div key={event.name} className={`p-8 rounded-2xl border flex flex-col gap-4 ${event.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                <div>
                  <h3 className={`font-heading text-white text-[24px] font-semibold mb-1`}>{event.name}</h3>
                  <p className={`text-[13px] font-medium ${event.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{event.subtitle}</p>
                </div>
                <p className="text-white/55 text-[14px] leading-relaxed">{event.desc}</p>
                <Link href={event.link} className={`text-[13px] font-semibold flex items-center gap-2 ${event.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                  {event.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">How to Participate in Charity Cycling in Austin</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            There are multiple ways to get involved with charity cycling in Austin through AANGCC — whether you want to ride, donate, or support from the sidelines.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-8">
            {[
              { icon: "🚴", title: "Ride With Us", desc: "Join AANGCC as a member and train with our team for the MS 150, ALZ Ride, or Rosedale Ride. No experience necessary.", color: "teal", link: "/membership/why-join", cta: "Become a Member" },
              { icon: "💸", title: "Make a Donation", desc: "Can't ride? Your donation goes directly to the MS Society or Alzheimer's Association. Every dollar counts.", color: "gold", link: "/more/donate", cta: "Donate Now" },
              { icon: "🏢", title: "Sponsor AANGCC", desc: "Partner with our team as a corporate sponsor and align your brand with Austin's most purpose-driven cycling community.", color: "teal", link: "/more/sponsorship", cta: "View Packages" },
            ].map((item) => (
              <div key={item.title} className={`p-7 rounded-2xl border flex flex-col gap-4 ${item.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-white font-semibold text-[16px]">{item.title}</h3>
                <p className="text-white/45 text-[13px] leading-relaxed flex-1">{item.desc}</p>
                <Link href={item.link} className={`text-[13px] font-semibold ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{item.cta} →</Link>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Training for a Charity Cycling Event in Austin</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Riding 150 miles over two days or 40 miles through the Hill Country does not happen by accident. It requires months of consistent training, proper nutrition, and the kind of mental preparation that only comes from riding with others who hold you accountable.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            AANGCC's weekly group rides serve as the training backbone for every major charity event we participate in. From January through April, our training volume builds progressively toward the MS 150. Riders from all three pace groups — <Link href="/rides/levels" className="text-[#2A9D9E] hover:text-white transition-colors">Social Butterflies, Roadsters, and Cyclepaths</Link> — all train together, support one another, and show up to the start line ready.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Our team also provides nutrition guidance, gear recommendations, bike fit advice, and flat tire education for newer riders. Nobody is expected to figure it out alone. That is the AANGCC way.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            Want to start training with us? <Link href="/membership/why-join" className="text-[#2A9D9E] hover:text-white transition-colors">Join as a member</Link> and check our <Link href="/rides" className="text-[#2A9D9E] hover:text-white transition-colors">ride calendar</Link> for upcoming training rides.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">The Financial Impact of Charity Cycling in Austin</h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-6">
            Numbers tell part of the story. AANGCC has raised over $65,000 for the National Multiple Sclerosis Society through consistent fundraising over the years. Every dollar raised by AANGCC riders goes directly to the MS Society — not to administrative overhead, not to club operations. Directly to the cause.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            {[
              { value: "$65,000+", label: "Raised for MS", color: "teal" },
              { value: "3", label: "Annual events", color: "gold" },
              { value: "163+", label: "Photos captured", color: "teal" },
              { value: "100%", label: "Goes to the cause", color: "gold" },
            ].map((s) => (
              <div key={s.label} className={`p-5 rounded-xl border text-center ${s.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.03]" : "border-white/[0.07] bg-[#141414]"}`}>
                <div className={`font-heading text-[32px] font-bold mb-1 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{s.value}</div>
                <div className="text-white/35 text-[11px] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            These numbers grow every year as our team grows. When you join AANGCC or donate to our cause, you become part of a compounding impact that will outlast any single ride or single season.
          </p>

          <h2 className="font-heading text-white text-[32px] font-semibold mb-6">Frequently Asked Questions About Charity Cycling in Austin</h2>
          <div className="flex flex-col gap-5 mb-10">
            {[
              { q: "Do I need to be an experienced cyclist to participate in charity rides?", a: "No. Many charity cycling events have multiple distance options, and AANGCC's training program prepares riders of all levels for the demands of each event. Our Social Butterflies group is specifically designed for newer riders." },
              { q: "How much money do AANGCC riders raise per event?", a: "Individual fundraising minimums vary by event. The MS 150 requires a minimum fundraising amount set by the National MS Society. AANGCC provides team support, fundraising tips, and a network of donors to help every rider meet their goals." },
              { q: "Where does my donation go?", a: "100% of charitable donations made through AANGCC's fundraising pages go directly to the National MS Society or the Alzheimer's Association. AANGCC does not retain any portion of charitable donations." },
              { q: "Can I participate as a donor without riding?", a: "Absolutely. Visit our donation page to support the MS 150 or ALZ Ride teams directly. Your donation is just as valuable as riding — and equally appreciated." },
              { q: "How do I join the AANGCC charity cycling team?", a: "Simply become a member through our membership page. Once you're a member, you'll have access to our ride calendar, training schedule, and team fundraising resources." },
            ].map((faq) => (
              <div key={faq.q} className="p-6 rounded-xl border border-white/[0.07] bg-[#141414]">
                <h3 className="text-white font-semibold text-[15px] mb-3">{faq.q}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{faq.a}</p>
              </div>
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
            Ride for something
            <br />
            <span className="text-gradient-teal">that matters.</span>
          </h2>
          <p className="text-white/50 text-[16px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            Join Austin's most committed charity cycling team and help us raise thousands for MS and Alzheimer's research — one pedal stroke at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="btn-primary">Join The Team</Link>
            <Link href="/more/donate" className="btn-outline">Make a Donation</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/30 text-[13px]">
            <Link href="/cycling-club-austin" className="hover:text-[#2A9D9E] transition-colors">Cycling Club Austin</Link>
            <Link href="/austin-cycling-community" className="hover:text-[#2A9D9E] transition-colors">Austin Cycling Community</Link>
            <Link href="/bike-clubs-austin" className="hover:text-[#2A9D9E] transition-colors">Bike Clubs Austin</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

