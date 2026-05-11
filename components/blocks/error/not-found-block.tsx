"use client"

import { Routes } from "@/config/routes"
import { useLocale } from "@/hooks/use-locale"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

const NotFoundBlock = () => {
  const { translations } = useLocale()

  return (
    <section className="relative mx-auto flex min-h-[70dvh] w-full max-w-5xl items-center justify-center px-6 py-20">
      <div className="relative w-full overflow-hidden rounded-3xl border border-primary/10 bg-white/70 p-8 backdrop-blur-sm sm:p-12">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="relative">
          <p className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
            {translations.error.not_found.badge}
          </p>

          <h1 className="font-headings mt-4 text-3xl font-bold tracking-tight text-balance text-neutral-900 sm:text-4xl">
            {translations.error.not_found.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-pretty text-neutral-600 sm:text-base">
            {translations.error.not_found.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={Routes.header.home}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-secondary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto"
            >
              <Home className="h-4 w-4" />
              {translations.error.not_found.actions.home}
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/60 px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              {translations.error.not_found.actions.back}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundBlock
