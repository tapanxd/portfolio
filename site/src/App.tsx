import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { Navigation } from './components/Navigation'
import { Sheet } from './components/primitives'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'

/**
 * Router-aware anchor handling. Nav links point at `/#section`, so arriving
 * from the work page navigates home first and then scrolls; landing on the
 * top of a page without a hash starts at the top.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    // Arriving from another route means the target can be thousands of pixels
    // away. Animating that is a two second scroll past the whole page, so
    // cross-route jumps land instantly and only same-page jumps glide.
    const changedRoute = previousPath.current !== pathname
    previousPath.current = pathname
    const behavior: ScrollBehavior = changedRoute ? 'instant' : 'smooth'

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // Wait for webfonts before measuring. Bodoni and Inter reflow the page as
    // they swap in, and scrolling first lands the section short of its anchor.
    let cancelled = false
    let raf = 0
    document.fonts.ready.then(() => {
      if (cancelled) return
      raf = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior })
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [pathname, hash])

  return null
}

// Vite exposes the configured base with a trailing slash; the router wants
// it without, so "/portfolio/" becomes "/portfolio" and "/" becomes "".
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <ScrollManager />
      <Navigation />
      <Sheet>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          {/* Unknown paths fall back to the portfolio rather than a dead end. */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Sheet>
    </BrowserRouter>
  )
}
