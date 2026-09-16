import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { spawnParticles } from '../utils/particles'

export default function WishesPage() {
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
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative select-none pt-16 pb-16">
      <main className="w-full max-w-xl mx-auto flex flex-col items-center my-4">
        {/* Bouquet Section */}
        <section className="w-full flex flex-col items-center relative mb-8">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white p-3 sm:p-4 rounded-2xl paper-card border border-cream-200 transition-all duration-300 hover:shadow-xl group">
            <div aria-hidden="true" className="washi-tape-top"></div>
            <div className="relative overflow-hidden rounded-xl bg-cream-50 aspect-[4/5] flex items-center justify-center border border-cream-100">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=80" alt="Buket Bunga Cantik Ulang Tahun" className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
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
                <span className="text-rose-400 text-xs sm:text-sm tracking-widest uppercase font-semibold block mb-1">Untaian Doa</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-800 font-medium leading-snug">
                  Doa &amp; Harapan Terbaik di Hari Istimewamu ✨
                </h2>
              </div>
              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed text-center font-light">
                <p>Selamat bertambah usia! Semoga langkahmu selalu dipeluk ketenangan, hatimu senantiasa dipenuhi kebahagiaan yang tulus, dan setiap impian indah yang kamu simpan diam-diam segera menemukan jalannya untuk terwujud.</p>
                <p>Terima kasih sudah hadir dan senantiasa mewarnai dunia di sekitarmu dengan senyuman manismu.</p>
              </div>
              <div className="mt-8 pt-4 border-t border-cream-100 flex flex-col items-end justify-end">
                <span className="font-handwriting text-2xl sm:text-3xl text-rose-500 transform -rotate-2">
                  Tertanda dengan segenap cinta &amp; sayang, 💖
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <nav aria-label="Aksi Halaman" className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm transition-all duration-200 shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Putar Ulang Memori</span>
            <span className="text-sm">🔄</span>
          </button>
        </nav>
      </main>
    </section>
  )
}
