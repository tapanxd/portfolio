import { ArrowUpRight } from '@phosphor-icons/react'
import { portfolio } from '../data/portfolioData'
import { Container, Reveal, RuledLabel, Tag } from './primitives'
import type { Project } from '../types/portfolio'

/**
 * A register row rather than a card. Identity on the left, the write-up in the
 * middle, stack and repositories on the right, so the section does not repeat
 * the card grid used by credentials.
 */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  // Numbered across every group in page order, so inserting a project
  // anywhere renumbers the rest instead of leaving a gap.
  const ref = `P-${String(index).padStart(2, '0')}`
  return (
    <li className="grid grid-cols-1 gap-5 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
      <div className="lg:col-span-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label text-accent">{ref}</span>
          {project.inProgress && (
            <span className="label border border-hairline px-2 py-1 text-muted">
              In progress
            </span>
          )}
        </div>
        <h4 className="display mt-4 text-xl text-ink sm:text-2xl">{project.name}</h4>
      </div>

      <div className="lg:col-span-5">
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-secondary">
          {project.summary}
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-3">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-2">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="label group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
              >
                {link.label}
                <ArrowUpRight
                  size={13}
                  weight="bold"
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function Projects() {
  const { projects } = portfolio
  const total = projects.reduce((n, group) => n + group.items.length, 0)

  return (
    <section id="projects" className="border-b border-hairline py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="label text-accent">
              03 <span className="text-muted">//</span> Projects
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display max-w-[20ch] text-3xl text-ink uppercase sm:text-4xl lg:text-[2.75rem]">
                Built on my own time
              </h2>
              <span className="label text-muted">{total} public repositories</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12 lg:mt-16">
          {projects.map((group, i) => {
            const offset = projects.slice(0, i).reduce((n, g) => n + g.items.length, 0)
            return (
              <Reveal key={group.id} delay={i * 0.06}>
                <RuledLabel>{group.name}</RuledLabel>
                <ul className="divide-y divide-hairline border-b border-hairline">
                  {group.items.map((project, j) => (
                    <ProjectRow key={project.id} project={project} index={offset + j + 1} />
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
