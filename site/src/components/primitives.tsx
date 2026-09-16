import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  siApacheairflow,
  siApachekafka,
  siApachespark,
  siDatabricks,
  siDocker,
  siGit,
  siGithub,
  siPython,
} from 'simple-icons'
import { cn } from '../lib/cn'

/**
 * The drafting sheet. Everything on the site sits inside one continuous
 * bordered frame, with sections divided by hairlines rather than floating as
 * separate cards on a canvas.
 */
export function Sheet({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1400px] border-x border-hairline', className)}
    >
      {children}
    </div>
  )
}

/** Inner gutter. Width and framing come from Sheet. */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('px-5 sm:px-8 lg:px-12', className)}>{children}</div>
}

/**
 * Enter-on-scroll. Communicates reading order as sections arrive, so it is
 * deliberately subtle and fires once. Collapses to static under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Section index plus title. The numbered index is the site's wayfinding
 * system, matched one to one with the nav links, not decoration.
 */
export function SectionHeading({
  index,
  title,
  id,
  className,
}: {
  index: string
  title: string
  id?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <span className="label text-accent" aria-hidden="true">
        {index} <span className="text-muted">//</span> {title}
      </span>
      <h2
        id={id}
        className="display text-3xl leading-[1.02] text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
    </div>
  )
}

/**
 * Renders **bold** spans inside a data string. The only markup permitted in
 * copy, used to lift the figure out of a prose bullet so the eye finds it.
 */
export function Emphasised({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

/** Mono tag for stack items and metadata keys. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'label border border-hairline bg-badge px-2.5 py-1.5 text-badge-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A hairline rule that carries a mono label, used to open and close sections. */
export function RuledLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="label whitespace-nowrap text-muted">{children}</span>
      <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
    </div>
  )
}

const GLYPHS = {
  databricks: siDatabricks,
  apachespark: siApachespark,
  python: siPython,
  apachekafka: siApachekafka,
  apacheairflow: siApacheairflow,
  docker: siDocker,
  git: siGit,
  github: siGithub,
} as const

export type GlyphSlug = keyof typeof GLYPHS

/**
 * Official Simple Icons path data, rendered in the current text colour so the
 * row reads correctly in all four themes.
 */
export function BrandGlyph({
  slug,
  title,
  className,
}: {
  slug: string
  title: string
  className?: string
}) {
  const icon = GLYPHS[slug as GlyphSlug]
  if (!icon) return null
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 24 24"
      className={cn('h-full w-full', className)}
      fill="currentColor"
    >
      <title>{title}</title>
      <path d={icon.path} />
    </svg>
  )
}
