"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { BadgeCheck } from "lucide-react"
import { useMemo, useRef } from "react"

type LeaderId = "trustees" | "technical" | "volunteers"

export const WhoLeadershipBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const leaders = useMemo(
    () =>
      [
        {
          id: "trustees" as const,
          tone: "bg-primary/10 text-primary",
          ring: "ring-primary/20",
        },
        {
          id: "technical" as const,
          tone: "bg-secondary/10 text-secondary",
          ring: "ring-secondary/20",
        },
        {
          id: "volunteers" as const,
          tone: "bg-accent/10 text-accent",
          ring: "ring-accent/20",
        },
      ] satisfies Array<{ id: LeaderId; tone: string; ring: string }>,
    []
  )

  return (
    <section
      id="leadership"
      ref={ref}
      className="relative overflow-hidden py-8"
    >
      <div className="mx-auto max-container-2xl px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
            >
              <BadgeCheck className="h-4 w-4" />
              {t.who.leadership.badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.who.leadership.title.prefix}{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.who.leadership.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.who.leadership.description}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {leaders.map((leader, index) => {
              const data = t.who.leadership.items[leader.id]
              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                  className="group rounded-2xl border border-neutral-200 bg-white/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${leader.tone}`}
                    >
                      {data.kicker}
                    </span>
                    <div
                      className={`h-10 w-10 rounded-2xl ring-4 ${leader.ring} bg-neutral-900/5`}
                    />
                  </div>

                  <div className="mt-6 text-xl font-bold text-neutral-900">
                    {data.title}
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {data.description}
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                    {data.bullets.map((b: string) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
