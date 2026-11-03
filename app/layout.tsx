import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Instrument_Sans, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ChatBot from "@/components/chat/ChatBot";
import GoogleAnalytics from "@/components/Analytics";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import { SITE_URL } from "@/lib/site";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const impact = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-impact",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Vanspire",
  manifest: "/manifest.webmanifest",

  title: {
    default: "Vanspire | Software, AI, Mobile & Digital Product Firm in India",
    template: "%s | Vanspire",
  },

  description:
    "Vanspire is a product and IT firm. We build custom software, AI and automation, mobile apps, web platforms, cloud systems and digital marketing for ambitious businesses in India and worldwide.",

  keywords: [
    "custom software development company",
    "AI and automation solutions",
    "mobile app development",
    "website development company",
    "IT consulting",
    "digital marketing agency",
    "cloud and DevOps services",
    "product design and UX",
    "software company Kerala",
    "software company India",
    "Vanspire",
  ],

  authors: [{ name: "Vanspire Innovations", url: SITE_URL }],
  creator: "Vanspire Innovations",
  publisher: "Vanspire Innovations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "Vanspire | Software, AI, Mobile & Digital Product Firm",
    description:
      "Custom software, AI and automation, mobile apps, web platforms, IT consulting and digital marketing from one product and IT firm.",
    url: SITE_URL,
    siteName: "Vanspire",
    images: [
      {
        url: "/ogimage.webp",
        width: 1200,
        height: 630,
        alt: "Vanspire - Software and Web Development",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vanspire | Software, AI, Mobile & Digital Product Firm",
    description:
      "Custom software, AI and automation, mobile apps, web platforms, IT consulting and digital marketing from one product and IT firm.",
    images: ["/ogimage.webp"],
    creator: "@vanspirein",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/icon-192.svg",
  },

  alternates: {
    canonical: SITE_URL,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vanspire",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101010",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Vanspire Innovations",
      url: SITE_URL,
      logo: `${SITE_URL}/blacklogo.svg`,
      sameAs: [
        "https://www.linkedin.com/company/vanspire-innovations/",
        "https://www.instagram.com/vanspire.innovations/",
        "https://twitter.com/vanspirein",
        "https://www.youtube.com/@vanspire",
        "https://www.facebook.com/vanspire",
      ],
      description:
        "Vanspire Innovations is a product and IT firm in Kerala, India, building custom software, AI and automation, mobile apps, web platforms, cloud systems and digital marketing.",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Kerala",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "vanspire.innovations@gmail.com",
        availableLanguage: ["English", "Malayalam", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Vanspire Innovations",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Vanspire Innovations",
      image: `${SITE_URL}/ogimage.webp`,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Kerala",
      },
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${impact.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-canvas text-ink">
        <Header />
        <LayoutWrapper>
          <main className="flex-1">{children}</main>
        </LayoutWrapper>
        <Footer />
        <ChatBot />
        <ServiceWorkerRegister />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
