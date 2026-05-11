"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import {
  Boxes,
  Building2,
  HandCoins,
  Handshake,
  LineChart,
  Truck,
} from "lucide-react"
import Image from "next/image"
import { type ReactNode, useRef, useState } from "react"

type ModelTone = "primary" | "secondary" | "accent"

type Model = {
  id: string
  title: string
  description: string
  bullets: string[]
  icon: ReactNode
  tone: ModelTone
}

export const CollaborationModelsBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeId, setActiveId] = useState<string>("co_implementation")

  const models: Model[] = [
    {
      id: "co_implementation",
      title: t.collaboration.models.itemsMap.co_implementation.title,
      description:
        t.collaboration.models.itemsMap.co_implementation.description,
      bullets: t.collaboration.models.itemsMap.co_implementation.bullets,
      icon: <Handshake className="h-6 w-6" />,
      tone: "primary",
    },
    {
      id: "program_funding",
      title: t.collaboration.models.itemsMap.program_funding.title,
      description: t.collaboration.models.itemsMap.program_funding.description,
      bullets: t.collaboration.models.itemsMap.program_funding.bullets,
      icon: <HandCoins className="h-6 w-6" />,
      tone: "secondary",
    },
    {
      id: "technical_assistance",
      title: t.collaboration.models.itemsMap.technical_assistance.title,
      description:
        t.collaboration.models.itemsMap.technical_assistance.description,
      bullets: t.collaboration.models.itemsMap.technical_assistance.bullets,
      icon: <Building2 className="h-6 w-6" />,
      tone: "accent",
    },
    {
      id: "in_kind",
      title: t.collaboration.models.itemsMap.in_kind.title,
      description: t.collaboration.models.itemsMap.in_kind.description,
      bullets: t.collaboration.models.itemsMap.in_kind.bullets,
      icon: <Truck className="h-6 w-6" />,
      tone: "primary",
    },
    {
      id: "impact_investing",
      title: t.collaboration.models.itemsMap.impact_investing.title,
      description: t.collaboration.models.itemsMap.impact_investing.description,
      bullets: t.collaboration.models.itemsMap.impact_investing.bullets,
      icon: <LineChart className="h-6 w-6" />,
      tone: "secondary",
    },
  ]

  const active = models.find((m) => m.id === activeId) ?? models[0]

  const toneStyles: Record<
    ModelTone,
    { chip: string; icon: string; ring: string }
  > = {
    primary: {
      chip: "bg-primary/10 text-primary",
      icon: "from-primary/12 to-primary/6 text-primary",
      ring: "focus-visible:ring-primary/40",
    },
    secondary: {
      chip: "bg-secondary/10 text-secondary",
      icon: "from-secondary/12 to-secondary/6 text-secondary",
      ring: "focus-visible:ring-secondary/40",
    },
    accent: {
      chip: "bg-accent/10 text-accent",
      icon: "from-accent/12 to-accent/6 text-accent",
      ring: "focus-visible:ring-accent/40",
    },
  }

  return (
    <section
      id="partner-models"
      ref={ref}
      className="relative overflow-hidden py-8"
    >
      <div className="mx-auto max-container-2xl px-4">
        <div className="mx-auto max-container-2xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              {t.collaboration.models.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.collaboration.models.title.prefix}
              <span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                {" "}
                {t.collaboration.models.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.collaboration.models.description}
            </motion.p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="grid gap-3">
                {models.map((m, index) => {
                  const tone = toneStyles[m.tone]
                  const isActive = activeId === m.id

                  return (
                    <motion.button
                      key={m.id}
                      type="button"
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.55,
                        delay: 0.25 + index * 0.06,
                      }}
                      onClick={() => setActiveId(m.id)}
                      className={`group relative w-full rounded-2xl border bg-white/90 p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 ${tone.ring} ${
                        isActive ? "border-neutral-300" : "border-neutral-200"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        aria-hidden
                        className={`pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br ${tone.icon} opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                          isActive ? "opacity-100" : ""
                        }`}
                      />
                      <div className="relative z-10 flex items-start gap-4">
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${tone.icon}`}
                        >
                          {m.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-base font-bold text-neutral-900">
                              {m.title}
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}
                            >
                              {m.tone}
                            </span>
                          </div>
                          <div className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                            {m.description}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg lg:col-span-7"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />

              <div className="relative grid gap-6 p-8 sm:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/5 px-4 py-2 text-xs font-semibold tracking-widest text-neutral-700 uppercase">
                      <Boxes className="h-4 w-4" />
                      {t.collaboration.models.panel.kicker}
                    </div>
                    <div className="mt-5 text-3xl font-bold text-neutral-900">
                      {active.title}
                    </div>
                    <div className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
                      {active.description}
                    </div>
                  </div>

                  <div className="relative hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-accent/15 to-secondary/15 text-accent sm:flex">
                    {active.icon}
                  </div>
                </div>

                <div className="grid gap-3">
                  {active.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white/70 p-4"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <div className="text-sm leading-relaxed text-neutral-700">
                        {b}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-neutral-200">
                  <div className="absolute inset-0 bg-linear-to-r from-neutral/90 via-neutral/60 to-neutral/20" />
                  <div className="relative aspect-16/8">
                    <Image
                      src={Assets.collaborations.businessPartners}
                      alt={t.collaboration.models.image_alt}
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
