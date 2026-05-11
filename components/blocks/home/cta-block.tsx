"use client"

import { useContactSheet } from "@/hooks/use-contact-sheet"
import { useLocale } from "@/hooks/use-locale"
import { usePartnerModal } from "@/hooks/use-partner-modal"
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

const HomeCTABlock = () => {
  const { t } = useLocale()
  const { openSheet } = useContactSheet()
  const { openModal } = usePartnerModal()
  const containerRef = useRef<HTMLDivElement>(null)
  const [animatedStats, setAnimatedStats] = useState<Record<string, string>>({})
  const [hasAnimated, setHasAnimated] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effects for background - disabled after first animation
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, hasAnimated ? 0 : -30]),
    {
      stiffness: 100,
      damping: 20,
    }
  )

  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), 0)
    }
  }, [isInView, hasAnimated])

  // Animated counter effect for stats
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
          { id: "children_helped", target: "6708+" },
          { id: "volunteers", target: "117+" },
          { id: "communities", target: "4+" },
          { id: "years_serving", target: "35+" },
        ]

        stats.forEach((stat) => {
          const targetNumber = parseInt(stat.target.replace(/[^\d]/g, "")) || 0
          const hasPlus = stat.target.includes("+")
          const currentCount = Math.floor(targetNumber * easeProgress)

          let displayValue = currentCount.toString()
          if (hasPlus) displayValue += "+"

          newValues[stat.id] = displayValue
        })

        setAnimatedStats((prev) => {
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

  const stats = [
    {
      id: "children_helped",
      number: animatedStats["children_helped"] || "0",
      label: t.home.cta.stats.children_helped.label,
    },
    {
      id: "volunteers",
      number: animatedStats["volunteers"] || "0",
      label: t.home.cta.stats.volunteers.label,
    },
    {
      id: "communities",
      number: animatedStats["communities"] || "0",
      label: t.home.cta.stats.communities.label,
    },
    {
      id: "years_serving",
      number: animatedStats["years_serving"] || "0",
      label: t.home.cta.stats.years_serving.label,
    },
  ]

  return (
    <section
      ref={containerRef}
      id="cta"
      className="relative px-4 py-16 sm:py-20 lg:py-24"
    >
      <motion.div
        className="relative container mx-auto overflow-hidden rounded-2xl bg-linear-to-br from-primary-600 to-secondary-600 py-20 text-white"
        style={{ y: backgroundY }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background overlay */}
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 mix-blend-multiply blur-3xl filter"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/10 mix-blend-multiply blur-3xl filter"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm font-semibold tracking-wider">
                {t.home.cta.badge}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              className="mb-6 text-4xl font-bold md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {t.home.cta.title.prefix}{" "}
              <motion.span
                className="relative inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                {t.home.cta.title.highlight}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-accent-400"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              {t.home.cta.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              {/* Primary CTA Button -> Contact sheet */}
              <motion.button
                type="button"
                onClick={openSheet}
                className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-primary-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  {t.home.cta.primary_button.text}
                  <motion.svg
                    className="ml-2 h-5 w-5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </span>
              </motion.button>

              {/* Secondary CTA Button -> Partner modal */}
              <motion.button
                type="button"
                onClick={openModal}
                className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-white px-8 py-4 font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  {t.footer.sections.insights.links.become_a_partner}
                  <motion.svg
                    className="ml-2 h-5 w-5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              className="mt-16 border-t border-white/10 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            >
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 2 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div
                      className="mb-2 text-3xl font-bold text-white"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 2.2 + index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-sm tracking-wider text-white/80 uppercase">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HomeCTABlock
