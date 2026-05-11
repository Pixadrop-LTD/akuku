"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export const BlogPopularBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="relative px-4 pb-24">
      <div className="mx-auto max-container-2xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-container rounded-2xl border border-neutral-200/70 bg-white px-6 py-12 sm:px-10 sm:py-16"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">
              {t.blog.popular.kicker}
            </p>
            <h2 className="font-headings text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {t.blog.popular.title}
            </h2>
          </div>

          <div className="mt-10" />
        </motion.div>
      </div>
    </section>
  )
}
