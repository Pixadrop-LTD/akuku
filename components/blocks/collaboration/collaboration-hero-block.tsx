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
import { ArrowRight, Handshake, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export const CollaborationHeroBlock = () => {
  const { t } = useLocale()
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
      id="collaboration"
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
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-100/50 px-4 py-2 text-xs font-semibold tracking-wider text-primary-800 uppercase shadow-sm backdrop-blur-sm"
            >
              <Handshake className="h-4 w-4 text-accent animate-pulse" />
              {t.collaboration.hero.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-4xl leading-tight font-bold tracking-tight text-neutral-800 sm:text-5xl lg:text-6xl"
            >
              <span className="block">{t.collaboration.hero.title.prefix}</span>
              <span className="inline-block bg-linear-to-r from-primary-600 via-secondary to-accent bg-clip-text text-transparent">
                {t.collaboration.hero.title.highlight}
              </span>
              {t.collaboration.hero.title.suffix && (
                <span className="block">{t.collaboration.hero.title.suffix}</span>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="max-w-2xl text-lg leading-relaxed text-primary-900/80 md:text-xl"
            >
              {t.collaboration.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
              className="mt-4 flex w-full flex-col gap-4 sm:flex-row justify-center lg:justify-start"
            >
              <motion.a
                href="#partner-models"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:w-auto sm:px-8 sm:text-base"
              >
                <Handshake className="h-4 w-4 sm:h-5 sm:w-5" />
                {t.collaboration.hero.cta.primary}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </motion.a>

              <motion.a
                href="#evidence"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-primary-300/50 bg-primary-100/40 px-6 py-3.5 text-sm font-semibold text-primary-900 hover:bg-primary-100/60 backdrop-blur-md transition-all duration-300 sm:w-auto sm:px-8 sm:text-base"
              >
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                {t.collaboration.hero.cta.secondary}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </motion.a>
            </motion.div>

            {/* Meta Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.15, ease: "easeOut" }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 border-t border-primary-100 pt-6 w-full"
            >
              {t.collaboration.hero.meta.map((item: { label: string }, idx: number) => (
                <span
                  key={idx}
                  className="rounded-full border border-primary-200/50 bg-primary-100/30 px-4 py-2 text-xs font-semibold tracking-wide text-primary-800 backdrop-blur-xs hover:bg-primary-100/50 transition-colors"
                >
                  {item.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Column 2: Multi-Image Floating Collage (spans 5 cols) */}
          <motion.div
            style={{ y: imageY }}
            className="relative flex justify-center items-center w-full lg:col-span-5 h-96 sm:h-[450px] md:h-[500px] lg:h-[450px] xl:h-[520px]"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] h-full flex items-center justify-center">
              
              {/* Image 1: Main Large Image (Centered) */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
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
                        scale: 1.05,
                        zIndex: 40,
                        transition: { duration: 0.3 },
                      }
                }
                className="relative z-10 w-44 sm:w-56 md:w-64 lg:w-56 xl:w-64 aspect-[4/5] overflow-hidden rounded-3xl border border-primary-200/40 bg-white/70 p-2 shadow-2xl backdrop-blur-md cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <Image
                    src={Assets.collaborations.hero}
                    alt={t.collaboration.hero.image_alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 170px, 300px"
                  />
                </div>
              </motion.div>

              {/* Image 2: Government Image (Top-Right) */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 8, 0], x: [0, 4, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        zIndex: 40,
                        transition: { duration: 0.3 },
                      }
                }
                className="absolute z-20 top-4 -right-4 sm:-right-8 lg:-right-6 xl:-right-10 w-24 sm:w-32 md:w-36 lg:w-32 xl:w-36 aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/40 bg-white/70 p-1.5 shadow-xl backdrop-blur-md cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={Assets.collaborations.government}
                    alt="Government Partnership"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 95px, 150px"
                  />
                </div>
              </motion.div>

              {/* Image 3: Business Partners Image (Bottom-Left) */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], x: [0, -4, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6,
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        zIndex: 40,
                        transition: { duration: 0.3 },
                      }
                }
                className="absolute z-20 bottom-4 -left-4 sm:-left-8 lg:-left-6 xl:-left-10 w-24 sm:w-32 md:w-36 lg:w-32 xl:w-36 aspect-square overflow-hidden rounded-2xl border border-primary-200/40 bg-white/70 p-1.5 shadow-xl backdrop-blur-md cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={Assets.collaborations.businessPartners}
                    alt="Business Partnerships"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 95px, 150px"
                  />
                </div>
              </motion.div>

              {/* Image 4: Colabos Image (Middle-Left / Top-Left) */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 6, 0], x: [0, -3, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.9,
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        zIndex: 40,
                        transition: { duration: 0.3 },
                      }
                }
                className="absolute z-20 top-1/4 -left-8 sm:-left-12 lg:-left-10 xl:-left-14 w-20 sm:w-28 md:w-32 lg:w-28 xl:w-32 aspect-[3/2] overflow-hidden rounded-2xl border border-primary-200/40 bg-white/70 p-1.5 shadow-xl backdrop-blur-md cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={Assets.collaborations.colabos}
                    alt="Active Collaborations"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 80px, 130px"
                  />
                </div>
              </motion.div>

              {/* Glass Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute z-30 bottom-6 -right-6 sm:bottom-12 sm:-right-10 flex items-center gap-3 rounded-2xl border border-primary-200/40 bg-white/95 p-3 sm:p-4 shadow-xl backdrop-blur-md scale-[0.8] sm:scale-100 origin-bottom-right"
              >
                <div className="rounded-full bg-accent/20 p-1.5 sm:p-2 text-accent">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-primary-900/50 uppercase tracking-wider font-semibold">Compliance</div>
                  <div className="text-[11px] sm:text-xs font-bold text-primary-950">100% Audit-Ready</div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
