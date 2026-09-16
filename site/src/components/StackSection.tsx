import { Code, FlowArrow, Lightning, ShieldCheck } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { BrandGlyph, Container, Reveal } from './primitives'
import { cn } from '../lib/cn'
import type { SkillCluster } from '../types/portfolio'

const CLUSTER_ICONS: Record<string, Icon> = {
  lightning: Lightning,
  flow: FlowArrow,
  shield: ShieldCheck,
  code: Code,
}

/**
 * One column of the matrix. Items are right-tagged with their depth tier, and
 * the column closes with a line saying what the cluster is actually used for.
 */
function Cluster({ cluster }: { cluster: SkillCluster }) {
  const Glyph = CLUSTER_ICONS[cluster.icon]

  return (
    <div className="flex flex-col bg-canvas p-6 lg:p-7">
      <div className="flex items-center justify-between gap-3 border-b border-hairline pb-4">
        <h3 className="label text-ink">{cluster.name}</h3>
        {Glyph && (
          <Glyph size={16} weight="regular" className="shrink-0 text-accent" aria-hidden />
        )}
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {cluster.items.map((item) => {
          const isCore = item.level === 'core'
          return (
            <li key={item.name} className="flex items-baseline justify-between gap-3">
              <span
                className={cn(
                  'font-mono text-[0.8125rem] leading-snug',
                  isCore ? 'font-medium text-ink' : 'text-secondary',
                )}
              >
                {item.name}
              </span>
              <span className={cn('label shrink-0', isCore ? 'text-accent' : 'text-muted')}>
                {isCore ? 'Core' : 'Working'}
              </span>
            </li>
          )
        })}
      </ul>

      <p className="mt-auto border-t border-hairline pt-5 font-mono text-[0.75rem] leading-relaxed text-muted">
        {cluster.note}
      </p>
    </div>
  )
}

export function StackSection() {
  const { skills, stackLogos } = portfolio

  return (
    <section id="stack" className="border-b border-hairline py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="label text-accent">
              Stack
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display max-w-[20ch] text-3xl text-ink uppercase sm:text-4xl lg:text-[2.75rem]">
                What I work in
              </h2>
              {/* Says what the two tiers mean, so neither reads as a rating. */}
              <span className="label text-muted">
                Core is daily use. Working is used with context.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-12 grid grid-cols-4 items-center gap-y-8 border-y border-hairline py-8 sm:grid-cols-8 lg:mt-14">
            {stackLogos.map((logo) => (
              <li key={logo.slug} className="flex justify-center px-2">
                <span className="block h-7 w-7 text-muted transition-colors hover:text-accent lg:h-8 lg:w-8">
                  <BrandGlyph slug={logo.slug} title={logo.name} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Four columns, one per cluster, divided by the hairline ground. */}
        <Reveal delay={0.1}>
          <div className="mt-5 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((cluster) => (
              <Cluster key={cluster.id} cluster={cluster} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
