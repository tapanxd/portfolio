/* Every string the site renders is typed here and supplied from
   src/data/portfolioData.ts. No component hardcodes copy, metrics, names or
   links. Change the data file, not the components. */

export type ThemeName = 'forest' | 'oxblood' | 'obsidian' | 'paper'

/** A label/value pair rendered in the mono voice. Used for stat readouts. */
export interface Stat {
  label: string
  value: string
}

export interface TelemetryMetric extends Stat {
  id: string
  /** Mechanism behind the figure. Every number on this site names its cause. */
  subLabel: string
  /** Alternates framed HUD boxes with plain typographic callouts so the
      hero matrix does not read as four identical dashboard tiles. */
  isBoxed: boolean
}

export interface CaseStudy {
  id: string
  /** Archive index, e.g. "ARCH-01". */
  ref: string
  /** Domain tag shown beside the index, e.g. "AI TOOLING". */
  tag: string
  title: string
  /** Where the work happened. */
  meta: string
  /** One or two sentences. Shown on the home page card. */
  summary: string
  techStack: string[]
  metrics: Stat[]
  /** Long-form fields, rendered only on the work page. */
  detail: {
    problem: string
    mechanism: string[]
    proof: string
  }
  /** Optional external link, e.g. a public repository. */
  link?: { label: string; href: string }
  /** Marks the case as still being written up rather than quietly shipping
      a thin entry as if it were finished. */
  inProgress?: boolean
}

export interface ExperienceRecord {
  id: string
  period: string
  role: string
  organisation: string
  location: string
  badge: string
  /** Always visible, even when the row is collapsed. */
  summary: string
  deliverables: string[]
  telemetry: Stat[]
  /** Study intervals render in a quieter treatment than employment. */
  kind: 'employment' | 'study'
}

/**
 * Depth tier, taken from the confidence key in the source content rather than
 * a self-rated proficiency scale. 'core' appears across every resume and is
 * the daily stack; 'working' appears in several and is used with context.
 */
export type SkillLevel = 'core' | 'working'

export interface SkillItem {
  name: string
  level: SkillLevel
}

export interface SkillCluster {
  id: string
  name: string
  /** Key into the icon map in StackSection. */
  icon: string
  items: SkillItem[]
  /** One line under the rule, saying what the cluster is actually used for. */
  note: string
}

export interface Project {
  id: string
  name: string
  /** What it is, and the one thing about it worth knowing. */
  summary: string
  stack: string[]
  /** A project can span more than one repository. */
  links: { label: string; href: string }[]
  /** Still being built. Says so rather than implying it is finished. */
  inProgress?: boolean
}

export interface ProjectGroup {
  id: string
  name: string
  items: Project[]
}

export interface Credential {
  id: string
  /** Precise category, so training is never displayed as certification. */
  kind: string
  name: string
  issuer: string
  /** Empty when the issuer does not publish one. */
  credentialId: string
  dates: string
  description: string
  /** Empty string hides the verification link rather than shipping a dead one. */
  verificationUrl: string
  featured?: boolean
}

export interface CredentialGroup {
  id: string
  name: string
  items: Credential[]
}

export interface PortfolioContent {
  engineer: {
    name: string
    /** Two-letter monogram, used as the portrait fallback plate. */
    monogram: string
    title: string
    roleTag: string
    location: string
    availability: string
    /** Short form for tight layouts. */
    availabilityShort: string
    email: string
    phone: string
    linkedinUrl: string
    githubUrl: string
    resumeUrl: string
    /** Path or URL to a portrait. Empty falls back to the monogram plate. */
    portraitUrl: string
    portraitAlt: string
  }
  hero: {
    headline: string
    narrative: string
    metrics: TelemetryMetric[]
  }
  philosophy: {
    axiom: string
    body: string[]
    portraitCaption: { top: string; bottom: string }
    metadata: Stat[]
  }
  caseStudies: CaseStudy[]
  projects: ProjectGroup[]
  /** Ids from caseStudies, in the order shown on the home page. */
  featuredCaseIds: string[]
  operatingAxiom: string
  skills: SkillCluster[]
  /** simple-icons slugs for the stack logo row. */
  stackLogos: { slug: string; name: string }[]
  experience: ExperienceRecord[]
  credentials: CredentialGroup[]
  contact: {
    headline: string
    body: string
  }
}
