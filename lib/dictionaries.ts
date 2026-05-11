import 'server-only'

const dictionaries = {
  en: () => import('../locale/en.json').then((module) => module.default),
  fr: () => import('../locale/fr.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
