"use client"

import { useLocale } from "@/hooks/use-locale"
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

const HomeImpactBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [animatedValues, setAnimatedValues] = useState<Record<string, string>>(
    {}
  )
  const [hasAnimated, setHasAnimated] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effects for background elements - disabled after first animation
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, hasAnimated ? 0 : -100]),
    {
      stiffness: 100,
      damping: 20,
    }
  )

  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), 0)
    }
  }, [isInView, hasAnimated])

  // Animated counter effect
  useEffect(() => {
    if (!isInView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const duration = 2000

      if (elapsed < duration) {
        const progress = elapsed / duration
        const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

        const newValues: Record<string, string> = {}
        const stats = [
          { id: "children_supported", target: "6708+" },
          { id: "households_reached", target: "2765+" },
          { id: "viral_suppression", target: "95%" },
          { id: "years_service", target: "35+" },
        ]

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

        setAnimatedValues((prev) => {
          const changed = Object.keys(newValues).some(
            (key) => prev[key] !== newValues[key]
          )
          return changed ? { ...prev, ...newValues } : prev
        })

        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isInView])

  const statistics = [
    {
      id: "children_supported",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      color: "primary",
    },
    {
      id: "households_reached",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "accent",
    },
    {
      id: "viral_suppression",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      color: "secondary",
    },
    {
      id: "years_service",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "primary",
    },
  ]

  return (
    <section
      ref={containerRef}
      id="impact"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto max-container-2xl px-6 pb-20 lg:px-18">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-20 ml-auto max-w-4xl pt-10 pr-0"
        >
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent/10 mix-blend-multiply blur-2xl filter"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-secondary/10 mix-blend-multiply blur-2xl filter"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Badge */}
          <motion.div
            className="mb-4 flex justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </motion.svg>
              {t.home.impact.badge}
            </motion.span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            className="font-headings mb-6 text-right text-4xl leading-tight font-bold text-primary-800 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30, skewY: 2 }}
            animate={isInView ? { opacity: 1, y: 0, skewY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block"
            >
              {t.home.impact.title.prefix}{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="inline-block bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              {t.home.impact.title.highlight}
            </motion.span>
          </motion.h2>

          {/* Description with Decorative Line */}
          <motion.div
            className="relative pl-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 w-10 bg-linear-to-r from-accent to-secondary"
              animate={{ width: [0, 40, 40] }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            />
            <p className="text-right text-lg text-primary-600">
              {t.home.impact.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {statistics.map((stat, index) => {
            const statData = t.home.impact.statistics[
              stat.id as keyof typeof t.home.impact.statistics
            ] as {
              number: string
              label: string
              description: string
              icon_description: string
            }
            const animatedValue = animatedValues[stat.id] || "0"
            const colorClasses = {
              primary: {
                bg: "bg-primary-50",
                hover: "hover:bg-primary-100",
                text: "text-primary-600",
                number: "text-primary-700",
              },
              accent: {
                bg: "bg-accent-50",
                hover: "hover:bg-accent-100",
                text: "text-accent-600",
                number: "text-accent-700",
              },
              secondary: {
                bg: "bg-secondary-50",
                hover: "hover:bg-secondary-100",
                text: "text-secondary-600",
                number: "text-secondary-700",
              },
            }

            const colors = colorClasses[stat.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={stat.id}
                className="group relative rounded-2xl bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 1.6 + index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredStat(stat.id)}
                onHoverEnd={() => setHoveredStat(null)}
              >
                {/* Icon Container */}
                <motion.div
                  className={`mx-auto mb-6 h-20 w-20 rounded-full ${colors.bg} flex items-center justify-center ${colors.hover} transition-colors duration-300`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.15 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    className={`h-10 w-10 ${colors.text}`}
                    animate={{
                      scale: hoveredStat === stat.id ? [1, 1.2, 1] : 1,
                      rotate: hoveredStat === stat.id ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                </motion.div>

                {/* Animated Number */}
                <motion.span
                  className={`block text-4xl font-extrabold ${colors.number} mb-2`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 2 + index * 0.15 }}
                >
                  {animatedValue}
                </motion.span>

                {/* Label */}
                <motion.h3
                  className="text-lg font-semibold text-neutral-800"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                >
                  {statData.label}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="mt-2 text-sm text-neutral-600"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 2.4 + index * 0.15 }}
                >
                  {statData.description}
                </motion.p>

                {/* Hover Effect Ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-linear-to-r from-accent/5 to-secondary/5 opacity-0 transition-opacity duration-300"
                  animate={{ opacity: hoveredStat === stat.id ? 1 : 0 }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-8 left-8 h-20 w-20 rounded-tl-2xl border-t-4 border-l-4 border-primary-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 3 }}
        />
        <motion.div
          className="absolute right-8 bottom-8 h-20 w-20 rounded-br-2xl border-r-4 border-b-4 border-secondary-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 3.2 }}
        />
      </div>
    </section>
  )
}

export default HomeImpactBlock
