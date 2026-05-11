"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { useContactSheet } from "@/hooks/use-contact-sheet"
import { useLocale } from "@/hooks/use-locale"
import { ContactFormValues, contactFormSchema } from "@/lib/contact"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  LoaderCircle,
  Mail,
  MessageSquareText,
  Send,
  ShieldCheck,
  X,
} from "lucide-react"
import * as React from "react"

const createDefaultValues = (): ContactFormValues => ({
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  role: "",
  inquiryType: "general",
  programInterests: ["healthy"],
  message: "",
  consent: false,
})

export const ContactSheet = (): React.ReactElement => {
  const { t } = useLocale()
  const { open, closeSheet, sendStatus, sendError, sendContactEmail } =
    useContactSheet()

  const isSending = sendStatus === "sending"

  const [values, setValues] = React.useState<ContactFormValues>(() =>
    createDefaultValues()
  )

  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({})

  const update = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const toggleProgramInterest = (
    program: ContactFormValues["programInterests"][number]
  ) => {
    setValues((v) => {
      const has = v.programInterests.includes(program)
      const next = has
        ? v.programInterests.filter((p) => p !== program)
        : [...v.programInterests, program]
      return { ...v, programInterests: next }
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsed = contactFormSchema.safeParse(values)
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues | undefined
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message
        }
      }
      setFieldErrors(nextErrors)
      return
    }

    const result = await sendContactEmail(parsed.data)
    if (result.ok) {
      setValues(createDefaultValues())
      setTimeout(() => closeSheet(), 900)
    }
  }

  const selectedPrograms = values.programInterests
    .map((value) => t.contact_sheet.programs[value])
    .filter(Boolean) as string[]

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setFieldErrors({})
          closeSheet()
        }
      }}
    >
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn(
          "right-4! bottom-4! left-auto! w-[440px] max-w-[calc(100vw-2rem)] rounded-3xl border border-border/60 bg-linear-to-br from-background to-secondary/5 shadow-2xl",
          "data-[state=closed]:duration-200 data-[state=open]:duration-300"
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="flex h-full flex-col"
            >
              <SheetHeader className="gap-2 border-b border-border/60 px-6 pt-6 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <SheetTitle className="text-lg font-semibold tracking-tight">
                      {t.contact_sheet.title}
                    </SheetTitle>
                    <SheetDescription className="mt-1 text-sm">
                      {t.contact_sheet.description}
                    </SheetDescription>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-full bg-primary/10 text-primary"
                    >
                      <Mail className="h-4 w-4" />
                      {t.contact_sheet.badge_secure}
                    </Badge>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">{t.contact_sheet.close}</span>
                      </Button>
                    </SheetClose>
                  </div>
                </div>

                {sendStatus === "error" && sendError && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {sendError}
                  </div>
                )}

                {sendStatus === "success" && (
                  <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary-foreground">
                    {t.contact_sheet.success}
                  </div>
                )}
              </SheetHeader>

              <form onSubmit={onSubmit} className="flex flex-1 flex-col">
                <div
                  className={cn(
                    "grid gap-5 px-6 pt-5 pb-6",
                    isSending && "opacity-60"
                  )}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-fullName">Full name</Label>
                      <Input
                        id="contact-fullName"
                        value={values.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder={
                          t.contact_sheet.fields.full_name.placeholder
                        }
                        autoComplete="name"
                        disabled={isSending}
                      />
                      {fieldErrors.fullName && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder={t.contact_sheet.fields.email.placeholder}
                        autoComplete="email"
                        disabled={isSending}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-phone">Phone (optional)</Label>
                      <Input
                        id="contact-phone"
                        value={values.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder={t.contact_sheet.fields.phone.placeholder}
                        autoComplete="tel"
                        disabled={isSending}
                      />
                      {fieldErrors.phone && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label>{t.contact_sheet.fields.inquiry_type.label}</Label>
                      <Select
                        value={values.inquiryType}
                        onValueChange={(v) =>
                          update(
                            "inquiryType",
                            v as ContactFormValues["inquiryType"]
                          )
                        }
                        disabled={isSending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              t.contact_sheet.fields.inquiry_type.placeholder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            [
                              "partnership",
                              "donation",
                              "volunteering",
                              "media",
                              "general",
                            ] as const
                          ).map((value) => (
                            <SelectItem key={value} value={value}>
                              {t.contact_sheet.inquiry_types[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldErrors.inquiryType && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.inquiryType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-organization">
                        {t.contact_sheet.fields.organization.label}
                      </Label>
                      <Input
                        id="contact-organization"
                        value={values.organization}
                        onChange={(e) => update("organization", e.target.value)}
                        placeholder={
                          t.contact_sheet.fields.organization.placeholder
                        }
                        autoComplete="organization"
                        disabled={isSending}
                      />
                      {fieldErrors.organization && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.organization}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contact-role">Role (optional)</Label>
                      <Input
                        id="contact-role"
                        value={values.role}
                        onChange={(e) => update("role", e.target.value)}
                        placeholder={t.contact_sheet.fields.role.placeholder}
                        disabled={isSending}
                      />
                      {fieldErrors.role && (
                        <p className="text-xs text-destructive">
                          {fieldErrors.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label>
                        {t.contact_sheet.fields.program_interest.label}
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        {t.contact_sheet.fields.program_interest.helper}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "healthy",
                          "schooled",
                          "stable",
                          "apiculture",
                          "mobility",
                        ] as const
                      ).map((value) => {
                        const active = values.programInterests.includes(value)
                        const disabled =
                          !active && values.programInterests.length >= 3

                        return (
                          <button
                            key={value}
                            type="button"
                            disabled={disabled || isSending}
                            onClick={() =>
                              toggleProgramInterest(
                                value as ContactFormValues["programInterests"][number]
                              )
                            }
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                              active
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-border/70 bg-background text-foreground hover:bg-secondary/10",
                              (disabled || isSending) && "opacity-50"
                            )}
                          >
                            {t.contact_sheet.programs[value]}
                          </button>
                        )
                      })}
                    </div>

                    {selectedPrograms.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {
                          t.contact_sheet.fields.program_interest
                            .selected_prefix
                        }{" "}
                        {selectedPrograms.join(", ")}
                      </p>
                    )}

                    {fieldErrors.programInterests && (
                      <p className="text-xs text-destructive">
                        {fieldErrors.programInterests}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={t.contact_sheet.fields.message.placeholder}
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
                        id="contact-consent"
                        checked={values.consent}
                        onCheckedChange={(v) => update("consent", v === true)}
                        disabled={isSending}
                      />
                      <div className="grid gap-1">
                        <Label
                          htmlFor="contact-consent"
                          className="flex items-center gap-2"
                        >
                          <ShieldCheck className="h-4 w-4 text-secondary" />
                          {t.contact_sheet.fields.consent.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t.contact_sheet.fields.consent.helper}
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
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MessageSquareText className="h-4 w-4" />
                      <span>
                        {t.contact_sheet.direct_line_prefix} adtbusia@yahoo.com
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className={cn(
                        "cursor-pointer rounded-full bg-linear-to-r from-primary to-secondary px-6",
                        isSending && "cursor-not-allowed"
                      )}
                      disabled={isSending}
                    >
                      {sendStatus === "sending" ? (
                        <span className="inline-flex items-center gap-2">
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          {t.contact_sheet.submit}
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  )
}
