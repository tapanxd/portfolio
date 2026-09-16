import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Warning } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container, Reveal } from './primitives'

type CopyState = 'idle' | 'copied' | 'failed'

const COPY_LABEL: Record<CopyState, string> = {
  idle: 'Copy',
  copied: 'Copied',
  failed: 'Select and copy',
}

/** The profile path of a URL, so the visible handle is never a second copy of
    it. github.com/tapanxd renders as "tapanxd". */
function handleFrom(url: string) {
  try {
    return new URL(url).pathname.replace(/^\/|\/$/g, '')
  } catch {
    return url
  }
}

function EmailSocket({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(async () => {
    window.clearTimeout(timer.current)
    try {
      // Unavailable over plain http and in some embedded browsers, so the
      // failure path tells the reader what to do instead of going quiet.
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      setState('failed')
    }
    timer.current = window.setTimeout(() => setState('idle'), 2600)
  }, [email])

  const Icon = state === 'copied' ? Check : state === 'failed' ? Warning : Copy

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      <div className="flex min-w-0 flex-1 items-center gap-3 border border-hairline bg-canvas px-4 py-3.5">
        <span className="label shrink-0 text-accent" aria-hidden="true">
          &gt;
        </span>
        <span className="truncate font-mono text-sm text-ink">{email}</span>
      </div>
      <button
        type="button"
        onClick={copy}
        className="label inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border border-strong px-5 py-3.5 text-ink transition-all hover:border-accent hover:text-accent active:translate-y-px"
      >
        <Icon size={13} weight="bold" />
        {COPY_LABEL[state]}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === 'copied' ? 'Email address copied to clipboard' : ''}
        {state === 'failed' ? 'Copying failed, please select the address manually' : ''}
      </span>
    </div>
  )
}

export function ContactTerminal() {
  const { engineer, contact } = portfolio

  // The socket above carries the email, so it is not repeated here.
  const channels = [
    {
      label: 'Phone',
      value: engineer.phone,
      href: `tel:${engineer.phone.replace(/[^+\d]/g, '')}`,
    },
    { label: 'LinkedIn', value: handleFrom(engineer.linkedinUrl), href: engineer.linkedinUrl },
    engineer.githubUrl
      ? { label: 'GitHub', value: handleFrom(engineer.githubUrl), href: engineer.githubUrl }
      : null,
  ].filter((c): c is { label: string; value: string; href: string } => Boolean(c))

  return (
    <section id="contact" className="field-grid field-rise py-20 lg:py-28">
      <Container>
        <div className="relative z-1 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="label text-accent">
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-6 max-w-[14ch] text-3xl text-ink uppercase sm:text-4xl lg:text-[3.25rem]">
                {contact.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-secondary">
                {contact.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pt-2">
            <Reveal delay={0.1}>
              <div className="border border-hairline bg-surface p-5 lg:p-7">
                <EmailSocket email={engineer.email} />

                <ul className="mt-7 divide-y divide-hairline border-t border-hairline">
                  {channels.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                      >
                        <span className="label text-muted">{channel.label}</span>
                        <span className="flex items-center gap-2 truncate font-mono text-sm text-ink transition-colors group-hover:text-accent">
                          {channel.value}
                          <ArrowUpRight
                            size={13}
                            weight="bold"
                            className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
