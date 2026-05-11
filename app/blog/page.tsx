import { BlogHeroBlock } from "@/components/blocks/blog/blog-hero-block"
import { BlogMainContentBlock } from "@/components/blocks/blog/blog-main-content-block"
import { BlogPopularBlock } from "@/components/blocks/blog/blog-popular-block"
import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, analysis, and updates from the field.",
  keywords: ["blog", "insights", siteName, "ADT"],
  authors: [{ name: "Akukuranut Development Trust", url: baseUrl }],
  openGraph: {
    title: `Blog - ${siteName}`,
    description: "Stories, analysis, and updates from the field.",
    url: `${baseUrl}/blog`,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog - ${siteName}`,
    description: "Stories, analysis, and updates from the field.",
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

const BlogPage = () => {
  return (
    <div>
      <BlogHeroBlock />
      <BlogMainContentBlock />
      <BlogPopularBlock />
    </div>
  )
}

export default BlogPage
