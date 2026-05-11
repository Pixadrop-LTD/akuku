"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Bolt, Cpu, Hexagon, Tractor } from "lucide-react"
import { type ReactNode, useRef, useState } from "react"

type InvestmentTone = "primary" | "secondary" | "accent"

type InvestmentItem = {
  id: string
  title: string
  description: string
  bullets: string[]
  tone: InvestmentTone
  icon: ReactNode
  cta: { label: string; href: string }
}

export const CollaborationInvestmentBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeId, setActiveId] = useState<string>("digital_hub")

  const items: InvestmentItem[] = [
    {
      id: "digital_hub",
      title: t.collaboration.investment.itemsMap.digital_hub.title,
      description: t.collaboration.investment.itemsMap.digital_hub.description,
      bullets: t.collaboration.investment.itemsMap.digital_hub.bullets,
      tone: "secondary",
      icon: <Cpu className="h-5 w-5" />,
      cta: {
        label: t.collaboration.investment.itemsMap.digital_hub.cta.label,
        href: t.collaboration.investment.itemsMap.digital_hub.cta.href,
      },
    },
    {
      id: "solar_backup",
      title: t.collaboration.investment.itemsMap.solar_backup.title,
      description: t.collaboration.investment.itemsMap.solar_backup.description,
      bullets: t.collaboration.investment.itemsMap.solar_backup.bullets,
      tone: "accent",
      icon: <Bolt className="h-5 w-5" />,
      cta: {
        label: t.collaboration.investment.itemsMap.solar_backup.cta.label,
        href: t.collaboration.investment.itemsMap.solar_backup.cta.href,
      },
    },
    {
      id: "logistics_fleet",
      title: t.collaboration.investment.itemsMap.logistics_fleet.title,
      description:
        t.collaboration.investment.itemsMap.logistics_fleet.description,
      bullets: t.collaboration.investment.itemsMap.logistics_fleet.bullets,
      tone: "primary",
      icon: <Tractor className="h-5 w-5" />,
      cta: {
        label: t.collaboration.investment.itemsMap.logistics_fleet.cta.label,
        href: t.collaboration.investment.itemsMap.logistics_fleet.cta.href,
      },
    },
    {
      id: "honey_processing",
      title: t.collaboration.investment.itemsMap.honey_processing.title,
      description:
        t.collaboration.investment.itemsMap.honey_processing.description,
      bullets: t.collaboration.investment.itemsMap.honey_processing.bullets,
      tone: "secondary",
      icon: <Hexagon className="h-5 w-5" />,
      cta: {
        label: t.collaboration.investment.itemsMap.honey_processing.cta.label,
        href: t.collaboration.investment.itemsMap.honey_processing.cta.href,
      },
    },
  ]

  const active = items.find((i) => i.id === activeId) ?? items[0]

  const toneStyles: Record<InvestmentTone, { chip: string; icon: string }> = {
    primary: {
      chip: "bg-primary/10 text-primary",
      icon: "from-primary/12 to-primary/6 text-primary",
    },
    secondary: {
      chip: "bg-secondary/10 text-secondary",
      icon: "from-secondary/12 to-secondary/6 text-secondary",
    },
    accent: {
      chip: "bg-accent/10 text-accent",
      icon: "from-accent/12 to-accent/6 text-accent",
    },
  }

  return (
    <section
      id="investment"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-container-2xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
            >
              {t.collaboration.investment.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.collaboration.investment.title.prefix}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                {t.collaboration.investment.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.collaboration.investment.description}
            </motion.p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="grid gap-3">
                {items.map((item, index) => {
                  const tone = toneStyles[item.tone]
                  const isActive = item.id === activeId

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.55,
                        delay: 0.25 + index * 0.06,
                      }}
                      onClick={() => setActiveId(item.id)}
                      className={`group w-full rounded-2xl border border-neutral-200 bg-white/90 p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 ${
                        isActive ? "ring-2 ring-accent/20" : ""
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${tone.icon}`}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-base font-bold text-neutral-900">
                              {item.title}
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}
                            >
                              priority
                            </span>
                          </div>
                          <div className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                            {item.description}
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
              <div className="relative p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900/5 px-4 py-2 text-xs font-semibold tracking-widest text-neutral-700 uppercase">
                    {t.collaboration.investment.panel.kicker}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${toneStyles[active.tone].chip}`}
                  >
                    {t.collaboration.investment.panel.pill}
                  </span>
                </div>

                <div className="mt-6 text-3xl font-bold text-neutral-900">
                  {active.title}
                </div>
                <div className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {active.description}
                </div>

                <div className="mt-8 grid gap-3">
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

                <motion.a
                  href={active.cta.href}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-br from-accent to-secondary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-accent/40"
                >
                  {active.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
