"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { usePartnerModal } from "@/hooks/use-partner-modal"
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, ArrowRight, Handshake, Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const HomeHeroBlock = () => {
  const { t } = useLocale()
  const { openModal } = usePartnerModal()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects - always defined but values change based on animation state
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
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, hasAnimated ? 1 : 0.9]
  )

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), 0)
    }
  }, [isInView, hasAnimated])

  return (
    <section
      id="home"
      className="relative flex items-center justify-center px-4 pt-28 text-center lg:pt-32"
    >
      {/* Hero Content Container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative mx-auto max-container-2xl overflow-hidden rounded-3xl p-8 shadow-2xl md:p-20"
      >
        {/* Background Video/Image */}
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{ y: imageY }}
        >
          <Image
            src={Assets.home.hero}
            alt={t.home.hero.image_alt}
            fill
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        {/* Gradient Overlay for readability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-neutral/90 via-neutral/70 to-neutral/50 backdrop-brightness-75"
          style={{ opacity }}
        />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex max-container flex-col items-center gap-8 text-center"
        >
          {/* Tagline Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-widest text-accent uppercase shadow-sm backdrop-blur-sm"
          >
            {t.home.hero.tagline}
          </motion.span>

          {/* Advanced Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30, skewY: 2 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            whileInView={{ y: [0, -5, 0] }}
            whileHover={{ scale: 1.02 }}
            className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-block"
            >
              {t.home.hero.title.prefix}{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              className="inline-block bg-linear-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
            >
              {t.home.hero.title.highlight}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-block"
            >
              {" "}
              {t.home.hero.title.suffix}
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            whileInView={{ opacity: [1, 0.9, 1] }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-2xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.6 }}
              className="font-semibold text-accent"
              whileHover={{ scale: 1.05 }}
            >
              {t.home.hero.description.organization_name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            >
              {" "}
              {t.home.hero.description.text}{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2.0, ease: "easeOut" }}
              className="font-semibold text-secondary"
              whileHover={{ scale: 1.1, color: "#fff" }}
            >
              {t.home.hero.description.stat1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.2 }}
            >
              {" "}
              and{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2.4, ease: "easeOut" }}
              className="font-semibold text-secondary"
              whileHover={{ scale: 1.1, color: "#fff" }}
            >
              {t.home.hero.description.stat2}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.6 }}
            >
              {" "}
              {t.home.hero.description.location}
            </motion.span>
          </motion.p>

          {/* Calls to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8, ease: "easeOut" }}
            className="mt-12 flex w-full flex-col items-center justify-center gap-6 sm:flex-row"
          >
            {/* Primary CTA - Partner with Us */}
            <motion.button
              type="button"
              onClick={openModal}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.0, ease: "easeOut" }}
              whileHover={{ scale: 1.08, y: -4, rotateZ: 1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-4 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-50 shadow-2xl transition-all duration-300 hover:shadow-accent/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 sm:w-auto sm:px-12 sm:py-5 sm:text-base"
            >
              <span className="flex items-center gap-3">
                {/* Handshake Icon */}
                <motion.div
                  className="relative h-5 w-5 shrink-0 text-accent sm:h-6 sm:w-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  <Handshake className="h-full w-full text-secondary-50" />
                </motion.div>
                <motion.span
                  className="whitespace-nowrap"
                  whileHover={{ x: 2 }}
                >
                  {t.home.hero.cta.partner}
                </motion.span>
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </span>
              {/* Glow ring */}
              <motion.span
                className="absolute -inset-px rounded-full bg-linear-to-br from-accent to-secondary opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>

            {/* Secondary CTA - Explore Impact */}
            <motion.a
              href="#impact"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.2, ease: "easeOut" }}
              whileHover={{ scale: 1.08, y: -4, rotateZ: -1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex w-full items-center justify-center gap-4 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto sm:px-12 sm:py-5 sm:text-base"
            >
              <span className="flex items-center gap-3">
                {/* Heart Icon */}
                <motion.div
                  className="relative h-5 w-5 text-accent sm:h-6 sm:w-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  whileHover={{ scale: 1.3, rotate: -15 }}
                >
                  <Heart className="h-full w-full" />
                </motion.div>
                <motion.span
                  className="whitespace-nowrap"
                  whileHover={{ x: 2 }}
                >
                  {t.home.hero.cta.explore}
                </motion.span>
                <ArrowDown className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1 sm:h-4 sm:w-4" />
              </span>
              {/* Subtle glow */}
              <motion.span
                className="absolute -inset-px rounded-full bg-accent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HomeHeroBlock
