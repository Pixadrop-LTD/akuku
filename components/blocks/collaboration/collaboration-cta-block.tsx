"use client"

import { useContactSheet } from "@/hooks/use-contact-sheet"
import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { ArrowRight, HandHeart, Mail, Phone } from "lucide-react"
import { useRef } from "react"

export const CollaborationCTABlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { openSheet } = useContactSheet()

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-linear-to-br from-primary to-secondary px-4 py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
      >
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-48 translate-y-48 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-container-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-headings text-3xl font-bold md:text-4xl lg:text-5xl"
          >
            {t.collaboration.cta.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg leading-relaxed text-white/90"
          >
            {t.collaboration.cta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.button
              onClick={openSheet}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-300 hover:bg-neutral-100 sm:px-8 sm:py-4 sm:text-base"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              {t.collaboration.cta.primary.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </motion.button>
            <motion.a
              href={t.collaboration.cta.secondary.href}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              {t.collaboration.cta.secondary.label}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/80"
          >
            {t.collaboration.cta.meta.map((m: { label: string }) => (
              <div key={m.label} className="rounded-full bg-white/10 px-4 py-2">
                {m.label}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-12 grid max-w-3xl gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 text-left backdrop-blur-sm sm:grid-cols-2"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <HandHeart className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {t.collaboration.cta.contact.email.label}
                </div>
                <div className="mt-1 text-sm text-white/90">
                  {t.collaboration.cta.contact.email.value}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <HandHeart className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {t.collaboration.cta.contact.phone.label}
                </div>
                <div className="mt-1 text-sm text-white/90">
                  {t.collaboration.cta.contact.phone.value}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
