"use client"

import { useParams } from "next/navigation"
import enTranslations from "../locale/en.json"
import frTranslations from "../locale/fr.json"

type Locale = "en" | "fr"
type Translations = typeof enTranslations

// Type guard
const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v)

// Non-generic deep merge on unknown
const deepMergeUnknown = (base: unknown, override?: unknown): unknown => {
  if (override === undefined) return base
  if (Array.isArray(base)) return override ?? base
  if (isObject(base) && isObject(override)) {
    const out: Record<string, unknown> = { ...base }
    for (const key of Object.keys(override)) {
      out[key] = deepMergeUnknown(base[key], override[key])
    }
    return out
  }
  return override ?? base
}

export const useLocale = () => {
  const params = useParams()
  const locale = (params.lang as Locale) || "en"

  // Use it and cast to the canonical Translations type
  const translations: Translations =
    locale === "fr"
      ? (deepMergeUnknown(enTranslations, frTranslations) as Translations)
      : enTranslations

  return {
    locale,
    translations,
    t: translations,
  }
}