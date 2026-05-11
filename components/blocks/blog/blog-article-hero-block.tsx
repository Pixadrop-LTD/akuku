"use client"

import { useLocale } from "@/hooks/use-locale"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type BlogArticleHeroBlockProps = {
  title: string
  image: string
}

export const BlogArticleHeroBlock = ({
  title,
  image,
}: BlogArticleHeroBlockProps) => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.55],
      [0, shouldReduceMotion ? 0 : hasAnimated ? 0 : 50]
    ),
    { stiffness: 80, damping: 15 }
  )

  const contentY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.55],
      [0, shouldReduceMotion ? 0 : hasAnimated ? 0 : -20]
    ),
    { stiffness: 80, damping: 15 }
  )

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, hasAnimated ? 1 : 0.92]
  )

  useEffect(() => {
    if (isInView && !hasAnimated) setTimeout(() => setHasAnimated(true), 0)
  }, [isInView, hasAnimated])

  return (
    <section className="relative scroll-mt-24 px-4 pt-28 pb-16 text-center sm:pt-32 sm:pb-20">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mx-auto max-container-2xl overflow-hidden rounded-3xl p-8 shadow-2xl md:p-20"
      >
        <motion.div className="absolute inset-0 h-full w-full" style={{ y: imageY }}>
          <Image
            src={image}
            alt={t.blog.article.hero.image_alt}
            fill
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-neutral/90 via-neutral/70 to-neutral/35 backdrop-brightness-75"
          style={{ opacity: overlayOpacity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm tracking-widest text-accent uppercase shadow-sm backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.blog.article.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="font-headings text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            className="max-w-4xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl"
          >
            {t.blog.article.hero.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
