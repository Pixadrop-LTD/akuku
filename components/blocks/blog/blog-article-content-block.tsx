"use client"

import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"

type BlogArticleContentBlockProps = {
  children: ReactNode
  className?: string
}

export const BlogArticleContentBlock = ({
  children,
  className,
}: BlogArticleContentBlockProps) => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="relative px-4 pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-container rounded-2xl bg-secondary-50 px-10 py-20"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">
              {t.blog.article.content.kicker}
            </p>
            <h2 className="font-headings text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {t.blog.article.content.title}
            </h2>
          </div>

          <div
            className={cn(
              "prose mt-12 max-w-none prose-neutral md:prose-lg",
              "prose-headings:font-headings prose-headings:tracking-tight",
              "prose-p:leading-relaxed prose-p:text-neutral-700",
              "prose-a:text-accent prose-a:decoration-accent/30 prose-a:underline-offset-4 hover:prose-a:decoration-accent/60",
              "prose-strong:text-neutral-900",
              "prose-hr:border-neutral-200",
              "prose-blockquote:border-neutral-200 prose-blockquote:text-neutral-700",
              "prose-code:text-neutral-900",
              "prose-pre:border prose-pre:border-neutral-200 prose-pre:bg-neutral-50",
              className
            )}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
