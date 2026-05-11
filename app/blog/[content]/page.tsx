import { BlogArticleContentBlock } from "@/components/blocks/blog/blog-article-content-block"
import { BlogArticleHeroBlock } from "@/components/blocks/blog/blog-article-hero-block"
import { BlogArticleRelatedBlock } from "@/components/blocks/blog/blog-article-related-block"
import { Assets } from "@/config/assets"
import { Blog } from "@/config/blog"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ADT"

const getBlogBySlug = (slug: string) => {
  return Blog.blogs.find((b) => b.slug === slug) ?? null
}

export const generateMetadata = ({
  params,
}: {
  params: { content: string }
}): Metadata => {
  const { content } = params
  const blog = getBlogBySlug(content)

  if (!blog) {
    return {
      title: `Blog - ${siteName}`,
      description: "Articles and updates.",
      robots: { index: false, follow: false },
    }
  }

  const title = blog.title
  const description = `Read ${blog.title} on ${siteName}.`
  const url = `${baseUrl}/blog/${blog.slug}`

  return {
    title,
    description,
    keywords: ["blog", siteName, "ADT"],
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

const BlogContentPage = async ({ params }: { params: { content: string } }) => {
  const { content } = params
  const blog = getBlogBySlug(content)

  if (!blog) notFound()

  const { default: Content } = await import(`@/content/blog/${content}.mdx`)

  return (
    <div>
      <BlogArticleHeroBlock title={blog.title} image={Assets.blog.hero.src} />
      <BlogArticleContentBlock>
        <Content />
      </BlogArticleContentBlock>
      <BlogArticleRelatedBlock />
    </div>
  )
}

export const generateStaticParams = () => {
  return Blog.blogs.map((b) => ({ content: b.slug }))
}

export const dynamicParams = false

export default BlogContentPage
