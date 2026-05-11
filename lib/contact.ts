import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(32, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  organization: z
    .string()
    .trim()
    .max(120, "Organization name is too long")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .trim()
    .max(120, "Role is too long")
    .optional()
    .or(z.literal("")),
  inquiryType: z.enum([
    "partnership",
    "donation",
    "volunteering",
    "media",
    "general",
  ]),
  programInterests: z
    .array(
      z.enum([
        "healthy",
        "schooled",
        "stable",
        "apiculture",
        "mobility",
      ])
    )
    .min(1, "Select at least one program")
    .max(3, "Please select up to 3 programs"),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters")
    .max(2000, "Message is too long"),
  consent: z
    .boolean()
    .refine((v) => v, { message: "You must accept the privacy terms" }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type ContactSendResult =
  | { ok: true }
  | { ok: false; error: string }
