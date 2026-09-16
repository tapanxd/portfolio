import { Hero } from '../components/Hero'
import { PhilosophyPortrait } from '../components/PhilosophyPortrait'
import { CaseStudies } from '../components/CaseStudies'
import { Projects } from '../components/Projects'
import { StackSection } from '../components/StackSection'
import { AxiomBreak } from '../components/AxiomBreak'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { Credentials } from '../components/Credentials'
import { ContactTerminal } from '../components/ContactTerminal'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <PhilosophyPortrait />
        <CaseStudies />
        <Projects />
        <StackSection />
        <AxiomBreak />
        <ExperienceTimeline />
        <Credentials />
        <ContactTerminal />
      </main>
      <Footer />
    </>
  )
}
