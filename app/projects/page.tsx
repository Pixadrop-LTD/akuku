import { ProjectsCTABlock } from "@/components/blocks/projects/projects-cta-block"
import { ProjectsFeaturedBlock } from "@/components/blocks/projects/projects-featured-block"
import { ProjectsHeroBlock } from "@/components/blocks/projects/projects-hero-block"
import { ProjectsImplementationBlock } from "@/components/blocks/projects/projects-implementation-block"
import { ProjectsNavigatorBlock } from "@/components/blocks/projects/projects-navigator-block"
import { ProjectsPipelineBlock } from "@/components/blocks/projects/projects-pipeline-block"
import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "Strategic Projects",
  description:
    "Explore ADT’s strategic projects portfolio: last-mile health delivery, education retention and scholarship pathways, household resilience and enterprise models—built for measurable outcomes and scale.",
  keywords: [
    "ADT",
    "Akukuranut Development Trust",
    "projects",
    "implementation partner",
    "last-mile delivery",
    "OVC",
    "Busia",
    "Western Kenya",
    "VSLA",
    "pediatric HIV",
    "scholarships",
    "social enterprise",
  ],
  authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
  openGraph: {
    title: `Projects - ${siteName}`,
    description:
      "A portfolio of implementation-ready models across health, education, and economic strengthening—designed as one resilience system.",
    url: `${baseUrl}/projects`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og/projects.png`,
        width: 1200,
        height: 630,
        alt: `ADT Projects - ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects - ${siteName}`,
    description:
      "Implementation-ready projects built for measurable, scalable impact across Western Kenya.",
    images: [`${baseUrl}/og/projects.png`],
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

const ProjectsPage = () => {
  return (
    <div>
      <ProjectsHeroBlock />
      <ProjectsNavigatorBlock />
      <ProjectsFeaturedBlock />
      <ProjectsImplementationBlock />
      <ProjectsPipelineBlock />
      <ProjectsCTABlock />
    </div>
  )
}

export default ProjectsPage
