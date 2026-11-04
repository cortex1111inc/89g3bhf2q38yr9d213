export type IntentType =
  | 'learn_service'
  | 'learn_product'
  | 'compare_services'
  | 'implementation_details'
  | 'technical_explanation'
  | 'pricing_inquiry'
  | 'contact_request'
  | 'general_question'

export type TopicCategory = 'service' | 'product' | 'company' | 'technical' | 'process'

export interface KnowledgeTopic {
  id: string
  title: string
  category: TopicCategory
  description: string
  detailedExplanation: string
  keyConcepts: string[]
  relatedTopics: string[]
  intents: IntentType[]
  commonQuestions: string[]
  url?: string
}

export const knowledgeGraph: KnowledgeTopic[] = [
  // ─── SERVICES HUB ─────────────────────────────────────────────────────────
  {
    id: 'services-overview',
    title: 'Services Overview',
    category: 'company',
    description: 'Vanspire is a product and IT firm offering custom software, AI and automation, mobile apps, web platforms, product design, cloud and DevOps, IT consulting and digital marketing.',
    detailedExplanation: 'Vanspire is a product and IT firm. Our eight service lines are:\n\n1. **Custom Software Development** - SaaS, internal tools, enterprise systems, IoT platforms.\n2. **AI & Automation** - assistants, chatbots, document intelligence, workflow automation.\n3. **Mobile App Development** - iOS and Android, cross-platform or native.\n4. **Web Platform Development** - websites, e-commerce, portals, web apps.\n5. **Product Strategy & UX Design** - discovery, UX research, UI design, MVP scoping.\n6. **Cloud & DevOps** - AWS, Azure, GCP, CI/CD, managed infrastructure.\n7. **IT Consulting & Implementation** - digital transformation, ERP, enterprise integration, advisory.\n8. **Digital Marketing** - SEO, ads, social media, content, analytics.\n\nEvery engagement is scoped individually - no off-the-shelf retainers.',
    keyConcepts: ['services', 'solutions', 'capabilities', 'offerings', 'products', 'what you do'],
    relatedTopics: ['digital-solutions', 'erp-implementation', 'hms', 'enterprise-integration'],
    intents: ['learn_service', 'general_question'],
    commonQuestions: ['What services do you offer?', 'What does Vanspire do?'],
    url: 'https://vanspire.in/services',
  },
  // ─── DIGITAL SOLUTIONS PILLAR ─────────────────────────────────────────────
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    category: 'service',
    description: 'Digital Solutions covers web platforms, mobile apps, cloud infrastructure, and digital transformation programmes.',
    detailedExplanation: "Vanspire's Digital Solutions pillar covers four areas:\n\n1. **Web Platform Development** - scalable, SEO-optimised web applications and portals built for performance.\n2. **Application Development** - cross-platform mobile applications (iOS & Android) with native-quality UX.\n3. **Cloud Infrastructure** - multi-cloud strategy, migration, DevOps pipelines, and managed infrastructure.\n4. **Digital Transformation** - end-to-end modernisation of legacy systems and processes into future-ready architectures.\n\nAll solutions are built to enterprise standards - not MVPs.",
    keyConcepts: ['digital solutions', 'technology services', 'web development', 'app development', 'cloud', 'digital transformation', 'platform engineering'],
    relatedTopics: ['web-platform', 'app-development', 'cloud-infrastructure', 'digital-transformation'],
    intents: ['learn_service', 'technical_explanation'],
    commonQuestions: ['What are your digital solutions?', 'Do you provide web and app development?'],
    url: 'https://vanspire.in/services',
  },
  {
    id: 'web-platform',
    title: 'Web Platform Development',
    category: 'service',
    description: 'Vanspire builds scalable, performant web platforms and portals - from marketing sites to complex SaaS interfaces.',
    detailedExplanation: 'Web Platform Development at Vanspire covers everything from high-performance marketing websites to full-stack web applications and SaaS dashboards.\n\nKey capabilities:\n- Next.js and React-based architectures optimised for Core Web Vitals\n- SEO-first engineering with structured data and metadata strategy\n- API-driven frontends connected to any backend or third-party service\n- Design systems, CMS integration, and long-term maintainability\n\nEvery web platform is built for scale, speed, and conversion - not just aesthetics.',
    keyConcepts: ['web platform', 'website', 'web app', 'portal', 'frontend', 'next.js', 'react', 'seo', 'saas website'],
    relatedTopics: ['digital-solutions', 'cloud-infrastructure'],
    intents: ['learn_service', 'technical_explanation', 'implementation_details'],
    commonQuestions: ['Can you build a website for us?', 'What technologies do you use for web development?'],
    url: 'https://vanspire.in/services/web-development',
  },
  {
    id: 'app-development',
    title: 'Application Development',
    category: 'service',
    description: 'Vanspire builds cross-platform mobile applications for iOS and Android with native-quality performance.',
    detailedExplanation: "Vanspire's Application Development practice focuses on cross-platform mobile engineering using React Native and Flutter - delivering apps that look and feel native on both iOS and Android.\n\nWhat we handle:\n- Full product lifecycle from wireframe to App Store / Play Store deployment\n- Offline-capable architectures for field or healthcare contexts\n- Integration with ERP, HMS, and third-party APIs\n- Ongoing maintenance, CI/CD pipelines, and performance optimisation\n\nWe do not build throwaway apps. Every application is engineered for longevity.",
    keyConcepts: ['mobile app', 'ios', 'android', 'react native', 'flutter', 'cross-platform', 'smartphone app'],
    relatedTopics: ['digital-solutions', 'enterprise-integration'],
    intents: ['learn_service', 'technical_explanation', 'implementation_details'],
    commonQuestions: ['Do you develop mobile apps?', 'What frameworks do you use for mobile development?'],
    url: 'https://vanspire.in/services/mobile-app-development',
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    category: 'service',
    description: 'Vanspire architects and manages cloud infrastructure on AWS, Azure, and GCP - with DevOps pipelines and enterprise-grade reliability.',
    detailedExplanation: 'Cloud Infrastructure at Vanspire covers the full spectrum of multi-cloud strategy and managed infrastructure:\n\n- **Cloud Migration** - lift-and-shift, re-platforming, and re-architecting legacy systems to AWS, Azure, or GCP\n- **DevOps & CI/CD** - automated pipelines, containerisation (Docker/Kubernetes), infrastructure-as-code\n- **Managed Infrastructure** - monitoring, alerting, cost optimisation, disaster recovery\n- **Security & Compliance** - VPC, IAM, encryption at rest/in-transit, compliance readiness\n\nWe design for 99.9%+ uptime with cost-efficiency built in from day one.',
    keyConcepts: ['cloud', 'aws', 'azure', 'gcp', 'devops', 'kubernetes', 'docker', 'ci/cd', 'hosting', 'migration', 'scalability'],
    relatedTopics: ['digital-solutions', 'digital-transformation'],
    intents: ['learn_service', 'technical_explanation', 'implementation_details'],
    commonQuestions: ['Can you help scale our cloud infrastructure?', 'Do you manage AWS or Azure environments?'],
    url: 'https://vanspire.in/services/cloud-devops',
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    category: 'process',
    description: 'Vanspire leads end-to-end digital transformation programmes - from strategy and architecture to execution and change management.',
    detailedExplanation: 'Digital Transformation at Vanspire is not a buzzword engagement. It is a structured programme to move organisations from legacy systems and manual processes to scalable, automated, and future-ready architectures.\n\nWhat this involves:\n- **Assessment** - technology audit, bottleneck mapping, and transformation roadmap\n- **Architecture Design** - microservices, event-driven systems, API-first design\n- **Migration & Build** - phased replacement of legacy systems with zero business disruption\n- **Change Management** - training, documentation, and adoption support for internal teams\n\nWe treat transformation as infrastructure investment, not a one-time project.',
    keyConcepts: ['legacy modernization', 'process automation', 'workflow', 'agile', 'change management', 'business transformation'],
    relatedTopics: ['digital-solutions', 'cloud-infrastructure', 'erp-implementation'],
    intents: ['learn_service', 'implementation_details', 'technical_explanation'],
    commonQuestions: ['How do you approach digital transformation?', 'Can you help modernize our legacy systems?'],
    url: 'https://vanspire.in/services/it-consulting',
  },
  // ─── INTEGRATION AND IMPLEMENTATION PILLAR ────────────────────────────────
  {
    id: 'erp-implementation',
    title: 'ERP Implementation',
    category: 'service',
    description: 'Vanspire implements ERP systems across SAP, Oracle, Microsoft Dynamics, Odoo, and ERPNext - using a structured 6-phase methodology.',
    detailedExplanation: 'ERP Implementation at Vanspire follows a disciplined 6-phase methodology:\n\n1. **Analysis** - business process mapping, gap analysis, and requirements documentation\n2. **Platform Selection** - recommending the right ERP (SAP, Oracle, Dynamics 365, Odoo, ERPNext) based on scale, industry, and budget\n3. **Design** - system architecture, module configuration, and integration design\n4. **Build** - custom development, third-party integrations, data model setup\n5. **Migration** - historical data cleaning, validation, and cutover planning\n6. **Go-Live & Support** - hypercare support, training, and post-deployment stabilisation\n\nSupported platforms: SAP S/4HANA, Oracle ERP Cloud, Microsoft Dynamics 365, Odoo, ERPNext.\n\nWe do not do rapid deployments. Every ERP goes live when it is ready.',
    keyConcepts: ['erp', 'sap', 'oracle', 'microsoft dynamics', 'dynamics 365', 'odoo', 'erpnext', 'enterprise resource planning'],
    relatedTopics: ['enterprise-integration', 'digital-transformation'],
    intents: ['learn_service', 'implementation_details', 'compare_services'],
    commonQuestions: ['What ERP systems do you implement?', 'How long does an ERP implementation take?'],
    url: 'https://vanspire.in/work/erp-implementation',
  },
  {
    id: 'hms',
    title: 'Hospital Management System (HMS)',
    category: 'product',
    description: 'Vanspire HMS is a proprietary, enterprise SaaS platform for hospitals and clinics - covering OP, IP, Pharmacy, Billing, Lab, Radiology, Admin, and Analytics.',
    detailedExplanation: 'Vanspire HMS is a fully integrated Hospital Management System built as enterprise SaaS - designed for multi-specialty hospitals, clinics, and healthcare groups.\n\n**8 Core Modules:**\n1. **OP Management** - appointment scheduling, queue management, OPD workflows\n2. **IP Management** - ward management, bed allocation, nursing notes, discharge summaries\n3. **Pharmacy** - inventory management, prescription fulfillment, drug interaction checks\n4. **Billing & Finance** - insurance claims, cashless processing, financial reporting\n5. **Laboratory (LIMS)** - test ordering, sample tracking, result reporting and notifications\n6. **Radiology** - DICOM integration, imaging workflows, radiology reporting\n7. **Admin & HR** - staff scheduling, role-based access, department management\n8. **Analytics & Reporting** - real-time dashboards, operational KPIs, compliance reports\n\n**Compliance:** ABDM-ready, NABH-aligned, DPDP Act compliant.\n**Deployment:** Cloud (multi-tenant SaaS) and on-premise options available.',
    keyConcepts: ['hms', 'hospital software', 'clinic software', 'healthcare system', 'patient management', 'emr', 'ehr', 'medical records', 'hospital saas'],
    relatedTopics: ['enterprise-integration', 'app-development'],
    intents: ['learn_product', 'implementation_details', 'technical_explanation'],
    commonQuestions: ['What modules does your HMS include?', 'Is your hospital system ABDM compliant?'],
    url: 'https://vanspire.in/work/hospital-management-system',
  },
  {
    id: 'enterprise-integration',
    title: 'Enterprise System Integration',
    category: 'service',
    description: 'Vanspire designs and builds enterprise integration architectures - connecting ERP, CRM, HMS, and SaaS systems through APIs, middleware, and event messaging.',
    detailedExplanation: "Enterprise System Integration solves the problem of disconnected systems creating data silos, manual reconciliation, and operational friction.\n\nVanspire's approach uses a **hub-and-spoke architecture** - a central integration layer that all systems communicate through, rather than point-to-point connections that become unmaintainable.\n\n**Technical stack:**\n- REST & GraphQL API design and documentation\n- Enterprise Service Bus (ESB) and iPaaS platforms (MuleSoft, Dell Boomi, Workato)\n- Event streaming with Apache Kafka and RabbitMQ\n- Webhook design and event-driven workflows\n- Data transformation, mapping, and validation layers\n\n**Deliverables:** Integration architecture diagrams, API documentation, monitoring dashboards, and runbooks.",
    keyConcepts: ['system integration', 'api integration', 'middleware', 'ipaas', 'mulesoft', 'kafka', 'esb', 'microservices', 'event-driven'],
    relatedTopics: ['erp-implementation', 'hms', 'cloud-infrastructure'],
    intents: ['learn_service', 'implementation_details', 'technical_explanation'],
    commonQuestions: ['Can you integrate our CRM with our ERP?', 'How do you handle API security?'],
    url: 'https://vanspire.in/work/enterprise-integration-hub',
  },
  // ─── COMPANY AND PHILOSOPHY ───────────────────────────────────────────────
  {
    id: 'about',
    title: 'About Vanspire',
    category: 'company',
    description: 'Vanspire is a founder-led product and IT firm in Kerala, India, founded in 2024 by four co-founders, taking clients from product idea to infrastructure to growth.',
    detailedExplanation: 'Vanspire (Vanspire Innovations) is a founder-led product and IT firm based in Kerala, India, working with clients worldwide. It was founded in 2024 and combines product strategy, design, engineering, cloud, AI, IT consulting and digital marketing.\n\n**Founders and leadership:**\n- **Akshay Krishna** - Co-Founder, Founding Director and Chief Executive Officer (CEO)\n- **Adithyan Dileep** - Co-Founder, Founding Director and Chief Operating Officer (COO)\n- **Vyshnav M** - Co-Founder, Growth & Markets\n- **Sreehari S** - Co-Founder, Systems & Infrastructure\n\n**Principles:** craft over speed, plain language, ownership, and long-term thinking.',
    keyConcepts: ['about', 'company', 'team', 'founders', 'ceo', 'coo', 'director', 'leadership', 'who founded', 'who owns', 'philosophy', 'values', 'vision', 'mission', 'culture'],
    relatedTopics: ['services-overview'],
    intents: ['general_question'],
    commonQuestions: ['Who is behind Vanspire?', 'Who is the CEO of Vanspire?', 'Who founded Vanspire?', 'Who is the COO of Vanspire?'],
    url: 'https://vanspire.in/about',
  },

  {
    id: 'contact',
    title: 'Working With Vanspire',
    category: 'process',
    description: 'Every Vanspire engagement starts with a scoped conversation - no generic proposals, no off-the-shelf packages.',
    detailedExplanation: 'To work with Vanspire, the process is straightforward:\n\n1. **Reach out** via our contact page or email vanspire.innovations@gmail.com\n2. **Discovery call** - we understand your challenge, goals, and constraints\n3. **Scoped proposal** - tailored to your exact requirements, not a package\n4. **Engagement begins** - with clearly defined milestones and deliverables\n\nVanspire does not take every project. We take on work where we can deliver meaningful, enterprise-grade outcomes.\n\nWe are based in Kerala, India, and work with clients across India and internationally.',
    keyConcepts: ['contact', 'hire', 'start a project', 'inquiry', 'collaborate', 'proposal'],
    relatedTopics: ['pricing'],
    intents: ['contact_request', 'implementation_details'],
    commonQuestions: ['How do I start a project with Vanspire?', 'Where are you located?'],
    url: 'https://vanspire.in/contact',
  },
  {
    id: 'pricing',
    title: 'Pricing & Engagement',
    category: 'company',
    description: 'Vanspire does not publish standard pricing. Every engagement is scoped and priced individually based on requirements.',
    detailedExplanation: 'Vanspire does not have standard pricing tiers or retainer packages. Every project is scoped individually based on:\n\n- Complexity and scale of the requirement\n- Timelines and delivery milestones\n- Technology stack and integration depth\n- Ongoing support requirements\n\nThis ensures you pay for exactly what you need - not a bundled package designed for someone else.\n\nTo get an accurate estimate, reach out and we will schedule a scoping conversation with no obligation.',
    keyConcepts: ['price', 'pricing', 'cost', 'rates', 'fees', 'budget', 'quote', 'estimate', 'retainer'],
    relatedTopics: ['contact'],
    intents: ['pricing_inquiry'],
    commonQuestions: ['How much does a project cost?', 'Do you have flat rate pricing?'],
    url: 'https://vanspire.in/contact',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    category: 'service',
    description: 'Vanspire builds AI assistants, chatbots, document intelligence and workflow automation grounded in your own data.',
    detailedExplanation: 'AI & Automation at Vanspire is practical rather than experimental:\n\n- **Assistants and chatbots** that answer from your documents and show sources\n- **Workflow automation** for approvals, notifications, data entry and reporting\n- **Document processing** - extract and validate data from invoices, forms and PDFs\n- **Analytics and forecasting** models\n\nWe add human review where stakes are high and use simpler automation when it is cheaper and more dependable than a language model.',
    keyConcepts: ['ai', 'artificial intelligence', 'automation', 'chatbot', 'llm', 'machine learning', 'rag', 'workflow automation', 'agents'],
    relatedTopics: ['digital-solutions', 'enterprise-integration'],
    intents: ['learn_service', 'technical_explanation', 'implementation_details'],
    commonQuestions: ['Do you build AI chatbots?', 'Can you automate our manual processes?'],
    url: 'https://vanspire.in/services/ai-automation',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'service',
    description: 'Vanspire runs SEO, Google and Meta ads, social media, content and analytics programmes tied to leads and sales.',
    detailedExplanation: 'Digital Marketing at Vanspire covers technical and local SEO, Google Ads and Meta Ads management, social media and content, email and lead nurturing, landing pages and conversion optimisation, and analytics and reporting. Because Vanspire also builds websites and apps, tracking is set up properly from day one.',
    keyConcepts: ['marketing', 'seo', 'ads', 'google ads', 'meta ads', 'social media', 'content', 'branding', 'performance marketing'],
    relatedTopics: ['web-platform'],
    intents: ['learn_service', 'implementation_details'],
    commonQuestions: ['Do you offer SEO?', 'Can you run our ads?'],
    url: 'https://vanspire.in/services/digital-marketing',
  },
  {
    id: 'product-design-ux',
    title: 'Product Strategy & UX Design',
    category: 'service',
    description: 'Discovery, UX research, UI design, prototypes and MVP scoping before engineering begins.',
    detailedExplanation: 'Vanspire runs discovery workshops, maps users and journeys, designs and tests prototypes, and scopes a focused MVP so you invest in the right features before building. Designers and engineers work side by side so what is designed can be built well.',
    keyConcepts: ['design', 'ux', 'ui', 'product strategy', 'mvp', 'prototype', 'discovery', 'figma'],
    relatedTopics: ['app-development', 'web-platform'],
    intents: ['learn_service'],
    commonQuestions: ['Can you design our app?', 'Can you help scope an MVP?'],
    url: 'https://vanspire.in/services/product-design-ux',
  },
]
