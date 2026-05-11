import HomeCTABlock from "@/components/blocks/home/cta-block"
import HomeHeroBlock from "@/components/blocks/home/hero-block"
import HomeImpactBlock from "@/components/blocks/home/impact-block"
import HomeParticipateBlock from "@/components/blocks/home/participate-block"
import HomeProgramBlock from "@/components/blocks/home/program-block"
import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "35 Years of Community Transformation",
  description:
    "Western Kenya's premier indigenous organization, mobilizing resources to bridge the gap between systemic vulnerability and sustainable self-reliance through health, education, and economic empowerment programs.",
  keywords: [
    "ADT",
    "Akukuranut Development Trust",
    "community development",
    "Western Kenya",
    "sustainable development",
    "healthcare",
    "education",
    "economic empowerment",
  ],
  authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
  alternates: {
    canonical: `${baseUrl}/`,
  },
  openGraph: {
    title: `Akukuranut Development Trust - ${siteName}`,
    description:
      "35 years of indigenous leadership delivering measurable transformation across Western Kenya's most vulnerable communities through comprehensive programs and strategic partnerships.",
    url: `${baseUrl}/`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og/home.png`,
        width: 1200,
        height: 630,
        alt: `ADT - ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Akukuranut Development Trust - ${siteName}`,
    description:
      "35 years of transforming communities through precision healthcare, education excellence, and sustainable development across Western Kenya.",
    images: [`${baseUrl}/og/home.png`],
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

const HomePage = () => {
  return (
    <div>
      {/* Hero section */}
      <HomeHeroBlock />

      {/* Programmes section */}
      <HomeProgramBlock />

      {/* Impact section */}
      <HomeImpactBlock />

      {/* Participate section */}
      <HomeParticipateBlock />

      {/* CTA Section */}
      <HomeCTABlock />
    </div>
  )
}

export default HomePage
