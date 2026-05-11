import ContentInsightsBlock from "@/components/blocks/content/content-insights-block"
import { Insights } from "@/config/insights"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

const getInsightBySlug = (slug: string) => {
  return Insights.insights.find((i) => i.slug === slug) ?? null
}

const resolveInsightFileSlug = (slug: string) => {
  if (slug === "partnerships") return "patnerships"
  return slug
}

const insightImports = {
  advocacy: () => import("@/content/insights/advocacy.mdx"),
  giving: () => import("@/content/insights/giving.mdx"),
  patnerships: () => import("@/content/insights/patnerships.mdx"),
} satisfies Record<string, () => Promise<{ default: React.ComponentType }>>

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ insights: string }> | { insights: string }
}): Promise<Metadata> => {
  const resolvedParams = await params
  const { insights } = resolvedParams
  const insight = getInsightBySlug(insights)

  if (!insight) {
    return {
      title: `Insights - ${siteName}`,
      description: "Company insights and resources.",
      robots: { index: false, follow: false },
    }
  }

  const title = insight.title
  const description = `Read ${insight.title} on ${siteName}.`
  const url = `${baseUrl}/${insight.slug}`

  return {
    title,
    description,
    keywords: ["insights", siteName, "ADT"],
    authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} - ${siteName}`,
      description,
      url,
      siteName,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${siteName}`,
      description,
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

const InsightPage = async ({
  params,
}: {
  params: Promise<{ insights: string }> | { insights: string }
}) => {
  const resolvedParams = await params
  const { insights } = resolvedParams
  const insight = getInsightBySlug(insights)

  if (!insight) notFound()

  const fileSlug = resolveInsightFileSlug(
    insights
  ) as keyof typeof insightImports
  const load = insightImports[fileSlug]
  if (!load) notFound()
  const { default: Content } = await load()

  return (
    <ContentInsightsBlock>
      <Content />
    </ContentInsightsBlock>
  )
}

export const generateStaticParams = () => {
  return Insights.insights.map((i) => ({ insights: i.slug }))
}

export const dynamicParams = false

export default InsightPage
