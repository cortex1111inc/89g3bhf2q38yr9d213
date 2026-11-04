/**
 * Founders / leadership. Single source of truth used by the About page,
 * JSON-LD (Person + Organization.founder), llms.txt, the chatbot knowledge
 * base and FAQs, so names and titles never drift between them.
 */

export interface Person {
  id: string // anchor id on /about and JSON-LD @id fragment
  name: string
  /** Short label shown on cards (the previous functional role). */
  role: string
  /** Formal title used in structured data, FAQs and AI-facing text. */
  title: string
  linkedin: string
  bio: string
  image: string // path in /public
}

export const TEAM: Person[] = [
  {
    id: 'akshay-krishna',
    name: 'Akshay Krishna',
    role: 'Founding Director & CEO',
    title: 'Co-Founder, Founding Director and Chief Executive Officer (CEO)',
    linkedin: 'https://www.linkedin.com/in/akshay-krishna-20764723a/',
    bio: 'Founding Director and CEO. Leads Vanspire, setting direction and building the delivery systems and operational frameworks that support the firm\'s growth.',
    image: '/akshay.png',
  },
  {
    id: 'adithyan-dileep',
    name: 'Adithyan Dileep',
    role: 'Founding Director & COO',
    title: 'Co-Founder, Founding Director and Chief Operating Officer (COO)',
    linkedin: 'https://www.linkedin.com/in/adithyan-dileep/',
    bio: 'Founding Director and COO. Runs day-to-day operations, shapes product direction and turns ideas into impactful digital solutions.',
    image: '/adithyan.webp',
  },
  {
    id: 'vyshnav-m',
    name: 'Vyshnav M',
    role: 'Growth & Markets',
    title: 'Co-Founder, Growth & Markets',
    linkedin: 'https://www.linkedin.com/in/vyshnavmancheri/',
    bio: 'Drives digital growth, market visibility, and strategic positioning across Vanspire projects.',
    image: '/vyshnav.webp',
  },
  {
    id: 'sreehari-s',
    name: 'Sreehari S',
    role: 'Systems & Infra',
    title: 'Co-Founder, Systems & Infrastructure',
    linkedin: 'https://www.linkedin.com/in/sreehari-s-5a2a592b9/',
    bio: 'Focusing on building scalable systems and core technological foundations for Vanspire clients.',
    image: '/sreehari.webp',
  },
]

export const getPerson = (id: string) => TEAM.find((p) => p.id === id)
export const CEO = TEAM[0]
export const COO = TEAM[1]

/** "Akshay Krishna (Founding Director & CEO), Adithyan Dileep (Founding Director & COO), Vyshnav M and Sreehari S" */
export const FOUNDERS_SENTENCE =
  'Akshay Krishna (Founding Director and CEO), Adithyan Dileep (Founding Director and COO), Vyshnav M (Growth & Markets) and Sreehari S (Systems & Infrastructure)'
