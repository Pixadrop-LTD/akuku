"use client"

import { Assets } from "@/config/assets"
import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { ArrowRight, GraduationCap, HeartPulse, Sprout } from "lucide-react"
import Image from "next/image"
import { type ReactNode, useRef } from "react"

type DomainTone = "primary" | "secondary" | "accent"

type Domain = {
  id: string
  title: string
  label: string
  signal: string
  headline: string
  description: string
  highlights: string[]
  tone: DomainTone
  icon: ReactNode
}

export const CollaborationPortfolioBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const domains: Domain[] = [
    {
      id: "healthy",
      title: t.collaboration.portfolio.domains.healthy.title,
      label: t.collaboration.portfolio.domains.healthy.label,
      signal: t.collaboration.portfolio.domains.healthy.signal,
      headline: t.collaboration.portfolio.domains.healthy.headline,
      description: t.collaboration.portfolio.domains.healthy.description,
      highlights: t.collaboration.portfolio.domains.healthy.highlights,
      tone: "primary",
      icon: <HeartPulse className="h-6 w-6" />,
    },
    {
      id: "schooled",
      title: t.collaboration.portfolio.domains.schooled.title,
      label: t.collaboration.portfolio.domains.schooled.label,
      signal: t.collaboration.portfolio.domains.schooled.signal,
      headline: t.collaboration.portfolio.domains.schooled.headline,
      description: t.collaboration.portfolio.domains.schooled.description,
      highlights: t.collaboration.portfolio.domains.schooled.highlights,
      tone: "secondary",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "stable",
      title: t.collaboration.portfolio.domains.stable.title,
      label: t.collaboration.portfolio.domains.stable.label,
      signal: t.collaboration.portfolio.domains.stable.signal,
      headline: t.collaboration.portfolio.domains.stable.headline,
      description: t.collaboration.portfolio.domains.stable.description,
      highlights: t.collaboration.portfolio.domains.stable.highlights,
      tone: "accent",
      icon: <Sprout className="h-6 w-6" />,
    },
  ]

  const toneStyles: Record<
    DomainTone,
    { pill: string; glow: string; icon: string }
  > = {
    primary: {
      pill: "bg-primary/10 text-primary border-primary/20",
      glow: "from-primary/20 via-primary/5 to-transparent",
      icon: "from-primary/12 to-primary/6 text-primary",
    },
    secondary: {
      pill: "bg-secondary/10 text-secondary border-secondary/20",
      glow: "from-secondary/20 via-secondary/5 to-transparent",
      icon: "from-secondary/12 to-secondary/6 text-secondary",
    },
    accent: {
      pill: "bg-accent/10 text-accent border-accent/20",
      glow: "from-accent/20 via-accent/5 to-transparent",
      icon: "from-accent/12 to-accent/6 text-accent",
    },
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative overflow-hidden px-4 py-8"
    >
      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary"
            >
              {t.collaboration.portfolio.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.collaboration.portfolio.title.prefix}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                {t.collaboration.portfolio.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.collaboration.portfolio.description}
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {domains.map((d, index) => {
              const tone = toneStyles[d.tone]

              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${tone.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase ${tone.pill}`}
                        >
                          {d.label}
                        </div>
                        <div className="mt-4 text-2xl font-bold text-neutral-900">
                          {d.title}
                        </div>
                        <div className="mt-2 text-sm font-medium text-neutral-500">
                          {d.signal}
                        </div>
                      </div>
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${tone.icon}`}
                      >
                        {d.icon}
                      </div>
                    </div>

                    <div className="mt-6 text-lg font-semibold text-neutral-900">
                      {d.headline}
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {d.description}
                    </div>

                    <div className="mt-6 grid gap-3">
                      {d.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                          <div className="text-sm leading-relaxed text-neutral-700">
                            {h}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                      {t.collaboration.portfolio.domain_cta}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={Assets.collaborations.government}
                      alt={t.collaboration.portfolio.image_alt}
                      fill
                      className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral/90 via-neutral/40 to-transparent" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
