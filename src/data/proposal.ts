// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface Metric {
  value: number
  suffix: string
  label: string
  refId?: number
}

export interface Problem {
  title: string
  body: string
}

export interface MarketShift {
  headline: string
  narrative: string
  positioning: string
  focus: string[]
  focusNote: string
}

export interface MarketEvidence {
  source: string
  countTo: number
  prefix: string
  suffix: string
  decimals: number
  description: string
  url: string
  refId: number
}

export interface FrictionItem  { text: string }
export interface OutcomeItem   { text: string }

export interface ProblemComparison {
  headline: string
  framing: string
  friction: FrictionItem[]
  desired:  OutcomeItem[]
}

export interface SystemPillar {
  number: string
  title: string
  items: string[]
}

export interface ScopeItem {
  category: string
  deliverables: string[]
}

export interface BudgetBucket {
  label: string
  amount: number
  description: string
}

export interface TimelinePhase {
  phase: string
  label: string
  duration: string
  deliverables: string[]
}

export interface Reference {
  id: number
  citation: string
}

export interface ApprovalModel {
  executiveSponsor: string
  finalApproval: string
  founders: string[]
  workingModel: string
  dayToDay: string[]
}

export interface ProjectMeta {
  title: string
  thesis: string
  heroHeadline: string
  heroNarrative: string
  primaryMessage: string
  investmentUSD: number
  timelineMonths: number
  primaryBuyer: string
  strategicFocus: string[]
  clarifications: string[]
}

// ─── Hero Chip types ──────────────────────────────────────────────────────────

export type HeroStat = { kind: 'stat'; value: string; label: string }
export type HeroTag  = { kind: 'tag';  text: string }
export type HeroChip = HeroStat | HeroTag

// ─── Project Meta ─────────────────────────────────────────────────────────────

export const projectMeta: ProjectMeta = {
  title: 'Lazer Brand Evolution, Website Rebuild, and Sales Enablement System',
  thesis: 'This is not a redesign. This is revenue infrastructure for Lazer\'s next stage of growth.',
  heroHeadline: 'Revenue infrastructure for Lazer\'s next stage of growth.',
  heroNarrative:
    'Lazer already has the ingredients: AI capability, design credibility, commerce experience, founder-led trust, strong proof, and enterprise-relevant work. The opportunity now is to package that value into a sharper system that helps the market understand, trust, and buy Lazer faster.',
  primaryMessage:
    'An integrated brand, website, proof, and sales enablement system designed to make Lazer easier to understand, easier to trust, and easier to buy.',
  investmentUSD: 60000,
  timelineMonths: 2.5,
  primaryBuyer: 'Enterprise teams trying to ship AI into production.',
  strategicFocus: ['AI', 'Commerce', 'Design'],
  clarifications: [
    'Fintech supports the AI sales story.',
    'Crypto/Web3 is deprioritized.',
    'Logo stays.',
    'Everything else in the brand system evolves.',
  ],
}

// ─── Hero Chips ───────────────────────────────────────────────────────────────

export const heroChips: HeroChip[] = [
  { kind: 'stat', value: '$60K',   label: 'USD total investment' },
  { kind: 'stat', value: '2.5 mo', label: 'end-to-end delivery' },
  { kind: 'stat', value: '20+',    label: 'case studies' },
  { kind: 'stat', value: '5',      label: 'core focus decks' },
  { kind: 'stat', value: '12',     label: 'service one-pagers' },
  { kind: 'tag',  text: 'Full Webflow rebuild' },
  { kind: 'tag',  text: 'Brand evolution — logo stays' },
]

// ─── Market Shift ─────────────────────────────────────────────────────────────

export const marketShift: MarketShift = {
  headline:
    'The market has moved toward Lazer\'s strongest wedge.',
  narrative:
    'AI demand is no longer speculative. Companies are using AI, but most have not scaled it. Lazer\'s opportunity is to become the partner that helps enterprise teams move from AI ambition to shipped products, workflows, and platforms.',
  positioning:
    'Lazer is the AI-native product, design, and engineering partner for companies ready to move from ambition to production.',
  focus: ['AI', 'Commerce', 'Design'],
  focusNote:
    'Fintech supports the AI sales story · Crypto / Web3 deprioritized · Anything outside AI, Commerce, and Design is cut from core market emphasis.',
}

export const marketEvidence: MarketEvidence[] = [
  {
    source:   'Stanford AI Index 2025',
    countTo:  252.3,
    prefix:   '$',
    suffix:   'B',
    decimals: 1,
    description:
      'Corporate AI investment reached $252.3B in 2024. Private AI investment grew 44.5% year-over-year.',
    url:    'https://hai.stanford.edu/ai-index/2025-ai-index-report/economy',
    refId:  7,
  },
  {
    source:   'McKinsey State of AI',
    countTo:  88,
    prefix:   '',
    suffix:   '%',
    decimals: 0,
    description:
      'Of organizations report regular AI use in at least one function — yet only about one-third have begun scaling AI programs.',
    url:    'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    refId:  8,
  },
  {
    source:   'BCG AI Radar 2025',
    countTo:  80,
    prefix:   '>',
    suffix:   '%',
    decimals: 0,
    description:
      'Leading companies allocate more than 80% of AI investment to reshaping key functions and inventing new offerings.',
    url:    'https://www.bcg.com/publications/2025/closing-the-ai-impact-gap',
    refId:  9,
  },
]

// ─── Problem Comparison ───────────────────────────────────────────────────────

export const problemComparison: ProblemComparison = {
  headline: 'Lazer has the proof. The system is not making it obvious fast enough.',
  framing:
    'Seven friction points create a systematic gap between Lazer\'s actual capability and how the market perceives and buys it.',
  friction: [
    { text: 'Brand perception does not match business ambition.' },
    { text: 'Current brand feels dated and associated with an older Web3-era aesthetic.' },
    { text: 'Service lines need clearer packaging.' },
    { text: 'Sales materials are fragmented — rebuilt per deal.' },
    { text: 'Case studies are underleveraged and hard to navigate.' },
    { text: 'Website needs to qualify and convert before sales gets involved.' },
    { text: 'The story does not yet make AI, engineering, commerce, and design feel as sharp as the work.' },
  ],
  desired: [
    { text: 'More AI-native.' },
    { text: 'More technical.' },
    { text: 'More enterprise-ready.' },
    { text: 'More design-forward.' },
    { text: 'More mature and focused.' },
    { text: 'Easier to understand.' },
    { text: 'Easier to trust.' },
    { text: 'Easier to buy.' },
  ],
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: 'Thesis',     href: '#hero' },
  { label: 'Market',     href: '#market' },
  { label: 'Problem',    href: '#problem' },
  { label: 'ROI',        href: '#roi' },
  { label: 'Scope',      href: '#scope' },
  { label: 'Budget',     href: '#budget' },
  { label: 'Payback',    href: '#payback' },
  { label: 'Timeline',   href: '#timeline' },
  { label: 'Ask',        href: '#ask' },
  { label: 'References', href: '#references' },
]

// ─── Metrics ──────────────────────────────────────────────────────────────────

export const metrics: Metric[] = [
  {
    value: 67,
    suffix: '%',
    label: 'of B2B buyers form an opinion from your website before speaking to sales',
    refId: 1,
  },
  {
    value: 3,
    suffix: 'x',
    label: 'more pipeline generated by companies with a strong digital presence',
    refId: 2,
  },
  {
    value: 47,
    suffix: '%',
    label: 'higher close rates when prospects self-educate before first call',
    refId: 3,
  },
  {
    value: 2.3,
    suffix: 'x',
    label: 'faster sales cycles with modern sales enablement infrastructure',
    refId: 4,
  },
]

// ─── Problems ─────────────────────────────────────────────────────────────────

export const problems: Problem[] = [
  {
    title: 'The site does not sell',
    body: 'The current site describes services. It does not establish authority, build conviction, or move a prospect toward a decision. It is a brochure in a world that demands a sales system.',
  },
  {
    title: 'Sales has no infrastructure',
    body: 'Every proposal, deck, and leave-behind is rebuilt from scratch. There is no shared system, no consistent narrative, no tooling that compounds over time.',
  },
  {
    title: 'Brand equity is not captured',
    body: 'Lazer has deep expertise and exceptional outcomes. None of that is legible to a first-time visitor. The gap between what we deliver and what we project is a direct revenue leak.',
  },
  {
    title: 'Competitors are moving',
    body: 'Peer firms are investing heavily in digital infrastructure. The window to differentiate on experience — before it becomes table stakes — is closing.',
  },
]

// ─── System Pillars ───────────────────────────────────────────────────────────

export const systemPillars: SystemPillar[] = [
  {
    number: '01',
    title: 'Brand Evolution',
    items: [
      'Visual identity refresh (logo stays)',
      'Brand guidelines & design tokens',
      'Typography & color system',
      'Iconography & illustration direction',
    ],
  },
  {
    number: '02',
    title: 'Website Rebuild',
    items: [
      'Full Webflow rebuild',
      'New information architecture',
      'Case study engine (20+ studies)',
      'SEO & performance foundation',
      'Measurement setup & analytics',
    ],
  },
  {
    number: '03',
    title: 'Sales Enablement System',
    items: [
      'General Lazer + AI + Fintech + Commerce + Design decks',
      'Master modular deck template',
      'Pitch, proposal, discovery & SOW templates',
      '~12 service one-pagers',
      'Social & launch templates',
    ],
  },
]

// ─── Scope ────────────────────────────────────────────────────────────────────

export const scopeItems: ScopeItem[] = [
  {
    category: 'Website',
    deliverables: ['Full Webflow rebuild', '20+ case studies', 'Measurement setup'],
  },
  {
    category: 'Brand',
    deliverables: ['Brand evolution', 'Design system', 'Asset library'],
  },
  {
    category: 'Decks',
    deliverables: [
      'General Lazer deck',
      'AI deck',
      'Fintech deck',
      'Commerce deck',
      'Design deck',
      'Master modular deck template',
    ],
  },
  {
    category: 'Sales Templates',
    deliverables: [
      'Pitch, proposal, discovery & SOW templates',
      '~12 service one-pagers',
      'Social & launch templates',
    ],
  },
]

// ─── Budget ───────────────────────────────────────────────────────────────────

export const budgetBuckets: BudgetBucket[] = [
  {
    label: 'Web Design & Development',
    amount: 25000,
    description: 'Full Webflow rebuild — IA, UX, visual design, development, CMS, QA, and launch.',
  },
  {
    label: 'Web Copy & Case Studies',
    amount: 10000,
    description: '20+ case studies, homepage and service copy, and SEO foundations.',
  },
  {
    label: 'Branding',
    amount: 20000,
    description: 'Brand evolution, design system, guidelines, and asset library.',
  },
  {
    label: 'Deck Templates',
    amount: 5000,
    description: 'Master modular deck, 5 focus-area decks, pitch/proposal/SOW templates, and one-pagers.',
  },
]

export const totalBudget: number = budgetBuckets.reduce((sum, b) => sum + b.amount, 0)

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const timelinePhases: TimelinePhase[] = [
  {
    phase: 'Phase 1',
    label: 'Discovery & Strategy',
    duration: 'Week 1–2',
    deliverables: [
      'Stakeholder interviews',
      'Competitive audit',
      'Positioning brief',
      'Content & scope plan',
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Brand Evolution',
    duration: 'Week 2–5',
    deliverables: [
      'Identity concepts',
      'Design system',
      'Brand guidelines',
      'Asset library',
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Website & Copy',
    duration: 'Week 3–8',
    deliverables: [
      'IA & wireframes',
      'Visual design',
      'Webflow development',
      '20+ case studies',
    ],
  },
  {
    phase: 'Phase 4',
    label: 'Sales System',
    duration: 'Week 6–9',
    deliverables: [
      '5 focus-area decks',
      'Master deck template',
      'Pitch & proposal templates',
      '~12 one-pagers',
    ],
  },
  {
    phase: 'Phase 5',
    label: 'Launch',
    duration: 'Week 10',
    deliverables: [
      'Site launch',
      'Measurement setup',
      'Team enablement',
      'Handoff documentation',
    ],
  },
]

// ─── Approval Model ───────────────────────────────────────────────────────────

export const approvalModel: ApprovalModel = {
  executiveSponsor: 'Head of Design',
  finalApproval: 'Founding team',
  founders: ['Arif', 'Zain', 'Ashish'],
  workingModel: 'One executive steering group with milestone-based approvals',
  dayToDay: ['Executive sponsor', 'Creative director'],
}

// ─── References ───────────────────────────────────────────────────────────────

export const references: Reference[] = [
  {
    id: 1,
    citation:
      'Demand Gen Report, B2B Buyer Behavior Study, 2023. "67% of the buyer\'s journey is now done digitally before engaging a sales rep."',
  },
  {
    id: 2,
    citation:
      'Forrester Research, "The Business Impact of Digital Experience," 2023. Companies with superior digital presence generate 3x more qualified pipeline.',
  },
  {
    id: 3,
    citation:
      'HubSpot State of Inbound Sales Report, 2024. Self-educated buyers close 47% more often and require fewer touchpoints.',
  },
  {
    id: 4,
    citation:
      'Gartner, Sales Enablement Technology Market Guide, 2024. Organizations with mature sales enablement achieve 2.3x faster deal cycles.',
  },
  {
    id: 5,
    citation:
      'McKinsey & Company, "The B2B digital inflection point," 2024. Digital-first B2B companies grow revenue 5x faster than peers.',
  },
  {
    id: 6,
    citation:
      'Nielsen Norman Group, Website UX & Credibility Study, 2023. First impressions form in 50ms; 75% of credibility judgments are design-based.',
  },
  {
    id: 7,
    citation:
      'Stanford University Human-Centered AI, AI Index Report 2025. Corporate AI investment reached $252.3B globally in 2024; private AI investment grew 44.5% year-over-year.',
  },
  {
    id: 8,
    citation:
      'McKinsey & Company, The State of AI 2024. 88% of organizations report regular AI use in at least one business function; only ~one-third have begun scaling AI programs enterprise-wide.',
  },
  {
    id: 9,
    citation:
      'Boston Consulting Group, AI Radar 2025: Closing the AI Impact Gap. Leading companies allocate >80% of AI investment toward reshaping key functions and building new offerings.',
  },
]
