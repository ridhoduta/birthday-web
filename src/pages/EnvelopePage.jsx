import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { spawnParticles } from "../utils/particles";
import { motion } from "framer-motion";
import content from "../data/content.json";
import { useGsapPageAnimation } from "../hooks/useGsapPageAnimation";
import { useGsapTyping } from "../hooks/useGsapTyping";

const data = content.pages.envelope;

export default function EnvelopePage() {
  const pageRef = useRef(null);
  useGsapPageAnimation(pageRef);
  const [isOpen, setIsOpen] = useState(false);
  const lockBtnRef = useRef(null);
  const navigate = useNavigate();
  useGsapTyping(pageRef, { active: isOpen, selector: '[data-gsap-typing="letter"]' });

  const openEnvelope = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    if (lockBtnRef.current) {
      const rect = lockBtnRef.current.getBoundingClientRect();
      const container = document.getElementById("particle-container");
      spawnParticles(
        container,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
    }
  }, [isOpen]);

  const closeEnvelope = useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
  }, [isOpen]);

  const handleLockClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isOpen) openEnvelope();
      else closeEnvelope();
    },
    [isOpen, openEnvelope, closeEnvelope],
  );

  return (
    <motion.section ref={pageRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 relative select-none py-8 sm:py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div data-gsap="curtain" className="absolute inset-0 z-50 origin-left bg-rose-100 pointer-events-none"></div>
      <div data-gsap="click-wipe" className="absolute inset-x-0 top-0 h-1 z-50 bg-rose-400 pointer-events-none"></div>
      {/* Particle Container */}
      <div data-gsap="image"
        id="particle-container"
        className="absolute inset-0 pointer-events-none z-0"
      ></div>

      {/* Centered Interactive Envelope Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center w-full max-w-[92vw] sm:max-w-[480px] transition-all duration-700 ${isOpen ? "pt-2 sm:pt-4" : "pt-0"}`}
      >
        {/* Main Envelope Stage */}
        <div
          className={`envelope-perspective relative w-full aspect-[4/3] max-h-[300px] sm:max-h-[350px] cursor-pointer select-none group ${isOpen ? "envelope-opened" : ""}`}
          onClick={() => !isOpen && openEnvelope()}
        >
          {/* Shadow Underneath */}
          <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 w-[85%] h-5 sm:h-7 bg-amber-950/10 blur-xl rounded-full transition-all duration-500 group-hover:w-[90%] group-hover:bg-amber-950/15"></div>

          {/* Envelope Base Shell */}
          <div className="relative w-full h-full bg-[#fdeee1] rounded-2xl sm:rounded-3xl border-2 border-[#f6d7c3] shadow-[0_12px_32px_rgba(200,135,105,0.18)] overflow-visible">
            {/* Washi tapes on corners */}
            <div className="absolute -top-2 left-4 sm:left-6 z-20 w-12 sm:w-16 h-4 sm:h-5 bg-amber-200/80 backdrop-blur-xs border-y border-dashed border-amber-300 shadow-2xs rotate-[-8deg] rounded-[1px] pointer-events-none"></div>
            <div className="absolute -top-2 right-4 sm:right-6 z-20 w-10 sm:w-14 h-4 sm:h-5 bg-rose-200/80 backdrop-blur-xs border-y border-dashed border-rose-300 shadow-2xs rotate-[7deg] rounded-[1px] pointer-events-none"></div>

            {/* Inside Pocket Interior */}
            <div className="absolute inset-0 bg-[#f7ddcc] rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#e09f80_1px,transparent_1px)] bg-[size:14px_14px]"></div>
            </div>

            {/* POP-UP LETTER PAPER - Fully visible and readable when opened */}
            <div
              className={`letter-paper absolute left-2 right-2 sm:left-4 sm:right-4 bg-[#fffefb] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-2xl border border-rose-100/90 flex flex-col justify-between transition-all duration-700 ease-out ${
                isOpen
                  ? "top-1 sm:top-2 bottom-auto z-40 shadow-[0_16px_40px_rgba(180,110,80,0.3)] opacity-100 pointer-events-auto"
                  : "top-4 bottom-4 z-10 opacity-0 pointer-events-none"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cute Washi Tape Header */}
              <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 sm:h-6 bg-amber-200/90 border-y border-dashed border-amber-400/50 rounded-xs shadow-xs flex items-center justify-center -rotate-1 pointer-events-none">
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-800 tracking-wider">
                  {data.header.washiTapeLabel}
                </span>
              </div>

              <div className="pt-1 sm:pt-2">
                <div className="flex items-center justify-between border-b border-rose-100 pb-1.5 sm:pb-2.5 pr-8 sm:pr-10">
                  <span className="font-cute text-[10px] sm:text-xs text-amber-700/80 bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-200/60">
                    {data.letter.badge}
                  </span>
                </div>

                <div className="mt-2 sm:mt-4 font-handwriting text-stone-800 text-base sm:text-[20px] leading-5.5 sm:leading-7.5">
                  <p data-gsap="text" className="font-bold text-rose-600 text-xl sm:text-3xl mb-1 sm:mb-1.5 font-handwriting">
                    {data.letter.greeting}
                  </p>
                  {data.letter.body.map((paragraph, idx) => (
                    <p data-gsap="text" data-gsap-typing="letter" key={idx} className={idx < data.letter.body.length - 1 ? "mb-1.5 sm:mb-2" : "text-stone-600"}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-2 sm:pt-3 mt-1.5 sm:mt-3 flex items-center justify-between border-t border-dashed border-rose-200/80 text-xs">
                <span className="font-handwriting text-base sm:text-xl text-rose-700 font-bold">
                  {data.letter.closing}
                </span>
                <span className="font-cute text-stone-500 text-[10px] sm:text-xs bg-rose-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-rose-200/50">
                  {data.letter.badgeBottom}
                </span>
              </div>
            </div>

            {/* Envelope Triangular Flap */}
            <div className="envelope-flap absolute top-0 left-0 right-0 h-1/2 z-30 pointer-events-none drop-shadow-[0_6px_10px_rgba(180,110,80,0.15)]">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 50"
              >
                <polygon className="fill-[#fcdcc5]" points="0,0 100,0 50,50" />
                <polygon
                  className="fill-[#f8cca7]/40"
                  points="0,0 50,50 0,50"
                />
              </svg>
            </div>

            {/* Front Envelope Lower Fold */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 100 75"
              >
                <polygon
                  className="fill-[#ffe2cb]/90"
                  points="0,0 0,75 50,42"
                />
                <polygon
                  className="fill-[#ffdec5]/90"
                  points="100,0 100,75 50,42"
                />
                <polygon
                  className="fill-[#fed5b7]"
                  points="0,75 100,75 50,34"
                />
              </svg>
            </div>

            {/* Center Love Lock */}
            <div
              className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isOpen ? "z-10 opacity-40 hover:opacity-100" : "z-40 opacity-100"}`}
            >
              <button data-gsap-click
                ref={lockBtnRef}
                type="button"
                aria-label="Buka Kunci Hati"
                className="relative group/lock focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                onClick={handleLockClick}
              >
                <div className="absolute -inset-2 rounded-full bg-linear-to-r from-rose-400/40 via-amber-300/40 to-pink-400/40 blur-md animate-love-glow pointer-events-none"></div>
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-t-full border-[3px] sm:border-[3.5px] border-amber-300 bg-transparent shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_4px_rgba(180,100,20,0.3)] transition-transform duration-500 origin-bottom-left"
                  style={{
                    transform: isOpen
                      ? "translate(-4px, -8px) rotate(-35deg)"
                      : "none",
                  }}
                ></div>
                <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-linear-to-br from-rose-500 via-rose-600 to-pink-600 p-0.5 shadow-[0_8px_20px_rgba(225,29,72,0.42)] border-2 border-white/80 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-tr from-white/30 via-transparent to-black/10 rounded-full pointer-events-none"></div>
                  <div className="relative flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[30px] sm:text-[38px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] select-none transition-transform duration-300 group-hover/lock:scale-105">
                      {isOpen ? "lock_open" : "favorite"}
                    </span>
                    <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-200 border border-amber-600/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center justify-center">
                        <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-amber-950"></div>
                      </div>
                      <div className="w-1 sm:w-1.5 h-2 sm:h-2.5 bg-amber-950 -mt-0.5 rounded-b-[1px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/40 rounded-full blur-[2px] pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-300 border-2 border-white flex items-center justify-center text-amber-900 shadow-sm text-[10px] sm:text-xs select-none">
                  ✨
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Instruction Text */}
        <div className="mt-20 sm:mt-30 flex flex-col items-center text-center transition-all duration-500 px-2">
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/80 border border-rose-200/70 shadow-[0_4px_16px_rgba(244,114,182,0.12)] backdrop-blur-xs transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => !isOpen && openEnvelope()}
          >
            <span className="text-rose-500 text-xs sm:text-sm animate-pulse">
              🗝️
            </span>
            <p className="text-rose-500 text-xs sm:text-sm">
              {isOpen ? "Amplop sudah terbuka!" : "Buka kuncinya dulu ya!"}
            </p>
            <span className="text-rose-400 text-xs">✨</span>
          </div>
        </div>

        {/* Next Page CTA */}
        {isOpen && (
          <div className="mt-5 sm:mt-7 transition-all duration-500 opacity-90">
            <button data-gsap-click
              onClick={() => navigate("/album")}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white/95 text-stone-800 font-note font-bold text-sm sm:text-lg tracking-wide border border-rose-200/80 shadow-[0_8px_20px_-4px_rgba(244,114,182,0.25)] hover:shadow-[0_12px_28px_-4px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span className="text-rose-500 transition-transform duration-300 group-hover:rotate-12">
                📸
              </span>
              <span>Selanjutnya</span>
              <span className="text-rose-400 transition-transform duration-300 group-hover:translate-x-1">
                ➔
              </span>
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
