"use client";

import { useState, useEffect, useRef } from "react";
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

const ADMIN_EMAILS = ["info@allassnogascyclingclub.com"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_CAPTION_LENGTH = 500;
const MAX_COMMENT_LENGTH = 300;

type PostType = "ride_photo" | "event_photo" | "milestone";

interface Ride {
  id: string;
  title: string | null;
  ride_date: string;
  distance_miles: number;
}

interface Post {
  id: string;
  user_id: string;
  post_type: PostType;
  content: string | null;
  image_url: string | null;
  linked_ride_id: string | null;
  created_at: string;
  full_name?: string;
  avatar_url?: string | null;
  like_count?: number;
  comment_count?: number;
  user_liked?: boolean;
  linked_ride?: Ride | null;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  full_name?: string;
  avatar_url?: string | null;
}

const POST_TYPE_META: Record<PostType, { label: string; icon: string; color: string }> = {
  ride_photo: { label: "Ride Photo", icon: "🚴", color: "bg-[#14CFC4]/10 text-[#0FAFA5]" },
  event_photo: { label: "Event Photo", icon: "📸", color: "bg-[#FFD84D]/20 text-[#b8960a]" },
  milestone: { label: "Milestone", icon: "🏆", color: "bg-purple-100 text-purple-600" },
};

function sanitize(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/[<>&"']/g, "").trim();
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function validateImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) return "Only JPEG, PNG, WebP, and GIF images are allowed.";
  if (file.size > MAX_FILE_SIZE) return "Image must be under 10MB.";
  return null;
}

// ── CREATE POST MODAL ────────────────────────────────────────────────────────

function CreatePostModal({ onClose, onPosted, currentUserId, userRides }: {
  onClose: () => void;
  onPosted: () => void;
  currentUserId: string;
  userRides: Ride[];
}) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postType, setPostType] = useState<PostType>("ride_photo");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [linkedRideId, setLinkedRideId] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateImage(file);
    if (err) { setError(err); return; }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const handlePost = async () => {
    if (!content.trim() && !imageFile) { setError("Please add a caption or photo."); return; }
    if (content.length > MAX_CAPTION_LENGTH) { setError(`Caption must be under ${MAX_CAPTION_LENGTH} characters.`); return; }

    setUploading(true); setError("");

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${currentUserId}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("community").upload(fileName, imageFile, { contentType: imageFile.type });
        if (uploadError) throw new Error("Photo upload failed. Please try again.");
        const { data: urlData } = supabase.storage.from("community").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("community_posts").insert({
        user_id: currentUserId,
        post_type: postType,
        content: content.trim() ? sanitize(content) : null,
        image_url: imageUrl,
        linked_ride_id: linkedRideId || null,
      });

      if (insertError) throw insertError;
      onPosted();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to post. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CAPTION_LENGTH;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[540px] max-h-[90vh] overflow-y-auto">
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-[#111] text-[20px] font-semibold">Share with the Team</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Post type selector */}
          <div className="flex gap-2 mb-5">
            {(Object.entries(POST_TYPE_META) as [PostType, typeof POST_TYPE_META[PostType]][]).map(([type, meta]) => (
              <button key={type} onClick={() => setPostType(type)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all duration-200 ${postType === type ? "bg-[#14CFC4] text-white border-[#14CFC4]" : "bg-gray-50 text-[#888] border-gray-200 hover:border-[#14CFC4]"}`}>
                <span>{meta.icon}</span>{meta.label}
              </button>
            ))}
          </div>

          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

          {/* Caption */}
          <div className="relative mb-4">
            <textarea value={content} onChange={e => setContent(e.target.value)}
              placeholder={postType === "milestone" ? "Share your achievement with the team..." : "Add a caption..."}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border text-[#111] text-[14px] focus:outline-none transition-colors duration-200 resize-none ${isOverLimit ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#14CFC4]"}`} />
            <p className={`text-right text-[11px] mt-1 ${isOverLimit ? "text-red-500 font-semibold" : "text-[#aaa]"}`}>{charCount}/{MAX_CAPTION_LENGTH}</p>
          </div>

          {/* Image upload */}
          {imagePreview ? (
            <div className="relative mb-4 rounded-xl overflow-hidden">
              <img src={imagePreview} alt="Preview" className="w-full max-h-[240px] object-cover" />
              <button onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white text-[11px] flex items-center justify-center hover:bg-red-500 transition-colors">✕</button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()}
              className="mb-4 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#14CFC4] transition-colors duration-200">
              <span className="text-3xl block mb-2">📷</span>
              <p className="text-[#888] text-[13px] font-medium">Click to add a photo</p>
              <p className="text-[#bbb] text-[11px] mt-1">JPEG, PNG, WebP, GIF · Max 10MB</p>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept={ALLOWED_TYPES.join(",")} onChange={handleImageSelect} className="hidden" />

          {/* Link to ride */}
          {(postType === "ride_photo" || postType === "milestone") && userRides.length > 0 && (
            <div className="mb-5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase block mb-1.5">Link to a Ride (optional)</label>
              <select value={linkedRideId} onChange={e => setLinkedRideId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200">
                <option value="">No linked ride</option>
                {userRides.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title || "Ride"} · {r.distance_miles} mi · {new Date(r.ride_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button onClick={handlePost} disabled={uploading || (!content.trim() && !imageFile) || isOverLimit}
            className={`w-full py-3.5 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${!uploading && (content.trim() || imageFile) && !isOverLimit ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
            {uploading ? "Posting..." : "Share with Team →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── COMMENTS PANEL ───────────────────────────────────────────────────────────

function CommentsPanel({ postId, currentUserId, isAdmin, onClose }: {
  postId: string;
  currentUserId: string;
  isAdmin: boolean;
  onClose: () => void;
}) {
  const supabase = createClient();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => { fetchComments(); }, [postId]);

  const fetchComments = async () => {
    const { data } = await supabase.from("post_comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });
    if (!data) return;
    const userIds = Array.from(new Set(data.map(c => c.user_id)));
    const { data: members } = await supabase.from("members").select("id, full_name, avatar_url").in("id", userIds);
    setComments(data.map(c => ({
      ...c,
      full_name: members?.find(m => m.id === c.user_id)?.full_name || "Member",
      avatar_url: members?.find(m => m.id === c.user_id)?.avatar_url || null,
    })));
  };

  const handleComment = async () => {
    const trimmed = sanitize(newComment);
    if (!trimmed || trimmed.length > MAX_COMMENT_LENGTH) return;
    setPosting(true);
    await supabase.from("post_comments").insert({ post_id: postId, user_id: currentUserId, content: trimmed });
    setNewComment("");
    await fetchComments();
    setPosting(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingId(commentId);
    await supabase.from("post_comments").delete().eq("id", commentId);
    setComments(prev => prev.filter(c => c.id !== commentId));
    setDeletingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[520px] max-h-[75vh] flex flex-col">
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-heading text-[#111] text-[18px] font-semibold">Comments</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {comments.length === 0 ? (
            <p className="text-center text-[#bbb] text-[13px] py-8">No comments yet. Be the first!</p>
          ) : (
            comments.map(c => {
              const initials = (c.full_name || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
              const canDelete = c.user_id === currentUserId || isAdmin;
              return (
                <div key={c.id} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    {c.avatar_url ? <img src={c.avatar_url} alt="" className="w-full h-full object-cover" /> :
                      <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{initials}</span>
                      </div>}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[#111] text-[12px] font-semibold">{c.full_name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[#bbb] text-[10px]">{timeAgo(c.created_at)}</p>
                        {canDelete && (
                          <button onClick={() => handleDeleteComment(c.id)} disabled={deletingId === c.id}
                            className="opacity-0 group-hover:opacity-100 text-[10px] text-red-400 hover:text-red-600 transition-all duration-200">
                            {deletingId === c.id ? "..." : "Delete"}
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-[#444] text-[13px] leading-relaxed">{c.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input value={newComment} onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleComment(); } }}
              placeholder="Write a comment..."
              maxLength={MAX_COMMENT_LENGTH}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-[#111] text-[13px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
            <button onClick={handleComment} disabled={posting || !newComment.trim()}
              className={`px-4 py-2.5 rounded-xl text-[12px] font-bold transition-colors duration-200 ${newComment.trim() && !posting ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              {posting ? "..." : "Post"}
            </button>
          </div>
          <p className="text-[#bbb] text-[10px] mt-1.5">Max {MAX_COMMENT_LENGTH} characters · Press Enter to post</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── POST CARD ────────────────────────────────────────────────────────────────

function PostCard({ post, currentUserId, isAdmin, onLike, onComment, onDelete }: {
  post: Post;
  currentUserId: string;
  isAdmin: boolean;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isOwn = post.user_id === currentUserId;
  const canDelete = isOwn || isAdmin;
  const meta = POST_TYPE_META[post.post_type] || POST_TYPE_META.ride_photo;
  const initials = (post.full_name || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="h-[3px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />

      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
          {post.avatar_url ? <img src={post.avatar_url} alt="" className="w-full h-full object-cover" /> :
            <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">{initials}</span>
            </div>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[#111] text-[13px] font-semibold">{post.full_name || "Member"}</p>
            {isOwn && <span className="text-[9px] font-medium text-[#14CFC4]">· You</span>}
            {isAdmin && !isOwn && <span className="text-[9px] font-medium text-purple-500">· Admin View</span>}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${meta.color}`}>{meta.icon} {meta.label}</span>
            <span className="text-[#bbb] text-[10px]">{timeAgo(post.created_at)}</span>
          </div>
        </div>
        {canDelete && (
          <div className="flex-shrink-0">
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)}
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-[#ccc] hover:bg-red-50 hover:text-red-400 transition-colors duration-200">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button onClick={() => onDelete(post.id)} className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-colors">Delete</button>
                <button onClick={() => setConfirmDelete(false)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-[#888] text-[10px] font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {post.content && <p className="px-5 pb-3 text-[#333] text-[14px] leading-relaxed">{post.content}</p>}

      {/* Image */}
      {post.image_url && (
        <div className="mx-5 mb-4 rounded-xl overflow-hidden bg-gray-50">
          <img src={post.image_url} alt="Post" className="w-full object-cover max-h-[420px]" loading="lazy" />
        </div>
      )}

      {/* Linked ride */}
      {post.linked_ride && (
        <div className="mx-5 mb-4 p-3 rounded-xl bg-[#14CFC4]/8 border border-[#14CFC4]/20 flex items-center gap-3">
          <span className="text-[16px]">🚴</span>
          <div className="flex-1 min-w-0">
            <p className="text-[#0FAFA5] text-[12px] font-semibold truncate">{post.linked_ride.title || "Ride"}</p>
            <p className="text-[#aaa] text-[11px]">{post.linked_ride.distance_miles} mi · {new Date(post.linked_ride.ride_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-5 px-5 py-3.5 border-t border-gray-50">
        <button onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 text-[13px] font-medium transition-all duration-200 ${post.user_liked ? "text-red-500 scale-110" : "text-[#bbb] hover:text-red-400"}`}>
          <span className="text-[16px]">{post.user_liked ? "❤️" : "🤍"}</span>
          <span>{post.like_count || 0}</span>
        </button>
        <button onClick={() => onComment(post.id)}
          className="flex items-center gap-1.5 text-[#bbb] text-[13px] font-medium hover:text-[#14CFC4] transition-colors duration-200">
          <span className="text-[16px]">💬</span>
          <span>{post.comment_count || 0}</span>
        </button>
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRides, setUserRides] = useState<Ride[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<PostType | "all">("all");

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/membership/members-only"; return; }
      setCurrentUserId(user.id);
      setCurrentUserEmail(user.email || "");
      setIsAdmin(ADMIN_EMAILS.includes(user.email || ""));

      const { data: rides } = await supabase.from("rides").select("id, title, ride_date, distance_miles").eq("user_id", user.id).order("ride_date", { ascending: false }).limit(20);
      setUserRides(rides || []);

      await fetchPosts(user.id);
    }
    init();
  }, []);

  const fetchPosts = async (uid: string) => {
    setLoading(true);

    const { data: postsData } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(50);
    if (!postsData) { setLoading(false); return; }

    const userIds = Array.from(new Set(postsData.map(p => p.user_id)));
    const postIds = postsData.map(p => p.id);
    const rideIds = postsData.filter(p => p.linked_ride_id).map(p => p.linked_ride_id);

    const [{ data: members }, { data: likes }, { data: comments }, { data: rides }] = await Promise.all([
      supabase.from("members").select("id, full_name, avatar_url").in("id", userIds),
      supabase.from("post_likes").select("post_id, user_id").in("post_id", postIds),
      supabase.from("post_comments").select("post_id").in("post_id", postIds),
      rideIds.length > 0 ? supabase.from("rides").select("id, title, ride_date, distance_miles").in("id", rideIds) : { data: [] },
    ]);

    const enriched: Post[] = postsData.map(p => ({
      ...p,
      post_type: p.post_type as PostType,
      full_name: members?.find(m => m.id === p.user_id)?.full_name || "Member",
      avatar_url: members?.find(m => m.id === p.user_id)?.avatar_url || null,
      like_count: likes?.filter(l => l.post_id === p.id).length || 0,
      comment_count: comments?.filter(c => c.post_id === p.id).length || 0,
      user_liked: likes?.some(l => l.post_id === p.id && l.user_id === uid) || false,
      linked_ride: rides?.find(r => r.id === p.linked_ride_id) || null,
    }));

    setPosts(enriched);
    setLoading(false);
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    if (post.user_liked) {
      await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", currentUserId);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, user_liked: false, like_count: Math.max(0, (p.like_count || 1) - 1) } : p));
    } else {
      await supabase.from("post_likes").insert({ post_id: postId, user_id: currentUserId });
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, user_liked: true, like_count: (p.like_count || 0) + 1 } : p));
    }
  };

  const handleDelete = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    if (post.user_id !== currentUserId && !isAdmin) return;

    // Delete image from storage if exists
    if (post.image_url) {
      const path = post.image_url.split("/community/")[1];
      if (path) await supabase.storage.from("community").remove([path]);
    }

    await supabase.from("community_posts").delete().eq("id", postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const filtered = filterType === "all" ? posts : posts.filter(p => p.post_type === filterType);

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <AnimatePresence>
        {showCreateModal && (
          <CreatePostModal
            onClose={() => setShowCreateModal(false)}
            onPosted={() => fetchPosts(currentUserId)}
            currentUserId={currentUserId}
            userRides={userRides}
          />
        )}
        {commentPostId && (
          <CommentsPanel
            postId={commentPostId}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            onClose={() => setCommentPostId(null)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[680px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="py-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Members Only</span>
            </div>
            <h1 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight">
              Team <span className="text-gradient-gold">Community</span>
            </h1>
            <p className="text-white/60 text-[14px] mt-1">Share rides, stories, and milestones with the team</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
            <button onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[12px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              + Share
            </button>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="flex items-center gap-2 mb-6 flex-wrap">
          {([
            { id: "all", label: "All Posts", icon: "🌟" },
            { id: "ride_photo", label: "Ride Photos", icon: "🚴" },
            { id: "event_photo", label: "Event Photos", icon: "📸" },
            { id: "milestone", label: "Milestones", icon: "🏆" },
          ] as { id: PostType | "all"; label: string; icon: string }[]).map(f => (
            <button key={f.id} onClick={() => setFilterType(f.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all duration-200 ${filterType === f.id ? "bg-[#FFD84D] text-[#111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
              <span>{f.icon}</span>{f.label}
            </button>
          ))}
        </motion.div>

        {/* Admin badge */}
        {isAdmin && (
          <div className="mb-5 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
            <span className="text-purple-400 text-[11px]">🛡️</span>
            <p className="text-purple-300 text-[11px] font-semibold">Admin Mode — You can delete any post or comment</p>
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading community feed...</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-center py-20">
            <span className="text-6xl mb-4 block">🌟</span>
            <h3 className="font-heading text-white text-[24px] font-semibold mb-3">
              {filterType === "all" ? "Be the first to post!" : `No ${POST_TYPE_META[filterType as PostType]?.label} posts yet`}
            </h3>
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto leading-relaxed">
              Share a ride photo, event memory, or team milestone.
            </p>
            <button onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Share Something →
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-5">
            <AnimatePresence>
              {filtered.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={currentUserId}
                  isAdmin={isAdmin}
                  onLike={handleLike}
                  onComment={setCommentPostId}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Moderation note */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="mt-10 p-4 rounded-2xl bg-white/8 border border-white/10 text-center">
          <p className="text-white/40 text-[11px] leading-relaxed">
            This feed is visible to AANGCC members only. All posts are subject to club community standards.
            Images are limited to 10MB. Max caption length: {MAX_CAPTION_LENGTH} characters.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
