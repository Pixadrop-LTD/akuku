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
import { ArrowRight, Building2, ShieldCheck, Scale } from "lucide-react"
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

  useEffect(() => {
    if (isInView && !hasAnimated) setTimeout(() => setHasAnimated(true), 0)
  }, [isInView, hasAnimated])

  return (
    <section className="relative px-4 pt-32">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mx-auto max-container-2xl px-4 md:px-8 py-8 md:py-16"
      >

        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Column 1: Text Content (spans 7 cols) */}
          <motion.div
            style={{ y: contentY }}
            className="flex flex-col items-start text-left gap-6 lg:col-span-7"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-100/50 px-4 py-2 text-sm tracking-widest text-primary-800 uppercase shadow-sm backdrop-blur-sm"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
              {t.who.hero.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-4xl leading-tight font-bold tracking-tight text-neutral-700 sm:text-5xl lg:text-6xl"
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
              className="max-w-2xl text-lg leading-relaxed text-primary-900/80 md:text-xl"
            >
              {t.who.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
              className="mt-4 flex w-full flex-col items-center justify-start gap-4 sm:flex-row"
            >
              <motion.a
                href="#legal"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                {t.who.hero.cta.primary}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </motion.a>
              <motion.a
                href="#governance"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-300/50 bg-primary-100/40 px-6 py-3 text-sm font-semibold text-primary-900 hover:bg-primary-100/60 backdrop-blur-md transition-all duration-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <Scale className="h-4 w-4 sm:h-5 sm:w-5" />
                {t.who.hero.cta.secondary}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Column 2: Multi-Image Floating Collage (spans 5 cols) */}
          <motion.div
            style={{ y: imageY }}
            className="relative flex justify-center items-center w-full lg:col-span-5 h-85 sm:h-112.5 md:h-125 lg:h-112.5 xl:h-130"
          >
            <div className="relative w-full max-w-70 sm:max-w-90 md:max-w-100 h-full flex items-center justify-center">
              
              {/* Image 1: The Primary Large Image (Centered) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-42.5 sm:w-57.5 md:w-65 lg:w-57.5 xl:w-65 aspect-4/5 overflow-hidden rounded-3xl border border-primary-200/40 bg-white/70 p-2 shadow-2xl backdrop-blur-md"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <Image
                    src={Assets.who.hero}
                    alt={t.who.hero.image_alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 170px, 300px"
                  />
                </div>
              </motion.div>

              {/* Image 2: Secondary Small Image (Overlapping Top-Right) */}
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute z-20 top-4 -right-4 sm:-right-8 lg:-right-6 xl:-right-10 w-21.25 sm:w-27.5 md:w-35 lg:w-27.5 xl:w-35 aspect-4/3 overflow-hidden rounded-2xl border border-primary-200/40 bg-white/70 p-1.5 shadow-xl backdrop-blur-md"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={Assets.home.programmes.schooled}
                    alt="Schooled Domain Support"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 85px, 150px"
                  />
                </div>
              </motion.div>

              {/* Image 3: Tertiary Small Image (Overlapping Bottom-Left) */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.0,
                }}
                className="absolute z-20 bottom-4 -left-4 sm:-left-8 lg:-left-6 xl:-left-10 w-23.75 sm:w-30 md:w-37.5 lg:w-30 xl:w-37.5 aspect-square overflow-hidden rounded-2xl border border-primary-200/40 bg-white/70 p-1.5 shadow-xl backdrop-blur-md"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={Assets.impact.community}
                    alt="Community Transformation Impact"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 95px, 150px"
                  />
                </div>
              </motion.div>

              {/* Overlapping glass badge (Floating at center-right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute z-30 bottom-6 -right-6 sm:bottom-12 sm:-right-10 flex items-center gap-3 rounded-2xl border border-primary-200/40 bg-white/95 p-3 sm:p-4 shadow-xl backdrop-blur-md scale-[0.8] sm:scale-100 origin-bottom-right"
              >
                <div className="rounded-full bg-accent/20 p-1.5 sm:p-2 text-accent">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-primary-900/50 uppercase tracking-wider font-semibold">Heritage</div>
                  <div className="text-[11px] sm:text-xs font-bold text-primary-950">35 Years Active</div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
