import { Link } from 'react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container, Reveal, Tag } from './primitives'
import { cn } from '../lib/cn'
import type { CaseStudy } from '../types/portfolio'

function StackRow({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

function MetricRow({
  metrics,
  stacked = false,
}: {
  metrics: CaseStudy['metrics']
  stacked?: boolean
}) {
  return (
    <dl
      className={cn(
        'grid gap-x-6',
        stacked ? 'grid-cols-1 gap-y-7' : 'grid-cols-2 gap-y-4',
      )}
    >
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-1.5">
          <dt className="label text-muted">{m.label}</dt>
          <dd className="font-mono text-base leading-tight font-medium text-accent">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Renders as cells on the shared hairline ground rather than as a self-bordered
 * card. `lead` splits into narrative and readout columns; `standard` stacks the
 * two, so the section is not three identical tiles in a row.
 */
export function CaseCard({
  study,
  variant = 'standard',
}: {
  study: CaseStudy
  variant?: 'lead' | 'standard'
}) {
  const isLead = variant === 'lead'
  return (
    <article
      className={cn(
        'grid h-full gap-px bg-hairline',
        isLead ? 'lg:grid-cols-12' : 'grid-rows-[1fr_auto]',
      )}
    >
      <div className={cn('flex flex-col bg-surface p-6 lg:p-8', isLead && 'lg:col-span-7')}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label text-accent">{study.ref}</span>
          <span className="label text-muted">{study.tag}</span>
        </div>

        <h3
          className={cn(
            'display mt-5 text-ink',
            isLead ? 'text-2xl lg:text-[2rem]' : 'text-xl lg:text-2xl',
          )}
        >
          {study.title}
        </h3>

        <p className="mt-4 text-[0.9375rem] leading-relaxed text-secondary">
          {study.summary}
        </p>

        <div className={cn('mt-auto pt-6', isLead && 'lg:pt-8')}>
          <StackRow items={study.techStack} />
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col justify-between bg-surface p-6 lg:p-8',
          isLead && 'lg:col-span-5',
        )}
      >
        <MetricRow metrics={study.metrics} stacked={isLead} />
        <p className={cn('label text-muted', isLead ? 'mt-10' : 'mt-6')}>{study.meta}</p>
      </div>
    </article>
  )
}

export function CaseStudies() {
  const { caseStudies, featuredCaseIds } = portfolio
  const featured = featuredCaseIds
    .map((id) => caseStudies.find((c) => c.id === id))
    .filter((c): c is CaseStudy => Boolean(c))

  const [lead, ...rest] = featured
  // Domains covered by the archive, taken from the case tags themselves.
  const domains = [...new Set(caseStudies.map((c) => c.tag))]

  return (
    <section id="work" className="border-b border-hairline py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="label text-accent">
              02 <span className="text-muted">//</span> Work
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display max-w-[20ch] text-3xl text-ink uppercase sm:text-4xl lg:text-[2.75rem]">
                Selected work
              </h2>
              {/* Counted from the data, so it cannot drift out of date. */}
              <span className="label text-muted">
                {featured.length} featured <span className="text-hairline">//</span>{' '}
                {caseStudies.length} on file
              </span>
            </div>
          </div>
        </Reveal>

        {/* One connected block. The hairline ground shows through the 1px gaps
            as exact cell dividers at every breakpoint. */}
        <Reveal delay={0.06}>
          <div className="mt-12 grid gap-px border border-hairline bg-hairline lg:mt-16">
            {lead && <CaseCard study={lead} variant="lead" />}
            <div className="grid gap-px bg-hairline md:grid-cols-2">
              {rest.map((study) => (
                <CaseCard key={study.id} study={study} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* The archive deserves a real invitation, not a one-line link. The
            domains listed are the case tags themselves, so they stay true. */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-col gap-8 border border-hairline bg-surface p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <h3 className="display text-xl text-ink sm:text-2xl">The full archive</h3>
              <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-secondary">
                All {caseStudies.length} written the same way: the problem that caused
                the work, the mechanism that fixed it, and what changed afterwards.
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {domains.map((domain) => (
                  <li key={domain}>
                    <Tag>{domain}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/work"
              className="label group inline-flex shrink-0 items-center gap-3 self-start bg-accent px-5 py-3.5 text-accent-contrast transition-all hover:bg-accent-hover active:translate-y-px lg:self-auto"
            >
              Read the case studies
              <ArrowRight
                size={14}
                weight="bold"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
