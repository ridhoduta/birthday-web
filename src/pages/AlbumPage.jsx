import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import content from '../data/content.json'
import { useGsapPageAnimation } from '../hooks/useGsapPageAnimation'

const data = content.pages.album

export default function AlbumPage() {
  const pageRef = useRef(null)
  useGsapPageAnimation(pageRef)
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImg, setModalImg] = useState('')
  const [modalCaption, setModalCaption] = useState('')

  const openPhoto = (imgUrl, caption) => {
    setModalImg(imgUrl)
    setModalCaption(caption)
    setModalOpen(true)
  }

  const closePhoto = () => {
    setModalOpen(false)
    setModalImg('')
    setModalCaption('')
  }

  return (
    <motion.section ref={pageRef}
      className="h-screen w-full flex flex-col items-center justify-center px-2.5 py-2 sm:p-6 relative select-none overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div data-gsap="curtain" className="absolute inset-0 z-50 origin-left bg-rose-100 pointer-events-none"></div>
      <div data-gsap="click-wipe" className="absolute inset-x-0 top-0 h-1 z-50 bg-rose-400 pointer-events-none"></div>
      {/* Header */}
      <div className="text-center mb-1.5 sm:mb-3 z-10 px-2">
        <h2 data-gsap="text" className="font-sans text-xl sm:text-4xl font-extrabold text-stone-800 tracking-tight leading-tight">
          📖 {data.title}
        </h2>
        <p data-gsap="text" className="font-handwriting text-[13px] sm:text-2xl text-rose-600 mt-0.5 sm:mt-1 leading-snug">
          {data.subtitle}
        </p>
      </div>

      {/* MAIN OPEN PHOTOBOOK WITH 3D FLIP MECHANISM */}
      <div data-gsap="image" className="relative w-full max-w-4xl lg:max-w-5xl rounded-2xl sm:rounded-3xl bg-[#f0e3d2] p-1.5 sm:p-3 book-shadow border-2 sm:border-4 border-[#ebd8c3] z-10">
        <div className="book relative w-full h-[calc(100vh-120px)] sm:h-[calc(100vh-160px)] rounded-xl sm:rounded-2xl bg-[#fffdfa] border border-[#dfceb9]">

          {/* PAGE 1 (Left cover page) */}
          <label htmlFor="page-1" className="book__page book__page--1 relative group cursor-pointer select-none">
            <img src={data.coverImage} alt="Sampul Album" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 flex flex-col justify-between p-4 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="text-base sm:text-2xl">✨</div>
              </div>
              <div>
                <p className="font-handwriting text-white text-xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                  &ldquo;{data.cover.quote1}
                </p>
                <p className="font-handwriting text-white text-xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-md mb-3">
                  {data.cover.quote2}&rdquo;
                </p>
                
              </div>
            </div>
          </label>

          {/* PAGE 4 (Right page inside book - revealed when flipped open) */}
          <label htmlFor="page-2" className="book__page book__page--4 page-turn-right w-full p-2.5 sm:p-5 md:p-6 flex flex-col justify-between relative cursor-default">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex items-center justify-between">
                
              </div>

              {/* Two Mini Polaroids */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-1 sm:mt-2">
                {data.innerPage.photos.map((photo, idx) => (
                  <div data-gsap="stagger"
                    key={idx}
                    className={`polaroid-frame bg-white p-1.5 sm:p-2 pb-2 sm:pb-2.5 rounded border border-stone-200 ${photo.rotation} relative cursor-pointer group`}
                    onClick={(e) => {
                      e.stopPropagation()
                      openPhoto(photo.imageUrlFull, photo.caption)
                    }}
                  >
                    <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3 sm:h-3.5 ${photo.tapeColor} rounded ${idx === 0 ? '-rotate-2' : 'rotate-2'}`}></div>
                    <div className="w-full h-20 sm:h-28 md:h-32 rounded-xs overflow-hidden bg-stone-100">
                      <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <p className="font-handwriting text-[10px] sm:text-sm text-[#3d2720] text-center mt-1 sm:mt-1.5 leading-tight font-bold">{photo.caption}</p>
                    <p className="text-[7px] sm:text-[10px] text-stone-400 text-center mt-0.5 leading-tight">{photo.subcaption}</p>
                  </div>
                ))}
              </div>

              {/* Sticky Note */}
              <div className="p-2 sm:p-4 bg-[#fefce8] rounded-lg border border-amber-200/80 shadow-xs relative mt-1 sm:mt-2">
                <div className="absolute -top-2 right-4 sm:right-5 w-8 sm:w-10 h-2.5 sm:h-3 bg-amber-300/70 -rotate-3"></div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div className="text-sm sm:text-xl">💌</div>
                  <div>
                    <p className="font-handwriting text-[10px] sm:text-sm text-amber-950 font-bold leading-snug">
                      &ldquo;Semua halaman ini adalah bukti betapa berharganya kamu bagi orang-orang tersayang!&rdquo;
                    </p>
                    <p className="mt-1 text-[7px] sm:text-[10px] text-amber-800 font-medium leading-tight">
                      — Tertanda dengan segenap cinta 💖✨
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-3 border-t border-dashed border-[#e6d5c3] mt-2 sm:mt-3 flex items-center justify-between text-[9px] sm:text-xs">
              <span className="font-mono text-stone-400">Hal. 2</span>
            </div>
          </label>

          {/* Radio inputs to toggle book flip */}
          <input type="radio" name="page" id="page-1" defaultChecked />
          <input type="radio" name="page" id="page-2" />

          {/* PAGE 2 (Flipping leaf) */}
          <label className="book__page book__page--2">

            {/* Front of leaf: Right side of book when closed */}
            <div className="book__page-front p-3 sm:p-6 md:p-7 flex flex-col justify-between select-none">
              <div className="flex items-center justify-between border-b border-rose-100 pb-2 sm:pb-3">
                <span className="font-handwriting text-[11px] sm:text-base text-rose-600 font-bold leading-tight">{data.frontPage.heartLabel}</span>
              </div>

              <div className="flex flex-col items-center text-center my-auto py-2 sm:py-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 border-2 border-rose-200 flex items-center justify-center text-2xl sm:text-4xl shadow-md mb-2 sm:mb-3">
                  🎂
                </div>
                <h3 className="font-serif font-bold text-base sm:text-2xl text-rose-950 mb-1 leading-tight">
                  {data.frontPage.heading}
                </h3>
                <div className="w-10 sm:w-12 h-0.5 bg-rose-300 my-1 sm:my-1.5"></div>
                <p className="font-handwriting text-stone-600 text-[10px] sm:text-base max-w-xs leading-snug">
                  &ldquo;{data.frontPage.description}&rdquo;
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-dashed border-[#e6d5c3] flex items-center justify-between text-[9px] sm:text-xs text-stone-400">
                <label htmlFor="page-2" className="text-rose-500 font-medium cursor-pointer interactive-element leading-tight">
                  {data.frontPage.hint}
                </label>
              </div>
            </div>

            {/* Back of leaf: Left page inside book when open */}
            <div className="book__page-back page-turn-left w-full p-2.5 sm:p-5 md:p-6 flex flex-col justify-between relative select-none">
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center justify-between pt-1">
                </div>
                {/* Banner Tiup Lilin */}
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-rose-50/90 via-amber-50/60 to-orange-50/50 border border-rose-200/70 flex items-center gap-2 sm:gap-3 relative overflow-hidden shadow-2xs">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-white shadow-xs border border-rose-200 flex items-center justify-center text-base sm:text-xl">
                    {data.backPage.banner.emoji}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-base text-rose-950 leading-tight">{data.backPage.banner.title}</h4>
                    <p className="text-[8px] sm:text-xs text-[#70554c] leading-tight mt-0.5">{data.backPage.banner.description}</p>
                  </div>
                </div>

                {/* Left Polaroid */}
                <div className="flex flex-col items-center relative my-1 sm:my-2">
                  <div className="washi-tape-yellow w-24 sm:w-28 h-3.5 sm:h-4 -mb-2 z-20 rotate-[2deg] flex items-center justify-center text-[7px] sm:text-[10px] font-bold text-amber-800/80 tracking-wider pointer-events-none">
                    {data.backPage.polaroid.washiLabel}
                  </div>
                  <div
                    className="polaroid-frame bg-white p-2 sm:p-2.5 pb-2.5 sm:pb-3 rounded border border-stone-200 w-full max-w-[170px] sm:max-w-[260px] rotate-[-2deg] cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation()
                      openPhoto(data.backPage.polaroid.photoUrlFull, data.backPage.polaroid.caption)
                    }}
                  >
                    <div className="w-full h-24 sm:h-36 md:h-40 rounded-xs overflow-hidden bg-stone-100 relative">
                      <img src={data.backPage.polaroid.photoUrl} alt="Momen Indah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 bg-black/40 text-white text-[7px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full">
                        {data.backPage.polaroid.location}
                      </div>
                    </div>
                    <div className="mt-1 sm:mt-1.5 text-center">
                      <p className="font-handwriting text-[10px] sm:text-base text-rose-950 font-bold leading-tight">{data.backPage.polaroid.caption}</p>
                      <p className="text-[7px] sm:text-[10px] text-stone-500 mt-0.5 leading-tight">{data.backPage.polaroid.subcaption}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-dashed border-[#e6d5c3] flex items-center justify-between text-[8px] sm:text-xs text-[#8c6f64]">
                <span className="font-handwriting text-rose-700">{data.backPage.footerQuote}</span>
                <span className="font-mono text-stone-400">{data.backPage.pageNumber}</span>
              </div>
            </div>
          </label>
        </div>

        {/* Bookmark Ribbon */}
        <div className="absolute -bottom-3.5 sm:-bottom-4 right-8 sm:right-16 w-5 sm:w-7 h-8 sm:h-10 bg-rose-500 rounded-b-md shadow-md z-10 [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_75%,_0%_100%)] pointer-events-none"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-1.5 sm:mt-3 flex flex-col items-center gap-2 z-20">
        <button data-gsap-click
          onClick={() => navigate('/game')}
          className="group px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          Selanjutnya
          <span className="text-sm sm:text-base group-hover:translate-x-1 transition-transform">➔</span>
        </button>
      </div>

      {/* Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" onClick={closePhoto}>
          <div className="relative bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl max-w-xl w-full shadow-2xl border border-rose-100" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePhoto} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer text-sm sm:text-base font-bold">✕</button>
            <div className="rounded-lg overflow-hidden bg-stone-100 mb-4">
              <img src={modalImg} alt="Zoom Photo" className="w-full h-auto max-h-[75vh] object-contain mx-auto" />
            </div>
            <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-center text-stone-800 font-bold">{modalCaption}</p>
          </div>
        </div>
      )}
    </motion.section>
  )
}
