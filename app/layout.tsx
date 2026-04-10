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
    default: "Fernando Ott — Head of AI | AI Engineer & Architect",
    template: "%s | Fernando Ott",
  },
  description:
    "Fernando Ott is a Head of AI, AI Engineer, and AI Architect with 16+ years of engineering experience and 4+ years shipping multi-agent AI systems and generative AI to production. Based in Brazil, working globally.",
  keywords: [
    "Fernando Ott",
    "Head of AI",
    "AI Engineer",
    "Senior AI Engineer",
    "Staff AI Engineer",
    "AI Architect",
    "multi-agent AI systems",
    "LangChain",
    "AI consultant",
    "generative AI",
    "GenAI",
    "LLM",
    "RAG",
    "AI product development",
    "Brazil AI engineer",
    "AI Strategy",
    "AI Governance",
    "AI Roadmap",
    "AI Transformation",
    "Digital Transformation",
    "AI Enablement",
    "Agentic AI",
    "NLP",
    "MLOps",
    "Deep Learning",
    "Context Engineering",
    "Stakeholder Management",
    "Python",
    "production AI",
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
    title: "Fernando Ott — Head of AI | AI Engineer & Architect",
    description:
      "I lead AI strategy and build production AI systems with Python, LangChain, and RAG daily. Head of AI, AI Engineer, and AI Architect. 16+ years engineering, 4+ years generative AI in production.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fernando Ott — Head of AI | AI Engineer & Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernando Ott — Head of AI | AI Engineer & Architect",
    description:
      "I lead AI strategy and build production AI systems with Python, LangChain, and RAG daily. Head of AI, AI Engineer, and AI Architect.",
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
    "Head of AI and AI Engineer with 16+ years of engineering experience and 4+ years shipping multi-agent AI systems and generative AI to production. Specializes in AI strategy, AI governance, LLM orchestration, and production generative AI systems using Python, LangChain, and RAG.",
  worksFor: {
    "@type": "Organization",
    name: "8 Figure Agency",
    url: "https://8figureagency.co",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade Federal do Paraná",
    url: "https://www.ufpr.br",
  },
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Head of AI",
      occupationLocation: { "@type": "Country", name: "Remote" },
      skills:
        "AI Strategy, AI Governance, AI Roadmap, AI Transformation, Digital Transformation, Cross-functional Leadership, Stakeholder Management, AI Enablement, Team Management, Technical Mentoring",
    },
    {
      "@type": "Occupation",
      name: "AI Engineer",
      occupationLocation: { "@type": "Country", name: "Remote" },
      skills:
        "Python, LangChain, RAG, LLM Orchestration, Multi-Agent Systems, Vector Databases, Prompt Engineering, Agentic AI, NLP, MLOps, Deep Learning, Context Engineering, Fine-Tuning, CrewAI, MCP Server",
    },
  ],
  knowsAbout: [
    "Multi-agent AI systems",
    "Large Language Models",
    "RAG (Retrieval-Augmented Generation)",
    "LangChain",
    "AI product development",
    "Machine learning in production",
    "Generative AI",
    "AI Strategy",
    "AI Governance",
    "AI Roadmap",
    "AI Transformation",
    "Digital Transformation",
    "AI Enablement",
    "Agentic AI",
    "NLP / Natural Language Processing",
    "MLOps",
    "Deep Learning",
    "Context Engineering",
    "Stakeholder Management",
    "Python",
    "CrewAI",
    "MCP Server",
    "Vector Databases",
    "Prompt Engineering",
    "Fine-Tuning",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  sameAs: [
    "https://github.com/DevOtts",
    "https://www.linkedin.com/in/feott",
    "https://www.youtube.com/@devotts",
    "https://www.youtube.com/@otimiza_ai",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Fernando Ott specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fernando Ott specializes in AI strategy, multi-agent AI systems architecture, and LLM orchestration. He designs production AI platforms using Python, LangChain, CrewAI, and MCP Server, with expertise in RAG pipelines, vector databases, prompt engineering, context engineering, and AI governance. He bridges the gap between AI strategy and hands-on AI engineering.",
      },
    },
    {
      "@type": "Question",
      name: "What is Fernando Ott's experience as Head of AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As Head of AI at 8 Figure Agency, Fernando leads the design of Brain — a multi-tenant, multi-agent AI platform serving agency clients. He defines AI strategy and AI roadmap, manages AI engineering teams, sets LLM orchestration patterns, implements AI governance frameworks, drives AI enablement and AI transformation across client organizations, and deploys production observability. He has 16+ years of engineering experience and 4+ years deploying generative AI at scale.",
      },
    },
    {
      "@type": "Question",
      name: "What is Fernando Ott's AI engineering experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fernando is a hands-on AI engineer who writes Python daily, builds multi-agent systems with LangChain and CrewAI, designs RAG pipelines with vector databases, implements prompt engineering and context engineering patterns, applies NLP and deep learning techniques, and deploys production AI on AWS. He has shipped 4 production AI systems: Brain (multi-agent platform), KeHE Search (14x performance improvement), Cognia (AI psychologist with multi-model safety pipeline), and TaskClaw (open source AI task platform).",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does Fernando Ott work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fernando works with Python, LangChain, CrewAI, MCP Server, Anthropic Claude, OpenAI, Mistral, LLaMA, Next.js, AWS (Lambda, SQS, S3, Bedrock), Docker, Kubernetes, PostgreSQL, MongoDB, Supabase, Vector DBs, Grafana, Datadog, and LangSmith. He specializes in LLM orchestration, RAG pipelines, agentic AI, context engineering, MLOps, and production generative AI systems.",
      },
    },
    {
      "@type": "Question",
      name: "Is Fernando Ott available for AI engineering or Head of AI roles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Fernando Ott is open to Head of AI, AI Architect, and Senior/Staff AI Engineer roles. He works remotely from Curitiba, Brazil and is available for global remote positions. He brings both AI strategy leadership and deep hands-on AI engineering skills — equally comfortable defining AI roadmap at the executive level and shipping production Python code daily.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
