import { z } from "zod"

export const newsletterFormSchema = z.object({
  email: z.string().trim().email("A valid email is required"),
})

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>

export type NewsletterSendResult = { ok: true } | { ok: false; error: string }
