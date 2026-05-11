"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Eye, HeartHandshake, Target, UserCheck } from "lucide-react"
import { useRef } from "react"

type ValueIcon = "compassion" | "integrity" | "teamwork" | "dignity"

type ValueTone = "primary" | "secondary" | "accent"

export const WhoValuesBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const iconMap: Record<ValueIcon, React.ReactNode> = {
    compassion: <HeartHandshake className="h-6 w-6" />,
    integrity: <UserCheck className="h-6 w-6" />,
    teamwork: <Target className="h-6 w-6" />,
    dignity: <Eye className="h-6 w-6" />,
  }

  return (
    <section
      id="values"
      ref={ref}
      className="relative overflow-hidden px-4 py-4"
    >
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-right">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
            >
              {t.who.values.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.who.values.title.prefix}{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.who.values.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 ml-auto max-w-2xl text-lg leading-relaxed text-neutral-600"
            >
              {t.who.values.description}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.who.values.items.map(
              (
                item: {
                  title: string
                  description: string
                  icon: string
                  tone: string
                },
                index: number
              ) => {
                const safeIcon: ValueIcon =
                  item.icon === "compassion" ||
                  item.icon === "integrity" ||
                  item.icon === "teamwork" ||
                  item.icon === "dignity"
                    ? (item.icon as ValueIcon)
                    : "integrity"

                const safeTone: ValueTone =
                  item.tone === "primary" ||
                  item.tone === "secondary" ||
                  item.tone === "accent"
                    ? (item.tone as ValueTone)
                    : "primary"

                const tone =
                  safeTone === "secondary"
                    ? "from-secondary/12 to-secondary/6 text-secondary"
                    : safeTone === "accent"
                      ? "from-accent/12 to-accent/6 text-accent"
                      : "from-primary/12 to-primary/6 text-primary"

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 bg-linear-to-br ${tone} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${tone}`}
                      >
                        {iconMap[safeIcon]}
                      </div>
                      <div className="text-xl font-bold text-neutral-900">
                        {item.title}
                      </div>
                      <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
