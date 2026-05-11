"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export const ImpactMetricsBlock = () => {
  const { t } = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-container-2xl px-6 lg:px-8"
      >
        <div className="mx-auto max-container-2xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Program Lifecycle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {t.impact.domains.metrics.program_lifecycle.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    1
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.program_lifecycle.steps
                          .identification
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    2
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.program_lifecycle.steps
                          .implementation
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    3
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.program_lifecycle.steps
                          .engagement
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    4
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.program_lifecycle.steps
                          .outcomes
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    5
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.program_lifecycle.steps
                          .sustainability
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {t.impact.domains.metrics.success_metrics.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-green-500"></div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.success_metrics
                          .resources_invested
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-blue-500"></div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {
                        t.impact.domains.metrics.success_metrics
                          .activities_performed
                      }
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-yellow-500"></div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {t.impact.domains.metrics.success_metrics.outputs}
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-yellow-500"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-purple-500"></div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {t.impact.domains.metrics.success_metrics.outcomes}
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-red-500"></div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">
                      {t.impact.domains.metrics.success_metrics.impact}
                    </p>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
