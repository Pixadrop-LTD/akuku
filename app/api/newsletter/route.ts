import { Resend } from "resend"

import { newsletterFormSchema } from "@/lib/newsletter"

export const runtime = "nodejs"

const getEnv = (key: string): string | undefined => {
  const value = process.env[key]
  return value && value.length > 0 ? value : undefined
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = getEnv("RESEND_API_KEY")
  if (!apiKey) {
    return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
  }

  const toEmail =
    getEnv("NEWSLETTER_TO_EMAIL") ?? getEnv("CONTACT_TO_EMAIL") ?? "adtbusia@yahoo.com"
  const fromEmail =
    getEnv("NEWSLETTER_FROM_EMAIL") ??
    getEnv("CONTACT_FROM_EMAIL") ??
    "Akukuranut Development Trust <no-reply@akuku.org>"

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = newsletterFormSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 400 }
    )
  }

  const { email } = parsed.data

  const resend = new Resend(apiKey)

  const subject = `Newsletter signup • ${email}`

  const message =
    "I would like to know more about your activities, be sending me updates on email, or I would love to connect."

  const text = [
    "New newsletter signup:",
    "",
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.4;">
      <h2 style="margin:0 0 12px;">New newsletter signup</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding:6px 0; color:#64748b; width:140px;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
      </table>
      <div style="margin-top: 16px; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="color:#64748b; font-size: 12px; margin-bottom: 6px;">Message</div>
        <div style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>
  `.trim()

  try {
    const { error } = await resend.emails.send({
      to: toEmail,
      from: fromEmail,
      replyTo: email,
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
