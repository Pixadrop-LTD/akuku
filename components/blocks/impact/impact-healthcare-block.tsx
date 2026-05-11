"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Heart } from "lucide-react"
import { useRef } from "react"

export const ImpactHealthcareBlock = () => {
  const { t } = useLocale()

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

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
        className="max-container-2xl mx-auto px-6 lg:px-8"
      >
        <div className="mx-auto max-container-2xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm"
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
            className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
          >
            {t.impact.domains.healthcare.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
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
