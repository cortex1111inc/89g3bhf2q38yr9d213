/**
 * Work & solutions.
 *
 * NOTE: Only the Hospital Management System is a named Vanspire product.
 * The others are solution playbooks describing how we typically deliver that
 * kind of engagement; they are NOT client case studies and carry no client
 * names or performance numbers. Replace or extend with real case studies
 * (client, results, testimonial) as they become available.
 */

export interface WorkItem {
  slug: string
  title: string
  kind: 'Product' | 'Solution'
  category: string
  summary: string
  image: string
  imageAlt: string
  services: string[] // service slugs
  stack: string[]
  challenge: string
  approach: { title: string; description: string }[]
  capabilities: string[]
  outcomes: string[]
  modules?: { title: string; description: string; features: string[] }[]
}

export const WORK: WorkItem[] = [
  {
    slug: 'hospital-management-system',
    title: 'Vanspire HMS: Hospital Management System',
    kind: 'Product',
    category: 'Healthcare software',
    summary:
      'Our hospital management platform covering OP, IP, pharmacy, billing, lab, radiology and administration. ABDM-ready and NABH-aligned, as cloud SaaS or on-premise.',
    image: 'support',
    imageAlt: 'Healthcare operations team at work',
    services: ['custom-software-development', 'it-consulting'],
    stack: ['Cloud SaaS', 'On-premise', 'HL7', 'DICOM / PACS', 'ABDM', 'Role-based access'],
    challenge:
      'Hospitals run on disconnected tools: one for registration, another for billing, paper for nursing notes and separate lab software. Information is re-entered, revenue leaks, and clinicians lose time to administration.',
    approach: [
      { title: 'One patient record', description: 'Every department works from a single patient record, so data is entered once and available everywhere it is needed.' },
      { title: 'Modular rollout', description: 'Hospitals can start with the modules they need, such as OP and billing, and add IP, lab or radiology as they grow.' },
      { title: 'Standards-based integration', description: 'HL7 and DICOM/PACS interfaces connect lab machines and imaging systems without custom glue code.' },
      { title: 'Deployment choice', description: 'Run it as managed cloud SaaS or install on-premise to suit your data policy and infrastructure.' },
    ],
    capabilities: [
      'Appointment scheduling, queue management and e-prescriptions',
      'Bed, ward and nursing workflow management',
      'Pharmacy inventory with expiry tracking and interaction alerts',
      'OP and IP billing, insurance and TPA handling, GST-compliant invoices',
      'Laboratory sample tracking, results and critical-value alerts',
      'Radiology ordering, reporting and PACS integration',
      'Staff, procurement, assets and facility administration',
      'Operational dashboards and regulatory reporting',
    ],
    outcomes: [
      'Less duplicate data entry across departments',
      'Faster billing and clearer revenue visibility',
      'Better coordination between clinical and support teams',
      'A system that grows module by module with the hospital',
    ],
    modules: [
      {
        title: 'Outpatient (OP)',
        description: 'Appointment scheduling, doctor availability, registration, consultation workflow and prescription generation in one clinical interface.',
        features: ['Online and in-person booking', 'Doctor schedule management', 'Digital consultation records', 'e-Prescription with drug database', 'Token display and queue management'],
      },
      {
        title: 'Inpatient (IP)',
        description: 'Admission management from bed allocation and ward management to nursing workflows and discharge planning.',
        features: ['Bed and ward allocation', 'Nursing station workflows', 'Daily clinical charting', 'Discharge summaries', 'Diet and meal management'],
      },
      {
        title: 'Pharmacy',
        description: 'Inventory control, prescription processing and supplier management connected to clinical modules.',
        features: ['e-Prescription integration', 'Inventory and expiry management', 'Drug interaction alerts', 'Purchase orders', 'FIFO dispensing'],
      },
      {
        title: 'Billing & Finance',
        description: 'Service billing through insurance claims, designed to reduce revenue leakage and speed up collections.',
        features: ['OP and IP billing automation', 'Insurance and TPA management', 'Credit facilities', 'Collection dashboards', 'GST-compliant invoicing'],
      },
      {
        title: 'Laboratory (LIMS)',
        description: 'Test requisition, sample tracking, result entry, verification and automated report delivery.',
        features: ['Sample tracking', 'Result validation', 'Critical value alerts', 'Report generation', 'Machine interface (HL7)'],
      },
      {
        title: 'Radiology & Imaging',
        description: 'Requisition to report, integrated with PACS for image storage and retrieval.',
        features: ['Order management', 'PACS / DICOM integration', 'Radiologist reporting', 'Film tracking', 'Automated report delivery'],
      },
      {
        title: 'Administration',
        description: 'Staff, payroll, leave, procurement, assets and facilities in a unified back office.',
        features: ['Staff and HR', 'Payroll integration', 'Procurement and vendors', 'Asset management', 'Facility operations'],
      },
      {
        title: 'Analytics & Reports',
        description: 'Operational dashboards and regulatory reporting for hospital management.',
        features: ['Real-time dashboards', 'Financial performance', 'Clinical productivity', 'Compliance reports', 'Custom report builder'],
      },
    ],
  },
  {
    slug: 'erp-implementation',
    title: 'ERP Implementation Programme',
    kind: 'Solution',
    category: 'Enterprise systems',
    summary:
      'A phased approach to selecting, configuring and rolling out ERP across SAP, Oracle, Microsoft Dynamics 365, Odoo or ERPNext.',
    image: 'meeting-2',
    imageAlt: 'Team reviewing ERP rollout plans',
    services: ['it-consulting', 'custom-software-development'],
    stack: ['SAP', 'Oracle', 'Dynamics 365', 'Odoo', 'ERPNext'],
    challenge:
      'Finance, inventory, sales and HR live in separate tools and spreadsheets. Reporting is slow, numbers disagree, and growth is limited by manual reconciliation.',
    approach: [
      { title: 'Discovery and fit-gap', description: 'We document current processes and compare them with candidate platforms to pick one on evidence, not vendor pitch.' },
      { title: 'Design and configuration', description: 'Processes are mapped to the platform with custom extensions only where the standard product falls short.' },
      { title: 'Data migration', description: 'Cleansing, mapping and trial loads so opening balances and master data are trusted on day one.' },
      { title: 'Testing, training, go-live', description: 'User acceptance testing, role-based training and a supported go-live with hypercare afterwards.' },
    ],
    capabilities: [
      'Platform selection and fit-gap analysis',
      'Finance, inventory, purchasing, sales and HR modules',
      'Custom reports and dashboards',
      'Integration with e-commerce, payment and logistics tools',
      'Data migration and reconciliation',
      'User training and documentation',
    ],
    outcomes: [
      'One source of truth for business data',
      'Faster month-end close and reporting',
      'Fewer manual reconciliations',
      'A platform your teams actually adopt',
    ],
  },
  {
    slug: 'enterprise-integration-hub',
    title: 'Enterprise Integration Hub',
    kind: 'Solution',
    category: 'Integration',
    summary:
      'Connect ERP, CRM, finance, logistics and partner systems through a hub-and-spoke integration layer with APIs and event streams.',
    image: 'code-night',
    imageAlt: 'Developers monitoring integration dashboards at night',
    services: ['it-consulting', 'custom-software-development', 'cloud-devops'],
    stack: ['REST APIs', 'MuleSoft', 'Kafka', 'Message queues', 'Docker'],
    challenge:
      'Point-to-point connections multiply until nobody knows what depends on what. Every change breaks something, and data arrives late or not at all.',
    approach: [
      { title: 'Map the landscape', description: 'Inventory systems, data flows and owners to see where the real bottlenecks and risks are.' },
      { title: 'Design the hub', description: 'A central integration layer with consistent contracts, so each system connects once instead of to everything else.' },
      { title: 'Event-driven where it counts', description: 'Queues and event streams for high-volume or time-sensitive flows, with retries and dead-letter handling.' },
      { title: 'Observe and operate', description: 'Dashboards, alerts and runbooks so integration issues are visible and fixable quickly.' },
    ],
    capabilities: [
      'API design and gateway setup',
      'Middleware and ETL pipelines',
      'Event streaming and message queues',
      'Third-party and partner integrations',
      'Monitoring, logging and alerting',
      'Security, authentication and rate limiting',
    ],
    outcomes: [
      'Fewer brittle point-to-point links',
      'Faster onboarding of new systems and partners',
      'Visible, monitored data flows',
      'Lower cost of change over time',
    ],
  },
  {
    slug: 'field-operations-mobile-app',
    title: 'Field Operations Mobile App',
    kind: 'Solution',
    category: 'Mobile',
    summary:
      'An offline-first mobile app for field teams: tasks, checklists, photos, approvals and live sync with your back office.',
    image: 'app-social',
    imageAlt: 'Mobile app interface with social and messaging icons',
    services: ['mobile-app-development', 'product-design-ux', 'cloud-devops'],
    stack: ['React Native', 'Flutter', 'Node.js', 'PostgreSQL', 'Firebase'],
    challenge:
      'Field teams still use paper, calls and WhatsApp. Data arrives late, errors creep in, and managers cannot see what is happening until the day ends.',
    approach: [
      { title: 'Shadow the real job', description: 'We ride along with field staff to design for gloves, glare, one-handed use and poor connectivity.' },
      { title: 'Offline-first', description: 'Work is stored on the device and syncs in the background when a connection returns.' },
      { title: 'Manager dashboard', description: 'A web dashboard shows live status, exceptions and reports from the field.' },
      { title: 'Pilot, then scale', description: 'Launch with one team, learn, refine, and roll out to the rest.' },
    ],
    capabilities: [
      'Task assignment and checklists',
      'Photo, signature and GPS capture',
      'Offline storage and background sync',
      'Push notifications and approvals',
      'Admin web dashboard and reports',
      'Integration with ERP or CRM',
    ],
    outcomes: [
      'Data captured once, at the source',
      'Real-time visibility for managers',
      'Fewer errors and rework',
      'Teams that want to use the tool',
    ],
  },
  {
    slug: 'ai-support-assistant',
    title: 'AI Support & Knowledge Assistant',
    kind: 'Solution',
    category: 'AI & automation',
    summary:
      'A chatbot grounded in your documents that answers customer and staff questions, hands off to humans, and learns from gaps.',
    image: 'ai-phone',
    imageAlt: 'Smartphone showing an AI assistant interface',
    services: ['ai-automation', 'web-development'],
    stack: ['Claude', 'Groq', 'Vector search', 'Next.js', 'Python'],
    challenge:
      'The same questions arrive again and again. Answers live across PDFs, wikis and people\'s heads, and response times slip when the team is busy.',
    approach: [
      { title: 'Curate the knowledge', description: 'We gather and clean the approved content the assistant is allowed to use.' },
      { title: 'Ground every answer', description: 'Responses cite their sources and say when they do not know, instead of guessing.' },
      { title: 'Human handoff', description: 'Hard or sensitive questions route to your team with the conversation attached.' },
      { title: 'Measure and improve', description: 'Dashboards highlight unanswered questions so content and the assistant keep getting better.' },
    ],
    capabilities: [
      'Website and in-app chat widget',
      'Internal staff knowledge search',
      'Multi-language responses',
      'Lead capture and CRM sync',
      'Analytics and unanswered-question reports',
      'Guardrails and content filters',
    ],
    outcomes: [
      'Faster first response for customers',
      'Less repetitive load on the team',
      'Consistent, sourced answers',
      'Insights into what customers ask',
    ],
  },
  {
    slug: 'growth-marketing-engine',
    title: 'Growth Marketing Engine',
    kind: 'Solution',
    category: 'Digital marketing',
    summary:
      'A connected programme of SEO, paid media, content and analytics, with tracking built into the product from day one.',
    image: 'mkt-voice',
    imageAlt: 'Colourful abstract illustration of marketing channels',
    services: ['digital-marketing', 'web-development'],
    stack: ['GA4', 'Search Console', 'Google Ads', 'Meta Ads', 'HubSpot'],
    challenge:
      'Marketing spend is spread across channels with no shared measurement, so nobody can say which activity actually produces customers.',
    approach: [
      { title: 'Audit and baseline', description: 'We measure where traffic, leads and revenue come from today and where the gaps are.' },
      { title: 'Fix the foundation', description: 'Technical SEO, tracking and landing pages so every campaign lands on something that converts.' },
      { title: 'Run focused channels', description: 'Start with the two or three channels most likely to pay back, then expand with evidence.' },
      { title: 'Report on outcomes', description: 'One dashboard showing cost per lead, pipeline and return, reviewed monthly.' },
    ],
    capabilities: [
      'SEO, local SEO and content strategy',
      'Google and Meta campaign management',
      'Landing pages and A/B testing',
      'Email and lead-nurture sequences',
      'Analytics, attribution and dashboards',
      'Brand and creative support',
    ],
    outcomes: [
      'Clear view of what drives leads',
      'Lower wasted ad spend',
      'Content that compounds over time',
      'Marketing and product working together',
    ],
  },
]

export const getWork = (slug: string) => WORK.find((w) => w.slug === slug)
