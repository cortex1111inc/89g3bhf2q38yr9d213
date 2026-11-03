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
import JsonLd from "@/components/seo/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";
import { rootGraph } from "@/lib/schema";

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

const DEFAULT_DESCRIPTION =
  "Vanspire is a product and IT firm in Kerala, India. We build custom software, AI and automation, mobile apps, web platforms, cloud systems and digital marketing, from first idea to long-term growth.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE.name,
  manifest: "/manifest.webmanifest",

  // Pages supply their own title; this is the fallback and the suffix template.
  title: {
    default: "Vanspire | Software, AI, Mobile & Digital Product Firm in India",
    template: "%s | Vanspire",
  },
  description: DEFAULT_DESCRIPTION,

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

  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },

  // Social images come from app/opengraph-image.tsx and app/twitter-image.tsx.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    url: SITE_URL,
    title: "Vanspire | Software, AI, Mobile & Digital Product Firm",
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: "Vanspire | Software, AI, Mobile & Digital Product Firm",
    description: DEFAULT_DESCRIPTION,
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

  // NOTE: no global `alternates.canonical` here on purpose. A layout-level
  // canonical would be inherited by every page lacking its own and point
  // them all at the homepage. Each page sets its own via buildMetadata().
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Vanspire Insights" }] },
  },

  // Set these env vars to emit the verification tags (see .env.local.example).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.name,
  },

  // Regional hints (used by some engines and directories).
  other: {
    "geo.region": SITE.regionCode,
    "geo.placename": SITE.region,
    "content-language": SITE.locale,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101010",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${impact.variable}`}>
      <head>
        <JsonLd id="schema-organization" data={rootGraph()} />
      </head>
      <body className="font-sans bg-canvas text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <LayoutWrapper>
          <main id="main-content" className="flex-1">{children}</main>
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
