"use client"

import { ContactSheet } from "@/components/sheets/contact-sheet"
import { ContactSheetProviderContext } from "@/hooks/use-contact-sheet"
import {
  type ContactFormValues,
  type ContactSendResult,
  contactFormSchema,
} from "@/lib/contact"
import * as React from "react"

const safeJson = async <T,>(res: Response): Promise<T | null> => {
  try {
    return (await res.json()) as T
  } catch {
    return null
  }
}

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false)
  const [sendStatus, setSendStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [sendError, setSendError] = React.useState<string | null>(null)

  const openSheet = React.useCallback(() => setOpen(true), [])
  const closeSheet = React.useCallback(() => setOpen(false), [])
  const toggleSheet = React.useCallback(() => setOpen((v) => !v), [])

  const sendContactEmail = React.useCallback(
    async (values: ContactFormValues): Promise<ContactSendResult> => {
      setSendStatus("sending")
      setSendError(null)

      const parsed = contactFormSchema.safeParse(values)
      if (!parsed.success) {
        const first = parsed.error.issues[0]?.message ?? "Invalid form values"
        setSendStatus("error")
        setSendError(first)
        return { ok: false, error: first }
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(parsed.data),
        })

        if (!res.ok) {
          const data = await safeJson<{ error?: string }>(res)
          const message = data?.error ?? "Failed to send message"
          setSendStatus("error")
          setSendError(message)
          return { ok: false, error: message }
        }

        setSendStatus("success")
        return { ok: true }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Network error"
        setSendStatus("error")
        setSendError(message)
        return { ok: false, error: message }
      }
    },
    []
  )

  const value = React.useMemo(
    () => ({
      open,
      openSheet,
      closeSheet,
      toggleSheet,
      sendStatus,
      sendError,
      sendContactEmail,
    }),
    [
      open,
      openSheet,
      closeSheet,
      toggleSheet,
      sendStatus,
      sendError,
      sendContactEmail,
    ]
  )

  return (
    <ContactSheetProviderContext value={value}>
      {children}
      <ContactSheet />
    </ContactSheetProviderContext>
  )
}
