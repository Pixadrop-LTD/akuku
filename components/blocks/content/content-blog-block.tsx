"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"

type ContentBlogBlockProps = {
  children: ReactNode
  className?: string
}

const ContentBlogBlock = ({ children, className }: ContentBlogBlockProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="relative px-2 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:px-4 lg:pb-24">
      <div className="mx-auto max-container-2xl px-2 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-container rounded-2xl bg-secondary-50 px-4 py-5 lg:py-10 lg:px-10"
        >
          <div
            className={cn(
              "prose max-w-none prose-neutral md:prose-lg",
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

export default ContentBlogBlock
