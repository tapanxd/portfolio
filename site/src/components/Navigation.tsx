import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { useTheme } from '../hooks/useTheme'
import { portfolio } from '../data/portfolioData'
import { Container, Sheet } from './primitives'
import { cn } from '../lib/cn'

/** Section indices double as the nav labels, so both stay in one list. */
const NAV_SECTIONS = [
  { index: '01', label: 'About', id: 'about' },
  { index: '02', label: 'Work', id: 'work' },
  { index: '03', label: 'Projects', id: 'projects' },
  { index: '04', label: 'Stack', id: 'stack' },
  { index: '05', label: 'Career', id: 'career' },
  { index: '06', label: 'Credentials', id: 'credentials' },
  { index: '07', label: 'Contact', id: 'contact' },
] as const

/** Accent over canvas per theme, so each swatch previews what it switches to. */
const SWATCHES: Record<string, { canvas: string; accent: string }> = {
  forest: { canvas: '#05170f', accent: '#10b981' },
  oxblood: { canvas: '#120a0d', accent: '#d4af37' },
  obsidian: { canvas: '#0d0e10', accent: '#ea580c' },
  paper: { canvas: '#ebe4d4', accent: '#1b5e3b' },
}

function ThemeSwitcher({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const { theme, setTheme, themes } = useTheme()
  return (
    <div className="flex items-center gap-3">
      <span className="label hidden text-muted 2xl:inline">Theme</span>
      <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Colour theme">
        {themes.map((t) => {
          const active = t.id === theme
          const swatch = SWATCHES[t.id]
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${t.index} ${t.name} theme`}
              title={`${t.index} ${t.name}`}
              onClick={() => setTheme(t.id)}
              className={cn(
                'grid cursor-pointer place-items-center border transition-transform active:scale-[0.92]',
                size === 'lg' ? 'h-9 w-9' : 'h-6 w-6',
                active ? 'border-accent' : 'border-strong hover:border-accent',
              )}
              style={{ backgroundColor: swatch.canvas }}
            >
              <span
                className={cn(size === 'lg' ? 'h-3.5 w-3.5' : 'h-2 w-2')}
                style={{ backgroundColor: swatch.accent }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Navigation() {
  // The drawer records which route it was opened on rather than a bare
  // boolean, so any navigation (including browser back and forward) closes it
  // by derivation instead of by an effect.
  const [openPath, setOpenPath] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const { engineer } = portfolio

  const open = openPath === pathname
  const closeDrawer = () => setOpenPath(null)

  // IntersectionObserver on a sentinel rather than a scroll listener, so the
  // header state costs nothing per frame.
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;'
    document.body.prepend(sentinel)
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  // Never leave the page scroll-locked behind a closed drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenPath(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b',
        scrolled
          ? 'border-hairline bg-canvas/92 backdrop-blur-md'
          : 'border-transparent bg-canvas',
      )}
    >
      <Sheet>
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
            <Link to="/" className="group flex items-baseline gap-3 whitespace-nowrap">
              <span className="display text-lg tracking-[-0.01em] text-ink uppercase lg:text-xl">
                {engineer.name}
              </span>
              <span className="label hidden text-muted transition-colors group-hover:text-accent 2xl:inline">
                {engineer.roleTag}
              </span>
            </Link>

            <nav
              aria-label="Sections"
              className="hidden items-center gap-x-5 xl:flex"
            >
              {NAV_SECTIONS.map((s) => (
                <Link
                  key={s.id}
                  to={`/#${s.id}`}
                  className="label whitespace-nowrap text-secondary transition-colors hover:text-accent"
                >
                  <span className="text-muted">{s.index}</span> {s.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden xl:block">
                <ThemeSwitcher />
              </div>
              <button
                type="button"
                onClick={() => setOpenPath(pathname)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid h-9 w-9 cursor-pointer place-items-center border border-strong text-ink transition-colors hover:border-accent hover:text-accent xl:hidden"
              >
                <List size={18} weight="bold" />
              </button>
            </div>
          </div>
        </Container>
      </Sheet>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-50 bg-canvas xl:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Container className="flex h-full flex-col">
              <div className="flex h-16 shrink-0 items-center justify-between">
                <span className="display text-lg text-ink uppercase">{engineer.name}</span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="grid h-9 w-9 cursor-pointer place-items-center border border-strong text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <nav aria-label="Sections" className="flex flex-1 flex-col justify-center">
                {NAV_SECTIONS.map((s) => (
                  <Link
                    key={s.id}
                    to={`/#${s.id}`}
                    onClick={closeDrawer}
                    className="flex items-baseline gap-4 border-b border-hairline py-4 text-ink"
                  >
                    <span className="label text-muted">{s.index}</span>
                    <span className="display text-2xl uppercase">{s.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="shrink-0 py-8">
                <ThemeSwitcher size="lg" />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
