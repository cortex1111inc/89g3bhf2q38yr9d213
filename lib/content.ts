// Shared marketing content used across several pages.
import { FOUNDERS_SENTENCE } from '@/lib/people'

export const GENERAL_FAQS = [
  {
    question: 'What does Vanspire do?',
    answer:
      'Vanspire is a product and IT firm. We design and build custom software, AI and automation, mobile apps and web platforms, run cloud and IT consulting engagements, and provide digital marketing, so one team can take an idea from product to production to growth.',
  },
  {
    question: 'Who founded Vanspire and who leads it?',
    answer:
      `Vanspire was founded in 2024 by four co-founders: ${FOUNDERS_SENTENCE}. Akshay Krishna is the Chief Executive Officer, and Adithyan Dileep is the Founding Director and Chief Operating Officer.`,
  },
  {
    question: 'Where is Vanspire based?',
    answer:
      'Vanspire Innovations is based in Kerala, India. The firm works with clients across India and internationally, and runs projects remotely with regular video calls and written updates.',
  },
  {
    question: 'Is Vanspire a freelance team or a company?',
    answer:
      'Vanspire started in 2024 as a group of freelancers and has grown into a founder-led firm. You get the ownership of a small senior team with the process and breadth (design, engineering, cloud, AI and marketing) of an agency.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'Startups building a first product, growing companies replacing spreadsheets and legacy tools, and established organisations modernising their systems. We are based in Kerala, India, and work with clients across India and internationally.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Every engagement is scoped individually, so we do not publish standard pricing. After a short discovery conversation we send a clear proposal with scope, timeline and cost, and you decide whether to proceed.',
  },
  {
    question: 'How do projects work day to day?',
    answer:
      'You get a named lead, a shared backlog and a working release every one to two weeks. We run short demos so you see real progress and can steer priorities as you learn.',
  },
  {
    question: 'Can you work with our existing team or systems?',
    answer:
      'Yes. We regularly extend existing codebases, integrate with systems you already run and work alongside in-house developers, designers and marketers.',
  },
  {
    question: 'Do you support us after launch?',
    answer:
      'Yes. We offer maintenance and support plans covering monitoring, updates, bug fixes and continued development, so your product keeps improving after go-live.',
  },  {
    question: 'Do you work with clients outside India?',
    answer:
      'Yes. Vanspire works with clients in India and internationally. We schedule calls across time zones, work in English, and keep a shared backlog and written updates so remote projects stay transparent.',
  },
  {
    question: 'Which languages does the team work in?',
    answer: 'Projects and documentation are delivered in English. The team can also communicate in Malayalam and Hindi.',
  },

]

export const WHY_US = [
  {
    title: 'Product to IT under one roof',
    description: 'Strategy, design, engineering, infrastructure and marketing in one firm, so nothing gets lost between vendors.',
  },
  {
    title: 'Senior, founder-led delivery',
    description: 'The people who scope your project are the people who build it. No hand-offs to a team you never meet.',
  },
  {
    title: 'Built to last',
    description: 'Clean architecture, documentation and tests, so what we ship is an asset you can keep extending, not technical debt.',
  },
  {
    title: 'Transparent by default',
    description: 'Shared backlog, regular demos and honest estimates. You always know where the project stands.',
  },
]

export const ENGAGEMENT_MODELS = [
  {
    name: 'Fixed-scope project',
    best: 'Best for a clearly defined product or website',
    description: 'A defined scope, timeline and price agreed after discovery. Ideal when requirements are well understood.',
    points: ['Clear deliverables and milestones', 'Predictable budget', 'Change requests handled transparently'],
  },
  {
    name: 'Dedicated team',
    best: 'Best for evolving products and roadmaps',
    description: 'A cross-functional squad of engineers, designers and QA working as an extension of your team on a monthly basis.',
    points: ['Flexible scope and priorities', 'Scale the team up or down', 'Direct access to the people building'],
  },
  {
    name: 'Retainer & support',
    best: 'Best for live products and ongoing growth',
    description: 'A monthly plan for maintenance, hosting, monitoring, marketing and continuous improvement.',
    points: ['Guaranteed monthly capacity', 'Monitoring and response times', 'Roadmap reviews every quarter'],
  },
]

export const INDUSTRIES = [
  'Healthcare',
  'Manufacturing',
  'Retail & E-commerce',
  'Education',
  'Logistics',
  'Finance & Fintech',
  'Real Estate',
  'Hospitality',
  'Startups & SaaS',
  'Professional Services',
]

export const MARQUEE_WORDS = [
  'Custom Software',
  'AI & Automation',
  'Mobile Apps',
  'Web Platforms',
  'Cloud & DevOps',
  'IT Consulting',
  'Digital Marketing',
  'Product Design',
]

export const VALUES = [
  { title: 'Craft over speed', description: 'We would rather ship something solid than something fast that you will have to rebuild.' },
  { title: 'Plain language', description: 'No jargon walls. We explain trade-offs so you can make informed decisions.' },
  { title: 'Ownership', description: 'We treat your product like our own and flag problems early, including our own mistakes.' },
  { title: 'Long-term thinking', description: 'Every decision is weighed against what it will cost to maintain in two years.' },
]

export const INSIGHTS = [
  {
    slug: 'building-scalable-digital-systems',
    category: 'Systems Architecture',
    title: 'Building Scalable Digital Systems for Long-Term Growth',
    excerpt:
      'Why most companies build fragile systems, and the architectural principles that separate software built to endure from software built to ship.',
    date: 'February 2026',
    datePublished: '2026-02-01',
    readTime: '7 min read',
    href: '/insights/building-scalable-digital-systems',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    summary:
      'Scalable software is not just software that handles more traffic. It stays technically fast, operationally easy to deploy, understandable to new engineers and flexible to new business models. Fragile systems are the accumulated result of many individually reasonable shortcuts.',
    takeaways: [
      'Fragility comes from thousands of small decisions made under time and budget pressure, not one big mistake.',
      'Scalability has four dimensions: technical, operational, organisational and commercial.',
      'Five architectural decisions drive longevity: clear boundaries, durable data models, disciplined API contracts, built-in observability and independent deployment.',
      'Design for durability, not just delivery: the cheapest time to fix architecture is before it ships.',
    ],
    keywords: ['scalable software systems', 'enterprise digital platforms', 'software architecture principles', 'technical debt'],
  },
  {
    slug: 'future-ready-enterprise-technology-strategy',
    category: 'Digital Transformation',
    title: 'Designing Future-Ready Enterprise Technology Strategies',
    excerpt:
      'Strategic thinking beyond short-term technology decisions. How leaders can build technology programmes that stay relevant as markets evolve.',
    date: 'January 2026',
    datePublished: '2026-01-01',
    readTime: '8 min read',
    href: '/insights/future-ready-enterprise-technology-strategy',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    summary:
      'A future-ready technology strategy stays aligned with business goals as conditions change. It plans across several time horizons, defines clear governance for decisions, and builds internal capability rather than relying only on a static plan.',
    takeaways: [
      'Many technology strategies fail because they drift out of alignment with business goals.',
      'Future-ready strategies are adaptable by design, not locked to one set of predictions.',
      'A horizon model separates what to run now, what to build next and what to explore.',
      'Governance and in-house capability decide whether a strategy survives contact with reality.',
    ],
    keywords: ['enterprise technology strategy', 'digital transformation', 'IT governance', 'technology roadmap'],
  },
]
