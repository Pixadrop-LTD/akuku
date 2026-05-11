import { ImpactCommunityBlock } from "@/components/blocks/impact/impact-community-block"
import { ImpactEducationBlock } from "@/components/blocks/impact/impact-education-block"
import { ImpactHealthcareBlock } from "@/components/blocks/impact/impact-healthcare-block"
import { ImpactMetricsBlock } from "@/components/blocks/impact/impact-metrics-block"
import { ImpactStatsBlock } from "@/components/blocks/impact/impact-stats-block"
import { ImpactTimelineBlock } from "@/components/blocks/impact/impact-timeline-block"
import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "ADT Community Transformation",
  description:
    "35 years of indigenous leadership delivering measurable transformation across Western Kenya's most vulnerable communities through our comprehensive programs and strategic partnerships.",
  keywords: [
    "ADT",
    "Akukuranut Development Trust",
    "community development",
    "healthcare",
    "education",
    "impact",
    "Western Kenya",
    "sustainable development",
  ],
  authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
  openGraph: {
    title: `Our Impact - ${siteName}`,
    description:
      "Discover how ADT is transforming lives through 35 years of dedicated community service, clinical excellence, and sustainable development programs across Western Kenya.",
    url: `${baseUrl}/impact`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og/impact.png`,
        width: 1200,
        height: 630,
        alt: `ADT Impact - ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Impact - ${siteName}`,
    description:
      "35 years of transforming communities through precision healthcare, education excellence, and sustainable development.",
    images: [`${baseUrl}/og/impact.png`],
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

const ImpactPage = () => {

  return (
    <div>
      <ImpactCommunityBlock />
      <ImpactEducationBlock />
      <ImpactHealthcareBlock />
      <ImpactStatsBlock />
      <ImpactMetricsBlock />
      <ImpactTimelineBlock />
    </div>
  )
}

export default ImpactPage
