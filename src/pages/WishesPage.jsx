import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { spawnParticles } from '../utils/particles'
import { motion } from 'framer-motion'
import content from '../data/content.json'
import { useGsapPageAnimation } from '../hooks/useGsapPageAnimation'
import { useGsapTyping } from '../hooks/useGsapTyping'

const data = content.pages.wishes

export default function WishesPage() {
  const pageRef = useRef(null)
  useGsapPageAnimation(pageRef)
  useGsapTyping(pageRef, { selector: '[data-gsap-typing="wishes"]', speed: 0.014, delay: 0.65 })
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const handleSave = useCallback((e) => {
    const container = document.getElementById('particle-container')
    const rect = e.currentTarget.getBoundingClientRect()
    spawnParticles(container, rect.left + rect.width / 2, rect.top + rect.height / 2, 20)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }, [])

  return (
    <motion.section ref={pageRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative select-none pt-16 pb-16"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div data-gsap="curtain" className="absolute inset-0 z-50 origin-left bg-rose-100 pointer-events-none"></div>
      <div data-gsap="click-wipe" className="absolute inset-x-0 top-0 h-1 z-50 bg-rose-400 pointer-events-none"></div>
      <main className="w-full max-w-xl mx-auto flex flex-col items-center my-4">
        {/* Bouquet Section */}
        <section className="w-full flex flex-col items-center relative mb-8">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white p-3 sm:p-4 rounded-2xl paper-card border border-cream-200 transition-all duration-300 hover:shadow-xl group">
            <div aria-hidden="true" className="washi-tape-top"></div>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-rose-50 via-amber-50 to-orange-50 aspect-[4/5] flex items-center justify-center border border-cream-100">
                <svg data-gsap="image parallax" viewBox="0 0 320 400" role="img" aria-label="Buket bunga cantik" className="bouquet-svg w-full h-full p-5 transition-transform duration-500 group-hover:scale-[1.02]">
                  <defs>
                    <linearGradient id="bouquetPaper" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#f8b4c8" />
                      <stop offset="1" stopColor="#d8799e" />
                    </linearGradient>
                    <linearGradient id="bouquetStem" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#4f9b72" />
                      <stop offset="1" stopColor="#9acb86" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="160" cy="370" rx="92" ry="13" fill="#d99b9b" opacity=".22" />
                  <g className="bouquet-stems" fill="none" stroke="url(#bouquetStem)" strokeLinecap="round" strokeWidth="6">
                    <path d="M160 330 Q145 220 92 104" />
                    <path d="M160 330 Q165 205 160 74" />
                    <path d="M160 330 Q190 205 236 112" />
                    <path d="M160 330 Q125 235 48 170" />
                    <path d="M160 330 Q205 245 275 190" />
                  </g>
                  <g className="bouquet-leaves" fill="#73b77c">
                    <ellipse cx="106" cy="235" rx="35" ry="13" transform="rotate(32 106 235)" />
                    <ellipse cx="213" cy="235" rx="37" ry="13" transform="rotate(-34 213 235)" />
                    <ellipse cx="82" cy="272" rx="31" ry="12" transform="rotate(-28 82 272)" />
                    <ellipse cx="241" cy="273" rx="31" ry="12" transform="rotate(28 241 273)" />
                  </g>
                  <g className="bouquet-flower flower-one" transform="translate(92 100)">
                    <circle r="32" fill="#f39ab3" /><circle cx="-23" cy="8" r="22" fill="#ffb6c7" /><circle cx="23" cy="8" r="22" fill="#e980a2" /><circle cy="-19" r="22" fill="#ffcada" /><circle cy="18" r="12" fill="#ffd36e" />
                  </g>
                  <g className="bouquet-flower flower-two" transform="translate(160 70)">
                    <circle r="34" fill="#ffd166" /><circle cx="-22" cy="8" r="23" fill="#f5b94e" /><circle cx="22" cy="8" r="23" fill="#ffe29a" /><circle cy="-20" r="23" fill="#ffdc7f" /><circle cy="18" r="12" fill="#f28d68" />
                  </g>
                  <g className="bouquet-flower flower-three" transform="translate(236 108)">
                    <circle r="32" fill="#c89de8" /><circle cx="-23" cy="8" r="22" fill="#b985dc" /><circle cx="23" cy="8" r="22" fill="#dcb8f0" /><circle cy="-19" r="22" fill="#e6c9f5" /><circle cy="18" r="12" fill="#ffd166" />
                  </g>
                  <g className="bouquet-flower flower-four" transform="translate(48 170)">
                    <circle r="27" fill="#ff9f9f" /><circle cx="-19" cy="7" r="18" fill="#ffb8b8" /><circle cx="19" cy="7" r="18" fill="#f27f8c" /><circle cy="-16" r="18" fill="#ffc6c6" /><circle cy="14" r="10" fill="#ffd166" />
                  </g>
                  <path d="M55 275 L265 275 L232 365 Q160 385 88 365 Z" fill="url(#bouquetPaper)" opacity=".96" />
                  <path d="M55 275 Q160 305 265 275" fill="none" stroke="#f8d6df" strokeWidth="4" opacity=".8" />
                  <path d="M160 304 L160 372" stroke="#b95e83" strokeWidth="5" opacity=".55" />
                </svg>
              </div>
            <div className="pt-3 pb-1 text-center">
              <p className="font-handwriting text-xl text-stone-600 tracking-wide">dirangkai dengan doa terbaik &amp; kehangatan</p>
            </div>
          </div>
        </section>

        {/* Wishes Card */}
        <section className="w-full relative">
          <div aria-hidden="true" className="washi-tape-corner"></div>
          <div className="paper-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-cream-200/90 relative bg-white/95">
            <div className="border border-cream-200 border-dashed rounded-xl p-5 sm:p-7 relative">
              <div className="text-center mb-6">
                <span className="text-rose-400 text-xs sm:text-sm tracking-widest uppercase font-semibold block mb-1">{data.subtitle}</span>
                <h2 data-gsap="text" className="font-serif text-2xl sm:text-3xl text-stone-800 font-medium leading-snug">
                  {data.title}
                </h2>
              </div>
              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed text-center font-light">
                {data.wishes.map((wish, idx) => (
                  <p data-gsap="stagger" data-gsap-typing="wishes" key={idx}>{wish}</p>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-cream-100 flex flex-col items-end justify-end">
                <span data-gsap-typing="wishes" className="font-handwriting text-2xl sm:text-3xl text-rose-500 transform -rotate-2">
                  {data.signature}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <nav aria-label="Aksi Halaman" className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
          <button data-gsap-click
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm transition-all duration-200 shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Putar Ulang Memori</span>
            <span className="text-sm">🔄</span>
          </button>
        </nav>
      </main>
    </motion.section>
  )
}
