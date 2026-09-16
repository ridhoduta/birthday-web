import { Routes, Route, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import Navigation from './components/Navigation'
import EnvelopePage from './pages/EnvelopePage'
import AlbumPage from './pages/AlbumPage'
import GamePage from './pages/GamePage'
import CakePage from './pages/CakePage'
import WishesPage from './pages/WishesPage'

function App() {
  const location = useLocation()
  const particleRef = useRef(null)

  return (
    <div className="min-h-screen text-stone-800 antialiased relative selection:bg-rose-200">
      {/* Ambient Glow Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="w-[520px] h-[520px] rounded-full bg-rose-200/35 blur-3xl -top-20 -left-20 absolute"></div>
        <div className="w-[620px] h-[620px] rounded-full bg-amber-100/50 blur-3xl top-1/3 right-0 absolute"></div>
        <div className="w-[450px] h-[450px] rounded-full bg-pink-100/40 blur-2xl bottom-10 left-1/4 absolute"></div>
      </div>

      {/* Floating Navigation */}
      <Navigation />

      {/* Global Particle Container */}
      <div ref={particleRef} id="particle-container" className="pointer-events-none fixed inset-0 z-50 overflow-hidden"></div>

      {/* Routes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EnvelopePage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/cake" element={<CakePage />} />
        <Route path="/wishes" element={<WishesPage />} />
      </Routes>
    </div>
  )
}

export default App
