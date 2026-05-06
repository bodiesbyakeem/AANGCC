                    "use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "aangcc_dedication_intro_seen";

interface DedicationVideoIntroProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export default function DedicationVideoIntro({ forceShow = false, onClose }: DedicationVideoIntroProps) {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      videoRef.current?.play().catch(() => {});
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

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleVideoEnd = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 800);
  };

  const handlePlayWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    setMuted(false);
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

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
        {/* Video */}
        <video
          ref={videoRef}
          src="/images/2026-ms150-dedication.mp4"
          poster="/images/2026%20MS%20150%20127.jpg"
          autoPlay
          muted={muted}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Video error fallback */}
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <p className="text-white/70 text-[18px] font-heading text-center max-w-[500px] px-8 leading-relaxed italic">
              We ride for more than miles. We ride for people, families, and the fight against MS.
            </p>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between px-6 py-10 md:py-16">

          {/* Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-white/50 text-[10px] md:text-[11px] font-semibold tracking-[0.3em] uppercase">
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
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-[1px] w-8 md:w-12 bg-[#FFD84D]/60" />
              <span className="text-[#FFD84D] text-[10px] md:text-[11px] font-semibold tracking-[0.3em] uppercase">
                Dedication Film
              </span>
              <span className="h-[1px] w-8 md:w-12 bg-[#FFD84D]/60" />
            </div>
            <h1
              className="font-heading text-white leading-tight mb-4"
              style={{ fontSize: "clamp(32px, 6vw, 72px)" }}
            >
              2026 MS 150
              <br />
              Dedication Ride
            </h1>
            <p className="text-white/65 text-[14px] md:text-[16px] leading-relaxed mb-2">
              A tribute to the person who reminded us why we ride.
            </p>
            <p className="text-white/35 text-[11px] tracking-[0.2em] uppercase font-medium">
              Presented by All Ass No Gas Cycling Club
            </p>
          </motion.div>

          {/* Bottom buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col items-center gap-4 w-full max-w-[320px]"
          >
            <button
              onClick={handleClose}
              aria-label="Enter site and close video intro"
              className="w-full py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors duration-300 shadow-xl shadow-black/40"
            >
              Enter Site
            </button>

            {muted && !videoError && (
              <button
                onClick={handlePlayWithSound}
                aria-label="Replay video with sound"
                className="flex items-center gap-2 text-white/55 text-[12px] font-medium hover:text-white transition-colors duration-200"
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

        {/* Progress bar */}
        {!videoError && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-[#FFD84D] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
