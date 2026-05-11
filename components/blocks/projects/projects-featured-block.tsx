"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Bike,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Sparkles,
} from "lucide-react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import type { ReactNode } from "react"
import { useRef, useState } from "react"

type FeaturedId =
  | "clinical_excellence"
  | "schooled_accelerator"
  | "vsla_plus"
  | "apiculture_enterprise"
  | "mobility_network"

type FeaturedTone = "primary" | "secondary" | "accent"

export const ProjectsFeaturedBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const [hovered, setHovered] = useState<FeaturedId | null>(null)

  const cards: Array<{
    id: FeaturedId
    tone: FeaturedTone
    icon: ReactNode
    image: StaticImageData
  }> = [
    {
      id: "clinical_excellence",
      tone: "accent",
      icon: <HeartPulse className="h-5 w-5" />,
      image: Assets.projects.health,
    },
    {
      id: "schooled_accelerator",
      tone: "secondary",
      icon: <GraduationCap className="h-5 w-5" />,
      image: Assets.projects.childSupport,
    },
    {
      id: "vsla_plus",
      tone: "primary",
      icon: <HandCoins className="h-5 w-5" />,
      image: Assets.projects.businessEmpowerment,
    },
    {
      id: "apiculture_enterprise",
      tone: "secondary",
      icon: <Sparkles className="h-5 w-5" />,
      image: Assets.projects.beeKeeping,
    },
    {
      id: "mobility_network",
      tone: "accent",
      icon: <Bike className="h-5 w-5" />,
      image: Assets.projects.bikes,
    },
  ]

  const toneMap: Record<
    FeaturedTone,
    { pill: string; glow: string; border: string }
  > = {
    primary: {
      pill: "bg-primary/10 text-primary",
      glow: "from-primary/20 via-primary/10 to-transparent",
      border: "border-primary/15",
    },
    secondary: {
      pill: "bg-secondary/10 text-secondary",
      glow: "from-secondary/20 via-secondary/10 to-transparent",
      border: "border-secondary/15",
    },
    accent: {
      pill: "bg-accent/10 text-accent",
      glow: "from-accent/20 via-accent/10 to-transparent",
      border: "border-accent/15",
    },
  }

  return (
    <section
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-4">
        <div className="mx-auto max-container-2xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
            >
              {t.projects.featured.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.projects.featured.title.prefix}{" "}
              <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t.projects.featured.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.projects.featured.description}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const data = t.projects.featured.cards[card.id]
              const tone = toneMap[card.tone]
              const isHovered = hovered === card.id

              return (
                <motion.a
                  key={card.id}
                  href={data.href}
                  onHoverStart={() => setHovered(card.id)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
                  }
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    tone.border
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                  >
                    <motion.div
                      className={cn(
                        "absolute inset-0 bg-linear-to-br opacity-0",
                        tone.glow
                      )}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    />
                  </div>

                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={data.image_alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral/70 via-neutral/10 to-transparent" />

                    <div className="absolute bottom-5 left-5 flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                          tone.pill
                        )}
                      >
                        {card.icon}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold",
                          tone.pill
                        )}
                      >
                        {data.pill}
                      </span>
                    </div>
                  </div>

                  <div className="relative p-7">
                    <div className="text-xl font-bold text-neutral-900">
                      {data.title}
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {data.description}
                    </div>

                    <div className="mt-6 grid gap-2">
                      {data.highlights.map((item: string) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-semibold text-neutral-800"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
                      {data.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
