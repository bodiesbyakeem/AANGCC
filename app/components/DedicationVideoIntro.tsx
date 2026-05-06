"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "aangcc_dedication_intro_seen";
const YOUTUBE_ID = "fokOHmox2TA";

interface DedicationVideoIntroProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export default function DedicationVideoIntro({ forceShow = false, onClose }: DedicationVideoIntroProps) {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);

  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (forceShow) {
      setVisible(true);
      return;
    }
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setVisible(true);
  }, [forceShow]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, handleClose]);

  const handlePlayWithSound = () => {
    setMuted(false);
  };

  // Build YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=${muted ? 1 : 0}&controls=1&rel=0&modestbranding=1&playsinline=1`;

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="2026 MS 150 Dedication Film"
      >
        {/* YouTube iframe */}
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          frameBorder="0"
          title="2026 MS 150 Dedication Film"
        />

        {/* Gradient overlays — only on edges so video is visible */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between px-6 py-8 md:py-12 pointer-events-none">

          {/* Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-white/60 text-[10px] md:text-[11px] font-semibold tracking-[0.3em] uppercase">
              All Ass No Gas Cycling Club
            </p>
          </motion.div>

          {/* Center headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-[700px]"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[1px] w-8 md:w-12 bg-[#FFD84D]/60" />
              <span className="text-[#FFD84D] text-[10px] md:text-[11px] font-semibold tracking-[0.3em] uppercase">
                Dedication Film
              </span>
              <span className="h-[1px] w-8 md:w-12 bg-[#FFD84D]/60" />
            </div>
            <h1
              className="font-heading text-white leading-tight mb-3"
              style={{ fontSize: "clamp(28px, 5vw, 64px)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              2026 MS 150
              <br />
              Dedication Ride
            </h1>
            <p className="text-white/70 text-[13px] md:text-[15px] leading-relaxed mb-1" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
              A tribute to the person who reminded us why we ride.
            </p>
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-medium">
              Presented by All Ass No Gas Cycling Club
            </p>
          </motion.div>

          {/* Bottom buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col items-center gap-4 w-full max-w-[320px] pointer-events-auto"
          >
            <button
              onClick={handleClose}
              aria-label="Enter site and close video intro"
              className="w-full py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors duration-300 shadow-xl shadow-black/40"
            >
              Enter Site
            </button>

            {muted && (
              <button
                onClick={handlePlayWithSound}
                aria-label="Play with sound"
                className="flex items-center gap-2 text-white/60 text-[12px] font-medium hover:text-white transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                Play With Sound
              </button>
            )}

            <button
              onClick={handleClose}
              aria-label="Skip video intro"
              className="text-white/30 text-[11px] tracking-[0.15em] uppercase hover:text-white/60 transition-colors duration-200"
            >
              Skip
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
