"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Landmark, Scale, Shield } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export const CollaborationLegitimacyBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const cards = [
    {
      title: t.collaboration.legitimacy.cards.permanence.title,
      description: t.collaboration.legitimacy.cards.permanence.description,
      icon: <Landmark className="h-6 w-6" />,
      tone: "from-primary/12 to-primary/6 text-primary",
    },
    {
      title: t.collaboration.legitimacy.cards.governance.title,
      description: t.collaboration.legitimacy.cards.governance.description,
      icon: <Scale className="h-6 w-6" />,
      tone: "from-secondary/12 to-secondary/6 text-secondary",
    },
    {
      title: t.collaboration.legitimacy.cards.discipline.title,
      description: t.collaboration.legitimacy.cards.discipline.description,
      icon: <Shield className="h-6 w-6" />,
      tone: "from-accent/12 to-accent/6 text-accent",
    },
  ]

  return (
    <section
      id="why-adt"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
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
                className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600"
              >
                {t.collaboration.legitimacy.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 grid gap-6"
              >
                {cards.map((c, index) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 + index * 0.1 }}
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

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
              <div className="relative aspect-4/3">
                <Image
                  src={Assets.collaborations.colabos}
                  alt={t.collaboration.legitimacy.image_alt}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative p-8">
                <div className="text-sm font-semibold tracking-widest text-accent uppercase">
                  {t.collaboration.legitimacy.aside.kicker}
                </div>
                <div className="mt-3 text-2xl font-bold text-neutral-900">
                  {t.collaboration.legitimacy.aside.title}
                </div>
                <div className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {t.collaboration.legitimacy.aside.body}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
