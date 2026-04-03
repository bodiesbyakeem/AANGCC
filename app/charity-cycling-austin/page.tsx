import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Charity Cycling Austin | All Ass No Gas Cycling Club",
  description:
    "AANGCC is Austin's premier charity cycling club. We ride for the National MS Society and Alzheimer's Association, raising thousands through the BP MS 150 and Ride to End ALZ.",
  keywords: ["charity cycling Austin", "charity bike ride Austin TX", "MS 150 Austin", "cycling for charity Austin", "fundraising cycling Austin"],
  openGraph: {
    title: "Charity Cycling Austin | AANGCC",
    description: "Austin's most purpose-driven charity cycling club. Join us to ride for MS, Alzheimer's, and the Austin community.",
    url: "https://www.allassnogascyclingclub.com/charity-cycling-austin",
  },
  alternates: { canonical: "https://www.allassnogascyclingclub.com/charity-cycling-austin" },
};

export default function CharityCyclingAustin() {
  return (
    <div className="min-h-screen pt-[80px]">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "SportsOrganization",
        "name": "All Ass No Gas Cycling Club", "alternateName": "AANGCC",
        "url": "https://www.allassnogascyclingclub.com",
        "description": "Austin's premier charity cycling club raising thousands for MS and Alzheimer's research.",
        "address": { "@type": "PostalAddress", "addressLocality": "Austin", "addressRegion": "TX", "addressCountry": "US" },
        "sport": "Cycling",
        "event": [
          { "@type": "Event", "name": "BP MS 150", "description": "150-mile charity cycling event from Houston to Austin benefiting the National MS Society.", "location": { "@type": "Place", "name": "Austin, Texas" } },
          { "@type": "Event", "name": "Ride to End ALZ", "description": "Charity cycling event benefiting the Alzheimer's Association.", "location": { "@type": "Place", "name": "Dripping Springs, Texas" } },
        ],
      }) }} />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.08] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Riding for a Cause</span>
          </div>
          <h1 className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Charity Cycling in Austin That <span className="text-gradient-gold">Actually Makes a Difference</span>
          </h1>
          <p className="text-white/75 text-[18px] leading-relaxed mb-8 max-w-[700px]">
            All Ass No Gas Cycling Club is Austin's most committed charity cycling team. Every mile we ride, every dollar we raise, and every rider we welcome goes toward the fight against Multiple Sclerosis and Alzheimer's disease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/more/donate" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Donate Now</Link>
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Ride With Us</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 flex flex-col gap-10">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-4">Why Charity Cycling Matters in Austin</h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">Charity cycling events in Austin raise millions of dollars each year for causes ranging from cancer research to community health initiatives. But not all charity rides are created equal. The difference between a ride that generates real impact and one that fades after the finish line comes down to the people behind it.</p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">AANGCC was founded on the belief that cycling is one of the most powerful fundraising vehicles available to a community. It brings people together, builds endurance, and creates shared experiences that donors, sponsors, and supporters can directly witness and participate in.</p>
            <p className="text-[#555] text-[15px] leading-relaxed">Since our founding, AANGCC has raised over $65,000 for the National Multiple Sclerosis Society — and we are not done.</p>
          </div>

          {/* Cause cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className="text-3xl">🎗️</span>
                <h3 className="font-heading text-[#111111] text-[22px] font-semibold">National MS Society</h3>
                <p className="text-[#14CFC4] text-[12px] font-medium uppercase tracking-wide">Our flagship cause</p>
                <p className="text-[#555] text-[13px] leading-relaxed flex-1">Nearly 1 million Americans live with MS. Through the BP MS 150 and year-round fundraising, AANGCC is committed to funding research, patient programs, and advocacy that moves us closer to a cure.</p>
                <Link href="/rides/ms150" className="text-[#14CFC4] text-[13px] font-semibold">Learn About MS 150 →</Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className="text-3xl">💜</span>
                <h3 className="font-heading text-[#111111] text-[22px] font-semibold">Alzheimer's Association</h3>
                <p className="text-[#b8960a] text-[12px] font-medium uppercase tracking-wide">Annual charity ride</p>
                <p className="text-[#555] text-[13px] leading-relaxed flex-1">6.7 million Americans are living with Alzheimer's. The AANGCC Ride to End ALZ team rides annually in Dripping Springs to raise funds and awareness for families facing this disease.</p>
                <Link href="/rides/alz" className="text-[#b8960a] text-[13px] font-semibold">Learn About ALZ Ride →</Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-6">Austin's Premier Charity Cycling Events</h2>
            <div className="flex flex-col gap-5">
              {[
                { name: "BP MS 150", subtitle: "Houston → Austin · 150 Miles · 2 Days", color: "teal", desc: "The BP MS 150 is one of the largest fundraising cycling events in the United States. AANGCC riders train for months, raise individual minimums, and ride two days from Houston to Austin in support of the National MS Society.", link: "/rides/ms150", cta: "Join Our MS 150 Team" },
                { name: "Ride to End ALZ", subtitle: "Dripping Springs · 40 Miles", color: "gold", desc: "The Ride to End ALZ takes place annually at Dripping Springs, Texas — 40 miles and 2,434 feet of elevation in support of the Alzheimer's Association. The post-ride celebration is sponsored by H.E.B.", link: "/rides/alz", cta: "Join Our ALZ Team" },
                { name: "Rosedale Ride", subtitle: "Austin Community Ride", color: "teal", desc: "The Rosedale Ride is our community event right here in Austin. Supporting The Rosedale School — which serves students with disabilities and complex medical needs — keeps us rooted in the city we love.", link: "/rides/rosedale", cta: "Learn About Rosedale" },
              ].map((event) => (
                <div key={event.name} className={`p-7 rounded-xl border flex flex-col gap-3 ${event.color === "gold" ? "border-[#FFD84D]/30 bg-[#FFD84D]/[0.04]" : "border-[#14CFC4]/20 bg-[#14CFC4]/[0.04]"}`}>
                  <div>
                    <h3 className="font-heading text-white text-[22px] font-semibold">{event.name}</h3>
                    <p className={`text-[12px] font-medium mt-0.5 ${event.color === "gold" ? "text-[#FFD84D]" : "text-[#14CFC4]"}`}>{event.subtitle}</p>
                  </div>
                  <p className="text-white/70 text-[13px] leading-relaxed">{event.desc}</p>
                  <Link href={event.link} className={`text-[13px] font-semibold ${event.color === "gold" ? "text-[#FFD84D]" : "text-[#14CFC4]"}`}>{event.cta} →</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-6">How to Participate in Charity Cycling in Austin</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🚴", title: "Ride With Us", desc: "Join AANGCC as a member and train with our team for the MS 150, ALZ Ride, or Rosedale Ride.", link: "/membership/why-join", cta: "Become a Member" },
                { icon: "💸", title: "Make a Donation", desc: "Can't ride? Your donation goes directly to the MS Society or Alzheimer's Association.", link: "/more/donate", cta: "Donate Now" },
                { icon: "🏢", title: "Sponsor AANGCC", desc: "Partner with our team as a corporate sponsor and align your brand with Austin's most purpose-driven cycling community.", link: "/more/sponsorship", cta: "View Packages" },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-[#111111] font-semibold text-[15px]">{item.title}</h3>
                  <p className="text-[#666] text-[12px] leading-relaxed flex-1">{item.desc}</p>
                  <Link href={item.link} className="text-[#14CFC4] text-[12px] font-semibold">{item.cta} →</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "$65,000+", label: "Raised for MS", color: "teal" },
              { value: "3", label: "Annual events", color: "gold" },
              { value: "163+", label: "Photos captured", color: "teal" },
              { value: "100%", label: "Goes to the cause", color: "gold" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-5 text-center shadow-md">
                <div className={`font-heading text-[28px] font-bold mb-1 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#14CFC4]"}`}>{s.value}</div>
                <div className="text-[#888] text-[10px] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-5">
              {[
                { q: "Do I need to be an experienced cyclist to participate in charity rides?", a: "No. Many charity cycling events have multiple distance options, and AANGCC's training program prepares riders of all levels. Our Social Butterflies group is specifically designed for newer riders." },
                { q: "Where does my donation go?", a: "100% of charitable donations made through AANGCC's fundraising pages go directly to the National MS Society or the Alzheimer's Association. AANGCC does not retain any portion of charitable donations." },
                { q: "Can I participate as a donor without riding?", a: "Absolutely. Visit our donation page to support the MS 150 or ALZ Ride teams directly. Your donation is just as valuable as riding — and equally appreciated." },
                { q: "How do I join the AANGCC charity cycling team?", a: "Simply become a member through our membership page. Once you're a member, you'll have access to our ride calendar, training schedule, and team fundraising resources." },
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
            Ride for something
            <br /><span className="text-gradient-gold">that matters.</span>
          </h2>
          <p className="text-white/70 text-[15px] mb-10 max-w-[480px] mx-auto leading-relaxed">
            Join Austin's most committed charity cycling team and help us raise thousands for MS and Alzheimer's research — one pedal stroke at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/membership/why-join" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join The Team</Link>
            <Link href="/more/donate" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Make a Donation</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/50 text-[12px]">
            <Link href="/cycling-club-austin" className="hover:text-[#FFD84D] transition-colors">Cycling Club Austin</Link>
            <Link href="/austin-cycling-community" className="hover:text-[#FFD84D] transition-colors">Austin Cycling Community</Link>
            <Link href="/bike-clubs-austin" className="hover:text-[#FFD84D] transition-colors">Bike Clubs Austin</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
