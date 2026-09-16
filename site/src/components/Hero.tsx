import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowDownRight } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container } from './primitives'
import { cn } from '../lib/cn'
import type { TelemetryMetric } from '../types/portfolio'

/**
 * One cell of the telemetry row. Boxed metrics take the raised surface and a
 * marker, plain ones sit on the canvas, so the row alternates weight rather
 * than reading as four identical dashboard tiles.
 */
function Metric({ metric, index }: { metric: TelemetryMetric; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex flex-col gap-2 p-5 lg:p-7',
        metric.isBoxed ? 'bg-surface' : 'bg-canvas',
      )}
    >
      <div className="flex items-baseline gap-2">
        {metric.isBoxed && (
          <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
        )}
        <span className="font-mono text-2xl leading-none font-medium tracking-tight text-ink lg:text-[1.75rem]">
          {metric.value}
        </span>
      </div>
      <span className="label text-secondary">{metric.label}</span>
      <span className="font-sans text-[0.8125rem] leading-snug text-muted">
        {metric.subLabel}
      </span>
    </motion.div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const { engineer, hero } = portfolio

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    /* Sized to its content. Pinning the telemetry row to the viewport bottom
       with justify-between opened a void whenever the copy was shorter than
       the screen, which read as a layout bug rather than as space. */
    <section className="field-grid flex flex-col border-b border-hairline">
      <Container className="relative z-1 pt-10 lg:pt-14">
        <div>
          {/* Availability is real state, so it gets the one status dot on the page. */}
          <motion.p
            {...enter(0)}
            className="label flex items-center gap-2.5 text-accent"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="hidden sm:inline">{engineer.availability}</span>
            <span className="sm:hidden">{engineer.availabilityShort}</span>
          </motion.p>

          <motion.h1
            {...enter(0.08)}
            className="display mt-7 max-w-[22ch] text-[2rem] text-ink uppercase sm:text-[3rem] lg:mt-9 lg:text-[4rem] xl:text-[5rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            {...enter(0.16)}
            className="mt-6 max-w-[52ch] text-base leading-relaxed text-secondary lg:mt-8 lg:text-lg"
          >
            {hero.narrative}
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center gap-3 pb-10">
            <a
              href="#work"
              className="label inline-flex items-center gap-2 bg-accent px-5 py-3.5 text-accent-contrast transition-all hover:bg-accent-hover active:translate-y-px"
            >
              See the work
              <ArrowDown size={13} weight="bold" />
            </a>
            {engineer.resumeUrl && (
              <a
                href={engineer.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="label inline-flex items-center gap-2 border border-strong px-5 py-3.5 text-ink transition-all hover:border-accent hover:text-accent active:translate-y-px"
              >
                Download CV
                <ArrowDownRight size={13} weight="bold" />
              </a>
            )}
          </motion.div>
        </div>
      </Container>

      {/* gap-px over a hairline ground draws exact 1px cell dividers at every
          breakpoint, without per-cell border bookkeeping. */}
      <div className="relative z-1 mt-16 grid grid-cols-1 gap-px border-t border-hairline bg-hairline sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {hero.metrics.map((m, i) => (
          <Metric key={m.id} metric={m} index={i} />
        ))}
      </div>
    </section>
  )
}
