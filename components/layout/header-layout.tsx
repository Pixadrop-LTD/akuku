"use client"

import { Assets } from "@/config/assets"
import { Routes } from "@/config/routes"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface HeaderProps {
  onPartnerModalOpen?: () => void
}

export const HeaderLayout = ({}: HeaderProps) => {
  const [open, setOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const { t } = useLocale()
  const pathname = usePathname()

  const isActivePath = (href: string) => {
    if (!pathname) return false

    const normalize = (path: string) => {
      if (!path) return "/"
      if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1)
      return path
    }

    const current = normalize(pathname)
    const target = normalize(href)

    if (target === Routes.header.home) {
      return current === "/" || current === target
    }

    return current === target || current.startsWith(`${target}/`)
  }

  const desktopNavItems = [
    { href: Routes.header.home, label: t.header.navigation.home },
    { href: Routes.header.who, label: t.header.navigation.who_we_are },
    { href: Routes.header.impact, label: t.header.navigation.our_impact },
    { href: Routes.header.projects, label: t.header.navigation.projects },
    {
      href: Routes.header.collaboration,
      label: t.header.navigation.collaboration,
    },
  ]

  const mobileNavItems = [
    { href: Routes.header.home, label: t.header.mobile_navigation.home },
    {
      href: Routes.header.who,
      label: t.header.mobile_navigation.who_we_are,
    },
    {
      href: Routes.header.impact,
      label: t.header.mobile_navigation.our_impact_domains,
    },
    {
      href: Routes.header.projects,
      label: t.header.mobile_navigation.strategic_projects,
    },
    {
      href: Routes.header.collaboration,
      label: t.header.mobile_navigation.partners_collaboration,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header>
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-4 left-1/2 z-50 w-11/12 max-container-2xl -translate-x-1/2 transform rounded-full px-6 shadow-lg",
          atTop
            ? "bg-linear-to-r from-secondary/90 to-primary/90 backdrop-blur-sm"
            : "bg-linear-to-r from-secondary to-primary shadow-lg"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 w-full items-center">
            <div className="flex h-full items-center">
              {/* Logo */}

              <Link
                href={Routes.header.home}
                className="mr-4 inline-flex shrink-0 items-center gap-3 text-xl font-semibold tracking-wider text-white"
              >
                <span className="relative h-9 w-9 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                  <Image
                    src={Assets.logo}
                    alt={t.header.brand_name}
                    fill
                    sizes="36px"
                    className="object-contain p-1"
                    priority
                  />
                </span>
                {t.header.brand_name}
              </Link>
            </div>

            {/* Centered Menu (desktop) */}
            <div className="hidden flex-1 justify-center space-x-8 md:flex">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                  className={cn(
                    "relative font-medium text-white transition duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:content-[''] hover:text-white hover:after:scale-x-100",
                    isActivePath(item.href) && "font-semibold after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button (desktop) */}
            <div className="ml-auto hidden md:flex">
              {/* Updated CTA Button (desktop) */}
              <a
                href={`tel:${t.contact.phone}`}
                className="group inline-flex transform cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-secondary to-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Phone className="mr-2 inline-block h-5 w-5" />
                <span>{t.contact.phone}</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
              className="ml-auto text-white transition-transform duration-300 focus:outline-none md:hidden"
            >
              {!open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 6h14"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 12h10"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18h14"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {open && (
          <div
            className={`absolute top-full left-0 z-40 mt-2 w-full animate-in overflow-hidden rounded-2xl transition-all duration-200 ease-out fade-in slide-in-from-top-2 md:hidden ${atTop ? "bg-secondary/95 backdrop-blur-sm" : "bg-secondary"}`}
          >
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium text-white transition duration-300 hover:bg-primary/20",
                    isActivePath(item.href) && "bg-primary/20 font-semibold"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={Routes.header.collaboration}
                onClick={() => setOpen(false)}
                className="group block w-full transform rounded-full bg-linear-to-r from-primary to-accent px-5 py-3 text-center font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <span>{t.header.cta.get_involved}</span>
                <svg
                  className="ml-1 inline-block h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </motion.nav>
    </header>
  )
}
