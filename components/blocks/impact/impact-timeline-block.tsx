"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { Heart, Shield, Target, Users, Zap } from "lucide-react"
import { useRef } from "react"

export const ImpactTimelineBlock = () => {
  const { t } = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const timeline = [
    {
      id: "rescue",
      title: "Rescue & Immediate Care",
      description:
        "Providing urgent assistance and safe shelter to children in crisis situations.",
      icon: "🚑",
      color: "blue",
    },
    {
      id: "rehabilitation",
      title: "Rehabilitation",
      description:
        "Supporting comprehensive physical, emotional, and psychological recovery.",
      icon: "🏥",
      color: "green",
    },
    {
      id: "education",
      title: "Education & Development",
      description:
        "Unlocking potential through quality education and skill development.",
      icon: "🎓",
      color: "purple",
    },
    {
      id: "reintegration",
      title: "Reintegration",
      description:
        "Supporting successful transition back to family or independent living.",
      icon: "🏠",
      color: "pink",
    },
  ]

  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-container-2xl">
          {/* Section Header */}
          <div className="relative mb-16 text-center">
            {/* Decorative elements */}
            <div className="absolute top-1/2 -left-4 h-24 w-1.5 -translate-y-1/2 rounded-full bg-linear-to-b from-primary to-secondary"></div>
            <div className="absolute -bottom-6 left-0 h-0.5 w-32 bg-linear-to-l from-secondary/20 via-primary/20 to-secondary/20"></div>

            <div className="relative border-r-4 border-secondary/10 pr-8"></div>
            <div className="mb-3 inline-flex items-center justify-start space-x-3 md:mb-6">
              <span className="mb-2 inline-flex items-center justify-center text-sm font-medium tracking-wider text-accent uppercase sm:mb-4">
                <span className="h-3 w-3 animate-pulse rounded-full bg-accent"></span>
                {t.impact.domains.timeline.journey}
              </span>
            </div>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-headings mb-6 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="relative inline-block">
                <span className="absolute -top-2 -right-2 h-3 w-3 animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative">
                  <span className="bg-linear-to-l from-secondary to-accent bg-clip-text text-transparent">
                    {t.impact.domains.timeline.impact_journey} &nbsp;
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-l from-secondary/30 to-accent/30"></span>
                </span>
              </span>
              {t.impact.domains.timeline.change_happens}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10 text-lg leading-relaxed text-gray-600"
            >
              {t.impact.domains.timeline.discovery_description}
            </motion.p>
          </div>
        </div>
      </motion.div>
      <div className="relative mx-auto max-w-6xl">
        {/* Main Timeline Line */}
        <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-linear-to-b from-primary/20 via-accent to-secondary/20">
          <div className="absolute inset-0 bg-linear-to-b from-primary via-accent to-secondary opacity-0 transition-opacity duration-1000 group-hover:opacity-100"></div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => (
            <div key={item.id} className="group relative">
              {/* Timeline Dot */}
              <div className="absolute left-1/2 z-10 flex h-6 w-6 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-accent bg-white">
                <div className="h-3 w-3 animate-pulse rounded-full bg-accent"></div>
              </div>

              {/* Timeline Content - Left Side */}
              {index % 2 === 0 && (
                <div className="relative">
                  {/* Mobile: Card below timeline dot */}
                  <div className="mt-8 md:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="group relative w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-primary/50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="relative z-10">
                        <div className="mb-4 flex items-center">
                          <div
                            className={`h-12 w-12 rounded-full bg-linear-to-br from-${item.color} flex items-center justify-center to-white text-white shadow-lg`}
                          >
                            <motion.div
                              initial={{ scale: 1 }}
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                              whileHover={{ scale: 1.1 }}
                              className="h-6 w-6"
                            >
                              {item.icon === "🚑" && (
                                <Shield className="h-6 w-6" />
                              )}
                              {item.icon === "🏥" && (
                                <Heart className="h-6 w-6" />
                              )}
                              {item.icon === "🎓" && (
                                <Target className="h-6 w-6" />
                              )}
                              {item.icon === "🏠" && (
                                <Users className="h-6 w-6" />
                              )}
                            </motion.div>
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-500">
                            Phase {index + 1}
                          </span>
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mb-4 text-gray-600">{item.description}</p>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm">
                              {
                                t.impact.domains.timeline.items.rescue
                                  .features[0]
                              }
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm">
                              {
                                t.impact.domains.timeline.items.rescue
                                  .features[1]
                              }
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm">
                              {
                                t.impact.domains.timeline.items.rescue
                                  .features[2]
                              }
                            </span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop: Card on left side */}
                  <div className="hidden md:flex md:items-center">
                    <div className="md:w-5/12 md:pr-16 md:text-right">
                      <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="group relative inline-block w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-primary/50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative z-10">
                          <div className="mb-4 flex items-center justify-end">
                            <span className="mr-3 text-sm font-medium text-gray-500">
                              Phase {index + 1}
                            </span>
                            <div
                              className={`h-12 w-12 rounded-full bg-linear-to-br from-${item.color} flex items-center justify-center to-white text-white shadow-lg`}
                            >
                              <motion.div
                                initial={{ scale: 1 }}
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                                whileHover={{ scale: 1.1 }}
                                className="h-6 w-6"
                              >
                                {item.icon === "🚑" && (
                                  <Shield className="h-6 w-6" />
                                )}
                                {item.icon === "🏥" && (
                                  <Heart className="h-6 w-6" />
                                )}
                                {item.icon === "🎓" && (
                                  <Target className="h-6 w-6" />
                                )}
                                {item.icon === "🏠" && (
                                  <Users className="h-6 w-6" />
                                )}
                              </motion.div>
                            </div>
                          </div>
                          <h3 className="mb-3 text-right text-2xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mb-4 text-right text-gray-600">
                            {item.description}
                          </p>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start justify-end">
                              <span className="text-left">
                                {
                                  t.impact.domains.timeline.items.rescue
                                    .features[0]
                                }
                              </span>
                              <Zap className="mt-0.5 ml-3 h-5 w-5 shrink-0 text-green-500" />
                            </li>
                            <li className="flex items-start justify-end">
                              <span className="text-left">
                                {
                                  t.impact.domains.timeline.items.rescue
                                    .features[1]
                                }
                              </span>
                              <Zap className="mt-0.5 ml-3 h-5 w-5 shrink-0 text-green-500" />
                            </li>
                            <li className="flex items-start justify-end">
                              <span className="text-left">
                                {
                                  t.impact.domains.timeline.items.rescue
                                    .features[2]
                                }
                              </span>
                              <Zap className="mt-0.5 ml-3 h-5 w-5 shrink-0 text-green-500" />
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                    <div className="md:w-2/12"></div>
                    <div className="md:w-5/12"></div>
                  </div>
                </div>
              )}

              {/* Timeline Content - Right Side */}
              {index % 2 === 1 && (
                <div className="relative">
                  {/* Mobile: Card below timeline dot */}
                  <div className="mt-8 md:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="group relative w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-primary/50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="relative z-10">
                        <div className="mb-4 flex items-center">
                          <div
                            className={`h-12 w-12 rounded-full bg-linear-to-br from-${item.color} flex items-center justify-center to-white text-white shadow-lg`}
                          >
                            <motion.div
                              initial={{ scale: 1 }}
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                              whileHover={{ scale: 1.1 }}
                              className="h-6 w-6"
                            >
                              {item.icon === "🚑" && (
                                <Shield className="h-6 w-6" />
                              )}
                              {item.icon === "🏥" && (
                                <Heart className="h-6 w-6" />
                              )}
                              {item.icon === "🎓" && (
                                <Target className="h-6 w-6" />
                              )}
                              {item.icon === "�" && (
                                <Users className="h-6 w-6" />
                              )}
                            </motion.div>
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-500">
                            Phase {index + 1}
                          </span>
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mb-4 text-gray-600">{item.description}</p>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm">
                              {
                                t.impact.domains.timeline.items.rescue
                                  .features[0]
                              }
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm">
                              {
                                t.impact.domains.timeline.items.rescue
                                  .features[1]
                              }
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                            <span className="text-sm">
                              {
                                t.impact.domains.timeline.items.rescue
                                  .features[2]
                              }
                            </span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop: Card on right side */}
                  <div className="hidden md:flex md:items-center">
                    <div className="md:w-5/12"></div>
                    <div className="md:w-2/12"></div>
                    <div className="md:w-5/12 md:pl-16">
                      <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="group relative inline-block w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-primary/50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative z-10">
                          <div className="mb-4 flex items-center">
                            <div
                              className={`h-12 w-12 rounded-full bg-linear-to-br from-${item.color} flex items-center justify-center to-white text-white shadow-lg`}
                            >
                              <motion.div
                                initial={{ scale: 1 }}
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                                whileHover={{ scale: 1.1 }}
                                className="h-6 w-6"
                              >
                                {item.icon === "🚑" && (
                                  <Shield className="h-6 w-6" />
                                )}
                                {item.icon === "�" && (
                                  <Heart className="h-6 w-6" />
                                )}
                                {item.icon === "🎓" && (
                                  <Target className="h-6 w-6" />
                                )}
                                {item.icon === "🏠" && (
                                  <Users className="h-6 w-6" />
                                )}
                              </motion.div>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-500">
                              Phase {index + 1}
                            </span>
                          </div>
                          <h3 className="mb-3 text-2xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mb-4 text-gray-600">
                            {item.description}
                          </p>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                              <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                              <span>
                                {
                                  t.impact.domains.timeline.items.rescue
                                    .features[0]
                                }
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                              <span>
                                {
                                  t.impact.domains.timeline.items.rescue
                                    .features[1]
                                }
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Zap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                              <span>
                                {
                                  t.impact.domains.timeline.items.rescue
                                    .features[2]
                                }
                              </span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
