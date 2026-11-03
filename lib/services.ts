export type ServiceIcon =
  | 'code'
  | 'bot'
  | 'smartphone'
  | 'globe'
  | 'pen'
  | 'cloud'
  | 'compass'
  | 'megaphone'

export interface Service {
  slug: string
  name: string
  short: string // card title-length label
  tagline: string
  summary: string // one-sentence card copy
  intro: string[] // detail page overview paragraphs
  icon: ServiceIcon
  image: string
  imageAlt: string
  tags: string[]
  features: { title: string; description: string }[]
  includes: string[]
  stack: string[]
  faqs: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
}

export const SERVICES: Service[] = [
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    short: 'Custom Software',
    tagline: 'Software shaped around how your business actually works.',
    summary:
      'SaaS platforms, internal tools, portals and enterprise systems engineered to your workflow, not the other way round.',
    intro: [
      'Off-the-shelf tools work until your process stops fitting them. We design and build custom software, from internal operations tools to customer-facing SaaS, with clean architecture that your team can keep extending long after launch.',
      'Every build starts with the workflow, not the framework. We map how work moves through your business, remove the manual steps worth removing, and ship in small, usable releases so you see progress every few weeks rather than at the end.',
    ],
    icon: 'code',
    image: 'dev-screens',
    imageAlt: 'Developers reviewing code across multiple monitors',
    tags: ['SaaS', 'Internal tools', 'Enterprise', 'APIs', 'IoT platforms'],
    features: [
      { title: 'Built around your workflow', description: 'We model your real processes first so the software removes friction instead of adding screens.' },
      { title: 'Clean, extensible architecture', description: 'Modular codebases with documentation and tests so new features do not mean rewrites.' },
      { title: 'Integrations that hold up', description: 'ERP, CRM, payment, messaging and device integrations designed for failure, retries and monitoring.' },
      { title: 'Security by default', description: 'Role-based access, audit trails, encrypted data and secure deployment practices from day one.' },
    ],
    includes: [
      'Product scoping and technical architecture',
      'Web back-office and customer portals',
      'REST and event-driven APIs',
      'Role-based access and audit logging',
      'Legacy system modernisation and data migration',
      'IoT dashboards and device data pipelines',
      'Automated testing and CI/CD',
      'Documentation and handover',
    ],
    stack: ['TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'React', 'Next.js', 'Redis', 'Docker'],
    faqs: [
      { question: 'Can you take over or modernise an existing system?', answer: 'Yes. We start with a short technical audit of the current code, data and infrastructure, then recommend whether to refactor, rebuild in stages or leave parts alone.' },
      { question: 'Do we need a full specification before we start?', answer: 'No. We run a discovery phase to turn your goals into a scoped plan. You get a clear brief and estimate before committing to the build.' },
      { question: 'Who owns the source code?', answer: 'Ownership terms are written into the contract. Our default is that you own the code we build for you.' },
    ],
    metaTitle: 'Custom Software Development Company in India',
    metaDescription:
      'Vanspire builds custom software, SaaS platforms, enterprise systems and internal tools engineered around your workflow. Based in Kerala, serving clients worldwide.',
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    short: 'AI & Automation',
    tagline: 'Put AI to work on the tasks that slow your team down.',
    summary:
      'AI assistants, chatbots, document intelligence and workflow automation that remove repetitive work and speed up decisions.',
    intro: [
      'Most businesses do not need a research project. They need the repetitive, error-prone parts of their day handled reliably. We build practical AI and automation: assistants that answer from your own documents, workflows that route and process work, and agents that handle well-defined tasks end to end.',
      'We pick the right tool for each job. Sometimes that is a language model, sometimes a simple rule-based automation is cheaper and more dependable. We tell you which, and we build in human review where the stakes call for it.',
    ],
    icon: 'bot',
    image: 'ai-tablet',
    imageAlt: 'Person using a tablet showing an AI interface',
    tags: ['AI assistants', 'Chatbots', 'Workflow automation', 'Document AI', 'Analytics'],
    features: [
      { title: 'Assistants grounded in your data', description: 'Chat and search experiences that answer from your documents, policies and product data, with sources shown.' },
      { title: 'Workflow automation', description: 'Approvals, notifications, data entry and reporting wired together so routine work runs by itself.' },
      { title: 'Document processing', description: 'Extract, classify and validate data from invoices, forms and PDFs, then push it into your systems.' },
      { title: 'Guardrails and oversight', description: 'Human-in-the-loop review, logging and evaluation so AI output stays accurate and accountable.' },
    ],
    includes: [
      'AI opportunity assessment and prioritisation',
      'Customer-facing chatbots and website assistants',
      'Internal knowledge search over company documents',
      'Business process automation and integrations',
      'Document extraction and classification',
      'Reporting, forecasting and analytics models',
      'Evaluation, monitoring and cost control',
      'Team training and handover',
    ],
    stack: ['Claude', 'OpenAI', 'Groq', 'Python', 'LangChain', 'Vector search', 'n8n', 'Next.js'],
    faqs: [
      { question: 'Will our data be used to train public models?', answer: 'We choose providers and settings that do not train on your data by default, and we document exactly where data flows before anything is built.' },
      { question: 'How do you keep AI answers accurate?', answer: 'We ground answers in your approved content, show sources, add evaluation tests and keep a human review step for high-stakes outputs.' },
      { question: 'Where should we start with AI?', answer: 'With one high-volume, well-defined task. We help you pick it in a short assessment and prove value before expanding.' },
    ],
    metaTitle: 'AI & Business Automation Solutions',
    metaDescription:
      'Vanspire builds AI assistants, chatbots, document intelligence and workflow automation for businesses in India and worldwide.',
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    short: 'Mobile Apps',
    tagline: 'iOS and Android apps people keep on their home screen.',
    summary:
      'Cross-platform and native mobile apps, from MVP to store launch, with offline support and backend included.',
    intro: [
      'We build mobile apps end to end: product definition, UX, development, backend, store submission and post-launch support. Cross-platform frameworks let us ship iOS and Android together without compromising on feel, and we go native where performance demands it.',
      'We design for real-world conditions: patchy networks, older devices, field staff with one hand free. That means offline-first data sync, fast start-up and clear interfaces.',
    ],
    icon: 'smartphone',
    image: 'app-phones',
    imageAlt: 'Hands holding smartphones displaying app interfaces',
    tags: ['iOS', 'Android', 'React Native', 'Flutter', 'Offline-first'],
    features: [
      { title: 'One team, both platforms', description: 'React Native and Flutter builds that feel native on iOS and Android and cost less to maintain.' },
      { title: 'Offline-first by design', description: 'Local storage and background sync keep field and healthcare workflows running without a signal.' },
      { title: 'Backend and APIs included', description: 'Authentication, push notifications, payments and admin dashboards built alongside the app.' },
      { title: 'Store-ready launch', description: 'Release management, store listings, compliance checks and analytics set up before go-live.' },
    ],
    includes: [
      'Product discovery and MVP scoping',
      'UX and UI design with clickable prototypes',
      'iOS and Android development',
      'Backend, admin panel and API development',
      'Push notifications, payments, maps and chat',
      'App Store and Play Store submission',
      'Performance and crash monitoring',
      'Maintenance, updates and OS-upgrade support',
    ],
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'PostgreSQL', 'Fastlane'],
    faqs: [
      { question: 'Should we build native or cross-platform?', answer: 'For most products, cross-platform is faster and cheaper to maintain. We recommend native only when you need heavy graphics, deep hardware access or platform-specific behaviour.' },
      { question: 'Can you build the backend too?', answer: 'Yes. We build the API, database, admin dashboard and cloud hosting so you have one team responsible for the whole product.' },
      { question: 'Do you maintain apps after launch?', answer: 'Yes. Support plans cover bug fixes, OS updates, monitoring and a steady stream of improvements.' },
    ],
    metaTitle: 'Mobile App Development Company in India',
    metaDescription:
      'Vanspire designs and builds iOS and Android apps with React Native, Flutter and native stacks, including backend, store launch and ongoing support.',
  },
  {
    slug: 'web-development',
    name: 'Web Platform Development',
    short: 'Web Platforms',
    tagline: 'Fast, search-friendly websites and web apps that convert.',
    summary:
      'Marketing sites, e-commerce, portals and web applications built for speed, SEO and long-term maintainability.',
    intro: [
      'Your website is often the first and last impression. We build web platforms that load quickly, rank well and make it easy for visitors to take the next step, whether that is a purchase, a booking or an enquiry.',
      'From polished marketing sites to complex portals and dashboards, we use modern frameworks, component-based design systems and a content setup your team can update without a developer.',
    ],
    icon: 'globe',
    image: 'cowork-2',
    imageAlt: 'Designer working on a laptop in a bright studio',
    tags: ['Next.js', 'E-commerce', 'Portals', 'CMS', 'SEO'],
    features: [
      { title: 'Performance you can measure', description: 'Core Web Vitals targets, optimised images and edge caching so pages feel instant.' },
      { title: 'SEO built in', description: 'Clean markup, structured data, sitemaps and metadata strategy from the first commit.' },
      { title: 'Easy content management', description: 'Headless or traditional CMS setups so marketing can publish without waiting on engineering.' },
      { title: 'Designed to convert', description: 'Clear journeys, accessible interfaces and analytics so you learn what turns visitors into customers.' },
    ],
    includes: [
      'Marketing and corporate websites',
      'E-commerce and payment integration',
      'Customer and partner portals',
      'Dashboards and web applications',
      'CMS and design-system setup',
      'Accessibility and performance audits',
      'Analytics and conversion tracking',
      'Hosting, monitoring and maintenance',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Headless CMS', 'Shopify', 'Vercel'],
    faqs: [
      { question: 'How long does a website project take?', answer: 'A focused marketing site usually takes four to eight weeks. Larger portals and e-commerce builds are scoped individually.' },
      { question: 'Will we be able to edit the site ourselves?', answer: 'Yes. We set up a content system suited to your team and train you to use it.' },
      { question: 'Do you handle SEO and hosting?', answer: 'We build with SEO fundamentals included and can manage hosting, backups and monitoring after launch.' },
    ],
    metaTitle: 'Website & Web Application Development Company',
    metaDescription:
      'Vanspire builds fast, SEO-friendly websites, e-commerce stores, portals and web applications with Next.js and modern engineering practices.',
  },
  {
    slug: 'product-design-ux',
    name: 'Product Strategy & UX Design',
    short: 'Product & UX',
    tagline: 'From rough idea to a product people understand at a glance.',
    summary:
      'Discovery, UX research, UI design and prototypes that de-risk your build before engineering begins.',
    intro: [
      'The cheapest place to fix a product is on paper. We run discovery workshops, map users and journeys, and test prototypes early so you invest in the right features before writing production code.',
      'Our designers and engineers work side by side, so what gets designed is what can be built well, and what ships matches what was approved.',
    ],
    icon: 'pen',
    image: 'consult',
    imageAlt: 'Two professionals discussing a product plan',
    tags: ['Discovery', 'UX research', 'UI design', 'Prototypes', 'MVP'],
    features: [
      { title: 'Discovery workshops', description: 'Structured sessions to align on users, goals, constraints and what success looks like.' },
      { title: 'MVP scoping', description: 'A ruthless first release that proves the idea without building everything.' },
      { title: 'UX and UI design', description: 'Flows, wireframes and polished interfaces with accessibility and responsiveness built in.' },
      { title: 'Design systems', description: 'Reusable components and guidelines so every new screen stays consistent and quick to build.' },
    ],
    includes: [
      'Stakeholder and user interviews',
      'Competitive and market review',
      'User journeys and information architecture',
      'Wireframes and clickable prototypes',
      'Usability testing',
      'High-fidelity UI design',
      'Design system and handoff files',
      'Product roadmap and backlog',
    ],
    stack: ['Figma', 'FigJam', 'Maze', 'Storybook', 'Lottie', 'Tailwind CSS'],
    faqs: [
      { question: 'Can we hire you for design only?', answer: 'Yes. You can take the designs and specification to your own team, though most clients find handing over to our engineers saves time.' },
      { question: 'What do we get at the end of discovery?', answer: 'A product brief, user journeys, prioritised scope, clickable prototype, estimate and a delivery plan.' },
      { question: 'Do you redesign existing products?', answer: 'Yes. We audit usability, prioritise the biggest problems and improve incrementally so you do not pause delivery.' },
    ],
    metaTitle: 'Product Strategy, UX & UI Design Services',
    metaDescription:
      'Vanspire helps founders and businesses define, design and validate digital products with discovery, UX research, UI design and MVP scoping.',
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    short: 'Cloud & DevOps',
    tagline: 'Infrastructure that scales quietly and costs what it should.',
    summary:
      'Cloud architecture, migration, CI/CD and managed infrastructure on AWS, Azure and Google Cloud.',
    intro: [
      'Good infrastructure is invisible: deploys are boring, systems stay up and costs do not surprise you. We design, migrate and operate cloud environments that are secure, observable and sized to your real traffic.',
      'Whether you are moving from on-premise servers, untangling a sprawling cloud account or setting up delivery pipelines for the first time, we bring a plan, automate what can be automated and document the rest.',
    ],
    icon: 'cloud',
    image: 'datacenter',
    imageAlt: 'Illuminated corridor of server racks in a data centre',
    tags: ['AWS', 'Azure', 'Google Cloud', 'CI/CD', 'Security'],
    features: [
      { title: 'Cloud architecture and migration', description: 'Right-sized, secure designs and low-downtime migrations from servers or other clouds.' },
      { title: 'CI/CD and automation', description: 'Automated testing and deployment pipelines so releases are frequent and low risk.' },
      { title: 'Monitoring and reliability', description: 'Logging, alerts and runbooks so problems are caught before customers notice.' },
      { title: 'Cost and security review', description: 'Spend optimisation and hardening: access control, backups and compliance-minded setups.' },
    ],
    includes: [
      'Cloud readiness assessment',
      'Infrastructure as code',
      'Containerisation and orchestration',
      'CI/CD pipeline setup',
      'Backup, disaster recovery and failover',
      'Observability and alerting',
      'Security hardening and access reviews',
      'Managed infrastructure support',
    ],
    stack: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Grafana'],
    faqs: [
      { question: 'Can you reduce our cloud bill?', answer: 'Usually, yes. A cost review typically finds unused resources, oversized services and missing commitments that can be tuned without hurting performance.' },
      { question: 'Do you offer ongoing infrastructure support?', answer: 'Yes. Managed plans cover monitoring, patching, backups and on-call response.' },
      { question: 'Which cloud provider is best for us?', answer: 'It depends on your workloads, team skills and existing contracts. We recommend one with reasons, and avoid unnecessary lock-in.' },
    ],
    metaTitle: 'Cloud Infrastructure & DevOps Services',
    metaDescription:
      'Vanspire provides cloud architecture, migration, CI/CD and managed infrastructure on AWS, Azure and Google Cloud for growing businesses.',
  },
  {
    slug: 'it-consulting',
    name: 'IT Consulting & Implementation',
    short: 'IT Consulting',
    tagline: 'Technology strategy and delivery you can hold us to.',
    summary:
      'Digital transformation, ERP implementation, enterprise integration and fractional technology leadership.',
    intro: [
      'Technology decisions are expensive to reverse. We help leadership teams choose the right systems, plan the roadmap and deliver the implementation, from ERP rollouts to integrating the tools you already own.',
      'We also work as an extension of your team: technology audits, vendor selection, programme management and fractional CTO support when you need senior judgement without a full-time hire.',
    ],
    icon: 'compass',
    image: 'meeting',
    imageAlt: 'Consultants working through a plan around a table',
    tags: ['Digital transformation', 'ERP', 'Integration', 'Audits', 'Fractional CTO'],
    features: [
      { title: 'Digital transformation roadmaps', description: 'A prioritised, costed plan to modernise systems and processes in stages the business can absorb.' },
      { title: 'ERP implementation', description: 'Selection, configuration, data migration and training across SAP, Oracle, Microsoft Dynamics 365, Odoo and ERPNext.' },
      { title: 'Enterprise integration', description: 'API design, middleware and event-driven architecture that connect your systems into one flow of data.' },
      { title: 'Advisory and fractional CTO', description: 'Senior technical leadership, vendor evaluation and architecture review on a flexible basis.' },
    ],
    includes: [
      'Technology and process audits',
      'Digital transformation strategy',
      'ERP selection and implementation',
      'API and middleware integration',
      'Hospital and healthcare IT systems',
      'Vendor and tool evaluation',
      'Programme and project management',
      'IT support and managed services',
    ],
    stack: ['SAP', 'Oracle', 'Dynamics 365', 'Odoo', 'ERPNext', 'MuleSoft', 'Kafka', 'REST / HL7'],
    faqs: [
      { question: 'How do you run an ERP implementation?', answer: 'We follow a phased approach: discovery, design, configuration, data migration, testing and training, then go-live with hypercare support.' },
      { question: 'Can you connect systems that were never designed to talk?', answer: 'Usually. We build an integration layer with APIs, queues or file exchange so each system keeps its role while data flows between them.' },
      { question: 'Do you offer ongoing IT support?', answer: 'Yes. We provide managed support for the systems we deliver and for existing environments after an initial audit.' },
    ],
    metaTitle: 'IT Consulting, ERP & Digital Transformation',
    metaDescription:
      'Vanspire delivers IT consulting, ERP implementation, enterprise integration and digital transformation strategy for businesses in India and abroad.',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    short: 'Digital Marketing',
    tagline: 'Marketing that connects the product you built to the people who need it.',
    summary:
      'SEO, performance ads, social media, content and analytics that bring qualified customers to your door.',
    intro: [
      'Great products still need to be found. We handle search, paid media, social and content as one connected programme, tied to measurable outcomes such as leads, signups and sales rather than vanity metrics.',
      'Because we build the websites and apps as well, tracking is set up properly from the start and campaigns, landing pages and product experience improve together.',
    ],
    icon: 'megaphone',
    image: 'seo',
    imageAlt: 'SEO and analytics icons floating above a desk',
    tags: ['SEO', 'Performance ads', 'Social media', 'Content', 'Analytics'],
    features: [
      { title: 'SEO and content', description: 'Technical SEO, keyword strategy and useful content that earns organic traffic over time.' },
      { title: 'Performance advertising', description: 'Google and Meta campaigns tuned to cost per qualified lead or sale, not clicks.' },
      { title: 'Social media and brand', description: 'Consistent presence, creative and community management across the platforms your buyers use.' },
      { title: 'Analytics and CRO', description: 'Dashboards, event tracking and landing-page testing so every rupee is accountable.' },
    ],
    includes: [
      'Marketing audits and strategy',
      'Technical and local SEO',
      'Google Ads and Meta Ads management',
      'Social media management and creative',
      'Content, email and lead nurturing',
      'Landing pages and conversion optimisation',
      'Analytics, attribution and reporting',
      'Brand identity and collateral',
    ],
    stack: ['Google Ads', 'Meta Ads', 'GA4', 'Search Console', 'Semrush', 'Mailchimp', 'HubSpot', 'Looker Studio'],
    faqs: [
      { question: 'How quickly will we see results?', answer: 'Paid campaigns can produce leads within weeks. SEO and content typically take three to six months to compound.' },
      { question: 'How do you report performance?', answer: 'A live dashboard plus a monthly review covering spend, leads, cost per lead, and what we will test next.' },
      { question: 'Can you work with our in-house team?', answer: 'Yes. We can run the full programme or support specific channels alongside your team.' },
    ],
    metaTitle: 'Digital Marketing, SEO & Performance Ads Agency',
    metaDescription:
      'Vanspire runs SEO, Google and Meta ads, social media and content programmes tied to measurable leads and sales.',
  },
]

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)

/** Shared delivery lifecycle, shown on home, process and service pages. */
export const LIFECYCLE = [
  {
    step: '01',
    title: 'Discover',
    description: 'We learn your business, users and constraints, agree goals and define what success looks like before spending on build.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Flows, prototypes and architecture are tested with real users and stakeholders so scope is clear and risk is low.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Short iterations with working releases every couple of weeks, automated tests and a demo you can click through.',
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Staged rollout, monitoring, training and documentation so go-live is calm and your team is confident.',
  },
  {
    step: '05',
    title: 'Grow',
    description: 'Support, optimisation, marketing and new features guided by data, so the product keeps earning its place.',
  },
]
