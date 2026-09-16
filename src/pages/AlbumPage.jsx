import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AlbumPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImg, setModalImg] = useState('')
  const [modalCaption, setModalCaption] = useState('')
  const navigate = useNavigate()

  const openPhoto = useCallback((src, caption) => {
    setModalImg(src)
    setModalCaption(caption)
    setModalOpen(true)
  }, [])

  const closePhoto = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-8 relative select-none py-8 sm:py-16">
      {/* MAIN OPEN PHOTOBOOK */}
      <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-[#f0e3d2] p-2.5 sm:p-4 book-shadow border-2 sm:border-4 border-[#ebd8c3]">
        <div className="relative flex flex-col md:flex-row w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#fffdfa] border border-[#dfceb9]">
          {/* LEFT PAGE */}
          <div className="page-turn-left w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#ebdccb]">
            <div className="absolute top-0 left-6 sm:left-8 washi-tape-pink w-24 sm:w-28 h-5 sm:h-6 -translate-y-2 rotate-[-2deg] shadow-xs z-20 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-rose-700/80 tracking-widest">MEMORI MANIS</div>
            <div className="pt-2 sm:pt-3">
              <div className="flex items-center justify-between">
                {/* <span className="text-xs font-bold uppercase tracking-widest text-amber-700/70">Lembar 01 • Hari Spesial</span> */}
                <div className="flex items-center gap-1 text-rose-500 text-sm">
                  <span>❤️</span>
                  <span className="font-handwriting text-base sm:text-lg text-rose-600 font-bold">Forever Loved</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-50/90 via-amber-50/60 to-orange-50/50 border border-rose-200/70 flex items-center gap-3 sm:gap-4 relative overflow-hidden shadow-xs">
                <div className="absolute -right-3 -bottom-3 text-5xl sm:text-6xl opacity-15 select-none pointer-events-none">🎂</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white shadow-md border-2 border-rose-200 flex flex-col items-center justify-center relative p-1">
                  <span className="text-2xl sm:text-3xl animate-pulse-love">🎂</span>
                  <div className="absolute -top-2 -right-1 text-xs">✨</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-rose-950">Tiup Lilin &amp; Bahagia</h3>
                    {/* <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-medium">Sweet Day 🎈</span> */}
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#70554c] leading-relaxed mt-0.5">Semoga tiap impianmu merekah manis, sehangat lilin kue ulang tahun yang dipanjatkan penuh cinta!</p>
                </div>
              </div>

              {/* Left Polaroid */}
              <div className="my-4 sm:my-5 flex flex-col items-center relative">
                <div className="washi-tape-yellow w-28 sm:w-32 h-5 sm:h-6 -mb-2.5 sm:-mb-3 z-20 rotate-[3deg] shadow-xs flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-amber-800/80 tracking-wider">14 FEBRUARI • FIRST TRIP ✈️</div>
                <div
                  className="polaroid-frame bg-white p-2.5 sm:p-3 pt-3 sm:pt-3.5 pb-3.5 sm:pb-4 rounded-xs sm:rounded-sm border border-stone-200/90 w-full max-w-full sm:max-w-[340px] rotate-[-2deg] cursor-pointer group"
                  onClick={() => openPhoto('https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80', 'Tawa Paling Lepas, Detik Paling Berharga!')}
                >
                  <div className="w-full h-36 sm:h-44 rounded-2xs sm:rounded-xs overflow-hidden bg-stone-100 relative">
                    <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80" alt="Momen Indah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1"><span>📍</span> Puncak Senja</div>
                  </div>
                  <div className="mt-2.5 sm:mt-3 text-center">
                    <p className="font-handwriting text-xl sm:text-2xl text-rose-950 font-bold leading-none">&quot;Tawa paling lepas, detik paling berharga!&quot;</p>
                    <div className="flex items-center justify-center gap-3 mt-1 sm:mt-1.5 text-[11px] sm:text-xs text-stone-500">
                      <span>📸 Foto Pertama Kita</span><span>•</span>
                      {/* <span className="text-rose-500 font-semibold flex items-center gap-0.5"><span>❤️</span> 100% Manis</span> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-[#e6d5c3] flex items-center justify-between text-xs text-[#8c6f64]">
                <span className="font-handwriting text-base sm:text-lg text-rose-700">&quot;Semoga harimu seindah senyummu&quot;</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-stone-400">Hal. 1</span>
              </div>
            </div>
          </div>

          {/* CENTER BINDING SPINE */}
          <div className="hidden md:block w-8 shrink-0 book-spine bg-gradient-to-r from-[#ebdcca] via-[#ded0bc] to-[#ebdcca] relative z-10">
            <div className="h-full w-full flex flex-col justify-around items-center py-6">
              {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-3 rounded-full bg-[#baa48f]/70"></div>)}
            </div>
          </div>

          {/* RIGHT PAGE */}
          <div className="page-turn-right w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between">
                {/* <span className="text-xs font-bold uppercase tracking-widest text-amber-700/70">Lembar 02 • Momen Tak Terlupa</span> */}
                <div className="flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 text-xs">
                  {/* <span>🍰</span><span className="text-rose-500 font-bold">Koleksi Senyuman</span><span>✨</span> */}
                </div>
              </div>

              {/* Two Mini Polaroids */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
                <div className="polaroid-frame bg-white p-2 sm:p-2.5 pb-2.5 sm:pb-3 rounded-xs sm:rounded-sm border border-stone-200/90 rotate-[1.5deg] relative cursor-pointer group" onClick={() => openPhoto('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80', 'Ngopi & Gosip Seru ☕')}>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-3.5 sm:h-4 bg-rose-200/80 rounded-xs -rotate-2"></div>
                  <div className="w-full h-24 sm:h-28 rounded-2xs sm:rounded-xs overflow-hidden bg-stone-100">
                    <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80" alt="Ngopi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="font-handwriting text-base sm:text-lg text-[#3d2720] text-center mt-1.5 sm:mt-2 leading-none font-bold">Ngopi &amp; Gosip Seru ☕</p>
                  <p className="text-[9px] sm:text-[10px] text-stone-400 text-center mt-0.5">Cerita tanpa batas</p>
                </div>
                <div className="polaroid-frame bg-white p-2 sm:p-2.5 pb-2.5 sm:pb-3 rounded-xs sm:rounded-sm border border-stone-200/90 rotate-[-2.5deg] relative cursor-pointer group" onClick={() => openPhoto('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80', 'Kue & Confetti! 🎉')}>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-3.5 sm:h-4 bg-amber-200/80 rounded-xs rotate-2"></div>
                  <div className="w-full h-24 sm:h-28 rounded-2xs sm:rounded-xs overflow-hidden bg-stone-100">
                    <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80" alt="Kue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="font-handwriting text-base sm:text-lg text-[#3d2720] text-center mt-1.5 sm:mt-2 leading-none font-bold">Kue &amp; Confetti! 🎉</p>
                  <p className="text-[9px] sm:text-[10px] text-stone-400 text-center mt-0.5">Kejutan manis berhasil</p>
                </div>
              </div>

              {/* Sticky Note */}
              <div className="mt-3 sm:mt-4 p-3 sm:p-3.5 bg-[#fefce8] rounded-xl sm:rounded-2xl border border-amber-200/80 shadow-xs relative">
                <div className="absolute -top-2.5 right-6 w-10 sm:w-12 h-3.5 sm:h-4 bg-amber-300/70 -rotate-3"></div>
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-lg sm:text-xl">💌</span>
                  <div>
                    <p className="font-handwriting text-lg sm:text-xl text-amber-950 font-bold leading-tight">&quot;Semua halaman ini adalah bukti betapa berharganya kamu bagi orang-orang tersayang!&quot;</p>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                      <span className="text-[10px] sm:text-[11px] text-amber-800 font-medium">— Tertanda dengan segenap cinta</span>
                      <span className="text-xs">💖✨</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2.5 sm:pt-3 border-t border-dashed border-[#e6d5c3] mt-3 sm:mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                {/* <span className="animate-pulse-love">🎂</span><span>Klik foto untuk memperbesar memori</span> */}
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-stone-400">Hal. 2</span>
            </div>
          </div>
        </div>

        {/* Bookmark */}
        <div className="absolute -bottom-4 sm:-bottom-5 right-8 sm:right-16 w-6 sm:w-8 h-10 sm:h-12 bg-rose-500 rounded-b-md shadow-md z-10 [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_75%,_0%_100%)]"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-5 sm:mt-7 flex flex-col items-center gap-2 z-20">
        <button onClick={() => navigate('/game')} className="group px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer">
          {/* <span className="text-lg group-hover:rotate-12 transition-transform">🎮</span> */}
          <span>Selanjutnya</span>
          <span className="text-sm sm:text-base group-hover:translate-x-1 transition-transform">➔</span>
        </button>
        {/* <div className="flex items-center gap-2 text-xs text-[#8c6f64]/90 font-medium">
          <span>📖 Ketuk foto meperbesar memori</span><span>•</span>
          <span className="text-rose-500">Kado berikutnya sudah menunggu</span>
        </div> */}
      </div>

      {/* Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4" onClick={closePhoto}>
          <div className="relative bg-white p-3.5 sm:p-6 rounded-lg sm:rounded-xl max-w-lg w-full shadow-2xl border border-rose-100" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePhoto} className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer text-xs sm:text-sm">✕</button>
            <div className="rounded-xs sm:rounded-sm overflow-hidden bg-stone-100 mb-3">
              <img src={modalImg} alt="Zoom Photo" className="w-full h-auto max-h-[70vh] object-contain mx-auto" />
            </div>
            <p className="font-handwriting text-xl sm:text-2xl text-center text-stone-800 font-bold">{modalCaption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
