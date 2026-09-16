import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretDown } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container, Emphasised, Reveal } from './primitives'
import { cn } from '../lib/cn'
import type { ExperienceRecord } from '../types/portfolio'

function Row({
  record,
  isOpen,
  onToggle,
}: {
  record: ExperienceRecord
  isOpen: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()
  const expandable = record.deliverables.length > 0
  const isStudy = record.kind === 'study'
  const panelId = `record-${record.id}`

  /* Identity on the left, the one line summary in the middle, the disclosure
     control on the right. Collapses to a single column below lg. */
  const header = (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-8">
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label text-muted">{record.period}</span>
          <span
            className={cn(
              'label border px-2 py-1',
              isStudy
                ? 'border-hairline text-muted'
                : 'border-hairline bg-badge text-badge-ink',
            )}
          >
            {record.badge}
          </span>
        </div>
        <h3
          className={cn(
            'display mt-3 text-xl sm:text-2xl',
            isStudy ? 'text-secondary' : 'text-ink',
          )}
        >
          {record.role}
        </h3>
        <p className="label mt-2 text-accent">
          {record.organisation}, {record.location}
        </p>
      </div>

      <div className="lg:col-span-5 lg:pt-1">
        <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-secondary">
          {record.summary}
        </p>
      </div>

      {expandable && (
        <div className="lg:col-span-2 lg:flex lg:justify-end lg:pt-1">
          <span className="label inline-flex items-center gap-3 border border-hairline px-3 py-2 text-muted transition-colors group-hover:border-accent group-hover:text-accent">
            {isOpen ? 'Collapse' : 'Expand record'}
            <CaretDown
              size={12}
              weight="bold"
              className={cn('transition-transform', isOpen && 'rotate-180')}
            />
          </span>
        </div>
      )}
    </div>
  )

  return (
    <li className="border-b border-hairline">
      {expandable ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group w-full cursor-pointer py-8 text-left lg:py-10"
        >
          {header}
        </button>
      ) : (
        <div className="py-8 lg:py-10">{header}</div>
      )}

      <AnimatePresence initial={false}>
        {expandable && isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-12 lg:gap-8">
              {/* A short indent keeps the drawer tied to the row above without
                  stranding half the width empty. */}
              <div className="lg:col-span-3" aria-hidden="true" />

              <div className="lg:col-span-6">
                <h4 className="label text-muted">Key deliverables</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {record.deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-strong" aria-hidden="true" />
                      <span className="text-[0.9375rem] leading-relaxed text-secondary">
                        <Emphasised text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3">
                <div className="border border-hairline bg-surface p-5">
                  <h4 className="label text-muted">Measured</h4>
                  <dl className="mt-4 flex flex-col gap-4">
                    {record.telemetry.map((t) => (
                      <div key={t.label} className="flex flex-col gap-1">
                        <dt className="label text-muted">{t.label}</dt>
                        <dd className="font-mono text-sm font-medium text-accent">
                          {t.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function ExperienceTimeline() {
  const { experience } = portfolio
  // The most recent role opens by default, so the section is never a wall of
  // collapsed rows with nothing to read.
  const [openId, setOpenId] = useState<string | null>(
    experience.find((r) => r.deliverables.length > 0)?.id ?? null,
  )

  // Span read off the record periods, so it cannot drift out of date.
  const years = experience.flatMap((r) => r.period.match(/\d{4}/g) ?? []).map(Number)
  const span = years.length ? `${Math.min(...years)} to ${Math.max(...years)}` : ''

  return (
    <section id="career" className="border-b border-hairline py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="label text-accent">
              Career
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display max-w-[20ch] text-3xl text-ink uppercase sm:text-4xl lg:text-[2.75rem]">
                Where the work happened
              </h2>
              {span && <span className="label text-muted">{span}</span>}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-12 border-t border-hairline lg:mt-16">
            {experience.map((record) => (
              <Row
                key={record.id}
                record={record}
                isOpen={openId === record.id}
                onToggle={() => setOpenId(openId === record.id ? null : record.id)}
              />
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
