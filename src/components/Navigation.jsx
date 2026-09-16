import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '1. Amplop', icon: '💌' },
  { path: '/album', label: '2. Album', icon: '📸' },
  { path: '/game', label: '3. Game', icon: '🎮' },
  { path: '/cake', label: '4. Lilin', icon: '🕯️' },
  { path: '/wishes', label: '5. Doa', icon: '💐' },
]

const MELODY_NOTES = [
  { f: 264, d: 0.35 }, { f: 264, d: 0.25 }, { f: 297, d: 0.6 }, { f: 264, d: 0.6 }, { f: 352, d: 0.6 }, { f: 330, d: 1.1 },
  { f: 264, d: 0.35 }, { f: 264, d: 0.25 }, { f: 297, d: 0.6 }, { f: 264, d: 0.6 }, { f: 396, d: 0.6 }, { f: 352, d: 1.1 },
  { f: 264, d: 0.35 }, { f: 264, d: 0.25 }, { f: 528, d: 0.6 }, { f: 440, d: 0.6 }, { f: 352, d: 0.6 }, { f: 330, d: 0.6 }, { f: 297, d: 0.6 },
  { f: 466, d: 0.35 }, { f: 466, d: 0.25 }, { f: 440, d: 0.6 }, { f: 352, d: 0.6 }, { f: 396, d: 0.6 }, { f: 352, d: 1.2 }
]

export default function Navigation() {
  const location = useLocation()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const timerRef = useRef(null)
  const isPlayingRef = useRef(false)

  const playMelody = useCallback(() => {
    let index = 0

    function playNextNote() {
      if (!isPlayingRef.current) return
      const note = MELODY_NOTES[index]
      const ctx = audioCtxRef.current

      if (ctx) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(note.f, ctx.currentTime)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.d - 0.05)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + note.d)
      }

      index = (index + 1) % MELODY_NOTES.length
      timerRef.current = setTimeout(playNextNote, note.d * 1000)
    }

    playNextNote()
  }, [])

  const toggleMusic = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioContext()
    }

    if (!isPlayingRef.current) {
      isPlayingRef.current = true
      setIsPlaying(true)
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      playMelody()
    } else {
      isPlayingRef.current = false
      setIsPlaying(false)
      clearTimeout(timerRef.current)
    }
  }, [playMelody])

  useEffect(() => {
    return () => {
      isPlayingRef.current = false
      clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <nav className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-rose-100 text-xs sm:text-sm font-semibold text-stone-700 select-none">
      <button
        onClick={toggleMusic}
        className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 transition-all cursor-pointer"
      >
        <span
          className="text-base animate-spin"
          style={{ animationDuration: '4s', animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
          🎵
        </span>
        <span className="hidden sm:inline">{isPlaying ? 'Musik On 🎵' : 'Musik'}</span>
      </button>

      {/* <span className="text-stone-300">|</span> */}

      {/* <div className="flex items-center gap-1 text-[11px] sm:text-xs">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`hover:text-rose-500 transition-colors px-1.5 py-0.5 rounded hover:bg-rose-50 ${
              location.pathname === item.path ? 'text-rose-600 bg-rose-50 font-bold' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div> */}
    </nav>
  )
}
