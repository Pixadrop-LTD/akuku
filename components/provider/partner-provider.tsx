"use client"

import { PartnerModal } from "@/components/modals/partner-modal"
import { PartnerModalProviderContext } from "@/hooks/use-partner-modal"
import {
  type PartnerFormValues,
  type PartnerSendResult,
  partnerFormSchema,
} from "@/lib/partner"
import * as React from "react"

const safeJson = async <T,>(res: Response): Promise<T | null> => {
  try {
    return (await res.json()) as T
  } catch {
    return null
  }
}

export const PartnerProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false)
  const [sendStatus, setSendStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [sendError, setSendError] = React.useState<string | null>(null)

  const openModal = React.useCallback(() => setOpen(true), [])
  const closeModal = React.useCallback(() => setOpen(false), [])
  const toggleModal = React.useCallback(() => setOpen((v) => !v), [])

  const sendPartnerInquiry = React.useCallback(
    async (values: PartnerFormValues): Promise<PartnerSendResult> => {
      setSendStatus("sending")
      setSendError(null)

      const parsed = partnerFormSchema.safeParse(values)
      if (!parsed.success) {
        const first = parsed.error.issues[0]?.message ?? "Invalid form values"
        setSendStatus("error")
        setSendError(first)
        return { ok: false, error: first }
      }

      try {
        const res = await fetch("/api/partner", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(parsed.data),
        })

        if (!res.ok) {
          const data = await safeJson<{ error?: string }>(res)
          const message = data?.error ?? "Failed to send partner inquiry"
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
      openModal,
      closeModal,
      toggleModal,
      sendStatus,
      sendError,
      sendPartnerInquiry,
    }),
    [
      open,
      openModal,
      closeModal,
      toggleModal,
      sendStatus,
      sendError,
      sendPartnerInquiry,
    ]
  )

  return (
    <PartnerModalProviderContext value={value}>
      {children}
      <PartnerModal />
    </PartnerModalProviderContext>
  )
}
