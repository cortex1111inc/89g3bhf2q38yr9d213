import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Vanspire",
  manifest: "/manifest.webmanifest",

  title: {
    default: "Vanspire | Best Software, Web & App Development Company in India",
    template: "%s | Vanspire",
  },

  description:
    "Vanspire is the best software solutions, website development, mobile apps, and digital marketing company in India and Kerala.",

  keywords: [
    "best software solutions",
    "best website development company",
    "best digital marketing company",
    "best website solution",
    "best mobile applications development in india",
    "IoT solution",
    "software website apps",
    "cloud marketing",
    "kerala",
    "india",
    "Vanspire",
    "enterprise software",
    "scalable cloud systems",
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
    title: "Vanspire Innovations | Best Software & Web Development Company",
    description:
      "Vanspire offers the best software solutions, website development, mobile apps, IoT, and digital marketing in India and Kerala.",
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
    title: "Vanspire Innovations | Best Software & Web Development Company",
    description:
      "Vanspire offers the best software solutions, website development, mobile apps, IoT, and digital marketing in India and Kerala.",
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
  themeColor: "#0a0a0a",
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
        "Vanspire Innovations is the best software solutions, website development, mobile apps, and digital marketing company in India and Kerala, specializing in IoT and cloud infrastructure.",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Kerala",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@vanspire.in",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-white text-brand-black">
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
