"use client";

import { motion } from "framer-motion";

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
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
          <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Flagship Event</span>
          <span className="h-[1px] w-10 bg-[#FFD84D]" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Texas Bike <span className="text-gradient-gold">MS 150</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="font-heading text-white/70 text-[20px] lg:text-[26px] mb-6">
          Austin → College Station · 156 Miles · 2 Days
        </motion.p>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-white/75 text-[16px] lg:text-[18px] max-w-[580px] mx-auto leading-relaxed">
          Texas MS 150 is our signature ride of the year. Two days, 156 miles, and thousands of cyclists united in the fight against Multiple Sclerosis.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Donate to Our Team</a>
          <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Join Our MS 150 Team</a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#14CFC4]/50 to-transparent pointer-events-none" />
    </section>
  );
}

function EventOverview() {
  const stats = [
    { value: "156", unit: "Miles", label: "Total Distance" },
    { value: "2", unit: "Days", label: "Ride Duration" },
    { value: "ATX→BCS", unit: "", label: "Austin — Bryan/College Station" },
    { value: "$100,771+", unit: "Raised", label: "For the MS Society" },
  ];

  const days = [
    {
      day: "Day 1",
      route: "Austin → La Grange",
      miles: "~75 Miles",
      details: [
        "Depart from Southside of the Texas State Capitol | 1100 Congress Ave., Austin, TX 78701",
        "Scenic Texas Hill Country roads",
        "Rest stops with food, SAG support, and restrooms available every 15 miles",
        "Overnight at La Grange or Bastrop (wherever we can secure hotel/Airbnb)",
      ],
    },
    {
      day: "Day 2",
      route: "La Grange → Bryan-College Station",
      miles: "~81 Miles",
      details: [
        "All cyclists depart from La Grange (Fayette County Fairgrounds)",
        "Route push through Round Top-Carmine",
        "Finish line at Kyle Field, Texas A&M University",
        "Post-ride team and individual photos on the grounds of A&M",
        "Post-ride dinner at Fritella Italian Cafe | 3901 South Texas Avenue, Bryan, TX 77802 | 979-260-6666",
      ],
    },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="font-heading text-[#14CFC4] leading-none mb-1" style={{ fontSize: s.value.length > 6 ? "28px" : "40px", fontWeight: 700 }}>{s.value}</div>
              {s.unit && <div className="text-[#FFD84D] text-[12px] font-semibold mb-2">{s.unit}</div>}
              <div className="text-[#888] text-[11px] tracking-wide uppercase leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#FFD84D]" />
              <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">About The Ride</span>
            </div>
            <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
              The ride that defines <span className="text-gradient-gold">our season.</span>
            </h2>
            <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
              <p>The Texas Bike MS 150 is one of the largest fundraising cycling events in the United States. Each year, thousands of cyclists make the journey from Austin to Bryan-College Station across two days of riding — all in support of the National Multiple Sclerosis Society.</p>
              <p>For AANGCC, the MS 150 is more than a ride. It's our annual commitment to the fight against MS — a disease that affects nearly 1 million Americans. Every dollar raised goes directly toward MS research, programs, and advocacy.</p>
              <p>Whether you're a first-timer or a seasoned MS 150 veteran, riding with the AANGCC team means you never ride alone. We train together, ride together, and celebrate every finish line as a family.</p>
            </div>
          </motion.div>

          {/* Day breakdown + Spectator Parking */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-4">
            {days.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[4px] w-full bg-[#FFD84D]" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">{day.day}</span>
                      <h3 className="font-heading text-[#111111] text-[20px] font-semibold mt-1">{day.route}</h3>
                    </div>
                    <span className="text-[13px] font-semibold px-3 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{day.miles}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {day.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[#555] text-[13px] leading-snug">
                        <span className="w-1 h-1 rounded-full bg-[#14CFC4] flex-shrink-0 mt-[6px]" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Spectator Parking Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[20px]">🅿️</span>
                  <div>
                    <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">Sunday</span>
                    <h3 className="font-heading text-[#111111] text-[20px] font-semibold mt-0.5">Spectator Parking at Texas A&M</h3>
                  </div>
                </div>
                <p className="text-[#555] text-[13px] leading-relaxed mb-4">
                  If you have family and friends coming to cheer the team on Sunday, they may park in either of the garages listed below. The Gene Stallings Boulevard Garage is generally considered the closest and most convenient option to the Texas MS 150 finish line, as it is attached to the Texas A&M Hotel and Conference Center and is adjacent to the Rudder Tower/Kyle Field area.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/15">
                    <p className="text-[#0FAFA5] text-[12px] font-bold mb-1">Gene Stallings Boulevard Parking Garage <span className="font-normal text-[#888]">($10–$15)</span></p>
                    <p className="text-[#555] text-[12px] leading-relaxed">500 Gene Stallings Blvd #39<br />College Station, Texas 77843<br />(979) 862-7275</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/15">
                    <p className="text-[#0FAFA5] text-[12px] font-bold mb-1">University Center Garage <span className="font-normal text-[#888]">($10–$15)</span></p>
                    <p className="text-[#555] text-[12px] leading-relaxed">660 Throckmorton Street<br />College Station, Texas 77843<br />(979) 862-7943</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrainingAndFundraising() {
  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-6 bg-[#14CFC4]" />
              <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">Team Training</span>
            </div>
            <h3 className="font-heading text-[#111111] text-[26px] font-semibold">We train together.</h3>
            <p className="text-[#555] text-[14px] leading-relaxed">AANGCC runs a structured MS 150 training program in the months leading up to the event. Weekly long rides, pace groups, and nutrition guidance help every rider cross that finish line with confidence.</p>
            <ul className="flex flex-col gap-3 mt-2">
              {[
                "Weekly training rides from 1st Saturday in December through 3rd week in April",
                "Structured long ride schedule building to 90 miles",
                "Pace groups for all rider levels",
                "Nutrition and hydration coaching",
                "Gear and bike fit guidance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#555] text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14CFC4] flex-shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-6 bg-[#FFD84D]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#b8960a" }}>Fundraising</span>
            </div>
            <h3 className="font-heading text-[#111111] text-[26px] font-semibold">Every dollar counts.</h3>
            <p className="text-[#555] text-[14px] leading-relaxed">Each MS 150 rider is required to raise a minimum amount through the National MS Society's fundraising platform. AANGCC provides team support, fundraising tips, and a community of donors who believe in what we ride for.</p>
            <ul className="flex flex-col gap-3 mt-2">
              {[
                "Personal fundraising page setup guidance",
                "Team donation matching opportunities",
                "Fundraising milestone recognition",
                "Corporate sponsorship connections",
                "Ongoing team fundraising support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#555] text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D] flex-shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function JoiningTheTeam() {
  const awards = [
    { name: "🏁 The Early Engine Award", desc: "Awarded to the first team member to fundraise $1,500. Celebrates early momentum and sets the tone for our fundraising season." },
    { name: "💪 The Comeback Rider Award", desc: "Awarded to the rider who shows the greatest improvement on the bike from the previous MS 150 season to the current season." },
    { name: "🥇 Top Fundraiser (Day 2)", desc: "Presented to the team member who achieves the highest total fundraising amount by the conclusion of Day 2. Represents initiative, leadership, and deep commitment to the MS Society's mission." },
    { name: "⭐ Elite Fundraiser", desc: "Presented to the individual who raises the highest total contribution amount, inclusive of all personal donations and verified corporate matching funds. Officially announced once all contributions are fully recorded in DonorDrive." },
    { name: "🌟 Spirit of AANGCC Award", desc: "The ultimate culture award — given to the member who best embodies the values of the club: energy, positivity, accountability, and team-first mindset." },
    { name: "🦵 Iron Legs Award", desc: "Recognizes the rider who consistently shows endurance and resilience — never backs down from long miles, tough conditions, or challenging routes." },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">How to Join</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Joining the <span className="text-gradient-gold">MS 150 Team</span>
          </motion.h2>
        </div>

        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <p className="text-[#555] text-[15px] leading-relaxed mb-4">Joining our MS 150 team is simple — all it takes is dedication and a genuine passion for making a difference. We're looking for riders who share our commitment to the cause and are ready to go the distance for something bigger than themselves. This isn't about personal glory or a self-gratifying challenge; it's about service, impact, and purpose.</p>
          <p className="text-[#555] text-[15px] leading-relaxed">If you're interested in joining the team, please review the requirements carefully before signing up. And remember: you can ride with All Ass No Gas Cycling Club without joining the MS 150 team. The club and the MS 150 team are two separate commitments.</p>
        </motion.div>

        {/* Requirements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: "MS Registration",
              color: "teal",
              icon: "📋",
              items: [
                "Limited spots on the team — interested riders MUST register by the last Monday in November (Thanksgiving week).",
                "Failure to meet the deadline will preclude you from joining the team.",
                "When registering, be sure to register under the team name: All Ass No Gas Cycling Club.",
              ],
            },
            {
              title: "Club Apparel Deadline",
              color: "gold",
              icon: "👕",
              items: [
                "All club apparel payments must be submitted by December 5.",
                "If you are already a club member with a current kit, you may not need to purchase new apparel.",
                "All club apparel is custom-made in Germany — production timelines are strict. Missing this deadline may result in delayed delivery.",
              ],
            },
            {
              title: "Fundraising Requirement",
              color: "teal",
              icon: "💰",
              items: [
                "All riders must raise a minimum of $1,500 to be eligible — no exceptions.",
                "Each rider is required to meet this minimum by the first Wednesday in April of each year.",
                "Timely fundraising enables the team captain to collect all ride packets from the MS Society in a single pickup.",
                "It also provides an accurate count for Airbnb accommodations, food, and overall logistics.",
              ],
            },
            {
              title: "Practice Ride Participation",
              color: "gold",
              icon: "🚴",
              items: [
                "All riders must participate in at least 75% of scheduled training rides for the MS 150.",
                "Official MS 150 practice rides begin on the first Saturday of December each year.",
                "Riders who fail to meet the 75% requirement will be fined $25.00 for each missed ride under the 75% threshold.",
                "All fines must be paid directly to the club via the club's website.",
              ],
            },
          ].map((req) => (
            <motion.div key={req.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
              <div className={`h-[4px] w-full ${req.color === "gold" ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`} />
              <div className="p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{req.icon}</span>
                  <h3 className={`font-heading text-[20px] font-semibold ${req.color === "gold" ? "text-[#b8960a]" : "text-[#14CFC4]"}`}>{req.title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {req.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#555] text-[13px] leading-snug">
                      <svg className="flex-shrink-0 mt-[3px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill={req.color === "gold" ? "#FFD84D" : "#14CFC4"} fillOpacity="0.2" />
                        <path d="M4 7L6 9L10 5" stroke={req.color === "gold" ? "#b8960a" : "#0FAFA5"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Awards */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏆</span>
              <h3 className="font-heading text-[#111111] text-[24px] font-semibold">Team Awards</h3>
            </div>
            <p className="text-[#555] text-[14px] leading-relaxed mb-6">Team awards reinforce the values, standards, and behaviors that define our culture. They strengthen unity, elevate standards, and create positive momentum. When people feel valued, they are more likely to stay committed, collaborate effectively, and inspire others. In mission-driven teams, awards turn goals into stories and performance into legacy.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <div key={award.name} className={`p-5 rounded-xl border ${i % 2 === 0 ? "border-[#14CFC4]/20 bg-[#14CFC4]/[0.04]" : "border-[#FFD84D]/20 bg-[#FFD84D]/[0.04]"}`}>
                  <h4 className={`font-heading text-[16px] font-semibold mb-2 ${i % 2 === 0 ? "text-[#14CFC4]" : "text-[#b8960a]"}`}>{award.name}</h4>
                  <p className="text-[#555] text-[12px] leading-relaxed">{award.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center">
          <p className="text-white/75 text-[15px] mb-8 max-w-[600px] mx-auto leading-relaxed">
            We are building a team of commitment, not convenience. If you're ready to go all in — we'd love to have you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">Join Our MS 150 Team</a>
            <a href="https://events.nationalmssociety.org/teams/90906/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300">Donate to the Cause</a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default function MS150Page() {
  return (
    <>
      <PageHero />
      <EventOverview />
      <TrainingAndFundraising />
      <JoiningTheTeam />
    </>
  );
}
