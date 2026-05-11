"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Quote, Users } from "lucide-react"
import { useRef } from "react"

type PhilosophyPillarIcon = "idea" | "people"

export const WhoPhilosophyBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Users className="h-4 w-4" />
                {t.who.philosophy.badge}
              </span>
              <h2 className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-4xl">
                {t.who.philosophy.title.prefix}{" "}
                <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                  {t.who.philosophy.title.highlight}
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-neutral-600">
                {t.who.philosophy.description}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {t.who.philosophy.pillars.map(
                  (
                    pillar: {
                      title: string
                      description: string
                      icon: string
                    },
                    index: number
                  ) => {
                    const icon: PhilosophyPillarIcon =
                      pillar.icon === "idea" || pillar.icon === "people"
                        ? (pillar.icon as PhilosophyPillarIcon)
                        : "people"

                    const Icon = icon === "idea" ? Lightbulb : Users

                    return (
                      <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.6,
                          delay: 0.15 + index * 0.1,
                        }}
                        className="rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-base font-semibold text-neutral-900">
                              {pillar.title}
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-neutral-600">
                              {pillar.description}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  }
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -bottom-14 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
              />

              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl md:p-12">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-secondary/15 to-accent/10 text-secondary">
                    <Quote className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {t.who.philosophy.quote.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-neutral-700">
                      {t.who.philosophy.quote.body}
                    </p>
                    <div className="mt-6 text-sm font-semibold text-neutral-900">
                      {t.who.philosophy.quote.attribution}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
