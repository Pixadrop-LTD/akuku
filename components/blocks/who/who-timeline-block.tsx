"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Flag, Home, Rocket, School } from "lucide-react"
import { useRef } from "react"

type TimelineItemId = "1989" | "2001" | "2024" | "2030"

type TimelineItem = {
  id: TimelineItemId
  year: string
  title: string
  description: string
  icon: React.ReactNode
  tone: "primary" | "secondary" | "accent"
}

export const WhoTimelineBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const items: TimelineItem[] = [
    {
      id: "1989",
      year: t.who.timeline.items["1989"].year,
      title: t.who.timeline.items["1989"].title,
      description: t.who.timeline.items["1989"].description,
      icon: <Flag className="h-5 w-5" />,
      tone: "primary",
    },
    {
      id: "2001",
      year: t.who.timeline.items["2001"].year,
      title: t.who.timeline.items["2001"].title,
      description: t.who.timeline.items["2001"].description,
      icon: <Home className="h-5 w-5" />,
      tone: "secondary",
    },
    {
      id: "2024",
      year: t.who.timeline.items["2024"].year,
      title: t.who.timeline.items["2024"].title,
      description: t.who.timeline.items["2024"].description,
      icon: <School className="h-5 w-5" />,
      tone: "accent",
    },
    {
      id: "2030",
      year: t.who.timeline.items["2030"].year,
      title: t.who.timeline.items["2030"].title,
      description: t.who.timeline.items["2030"].description,
      icon: <Rocket className="h-5 w-5" />,
      tone: "primary",
    },
  ]

  const toneStyles = {
    primary: {
      pill: "bg-primary/10 text-primary",
      dot: "bg-primary",
      border: "from-primary to-secondary",
      icon: "bg-primary/10 text-primary",
    },
    secondary: {
      pill: "bg-secondary/10 text-secondary",
      dot: "bg-secondary",
      border: "from-secondary to-accent",
      icon: "bg-secondary/10 text-secondary",
    },
    accent: {
      pill: "bg-accent/10 text-accent",
      dot: "bg-accent",
      border: "from-accent to-primary",
      icon: "bg-accent/10 text-accent",
    },
  } satisfies Record<
    TimelineItem["tone"],
    { pill: string; dot: string; border: string; icon: string }
  >

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-container-2xl px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              {t.who.timeline.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headings mt-6 text-3xl font-bold text-neutral-900 md:text-5xl"
            >
              {t.who.timeline.title.prefix}{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.who.timeline.title.highlight}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600"
            >
              {t.who.timeline.description}
            </motion.p>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-primary/20 via-accent/30 to-secondary/20"
            />

            <div className="space-y-10 md:space-y-16">
              {items.map((item, index) => {
                const styles = toneStyles[item.tone]
                const isLeft = index % 2 === 0

                return (
                  <div key={item.id} className="relative">
                    <div
                      aria-hidden
                      className={`absolute left-1/2 top-8 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white shadow-sm ${styles.dot}`}
                    />

                    <div className="grid gap-6 md:grid-cols-2 md:items-start">
                      <div className={isLeft ? "md:pr-12" : "md:order-2 md:pl-12"}>
                        <motion.div
                          initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
                          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                          className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/85 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div
                            aria-hidden
                            className={`absolute inset-x-0 bottom-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${styles.border}`}
                          />

                          <div className="flex items-center justify-between gap-4">
                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.pill}`}>
                              {item.year}
                            </span>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}>
                              {item.icon}
                            </div>
                          </div>

                          <div className="mt-5 text-xl font-bold text-neutral-900">
                            {item.title}
                          </div>
                          <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                            {item.description}
                          </div>
                        </motion.div>
                      </div>

                      <div className={isLeft ? "md:order-2" : ""} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
