"use client"

import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import {
  Activity,
  ArrowRight,
  ClipboardCheck,
  Network,
  ShieldCheck,
} from "lucide-react"
import type { ReactNode } from "react"
import { useRef } from "react"

type StepId = "diagnose" | "co_design" | "deliver" | "measure"

type StepTone = "primary" | "secondary" | "accent"

export const ProjectsImplementationBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const iconMap: Record<StepId, ReactNode> = {
    diagnose: <Network className="h-5 w-5" />,
    co_design: <ShieldCheck className="h-5 w-5" />,
    deliver: <Activity className="h-5 w-5" />,
    measure: <ClipboardCheck className="h-5 w-5" />,
  }

  const toneMap: Record<StepTone, string> = {
    primary: "from-primary/12 to-primary/6 text-primary",
    secondary: "from-secondary/12 to-secondary/6 text-secondary",
    accent: "from-accent/12 to-accent/6 text-accent",
  }

  return (
    <section
      id="implementation"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.85_0.12_160)_0%,transparent_55%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.9_0.08_250)_0%,transparent_60%)] opacity-25" />
      </div>

      <div className="relative mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
            >
              {t.projects.implementation.badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.projects.implementation.title.prefix}{" "}
              <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t.projects.implementation.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.projects.implementation.description}
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm lg:col-span-5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
                <div className="absolute -bottom-14 -left-14 h-56 w-56 rounded-full bg-secondary/25 blur-3xl" />
              </div>

              <div className="relative">
                <div className="text-sm font-semibold tracking-wide text-neutral-700 uppercase">
                  {t.projects.implementation.loop.kicker}
                </div>
                <div className="mt-3 text-2xl font-bold text-neutral-900">
                  {t.projects.implementation.loop.title}
                </div>
                <div className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {t.projects.implementation.loop.body}
                </div>

                <div className="mt-7 grid gap-3">
                  {t.projects.implementation.loop.bullets.map((b: string) => (
                    <div
                      key={b}
                      className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-3 text-sm font-semibold text-neutral-800"
                    >
                      {b}
                    </div>
                  ))}
                </div>

                <a
                  href={t.projects.implementation.loop.cta.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900"
                >
                  {t.projects.implementation.loop.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="grid gap-6 lg:col-span-7"
            >
              {t.projects.implementation.steps.map(
                (
                  step: {
                    id: string
                    title: string
                    description: string
                    tone: string
                  },
                  index: number
                ) => {
                  const safeId: StepId =
                    step.id === "diagnose" ||
                    step.id === "co_design" ||
                    step.id === "deliver" ||
                    step.id === "measure"
                      ? (step.id as StepId)
                      : "deliver"

                  const safeTone: StepTone =
                    step.tone === "primary" ||
                    step.tone === "secondary" ||
                    step.tone === "accent"
                      ? (step.tone as StepTone)
                      : "primary"

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                      className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                          toneMap[safeTone]
                        )}
                      />

                      <div className="relative z-10 flex items-start gap-5">
                        <div
                          className={cn(
                            "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br",
                            toneMap[safeTone]
                          )}
                        >
                          {iconMap[safeId]}
                        </div>

                        <div className="flex-1">
                          <div className="text-xl font-bold text-neutral-900">
                            {step.title}
                          </div>
                          <div className="mt-2 text-sm leading-relaxed text-neutral-600">
                            {step.description}
                          </div>
                        </div>

                        <div className="text-sm font-bold text-neutral-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </motion.div>
                  )
                }
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
