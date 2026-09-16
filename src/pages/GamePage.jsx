import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { spawnParticles } from '../utils/particles'

const CARD_DATA = [
  { id: 1, icon: '🎂', title: 'Kue Tart Cokelat', tag: 'Kue Ulang Tahun', tapeColor: 'washi-tape-pink', bgFront: 'bg-[#fffaf0]', borderColor: 'border-amber-300/80', accentColor: 'text-amber-700' },
  { id: 1, icon: '🎂', title: 'Kue Tart Cokelat', tag: 'Kue Ulang Tahun', tapeColor: 'washi-tape-pink', bgFront: 'bg-[#fffaf0]', borderColor: 'border-amber-300/80', accentColor: 'text-amber-700' },
  { id: 2, icon: '💖', title: 'Cinta Tulus', tag: 'Harapan Manis', tapeColor: 'washi-tape-mint', bgFront: 'bg-[#fff5f6]', borderColor: 'border-rose-300/80', accentColor: 'text-rose-600' },
  { id: 2, icon: '💖', title: 'Cinta Tulus', tag: 'Harapan Manis', tapeColor: 'washi-tape-mint', bgFront: 'bg-[#fff5f6]', borderColor: 'border-rose-300/80', accentColor: 'text-rose-600' },
  { id: 3, icon: '🍰', title: 'Kue Strawberry', tag: 'Penuh Manisan', tapeColor: 'washi-tape-cream', bgFront: 'bg-[#fff8f2]', borderColor: 'border-pink-300/80', accentColor: 'text-pink-600' },
  { id: 3, icon: '🍰', title: 'Kue Strawberry', tag: 'Penuh Manisan', tapeColor: 'washi-tape-cream', bgFront: 'bg-[#fff8f2]', borderColor: 'border-pink-300/80', accentColor: 'text-pink-600' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a.map((item, idx) => ({ ...item, uniqueKey: idx }))
}

export default function GamePage() {
  const navigate = useNavigate()
  const [cards, setCards] = useState(() => shuffle(CARD_DATA))
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [lockBoard, setLockBoard] = useState(false)
  const [showWin, setShowWin] = useState(false)

  const resetGame = useCallback(() => {
    setCards(shuffle(CARD_DATA))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setLockBoard(false)
    setShowWin(false)
  }, [])

  const flipCard = useCallback((e, uniqueKey) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (lockBoard) return
    if (flipped.includes(uniqueKey)) return
    if (matched.includes(uniqueKey)) return

    const newFlipped = [...flipped, uniqueKey]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      setLockBoard(true)

      const card1 = cards.find(c => c.uniqueKey === newFlipped[0])
      const card2 = cards.find(c => c.uniqueKey === newFlipped[1])

      if (card1.id === card2.id) {
        setTimeout(() => {
          const newMatched = [...matched, newFlipped[0], newFlipped[1]]
          setMatched(newMatched)
          setFlipped([])
          setLockBoard(false)

          const container = document.getElementById('particle-container')
          const el = document.querySelector(`[data-card-key="${newFlipped[1]}"]`)
          if (el && container) {
            const rect = el.getBoundingClientRect()
            spawnParticles(container, rect.left + rect.width / 2, rect.top + rect.height / 2, 10)
          }

          if (newMatched.length === 6) {
            setShowWin(true)
          }
        }, 450)
      } else {
        setTimeout(() => {
          setFlipped([])
          setLockBoard(false)
        }, 900)
      }
    }
  }, [lockBoard, flipped, matched, cards])

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-between sm:justify-center p-3 sm:p-6 md:p-8 relative select-none pt-14 sm:pt-20 pb-12 sm:pb-16">
      <header className="flex flex-col items-center mb-3 sm:mb-4 text-center z-10 shrink-0">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-stone-800 tracking-tight flex items-center justify-center gap-2 font-sans">
          Cocokkan Kartu
        </h2>
        <p className="text-rose-600 font-handwriting text-lg sm:text-xl md:text-2xl mt-0.5 sm:mt-1">
          Ketuk kartu untuk menemukan pasangan yang sesuai
        </p>
      </header>

      <main className="w-full max-w-3xl flex flex-col items-center z-10 px-0.5 sm:px-2">
        <div className="w-full flex items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-5 px-0.5 font-sans text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 border border-stone-200/90 font-medium text-stone-600 shadow-xs backdrop-blur-sm text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
              <span>👆</span><span>Langkah: <strong className="text-stone-800 font-bold">{moves}</strong></span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-rose-50/95 border border-rose-200/90 font-medium text-rose-700 shadow-xs backdrop-blur-sm text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
              <span>💕</span><span>Pasangan: <strong className="font-bold text-rose-800">{matched.length / 2}</strong>/3</span>
            </div>
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="group flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-stone-600 hover:text-rose-600 transition-all font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 hover:bg-white border border-stone-200 shadow-2xs backdrop-blur-sm active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Acak Ulang</span>
          </button>
        </div>

        <div className="w-full grid grid-cols-3 gap-2 sm:gap-5 md:gap-7">
          {cards.map((item) => {
            const isFlipped = flipped.includes(item.uniqueKey) || matched.includes(item.uniqueKey)
            const isMatched = matched.includes(item.uniqueKey)
            return (
              <div
                key={item.uniqueKey}
                data-card-key={item.uniqueKey}
                className={`perspective-1000 w-full h-[136px] xs:h-[155px] sm:h-52 md:h-60 select-none relative transition-transform duration-300 ${
                  isFlipped ? 'cursor-default' : 'cursor-pointer group hover:-translate-y-1.5'
                }`}
                onClick={(e) => flipCard(e, item.uniqueKey)}
              >
                <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-xl sm:rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl paper-cardstock paper-texture-grid p-1.5 sm:p-4 flex flex-col items-center justify-between border border-[#e4d7c5] overflow-hidden">
                    <div className={`absolute -top-1 sm:-top-1.5 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-3.5 sm:h-5 ${item.tapeColor} rotate-[-1.5deg] z-20 opacity-90`}></div>
                    <div className="w-full h-full rounded-lg sm:rounded-xl embossed-border flex flex-col items-center justify-center p-1 sm:p-2 relative bg-stone-50/40">
                      <span className="absolute top-0.5 left-1 text-[7px] sm:text-[9px] text-stone-400/60 select-none">✦</span>
                      <span className="absolute top-0.5 right-1 text-[7px] sm:text-[9px] text-stone-400/60 select-none">✦</span>
                      <span className="absolute bottom-0.5 left-1 text-[7px] sm:text-[9px] text-stone-400/60 select-none">✦</span>
                      <span className="absolute bottom-0.5 right-1 text-[7px] sm:text-[9px] text-stone-400/60 select-none">✦</span>
                      <div className="stamp-deboss w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#f7efe4] border border-[#dccbb4] flex items-center justify-center text-rose-500 mb-1 sm:mb-2 transition-transform duration-300">
                        <svg className="w-4 h-4 sm:w-7 sm:h-7 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                      <span className="text-[8px] sm:text-xs font-extrabold tracking-wider sm:tracking-widest text-stone-600/90 uppercase font-sans">BUKA KARTU</span>
                      <span className="text-[8px] sm:text-xs text-amber-600/80 font-handwriting font-bold mt-0 sm:mt-0.5">✨ Kertas Manis</span>
                    </div>
                  </div>
                  {/* Card Front */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl sm:rounded-2xl paper-cardstock ${item.bgFront} border-2 ${item.borderColor} p-1.5 sm:p-4 flex flex-col items-center justify-between overflow-hidden ${isMatched ? 'ring-2 sm:ring-4 ring-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : ''}`}>
                    <div className={`absolute -top-1 sm:-top-1.5 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-3.5 sm:h-5 ${item.tapeColor} rotate-1 z-20 opacity-90`}></div>
                    <div className="w-full h-full rounded-lg sm:rounded-xl embossed-border flex flex-col items-center justify-center p-1 sm:p-2 relative">
                      <span className="text-2xl sm:text-4xl md:text-5xl mb-0.5 sm:mb-1.5 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.12)]">{item.icon}</span>
                      <h3 className="text-[10px] sm:text-sm md:text-base font-bold text-stone-800 text-center font-sans leading-tight">{item.title}</h3>
                      <span className={`text-[8px] sm:text-xs font-handwriting font-bold ${item.accentColor} mt-0 sm:mt-0.5`}>{item.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Win Banner without layout jump */}
        <div className={`w-full mt-3 sm:mt-5 p-3 sm:p-4 rounded-2xl bg-white/95 border-2 border-rose-300 text-center shadow-lg transition-all duration-500 ${showWin ? 'opacity-100 scale-100 animate-bounce block' : 'opacity-0 scale-95 hidden pointer-events-none'}`}>
          <p className="font-handwriting text-lg sm:text-2xl md:text-3xl font-bold text-rose-600">🎉 Horeee! Ingatanmu luar biasa manis! Pasangan kue &amp; cinta telah lengkap! 🎂💖</p>
        </div>
      </main>

      <div className="flex flex-col items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 mb-2 z-10 text-center shrink-0 w-full max-w-md px-2">
        <button
          type="button"
          onClick={() => navigate('/cake')}
          className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-coral-400 via-rose-500 to-rose-400 text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(244,63,94,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(244,63,94,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-sans cursor-pointer"
        >
          <span className="text-lg sm:text-xl group-hover:scale-125 transition-transform">🎂</span>
          <span>Lanjut ke Kue Ulang Tahun &amp; Tiup Lilin</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        <p className="text-stone-500 font-handwriting text-sm sm:text-lg mt-0.5 px-2">Kue tart spesial sudah menunggu untuk ditiup bersama ✨</p>
      </div>
    </section>
  )
}
