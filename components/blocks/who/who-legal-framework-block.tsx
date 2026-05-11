"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Landmark, Scale, ShieldCheck } from "lucide-react"
import { useRef } from "react"

type LegalCardIcon = "landmark" | "scale" | "shield"

export const WhoLegalFrameworkBlock = () => {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="legal"
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute -right-24 -bottom-28 h-112 w-112 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-neutral-500)_1px,transparent_0)] bg-size-[28px_28px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-container-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -bottom-12 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl bg-linear-to-br from-primary/25 via-secondary/15 to-accent/20 p-px shadow-[0_30px_90px_-60px_var(--color-primary-500)]"
          >
            <div className="rounded-3xl border border-border/60 bg-card/75 p-8 backdrop-blur-md md:p-12">
              <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
                <div className="w-full md:w-7/12">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {t.who.legal.badge}
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="font-headings mt-6 text-3xl leading-tight font-bold text-neutral-900 md:text-4xl"
                  >
                    <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {t.who.legal.title.highlight}
                    </span>{" "}
                    {t.who.legal.title.suffix}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="mt-5 text-lg leading-relaxed text-muted-foreground"
                  >
                    {t.who.legal.description}
                  </motion.p>
                </div>

                <div className="w-full md:w-5/12">
                  <div className="grid gap-4">
                    {t.who.legal.cards.map(
                      (
                        card: {
                          title: string
                          description: string
                          icon: string
                        },
                        index: number
                      ) => {
                        const icon: LegalCardIcon =
                          card.icon === "landmark" ||
                          card.icon === "scale" ||
                          card.icon === "shield"
                            ? (card.icon as LegalCardIcon)
                            : "shield"

                        const Icon =
                          icon === "landmark"
                            ? Landmark
                            : icon === "scale"
                              ? Scale
                              : ShieldCheck

                        return (
                          <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 18 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                              duration: 0.6,
                              delay: 0.2 + index * 0.1,
                            }}
                            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
                          >
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <div className="flex items-start gap-4">
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/20 bg-linear-to-br from-secondary/15 to-accent/10 text-secondary shadow-sm">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="relative">
                                <div className="text-base font-semibold text-neutral-900">
                                  {card.title}
                                </div>
                                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                  {card.description}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
