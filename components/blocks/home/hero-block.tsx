"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { usePartnerModal } from "@/hooks/use-partner-modal"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, ArrowRight, Handshake, Heart, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const HomeHeroBlock = () => {
  const { t } = useLocale()
  const { openModal } = usePartnerModal()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, shouldReduceMotion ? 0 : 50]),
    {
      stiffness: 80,
      damping: 15,
    }
  )

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, shouldReduceMotion ? 0 : -20]),
    {
      stiffness: 80,
      damping: 15,
    }
  )

  useEffect(() => {
    if (isInView && !hasAnimated) setTimeout(() => setHasAnimated(true), 0)
  }, [isInView, hasAnimated])

  return (
    <section
      id="home"
      className="relative px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 overflow-hidden"
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mx-auto max-container-2xl px-0 py-8 md:py-16"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Column 1: Details (spans 7 cols) */}
          <motion.div
            style={{ y: contentY }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:col-span-7"
          >
            {/* Tagline Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-100/50 px-4 py-2 text-xs font-semibold tracking-wider text-primary-800 uppercase shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              {t.home.hero.tagline}
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-4xl leading-tight font-bold tracking-tight text-neutral-700 sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="block">{t.home.hero.title.prefix}</span>
              <span className="inline-block bg-linear-to-r from-primary-600 via-secondary to-accent bg-clip-text text-transparent">
                {t.home.hero.title.highlight}
              </span>
              {t.home.hero.title.suffix && (
                <span className="block mt-1">{t.home.hero.title.suffix}</span>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="max-w-2xl text-lg leading-relaxed text-primary-900/80 md:text-xl"
            >
              <span className="font-semibold text-primary-950">
                {t.home.hero.description.organization_name}
              </span>{" "}
              <span>{t.home.hero.description.text}</span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
              className="mt-4 flex w-full flex-col gap-4 sm:flex-row justify-center lg:justify-start"
            >
              {/* Partner CTA */}
              <motion.button
                type="button"
                onClick={openModal}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:w-auto sm:px-8 sm:text-base"
              >
                <Handshake className="h-4 w-4 sm:h-5 sm:w-5" />
                {t.home.hero.cta.partner}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </motion.button>

              {/* Explore CTA */}
              <motion.a
                href="#impact"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-primary-300/50 bg-primary-100/40 px-6 py-3.5 text-sm font-semibold text-primary-900 hover:bg-primary-100/60 backdrop-blur-md transition-all duration-300 sm:w-auto sm:px-8 sm:text-base"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-accent animate-pulse" />
                {t.home.hero.cta.explore}
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1 sm:h-4 sm:w-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Column 2: Single Premium Floating Image (spans 5 cols) */}
          <motion.div
            style={{ y: imageY }}
            className="relative flex justify-center items-center w-full lg:col-span-5 h-[320px] sm:h-[400px] md:h-[450px] lg:h-[400px] xl:h-[460px]"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-full h-full flex items-center justify-center">
              
              {/* Premium Framed Image */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.03,
                        transition: { duration: 0.3 },
                      }
                }
                className="relative z-10 w-full aspect-[4/3] overflow-hidden rounded-3xl border border-primary-200/40 bg-white/70 p-2 shadow-2xl backdrop-blur-md cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <Image
                    src={Assets.home.hero}
                    alt={t.home.hero.image_alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 300px, 450px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              </motion.div>

              {/* Overlapping Glass Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute z-30 bottom-6 -right-6 sm:bottom-12 sm:-right-10 flex items-center gap-3 rounded-2xl border border-primary-200/40 bg-white/95 p-3 sm:p-4 shadow-xl backdrop-blur-md scale-[0.8] sm:scale-100 origin-bottom-right"
              >
                <div className="rounded-full bg-accent/20 p-1.5 sm:p-2 text-accent">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-accent/25" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-primary-900/50 uppercase tracking-wider font-semibold">Since 1989</div>
                  <div className="text-[11px] sm:text-xs font-bold text-primary-950">35+ Years Active</div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HomeHeroBlock
