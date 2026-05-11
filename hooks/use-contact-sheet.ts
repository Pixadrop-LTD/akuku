"use client"

import {
  type ContactFormValues,
  type ContactSendResult,
} from "@/lib/contact"
import * as React from "react"

export type ContactSheetContextValue = {
  open: boolean
  openSheet: () => void
  closeSheet: () => void
  toggleSheet: () => void
  sendStatus: "idle" | "sending" | "success" | "error"
  sendError: string | null
  sendContactEmail: (values: ContactFormValues) => Promise<ContactSendResult>
}

const ContactSheetContext = React.createContext<ContactSheetContextValue | null>(
  null
)

export const ContactSheetProviderContext = ContactSheetContext.Provider

export const useContactSheet = (): ContactSheetContextValue => {
  const ctx = React.useContext(ContactSheetContext)
  if (!ctx) {
    throw new Error("useContactSheet must be used within ContactProvider")
  }
  return ctx
}
