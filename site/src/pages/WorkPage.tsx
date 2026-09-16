import { useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container, Reveal, Tag } from '../components/primitives'
import { Footer } from '../components/Footer'

export function WorkPage() {
  const { caseStudies } = portfolio

  useEffect(() => {
    document.title = `Case studies, ${portfolio.engineer.name}`
    return () => {
      document.title = `${portfolio.engineer.name}, ${portfolio.engineer.title}`
    }
  }, [])

  return (
    <>
      <main>
        <section className="pt-14 pb-16 lg:pt-20 lg:pb-20">
          <Container>
            <Link
              to="/"
              className="label group inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={13}
                weight="bold"
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to the portfolio
            </Link>

            <h1 className="display mt-10 max-w-[18ch] text-[2.5rem] text-ink uppercase sm:text-[3.25rem] lg:text-[4rem]">
              Case studies
            </h1>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-secondary lg:text-lg">
              Seven pieces of work, each written as the problem that caused it, the
              mechanism that fixed it, and what changed afterwards.
            </p>
          </Container>
        </section>

        <Container>
          <div className="border-t border-hairline">
            {caseStudies.map((study, i) => (
              <Reveal
                key={study.id}
                as="section"
                delay={i === 0 ? 0 : 0.04}
                className="border-b border-hairline py-14 lg:py-20"
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                  {/* Left rail: the index card for this record. */}
                  <div className="lg:col-span-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="label text-accent">{study.ref}</span>
                      <span className="label text-muted">{study.tag}</span>
                    </div>

                    <p className="label mt-5 text-secondary">{study.meta}</p>

                    <dl className="mt-8 flex flex-col gap-5 border-t border-hairline pt-6">
                      {study.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col gap-1.5">
                          <dt className="label text-muted">{m.label}</dt>
                          <dd className="font-mono text-base font-medium text-accent">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-8 flex flex-wrap gap-1.5">
                      {study.techStack.map((tech) => (
                        <li key={tech}>
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>

                    {study.link && (
                      <a
                        href={study.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="label group mt-8 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
                      >
                        {study.link.label}
                        <ArrowUpRight
                          size={13}
                          weight="bold"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>

                  {/* Right column: the write-up. */}
                  <div className="lg:col-span-8">
                    <h2 className="display text-2xl text-ink sm:text-3xl lg:text-[2.25rem]">
                      {study.title}
                    </h2>

                    <div className="mt-8 flex flex-col gap-8">
                      <div>
                        <h3 className="label text-muted">The problem</h3>
                        <p className="mt-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-secondary lg:text-base">
                          {study.detail.problem}
                        </p>
                      </div>

                      <div>
                        <h3 className="label text-muted">What I did</h3>
                        <ul className="mt-4 flex flex-col gap-3">
                          {study.detail.mechanism.map((step, si) => (
                            <li key={si} className="flex gap-3">
                              <span
                                className="mt-2.5 h-px w-3 shrink-0 bg-strong"
                                aria-hidden="true"
                              />
                              <span className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-secondary">
                                {step}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-l-2 border-accent pl-5">
                        <h3 className="label text-muted">Outcome</h3>
                        <p className="mt-3 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink lg:text-base">
                          {study.detail.proof}
                        </p>
                      </div>

                      {study.inProgress && (
                        <p className="label text-muted">
                          Write-up in progress. The detail at each layer is still being
                          documented.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>

        <section className="py-16 lg:py-20">
          <Container>
            <Link
              to="/#contact"
              className="label group flex items-center justify-between gap-4 text-ink transition-colors hover:text-accent"
            >
              <span>{portfolio.contact.headline}</span>
              <ArrowUpRight
                size={16}
                weight="bold"
                className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
