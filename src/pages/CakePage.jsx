import { useState, useEffect, useRef, useCallback } from 'react'
import { createConfettiBurst } from '../utils/particles'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGsapPageAnimation } from '../hooks/useGsapPageAnimation'

export default function CakePage() {
  const pageRef = useRef(null)
  useGsapPageAnimation(pageRef)
  const [isBlown, setIsBlown] = useState(false)
  const navigate = useNavigate()
  const cakeRef = useRef(null)
  const flickerRef = useRef(null)
  const flame1Ref = useRef(null)
  const flame2Ref = useRef(null)
  const flame3Ref = useRef(null)

  useEffect(() => {
    function flicker() {
      const refs = [flame1Ref, flame2Ref, flame3Ref]
      refs.forEach(ref => {
        if (ref.current) {
          const s = 0.93 + Math.random() * 0.14
          const r = (Math.random() - 0.5) * 5
          ref.current.style.transform = `scale(${s}) rotate(${r}deg)`
        }
      })
    }
    if (!isBlown) {
      flickerRef.current = setInterval(flicker, 120)
    }
    return () => clearInterval(flickerRef.current)
  }, [isBlown])

  const blowCandles = useCallback(() => {
    if (!isBlown) {
      setIsBlown(true)
      clearInterval(flickerRef.current)
      ;[flame1Ref, flame2Ref, flame3Ref].forEach(ref => {
        if (ref.current) {
          ref.current.style.transform = 'scale(0)'
          ref.current.style.opacity = '0'
        }
      })
      if (cakeRef.current) {
        const rect = cakeRef.current.getBoundingClientRect()
        createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height * 0.22)
      }
    } else {
      setIsBlown(false)
      ;[flame1Ref, flame2Ref, flame3Ref].forEach(ref => {
        if (ref.current) {
          ref.current.style.transform = 'scale(1)'
          ref.current.style.opacity = '1'
        }
      })
    }
  }, [isBlown])

  return (
    <motion.section ref={pageRef}
      className="min-h-screen w-full flex flex-col items-center justify-between sm:justify-center p-3 sm:p-6 md:p-8 relative select-none pt-12 sm:pt-16 pb-12 sm:pb-16"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div data-gsap="curtain" className="absolute inset-0 z-50 origin-left bg-rose-100 pointer-events-none"></div>
      <div data-gsap="click-wipe" className="absolute inset-x-0 top-0 h-1 z-50 bg-rose-400 pointer-events-none"></div>
      {/* Bunting Banner */}
      <div className="w-full max-w-4xl px-2 sm:px-4 pt-1 sm:pt-2 flex justify-center pointer-events-none select-none z-10">
        <svg className="w-full h-8 sm:h-12 md:h-14" fill="none" viewBox="0 0 600 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 8 Q 150 32 300 16 Q 450 32 590 8" stroke="#dec0bc" strokeDasharray="4 3" strokeWidth="1.8" />
          <polygon fill="#ff7b72" opacity="0.9" points="50,13 74,15 62,34" />
          <polygon fill="#ffd167" opacity="0.9" points="105,18 129,20 117,40" />
          <polygon fill="#84d5c7" opacity="0.9" points="160,21 184,21 172,42" />
          <polygon fill="#ffb3ad" opacity="0.9" points="215,19 239,18 227,39" />
          <polygon fill="#edc157" opacity="0.9" points="270,16 294,16 282,37" />
          <polygon fill="#a0f2e3" opacity="0.9" points="325,17 349,18 337,39" />
          <polygon fill="#ff7b72" opacity="0.9" points="380,20 404,21 392,42" />
          <polygon fill="#ffd167" opacity="0.9" points="435,21 459,20 447,41" />
          <polygon fill="#84d5c7" opacity="0.9" points="490,17 514,15 502,36" />
          <polygon fill="#ffb3ad" opacity="0.9" points="540,12 564,10 552,31" />
        </svg>
      </div>

      {/* Title */}
      <div className="relative z-20 text-center max-w-2xl px-3 sm:px-4 mt-1 sm:mt-2">
        <h2 data-gsap="text" className="font-sans text-2xl sm:text-4xl md:text-5xl text-primary tracking-tight font-extrabold drop-shadow-xs">
          Selamat Ulang Tahun! <span className="text-secondary-fixed-dim inline-block animate-pulse">✨</span>
        </h2>
        <p data-gsap="text" className="font-body text-sm sm:text-lg md:text-xl text-stone-600 mt-1 sm:mt-2 font-semibold leading-relaxed">
          &ldquo;Semoga setiap doa dan impian manismu terkabul seindah nyala lilin malam ini.&rdquo;
        </p>
      </div>

      {/* Cake Area */}
      <div className="relative w-full max-w-5xl mt-2 sm:mt-4 flex flex-col items-center justify-center px-2 sm:px-4">
        {/* Left Bouquet (desktop) */}
        <div className="hidden md:flex flex-col items-center absolute left-4 lg:left-12 top-4 pointer-events-none z-10">
          <div className="relative w-36 h-48">
            <div className="absolute left-2 top-0 w-16 h-20 bg-rose-300/85 rounded-full shadow-md flex items-start justify-end p-2"><div className="w-3 h-5 bg-white/60 rounded-full blur-[1px] -rotate-45"></div></div>
            <div className="absolute right-2 top-6 w-14 h-18 bg-amber-200/90 rounded-full shadow-md flex items-start justify-end p-2"><div className="w-2.5 h-4 bg-white/65 rounded-full blur-[1px] -rotate-45"></div></div>
            <div className="absolute left-8 top-16 w-12 h-16 bg-teal-200/85 rounded-full shadow-md"></div>
            <svg className="absolute top-20 left-0 w-36 h-28" fill="none" viewBox="0 0 100 80"><path d="M 32 0 Q 38 40 48 80" stroke="#dec0bc" strokeWidth="1.2" /><path d="M 68 8 Q 58 45 48 80" stroke="#dec0bc" strokeWidth="1.2" /><path d="M 44 24 Q 46 52 48 80" stroke="#dec0bc" strokeWidth="1.2" /></svg>
          </div>
          <div className="mt-2 rotate-[-5deg] bg-white p-3 rounded-lg shadow-md flex items-center gap-2">
          </div>
        </div>

        {/* Right Bouquet (desktop) */}
        <div className="hidden md:flex flex-col items-center absolute right-4 lg:right-12 top-6 pointer-events-none z-10">
          <div className="relative w-36 h-48">
            <div className="absolute right-3 top-0 w-16 h-20 bg-pink-200/95 rounded-full shadow-md flex items-start justify-end p-2"><div className="w-3 h-5 bg-white/65 rounded-full blur-[1px] -rotate-45"></div></div>
            <div className="absolute left-3 top-8 w-14 h-18 bg-teal-100/90 rounded-full shadow-md"></div>
            <div className="absolute right-8 top-16 w-12 h-16 bg-amber-100/95 rounded-full shadow-md"></div>
            <svg className="absolute top-20 left-0 w-36 h-28" fill="none" viewBox="0 0 100 80"><path d="M 68 0 Q 60 40 52 80" stroke="#dec0bc" strokeWidth="1.2" /><path d="M 32 8 Q 42 45 52 80" stroke="#dec0bc" strokeWidth="1.2" /><path d="M 56 24 Q 54 52 52 80" stroke="#dec0bc" strokeWidth="1.2" /></svg>
          </div>
          <div className="mt-2 rotate-[4deg] bg-white p-3 rounded-lg shadow-md flex items-center gap-2">
          </div>
        </div>

        {/* Interactive Cake */}
        <div className="relative flex flex-col items-center justify-center my-2 sm:my-3 z-20 w-full">
        

          <div ref={cakeRef} data-gsap="image" className="relative cursor-pointer select-none group flex justify-center w-full" title="Klik untuk meniup lilin!" onClick={blowCandles}>
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-56 sm:w-72 h-40 sm:h-52 bg-amber-200/40 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${isBlown ? 'opacity-5' : ''}`}></div>
            <svg className="w-[320px] xs:w-[360px] sm:w-[440px] md:w-[480px] max-w-[94vw] h-auto drop-shadow-[0_16px_28px_rgba(166,57,52,0.16)] transition-transform duration-300 group-hover:scale-[1.02]" fill="none" viewBox="0 0 380 340" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="tier1Grad" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stopColor="#ffffff" /><stop offset="60%" stopColor="#fff4ef" /><stop offset="100%" stopColor="#fae2db" /></linearGradient>
                <linearGradient id="tier2Grad" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stopColor="#ffffff" /><stop offset="70%" stopColor="#fff6f0" /><stop offset="100%" stopColor="#feded7" /></linearGradient>
                <linearGradient id="drizzleGrad" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stopColor="#ff7b72" /><stop offset="100%" stopColor="#a63934" /></linearGradient>
                <linearGradient id="standGrad" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" stopColor="#f0eee8" /><stop offset="50%" stopColor="#ffffff" /><stop offset="100%" stopColor="#e4e2dd" /></linearGradient>
                <linearGradient id="flameGrad" x1="0%" x2="0%" y1="100%" y2="0%"><stop offset="0%" stopColor="#ff7b72" /><stop offset="35%" stopColor="#ffd167" /><stop offset="85%" stopColor="#fffdf0" /></linearGradient>
              </defs>
              <ellipse cx="190" cy="316" fill="#dec0bc" opacity="0.4" rx="90" ry="12" />
              <path d="M 165 305 Q 190 310 215 305 L 202 278 L 178 278 Z" fill="url(#standGrad)" />
              <path d="M 160 306 Q 190 312 220 306" stroke="#dec0bc" strokeWidth="2" />
              <ellipse cx="190" cy="276" fill="url(#standGrad)" rx="146" ry="24" />
              <ellipse cx="190" cy="273" fill="#ffffff" rx="144" ry="22" />
              <path d="M 46 274 Q 190 298 334 274" stroke="#dec0bc" strokeWidth="2" />
              <path d="M 78 196 L 78 252 C 78 272, 302 272, 302 252 L 302 196 Z" fill="url(#tier1Grad)" />
              <path d="M 78 196 C 78 214, 302 214, 302 196 C 302 178, 78 178, 78 196 Z" fill="#ffffff" />
              <path d="M 78 196 Q 95 212 110 198 Q 130 220 148 202 Q 170 226 190 200 Q 212 224 232 201 Q 254 220 274 199 Q 290 214 302 196" fill="none" stroke="url(#drizzleGrad)" strokeLinecap="round" strokeWidth="5" />
              <g fill="#ffdad6">
                <circle cx="86" cy="254" r="5" /><circle cx="106" cy="260" r="5" /><circle cx="128" cy="264" r="5" />
                <circle cx="152" cy="266" r="5" /><circle cx="178" cy="268" r="5" /><circle cx="202" cy="268" r="5" />
                <circle cx="228" cy="266" r="5" /><circle cx="252" cy="264" r="5" /><circle cx="274" cy="260" r="5" />
                <circle cx="294" cy="254" r="5" />
              </g>
              <rect fill="#84d5c7" height="3" rx="1.5" transform="rotate(25 120 224)" width="8" x="120" y="224" />
              <rect fill="#ffd167" height="3" rx="1.5" transform="rotate(-15 160 235)" width="8" x="160" y="235" />
              <rect fill="#ff7b72" height="3" rx="1.5" transform="rotate(40 210 230)" width="8" x="210" y="230" />
              <rect fill="#84d5c7" height="3" rx="1.5" transform="rotate(-30 250 226)" width="8" x="250" y="226" />
              <path d="M 118 126 L 118 174 C 118 192, 262 192, 262 174 L 262 126 Z" fill="url(#tier2Grad)" />
              <ellipse cx="190" cy="126" fill="#ffffff" rx="72" ry="18" />
              <path d="M 118 126 C 124 145, 134 140, 140 130 C 146 148, 160 148, 168 132 C 176 152, 192 150, 198 130 C 206 148, 222 146, 228 132 C 236 146, 252 144, 262 126 L 262 124 C 230 140, 150 140, 118 124 Z" fill="url(#drizzleGrad)" />
              <circle cx="126" cy="126" fill="#a63934" r="6" /><circle cx="152" cy="136" fill="#a63934" r="6" /><circle cx="190" cy="140" fill="#a63934" r="7" /><circle cx="228" cy="136" fill="#a63934" r="6" /><circle cx="254" cy="126" fill="#a63934" r="6" />
              <circle cx="160" cy="122" fill="#ffd167" r="2.5" /><circle cx="218" cy="122" fill="#84d5c7" r="2.5" /><circle cx="180" cy="124" fill="#ff7b72" r="2.5" />
              {/* Candles */}
              <rect fill="#ffd167" height="42" rx="3" width="8" x="150" y="80" />
              <line stroke="#785a00" strokeWidth="1.8" x1="150" x2="158" y1="88" y2="84" /><line stroke="#785a00" strokeWidth="1.8" x1="150" x2="158" y1="98" y2="94" /><line stroke="#785a00" strokeWidth="1.8" x1="150" x2="158" y1="108" y2="104" />
              <line stroke="#57423f" strokeWidth="1.5" x1="154" x2="154" y1="80" y2="72" />
              <rect fill="#ff7b72" height="52" rx="3" width="8" x="186" y="70" />
              <line stroke="#ffffff" strokeWidth="2" x1="186" x2="194" y1="80" y2="76" /><line stroke="#ffffff" strokeWidth="2" x1="186" x2="194" y1="92" y2="88" /><line stroke="#ffffff" strokeWidth="2" x1="186" x2="194" y1="104" y2="100" />
              <line stroke="#57423f" strokeWidth="1.5" x1="190" x2="190" y1="70" y2="62" />
              <rect fill="#84d5c7" height="42" rx="3" width="8" x="222" y="80" />
              <line stroke="#036a5f" strokeWidth="1.8" x1="222" x2="230" y1="88" y2="84" /><line stroke="#036a5f" strokeWidth="1.8" x1="222" x2="230" y1="98" y2="94" /><line stroke="#036a5f" strokeWidth="1.8" x1="222" x2="230" y1="108" y2="104" />
              <line stroke="#57423f" strokeWidth="1.5" x1="226" x2="226" y1="80" y2="72" />
              {/* Flames */}
              <g ref={flame1Ref} className="transition-all duration-300 origin-bottom" style={{ transformOrigin: '154px 72px' }}>
                <circle cx="154" cy="62" fill="#ffd167" opacity="0.35" r="14" /><path d="M 154 50 C 158 58, 160 64, 154 72 C 148 64, 150 58, 154 50 Z" fill="url(#flameGrad)" /><circle cx="154" cy="66" fill="#ffffff" r="2.5" />
              </g>
              <g ref={flame2Ref} className="transition-all duration-300 origin-bottom" style={{ transformOrigin: '190px 62px' }}>
                <circle cx="190" cy="52" fill="#ffd167" opacity="0.4" r="16" /><path d="M 190 38 C 195 48, 197 54, 190 62 C 183 54, 185 48, 190 38 Z" fill="url(#flameGrad)" /><circle cx="190" cy="55" fill="#ffffff" r="3" />
              </g>
              <g ref={flame3Ref} className="transition-all duration-300 origin-bottom" style={{ transformOrigin: '226px 72px' }}>
                <circle cx="226" cy="62" fill="#ffd167" opacity="0.35" r="14" /><path d="M 226 50 C 230 58, 232 64, 226 72 C 220 64, 222 58, 226 50 Z" fill="url(#flameGrad)" /><circle cx="226" cy="66" fill="#ffffff" r="2.5" />
              </g>
              {/* Smoke */}
              <g className={`transition-opacity duration-500 pointer-events-none ${isBlown ? 'opacity-100' : 'opacity-0'}`}>
                <path d="M 154 68 Q 148 56 156 46 Q 164 36 154 26" fill="none" opacity="0.6" stroke="#8a716f" strokeLinecap="round" strokeWidth="2" />
                <path d="M 190 58 Q 182 44 192 32 Q 200 20 188 10" fill="none" opacity="0.7" stroke="#8a716f" strokeLinecap="round" strokeWidth="2.5" />
                <path d="M 226 68 Q 234 54 224 44 Q 216 32 228 22" fill="none" opacity="0.6" stroke="#8a716f" strokeLinecap="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>

        {/* Wish Banner */}
        <div className={`mt-3 sm:mt-4 max-w-md w-full bg-white p-3.5 sm:p-5 rounded-2xl shadow-xl text-center border border-rose-200 transition-all duration-500 ${isBlown ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden pointer-events-none'}`}>
          <h3 className="font-sans font-bold text-base sm:text-lg text-rose-600">Selamat Ulang Tahun ke 22</h3>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 sm:mt-8 w-full max-w-xl z-20 px-3">
          <button
            type="button"
            onClick={blowCandles}
            data-gsap-click
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{isBlown ? 'restart_alt' : 'mode_fan'}</span>
            <span>{isBlown ? 'Nyalakan Lilin Kembali ✨' : 'Tiup Lilin 💨'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/wishes')}
            data-gsap-click
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-coral-400 via-rose-500 to-rose-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(244,63,94,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(244,63,94,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>💐 Selanjutnya</span>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  )
}
