"use client"

import { type PartnerFormValues, type PartnerSendResult } from "@/lib/partner"
import * as React from "react"

export type PartnerModalContextValue = {
  open: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
  sendStatus: "idle" | "sending" | "success" | "error"
  sendError: string | null
  sendPartnerInquiry: (values: PartnerFormValues) => Promise<PartnerSendResult>
}

const PartnerModalContext =
  React.createContext<PartnerModalContextValue | null>(null)

export const PartnerModalProviderContext = PartnerModalContext.Provider

export const usePartnerModal = (): PartnerModalContextValue => {
  const ctx = React.useContext(PartnerModalContext)
  if (!ctx) {
    throw new Error("usePartnerModal must be used within PartnerProvider")
  }
  return ctx
}
