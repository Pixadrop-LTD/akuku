"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Briefcase, Network, Users } from "lucide-react"
import { useRef } from "react"

type GovernanceId = "board" | "staff" | "volunteers"

export const WhoGovernanceBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const items: Array<{ id: GovernanceId; icon: React.ReactNode }> = [
    { id: "board", icon: <Briefcase className="h-5 w-5" /> },
    { id: "staff", icon: <Users className="h-5 w-5" /> },
    { id: "volunteers", icon: <Network className="h-5 w-5" /> },
  ]

  return (
    <section
      id="governance"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
            >
              <Users className="h-4 w-4" />
              {t.who.governance.badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.who.governance.title.prefix}{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.who.governance.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.who.governance.description}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item, index) => {
              const data = t.who.governance.items[item.id]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl"
                  />

                  <div className="relative z-10">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                      {item.icon}
                    </div>
                    <div className="text-xl font-bold text-neutral-900">
                      {data.title}
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {data.description}
                    </div>
                    <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                      {data.bullets.map((bullet: string) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
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
