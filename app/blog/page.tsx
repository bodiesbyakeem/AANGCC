"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Blog Data ────────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  // Beginner
  {
    slug: "beginner-cycling-start-with-confidence",
    category: "Beginner",
    color: "teal",
    title: "Beginner Cycling: How to Start Riding With Confidence",
    excerpt: "Starting cycling can feel intimidating, especially when everyone else seems to know the gear, the pace, the rules, and the language. But the truth is this: every strong cyclist was once a beginner.",
    content: `Starting cycling can feel intimidating, especially when everyone else seems to know the gear, the pace, the rules, and the language. But the truth is this: every strong cyclist was once a beginner. No one starts out fast, polished, or fearless. The key is simply starting.

For a new rider, confidence comes from consistency, not perfection. Begin with shorter rides that allow you to get comfortable with your bike, your posture, and the feel of the road. Focus on learning how your gears work, how to brake smoothly, how to ride in a straight line, and how to stay relaxed when traffic or hills show up. Those basics matter more than speed ever will.

Just as important, ride with people who support growth. A good cycling community makes all the difference. The right group does not shame beginners. It encourages them, checks on them, and helps them improve. That kind of environment builds not only stronger riders, but stronger people.

Cycling is not just about distance. It is about freedom, confidence, health, and connection. You do not need to look like an expert to begin. You simply need a bike, a little courage, and a willingness to keep showing up.`,
    readTime: "4 min read",
  },
  {
    slug: "what-every-new-cyclist-needs-first-group-ride",
    category: "Beginner",
    color: "teal",
    title: "What Every New Cyclist Needs Before Their First Group Ride",
    excerpt: "Your first group ride can be exciting, but it can also bring nerves. That is normal. Riding with others introduces a different rhythm than riding alone.",
    content: `Your first group ride can be exciting, but it can also bring nerves. That is normal. Riding with others introduces a different rhythm than riding alone. There is more communication, more awareness, and more responsibility. But with the right preparation, your first group ride can be a great experience.

Start with the basics. Make sure your bike is road-worthy. Check your tire pressure, brakes, chain, and shifting. Wear a helmet, bring water, and carry a flat repair kit or at least a spare tube. If the ride is longer than an hour, bring a snack. New riders often underestimate how much better they feel when they are properly hydrated and fueled.

You should also learn a few core etiquette rules. Hold your line. Do not make sudden movements. Communicate hazards when you see them. If you are unsure where to position yourself, tell the ride leader you are new and ask for guidance. Good groups will always help.

Most importantly, do not try to prove anything on your first ride. Your goal is not to impress anyone. Your goal is to ride safely, stay present, and learn the group dynamic. That is how good cyclists are built — one smart ride at a time.`,
    readTime: "4 min read",
  },
  {
    slug: "road-gravel-hybrid-which-bike-is-right",
    category: "Beginner",
    color: "gold",
    title: "Road Bike, Gravel Bike, or Hybrid: Which Bike Is Right for You?",
    excerpt: "One of the biggest questions beginners ask is simple: what kind of bike should I buy? The answer depends less on what looks best online and more on how you actually plan to ride.",
    content: `One of the biggest questions beginners ask is simple: what kind of bike should I buy? The answer depends less on what looks best online and more on how you actually plan to ride.

A road bike is ideal for paved roads, group rides, and longer distances. It is fast, efficient, and built for riders who want to develop endurance and speed. If your goal is charity rides, group training, or consistent mileage, a road bike is often the best fit.

A gravel bike offers more versatility. It can handle pavement, rough roads, and light off-road terrain. If you want comfort, flexibility, and the ability to explore different surfaces, gravel bikes are an excellent option.

A hybrid bike is often best for casual riders, short exercise rides, and recreational use. It is comfortable and approachable, though it may not perform as well in faster group settings or longer cycling events.

The most important thing is not buying the most expensive bike. It is buying the bike that suits your current needs and encourages you to ride more often. The right bike is the one that helps you build consistency. That matters far more than trends or status.`,
    readTime: "4 min read",
  },
  {
    slug: "truth-about-cycling-fitness",
    category: "Beginner",
    color: "teal",
    title: "The Truth About Cycling Fitness: You Do Not Need to Be Fast to Belong",
    excerpt: "Too many people believe they must already be fit before joining a cycling club. That mindset keeps good people off the bike. Cycling fitness is not a requirement to begin. It is the result of beginning.",
    content: `Too many people believe they must already be fit before joining a cycling club or showing up to a group ride. That mindset keeps good people off the bike. Cycling fitness is not a requirement to begin. It is the result of beginning.

Speed is only one part of cycling, and it is far from the most important part. Riding consistently improves cardiovascular fitness, leg strength, balance, confidence, and mental resilience. Even a modest ride done regularly can create meaningful health gains over time.

More importantly, cycling communities should not be built only around pace. They should be built around support, safety, and shared purpose. A rider who encourages others, stays humble, and shows up consistently adds just as much value as the strongest person in the group.

You do not need to be fast to belong. You do not need the lightest bike, the newest kit, or the highest wattage. You need willingness. Willingness to learn, to grow, to listen, and to ride with respect for others.

The road has room for all kinds of riders. And the healthiest cycling communities understand that progress matters more than ego.`,
    readTime: "4 min read",
  },
  {
    slug: "cycling-safety-101",
    category: "Beginner",
    color: "gold",
    title: "Cycling Safety 101: Habits Every New Rider Should Learn Early",
    excerpt: "Cycling safety is not about fear. It is about awareness. The riders who stay safest over time are the ones who learn good habits early and stay disciplined with them.",
    content: `Cycling safety is not about fear. It is about awareness. The riders who stay safest over time are usually not the most aggressive or the most talented. They are the ones who learn good habits early and stay disciplined with them.

First, always wear a helmet. That should never be optional. Second, make yourself visible. Use front and rear lights, wear gear that can be seen, and assume drivers may not notice you immediately. Third, keep your bike maintained. A neglected brake system or worn tire can turn a simple ride into a serious problem.

New cyclists should also practice riding predictably. Hold a straight line. Signal clearly. Avoid sudden swerves. Stay alert at intersections. When riding with others, communicate hazards like potholes, gravel, or stopped cars. Group safety depends on everyone doing their part.

Do not ride with music in both ears. Do not become so focused on your computer data that you forget the road. And do not ignore weather conditions. Wind, rain, heat, and poor visibility all change how a ride should be approached.

Safe riders are not timid. They are prepared, observant, and responsible. That mindset protects both you and the people riding beside you.`,
    readTime: "4 min read",
  },
  {
    slug: "how-to-fuel-a-short-ride",
    category: "Beginner",
    color: "teal",
    title: "How to Fuel a Short Ride Without Overthinking Nutrition",
    excerpt: "Nutrition can seem complicated when you are new to cycling, but it does not need to be. For shorter rides, the goal is simple: start reasonably fueled, stay hydrated, and do not finish feeling depleted.",
    content: `Nutrition can seem complicated when you are new to cycling, but it does not need to be. For shorter rides, the goal is simple: start reasonably fueled, stay hydrated, and do not finish feeling depleted.

If your ride is under 60 minutes, you usually do not need much during the ride itself beyond water, especially if you ate a balanced meal beforehand. A simple pre-ride option could be toast with peanut butter, oatmeal with fruit, or eggs and potatoes. You want something that gives you energy without sitting heavy in your stomach.

For rides longer than an hour, you may need carbohydrates during the ride. That can be a banana, a bar, dried fruit, or another easy-to-digest option. Many beginners make the mistake of either eating nothing or waiting too long. Small, timely intake often works better than waiting until you feel weak.

After the ride, focus on recovery. Protein helps repair muscle, and carbohydrates help replenish energy. Real food works very well — eggs, yogurt, rice, chicken, fruit, potatoes, and similar basics.

You do not need a shelf full of supplements to ride well. You need consistency, hydration, and a few simple habits that support your effort.`,
    readTime: "4 min read",
  },
  {
    slug: "why-community-matters-more-than-speed",
    category: "Beginner",
    color: "gold",
    title: "Why Community Matters More Than Speed in Cycling",
    excerpt: "Cycling can absolutely improve your fitness, but what often keeps people riding for years is something deeper than performance. It is community. It is the feeling that you are part of something bigger than yourself.",
    content: `Cycling can absolutely improve your fitness, but what often keeps people riding for years is something deeper than performance. It is community. It is the feeling that you are part of something bigger than yourself.

A strong cycling community encourages new riders, celebrates progress, and helps people through hard days. It creates accountability. It gives people something to look forward to. It turns a hard training ride into a shared experience and a finish-line moment into something unforgettable.

That matters because cycling is not always easy. There are windy mornings, tough climbs, mechanical issues, long training blocks, and days when motivation is low. In those moments, community becomes the difference between quitting and continuing.

The best clubs are not defined by who rides the fastest. They are defined by how they treat people. Do they wait when someone struggles? Do they encourage new riders? Do they make others feel safe, seen, and valued?

The strongest cycling cultures are built on humility, service, and fellowship. Speed fades. Fitness fluctuates. But community is what keeps people coming back.`,
    readTime: "4 min read",
  },
  // Intermediate
  {
    slug: "how-to-break-through-a-cycling-plateau",
    category: "Intermediate",
    color: "teal",
    title: "How to Break Through a Cycling Plateau",
    excerpt: "Most cyclists hit a plateau at some point. You ride regularly, you are stronger than when you started, but progress begins to stall. The good news is that plateaus are normal, and they are usually fixable.",
    content: `Most cyclists hit a plateau at some point. You ride regularly, you are stronger than when you started, but progress begins to stall. That can be frustrating, especially when you are putting in effort and expecting results. The good news is that plateaus are normal, and they are usually fixable.

Often, a plateau happens because the body has adapted to the same training pattern. If every ride is done at the same pace, on similar routes, with little structure, the body has no real reason to improve. Progress comes from strategic variation.

That might mean adding intervals, increasing weekly volume gradually, working on climbing, or including recovery days with more intention. In some cases, the answer is not doing more. It is recovering better. Poor sleep, under-fueling, and too much hard riding can all keep a cyclist stuck.

Strength training also helps. Intermediate riders often improve significantly when they build stronger glutes, hamstrings, core stability, and single-leg control. The stronger body handles more work and produces more power.

A plateau is not a sign that you have reached your limit. It is usually a sign that your training needs better direction. Stay patient, stay honest, and stay consistent. Progress tends to return when training becomes more deliberate.`,
    readTime: "5 min read",
  },
  {
    slug: "group-ride-etiquette-stronger-riders",
    category: "Intermediate",
    color: "gold",
    title: "Group Ride Etiquette: What Stronger Riders Must Never Forget",
    excerpt: "As riders improve, it becomes easy to focus only on performance. But stronger riders carry a responsibility that goes beyond fitness. They help shape the culture of the group.",
    content: `As riders improve, it becomes easy to focus only on performance — pace, distance, climbing, positioning, and output. But stronger riders carry a responsibility that goes beyond fitness. They help shape the culture of the group.

Group ride etiquette is not just for beginners. In many ways, it matters even more for experienced riders. Strong cyclists set the tone. If they communicate clearly, ride predictably, and encourage others, the group becomes safer and more welcoming. If they act impatient, arrogant, or careless, the entire ride suffers.

That means no half-wheeling, no erratic braking, no ego-driven surges that split the group unnecessarily. It also means checking in on newer riders, helping people learn hand signals, and understanding when the pace needs to adjust for safety or cohesion.

The strongest rider in a group should never be the least considerate. Real leadership in cycling is not about dropping everyone. It is about knowing when to push and when to bring people together.

A group ride should make the team stronger, not just the fastest riders. Etiquette is part of performance. It protects the ride, the relationships, and the long-term health of the cycling community.`,
    readTime: "5 min read",
  },
  {
    slug: "climbing-better-technique-pacing-mindset",
    category: "Intermediate",
    color: "teal",
    title: "Climbing Better on the Bike: Technique, Pacing, and Mindset",
    excerpt: "Climbing exposes everything. Fitness, pacing, technique, and mental composure all get tested when the road tilts upward. For intermediate cyclists, getting better at climbing is often one of the fastest ways to improve.",
    content: `Climbing exposes everything. Fitness, pacing, technique, and mental composure all get tested when the road tilts upward. For intermediate cyclists, getting better at climbing is often one of the fastest ways to improve overall riding confidence.

The first key is pacing. Many riders attack climbs too early, spike their effort, and fade badly halfway through. It is usually smarter to start controlled, find a sustainable rhythm, and build only if the legs are there. A strong climb is rarely the one that starts hardest. It is the one that is managed well from bottom to top.

Body position matters too. Stay relaxed through the shoulders. Keep a steady cadence when possible. Shift before the gradient gets too steep rather than after you are already grinding. When standing, do so with purpose, not panic.

Mindset also matters. Climbs can feel long and mentally draining. Instead of obsessing over the entire hill, break it into manageable sections. Focus on breathing, cadence, and staying smooth.

You do not have to love climbing to improve at it. But you do need to respect it. The riders who climb well are usually not just stronger. They are calmer, smarter, and more patient under pressure.`,
    readTime: "5 min read",
  },
  {
    slug: "why-strength-training-makes-cyclists-better",
    category: "Intermediate",
    color: "gold",
    title: "Why Strength Training Makes Cyclists Better",
    excerpt: "A lot of cyclists ride more when they want to improve. Sometimes that works. But many riders overlook one of the most powerful tools available to them: strength training.",
    content: `A lot of cyclists ride more when they want to improve. Sometimes that works. But many riders overlook one of the most powerful tools available to them: strength training.

Cycling is repetitive. That means it builds endurance very well, but it can also leave gaps if done alone. Weak glutes, unstable hips, underdeveloped hamstrings, and poor trunk control can all limit performance and increase injury risk. Strength training helps address those weaknesses.

For intermediate cyclists, strength work can improve force production, posture, pedaling efficiency, climbing ability, and fatigue resistance. It can also help protect the knees, back, and hips during higher-volume training periods. Exercises like split squats, Romanian deadlifts, step-ups, carries, planks, and single-leg work are especially valuable.

The goal is not to become bulky or bodybuilder-heavy. The goal is to become more resilient and better able to apply force on the bike. That means stronger movement, not unnecessary weight.

A cyclist with a stronger body often recovers better, rides longer, and handles hills and wind more efficiently. If you want to become a better rider, do not just ask how many miles you should ride. Ask how strong your body is beneath the effort.`,
    readTime: "5 min read",
  },
  {
    slug: "how-to-ride-faster-without-racing",
    category: "Intermediate",
    color: "teal",
    title: "How to Ride Faster Without Turning Every Ride Into a Race",
    excerpt: "Many intermediate cyclists want to get faster, but they make one common mistake: they turn every ride into a hard ride. That approach often leads to fatigue, inconsistency, and stalled progress.",
    content: `Many intermediate cyclists want to get faster, but they make one common mistake: they turn every ride into a hard ride. That approach feels productive in the short term, but over time it often leads to fatigue, inconsistency, and stalled progress.

Speed improves best when training has contrast. Some rides should be easy enough to build endurance and recovery. Others should be structured and challenging enough to push adaptation. When every ride sits in the moderate-to-hard zone, you accumulate fatigue without maximizing either recovery or performance.

This is where interval training can help. Short efforts above your usual pace, paired with controlled recovery, can improve your ability to sustain higher speeds. Tempo rides, threshold intervals, and steady cadence work all serve different purposes depending on your goals.

Equally important is aerodynamics, positioning, and efficiency. Sometimes faster riding is not about getting fitter alone. It is about wasting less energy. Smoother pacing, better drafting awareness, stronger cornering, and improved posture all matter.

If you want speed, be strategic. Ride hard with intention, not emotion. Ride easy when easy is what the body needs. That balance is what actually moves performance forward.`,
    readTime: "5 min read",
  },
  {
    slug: "best-recovery-habits-for-cyclists",
    category: "Intermediate",
    color: "gold",
    title: "The Best Recovery Habits for Cyclists Who Train Consistently",
    excerpt: "Training only works if recovery supports it. Cyclists often focus heavily on the ride itself while neglecting the habits that allow improvement to happen. But fitness is built in recovery, not just in effort.",
    content: `Training only works if recovery supports it. Cyclists often focus heavily on the ride itself while neglecting the habits that allow improvement to happen. But fitness is built in recovery, not just in effort.

The most important recovery tool is sleep. Quality sleep supports muscle repair, hormone regulation, immune function, and nervous system recovery. A rider who consistently cuts sleep short will eventually feel it in their energy, mood, and performance.

Nutrition matters too. After challenging rides, the body benefits from carbohydrates to replenish glycogen and protein to support repair. Hydration is equally important, especially after long or hot rides.

Recovery also includes ride scheduling. Not every day should be hard. Easy spins, full rest days, and lower-volume weeks all help prevent burnout and allow long-term growth. Mobility work and light strength work can also help reduce tightness and improve movement quality.

A lot of cyclists pride themselves on toughness. But real discipline is not just about pushing. It is about knowing when to recover so you can continue pushing at a high level later.

The riders who improve most over time are not always the ones who train the hardest. They are often the ones who recover the smartest.`,
    readTime: "5 min read",
  },
  {
    slug: "what-it-means-to-be-reliable-teammate",
    category: "Intermediate",
    color: "teal",
    title: "What It Really Means to Be a Reliable Teammate on the Bike",
    excerpt: "Cycling may look individual from the outside, but within a strong club, reliability matters just as much as fitness. A reliable teammate does more than just show up and pedal.",
    content: `Cycling may look individual from the outside, but within a strong club, reliability matters just as much as fitness. A reliable teammate does more than just show up and pedal. They contribute to the safety, energy, and cohesion of the group.

That means arriving prepared. Bike checked. Tires inflated. Water filled. Tools packed. A reliable rider does not make preventable mistakes everyone else has to absorb. They respect the group's time and the ride leader's work.

It also means riding with awareness. Communicating hazards. Holding a steady line. Regrouping when appropriate. Encouraging those who are struggling. A reliable teammate does not disappear mentally when the pace gets hard. They stay engaged.

Off the bike, reliability means participating in the culture of the team. Supporting the mission. Showing up to meetings when possible. Helping newer riders feel included. Contributing to the cause, not just consuming the benefits of the group.

A cycling club grows stronger when its members understand that trust is earned through consistency. Reliability may not always look flashy, but it is one of the most valuable traits any rider can bring to a team.`,
    readTime: "5 min read",
  },
  // Advanced
  {
    slug: "advanced-cycling-fitness-train-with-precision",
    category: "Advanced",
    color: "gold",
    title: "Advanced Cycling Fitness: How to Train With Precision",
    excerpt: "At the advanced level, improvement becomes less about doing more and more about doing the right work at the right time. Margins get smaller, and sloppy training decisions become more costly.",
    content: `At the advanced level, improvement becomes less about doing more and more about doing the right work at the right time. Margins get smaller, and sloppy training decisions become more costly. Precision matters.

Advanced cyclists benefit from structured training blocks that align with their event calendar, recovery capacity, and performance goals. Endurance rides, threshold work, VO2 intervals, sprint sessions, and recovery days all need clear purpose. Random hard rides may maintain fitness, but they rarely optimize it.

This is also the stage where metrics become more useful if interpreted wisely. Power, heart rate, cadence, and ride load can all provide feedback, but data should support training, not dominate it. Numbers only matter if they help shape better decisions.

Recovery becomes even more critical as training intensity rises. Advanced riders often flirt with overreaching, especially when motivation is high. That is why sleep, fueling, strength work, and deload periods need to be treated as part of the plan, not as afterthoughts.

The best advanced cyclists are not just fit. They are disciplined, analytical, and patient. Precision is what separates riders who train hard from riders who continue evolving at a high level.`,
    readTime: "6 min read",
  },
  {
    slug: "pacelines-pelotons-and-trust",
    category: "Advanced",
    color: "teal",
    title: "Pacelines, Pelotons, and Trust: The Technical Side of Group Riding",
    excerpt: "Riding in a paceline or peloton requires more than fitness. It demands trust, predictability, communication, and technical control. At higher levels, group riding becomes a skill in itself.",
    content: `Riding in a paceline or peloton requires more than fitness. It demands trust, predictability, communication, and technical control. At higher levels, group riding becomes a skill in itself.

A strong paceline depends on smooth transitions and disciplined spacing. Riders must avoid abrupt braking, sudden swerves, and unnecessary surges. Even small mistakes can ripple through the line and create danger. The goal is efficiency, not ego.

Positioning matters. Riders should know how to rotate through, how to shelter from wind effectively, and when to contribute at the front without overcooking the pace. The strongest rider is not always the one who pulls longest. Often, it is the one who reads the group best and preserves collective rhythm.

Trust is the foundation. Riders need confidence that the person ahead will hold a clean line and communicate hazards. That trust is built over time through repetition and discipline.

For advanced cyclists, mastering group dynamics unlocks a new level of riding. It makes the team faster, safer, and more cohesive. It also reinforces a truth that applies to cycling broadly: individual strength matters, but collective execution often matters more.`,
    readTime: "6 min read",
  },
  {
    slug: "how-to-peak-for-a-big-event",
    category: "Advanced",
    color: "gold",
    title: "How to Peak for a Big Event Without Burning Out",
    excerpt: "Advanced riders often circle key events months in advance. Performance on that day depends on what happens in the weeks before it. Peaking is about timing your best form, not holding maximal intensity year-round.",
    content: `Advanced riders often circle key events months in advance. Whether it is Bike MS, a major fondo, a long-distance challenge, or a season-defining ride, performance on that day depends on what happens in the weeks before it.

Peaking is about timing your best form, not holding maximal intensity year-round. Training should build progressively, then sharpen. Volume and intensity both matter, but so does fatigue management. Many riders sabotage their event by training too hard too close to it.

A strong build includes event-specific preparation. If the ride includes long sustained efforts, train for that. If climbing is a factor, prepare for climbing. If back-to-back days are involved, include that stress strategically. Then taper appropriately. Reduce fatigue without losing sharpness.

Nutrition, sleep, mental readiness, and logistics all matter in the final phase. The best-trained rider can still underperform if they show up under-fueled, overworked, or mentally scattered.

Peaking is not complicated because it is mysterious. It is complicated because it requires restraint. Advanced riders improve when they stop trying to prove fitness in the final week and start protecting it instead.`,
    readTime: "6 min read",
  },
  {
    slug: "mental-side-of-long-distance-riding",
    category: "Advanced",
    color: "teal",
    title: "The Mental Side of Long-Distance Riding",
    excerpt: "At advanced levels, physical preparation is only part of the equation. Long-distance cycling tests focus, patience, emotional control, and the ability to stay composed when discomfort lasts for hours.",
    content: `At advanced levels, physical preparation is only part of the equation. Long-distance cycling tests focus, patience, emotional control, and the ability to stay composed when discomfort lasts for hours.

Mental fatigue builds gradually. It may start with a headwind that never ends, a climb that feels steeper than expected, or a stretch of road where motivation drops. Riders who manage these moments well usually do not rely on hype. They rely on process.

That process may include breaking the ride into segments, staying on top of fueling, using calm internal dialogue, and refusing to spiral when things get hard. Long rides do not require constant positivity. They require steadiness.

Advanced cyclists also understand that suffering becomes more manageable when it is anticipated. If you know the hard miles are coming, they are less likely to rattle you. The mind handles difficulty better when it expects it and has a plan.

The strongest endurance riders are not always the toughest in appearance. They are often the most composed under stress. Long-distance cycling rewards those who can remain deliberate when everything in the body wants to get emotional.`,
    readTime: "6 min read",
  },
  {
    slug: "why-advanced-riders-still-need-the-basics",
    category: "Advanced",
    color: "gold",
    title: "Why Advanced Riders Still Need the Basics",
    excerpt: "There is a temptation among experienced cyclists to chase the sophisticated and ignore the obvious. But advanced riding still depends on basic discipline — and always will.",
    content: `There is a temptation among experienced cyclists to chase the sophisticated and ignore the obvious. New equipment, complex data analysis, and highly specific workouts all have their place. But advanced riding still depends on basic discipline.

The basics are not glamorous. Tire pressure. Bike maintenance. Hydration. Fueling. Sleep. Positioning. Warm-ups. Recovery rides. Mechanical preparedness. These habits may seem simple, but they often determine whether a high-level rider performs well or fades unexpectedly.

Advanced athletes do not outgrow the basics. They become even more dependent on them because the margin for error narrows as performance rises. A poorly timed nutrition mistake or a neglected drivetrain matters more when you are pushing higher output and longer loads.

There is also a humility in returning to fundamentals. It keeps a rider grounded. It reminds them that mastery is not about escaping the basics. It is about executing them consistently under greater pressure.

The riders who last the longest and perform the best are rarely the ones who skip foundational habits. More often, they are the ones who take ordinary discipline seriously.`,
    readTime: "6 min read",
  },
  {
    slug: "leadership-on-the-road",
    category: "Advanced",
    color: "teal",
    title: "Leadership on the Road: What Experienced Cyclists Owe the Group",
    excerpt: "Experience creates responsibility. In a club environment, advanced riders are watched more closely than they realize. Leadership is always happening, whether acknowledged or not.",
    content: `Experience creates responsibility. In a club environment, advanced riders are watched more closely than they realize. Newer cyclists learn from how they ride, speak, encourage, and respond under pressure. Leadership is always happening, whether acknowledged or not.

Experienced riders owe the group steadiness. That means prioritizing safety, modeling good communication, and avoiding behavior that intimidates or excludes less experienced members. It also means knowing when to push performance and when to protect the cohesion of the ride.

Leadership on the road also includes teaching. Showing newer riders how to rotate, how to descend safely, how to handle a flat, how to fuel, and how to communicate in a group. Those lessons preserve the future of the club.

Strong leaders are not driven by status. They are driven by stewardship. They understand that a healthy cycling culture requires more than fast legs. It requires maturity, humility, and service.

The road always reveals character. And the most respected cyclists are usually not just the strongest riders. They are the ones who make everyone around them better.`,
    readTime: "6 min read",
  },
  {
    slug: "cycling-for-a-cause",
    category: "Community",
    color: "gold",
    title: "Cycling for a Cause: Why Purpose Changes the Ride",
    excerpt: "There is something different about riding when the miles stand for more than fitness. When a ride is tied to a mission — raising funds, honoring a cause, supporting families — the effort carries a different weight.",
    content: `There is something different about riding when the miles stand for more than fitness. When a ride is tied to a mission — raising funds, honoring a cause, supporting families, or bringing awareness to a struggle — the effort carries a different weight.

Purpose changes how riders experience discomfort. The wind still blows. The climbs still hurt. The body still gets tired. But the suffering feels connected to something meaningful. It becomes an offering instead of just an output.

For clubs like All Ass No Gas Cycling Club, mission-centered riding builds a deeper culture. It reminds members that cycling can be a vehicle for generosity, advocacy, and impact. It transforms a training calendar into a call to service.

Purpose also unites different kinds of riders. Fast riders, first-year riders, older riders, and developing riders can all stand on the same ground when the mission is clear. Cause-driven cycling makes room for heart, not just performance.

That is why some finish lines feel more emotional than others. Because they do not just mark distance completed. They mark a cause honored, a burden shared, and a promise kept.`,
    readTime: "5 min read",
  },
];

const CATEGORIES = ["All", "Beginner", "Intermediate", "Advanced", "Community"];

// ─── Blog Post Modal ──────────────────────────────────────────────────────────

function BlogModal({
  post,
  onClose,
}: {
  post: (typeof BLOG_POSTS)[0];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-[760px] mx-auto px-6 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 mb-10 text-[13px]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Blog
        </button>

        {/* Category */}
        <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${post.color === "gold" ? "bg-[#FFD84D]/10 text-[#FFD84D]" : "bg-[#2A9D9E]/10 text-[#2A9D9E]"}`}>
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-heading text-white text-[32px] lg:text-[44px] font-semibold leading-tight mt-4 mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-white/30 text-[12px] mb-10 pb-10 border-b border-white/[0.08]">
          <span>AANGCC Blog</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-white/65 text-[16px] leading-[1.8]">
              {para}
            </p>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] text-center">
          <p className="text-white/40 text-[14px] mb-6">Ready to ride with AANGCC?</p>
          <Link href="/membership/why-join" className="btn-primary" onClick={onClose}>
            Join The Club
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-black pt-[72px]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,157,158,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,157,158,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Stories & Training</span>
          <span className="h-[1px] w-10 bg-[#2A9D9E]" />
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          The AANGCC{" "}
          <span className="text-gradient-teal">Blog</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/50 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed">
          Training tips, community stories, and cycling wisdom — for riders at every level.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Blog Grid ────────────────────────────────────────────────────────────────

function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePost, setActivePost] = useState<(typeof BLOG_POSTS)[0] | null>(null);

  const filtered = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="relative bg-[#0a0a0a] py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Category filter */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap items-center gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[12px] font-medium tracking-wide border transition-all duration-200 ${activeCategory === cat ? "bg-[#2A9D9E] text-black border-[#2A9D9E]" : "bg-transparent text-white/40 border-white/[0.08] hover:border-[#2A9D9E]/40 hover:text-white/70"}`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-2 opacity-60">({BLOG_POSTS.filter(p => p.category === cat).length})</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Featured post */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8">
            <div
              className={`relative rounded-2xl border overflow-hidden group cursor-pointer ${featured.color === "gold" ? "border-[#FFD84D]/20 bg-[#FFD84D]/[0.02]" : "border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.02]"}`}
              onClick={() => setActivePost(featured)}
            >
              <div className={`h-[3px] w-full ${featured.color === "gold" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"}`} />
              <div className="p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${featured.color === "gold" ? "bg-[#FFD84D]/10 text-[#FFD84D]" : "bg-[#2A9D9E]/10 text-[#2A9D9E]"}`}>Featured</span>
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/[0.05] text-white/40">{featured.category}</span>
                  </div>
                  <h2 className={`font-heading text-white text-[28px] lg:text-[38px] font-semibold leading-tight group-hover:${featured.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} transition-colors duration-300`}>
                    {featured.title}
                  </h2>
                  <p className="text-white/40 text-[14px] leading-relaxed max-w-[420px]">{featured.excerpt}</p>
                </div>
                <div className="flex flex-col gap-6 lg:items-end">
                  <div className="text-white/30 text-[12px]">{featured.readTime}</div>
                  <span className={`inline-flex items-center gap-2 text-[13px] font-semibold group-hover:gap-4 transition-all duration-300 ${featured.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              onClick={() => setActivePost(post)}
              className={`relative rounded-2xl border overflow-hidden flex flex-col h-full group cursor-pointer ${post.color === "gold" ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]" : "border-white/[0.07] bg-[#141414]"}`}
            >
              <div className={`h-[2px] w-full ${post.color === "gold" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"}`} />
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit ${post.color === "gold" ? "bg-[#FFD84D]/10 text-[#FFD84D]" : "bg-[#2A9D9E]/10 text-[#2A9D9E]"}`}>
                  {post.category}
                </span>
                <h3 className="font-heading text-white text-[20px] font-semibold leading-tight group-hover:text-[#2A9D9E] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed flex-1">{post.excerpt}</p>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-white/25 text-[11px]">{post.readTime}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${post.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog post modal */}
      {activePost && (
        <BlogModal post={activePost} onClose={() => setActivePost(null)} />
      )}
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <>
      <PageHero />
      <BlogGrid />
    </>
  );
}
