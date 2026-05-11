"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Heart } from "lucide-react"
import { useRef } from "react"

export const ImpactHealthcareBlock = () => {
  const { t } = useLocale()

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const healthcareTitle = t.impact.domains.healthcare.title as unknown
  const healthcareTitleParts = (() => {
    if (typeof healthcareTitle === "string") {
      return { prefix: "", highlight: healthcareTitle, suffix: "" }
    }
    if (healthcareTitle && typeof healthcareTitle === "object") {
      const maybeTitle = healthcareTitle as {
        prefix?: string
        highlight?: string
        suffix?: string
      }
      return {
        prefix: maybeTitle.prefix ?? "",
        highlight: maybeTitle.highlight ?? "Healthcare",
        suffix: maybeTitle.suffix ?? "",
      }
    }
    return { prefix: "", highlight: "Healthcare", suffix: "" }
  })()

  const healthcareStats = [
    {
      id: "clinical_excellence",
      number: "95%+",
      label: t.impact.domains.healthcare.stats.clinical_excellence.label,
      description:
        t.impact.domains.healthcare.stats.clinical_excellence.description,
      icon: "🏥",
    },
    {
      id: "retention_rate",
      number: "100%",
      label: t.impact.domains.healthcare.stats.retention_rate.label,
      description: t.impact.domains.healthcare.stats.retention_rate.description,
      icon: "💊",
    },
    {
      id: "facilities_served",
      number: "15+",
      label: t.impact.domains.healthcare.stats.facilities_served.label,
      description:
        t.impact.domains.healthcare.stats.facilities_served.description,
      icon: "🏥",
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-container-2xl text-center">
          {/* Section Header */}
          <div className="relative mb-12 text-center md:text-start">
            {/* Decorative elements */}
            <div className="absolute top-1/2 -left-4 hidden h-24 w-1.5 -translate-y-1/2 rounded-full bg-linear-to-b from-primary to-secondary md:block" />
            <div className="absolute -bottom-6 left-0 hidden h-0.5 w-32 bg-linear-to-r from-secondary/20 via-primary/20 to-secondary/20 md:block" />

            <div className="relative border-l-4 border-secondary/10 pl-8" />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm sm:mb-6 md:mx-0 md:mb-8"
            >
              <Heart className="mr-2 h-5 w-5 animate-pulse text-red-500" />
              <span className="text-sm font-semibold tracking-wider text-accent uppercase">
                {t.home.programmes.pediatricHIV.title}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-headings mb-6 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="relative inline-block">
                <span className="absolute -top-2 -left-2 hidden h-3 w-3 animate-ping rounded-full bg-accent opacity-75 md:block" />
                <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 animate-ping rounded-full bg-accent opacity-75 md:hidden" />
                <span className="relative">
                  <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                    {healthcareTitleParts.highlight}
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-secondary/30 to-accent/30 md:right-0 md:left-auto" />
                </span>
              </span>
              {healthcareTitleParts.prefix}
              {healthcareTitleParts.suffix}
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:mr-auto md:ml-0 md:text-start md:text-xl"
          >
            {t.home.programmes.pediatricHIV.description}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {healthcareStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-linear-to-br from-green-50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative z-10 p-8 text-center">
                  <div className="mb-2 text-4xl font-bold text-green-600 md:text-5xl">
                    <span className="block">{stat.number}</span>
                  </div>
                  <p className="text-sm text-gray-600 md:text-base">
                    {stat.label}
                  </p>
                  <p className="mx-auto mt-2 max-w-xs text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
