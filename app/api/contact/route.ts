import { Resend } from "resend"

import { contactFormSchema } from "@/lib/contact"

export const runtime = "nodejs"

const getEnv = (key: string): string | undefined => {
  const value = process.env[key]
  return value && value.length > 0 ? value : undefined
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = getEnv("RESEND_API_KEY")
  if (!apiKey) {
    return Response.json(
      { error: "Missing RESEND_API_KEY" },
      {
        status: 500,
      }
    )
  }

  const toEmail = getEnv("CONTACT_TO_EMAIL") ?? "adtbusia@yahoo.com"
  const fromEmail =
    getEnv("CONTACT_FROM_EMAIL") ?? "Akukuranut Development Trust <no-reply@akuku.org>"

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 400 }
    )
  }

  const values = parsed.data

  const resend = new Resend(apiKey)

  const subject = `Contact: ${values.inquiryType} • ${values.fullName}`

  const safe = (v?: string) => (v && v.trim().length > 0 ? v.trim() : "—")

  const programLabelMap: Record<string, string> = {
    healthy: "Healthy Domain",
    schooled: "Schooled Domain",
    stable: "Stable Domain",
    apiculture: "Apiculture Social Enterprise",
    mobility: "Logistics & Mobility Network",
  }

  const programs = values.programInterests
    .map((p) => programLabelMap[p] ?? p)
    .join(", ")

  const text = [
    "New contact form submission:",
    "",
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Phone: ${safe(values.phone)}`,
    `Organization: ${safe(values.organization)}`,
    `Role: ${safe(values.role)}`,
    `Inquiry type: ${values.inquiryType}`,
    `Program interests: ${programs}`,
    "",
    "Message:",
    values.message,
  ].join("\n")

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.4;">
      <h2 style="margin:0 0 12px;">New contact submission</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding:6px 0; color:#64748b; width:160px;">Name</td><td style="padding:6px 0;"><strong>${values.fullName}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${values.email}">${values.email}</a></td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Phone</td><td style="padding:6px 0;">${safe(values.phone)}</td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Organization</td><td style="padding:6px 0;">${safe(values.organization)}</td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Role</td><td style="padding:6px 0;">${safe(values.role)}</td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Inquiry type</td><td style="padding:6px 0;">${values.inquiryType}</td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Programs</td><td style="padding:6px 0;">${programs}</td></tr>
      </table>
      <div style="margin-top: 16px; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="color:#64748b; font-size: 12px; margin-bottom: 6px;">Message</div>
        <div style="white-space: pre-wrap;">${values.message}</div>
      </div>
    </div>
  `.trim()

  try {
    const { error } = await resend.emails.send({
      to: toEmail,
      from: fromEmail,
      replyTo: values.email,
      subject,
      text,
      html,
    })

    if (error) {
      return Response.json(
        { error: error.message ?? "Failed to send email" },
        { status: 502 }
      )
    }

    return Response.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email service error"
    return Response.json({ error: message }, { status: 502 })
  }
}
