"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, Bike, Cpu, Sparkles, Sun } from "lucide-react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import type { ReactNode } from "react"
import { useRef, useState } from "react"

type PipelineId =
  | "digital_hub"
  | "solar_backup"
  | "logistics_fleet"
  | "honey_processing"

type PipelineTone = "primary" | "secondary" | "accent"

export const ProjectsPipelineBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const [hovered, setHovered] = useState<PipelineId | null>(null)

  const iconMap: Record<PipelineId, ReactNode> = {
    digital_hub: <Cpu className="h-5 w-5" />,
    solar_backup: <Sun className="h-5 w-5" />,
    logistics_fleet: <Bike className="h-5 w-5" />,
    honey_processing: <Sparkles className="h-5 w-5" />,
  }

  const imageMap: Record<PipelineId, StaticImageData> = {
    digital_hub: Assets.projects.digital,
    solar_backup: Assets.projects.seeds,
    logistics_fleet: Assets.projects.mobility,
    honey_processing: Assets.projects.beeKeeping,
  }

  const toneMap: Record<
    PipelineTone,
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
      id="pipeline"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          <div className="mb-14 text-right">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary"
            >
              {t.projects.pipeline.badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.projects.pipeline.title.prefix}{" "}
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                {t.projects.pipeline.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 ml-auto max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.projects.pipeline.description}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {t.projects.pipeline.items.map(
              (
                item: {
                  id: string
                  title: string
                  description: string
                  tone: string
                  cta: { label: string; href: string }
                  image_alt: string
                  bullets: string[]
                },
                index: number
              ) => {
                const safeId: PipelineId =
                  item.id === "digital_hub" ||
                  item.id === "solar_backup" ||
                  item.id === "logistics_fleet" ||
                  item.id === "honey_processing"
                    ? (item.id as PipelineId)
                    : "digital_hub"

                const safeTone: PipelineTone =
                  item.tone === "primary" ||
                  item.tone === "secondary" ||
                  item.tone === "accent"
                    ? (item.tone as PipelineTone)
                    : "primary"

                const tone = toneMap[safeTone]
                const isHovered = hovered === safeId

                return (
                  <motion.a
                    key={item.title}
                    href={item.cta.href}
                    onHoverStart={() => setHovered(safeId)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                        src={imageMap[safeId]}
                        alt={item.image_alt}
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
                          {iconMap[safeId]}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold",
                            tone.pill
                          )}
                        >
                          {t.projects.pipeline.pill}
                        </span>
                      </div>
                    </div>

                    <div className="relative p-7">
                      <div className="text-xl font-bold text-neutral-900">
                        {item.title}
                      </div>
                      <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {item.description}
                      </div>

                      <div className="mt-6 grid gap-2">
                        {item.bullets.map((b) => (
                          <div
                            key={b}
                            className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-semibold text-neutral-800"
                          >
                            {b}
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
                        {item.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.a>
                )
              }
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
