import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const BASE_URL = "https://fernandoott.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fernando Ott — Head of AI & AI Architect",
    template: "%s | Fernando Ott",
  },
  description:
    "Fernando Ott is a Head of AI and AI Architect with 16+ years of engineering experience and 4+ years shipping multi-agent AI systems to production. Based in Brazil, working globally.",
  keywords: [
    "Fernando Ott",
    "Head of AI",
    "AI Architect",
    "multi-agent AI systems",
    "LangChain",
    "AI engineer",
    "machine learning engineer",
    "AI consultant",
    "generative AI",
    "LLM",
    "RAG",
    "AI product development",
    "Brazil AI engineer",
  ],
  authors: [{ name: "Fernando Ott", url: BASE_URL }],
  creator: "Fernando Ott",
  publisher: "Fernando Ott",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Fernando Ott",
    title: "Fernando Ott — Head of AI & AI Architect",
    description:
      "I design multi-agent AI systems that plug into real business tools and make decisions autonomously. 16+ years engineering, 4+ years AI in production.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fernando Ott — Head of AI & AI Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernando Ott — Head of AI & AI Architect",
    description:
      "I design multi-agent AI systems that plug into real business tools and make decisions autonomously.",
    images: ["/og-image.png"],
    creator: "@fernandoott",
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: "xxxx",
    // other: { "msvalidate.01": "xxxx" },
  },
};

// JSON-LD structured data for GEO (AI search engine citation)
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fernando Ott",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.png`,
  jobTitle: "Head of AI & AI Architect",
  description:
    "Fernando Ott is a Head of AI and AI Architect with 16+ years of software engineering experience and 4+ years shipping multi-agent AI systems to production environments.",
  knowsAbout: [
    "Multi-agent AI systems",
    "Large Language Models",
    "RAG (Retrieval-Augmented Generation)",
    "LangChain",
    "AI product development",
    "Machine learning in production",
    "Generative AI",
  ],
  sameAs: [
    "https://github.com/fernandoott",
    "https://linkedin.com/in/fernandoott",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressCountry: "BR",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fernando Ott — Interactive AI Resume",
  url: BASE_URL,
  description:
    "Interactive resume and AI clone of Fernando Ott, Head of AI & AI Architect. Chat with an AI version of Fernando, explore his experience building multi-agent systems.",
  author: { "@type": "Person", name: "Fernando Ott" },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
