import ContentTermsBlock from "@/components/blocks/content/content-terms-block"
import { Terms } from "@/config/terms"
import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

const getTermsMeta = (terms: string) => {
  const map: Record<
    string,
    { title: string; description: string; keywords: string[] }
  > = {
    "privacy-policy": {
      title: "Privacy Policy",
      description:
        "Read how ADT collects, uses, stores, and protects your personal data when you interact with our website and programs.",
      keywords: [
        "ADT",
        "privacy policy",
        "data protection",
        "personal data",
        "Western Kenya",
      ],
    },
    "terms-and-conditions": {
      title: "Terms & Conditions",
      description:
        "Review the terms and conditions that govern the use of ADT’s website, services, and digital content.",
      keywords: ["ADT", "terms", "conditions", "website terms", "usage policy"],
    },
    "cookie-policy": {
      title: "Cookie Policy",
      description:
        "Learn how ADT uses cookies and similar technologies to improve performance, measure usage, and enhance your experience.",
      keywords: [
        "ADT",
        "cookie policy",
        "cookies",
        "analytics",
        "tracking technologies",
      ],
    },
  }

  return (
    map[terms] ?? {
      title: "Legal",
      description:
        "Legal information and policies for ADT’s website and digital services.",
      keywords: ["ADT", "legal", "policy"],
    }
  )
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ terms: string }>
}): Promise<Metadata> => {
  const { terms } = await params
  const meta = getTermsMeta(terms)
  const url = `${baseUrl}/page/${terms}`

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.title} - ${siteName}`,
      description: meta.description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} - ${siteName}`,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

const TermsPage = async ({
  params,
}: {
  params: Promise<{ terms: string }>
}) => {
  const { terms } = await params
  const { default: Content } = await import(`@/content/terms/${terms}.mdx`)
  return (
    <ContentTermsBlock>
      <Content />
    </ContentTermsBlock>
  )
}

export const generateStaticParams = () => {
  return Terms.terms.map((term) => ({ terms: term.terms }))
}

export const dynamicParams = false

export default TermsPage
