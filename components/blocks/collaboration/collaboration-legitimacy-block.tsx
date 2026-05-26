"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Landmark, Scale, Shield } from "lucide-react"
import { useRef } from "react"

export const CollaborationLegitimacyBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const cards = [
    {
      title: t.collaboration.legitimacy.cards.experience.title,
      description: t.collaboration.legitimacy.cards.experience.description,
      icon: <Landmark className="h-6 w-6" />,
      tone: "from-primary/12 to-primary/6 text-primary",
    },
    {
      title: t.collaboration.legitimacy.cards.compliance.title,
      description: t.collaboration.legitimacy.cards.compliance.description,
      icon: <Scale className="h-6 w-6" />,
      tone: "from-secondary/12 to-secondary/6 text-secondary",
    },
    {
      title: t.collaboration.legitimacy.cards.trust.title,
      description: t.collaboration.legitimacy.cards.trust.description,
      icon: <Shield className="h-6 w-6" />,
      tone: "from-accent/12 to-accent/6 text-accent",
    },
    {
      title: t.collaboration.legitimacy.cards.donor_experience.title,
      description:
        t.collaboration.legitimacy.cards.donor_experience.description,
      icon: <Landmark className="h-6 w-6" />,
      tone: "from-primary/12 to-primary/6 text-primary",
    },
    {
      title: t.collaboration.legitimacy.cards.expertise.title,
      description: t.collaboration.legitimacy.cards.expertise.description,
      icon: <Scale className="h-6 w-6" />,
      tone: "from-secondary/12 to-secondary/6 text-secondary",
    },
    {
      title: t.collaboration.legitimacy.cards.monitoring.title,
      description: t.collaboration.legitimacy.cards.monitoring.description,
      icon: <Shield className="h-6 w-6" />,
      tone: "from-accent/12 to-accent/6 text-accent",
    },
  ]

  return (
    <section id="why-adt" ref={ref} className="relative overflow-hidden py-8">
      <div className="mx-auto max-container-2xl px-4">
        <div className="mx-auto max-container-2xl">
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              {t.collaboration.legitimacy.badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.collaboration.legitimacy.title.prefix}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                {t.collaboration.legitimacy.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.collaboration.legitimacy.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {cards.map((c, index) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${c.tone} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${c.tone}`}
                    >
                      {c.icon}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {c.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
