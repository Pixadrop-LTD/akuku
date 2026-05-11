"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Eye, Target } from "lucide-react"
import { useRef } from "react"

export const WhoMissionVisionBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const cards = [
    {
      id: "mission" as const,
      icon: <Target className="h-6 w-6" />,
      tone: "from-primary/12 to-primary/6 text-primary",
    },
    {
      id: "vision" as const,
      icon: <Eye className="h-6 w-6" />,
      tone: "from-secondary/12 to-accent/6 text-secondary",
    },
  ]

  return (
    <section
      id="core"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              {t.who.mission_vision.badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.who.mission_vision.title.prefix}{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.who.mission_vision.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.who.mission_vision.description}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card, index) => {
              const data = t.who.mission_vision.cards[card.id]
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${card.tone} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${card.tone}`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {data.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                      {data.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
