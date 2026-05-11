"use client"

import { useLocale } from "@/hooks/use-locale"
import { motion, useInView } from "framer-motion"
import { BookOpen, GraduationCap, Users } from "lucide-react"
import { useRef } from "react"

export const ImpactEducationBlock = () => {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section ref={containerRef} className="relative overflow-hidden py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-container-2xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-container-2xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Education Impact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary-50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-linear-to-r from-blue-500 to-indigo-600">
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="h-16 w-16 text-white"
                  >
                    <BookOpen className="h-8 w-8" />
                  </motion.div>
                </div>
                <div className="p-8">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-linear-to-r from-blue-500 to-indigo-600"></div>
                  <h3 className="font-headings mb-3 text-2xl font-bold text-gray-900">
                    {t.home.programmes.section_title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {t.home.programmes.description}
                  </p>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <GraduationCap className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-blue-500" />
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          {t.home.programmes.schooled.title}
                        </h4>
                        <p className="text-sm leading-relaxed">
                          {t.home.programmes.schooled.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-blue-500" />
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          {
                            t.impact.education.strategic_scholarship_linkages
                              .title
                          }
                        </h4>
                        <p className="text-sm leading-relaxed">
                          {
                            t.impact.education.strategic_scholarship_linkages
                              .description
                          }
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                            <span>
                              {
                                t.impact.education
                                  .strategic_scholarship_linkages.scholarships
                                  .equity_bank
                              }
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                            <span>
                              {
                                t.impact.education
                                  .strategic_scholarship_linkages.scholarships
                                  .elimu
                              }
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="group inline-flex items-center font-medium text-primary-600 transition-colors duration-300"
                  >
                    <span className="relative">
                      {t.home.programmes.view_all}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Healthcare Impact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent-50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-linear-to-r from-green-500 to-teal-600">
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="h-16 w-16 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M17 20H7m10 0v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div className="p-8">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-linear-to-r from-green-500 to-teal-600"></div>
                  <h3 className="font-headings mb-3 text-2xl font-bold text-gray-900">
                    {t.impact.education.healthcare.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {t.impact.education.healthcare.description}
                  </p>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Medical Camps
                        </h4>
                        <p className="text-sm leading-relaxed">
                          Regular health screening camps providing free medical
                          check-ups, vaccinations, and health education to
                          underserved communities.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M17 20H7m10 0v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Maternal Health
                        </h4>
                        <p className="text-sm leading-relaxed">
                          Comprehensive maternal and child health programs
                          focusing on prenatal care, safe delivery, and
                          postnatal support.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Health Education
                        </h4>
                        <p className="text-sm leading-relaxed">
                          Community workshops and training sessions on
                          nutrition, hygiene, disease prevention, and healthy
                          lifestyle practices.
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="group inline-flex items-center font-medium text-accent-600 transition-colors duration-300"
                  >
                    <span className="relative">
                      {t.impact.education.healthcare.learn_more}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Community Impact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl md:col-span-2 lg:col-span-1"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-linear-to-r from-purple-500 to-pink-600">
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="h-16 w-16 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div className="p-8">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-linear-to-r from-purple-500 to-pink-600"></div>
                  <h3 className="font-headings mb-3 text-2xl font-bold text-gray-900">
                    {t.impact.education.community.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {t.impact.education.community.description}
                  </p>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Youth Empowerment
                        </h4>
                        <p className="text-sm leading-relaxed">
                          Leadership development programs and skills training
                          for young people to become active change agents in
                          their communities.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Economic Development
                        </h4>
                        <p className="text-sm leading-relaxed">
                          Microfinance initiatives and vocational training
                          programs to create sustainable livelihood
                          opportunities for community members.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Social Inclusion
                        </h4>
                        <p className="text-sm leading-relaxed">
                          Programs promoting gender equality, disability
                          inclusion, and protection of vulnerable groups in
                          community development.
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="group inline-flex items-center font-medium text-purple-600 transition-colors duration-300"
                  >
                    <span className="relative">
                      {t.impact.education.community.learn_more}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
