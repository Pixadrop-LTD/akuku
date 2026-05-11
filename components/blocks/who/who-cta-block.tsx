"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { ArrowRight, HandHeart, Users } from "lucide-react"
import { useRef } from "react"

export const WhoCTABlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="who-cta"
      ref={ref}
      className="relative overflow-hidden bg-linear-to-br from-primary to-secondary px-4 py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-48 translate-y-48 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-headings text-3xl font-bold md:text-4xl lg:text-5xl"
          >
            {t.who.cta.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg leading-relaxed text-white/90"
          >
            {t.who.cta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href={t.who.cta.primary.href}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-primary shadow-lg transition-all duration-300 hover:bg-neutral-100"
            >
              <HandHeart className="h-5 w-5" />
              {t.who.cta.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href={t.who.cta.secondary.href}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              <Users className="h-5 w-5" />
              {t.who.cta.secondary.label}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/80"
          >
            {t.who.cta.meta.map((m: { label: string }) => (
              <div key={m.label} className="rounded-full bg-white/10 px-4 py-2">
                {m.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
