"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { BadgeCheck, Building2, Globe, Landmark } from "lucide-react"
import { useRef } from "react"

export const CollaborationPartnersBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const principles = [
    {
      title: t.collaboration.partners.principles.shared_accountability.title,
      description:
        t.collaboration.partners.principles.shared_accountability.description,
      icon: <BadgeCheck className="h-5 w-5" />,
      tone: "from-primary/12 to-primary/6 text-primary",
    },
    {
      title: t.collaboration.partners.principles.government_aligned.title,
      description:
        t.collaboration.partners.principles.government_aligned.description,
      icon: <Landmark className="h-5 w-5" />,
      tone: "from-secondary/12 to-secondary/6 text-secondary",
    },
    {
      title: t.collaboration.partners.principles.implementation_mindset.title,
      description:
        t.collaboration.partners.principles.implementation_mindset.description,
      icon: <Building2 className="h-5 w-5" />,
      tone: "from-accent/12 to-accent/6 text-accent",
    },
    {
      title: t.collaboration.partners.principles.local_intelligence.title,
      description:
        t.collaboration.partners.principles.local_intelligence.description,
      icon: <Globe className="h-5 w-5" />,
      tone: "from-primary/12 to-primary/6 text-primary",
    },
  ]

  return (
    <section
      id="partners"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
            >
              {t.collaboration.partners.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.collaboration.partners.title.prefix}
              <span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                {" "}
                {t.collaboration.partners.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.collaboration.partners.description}
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {principles.map((p, index) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br ${p.tone} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative z-10">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${p.tone}`}
                  >
                    {p.icon}
                  </div>
                  <div className="text-xl font-bold text-neutral-900">
                    {p.title}
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {p.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm"
            >
              <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                {t.collaboration.partners.current.title}
              </div>
              <div className="mt-6 grid gap-3">
                {t.collaboration.partners.current.items.map((p: string) => (
                  <div
                    key={p}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white/60 px-5 py-4"
                  >
                    <div className="text-sm font-semibold text-neutral-900">
                      {p}
                    </div>
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm"
            >
              <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                {t.collaboration.partners.legacy.title}
              </div>
              <div className="mt-6 grid gap-3">
                {t.collaboration.partners.legacy.items.map((p: string) => (
                  <div
                    key={p}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white/60 px-5 py-4"
                  >
                    <div className="text-sm font-semibold text-neutral-900">
                      {p}
                    </div>
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
