import { z } from "zod"

export const partnerFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("A valid email is required"),
  phone: z.string().trim().optional(),
  organization: z.string().trim().optional(),
  role: z.string().trim().optional(),
  partnershipType: z.enum([
    "co_implementation",
    "program_funding",
    "technical_assistance",
    "in_kind",
    "impact_investing",
  ]),
  interestAreas: z
    .array(z.enum(["healthy", "schooled", "stable", "apiculture", "mobility"]))
    .min(1, "Select at least one interest area")
    .max(3, "Select up to 3 interest areas"),
  message: z.string().trim().min(10, "Message is required"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consent is required",
  }),
})

export type PartnerFormValues = z.infer<typeof partnerFormSchema>

export type PartnerSendResult = { ok: true } | { ok: false; error: string }
