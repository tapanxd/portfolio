import { portfolio } from '../data/portfolioData'
import { Container, Reveal } from './primitives'

/**
 * Figure plate. Renders the portrait when one is supplied, and a typographic
 * monogram otherwise, so the section is complete either way rather than
 * showing a broken image slot.
 */
function PortraitPlate() {
  const { engineer, philosophy } = portfolio
  const { top, bottom } = philosophy.portraitCaption

  return (
    <figure className="plate-marks relative border border-hairline bg-surface">
      <figcaption className="label border-b border-hairline px-4 py-3 text-muted">
        {top}
      </figcaption>

      <div className="relative aspect-4/5 overflow-hidden bg-elevated">
        {engineer.portraitUrl ? (
          <img
            src={engineer.portraitUrl}
            alt={engineer.portraitAlt}
            className="h-full w-full object-cover grayscale contrast-[1.08]"
            loading="eager"
            decoding="async"
          />
        ) : (
          /* TODO: replace with a high-contrast portrait, ~1200x1500, by setting
             engineer.portraitUrl in src/data/portfolioData.ts */
          <div className="grid h-full w-full place-items-center">
            <span className="display text-[7rem] leading-none text-strong select-none sm:text-[9rem]">
              {engineer.monogram}
            </span>
          </div>
        )}
      </div>

      <figcaption className="label border-t border-hairline px-4 py-3 text-muted">
        {bottom}
      </figcaption>
    </figure>
  )
}

export function PhilosophyPortrait() {
  const { philosophy } = portfolio

  return (
    <section id="about" className="border-b border-hairline py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 xl:col-span-4">
            <PortraitPlate />
          </Reveal>

          <div className="lg:col-span-7 lg:pt-2 xl:col-span-8">
            <Reveal>
              <span className="label text-accent">
                01 <span className="text-muted">//</span> About
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              {/* Descender clearance for the italic g and y in Bodoni. */}
              <h2 className="quote-italic mt-6 max-w-[24ch] text-2xl text-ink sm:text-[1.75rem] lg:text-[2.125rem]">
                {philosophy.axiom}
              </h2>
            </Reveal>

            <div className="mt-8 max-w-[62ch] space-y-5">
              {philosophy.body.map((paragraph, i) => (
                <Reveal key={i} delay={0.08 + i * 0.05}>
                  <p className="text-[0.9375rem] leading-relaxed text-secondary lg:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-hairline pt-7 sm:grid-cols-3 sm:gap-8">
                {philosophy.metadata.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <dt className="label text-muted">{item.label}</dt>
                    <dd className="text-sm leading-snug text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
