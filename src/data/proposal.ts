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

export interface RoiCard {
  id: string
  source: string
  /** Displayed as-is when countTo is undefined */
  stat: string
  /** If set, the stat animates from 0 → countTo on scroll-in */
  countTo?: number
  prefix?: string
  suffix?: string
  decimals?: number
  /** ≤ 2 sentences: what the data says */
  metric: string
  /** ≤ 2 sentences: why it matters for Lazer */
  why: string
  workstream: string
  urls: string[]
  refIds: number[]
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

export interface SystemNode {
  id: string
  number: string
  title: string
  workstream: string
  description: string
  includes: string[]
  returns: string[]
  /** Grid position: [col, row] (1-indexed) for desktop layout */
  col: number
  row: number
}

export interface BudgetBucket {
  id: string
  label: string
  amount: number
  description: string
  includes: string[]
  returns: string
  roi: { breakeven: string; annualReturn: string; note: string }
}

export interface TimelinePhase {
  phase: string
  label: string
  duration: string
  weekStart: number
  weekEnd: number
  deliverables: string[]
  milestones: string[]
}

export interface Reference {
  id: number
  source: string
  citation: string
  url: string
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
  investmentUSD: 65000,
  timelineMonths: 3,
  primaryBuyer: 'Enterprise teams trying to ship AI into production.',
  strategicFocus: ['AI', 'Commerce', 'Design', 'Fintech'],
  clarifications: [
    'Fintech is a primary vertical.',
    'Crypto/Web3 is deprioritized.',
    'Logo stays.',
    'Everything else in the brand system evolves.',
  ],
}

// ─── Hero Chips ───────────────────────────────────────────────────────────────

export const heroChips: HeroChip[] = [
  { kind: 'stat', value: '$65K',  label: 'Total investment' },
  { kind: 'stat', value: '3mo',   label: 'End-to-end delivery' },
  { kind: 'stat', value: '25+',   label: 'Cross-LOB case studies' },
  { kind: 'tag',  text: 'Agentic deck builder' },
  { kind: 'tag',  text: 'All core focus decks' },
  { kind: 'tag',  text: 'Full website redesign & build' },
  { kind: 'tag',  text: 'Lazer brand & content evolution' },
]

// ─── Market Shift ─────────────────────────────────────────────────────────────

export const marketShift: MarketShift = {
  headline:
    'The market has moved toward Lazer\'s strongest wedge.',
  narrative:
    'AI demand is no longer speculative. Companies are using AI, but most have not scaled it. Lazer\'s opportunity is to become the partner that helps enterprise teams move from AI ambition to shipped products, workflows, and platforms.',
  positioning:
    'Lazer is the AI-native product, design, and engineering partner for companies ready to move from ambition to production.',
  focus: ['AI / Automation', 'Commerce', 'Design Systems', 'Fintech'],
  focusNote:
    'Four primary verticals · Crypto / Web3 deprioritized · Focus on enterprise teams shipping AI into production.',
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
    refId:  1,
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
    refId:  2,
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
    refId:  3,
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

// ─── ROI Evidence Cards ───────────────────────────────────────────────────────

export const roiCards: RoiCard[] = [
  {
    id: 'design-roi',
    source: 'McKinsey & Company',
    stat: '+32pp',
    countTo: 32,
    prefix: '+',
    suffix: 'pp',
    decimals: 0,
    metric:
      'Top-quartile design performers delivered 32 percentage points higher revenue growth and 56pp higher total shareholder return over five years versus peers.',
    why:
      'Design makes Lazer\'s technical depth and enterprise credibility visible. It is not decoration — it is the mechanism by which quality becomes legible to buyers.',
    workstream: 'Branding + Web Design',
    urls: ['https://www.businesswire.com/news/home/20181025005383/en/McKinsey-Company-Releases-World-First-Study-Quantifying-Financial'],
    refIds: [4],
  },
  {
    id: 'b2b-self-serve',
    source: 'Gartner',
    stat: '61%',
    countTo: 61,
    prefix: '',
    suffix: '%',
    decimals: 0,
    metric:
      '61% of B2B buyers prefer a rep-free buying experience. 73% actively avoid suppliers who send irrelevant outreach.',
    why:
      'The website, case studies, and service pages must educate and qualify buyers before a sales conversation ever begins.',
    workstream: 'Website + Case Studies',
    urls: ['https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience'],
    refIds: [5],
  },
  {
    id: 'shortlist-dynamics',
    source: '6sense',
    stat: '95%',
    countTo: 95,
    prefix: '',
    suffix: '%',
    decimals: 0,
    metric:
      'Winning vendors are on the buyer\'s Day One shortlist 95% of the time. The pre-contact favorite wins roughly 80% of deals.',
    why:
      'Lazer must shape buyer preference before the first call. Brand, website, proof, and thought leadership build early consideration.',
    workstream: 'Brand + Website + Proof',
    urls: ['https://6sense.com/science-of-b2b/buyer-experience-report-2025/'],
    refIds: [6],
  },
  {
    id: 'ai-sales-validation',
    source: 'Gartner',
    stat: '69%',
    countTo: 69,
    prefix: '',
    suffix: '%',
    decimals: 0,
    metric:
      '69% of B2B buyers turn to sales reps to validate AI-generated insights at key moments in the buying process.',
    why:
      'Modular decks, one-pagers, and case studies give Lazer\'s team the right material to validate buyer thinking and move deals forward.',
    workstream: 'Decks + Sales Enablement',
    urls: ['https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights'],
    refIds: [7],
  },
  {
    id: 'web-performance',
    source: 'Google / Vodafone',
    stat: '53%',
    countTo: 53,
    prefix: '',
    suffix: '%',
    decimals: 0,
    metric:
      '53% of visits are abandoned when load time exceeds 3 seconds. Vodafone\'s 31% LCP improvement drove 8% more sales and a 15% better lead rate.',
    why:
      'A slow or heavy site undermines the technical excellence Lazer is selling. Performance is brand.',
    workstream: 'Web Design & Dev',
    urls: [
      'https://support.google.com/adsense/answer/7450973',
      'https://web.dev/case-studies/vodafone',
    ],
    refIds: [8, 9],
  },
  {
    id: 'brand-consistency',
    source: 'Marq',
    stat: '+20%',
    countTo: 20,
    prefix: '+',
    suffix: '%',
    decimals: 0,
    metric:
      'Strong brand consistency creates a 10–20% lift in top-line revenue, per Marq\'s brand enablement research.',
    why:
      'One reusable system across website, decks, proposals, social, and launch assets reduces reinvention cost while building compounding authority.',
    workstream: 'Brand + Deck System',
    urls: ['https://www.marq.com/blog/measure-brand-enablement-roi/'],
    refIds: [10],
  },
  {
    id: 'hidden-buyers',
    source: 'Edelman × LinkedIn',
    stat: '>40%',
    countTo: 40,
    prefix: '>',
    suffix: '%',
    decimals: 0,
    metric:
      'More than 40% of B2B deals stall due to internal misalignment — often driven by stakeholders the primary contact never meets.',
    why:
      'Founder posts, case studies, and launch assets reach hidden buyers and give champions better material to advocate internally.',
    workstream: 'Social + Content + Cases',
    urls: ['https://www.edelman.com/expertise/Business-Marketing/2025-b2b-thought-leadership-report'],
    refIds: [11],
  },
]

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

// ─── System Nodes (interactive scope map) ────────────────────────────────────

export const systemNodes: SystemNode[] = [
  {
    id: 'brand',
    number: '01',
    title: 'Brand System',
    workstream: 'Branding',
    description: 'A complete visual identity evolution — everything except the logo. Typography, color, spacing, iconography, and motion language unified into a single source of truth that makes Lazer look as sharp as the work it delivers.',
    includes: [
      'Brand guidelines & codified design tokens',
      'Typography scale, color system & dark/light modes',
      'Iconography direction & asset library',
      'Motion & interaction principles',
    ],
    returns: [
      'Consistent visual language across every touchpoint',
      'Faster production — designers pull from a shared system',
      'Credibility signal for enterprise buyers on first impression',
    ],
    col: 1,
    row: 1,
  },
  {
    id: 'website',
    number: '02',
    title: 'Website Rebuild',
    workstream: 'Web Design',
    description: 'A complete Webflow rebuild designed to sell before a rep ever speaks to a buyer. New information architecture, service clarity, and conversion paths — built to perform for enterprise-grade audiences who self-educate before contacting.',
    includes: [
      'New information architecture & wireframes',
      'Full Webflow design & development',
      'CMS, QA, performance optimization & launch',
      'SEO foundation — meta, structured data, Core Web Vitals',
    ],
    returns: [
      'Converts first-time visitors into qualified pipeline',
      'Positions Lazer as the premium enterprise option before a meeting',
      'SEO foundation that compounds organic traffic over time',
    ],
    col: 2,
    row: 1,
  },
  {
    id: 'casestudies',
    number: '03',
    title: 'Case Study Engine',
    workstream: 'Web Copy',
    description: '25+ structured case studies covering AI, Commerce, Design Systems, and Fintech — written to prove outcomes, not just describe work. Every case study maps to a buyer objection and a Lazer capability, turning proof into a searchable, shareable revenue asset.',
    includes: [
      '25+ case study write-ups across all four verticals',
      'Structured proof framework: challenge → approach → result',
      'Quantified outcomes where available',
      'CMS templates for ongoing publishing post-launch',
    ],
    returns: [
      'Sales team has a proof answer for every objection',
      'Search-discoverable evidence of cross-LOB expertise',
      'Reduces time-to-trust — buyers arrive pre-qualified',
    ],
    col: 3,
    row: 1,
  },
  {
    id: 'enablement',
    number: '04',
    title: 'Sales Enablement',
    workstream: 'Sales Enablement',
    description: 'A complete modular sales material system — from first pitch to signed SOW. Every template is on-brand, reusable, and designed to compress the sales cycle. Reps stop rebuilding from scratch for every deal and start closing with confidence.',
    includes: [
      'Core pitch decks: Lazer overview, AI, Fintech, Commerce, Design Systems',
      'Proposal templates — structured, on-brand, easy to customize per client',
      'Presentation templates for discovery calls, QBRs, and stakeholder readouts',
      '1-pager service briefs — one per core service (~12 total)',
      'Pricing templates with tiered structure and scope options',
      'Master modular slide library for mix-and-match deck assembly',
    ],
    returns: [
      'Proposal production drops from days to under 2 hours',
      'Consistent narrative and brand across every seller and deal',
      'Higher win rates — buyers receive polished materials at every stage',
    ],
    col: 1,
    row: 2,
  },
  {
    id: 'social',
    number: '05',
    title: 'Social & Launch Kit',
    workstream: 'Branding',
    description: 'A ready-to-deploy content system that lets the team announce work, attract talent, and maintain brand visibility without needing a designer for every post. Templated for LinkedIn, Instagram, and internal culture moments.',
    includes: [
      'LinkedIn post templates — case study reveals, thought leadership, hiring',
      'Instagram / visual content templates',
      'New work launch announcement kit',
      'Recruitment and employer brand assets',
    ],
    returns: [
      'Team ships polished, on-brand content independently',
      'Consistent brand presence across channels without overhead',
      'Launch moments that drive awareness, referrals, and inbound',
    ],
    col: 2,
    row: 2,
  },
  {
    id: 'measurement',
    number: '06',
    title: 'Measurement',
    workstream: 'Web Design',
    description: 'An analytics foundation built into the site from day one — not bolted on later. GA4 event tracking, conversion goals, and a live dashboard so the team knows which pages, case studies, and content pieces are actually driving qualified pipeline.',
    includes: [
      'GA4 setup with full event taxonomy',
      'Conversion goal configuration — form fills, CTA clicks, scroll depth',
      'Performance dashboard: traffic, leads, and content attribution',
      'Monthly reporting cadence setup',
    ],
    returns: [
      'Know exactly which content converts visitors to conversations',
      'Attribute revenue influence to specific pages and campaigns',
      'Continuous improvement loop built in from launch day',
    ],
    col: 3,
    row: 2,
  },
  {
    id: 'ai-production',
    number: '07',
    title: 'AI Production System',
    workstream: 'AI Enablement',
    description: 'Design tokens, component libraries, and structured templates that slot directly into AI-assisted production — replacing Google Slides and PDF workflows with a vibe-codeable sales material ecosystem. Built so any future update takes hours, not weeks.',
    includes: [
      'Component library with AI-ready design tokens',
      'Structured slide & deck templates optimized for AI editing',
      'Prompt-ready asset naming conventions',
      'Documentation and training for AI-assisted material updates',
    ],
    returns: [
      'Sales materials updated in hours, not weeks',
      'Consistent on-brand output from AI tools — no rogue formatting',
      'Out of the Google Slides / PDF trap permanently',
      'Compounding returns as AI tooling improves over time',
    ],
    col: 1,
    row: 3,
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
    id: 'website',
    label: 'Website Design & Build',
    amount: 35000,
    description: 'Full Webflow redesign and rebuild — IA, UX, visual design, development, CMS, QA, and launch.',
    includes: [
      'Full Webflow rebuild',
      'UX/UI design system',
      'Responsive design',
      'CMS templates',
      'Performance optimization',
      'Conversion path design',
      'Analytics & measurement setup',
    ],
    returns: 'Turns the website into a buyer education, credibility, and conversion engine that works 24/7.',
    roi: {
      breakeven: 'Q2 2026',
      annualReturn: '$200,000+',
      note: 'One incremental deal at $500K avg × 40% margin = $200K contribution — covers 5.7× of this line alone.',
    },
  },
  {
    id: 'copy',
    label: 'Web Copy & Case Studies',
    amount: 12500,
    description: '25+ cross-LOB case studies, homepage and service copy, and proof library.',
    includes: [
      'Website copywriting',
      '25+ cross-LOB case studies',
      'Service-line messaging',
      'Sales enablement copy',
      'Proof library',
    ],
    returns: 'Shortens sales cycles by giving buyers evidence at every objection point before sales gets involved.',
    roi: {
      breakeven: 'Q1 2026',
      annualReturn: '$150,000+',
      note: 'Case studies improve close rate — even 1 extra close per quarter pays back 10× this investment.',
    },
  },
  {
    id: 'branding',
    label: 'Branding Update',
    amount: 5000,
    description: 'Brand evolution, refreshed guidelines, and asset library.',
    includes: [
      'Brand guidelines refresh',
      'Visual identity refinement',
      'Asset library',
      'Usage standards',
    ],
    returns: 'Coherent brand presence across every buyer touchpoint — website, decks, social, and outreach.',
    roi: {
      breakeven: 'Month 1',
      annualReturn: '$50,000+',
      note: 'Brand credibility directly impacts perceived value and contract size. Most immediate lever.',
    },
  },
  {
    id: 'deck-builder',
    label: 'Agentic Deck Builder',
    amount: 12500,
    description: 'AI-powered proposal tool, all core focus decks, and template system.',
    includes: [
      'AI-powered proposal generation tool',
      'All core focus decks (AI, Commerce, Design, Fintech)',
      'Master modular deck template',
      'Pitch, proposal & SOW templates',
      'Sales team onboarding',
    ],
    returns: 'Eliminates custom deck time — reps send polished proposals in minutes, not days.',
    roi: {
      breakeven: 'Month 2',
      annualReturn: '$120,000+',
      note: 'Saves ~8hrs/proposal × 30 proposals/year × $500/hr blended cost = $120K in recovered capacity.',
    },
  },
]

export const totalBudget = 65000

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const timelinePhases: TimelinePhase[] = [
  {
    phase: 'Phase 01',
    label: 'Discovery & Brand',
    duration: 'Weeks 1–2',
    weekStart: 1,
    weekEnd: 2,
    deliverables: ['Brand audit', 'Stakeholder workshops', 'Brand direction', 'Content strategy'],
    milestones: ['Week 2'],
  },
  {
    phase: 'Phase 02',
    label: 'Website Design',
    duration: 'Weeks 3–4',
    weekStart: 3,
    weekEnd: 4,
    deliverables: ['UX wireframes', 'Visual design', 'Design system', 'Page templates'],
    milestones: ['Week 4'],
  },
  {
    phase: 'Phase 03',
    label: 'Copy & Case Studies',
    duration: 'Weeks 3–6',
    weekStart: 3,
    weekEnd: 6,
    deliverables: ['Website copy', '25+ case studies', 'Sales enablement copy', 'Proof library'],
    milestones: ['Week 6'],
  },
  {
    phase: 'Phase 04',
    label: 'Website Build',
    duration: 'Weeks 5–8',
    weekStart: 5,
    weekEnd: 8,
    deliverables: ['Webflow build', 'CMS setup', 'Integrations', 'Performance QA'],
    milestones: ['Week 8'],
  },
  {
    phase: 'Phase 05',
    label: 'Agentic Deck Builder',
    duration: 'Weeks 7–10',
    weekStart: 7,
    weekEnd: 10,
    deliverables: ['AI tool build', 'Core focus decks', 'Template system', 'Sales onboarding'],
    milestones: ['Week 10'],
  },
  {
    phase: 'Phase 06',
    label: 'Launch & Measure',
    duration: 'Weeks 11–12',
    weekStart: 11,
    weekEnd: 12,
    deliverables: ['QA & testing', 'Launch', 'Analytics setup', 'Measurement framework'],
    milestones: ['Week 12'],
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
    source: 'Stanford HAI — AI Index 2025',
    citation: 'Stanford University Human-Centered AI, AI Index Report 2025 — Economy Chapter. Corporate AI investment reached $252.3B globally in 2024; private AI investment grew 44.5% year-over-year.',
    url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report/economy',
  },
  {
    id: 2,
    source: 'McKinsey — State of AI 2025',
    citation: 'McKinsey & Company, The State of AI 2025. 78% of organizations now use AI in at least one business function, up from 55% a year prior; only ~one-third have begun scaling enterprise-wide.',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
  },
  {
    id: 3,
    source: 'BCG — AI Radar 2025',
    citation: 'Boston Consulting Group, AI Radar 2025: Closing the AI Impact Gap. Leading companies allocate >80% of AI investment toward reshaping key functions and building new offerings — not just automating existing ones.',
    url: 'https://www.bcg.com/publications/2025/closing-the-ai-impact-gap',
  },
  {
    id: 4,
    source: 'McKinsey — Business Value of Design',
    citation: 'McKinsey & Company, "The Business Value of Design," 2018. Top-quartile design companies achieved 32pp higher revenue growth and 56pp higher total shareholder return versus industry peers over five years.',
    url: 'https://www.businesswire.com/news/home/20181025005383/en/McKinsey-Company-Releases-World-First-Study-Quantifying-Financial',
  },
  {
    id: 5,
    source: 'Gartner — B2B Rep-Free Buying',
    citation: 'Gartner Sales Survey, 2025. 61% of B2B buyers prefer a rep-free buying experience; 73% avoid suppliers who send irrelevant outreach or fail to demonstrate understanding of their business.',
    url: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience',
  },
  {
    id: 6,
    source: '6sense — 2025 Buyer Experience Report',
    citation: '6sense, 2025 Buyer Experience Report. Winning vendors appear on the buyer\'s Day One shortlist 95% of the time; the pre-contact preferred vendor wins approximately 80% of deals.',
    url: 'https://6sense.com/science-of-b2b/buyer-experience-report-2025/',
  },
  {
    id: 7,
    source: 'Gartner — AI-Generated Insights Validation',
    citation: 'Gartner Survey, 2026. 69% of B2B buyers turn to sales representatives to validate AI-generated insights at critical decision points — raising the bar for sales credibility and preparedness.',
    url: 'https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights',
  },
  {
    id: 8,
    source: 'Google — Page Speed Abandonment',
    citation: 'Google AdSense Help / Think with Google. 53% of mobile visits are abandoned when page load time exceeds three seconds; each additional second of load time reduces conversions by up to 20%.',
    url: 'https://support.google.com/adsense/answer/7450973',
  },
  {
    id: 9,
    source: 'web.dev — Vodafone Core Web Vitals',
    citation: 'web.dev, Vodafone Core Web Vitals Case Study. A 31% improvement in Largest Contentful Paint drove an 8% increase in sales, 15% improvement in lead-to-visit rate, and 11% improvement in cart-to-visit rate.',
    url: 'https://web.dev/case-studies/vodafone',
  },
  {
    id: 10,
    source: 'Marq — Brand Consistency ROI',
    citation: 'Marq (formerly Lucidpress), Brand Enablement ROI Research. Organizations with consistent brand presentation across all channels report 10–20% top-line revenue lift versus inconsistently branded peers.',
    url: 'https://www.marq.com/blog/measure-brand-enablement-roi/',
  },
  {
    id: 11,
    source: 'Edelman × LinkedIn — B2B Thought Leadership',
    citation: 'Edelman × LinkedIn, 2025 B2B Thought Leadership Impact Report. More than 40% of B2B deals stall due to internal stakeholder misalignment — often involving buyers outside the primary sales contact\'s network.',
    url: 'https://www.edelman.com/expertise/Business-Marketing/2025-b2b-thought-leadership-report',
  },
]
