"use client"

import { useLocale } from "@/hooks/use-locale"
import {
  motion,
  useInView,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

const HomeParticipateBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Parallax effects for background elements - disabled after first animation

  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), 0)
    }
  }, [isInView, hasAnimated])

  const participationWays = [
    {
      id: "donate",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a6 6 0 00-6 6v4H3a1 1 0 000 2h4a3 3 0 006 0h4a1 1 0 000-2h-1V8a6 6 0 00-6-6z" />
        </svg>
      ),
      color: "primary",
    },
    {
      id: "sponsor",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z" />
        </svg>
      ),
      color: "secondary",
    },
    {
      id: "volunteer",
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
            strokeWidth="1.5"
            d="M12 8c-1.657 0-3 1.343-3 3v2H5v2h7v4h2v-4h7v-2h-4v-2c0-1.657-1.343-3-3-3z"
          />
        </svg>
      ),
      color: "accent",
    },
    {
      id: "in_kind",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M4 3a2 2 0 00-2 2v2a2 2 0 002 2h2v2H4a2 2 0 00-2 2v2a2 2 0 002 2h2v2h2v-2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2v-2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2V1h-2v2H8V1H6v2H4z" />
        </svg>
      ),
      color: "primary",
    },
  ]

  return (
    <section
      ref={containerRef}
      id="participate"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto max-container-2xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mb-20"
        >
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-8 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/5 mix-blend-multiply blur-3xl filter"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content Wrapper */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Badge with Animation */}
            <motion.div
              className="group mb-6 inline-flex items-center rounded-full bg-linear-to-r from-accent to-secondary px-6 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-sm font-medium tracking-wider text-white">
                {t.home.participate.badge}
              </span>
              <motion.span
                className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                whileHover={{ rotate: 180, scale: 1.2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
            </motion.div>

            {/* Main Title with Gradient */}
            <motion.h2
              className="font-headings mb-6 text-4xl leading-tight font-bold text-primary-800 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t.home.participate.title.prefix}
              </motion.span>
              <motion.span
                className="inline-block bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                {t.home.participate.title.highlight}
              </motion.span>
            </motion.h2>

            {/* Description with Decoration */}
            <motion.div
              className="relative border-l-4 border-accent/50 pl-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              <p className="max-w-2xl text-lg text-primary-600">
                {t.home.participate.description}
              </p>
            </motion.div>

            {/* Decorative Dots */}
            <motion.div
              className="absolute -right-6 -bottom-6 h-32 w-32 opacity-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <div className="h-full w-full rounded-full bg-linear-to-br from-accent/20 to-secondary/20" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Participation Cards Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {participationWays.map((way, index) => {
            const wayData = t.home.participate.ways[
              way.id as keyof typeof t.home.participate.ways
            ] as {
              title: string
              description: string
              cta: string
              icon_description: string
            }

            const colorClasses = {
              primary: {
                bg: "bg-gradient-to-br from-primary-100 to-primary-50",
                hover: "from-primary-50 to-white",
                text: "text-primary-600",
                title: "text-primary-800",
                cta: "text-accent",
              },
              secondary: {
                bg: "bg-gradient-to-br from-secondary-100 to-secondary-50",
                hover: "from-secondary-50 to-white",
                text: "text-secondary-600",
                title: "text-primary-800",
                cta: "text-secondary-600",
              },
              accent: {
                bg: "bg-gradient-to-br from-accent-100 to-accent-50",
                hover: "from-accent-50 to-white",
                text: "text-accent-600",
                title: "text-primary-800",
                cta: "text-accent",
              },
            }

            const colors = colorClasses[way.color as keyof typeof colorClasses]

            return (
              <motion.a
                key={way.id}
                href="#"
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 1.8 + index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -12,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredCard(way.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Hover Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${colors.hover} opacity-0 transition-opacity duration-500`}
                  animate={{ opacity: hoveredCard === way.id ? 1 : 0 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <motion.div
                    className={`mx-auto mb-6 h-20 w-20 rounded-2xl ${colors.bg} flex transform items-center justify-center transition-transform duration-500`}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={
                      isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                    }
                    transition={{ duration: 0.5, delay: 2 + index * 0.15 }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                  >
                    <motion.div
                      className={`h-10 w-10 ${colors.text}`}
                      animate={{
                        scale: hoveredCard === way.id ? [1, 1.2, 1] : 1,
                        rotate: hoveredCard === way.id ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {way.icon}
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className={`mb-3 text-xl font-semibold ${colors.title} transition-colors`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {wayData.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="mb-4 text-sm text-neutral-600"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.4 + index * 0.15 }}
                  >
                    {wayData.description}
                  </motion.p>

                  {/* CTA */}
                  <motion.span
                    className={`inline-flex items-center ${colors.cta} text-sm font-medium transition-transform`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 2.6 + index * 0.15 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {wayData.cta}
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: hoveredCard === way.id ? 4 : 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </motion.svg>
                  </motion.span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default HomeParticipateBlock
