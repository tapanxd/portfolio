import { portfolio } from '../data/portfolioData'
import { Container, Reveal } from './primitives'

/**
 * Deliberate pause between the work and career sections. No box, no card, no
 * label. The only centred composition on the page, which is what makes it
 * register as a break rather than another section.
 */
export function AxiomBreak() {
  return (
    <section className="field-grid field-band border-b border-hairline">
      <Container>
        <Reveal>
          <div className="relative z-1 py-20 lg:py-28">
            <blockquote className="text-center">
              {/* The width cap lives on the sized element: `ch` resolves against
                  the element's own font-size, so on the blockquote it measured
                  against the inherited 14px and squeezed the quote into five
                  lines. 36ch is the width that breaks the line on the comma,
                  leaving "not from an analyst" alone as the second line. It is
                  measured for this sentence, so recheck it if the quote changes. */}
              <p className="quote-italic mx-auto max-w-[36ch] text-2xl text-ink sm:text-3xl lg:text-[2.5rem]">
                {portfolio.operatingAxiom}
              </p>
            </blockquote>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
