import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { FooterLayout } from "@/components/layout/footer-layout"
import { HeaderLayout } from "@/components/layout/header-layout"
import { MainLayout } from "@/components/layout/main-layout"
import MainProvider from "@/components/provider/main-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const brandTitle =
  "35 Years of Indigenous Excellence in Community Transformation"
const defaultTitle = "Akukuranut Development Trust"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: `%s ~ ${brandTitle}`,
    default: `${defaultTitle}`,
  },
  description:
    "Akukuranut Development Trust (ADT) is Western Kenya's premier indigenous organization with 35 years of excellence in community transformation. Through the Busia Resilience Model, we bridge systemic vulnerability to sustainable self-reliance across Health, Education, and Economic domains. Serving 6,708 OVC and 2,765 households with proven institutional structures for lasting impact.",
  keywords: [
    "Akukuranut Development Trust",
    "ADT Busia",
    "Western Kenya NGO",
    "Community Development Trust",
    "OVC support Kenya",
    "Busia Resilience Model",
    "Indigenous organization Kenya",
    "Sustainable self-reliance",
    "Community transformation",
    "Health education economic empowerment",
  ],
  openGraph: {
    siteName: defaultTitle,
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: defaultTitle,
    description:
      "35 years of indigenous leadership in community transformation. ADT implements the Busia Resilience Model across Health, Education, and Economic domains, serving 6,708 OVC and 2,765 households in Western Kenya.",
    images: [
      {
        url: `${baseUrl}/og/app.png`,
        width: 1200,
        height: 630,
        alt: `${defaultTitle} - 35 Years of Community Transformation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Western Kenya's premier indigenous organization since 1989. Building institutional structures for lasting community impact through the Busia Resilience Model.",
    images: [`${baseUrl}/og/app.png`],
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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body
        suppressHydrationWarning
        className={`relative min-h-dvh font-sans antialiased scroll-smooth`}
      >
        {/* Global app background: primary-100 → secondary-100 gradient + subtle grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-br from-primary-50 to-secondary-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(0.9_0_0)_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />
        </div>
        <MainProvider>
          <HeaderLayout />
          <MainLayout>{children}</MainLayout>
          <FooterLayout />
        </MainProvider>
      </body>
    </html>
  )
}

export default RootLayout
