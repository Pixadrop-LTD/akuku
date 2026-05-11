import { WhoCTABlock } from "@/components/blocks/who/who-cta-block"
import { WhoGovernanceBlock } from "@/components/blocks/who/who-governance-block"
import { WhoHeroBlock } from "@/components/blocks/who/who-hero-block"
import { WhoLeadershipBlock } from "@/components/blocks/who/who-leadership-block"
import { WhoLegalFrameworkBlock } from "@/components/blocks/who/who-legal-framework-block"
import { WhoMissionVisionBlock } from "@/components/blocks/who/who-mission-vision-block"
import { WhoPhilosophyBlock } from "@/components/blocks/who/who-philosophy-block"
import { WhoTimelineBlock } from "@/components/blocks/who/who-timeline-block"
import { WhoTransparencyBlock } from "@/components/blocks/who/who-transparency-block"
import { WhoValuesBlock } from "@/components/blocks/who/who-values-block"
import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "Heritage & Governance",
  description:
    "Built on trust and governed by accountability. Discover ADT’s legal foundation, participatory philosophy, leadership structure, and the institutional systems behind 35 years of community transformation.",
  keywords: [
    "ADT",
    "Akukuranut Development Trust",
    "Cap 164",
    "Trustee’s Perpetual Succession Act",
    "governance",
    "community participation",
    "Busia",
    "Western Kenya",
  ],
  authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
  openGraph: {
    title: `Who We Are - ${siteName}`,
    description:
      "ADT is a legally fortified, audit-ready institution enabling long-term, locally-owned transformation across Western Kenya.",
    url: `${baseUrl}/who`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og/who.png`,
        width: 1200,
        height: 630,
        alt: `ADT Who We Are - ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Who We Are - ${siteName}`,
    description:
      "Built on trust. Governed by accountability. The institutional model behind ADT’s community transformation.",
    images: [`${baseUrl}/og/who.png`],
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

const AboutPage = () => {
  return (
    <div>
      <WhoHeroBlock />
      <WhoMissionVisionBlock />
      <WhoLegalFrameworkBlock />
      <WhoPhilosophyBlock />
      <WhoValuesBlock />
      <WhoTimelineBlock />
      <WhoLeadershipBlock />
      <WhoGovernanceBlock />
      <WhoTransparencyBlock />
      <WhoCTABlock />
    </div>
  )
}

export default AboutPage
