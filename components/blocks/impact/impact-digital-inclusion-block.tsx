"use client"

import { motion, useInView } from "framer-motion"
import { Cpu, GraduationCap, Monitor, Users } from "lucide-react"
import { useRef } from "react"

export const ImpactDigitalInclusionBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const digitalStats = [
    {
      id: "digital_literacy",
      number: "5000+",
      label: "Children & Youth Trained",
      description: "Basic digital literacy skills",
      icon: <Monitor className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "ai_literacy",
      number: "4000+",
      label: "AI Literacy Skills",
      description: "Artificial intelligence training",
      icon: <Cpu className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "learning_spaces",
      number: "1",
      label: "Community Learning Space",
      description: "Equipped with digital materials",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "from-green-500 to-teal-500",
    },
    {
      id: "caregivers_oriented",
      number: "4000+",
      label: "Caregivers Oriented",
      description: "Supporting children's digital learning",
      icon: <Users className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
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
              className="mx-auto mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-50 px-6 py-2 backdrop-blur-sm"
            >
              <Cpu className="mr-2 h-5 w-5 animate-pulse text-blue-500" />
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
                Digital Inclusion
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
                <span className="absolute -top-2 -left-2 hidden h-3 w-3 animate-ping rounded-full bg-blue-500 opacity-75 md:block" />
                <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 animate-ping rounded-full bg-blue-500 opacity-75 md:hidden" />
                <span className="relative">
                  <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Promoting Learning
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-blue-500/30 to-cyan-500/30 md:right-0 md:left-auto" />
                </span>
              </span>
              <span className="text-gray-900"> & Digital Skills</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600"
            >
              Equipping children and youth for opportunities in a changing world
              through comprehensive digital literacy and AI skills training.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {digitalStats.map((stat, index) => (
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
              className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Digital Literacy Programs
                  </h3>
                </div>
                <p className="mb-4 text-gray-600">
                  Comprehensive training programs teaching children and youth
                  essential digital skills for the modern world, including basic
                  computer operations, internet navigation, and digital safety.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-sm">Basic computer operations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-sm">Internet navigation & safety</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-sm">Digital communication tools</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    AI Skills Development
                  </h3>
                </div>
                <p className="mb-4 text-gray-600">
                  Cutting-edge artificial intelligence literacy programs preparing
                  youth for future opportunities in technology and innovation,
                  fostering critical thinking and problem-solving skills.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                    <span className="text-sm">AI fundamentals & concepts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                    <span className="text-sm">Machine learning basics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                    <span className="text-sm">Ethical AI usage</span>
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
