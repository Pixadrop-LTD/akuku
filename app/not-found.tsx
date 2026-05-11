import NotFoundBlock from "@/components/blocks/error/not-found-block"
import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you’re looking for doesn’t exist, was moved, or is temporarily unavailable.",
  authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
  alternates: {
    canonical: `${baseUrl}/404`,
  },
  openGraph: {
    title: `404 - ${siteName}`,
    description:
      "The requested page could not be found. Return to the homepage to continue browsing ADT.",
    url: `${baseUrl}/404`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og/app.png`,
        width: 1200,
        height: 630,
        alt: `ADT - ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `404 - ${siteName}`,
    description:
      "The requested page could not be found. Return to the homepage to continue browsing ADT.",
    images: [`${baseUrl}/og/app.png`],
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

const NotFoundPage = () => {
  return <NotFoundBlock />
}

export default NotFoundPage
