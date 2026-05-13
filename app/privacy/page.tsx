import type { Metadata } from 'next'
import MotionWrapper from '@/components/ui/MotionWrapper'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Vanspire Privacy Policy - how we collect, use, and protect your data. GDPR-aligned structure. Your privacy is taken seriously.',
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: '1. Introduction',
    body: 'Vanspire ("we," "our," or "us") is committed to protecting the privacy of individuals who interact with our website and services. This Privacy Policy explains what information we collect, how we use it, your rights in relation to that data, and how you can contact us with privacy concerns. By using vanspire.in, you agree to the practices described in this policy.',
  },
  {
    title: '2. Information We Collect',
    items: [
      'Personal Information: When you submit a contact form, subscribe to our newsletter, or engage our services, we may collect personal details such as your name, email address, company name, and phone number.',
      'Usage Data: We automatically collect information about how you interact with our website, including IP address, browser type, device type, pages visited, and time spent on the site.',
      'Cookies: Our website uses cookies and similar tracking technologies to enhance user experience, analyse traffic, and remember preferences. You can manage cookie settings through your browser at any time.',
      'Communication Records: Any communications you send to us (including via email or contact forms) may be retained for customer service and legal compliance purposes.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    items: [
      'To respond to enquiries and provide requested services.',
      'To send newsletters, updates, and relevant content where you have opted in.',
      'To analyse website usage and improve the performance and content of our site.',
      'To maintain the security and integrity of our systems and detect suspicious activity.',
      'To comply with legal obligations and enforce our Terms and Conditions.',
      'To contact you regarding service-related communications relevant to your engagement with Vanspire.',
    ],
  },
  {
    title: '4. Legal Basis for Processing (GDPR)',
    body: 'For individuals in the European Economic Area (EEA) or those protected by GDPR-equivalent legislation, we process personal data on the following legal bases: (a) your explicit consent where required; (b) performance of a contract or pre-contractual steps; (c) compliance with a legal obligation; (d) our legitimate interests in operating and improving our services, where these interests are not overridden by your rights.',
  },
  {
    title: '5. Data Sharing & Third Parties',
    body: 'We do not sell, rent, or trade your personal information. We may share data with trusted third-party service providers (such as email delivery services, analytics platforms, and cloud hosting providers) solely to support our operations. These providers are bound by contractual data processing agreements and may not use your data for any other purpose. We may also disclose information where required by law or to protect the rights, safety, or property of Vanspire.',
  },
  {
    title: '6. Cookies & Tracking',
    items: [
      'Essential Cookies: Required for the basic functioning of the website. Cannot be disabled.',
      'Analytics Cookies: Help us understand how visitors use our site (e.g., Google Analytics). May be disabled via your browser settings.',
      'Preference Cookies: Remember your settings and preferences on return visits.',
      'You may opt out of non-essential cookies at any time by adjusting your browser settings or using a cookie management tool. Note that disabling cookies may affect site functionality.',
    ],
  },
  {
    title: '7. Data Retention',
    body: 'We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Contact form submissions and enquiries are retained for up to 24 months. Marketing consent records are retained until you withdraw consent. Usage and analytics data is retained in anonymised or aggregated form.',
  },
  {
    title: '8. Your Rights',
    items: [
      'Access: Request a copy of the personal data we hold about you.',
      'Correction: Request correction of inaccurate or incomplete data.',
      'Erasure: Request deletion of your personal data, subject to legal obligations.',
      'Restriction: Request that we restrict processing of your data in certain circumstances.',
      'Portability: Receive your data in a structured, machine-readable format.',
      'Objection: Object to processing based on legitimate interests or for direct marketing.',
      'Withdraw Consent: Where processing is based on consent, you may withdraw it at any time.',
      'To exercise any of these rights, contact us at vanspire.innovations@gmail.com.',
    ],
  },
  {
    title: '9. Security',
    body: 'We implement industry-standard technical and organisational measures to protect your personal data from unauthorised access, disclosure, alteration, or destruction. These include encrypted data transmission (HTTPS), access controls, and regular security reviews. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
  },
  {
    title: '10. Children\'s Privacy',
    body: 'Our website is not directed at or intended for individuals under the age of 16. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will take prompt action to delete it.',
  },
  {
    title: '11. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. We encourage you to review this policy periodically. Continued use of the site following changes constitutes your acceptance of the updated policy.',
  },
  {
    title: '12. Contact Us',
    body: 'For any questions, concerns, or privacy rights requests, please contact us at:\n\nVanspire\nEmail: vanspire.innovations@gmail.com\nCountry: India\n\nWe are committed to resolving all legitimate privacy enquiries within 30 days.',
  },
]

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-28 bg-white text-brand-black">
      <div className="container-site max-w-[860px]">
        <MotionWrapper>
          <p className="text-label text-brand-muted mb-3">Last Updated: January 2026</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-brand-black mb-16">
            Privacy Policy
          </h1>
        </MotionWrapper>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <MotionWrapper key={section.title} delay={i * 0.04}>
              <div className="border-t border-brand-border pt-8">
                <h2 className="text-[17px] font-semibold text-brand-black mb-4 tracking-tight">
                  {section.title}
                </h2>
                {'body' in section ? (
                  <p className="text-[15px] font-light text-brand-muted leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-[15px] font-light text-brand-muted leading-relaxed pl-4 border-l border-brand-border"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
