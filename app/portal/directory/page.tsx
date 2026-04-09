"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

interface DirectoryMember {
  id: string;
  full_name: string;
  avatar_url: string | null;
  membership_type: string | null;
  city: string | null;
  state_location: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  show_phone: boolean;
  show_email: boolean;
  joined_at: string | null;
}

interface MessageForm {
  subject: string;
  body: string;
}

function MemberCard({
  member,
  currentUserId,
  onMessage,
}: {
  member: DirectoryMember;
  currentUserId: string;
  onMessage: (member: DirectoryMember) => void;
}) {
  const isCurrentUser = member.id === currentUserId;
  const initials = member.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tierColors: Record<string, string> = {
    Individual: "bg-[#14CFC4]/10 text-[#0FAFA5]",
    Family: "bg-[#FFD84D]/20 text-[#b8960a]",
    "Small Business": "bg-purple-100 text-purple-600",
    Corporate: "bg-blue-100 text-blue-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Top accent */}
      <div className="h-[4px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />

      <div className="p-6 flex flex-col items-center text-center flex-1">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#FFD84D] ring-offset-2 ring-offset-white">
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                <span className="font-heading text-white text-[28px] font-bold">{initials}</span>
              </div>
            )}
          </div>
          {isCurrentUser && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFD84D] border-2 border-white flex items-center justify-center">
              <span className="text-[8px] font-bold text-[#111]">YOU</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-heading text-[#111111] text-[20px] font-semibold leading-tight mb-1">
          {member.full_name}
        </h3>

        {/* Location */}
        {(member.city || member.state_location) && (
          <p className="text-[#888] text-[12px] mb-2">
            📍 {[member.city, member.state_location].filter(Boolean).join(", ")}
          </p>
        )}

        {/* Tier badge */}
        {member.membership_type && (
          <span className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full mb-3 ${tierColors[member.membership_type] || "bg-gray-100 text-gray-500"}`}>
            {member.membership_type}
          </span>
        )}

        {/* Bio */}
        {member.bio && (
          <p className="text-[#666] text-[12px] leading-relaxed mb-4 line-clamp-2">{member.bio}</p>
        )}

        {/* Join date */}
        <p className="text-[#bbb] text-[11px] mb-4">
          Member since {member.joined_at ? new Date(member.joined_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}
        </p>

        {/* Contact info */}
        <div className="flex flex-col gap-2 w-full mb-4">
          {member.show_phone && member.phone && (
            <a href={`tel:${member.phone}`}
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[#555] text-[12px] hover:border-[#14CFC4] hover:text-[#14CFC4] transition-colors duration-200">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {member.phone}
            </a>
          )}
          {member.show_email && member.email && (
            <a href={`mailto:${member.email}`}
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[#555] text-[12px] hover:border-[#14CFC4] hover:text-[#14CFC4] transition-colors duration-200 truncate">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {member.email}
            </a>
          )}
        </div>

        {/* Message button */}
        {!isCurrentUser && (
          <button
            onClick={() => onMessage(member)}
            className="w-full py-2.5 rounded-xl bg-[#14CFC4] text-white text-[12px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300"
          >
            ✉ Send Message
          </button>
        )}
        {isCurrentUser && (
          <Link href="/portal"
            className="w-full py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-bold tracking-wide uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300 block text-center">
            Edit My Profile
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function MessageModal({
  recipient,
  senderName,
  senderEmail,
  onClose,
  onSent,
}: {
  recipient: DirectoryMember;
  senderName: string;
  senderEmail: string;
  onClose: () => void;
  onSent: () => void;
}) {
  const [form, setForm] = useState<MessageForm>({ subject: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!form.subject || !form.body) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/members/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient_id: recipient.id,
          recipient_name: recipient.full_name,
          recipient_email: recipient.email,
          sender_name: senderName,
          sender_email: senderEmail,
          subject: form.subject,
          body: form.body,
        }),
      });

      const data = await response.json();
      if (data.success) {
        onSent();
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[500px]"
      >
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-heading text-[#111] text-[22px] font-semibold">Send Message</h3>
              <p className="text-[#888] text-[13px]">To: {recipient.full_name}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200 transition-colors">
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Subject</label>
              <input type="text" value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
                placeholder="e.g. Saturday ride question"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Message</label>
              <textarea value={form.body} onChange={(e) => setForm(p => ({ ...p, body: e.target.value }))}
                placeholder="Write your message here..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 resize-none" />
            </div>
            <p className="text-[#aaa] text-[11px] leading-relaxed">
              Your message will be sent via email. Your contact information will be included so they can reply directly to you.
            </p>
            <button onClick={handleSend} disabled={loading || !form.subject || !form.body}
              className={`w-full py-3.5 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${form.subject && form.body && !loading ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SuccessToast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-[#14CFC4] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-[14px] font-semibold">{message}</span>
    </motion.div>
  );
}

export default function DirectoryPage() {
  const supabase = createClient();
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [messagingMember, setMessagingMember] = useState<DirectoryMember | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setCurrentUserId(user.id);

      // Get current user info
      const { data: me } = await supabase
        .from("members")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      if (me) {
        setCurrentUserName(me.full_name || "");
        setCurrentUserEmail(me.email || user.email || "");
      }

      // Fetch directory
      const response = await fetch("/api/members/directory");
      const data = await response.json();
      if (data.members) setMembers(data.members);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = members.filter((m) => {
    const matchesSearch = m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (m.city || "").toLowerCase().includes(search.toLowerCase());
    const matchesTier = filterTier === "all" || m.membership_type === filterTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <AnimatePresence>
        {messagingMember && (
          <MessageModal
            recipient={messagingMember}
            senderName={currentUserName}
            senderEmail={currentUserEmail}
            onClose={() => setMessagingMember(null)}
            onSent={() => {
              setMessagingMember(null);
              setToast(`Message sent to ${messagingMember.full_name}!`);
            }}
          />
        )}
        {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
                <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Members Only</span>
              </div>
              <h1 className="font-heading text-white text-[36px] lg:text-[48px] font-semibold leading-tight">
                Member <span className="text-gradient-gold">Directory</span>
              </h1>
              <p className="text-white/60 text-[14px] mt-1">{members.length} active members · Austin's cycling community</p>
            </div>
            <Link href="/portal" className="px-5 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
              ← Back to Portal
            </Link>
          </div>
        </motion.div>

        {/* Search + Filter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or city..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white/50 transition-colors duration-200" />
          </div>
          <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white text-[13px] focus:outline-none focus:border-white/50 transition-colors duration-200">
            <option value="all" className="bg-[#0FAFA5] text-white">All Tiers</option>
            <option value="Individual" className="bg-[#0FAFA5] text-white">Individual</option>
            <option value="Family" className="bg-[#0FAFA5] text-white">Family</option>
            <option value="Small Business" className="bg-[#0FAFA5] text-white">Small Business</option>
            <option value="Corporate" className="bg-[#0FAFA5] text-white">Corporate</option>
          </select>
        </motion.div>

        {/* Directory Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading members...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🚴</span>
            <p className="text-white/60 text-[15px]">{search ? "No members match your search" : "No members in the directory yet"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <MemberCard
                  member={member}
                  currentUserId={currentUserId}
                  onMessage={setMessagingMember}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Privacy note */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="mt-12 p-5 rounded-2xl bg-white/10 border border-white/15 text-center">
          <p className="text-white/60 text-[12px] leading-relaxed">
            🔒 This directory is only visible to active AANGCC members. Contact information is displayed based on each member's privacy settings.{" "}
            <Link href="/portal" className="text-[#FFD84D] hover:underline">Update your privacy settings</Link> in your profile.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

