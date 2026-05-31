"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Heart, Pause, Play, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import React, { useRef } from "react"

export const ImpactCommunityBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isMuted, setIsMuted] = React.useState(true)
  const [hasClickedPlay, setHasClickedPlay] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (hasClickedPlay) return // If they explicitly clicked play, keep it playing with sound
    if (videoRef.current) {
      videoRef.current.volume = 1.0
      videoRef.current.muted = false
      setIsMuted(false)
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.log("Audio play gesture required: ", err)
      })
    }
  }

  const handleMouseLeave = () => {
    if (hasClickedPlay) return // If they explicitly clicked play, do not pause or mute on hover out!
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
        setHasClickedPlay(false)
      } else {
        videoRef.current.volume = 1.0
        videoRef.current.muted = false
        setIsMuted(false)
        videoRef.current.play().then(() => {
          setIsPlaying(true)
          setHasClickedPlay(true)
        })
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted
      videoRef.current.muted = newMuted
      setIsMuted(newMuted)
      if (!newMuted) {
        videoRef.current.volume = 1.0
      }
    }
  }



  const statsData = [
    {
      target: 12000,
      label: "Community Savings Groups",
      suffix: "+",
    },
    {
      target: 80000,
      label: "Community Members Trained",
      suffix: "+",
    },
    {
      target: 300,
      label: "ADT SACCO Members",
      suffix: "+",
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

  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
      },
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
    <section className="relative px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-8">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mx-auto max-container-2xl px-0 py-8 md:py-16"
      >
        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 w-full"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12 items-center">
            {/* Column 1: Larger (Badge, Titles, Description, CTAs, Statistics) */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <motion.span
                variants={badgeVariants}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 backdrop-blur-xs mb-6 w-fit"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t.impact.hero.tagline || "The Busia Resilience Model"}
              </motion.span>

              <motion.h1
                variants={titleVariants}
                className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-primary-950"
              >
                {t.impact.hero.title.prefix}{" "}
                <span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                  {t.impact.hero.title.highlight}
                </span>{" "}
                {t.impact.hero.title.suffix}
              </motion.h1>

              <motion.p
                variants={descriptionVariants}
                className="mb-8 text-lg text-primary-900/80 md:text-xl max-w-2xl leading-relaxed"
              >
                {t.impact.hero.description}
              </motion.p>

              <motion.div
                variants={buttonVariants}
                className="flex flex-col sm:flex-row gap-4 pb-8"
              >
                <motion.a
                  href="#our-impact"
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/40 sm:px-8 sm:text-base"
                >
                  <span className="whitespace-nowrap">
                    {t.impact.hero.cta.primary || "Explore the Domains"}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href="#donate"
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-neutral-200 bg-neutral-100/30 px-6 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-100/50 backdrop-blur-md transition-all duration-300 sm:px-8 sm:text-base"
                >
                  <Heart className="h-4 w-4 text-accent fill-accent/10 transition-colors group-hover:fill-accent/30" />
                  <span className="whitespace-nowrap">
                    {t.impact.hero.cta.secondary || "Partner With ADT"}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </motion.div>

              {/* Statistics Grid (repositioned inside the left column) */}
              <motion.div
                variants={statsBarVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-200 mt-6"
              >
                {statsData.map((stat, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={statVariants}
                    className="flex flex-col text-left"
                  >
                    <motion.span
                      variants={numberVariants}
                      className="text-xl sm:text-2xl font-extrabold text-primary-950 tracking-tight"
                    >
                      <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                    </motion.span>
                    <span className="text-[10px] sm:text-xs text-primary-800/80 font-semibold mt-0.5 leading-tight">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Column 2: Smaller (Autoplaying video + overlapping/supporting photos) */}
            <div className="md:col-span-5 flex flex-col justify-center items-center md:items-end w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex flex-col items-center md:items-end w-full"
              >
                {/* Main Video Frame */}
                <div 
                  className="relative w-full max-w-95 md:max-w-105 rounded-2xl border border-neutral-200 bg-white/70 p-3 backdrop-blur-md shadow-2xl group cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={togglePlay}
                >
                  {/* Supporting Photo 1 (Tailor) - Floating Overlapping Left side of Video (Bottom-Left) */}
                  <motion.div
                    className="absolute -left-16 bottom-12 z-30 hidden lg:block w-36 overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 p-2 shadow-2xl transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:translate-y-4 group-hover:scale-105 pointer-events-auto"
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent pausing video when clicking tailor image
                    }}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <Image
                        src={Assets.impact.tailor}
                        alt="Tailoring training program"
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-center text-[10px] font-semibold text-primary-955 select-none">
                      Tailoring & Skills
                    </p>
                  </motion.div>

                  {/* Supporting Photo 2 (Bee) - Floating Overlapping Right side of Video (Top-Right) */}
                  <motion.div
                    className="absolute -right-12 top-12 z-30 hidden lg:block w-32 overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 p-2 shadow-2xl transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:scale-105 pointer-events-auto"
                    initial={{ x: 20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent pausing video when clicking bee image
                    }}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <Image
                        src={Assets.impact.bee}
                        alt="Beekeeping project"
                        fill
                        sizes="130px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-center text-[10px] font-semibold text-primary-955 select-none">
                      Apiculture & Bee
                    </p>
                  </motion.div>

                  <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-black/40 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <video
                      ref={videoRef}
                      src={typeof Assets.impact.testimonial === 'string' ? Assets.impact.testimonial : (Assets.impact.testimonial as { src: string })?.src || Assets.impact.testimonial}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* HUD: Pulsing Play/Pause Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="h-14 w-14 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white backdrop-blur-xs shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        {isPlaying ? (
                          <Pause className="h-6 w-6 text-white fill-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                        )}
                      </div>
                    </div>

                    {/* Volume Sound Wave Indicator / Toggle Mute */}
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-4 right-4 z-20 h-8 w-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-xs shadow-md hover:bg-black/80 transition-colors pointer-events-auto"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 text-white" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-white" />
                      )}
                    </button>

                    {/* Live Indicator Badge */}
                    <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs select-none">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                      {isMuted ? "Hover for Sound" : "Playing Audio"}
                    </span>
                  </div>
                </div>

                {/* Supporting Photos Mobile Grid (Simple row under video on mobile) */}
                <div className="mt-6 flex lg:hidden gap-4 w-full max-w-95 md:max-w-105">
                  <div className="flex-1 rounded-2xl border border-neutral-200 bg-white/70 p-2 backdrop-blur-md shadow-lg">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                      <Image
                        src={Assets.impact.tailor}
                        alt="Tailoring"
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-1.5 text-center text-[10px] font-bold text-primary-950">Tailoring</p>
                  </div>
                  <div className="flex-1 rounded-2xl border border-neutral-200 bg-white/70 p-2 backdrop-blur-md shadow-lg">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                      <Image
                        src={Assets.impact.bee}
                        alt="Beekeeping"
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-1.5 text-center text-[10px] font-bold text-primary-950">Beekeeping</p>
                  </div>
                </div>
              </motion.div>
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
