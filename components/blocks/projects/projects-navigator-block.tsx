"use client"

import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { GraduationCap, HeartPulse, TrendingUp } from "lucide-react"
import type { ReactNode } from "react"
import { useRef, useState } from "react"

type DomainId = "healthy" | "schooled" | "stable"

type DomainTone = "primary" | "secondary" | "accent"

export const ProjectsNavigatorBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [active, setActive] = useState<DomainId>("healthy")

  const domains: Array<{
    id: DomainId
    tone: DomainTone
    icon: ReactNode
  }> = [
    { id: "healthy", tone: "accent", icon: <HeartPulse className="h-5 w-5" /> },
    {
      id: "schooled",
      tone: "secondary",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    { id: "stable", tone: "primary", icon: <TrendingUp className="h-5 w-5" /> },
  ]

  const toneStyles: Record<
    DomainTone,
    { badge: string; ring: string; glow: string; dot: string }
  > = {
    primary: {
      badge: "bg-primary/10 text-primary",
      ring: "ring-primary/20",
      glow: "from-primary/20 to-primary/0",
      dot: "bg-primary",
    },
    secondary: {
      badge: "bg-secondary/10 text-secondary",
      ring: "ring-secondary/20",
      glow: "from-secondary/20 to-secondary/0",
      dot: "bg-secondary",
    },
    accent: {
      badge: "bg-accent/10 text-accent",
      ring: "ring-accent/20",
      glow: "from-accent/20 to-accent/0",
      dot: "bg-accent",
    },
  }

  const activeData = t.projects.navigator.domains[active]

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-0"
    >
      <div className="mx-auto max-container-2xl px-4">
        <div className="mx-auto max-container-2xl">
          <div className="relative mb-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur"
            >
              {t.projects.navigator.badge}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.projects.navigator.title.prefix}{" "}
              <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t.projects.navigator.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.projects.navigator.description}
            </motion.p>

            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-10 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="grid gap-3">
                {domains.map((domain, index) => {
                  const data = t.projects.navigator.domains[domain.id]
                  const tone = toneStyles[domain.tone]
                  const selected = active === domain.id

                  return (
                    <motion.button
                      key={domain.id}
                      type="button"
                      onClick={() => setActive(domain.id)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
                      className={cn(
                        "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                        selected
                          ? "border-neutral-900/10 bg-neutral-50 shadow-sm"
                          : "border-neutral-200 bg-white hover:bg-neutral-50"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                          tone.badge
                        )}
                      >
                        {domain.icon}
                      </span>

                      <span className="flex-1">
                        <span className="block text-base font-bold text-neutral-900">
                          {data.title}
                        </span>
                        <span className="mt-1 block text-sm text-neutral-600">
                          {data.short}
                        </span>
                      </span>

                      <span
                        className={cn(
                          "ml-auto h-2.5 w-2.5 rounded-full",
                          selected ? tone.dot : "bg-neutral-300"
                        )}
                      />

                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                          "bg-linear-to-r",
                          tone.glow
                        )}
                      />
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-30"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -bottom-14 -left-12 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold",
                      toneStyles[
                        domains.find((d) => d.id === active)?.tone ?? "accent"
                      ].badge
                    )}
                  >
                    {activeData.label}
                  </span>
                  <span
                    className={cn(
                      "inline-flex rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-semibold text-neutral-700",
                      "ring-1",
                      toneStyles[
                        domains.find((d) => d.id === active)?.tone ?? "accent"
                      ].ring
                    )}
                  >
                    {activeData.signal}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-neutral-900">
                  {activeData.headline}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {activeData.description}
                </p>

                <div className="mt-7 grid gap-3">
                  {activeData.highlights.map((item: string) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-3 text-sm font-medium text-neutral-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
