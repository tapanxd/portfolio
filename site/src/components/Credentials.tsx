import { ArrowUpRight, GraduationCap, SealCheck } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container, Reveal, RuledLabel } from './primitives'
import type { Credential } from '../types/portfolio'

function CredentialCard({ credential }: { credential: Credential }) {
  const isDegree = credential.kind === 'Degree'
  const Glyph = isDegree ? GraduationCap : SealCheck

  return (
    <article className="flex flex-col bg-surface p-6 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="label text-accent">{credential.kind}</span>
        <Glyph size={18} weight="regular" className="shrink-0 text-muted" aria-hidden />
      </div>

      <h4 className="display mt-4 text-xl text-ink sm:text-2xl">{credential.name}</h4>
      <p className="label mt-2 text-secondary">{credential.issuer}</p>

      <p className="mt-4 text-[0.9375rem] leading-relaxed text-secondary">
        {credential.description}
      </p>

      {/* Pushed to the bottom so every card in a row closes on the same line. */}
      <div className="mt-auto flex flex-col gap-2 border-t border-hairline pt-5">
        <span className="label text-muted">{credential.dates}</span>
        {credential.credentialId && (
          <span className="label text-muted">Credential ID {credential.credentialId}</span>
        )}
        {credential.verificationUrl && (
          <a
            href={credential.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="label group mt-1 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            Verify credential
            <ArrowUpRight
              size={13}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        )}
      </div>
    </article>
  )
}

/**
 * Grouped by issuer, two cards per row. The four Databricks credentials fill a
 * 2x2 block and the two degrees fill the row below it.
 */
export function Credentials() {
  const { credentials } = portfolio
  const verifiable = credentials
    .flatMap((group) => group.items)
    .filter((c) => c.verificationUrl).length

  return (
    <section id="credentials" className="border-b border-hairline bg-subtle py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="label text-accent">
              Credentials
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display max-w-[20ch] text-3xl text-ink uppercase sm:text-4xl lg:text-[2.75rem]">
                Verified and on file
              </h2>
              <span className="label text-muted">{verifiable} independently verifiable</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12 lg:mt-16">
          {credentials.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.06}>
              <RuledLabel>{group.name}</RuledLabel>
              <div className="mt-4 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
                {group.items.map((credential) => (
                  <CredentialCard key={credential.id} credential={credential} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
