"use client"

import { Assets } from "@/config/assets"
import { Routes } from "@/config/routes"
import Social from "@/config/social"
import { useLocale } from "@/hooks/use-locale"
import { usePartnerModal } from "@/hooks/use-partner-modal"
import {
  NewsletterFormValues,
  NewsletterSendResult,
  newsletterFormSchema,
} from "@/lib/newsletter"
import { motion } from "framer-motion"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

export const FooterLayout = () => {
  const { t } = useLocale()
  const { openModal } = usePartnerModal()

  const [newsletterEmail, setNewsletterEmail] = React.useState("")
  const [newsletterStatus, setNewsletterStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [newsletterError, setNewsletterError] = React.useState<string | null>(
    null
  )

  const isNewsletterSending = newsletterStatus === "sending"

  const safeJson = async <T,>(res: Response): Promise<T | null> => {
    try {
      return (await res.json()) as T
    } catch {
      return null
    }
  }

  const sendNewsletter = React.useCallback(
    async (values: NewsletterFormValues): Promise<NewsletterSendResult> => {
      setNewsletterStatus("sending")
      setNewsletterError(null)

      const parsed = newsletterFormSchema.safeParse(values)
      if (!parsed.success) {
        const first = parsed.error.issues[0]?.message ?? "Invalid email"
        setNewsletterStatus("error")
        setNewsletterError(first)
        return { ok: false, error: first }
      }

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(parsed.data),
        })

        if (!res.ok) {
          const data = await safeJson<{ error?: string }>(res)
          const message = data?.error ?? "Failed to subscribe"
          setNewsletterStatus("error")
          setNewsletterError(message)
          return { ok: false, error: message }
        }

        setNewsletterStatus("success")
        return { ok: true }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Network error"
        setNewsletterStatus("error")
        setNewsletterError(message)
        return { ok: false, error: message }
      }
    },
    []
  )

  const onNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await sendNewsletter({ email: newsletterEmail })
    if (result.ok) {
      setNewsletterEmail("")
      setTimeout(() => setNewsletterStatus("idle"), 2000)
    }
  }

  const socialItems = [
    {
      key: "facebook",
      href: Social.facebook,
      ariaLabel: "Facebook",
      icon: (
        <svg
          className="h-5 w-5 text-neutral transition group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22 12c0-5.5228-4.4772-10-10-10S2 6.4772 2 12c0 5.0034 3.6576 9.1271 8.438 9.878V15.468h-2.54V12h2.54V9.797c0-2.507 1.4927-3.89 3.7774-3.89 1.0942 0 2.2386.195 2.2386.195v2.463h-1.2605c-1.2431 0-1.6315.772-1.6315 1.564V12h2.773l-.443 3.468h-2.33v6.41C18.3424 21.1271 22 17.0034 22 12Z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      href: Social.linkedin,
      ariaLabel: "LinkedIn",
      icon: (
        <svg
          className="h-5 w-5 text-neutral transition group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      key: "twitter",
      href: Social.twitter,
      ariaLabel: "Twitter",
      icon: (
        <svg
          className="h-5 w-5 text-neutral transition group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.633 7.997c-.221-.158-4.15-2.996-7.812-2.996-3.663 0-7.591 2.838-7.812 2.996-.574.411-1.188 1.387-1.188 2.969 0 1.582.614 2.558 1.188 2.969.221.158 4.15 2.996 7.812 2.996 3.663 0 7.591-2.838 7.812-2.996.574-.411 1.188-1.387 1.188-2.969 0-1.582-.614-2.558-1.188-2.969zm-10.312 6.967c-.482.344-4.028 2.92-5.5 3.264 0 1.232.037 2.433.096 3.639.483.344 4.029 2.92 5.501 3.264-.059-1.239-.097-2.439-.097-3.639zm1.5 3.639c-.963-.688-2.021-1.821-3.057-3.057 1.035-1.237 2.093-2.369 3.057-3.057.963-.688 2.021-1.821 3.057-3.057-1.035-1.237-2.093-2.369-3.057-3.057-1.444-1.032-2.841-1.715-4.138-2.047 1.567.417 3.172.852 4.795 1.305 1.567.436 3.172.89 4.795 1.305 1.444 1.032 2.841 1.715 4.138 2.047-1.622 1.941-3.226 3.379-4.795 4.316-1.622 1.941-3.226 3.379-4.795 4.316zm10.5-8.024c-.482.344-4.028 2.92-5.5 3.264 0-1.232.037-2.433.096-3.639.483-.344 4.029-2.92 5.501-3.264-.059 1.239-.097 2.439-.097 3.639z" />
        </svg>
      ),
    },
    {
      key: "instragram",
      href: Social.instragram,
      ariaLabel: "Instagram",
      icon: (
        <svg
          className="h-5 w-5 text-neutral transition group-hover:text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.633 7.997c-.221-.158-4.15-2.996-7.812-2.996-3.663 0-7.591 2.838-7.812 2.996-.574.411-1.188 1.387-1.188 2.969 0 1.582.614 2.558 1.188 2.969.221.158 4.15 2.996 7.812 2.996 3.663 0 7.591-2.838 7.812-2.996.574-.411 1.188-1.387 1.188-2.969 0-1.582-.614-2.558-1.188-2.969zm-10.312 6.967c-.482.344-4.028 2.92-5.5 3.264 0 1.232.037 2.433.096 3.639.483.344 4.029 2.92 5.501 3.264-.059-1.239-.097-2.439-.097-3.639zm1.5 3.639c-.963-.688-2.021-1.821-3.057-3.057 1.035-1.237 2.093-2.369 3.057-3.057.963-.688 2.021-1.821 3.057-3.057-1.035-1.237-2.093-2.369-3.057-3.057-1.444-1.032-2.841-1.715-4.138-2.047 1.567.417 3.172.852 4.795 1.305 1.567.436 3.172.89 4.795 1.305 1.444 1.032 2.841 1.715 4.138 2.047-1.622 1.941-3.226 3.379-4.795 4.316-1.622 1.941-3.226 3.379-4.795 4.316zm10.5-8.024c-.482.344-4.028 2.92-5.5 3.264 0-1.232.037-2.433.096-3.639.483-.344 4.029-2.92 5.501-3.264-.059 1.239-.097 2.439-.097 3.639z" />
        </svg>
      ),
    },
    {
      key: "youtube",
      href: Social.youtube,
      ariaLabel: "YouTube",
      icon: (
        <svg
          className="h-5 w-5 text-neutral transition group-hover:text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.812 5.418c-.221-.158-4.15-2.996-7.812-2.996-3.663 0-7.591 2.838-7.812 2.996-.574.411-1.188 1.387-1.188 2.969 0 1.582.614 2.558 1.188 2.969.221.158 4.15 2.996 7.812 2.996 3.663 0 7.591-2.838 7.812-2.996.574-.411 1.188-1.387 1.188-2.969 0-1.582-.614-2.558-1.188-2.969zm-10.312 6.967c-.482.344-4.028 2.92-5.5 3.264 0 1.232.037 2.433.096 3.639.483.344 4.029 2.92 5.501 3.264-.059-1.239-.097-2.439-.097-3.639zm1.5 3.639c-.963-.688-2.021-1.821-3.057-3.057 1.035-1.237 2.093-2.369 3.057-3.057.963-.688 2.021-1.821 3.057-3.057-1.035-1.237-2.093-2.369-3.057-3.057-1.444-1.032-2.841-1.715-4.138-2.047 1.567.417 3.172.852 4.795 1.305 1.567.436 3.172.89 4.795 1.305 1.444 1.032 2.841 1.715 4.138 2.047-1.622 1.941-3.226 3.379-4.795 4.316-1.622 1.941-3.226 3.379-4.795 4.316zm10.5-8.024c-.482.344-4.028 2.92-5.5 3.264 0-1.232.037-2.433.096-3.639.483-.344 4.029-2.92 5.501-3.264-.059 1.239-.097 2.439-.097 3.639z" />
        </svg>
      ),
    },
    {
      key: "tiktok",
      href: Social.tiktok,
      ariaLabel: "TikTok",
      icon: (
        <svg
          className="h-5 w-5 text-neutral transition group-hover:text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.749 2h3.015c.186 1.374.956 2.512 2.07 3.27 1.072.744 2.415 1.18 3.916 1.195v3.067c-1.654-.054-3.2-.46-4.574-1.195-.525-.28-1.016-.614-1.469-.996v7.126c0 4.019-3.26 7.281-7.282 7.281-4.02 0-7.281-3.262-7.281-7.281 0-4.02 3.261-7.282 7.281-7.282.154 0 .308.006.46.016v3.165a4.134 4.134 0 0 0-.46-.026 4.116 4.116 0 1 0 4.116 4.127V2z" />
        </svg>
      ),
    },
  ].filter((item) => typeof item.href === "string" && item.href.length > 0)

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-neutral-900 pt-20 pb-12 text-white"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBvcGFjaXR5PSIwLjA1Ij48cGF0dGVybiBpZD0icGF0dGVybi1iYXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxwYXRoIGQ9Ik0wIDBoMTB2MTBIMHpNMjAgMjBoMTB2MTBIMjB6TTQwIDBoMTB2MTBINDB6TTAgMzBoMTB2MTBIMHpNMjAgNDBoMTB2MTBIMjB6IiBmaWxsPSJ3aGl0ZSIvPjwvcGF0dGVybj48L3N2Zz4=')]"></div>

      <div className="relative z-10 mx-auto max-container-2xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {/* Brand & Tagline */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-16 w-16 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                <Image
                  src={Assets.logo}
                  alt={t.footer.brand.name}
                  fill
                  sizes="60px"
                  className="object-contain p-1"
                />
              </span>
              <h2 className="font-headings text-2xl font-bold tracking-wide">
                {t.footer.brand.name}
              </h2>
            </div>
            <p className="mt-4 max-w-xs text-sm/relaxed opacity-90">
              {t.footer.brand.tagline}
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {socialItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.ariaLabel}
                  className="group transform rounded-full bg-gray-200/60 p-2 transition duration-300 hover:scale-110 hover:bg-accent"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headings relative mb-5 text-lg font-semibold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-8 after:bg-accent after:content-['']">
              {t.footer.sections.quick_links.title}
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href={Routes.footer.quick.about}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.footer.sections.quick_links.links.about_us}
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.footer.quick.projects}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.common.projects}
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.footer.quick.impact}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.footer.sections.quick_links.links.impact}
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.footer.quick.collaboration}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.common.collaborations}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-headings relative mb-5 text-lg font-semibold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-8 after:bg-accent after:content-['']">
              {t.footer.sections.insights.title}
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href={Routes.footer.insights.advocacy}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.footer.sections.insights.links.advocacy}
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.footer.insights.partnerships}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.footer.sections.insights.links.partnerships}
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.footer.insights.giving}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.footer.sections.insights.links.legacy_giving}
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.footer.insights.blog}
                  className="transition duration-200 hover:text-accent"
                >
                  {t.footer.sections.insights.links.blog}
                </Link>
              </li>

              <li>
                <button
                  onClick={openModal}
                  className="inline-flex cursor-pointer items-center font-semibold text-accent transition duration-200 hover:text-accent/80"
                >
                  {t.footer.sections.insights.links.become_a_partner}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 xl:col-span-1">
            <h3 className="font-headings relative mb-5 text-lg font-semibold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-8 after:bg-accent after:content-['']">
              {t.footer.sections.newsletter.title}
            </h3>
            <p className="mt-4 text-sm/relaxed opacity-90">
              {t.footer.sections.newsletter.description}
            </p>
            <form
              className="mt-6 space-y-4"
              noValidate
              onSubmit={onNewsletterSubmit}
            >
              <div
                className={`flex flex-col gap-3 ${
                  isNewsletterSending ? "opacity-60" : ""
                }`}
              >
                <input
                  type="email"
                  placeholder={t.footer.sections.newsletter.email_placeholder}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-300 transition duration-200 focus:border-accent focus:ring-2 focus:ring-accent/60 focus:outline-none disabled:cursor-not-allowed"
                  required
                  aria-label="Email for newsletter"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={isNewsletterSending}
                />

                <button
                  type="submit"
                  disabled={isNewsletterSending}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-br from-accent to-secondary/60 px-5 py-3 text-sm font-semibold tracking-wide text-secondary-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed"
                >
                  {isNewsletterSending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : null}
                  {t.footer.sections.newsletter.subscribe_button}
                </button>
              </div>

              {newsletterStatus === "error" && newsletterError && (
                <p className="text-xs text-destructive">{newsletterError}</p>
              )}

              {newsletterStatus === "success" && (
                <p className="text-xs text-white/80">
                  {t.footer.sections.newsletter.success}
                </p>
              )}

              <p className="text-xs opacity-70">
                {t.footer.sections.newsletter.privacy_note}
              </p>
            </form>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <h4 className="font-headings mb-6 text-center text-sm font-semibold opacity-80">
            {t.footer.partners.title}
          </h4>
          <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale transition duration-300 hover:grayscale-0">
            {/* Inline partner logos as SVG to ensure they always load */}
            <div className="h-12 w-auto text-gray-200">
              <svg
                className="h-full w-auto"
                viewBox="0 0 120 40"
                role="img"
                aria-labelledby="logo-unicef"
              >
                <title id="logo-unicef">UNICEF</title>
                <rect
                  width="120"
                  height="40"
                  rx="6"
                  fill="currentColor"
                  opacity="0.15"
                />
                <text
                  x="60"
                  y="26"
                  textAnchor="middle"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  UNICEF
                </text>
              </svg>
            </div>
            <div className="h-12 w-auto text-gray-200">
              <svg
                className="h-full w-auto"
                viewBox="0 0 160 40"
                role="img"
                aria-labelledby="logo-stc"
              >
                <title id="logo-stc">Save the Children</title>
                <rect
                  width="160"
                  height="40"
                  rx="6"
                  fill="currentColor"
                  opacity="0.15"
                />
                <text
                  x="80"
                  y="26"
                  textAnchor="middle"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="14"
                  fill="currentColor"
                  opacity="0.8"
                >
                  Save the Children
                </text>
              </svg>
            </div>
            <div className="h-12 w-auto text-gray-200">
              <svg
                className="h-full w-auto"
                viewBox="0 0 140 40"
                role="img"
                aria-labelledby="logo-wv"
              >
                <title id="logo-wv">World Vision</title>
                <rect
                  width="140"
                  height="40"
                  rx="6"
                  fill="currentColor"
                  opacity="0.15"
                />
                <text
                  x="70"
                  y="26"
                  textAnchor="middle"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  World Vision
                </text>
              </svg>
            </div>
            <div className="h-12 w-auto text-gray-200">
              <svg
                className="h-full w-auto"
                viewBox="0 0 150 40"
                role="img"
                aria-labelledby="logo-plan"
              >
                <title id="logo-plan">Plan International</title>
                <rect
                  width="150"
                  height="40"
                  rx="6"
                  fill="currentColor"
                  opacity="0.15"
                />
                <text
                  x="75"
                  y="26"
                  textAnchor="middle"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="14"
                  fill="currentColor"
                  opacity="0.8"
                >
                  Plan International
                </text>
              </svg>
            </div>
            <div className="h-12 w-auto text-gray-200">
              <svg
                className="h-full w-auto"
                viewBox="0 0 120 40"
                role="img"
                aria-labelledby="logo-irc"
              >
                <title id="logo-irc">Red Cross</title>
                <rect
                  width="120"
                  height="40"
                  rx="6"
                  fill="currentColor"
                  opacity="0.15"
                />
                <text
                  x="60"
                  y="26"
                  textAnchor="middle"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  Red Cross
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/70 md:flex-row">
          <p>{t.footer.copyright.text}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={Routes.footer.terms.policy}
              className="transition duration-200 hover:text-accent"
            >
              {t.footer.copyright.links.privacy_policy}
            </Link>
            <Link
              href={Routes.footer.terms.conditions}
              className="transition duration-200 hover:text-accent"
            >
              {t.footer.copyright.links.terms_of_service}
            </Link>
            <Link
              href={Routes.footer.terms.cookie}
              className="transition duration-200 hover:text-accent"
            >
              {t.footer.copyright.links.cookie_policy}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      ></div>
    </motion.footer>
  )
}
