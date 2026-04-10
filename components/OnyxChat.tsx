"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE = `Hey there! 👋 I'm **ONYX**, the AANGCC virtual assistant.

I can help you with:
🚴 **Rides** — schedules, levels, routes
💳 **Membership** — plans, pricing, how to join
❤️ **Fundraising** — MS 150, ALZ Ride, Rosedale
🏢 **Sponsorship** — corporate partnership packages
📋 **Waivers** — signing before your first ride

What can I help you with today?`;

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-white rounded-2xl rounded-tl-none shadow-sm w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="w-2 h-2 rounded-full bg-[#14CFC4]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center flex-shrink-0 mr-2 mt-1 shadow-sm">
          <span className="text-white text-[10px] font-bold">OX</span>
        </div>
      )}
      <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${isUser
        ? "bg-[#14CFC4] text-white rounded-tr-none"
        : "bg-white text-[#333] rounded-tl-none border border-gray-100"
        }`}
        dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
      />
    </div>
  );
}

export default function OnyxChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Show pulse after 3 seconds to draw attention
    const timer = setTimeout(() => setShowPulse(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setShowPulse(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/onyx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        if (!isOpen) setHasNewMessage(true);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I apologize — something went wrong. Please try again or contact us at info@allassnogascyclingclub.com" }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again or reach us at info@allassnogascyclingclub.com" }]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = [
    "How do I join?",
    "When are the rides?",
    "MS 150 info",
    "Sponsorship packages",
  ];

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] max-h-[580px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#14CFC4] to-[#0FAFA5] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <span className="text-white text-[13px] font-bold">OX</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-[14px] leading-none">ONYX</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    <p className="text-white/80 text-[11px]">AANGCC Assistant · Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 flex flex-col gap-3 min-h-0" style={{ maxHeight: "380px" }}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center flex-shrink-0 mr-2 mt-1 shadow-sm">
                    <span className="text-white text-[10px] font-bold">OX</span>
                  </div>
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="bg-gray-50 px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {quickReplies.map((reply) => (
                  <button key={reply} onClick={() => { setInput(reply); setTimeout(() => sendMessage(), 0); }}
                    className="px-3 py-1.5 rounded-full border border-[#14CFC4] text-[#0FAFA5] text-[11px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200 bg-white">
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                placeholder="Ask ONYX anything..."
                className="flex-1 text-[13px] text-[#333] placeholder-gray-400 outline-none bg-transparent"
              />
              <button onClick={sendMessage} disabled={!input.trim() || loading}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${input.trim() && !loading ? "bg-[#14CFC4] hover:bg-[#FFD84D]" : "bg-gray-100"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "white" : "#bbb"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="bg-white px-4 pb-3 text-center flex-shrink-0">
              <p className="text-[10px] text-gray-300">Powered by ONYX · All Ass No Gas Cycling Club</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
        style={{ background: isOpen ? "#0FAFA5" : "linear-gradient(135deg, #14CFC4, #0FAFA5)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {(hasNewMessage || showPulse) && !isOpen && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFD84D] border-2 border-white flex items-center justify-center">
            <motion.div className="w-2 h-2 rounded-full bg-[#FFD84D]" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </motion.div>
        )}
      </motion.button>

      {/* Intro tooltip */}
      <AnimatePresence>
        {showPulse && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-20 sm:right-24 z-50 bg-white rounded-2xl shadow-xl px-4 py-3 max-w-[200px]"
            style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
          >
            <p className="text-[#111] text-[12px] font-semibold leading-snug">👋 Hi! I'm ONYX</p>
            <p className="text-[#888] text-[11px] mt-0.5 leading-relaxed">Ask me anything about AANGCC!</p>
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

