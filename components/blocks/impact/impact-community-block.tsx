"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Handshake, Heart } from "lucide-react"
import React, { useRef } from "react"

export const ImpactCommunityBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0.8]
  )

  const statsData = [
    {
      target: 117,
      label:
        t.impact.domains.cards.community_block.metrics?.resources_invested ||
        "VSLA Groups",
      suffix: "",
    },
    {
      target: 584,
      label:
        t.impact.domains.cards.community_block.metrics?.activities_performed ||
        "Caregiver Members",
      suffix: "+",
    },
    {
      target: 95,
      label: "Economic Empowerment",
      suffix: "%",
    },
    {
      target: 35,
      label: "Years of Service",
      suffix: "+",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
      staggerChildren: 0.2,
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
      },
    },
  }

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  }

  const statsBarVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.8,
      },
    },
  }

  const statVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.9 + custom * 0.1,
      },
    }),
  }

  const numberVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 pt-32 pb-20"
    >
      <motion.div
        style={{ y: yTransform, opacity: opacityTransform }}
        className="relative mx-auto max-container-2xl overflow-hidden rounded-t-2xl py-32"
      >
        {/* Background with gradient and image overlay */}
        <div className="absolute inset-0 z-0 bg-linear-to-br from-primary-600/80 to-secondary-600/80">
          <motion.img
            src={Assets.impact.community.src}
            alt={
              t.impact.domains.cards.community_block.image_alt ||
              "Community empowerment activities"
            }
            className="h-full w-full object-cover mix-blend-overlay"
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Additional gradient overlay */}
        <motion.div
          className="absolute inset-0 z-0 bg-linear-to-t from-primary-900/80 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 container mx-auto mb-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl text-center">
            <motion.h1
              variants={titleVariants}
              className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl"
            >
              {t.impact.domains.cards.community_block.title ||
                "Community Development"}
            </motion.h1>

            <motion.p
              variants={descriptionVariants}
              className="mx-auto mb-10 max-w-3xl text-xl text-white/90 md:text-2xl"
            >
              {t.impact.domains.cards.community_block.description}
            </motion.p>

            <motion.div
              variants={buttonVariants}
              className="flex flex-col justify-center gap-4 pb-10 sm:flex-row"
            >
              <motion.a
                href="#our-impact"
                className="group relative inline-flex items-center justify-center gap-4 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="flex items-center gap-3">
                  <motion.div
                    className="relative h-5 w-5 shrink-0 text-accent"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    whileHover={{ rotate: 20, scale: 1.2 }}
                  >
                    <Handshake className="h-full w-full text-white" />
                  </motion.div>
                  <motion.span
                    className="whitespace-nowrap"
                    whileHover={{ x: 2 }}
                  >
                    {t.impact.domains.cards.community_block.learn_more}
                  </motion.span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute -inset-px rounded-full bg-accent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.a>

              <motion.a
                href="#donate"
                className="group relative inline-flex items-center justify-center gap-4 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-3">
                  <motion.div
                    className="relative h-5 w-5 text-accent"
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
                    Support Our Mission
                  </motion.span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute -inset-px rounded-full bg-accent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30"
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={statsBarVariants}
          className="absolute bottom-0 left-0 w-full border-t border-white/20 bg-white/10 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/20 md:grid-cols-4">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statVariants}
                  className="px-4 py-6 text-center"
                >
                  <motion.div
                    variants={numberVariants}
                    className="mb-1 text-3xl font-bold text-white md:text-4xl"
                  >
                    <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                  </motion.div>
                  <p className="text-sm text-white/80 md:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Animated Number Component
const AnimatedNumber: React.FC<{ target: number; suffix: string }> = ({
  target,
  suffix,
}) => {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  React.useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const frameRate = 60
    const totalFrames = (duration / 1000) * frameRate
    const increment = target / totalFrames

    let currentFrame = 0
    const counter = setInterval(() => {
      currentFrame++
      const newCount = Math.min(Math.ceil(increment * currentFrame), target)
      setCount(newCount)

      if (currentFrame >= totalFrames) {
        clearInterval(counter)
      }
    }, 1000 / frameRate)

    return () => clearInterval(counter)
  }, [isInView, target])

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  )
}
