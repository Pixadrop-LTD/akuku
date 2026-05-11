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
import { Car, Home, School, Stethoscope } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const HomeProgramBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effects for cards - disabled after first animation
  const sectionY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, hasAnimated ? 0 : -50]),
    {
      stiffness: 100,
      damping: 20,
    }
  )

  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), 0)
    }
  }, [isInView, hasAnimated])

  const programmes = [
    {
      id: "pediatricHIV",
      icon: <Stethoscope className="h-full w-full text-accent" />,
      featured: true,
    },
    {
      id: "schooled",
      icon: <School className="h-full w-full text-accent" />,
      featured: false,
    },
    {
      id: "householdResilience",
      icon: <Home className="h-full w-full text-accent" />,
      featured: false,
    },
    {
      id: "mobility",
      icon: <Car className="h-full w-full text-accent" />,
      featured: false,
    },
  ]

  return (
    <section
      ref={containerRef}
      id="programmes"
      className="relative overflow-hidden py-16"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: sectionY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary),transparent_50%)]" />
      </motion.div>

      <div className="relative mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="gap-8 lg:flex lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold tracking-wide text-primary-700 uppercase"
            >
              <motion.svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.247 3.83a1 1 0 00.95.69h4.018c.969 0 1.371 1.24.588 1.81l-3.252 2.36a1 1 0 00-.364 1.118l1.247 3.83c.3.921-.755 1.688-1.538 1.118l-3.252-2.36a1 1 0 00-1.176 0l-3.252 2.36c-.783.57-1.838-.197-1.538-1.118l1.247-3.83a1 1 0 00-.364-1.118L2.196 9.257c-.783-.57-.38-1.81.588-1.81h4.018a1 1 0 00.95-.69l1.297-3.83z" />
              </motion.svg>
              {t.home.programmes.section_title}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-4xl leading-tight font-extrabold text-transparent md:text-5xl"
            >
              {t.home.programmes.tagline}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 lg:mt-0 lg:shrink-0"
          >
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex transform items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-primary to-secondary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <motion.span
                className="absolute h-0 w-0 rounded-full bg-white transition-all duration-300 ease-out"
                animate={
                  hoveredCard === "view-all"
                    ? { width: 128, height: 128, opacity: 0.1 }
                    : {}
                }
              />
              <span className="relative">{t.home.programmes.view_all}</span>
              <motion.svg
                className="relative ml-2 h-6 w-6 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: hoveredCard === "view-all" ? 4 : 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Programmes Grid */}
        <motion.div
          className="mt-20 grid grid-cols-1 gap-6 lg:h-[640px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          {programmes.map((program, index) => {
            const isFeatured = program.featured
            const gridClass = isFeatured
              ? "lg:col-span-2 lg:row-span-2"
              : index === 1
                ? "lg:col-span-2 lg:row-span-1"
                : "lg:col-span-1 lg:row-span-1"

            return (
              <motion.a
                key={program.id}
                href={`/projects/${program.id}`}
                className={`group relative ${gridClass} min-h-[220px] overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:min-h-[240px]`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredCard(program.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={
                      Assets.home.programmes[
                        program.id as keyof typeof Assets.home.programmes
                      ]
                    }
                    alt={
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (t.home.programmes as Record<string, any>)[program.id]
                        ?.image_alt as string
                    }
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={isFeatured}
                  />
                </div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-neutral/90 via-neutral/60 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.15 }}
                />

                {/* Icon Badge */}
                <motion.div
                  className="absolute top-3 left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 ring-2 ring-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 sm:top-4 sm:left-4 sm:h-14 sm:w-14"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.15 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    className={`text-primary-600 ${isFeatured ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6 sm:h-7 sm:w-7"}`}
                    animate={{
                      scale: hoveredCard === program.id ? [1, 1.2, 1] : 1,
                      rotate: hoveredCard === program.id ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {program.icon}
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div
                  className={`relative flex h-full flex-col justify-end text-white ${
                    isFeatured ? "p-8 md:p-10" : "p-6"
                  }`}
                >
                  <h4 className="text-xl font-semibold text-white">
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (t.home.programmes as any)[program.id]?.title
                    }
                  </h4>
                  <p className="mt-1 text-sm text-neutral-200">
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (t.home.programmes as any)[program.id]?.description
                    }
                  </p>

                  <motion.div
                    className={`inline-flex items-center gap-2 font-semibold text-accent transition-all duration-300 ${
                      isFeatured ? "mt-6" : "mt-4"
                    } ${hoveredCard === program.id ? "underline" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                    whileHover={{ x: 3 }}
                  >
                    {isFeatured
                      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (t.home.programmes as any)[program.id]?.learn_more
                      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (t.home.programmes as any)[program.id]?.explore}

                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      animate={{ x: hoveredCard === program.id ? 4 : 0 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default HomeProgramBlock
