import { useCallback, useEffect, useState } from 'react'
import type { ThemeName } from '../types/portfolio'

const STORAGE_KEY = 'tp-theme'

export const THEMES: { id: ThemeName; index: string; name: string }[] = [
  { id: 'forest', index: '01', name: 'Forest' },
  { id: 'oxblood', index: '02', name: 'Oxblood' },
  { id: 'obsidian', index: '03', name: 'Obsidian' },
  { id: 'paper', index: '04', name: 'Paper' },
]

const DEFAULT_THEME: ThemeName = 'forest'

function isTheme(value: string | null): value is ThemeName {
  return !!value && THEMES.some((t) => t.id === value)
}

function readStoredTheme(): ThemeName {
  // A blocking script in index.html has already applied this to <html>, so we
  // read it back rather than reapplying and risking a flash.
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) return stored
  } catch {
    // Private browsing or blocked storage. Fall through to the default.
  }
  const onElement = document.documentElement.getAttribute('data-theme')
  return isTheme(onElement) ? onElement : DEFAULT_THEME
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Theme still applies for this session, it just will not persist.
    }
  }, [theme])

  const setTheme = useCallback((next: ThemeName) => setThemeState(next), [])

  return { theme, setTheme, themes: THEMES }
}
