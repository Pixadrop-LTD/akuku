import { Metadata } from "next"

import { CollaborationCTABlock } from "@/components/blocks/collaboration/collaboration-cta-block"
import { CollaborationEvidenceBlock } from "@/components/blocks/collaboration/collaboration-evidence-block"
import { CollaborationHeroBlock } from "@/components/blocks/collaboration/collaboration-hero-block"
import { CollaborationInvestmentBlock } from "@/components/blocks/collaboration/collaboration-investment-block"
import { CollaborationLegitimacyBlock } from "@/components/blocks/collaboration/collaboration-legitimacy-block"
import { CollaborationModelsBlock } from "@/components/blocks/collaboration/collaboration-models-block"
import { CollaborationPartnersBlock } from "@/components/blocks/collaboration/collaboration-partners-block"
import { CollaborationPortfolioBlock } from "@/components/blocks/collaboration/collaboration-portfolio-block"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "Collaboration",
  description:
    "Partner with ADT to deliver measurable outcomes across health, education, and household resilience in Western Kenya.",
  openGraph: {
    title: `Collaboration - ${siteName}`,
    description:
      "A partnership pathway for donors, implementers, and impact investors—built around audited delivery systems and local governance.",
    url: `${baseUrl}/collaboration`,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Collaboration - ${siteName}`,
    description:
      "A partnership pathway for donors, implementers, and impact investors—built around audited delivery systems and local governance.",
  },
}

const CollaborationPage = () => {
  return (
    <div>
      <CollaborationHeroBlock />
      <CollaborationLegitimacyBlock />
      <CollaborationModelsBlock />
      <CollaborationPortfolioBlock />
      <CollaborationEvidenceBlock />
      <CollaborationPartnersBlock />
      <CollaborationInvestmentBlock />
      <CollaborationCTABlock />
    </div>
  )
}

export default CollaborationPage
