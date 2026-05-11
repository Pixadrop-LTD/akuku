"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowRight, Building2, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export const WhoHeroBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, hasAnimated ? 0 : 50]),
    {
      stiffness: 80,
      damping: 15,
    }
  )

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, hasAnimated ? 0 : -20]),
    {
      stiffness: 80,
      damping: 15,
    }
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
    <section className="relative px-4 text-center pt-32">
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
            src={Assets.who.hero}
            alt={t.who.hero.image_alt}
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
            animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-12 bottom-14 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
            animate={{ scale: [1, 1.25, 1], rotate: [0, -180, -360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={{ scale: 1.04, y: -2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm tracking-widest text-accent uppercase shadow-sm backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4" />
            {t.who.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            <span className="block">{t.who.hero.title.prefix}</span>
            <span className="bg-linear-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              {t.who.hero.title.highlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            className="max-w-3xl text-lg leading-relaxed text-white/90 md:text-2xl"
          >
            {t.who.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href="#legal"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-10 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:w-auto"
            >
              <Building2 className="h-5 w-5" />
              {t.who.hero.cta.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#governance"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-10 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 sm:w-auto"
            >
              {t.who.hero.cta.secondary}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
