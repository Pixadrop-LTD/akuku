"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type StatId =
  | "children_supported"
  | "households_reached"
  | "viral_suppression"
  | "years_service"

export const ImpactStatsBlock = () => {
  const { t } = useLocale()

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const [animatedValues, setAnimatedValues] = useState<Record<StatId, string>>({
    children_supported: "0",
    households_reached: "0",
    viral_suppression: "0",
    years_service: "0",
  })

  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp

      const elapsed = timestamp - startTimeRef.current
      const duration = 2000

      const progress = Math.min(1, elapsed / duration)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      const stats: Array<{ id: StatId; target: string }> = [
        {
          id: "children_supported",
          target: t.home.impact.statistics.children_supported.number,
        },
        {
          id: "households_reached",
          target: t.home.impact.statistics.households_reached.number,
        },
        {
          id: "viral_suppression",
          target: t.home.impact.statistics.viral_suppression.number,
        },
        {
          id: "years_service",
          target: t.home.impact.statistics.years_service.number,
        },
      ]

      const newValues = { ...animatedValues }

      stats.forEach((stat) => {
        const targetNumber = parseInt(stat.target.replace(/[^\d]/g, "")) || 0
        const hasPlus = stat.target.includes("+")
        const hasPercent = stat.target.includes("%")

        const currentCount = Math.floor(targetNumber * easeProgress)
        let displayValue = currentCount.toString()
        if (hasPlus) displayValue += "+"
        if (hasPercent) displayValue += "%"

        newValues[stat.id] = displayValue
      })

      setAnimatedValues(newValues)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  const statistics: Array<{ id: StatId; icon: string }> = [
    { id: "children_supported", icon: "👥" },
    { id: "households_reached", icon: "🏠" },
    { id: "viral_suppression", icon: "🏥" },
    { id: "years_service", icon: "⏰" },
  ]

  return (
    <section ref={containerRef} className="relative overflow-hidden py-4">
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          {/* Section Header */}
          <div className="relative mb-16 text-center md:text-end">
            {/* Decorative elements */}
            <div className="absolute top-1/2 -right-4 hidden h-24 w-1.5 -translate-y-1/2 rounded-full bg-linear-to-b from-primary to-secondary md:block"></div>
            <div className="absolute right-0 -bottom-6 hidden h-0.5 w-32 bg-linear-to-r from-secondary/20 via-primary/20 to-secondary/20 md:block"></div>

            <div className="relative border-l-4 border-secondary/10 pl-8 md:border-r-4 md:border-l-0 md:pr-8 md:pl-0"></div>
            <div className="mr-auto mb-3 inline-flex items-center justify-center space-x-3 md:mb-6 md:justify-end">
              <span className="mb-2 inline-flex items-center justify-center text-sm  font-medium tracking-wider text-accent uppercase sm:mb-4">
                <span className="h-3 w-3 animate-pulse rounded-full bg-accent"></span>
                {t.home.impact.journey || t.home.impact.badge}
              </span>
            </div>
          </div>
          <div className="text-center md:text-end">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-headings mb-6 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="relative inline-block">
                <span className="absolute -top-2 -left-2 hidden h-3 w-3 animate-ping rounded-full bg-accent opacity-75 md:block"></span>
                <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 animate-ping rounded-full bg-accent opacity-75 md:hidden"></span>
                <span className="relative">
                  <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                    {t.home.impact.title.prefix} &nbsp;
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-secondary/30 to-accent/30 md:right-0 md:left-auto"></span>
                </span>
              </span>
              {t.home.impact.title.highlight}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10 text-lg leading-relaxed text-gray-600"
            >
              {t.home.impact.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {statistics.map((stat, index) => {
              const statData = t.home.impact.statistics[stat.id]
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
                  className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-extrabold text-primary">
                    {animatedValues[stat.id]}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-neutral-900">
                    {statData.label}
                  </div>
                  <div className="mt-2 text-sm text-neutral-600">
                    {statData.description}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
