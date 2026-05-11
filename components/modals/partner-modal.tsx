"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLocale } from "@/hooks/use-locale"
import { usePartnerModal } from "@/hooks/use-partner-modal"
import { PartnerFormValues, partnerFormSchema } from "@/lib/partner"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  Building2,
  Handshake,
  LoaderCircle,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react"
import * as React from "react"

const createDefaultValues = (): PartnerFormValues => ({
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  role: "",
  partnershipType: "co_implementation",
  interestAreas: ["healthy"],
  message: "",
  consent: false,
})

export const PartnerModal = (): React.ReactElement => {
  const { t } = useLocale()
  const { open, closeModal, sendStatus, sendError, sendPartnerInquiry } =
    usePartnerModal()

  const isSending = sendStatus === "sending"

  const [values, setValues] = React.useState<PartnerFormValues>(() =>
    createDefaultValues()
  )

  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<keyof PartnerFormValues, string>>
  >({})

  const update = <K extends keyof PartnerFormValues>(
    key: K,
    value: PartnerFormValues[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const toggleInterestArea = (
    area: PartnerFormValues["interestAreas"][number]
  ) => {
    setValues((v) => {
      const has = v.interestAreas.includes(area)
      const next = has
        ? v.interestAreas.filter((p) => p !== area)
        : [...v.interestAreas, area]
      return { ...v, interestAreas: next }
    })
  }

  const selectedAreas = values.interestAreas
    .map((a) => t.partner_modal.interest_areas[a])
    .filter(Boolean) as string[]

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsed = partnerFormSchema.safeParse(values)
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof PartnerFormValues, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof PartnerFormValues | undefined
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message
        }
      }
      setFieldErrors(nextErrors)
      return
    }

    const result = await sendPartnerInquiry(parsed.data)
    if (result.ok) {
      setValues(createDefaultValues())
      setTimeout(() => closeModal(), 900)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setFieldErrors({})
          closeModal()
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-h-[85vh] w-[760px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-background to-secondary/5 p-0 shadow-2xl"
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="flex max-h-[85vh] min-h-0 flex-col"
            >
              <DialogHeader className="gap-3 border-b border-border/60 px-6 pt-6 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <DialogTitle className="text-lg font-semibold tracking-tight">
                      {t.partner_modal.title}
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm">
                      {t.partner_modal.description}
                    </DialogDescription>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-full bg-primary/10 text-primary"
                    >
                      <Handshake className="h-4 w-4" />
                      {t.partner_modal.badge}
                    </Badge>
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-pointer"
                        disabled={isSending}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">{t.partner_modal.close}</span>
                      </Button>
                    </DialogClose>
                  </div>
                </div>

                {sendStatus === "error" && sendError && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {sendError}
                  </div>
                )}

                {sendStatus === "success" && (
                  <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary-foreground">
                    {t.partner_modal.success}
                  </div>
                )}
              </DialogHeader>

              <form
                onSubmit={onSubmit}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div
                  className={cn(
                    "grid min-h-0 flex-1 gap-6 overflow-y-auto px-6 pt-5 pb-6",
                    isSending && "opacity-60"
                  )}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="partner-fullName">
                        {t.partner_modal.fields.full_name.label}
                      </Label>
                      <Input
                        id="partner-fullName"
                        value={values.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder={
                          t.partner_modal.fields.full_name.placeholder
                        }
                        disabled={isSending}
                      />
                      {fieldErrors.fullName && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="partner-email">
                        {t.partner_modal.fields.email.label}
                      </Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="partner-email"
                          className="pl-9"
                          value={values.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder={t.partner_modal.fields.email.placeholder}
                          disabled={isSending}
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="partner-organization">
                        {t.partner_modal.fields.organization.label}
                      </Label>
                      <div className="relative">
                        <Building2 className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="partner-organization"
                          className="pl-9"
                          value={values.organization}
                          onChange={(e) =>
                            update("organization", e.target.value)
                          }
                          placeholder={
                            t.partner_modal.fields.organization.placeholder
                          }
                          disabled={isSending}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="partner-role">
                        {t.partner_modal.fields.role.label}
                      </Label>
                      <Input
                        id="partner-role"
                        value={values.role}
                        onChange={(e) => update("role", e.target.value)}
                        placeholder={t.partner_modal.fields.role.placeholder}
                        disabled={isSending}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="partner-phone">
                        {t.partner_modal.fields.phone.label}
                      </Label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="partner-phone"
                          className="pl-9"
                          value={values.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder={t.partner_modal.fields.phone.placeholder}
                          disabled={isSending}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label>
                        {t.partner_modal.fields.partnership_type.label}
                      </Label>
                      <Select
                        value={values.partnershipType}
                        onValueChange={(v) =>
                          update(
                            "partnershipType",
                            v as PartnerFormValues["partnershipType"]
                          )
                        }
                        disabled={isSending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              t.partner_modal.fields.partnership_type
                                .placeholder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            [
                              "co_implementation",
                              "program_funding",
                              "technical_assistance",
                              "in_kind",
                              "impact_investing",
                            ] as const
                          ).map((value) => (
                            <SelectItem key={value} value={value}>
                              {t.partner_modal.partnership_types[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldErrors.partnershipType && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.partnershipType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label>
                        {t.partner_modal.fields.interest_areas.label}
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        {t.partner_modal.fields.interest_areas.helper}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {(
                        [
                          "healthy",
                          "schooled",
                          "stable",
                          "apiculture",
                          "mobility",
                        ] as const
                      ).map((area) => {
                        const active = values.interestAreas.includes(area)
                        const disabled =
                          !active && values.interestAreas.length >= 3

                        return (
                          <button
                            key={area}
                            type="button"
                            disabled={disabled || isSending}
                            onClick={() =>
                              toggleInterestArea(
                                area as PartnerFormValues["interestAreas"][number]
                              )
                            }
                            className={cn(
                              "w-full rounded-2xl border px-3 py-2 text-left text-xs font-semibold transition-all",
                              active
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-border/70 bg-background text-foreground hover:bg-secondary/10",
                              (disabled || isSending) && "opacity-50"
                            )}
                          >
                            {t.partner_modal.interest_areas[area]}
                          </button>
                        )
                      })}
                    </div>

                    {selectedAreas.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {t.partner_modal.fields.interest_areas.selected_prefix}{" "}
                        {selectedAreas.join(", ")}
                      </p>
                    )}

                    {fieldErrors.interestAreas && (
                      <p className="text-xs text-destructive">
                        {fieldErrors.interestAreas}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="partner-message">
                      {t.partner_modal.fields.message.label}
                    </Label>
                    <Textarea
                      id="partner-message"
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={t.partner_modal.fields.message.placeholder}
                      className="min-h-28"
                      disabled={isSending}
                    />
                    {fieldErrors.message && (
                      <p className="text-xs text-destructive">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 p-4">
                      <Checkbox
                        id="partner-consent"
                        checked={values.consent}
                        onCheckedChange={(v) => update("consent", v === true)}
                        disabled={isSending}
                      />
                      <div className="grid gap-1">
                        <Label
                          htmlFor="partner-consent"
                          className="flex items-center gap-2"
                        >
                          <ShieldCheck className="h-4 w-4 text-secondary" />
                          {t.partner_modal.fields.consent.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t.partner_modal.fields.consent.helper}
                        </p>
                        {fieldErrors.consent && (
                          <p className="text-xs text-destructive">
                            {fieldErrors.consent}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "mt-auto border-t border-border/60 px-6 py-5",
                    isSending && "opacity-60"
                  )}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                      type="submit"
                      className={cn(
                        "min-w-40 cursor-pointer rounded-full bg-linear-to-r from-primary to-secondary px-6",
                        isSending && "cursor-not-allowed"
                      )}
                      disabled={isSending}
                    >
                      {isSending ? (
                        <span className="inline-flex items-center gap-2">
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          {t.partner_modal.submit}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          {t.partner_modal.submit}
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
