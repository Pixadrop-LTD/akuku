"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { BarChart3, ShieldCheck } from "lucide-react"
import { useRef } from "react"

type AllocationId = "programs" | "admin" | "fundraising"

type HighlightTone = "primary" | "secondary" | "accent"

export const WhoTransparencyBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const allocations: Array<{
    id: AllocationId
    percent: number
    tone: string
  }> = [
    {
      id: "programs",
      percent: t.who.transparency.allocation.programs.percent,
      tone: "from-primary to-secondary",
    },
    {
      id: "admin",
      percent: t.who.transparency.allocation.admin.percent,
      tone: "from-secondary to-accent",
    },
    {
      id: "fundraising",
      percent: t.who.transparency.allocation.fundraising.percent,
      tone: "from-accent to-primary",
    },
  ]

  return (
    <section
      id="transparency"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:sticky lg:top-24"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <ShieldCheck className="h-4 w-4" />
                {t.who.transparency.badge}
              </span>
              <h2 className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-4xl">
                {t.who.transparency.title.prefix}{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t.who.transparency.title.highlight}
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
                {t.who.transparency.description}
              </p>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-neutral-900">
                      {t.who.transparency.overview.title}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {t.who.transparency.overview.body}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl md:p-10"
            >
              <h3 className="text-2xl font-bold text-neutral-900">
                {t.who.transparency.allocation.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {t.who.transparency.allocation.description}
              </p>

              <div className="mt-8 space-y-6">
                {allocations.map((item, index) => {
                  const data = t.who.transparency.allocation[item.id]
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-sm font-medium text-neutral-700">
                          {data.label}
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {data.percent}%
                        </div>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-neutral-200">
                        <div
                          className={`h-2.5 rounded-full bg-linear-to-r ${item.tone}`}
                          style={{ width: `${data.percent}%` }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.who.transparency.highlights.map(
                  (
                    h: { value: string; label: string; tone: string },
                    index: number
                  ) => {
                    const safeTone: HighlightTone =
                      h.tone === "primary" ||
                      h.tone === "secondary" ||
                      h.tone === "accent"
                        ? (h.tone as HighlightTone)
                        : "primary"

                    const tone =
                      safeTone === "secondary"
                        ? "text-secondary"
                        : safeTone === "accent"
                          ? "text-accent"
                          : "text-primary"

                    return (
                      <motion.div
                        key={h.label}
                        initial={{ opacity: 0, y: 14 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.6,
                          delay: 0.25 + index * 0.08,
                        }}
                        className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-center"
                      >
                        <div className={`text-3xl font-extrabold ${tone}`}>
                          {h.value}
                        </div>
                        <div className="mt-1 text-sm text-neutral-600">
                          {h.label}
                        </div>
                      </motion.div>
                    )
                  }
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
