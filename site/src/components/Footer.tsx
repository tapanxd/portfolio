import { portfolio } from '../data/portfolioData'
import { Container } from './primitives'

export function Footer() {
  const { engineer } = portfolio
  const year = new Date().getFullYear()

  const links = [
    { label: 'Email', href: `mailto:${engineer.email}` },
    { label: 'LinkedIn', href: engineer.linkedinUrl },
    engineer.githubUrl ? { label: 'GitHub', href: engineer.githubUrl } : null,
  ].filter((l): l is { label: string; href: string } => Boolean(l))

  return (
    <footer className="border-t border-hairline py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="display text-base text-ink uppercase">{engineer.name}</span>
            <span className="label text-muted">{engineer.location}</span>
          </div>

          <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="label text-secondary transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="label mt-8 border-t border-hairline pt-6 text-muted">
          {year} {engineer.name}
        </p>
      </Container>
    </footer>
  )
}
