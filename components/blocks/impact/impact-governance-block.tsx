"use client"

import { motion, useInView } from "framer-motion"
import { Megaphone, Users2, Building2, CheckCircle } from "lucide-react"
import { useRef } from "react"

export const ImpactGovernanceBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const governanceStats = [
    {
      id: "dialogue_forums",
      number: "40+",
      label: "Community Dialogue Forums",
      description: "Addressing service delivery concerns",
      icon: <Megaphone className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "civic_engagement",
      number: "600+",
      label: "Community Members Engaged",
      description: "Civic education & participation",
      icon: <Users2 className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "local_leaders",
      number: "30",
      label: "Local Leaders Engaged",
      description: "Advocacy on community priorities",
      icon: <Building2 className="h-6 w-6" />,
      color: "from-teal-500 to-green-500",
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-container-2xl">
          {/* Section Header */}
          <div className="relative mb-12 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-6 inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-50 px-6 py-2 backdrop-blur-sm"
            >
              <Megaphone className="mr-2 h-5 w-5 animate-pulse text-indigo-500" />
              <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
                Governance & Advocacy
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-headings mb-6 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="relative inline-block">
                <span className="absolute -top-2 -left-2 hidden h-3 w-3 animate-ping rounded-full bg-indigo-500 opacity-75 md:block" />
                <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 animate-ping rounded-full bg-indigo-500 opacity-75 md:hidden" />
                <span className="relative">
                  <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Amplifying Community Voices
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-indigo-500/30 to-purple-500/30 md:right-0 md:left-auto" />
                </span>
              </span>
              <span className="text-gray-900"> for Inclusive Development</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600"
            >
              We amplify community voices to influence policies and promote
              accountability, ensuring inclusive development that addresses the
              real needs and priorities of the communities we serve.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {governanceStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                ></div>
                <div className="relative z-10 p-6 text-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    whileHover={{ scale: 1.1 }}
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br ${stat.color} text-white shadow-lg`}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                    <span className="block">{stat.number}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 md:text-base">
                    {stat.label}
                  </p>
                  <p className="mx-auto mt-2 text-xs text-gray-500 md:text-sm">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid gap-6 md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg">
                    <Megaphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Community Dialogue
                  </h3>
                </div>
                <p className="mb-4 text-gray-600">
                  Regular community dialogue forums that provide platforms for
                  community members to voice concerns, discuss priorities, and
                  engage in meaningful discussions about service delivery.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                    <span className="text-sm">40+ dialogue forums held</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                    <span className="text-sm">Service delivery concerns addressed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                    <span className="text-sm">Community-driven solutions</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Policy Advocacy
                  </h3>
                </div>
                <p className="mb-4 text-gray-600">
                  Strategic engagement with local leaders and policymakers to
                  advocate for community priorities, influence policy decisions,
                  and promote accountability in governance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-blue-500" />
                    <span className="text-sm">30 local leaders engaged</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-blue-500" />
                    <span className="text-sm">Advocacy on community priorities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-blue-500" />
                    <span className="text-sm">Policy influence & accountability</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
