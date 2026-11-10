/** Resend over its REST API. Server only. RESEND_API_URL exists so tests can point at a local stub. */
export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

export const FROM = () => process.env.SCORECARD_FROM_EMAIL || "Wambui at Made With Make <wambui@madewithmake.com>";

export async function sendMail(msg: { to: string; subject: string; html: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[scorecard] RESEND_API_KEY is not set: email not sent:", msg.subject);
    return false;
  }
  try {
    const res = await fetch(`${(process.env.RESEND_API_URL || "https://api.resend.com").replace(/\/$/, "")}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM(),
        to: [msg.to],
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[scorecard] Resend error", res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[scorecard] Resend request failed:", err);
    return false;
  }
}
