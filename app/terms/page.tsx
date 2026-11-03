import type { Metadata } from 'next'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { buildMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbList, graph } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description:
    'Vanspire terms and conditions governing use of our website and services.',
  path: '/terms',
})

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'The terms "we," "us," and "our" refer to Vanspire.',
      'By accessing this website or engaging Vanspire\'s services, you agree to be bound by these Terms, all applicable laws and regulations, and acknowledge responsibility for compliance with applicable local laws.',
      'These terms apply to all visitors, clients, service users, and any persons accessing content on this website.',
      'If you do not agree to any part of these terms, you must not use this website or our services.',
    ],
  },
  {
    title: '2. Website Usage',
    content: [
      'You may use this website for lawful purposes only.',
      'You must not use this site in any way that is harmful, unlawful, fraudulent, or in violation of any applicable regulation.',
      'Vanspire reserves the right to restrict or terminate access to any user at its sole discretion, without notice.',
      'Automated access, scraping, or data harvesting of this site without prior written consent is strictly prohibited.',
    ],
  },
  {
    title: '3. Intellectual Property',
    content: [
      'All content on this website - including text, design, graphics, logos, and code - is the intellectual property of Vanspire or its licensors.',
      'You may not reproduce, distribute, modify, or create derivative works from any content on this site without express written permission from Vanspire.',
      'The Vanspire name, logo, and brand identity are protected trademarks. Unauthorised use is prohibited.',
      'Client work produced under engagement may be subject to separate intellectual property arrangements as defined in individual service agreements.',
    ],
  },
  {
    title: '4. Services and Modifications',
    content: [
      'Vanspire reserves the right to modify, suspend, or discontinue any service at any time without notice.',
      'We are not liable to you or any third party for any modification, suspension, or discontinuation of services.',
      'Pricing, availability, and service scope are subject to change without notice unless otherwise fixed in a signed engagement agreement.',
    ],
  },
  {
    title: '5. Third-Party Links',
    content: [
      'This website may contain links to third-party websites for informational purposes.',
      'Vanspire does not control these external sites and is not responsible for their content, accuracy, or privacy practices.',
      'Inclusion of any link does not imply endorsement by Vanspire.',
    ],
  },
  {
    title: '6. Disclaimer of Warranties',
    content: [
      'This website and all content are provided "as is" without warranties of any kind, express or implied.',
      'Vanspire makes no representations regarding the accuracy, completeness, or reliability of any content on the site.',
      'We do not warrant that the website will be error-free, uninterrupted, or free of viruses or other harmful components.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, Vanspire shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or our services.',
      'In no event shall Vanspire\'s aggregate liability exceed the total fees paid by you for services in the twelve months preceding the claim.',
      'Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability; in such cases, our liability shall be limited to the minimum extent permitted by applicable law.',
    ],
  },
  {
    title: '8. Privacy',
    content: [
      'Your submission of personal information is governed by our Privacy Policy, which is incorporated by reference into these Terms.',
      'By using this site, you consent to the collection and use of your information as described in our Privacy Policy.',
    ],
  },
  {
    title: '9. Governing Law & Jurisdiction',
    content: [
      'These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of India.',
      'Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of India.',
      'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.',
    ],
  },
  {
    title: '10. Modifications to Terms',
    content: [
      'Vanspire reserves the right to update or modify these Terms at any time.',
      'The most current version will be posted on this page with the updated date.',
      'Your continued use of the website following changes constitutes your acceptance of the revised Terms.',
      'It is your responsibility to review these Terms periodically.',
    ],
  },
  {
    title: '11. Contact',
    content: [
      'Questions about these Terms should be directed to: vanspire.innovations@gmail.com',
      'Registered entity: Vanspire, India.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbList([{ name: 'Terms & Conditions' }]))} />
      <section className="pt-40 pb-24 md:pt-48 md:pb-28 bg-white text-brand-black">
      <div className="container-site max-w-[860px]">
        <MotionWrapper>
          <p className="text-label text-brand-muted mb-3">Last Updated: January 2026</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-brand-black mb-16">
            Terms & Conditions
          </h1>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <p className="text-[16px] font-light text-brand-muted leading-relaxed mb-12">
            This website is operated by Vanspire. By accessing this website or using any
            services provided by Vanspire, you agree to the following Terms and Conditions.
            Please read them carefully.
          </p>
        </MotionWrapper>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <MotionWrapper key={section.title} delay={i * 0.04}>
              <div className="border-t border-brand-border pt-8">
                <h2 className="text-[17px] font-semibold text-brand-black mb-4 tracking-tight">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="text-[15px] font-light text-brand-muted leading-relaxed pl-4 border-l border-brand-border">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
      </section>
    </>
  )
}
