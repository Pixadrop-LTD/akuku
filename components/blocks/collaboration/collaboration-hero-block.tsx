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
import { ArrowDown, ArrowRight, Handshake, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export const CollaborationHeroBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 0.7], [0, hasAnimated ? 0 : 60]),
    {
      stiffness: 80,
      damping: 15,
    }
  )

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 0.7], [0, hasAnimated ? 0 : -24]),
    {
      stiffness: 80,
      damping: 15,
    }
  )

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35],
    [1, hasAnimated ? 1 : 0.92]
  )

  useEffect(() => {
    if (isInView && !hasAnimated) setTimeout(() => setHasAnimated(true), 0)
  }, [isInView, hasAnimated])

  return (
    <section
      id="collaboration"
      className="relative flex items-center justify-center px-4 pt-28 text-center lg:pt-32"
    >
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
            src={Assets.collaborations.hero}
            alt={t.collaboration.hero.image_alt}
            fill
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-neutral/90 via-neutral/65 to-neutral/35 backdrop-brightness-75"
          style={{ opacity: overlayOpacity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex max-container flex-col items-center gap-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85, rotateX: -70 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-widest text-accent uppercase shadow-sm backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.collaboration.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26, skewY: 2 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="font-headings text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            {t.collaboration.hero.title.prefix}
            <span className="inline-block bg-linear-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              {" "}
              {t.collaboration.hero.title.highlight}
            </span>
            <span className="block">{t.collaboration.hero.title.suffix}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.95, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-2xl"
          >
            {t.collaboration.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.25, ease: "easeOut" }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <motion.a
              href="#partner-models"
              whileHover={{ scale: 1.08, y: -4, rotateZ: 1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex w-full items-center justify-center gap-4 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-50 shadow-2xl transition-all duration-300 hover:shadow-accent/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 sm:w-auto sm:px-12 sm:py-5 sm:text-base"
            >
              <motion.div
                className="relative h-5 w-5 shrink-0 sm:h-6 sm:w-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                whileHover={{ rotate: 18, scale: 1.2 }}
              >
                <Handshake className="h-full w-full" />
              </motion.div>
              {t.collaboration.hero.cta.primary}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              <motion.span
                className="absolute -inset-px rounded-full bg-linear-to-br from-accent to-secondary opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.a>

            <motion.a
              href="#evidence"
              whileHover={{ scale: 1.06, y: -4, rotateZ: -1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex w-full items-center justify-center gap-4 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto sm:px-12 sm:py-5 sm:text-base"
            >
              <motion.div
                className="relative h-5 w-5 sm:h-6 sm:w-6"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                }}
                whileHover={{ scale: 1.25, rotate: -10 }}
              >
                <ShieldCheck className="h-full w-full" />
              </motion.div>
              {t.collaboration.hero.cta.secondary}
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1 sm:h-4 sm:w-4" />
              <motion.span
                className="absolute -inset-px rounded-full bg-accent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease: "easeOut" }}
            className="mt-4 flex flex-wrap items-center justify-center gap-3"
          >
            {t.collaboration.hero.meta.map((item: { label: string }) => (
              <span
                key={item.label}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm"
              >
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
