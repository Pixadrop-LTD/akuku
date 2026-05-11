"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowRight, Layers3, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export const ProjectsHeroBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5],
      [0, shouldReduceMotion ? 0 : hasAnimated ? 0 : 50]
    ),
    { stiffness: 80, damping: 15 }
  )

  const contentY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5],
      [0, shouldReduceMotion ? 0 : hasAnimated ? 0 : -20]
    ),
    { stiffness: 80, damping: 15 }
  )

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, hasAnimated ? 1 : 0.9]
  )

  useEffect(() => {
    if (isInView && !hasAnimated) setTimeout(() => setHasAnimated(true), 0)
  }, [isInView, hasAnimated])

  return (
    <section className="relative scroll-mt-24 px-4 pt-28 pb-16 text-center sm:pt-32 sm:pb-20">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mx-auto max-container-2xl overflow-hidden rounded-3xl p-8 shadow-2xl md:p-20"
      >
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{ y: imageY }}
        >
          <Image
            src={Assets.projects.health}
            alt={t.projects.hero.image_alt}
            fill
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-neutral/90 via-neutral/70 to-neutral/40 backdrop-brightness-75"
          style={{ opacity: overlayOpacity }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
        >
          <motion.div
            className="absolute top-12 left-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.15, 1], rotate: [0, 180, 360] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute right-12 bottom-14 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.25, 1], rotate: [0, -180, -360] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm tracking-widest text-accent uppercase shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            {t.projects.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            <span className="block">{t.projects.hero.title.prefix}</span>
            <span className="bg-linear-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              {t.projects.hero.title.highlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            className="max-w-4xl text-lg leading-relaxed text-white/90 md:text-2xl"
          >
            {t.projects.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:w-auto sm:px-10 sm:py-4 sm:text-base"
            >
              <Layers3 className="h-4 w-4 sm:h-5 sm:w-5" />
              {t.projects.hero.cta.primary}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </motion.a>
            <motion.a
              href="#pipeline"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 sm:w-auto sm:px-10 sm:py-4 sm:text-base"
            >
              {t.projects.hero.cta.secondary}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
