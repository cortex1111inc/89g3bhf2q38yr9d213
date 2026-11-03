/**
 * Location / keyword landing pages (kept from the previous site so existing
 * search rankings and URLs continue to work). Copy deliberately avoids
 * unverifiable statistics.
 */

export interface LandingPageData {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  sub: string
  image: string
  imageAlt: string
  primaryCta: string
  services: string[] // service slugs
  whyTitle: string
  why: { title: string; description: string }[]
  areasTitle: string
  areas: string[]
  faqs: { question: string; answer: string }[]
  ctaTitle: string
}

export const LANDING_PAGES: LandingPageData[] = [
  {
    slug: 'best-website-development-company-in-kochi',
    metaTitle: 'Best Website Development Company in Kochi | Vanspire Innovations',
    metaDescription:
      'Looking for the best website development company in Kochi? Vanspire delivers premium, scalable web solutions, enterprise software, and robust cloud infrastructure.',
    eyebrow: 'Website development · Kochi',
    h1: 'Best Website Development Company in Kochi',
    sub: 'Fast, search-friendly websites, e-commerce stores and web applications for Kochi and Kerala businesses, built by the same team that handles your software, cloud and marketing.',
    image: 'cowork-2',
    imageAlt: 'Web designer working on a website in Kochi',
    primaryCta: 'Get a website quote',
    services: ['web-development', 'product-design-ux', 'digital-marketing', 'cloud-devops'],
    whyTitle: 'Why Kochi businesses choose Vanspire for their website',
    why: [
      { title: 'Built for speed and SEO', description: 'Next.js builds with clean markup, structured data and Core Web Vitals in mind, so you are easy to find and quick to load.' },
      { title: 'Local understanding, global standards', description: 'We are based in Kerala and know local buyers, while following the engineering standards of international teams.' },
      { title: 'More than a brochure site', description: 'Booking, payments, dashboards, CRM and WhatsApp integrations when your site needs to do real work.' },
      { title: 'One team after launch', description: 'Hosting, security, updates and marketing from the people who built the site.' },
    ],
    areasTitle: 'Serving businesses across Kerala',
    areas: ['Kochi (Ernakulam)', 'Trivandrum', 'Kozhikode (Calicut)', 'Thrissur', 'Kottayam', 'Palakkad', 'Kannur', 'Malappuram'],
    faqs: [
      { question: 'How much does a website cost in Kochi?', answer: 'It depends on scope: pages, features, integrations and content. After a short call we send a fixed proposal so you know the cost before committing.' },
      { question: 'Can you redesign our existing website?', answer: 'Yes. We audit what is working, keep what ranks and converts, and rebuild the rest, with redirects so you do not lose search traffic.' },
      { question: 'Do you build e-commerce websites?', answer: 'Yes: custom stores and Shopify builds with payment gateways, inventory and shipping integrations.' },
      { question: 'Will the site be mobile friendly?', answer: 'Every site we build is responsive and tested on common phones, tablets and browsers.' },
    ],
    ctaTitle: 'Ready for a website that works as hard as you do?',
  },
  {
    slug: 'best-digital-marketing-company-in-kerala',
    metaTitle: 'Top Digital Marketing Agency in Kerala | Vanspire',
    metaDescription:
      'Looking for the best digital marketing company in Kerala? Vanspire delivers premium SEO, performance ads, and social media marketing across Kochi, Trivandrum, and Calicut.',
    eyebrow: 'Digital marketing · Kerala',
    h1: 'Best Digital Marketing Company in Kerala',
    sub: 'Data-driven SEO, performance marketing and social media for Kerala businesses, planned and measured together with the website and product they support.',
    image: 'mkt-voice',
    imageAlt: 'Colourful illustration of digital marketing channels',
    primaryCta: 'Get a free marketing audit',
    services: ['digital-marketing', 'web-development', 'ai-automation', 'product-design-ux'],
    whyTitle: 'Why Kerala businesses choose Vanspire for marketing',
    why: [
      { title: 'Local SEO that reaches buyers', description: 'We optimise for the regional, high-intent searches in Kochi, Trivandrum, Calicut and beyond that actually produce enquiries.' },
      { title: 'Campaigns tied to leads', description: 'Google and Meta ads managed against cost per qualified lead, not clicks or impressions.' },
      { title: 'Tracking built properly', description: 'Because we build sites and apps too, analytics and conversion tracking are set up correctly from the start.' },
      { title: 'Plain reporting', description: 'A live dashboard and monthly review in clear language: what we spent, what it produced, what we will test next.' },
    ],
    areasTitle: 'Marketing across Kerala and beyond',
    areas: ['Kochi (Ernakulam)', 'Trivandrum', 'Kozhikode (Calicut)', 'Thrissur', 'Kottayam', 'Kannur', 'Palakkad', 'Global audiences'],
    faqs: [
      { question: 'What digital marketing services do you offer?', answer: 'SEO and local SEO, Google and Meta advertising, social media management, content and email, landing pages and conversion optimisation, plus analytics and reporting.' },
      { question: 'How long before we see results?', answer: 'Paid campaigns can generate leads within weeks. SEO and content compound over three to six months.' },
      { question: 'Do you only work with Kerala businesses?', answer: 'No. Kerala is our home market, but we run campaigns for audiences across India and internationally.' },
      { question: 'Can you work alongside our in-house team?', answer: 'Yes. We can manage the full programme or support specific channels.' },
    ],
    ctaTitle: 'Ready to grow your business in Kerala?',
  },
  {
    slug: 'best-mobile-app-development-company-in-india',
    metaTitle: 'Best Mobile App Development Company in India | Enterprise SaaS',
    metaDescription:
      'Vanspire is the best mobile app development company in India specializing in scalable iOS/Android apps, enterprise security, and cloud architectures.',
    eyebrow: 'Mobile app development · India',
    h1: 'Best Mobile App Development Company in India',
    sub: 'iOS and Android apps with the backend, cloud and design they need, from MVP to store launch to ongoing growth, built by one accountable team.',
    image: 'app-phones',
    imageAlt: 'Smartphones displaying mobile app interfaces',
    primaryCta: 'Discuss your app',
    services: ['mobile-app-development', 'product-design-ux', 'cloud-devops', 'digital-marketing'],
    whyTitle: 'Why teams choose Vanspire for mobile apps',
    why: [
      { title: 'Cross-platform, native feel', description: 'React Native and Flutter builds that look and perform like native apps while halving maintenance effort.' },
      { title: 'Offline-first where it matters', description: 'Field, healthcare and logistics workflows that keep working with no signal and sync when it returns.' },
      { title: 'Backend and cloud included', description: 'APIs, databases, admin dashboards and scalable cloud hosting built alongside the app.' },
      { title: 'Launch and beyond', description: 'Store submission, analytics, crash monitoring and marketing to get your first users and keep them.' },
    ],
    areasTitle: 'Apps for every kind of product',
    areas: ['Healthcare & wellness', 'E-commerce & retail', 'Logistics & field ops', 'Education & e-learning', 'Fintech', 'Real estate', 'On-demand services', 'Internal enterprise apps'],
    faqs: [
      { question: 'How long does it take to build a mobile app?', answer: 'A focused MVP typically takes two to four months from kickoff to store release. Larger products are phased.' },
      { question: 'Native or cross-platform?', answer: 'Cross-platform for most products. We recommend native only when you need heavy graphics or deep platform features.' },
      { question: 'Will you publish the app to the stores?', answer: 'Yes. We handle App Store and Google Play submission and compliance, and the ongoing updates.' },
      { question: 'Can you add features to an existing app?', answer: 'Yes. We review the codebase first and then extend, refactor or rebuild as appropriate.' },
    ],
    ctaTitle: 'Ready to build your mobile app?',
  },
  {
    slug: 'iot-and-software-solutions',
    metaTitle: 'Top IoT and Software Solutions Company | Vanspire Innovations',
    metaDescription:
      'Vanspire provides industry-leading IoT solutions, enterprise software, and scalable technology infrastructure designed for long-term growth and digital transformation.',
    eyebrow: 'IoT & software solutions',
    h1: 'IoT and Software Solutions That Connect Your Operations',
    sub: 'Device data pipelines, real-time dashboards and enterprise software that turn sensors and machines into decisions, on cloud infrastructure built to scale.',
    image: 'datacenter',
    imageAlt: 'Server racks powering IoT data platforms',
    primaryCta: 'Discuss an IoT project',
    services: ['custom-software-development', 'cloud-devops', 'it-consulting', 'mobile-app-development'],
    whyTitle: 'What a good IoT solution needs',
    why: [
      { title: 'Reliable data ingestion', description: 'Device connectivity, message queues and storage that cope with bursts, drop-outs and growth.' },
      { title: 'Dashboards people use', description: 'Live views, alerts and reports designed for operators and managers, on web and mobile.' },
      { title: 'Integration with your systems', description: 'Data flowing into ERP, billing and analytics so IoT insight becomes business action.' },
      { title: 'Secure and maintainable', description: 'Device authentication, encrypted transport, over-the-air updates and monitoring from day one.' },
    ],
    areasTitle: 'Where we apply IoT and software',
    areas: ['Smart manufacturing', 'Healthcare equipment', 'Energy & utilities', 'Logistics & fleet', 'Agriculture', 'Smart buildings', 'Retail', 'Asset tracking'],
    faqs: [
      { question: 'Do you build hardware too?', answer: 'We focus on software, cloud and integration. We work with your hardware vendors or partners and connect their devices into a complete solution.' },
      { question: 'Which protocols do you support?', answer: 'Common IoT protocols such as MQTT and HTTP, plus industry standards like HL7 for healthcare, chosen to fit your devices.' },
      { question: 'Can IoT data feed our existing ERP?', answer: 'Yes. We build integrations so device data triggers workflows and reports in your existing systems.' },
      { question: 'Can you take a prototype to production?', answer: 'Yes. We harden proof-of-concepts with proper architecture, security, testing and monitoring.' },
    ],
    ctaTitle: 'Ready to connect your operations?',
  },
]

export const getLanding = (slug: string) => LANDING_PAGES.find((p) => p.slug === slug)
