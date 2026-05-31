"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowRight, Layers3, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export const ProjectsHeroBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const contentY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5],
      [0, shouldReduceMotion ? 0 : -20]
    ),
    { stiffness: 80, damping: 15 }
  )

  const collageImages = [
    {
      src: Assets.projects.beeKeeping,
      alt: "Apiculture",
      className: "w-20 h-28 xs:w-[110px] xs:h-[140px] sm:w-[130px] sm:h-[170px] lg:w-[155px] lg:h-[195px] top-[10%] left-[2%] -rotate-[12deg] z-10",
      floatY: -8,
      floatDuration: 5,
    },
    {
      src: Assets.projects.scholaship,
      alt: "Scholarship Support",
      className: "w-24 h-24 xs:w-[120px] xs:h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] top-[5%] right-[5%] rotate-[8deg] z-20",
      floatY: 10,
      floatDuration: 6,
    },
    {
      src: Assets.projects.farming,
      alt: "Agricultural Resilience",
      className: "w-24 h-24 xs:w-[130px] xs:h-[130px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] bottom-[5%] left-[5%] rotate-[6deg] z-30",
      floatY: -6,
      floatDuration: 4.5,
    },
    {
      src: Assets.projects.digitalSkills,
      alt: "Digital Skills Training",
      className: "w-20 h-[112px] xs:w-[110px] xs:h-[150px] sm:w-[130px] sm:h-[180px] lg:w-[155px] lg:h-[205px] bottom-[5%] right-[2%] -rotate-[10deg] z-20",
      floatY: 8,
      floatDuration: 5.5,
    },
    {
      src: Assets.projects.womenTraining,
      alt: "Women Empowerment",
      className: "w-28 h-28 xs:w-[125px] xs:h-[125px] sm:w-[145px] sm:h-[145px] lg:w-[165px] lg:h-[165px] top-[32%] left-[28%] rotate-[15deg] z-40",
      floatY: -12,
      floatDuration: 7,
    },
  ]

  return (
    <section className="relative scroll-mt-24 px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-8">
      <div
        ref={containerRef}
        className="relative mx-auto max-container-2xl px-0 py-8 md:py-16"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Column 1: Image Collage (Smaller, spans 5 cols) */}
          <div className="relative lg:col-span-5 h-64 sm:h-100 lg:h-120 w-full flex items-center justify-center">
            <div className="relative w-full max-w-70 sm:max-w-90 lg:max-w-full h-full">
              {collageImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, img.floatY, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: img.floatDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          rotate: 0,
                          zIndex: 50,
                          transition: { duration: 0.3 },
                        }
                  }
                  className={`absolute rounded-2xl border-4 border-white bg-white shadow-xl md:shadow-2xl overflow-hidden cursor-pointer ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 150px, 200px"
                    priority={idx < 2}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Details (Larger, spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ y: contentY }}
            className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:col-span-7"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-100/50 px-4 py-2 text-xs font-semibold tracking-wider text-primary-800 uppercase shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              {t.projects.hero.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight text-neutral-700"
            >
              <span className="block text-neutral-700">{t.projects.hero.title.prefix}</span>
              <span className="bg-linear-to-r from-primary-600 via-secondary to-accent bg-clip-text text-transparent">
                {t.projects.hero.title.highlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="max-w-2xl text-lg leading-relaxed text-primary-900/80 md:text-xl"
            >
              {t.projects.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
              className="mt-4 flex w-full flex-col gap-4 sm:flex-row justify-center lg:justify-start"
            >
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:w-auto sm:px-8 sm:text-base"
              >
                <Layers3 className="h-4 w-4 sm:h-5 sm:w-5" />
                {t.projects.hero.cta.primary}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </motion.a>
              <motion.a
                href="#pipeline"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-primary-300/50 bg-primary-100/40 px-6 py-3.5 text-sm font-semibold text-primary-900 hover:bg-primary-100/60 backdrop-blur-md transition-all duration-300 sm:w-auto sm:px-8 sm:text-base"
              >
                {t.projects.hero.cta.secondary}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
