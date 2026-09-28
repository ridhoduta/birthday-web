import { useState, useRef, useCallback, useEffect } from 'react'

const navItems = [
  { path: '/', label: '1. Amplop', icon: '💌' },
  { path: '/album', label: '2. Album', icon: '📸' },
  { path: '/game', label: '3. Game', icon: '🎮' },
  { path: '/cake', label: '4. Lilin', icon: '🕯️' },
  { path: '/wishes', label: '5. Doa', icon: '💐' },
]

export default function Navigation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/audio/audio.mp3')
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    const playAudio = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }

    window.addEventListener('birthday-audio-play', playAudio)

    return () => {
      window.removeEventListener('birthday-audio-play', playAudio)
      audio.pause()
      audio.currentTime = 0
      audioRef.current = null
    }
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    } else {
      audio.pause()
      setIsPlaying(false)
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
