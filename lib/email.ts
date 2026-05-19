import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN!,
    pass: process.env.BREVO_SMTP_KEY!,
  },
});

const PLAN_INFO: Record<string, { name: string; days: number }> = {
  rintis:         { name: "Rintis",               days: 45  },
  strategis:      { name: "Strategis",            days: 120 },
  prestij:        { name: "Prestij",              days: 250 },
  explorer_trial: { name: "Explorer (Percubaan)", days: 10  },
};

export async function sendPaymentReceiptEmail({
  to, planType, amount, credits, billId, paidAt,
}: {
  to: string; planType: string; amount: number;
  credits: number; billId: string; paidAt: string;
}) {
  const plan = PLAN_INFO[planType] ?? { name: planType, days: 0 };
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("ms-MY", { day: "numeric", month: "long", year: "numeric" });
  const expiry = new Date(Date.now() + plan.days * 86_400_000).toISOString();

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
<tr><td align="center">
<table width="540" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
<tr><td style="background:#0f172a;padding:28px 40px;text-align:center;">
  <span style="font-size:26px;font-weight:900;color:#fff;">Tanya</span><span style="font-size:26px;font-weight:900;color:#10b981;">Ler</span>
  <p style="color:#94a3b8;margin:6px 0 0;font-size:12px;">Sistem Rujukan Pintar ePerolehan Malaysia</p>
</td></tr>
<tr><td style="padding:28px 40px 0;text-align:center;">
  <span style="background:#d1fae5;color:#065f46;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:600;">Pembayaran Berjaya</span>
  <h2 style="color:#0f172a;font-size:22px;margin:14px 0 4px;">Resit Pembayaran</h2>
  <p style="color:#94a3b8;font-size:13px;margin:0;">No. Bil: ${billId}</p>
</td></tr>
<tr><td style="padding:20px 40px;">
  <table width="100%" style="border:1px solid #e2e8f0;border-radius:8px;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:14px 18px;color:#64748b;font-size:13px;">Plan</td>
      <td style="padding:14px 18px;color:#0f172a;font-weight:700;text-align:right;">Plan ${plan.name}</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:14px 18px;color:#64748b;font-size:13px;">Kredit Ditambah</td>
      <td style="padding:14px 18px;color:#10b981;font-weight:700;text-align:right;">+${credits} kredit</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:14px 18px;color:#64748b;font-size:13px;">Sah Hingga</td>
      <td style="padding:14px 18px;color:#0f172a;font-size:13px;text-align:right;">${fmt(expiry)}</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:14px 18px;color:#64748b;font-size:13px;">Tarikh Bayar</td>
      <td style="padding:14px 18px;color:#0f172a;font-size:13px;text-align:right;">${fmt(paidAt)}</td>
    </tr>
    <tr>
      <td style="padding:16px 18px;color:#0f172a;font-weight:700;">Jumlah Dibayar</td>
      <td style="padding:16px 18px;color:#0f172a;font-weight:900;font-size:22px;text-align:right;">RM ${amount}</td>
    </tr>
  </table>
</td></tr>
<tr><td style="padding:4px 40px 20px;text-align:center;">
  <a href="https://tanyaler.my/dashboard" style="display:inline-block;background:#10b981;color:#fff;text-decoration:none;padding:13px 30px;border-radius:8px;font-weight:700;">Mula Guna TanyaLer</a>
</td></tr>
<tr><td style="padding:0 40px 24px;">
  <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;">
    <p style="color:#92400e;font-size:13px;margin:0;"><strong>Kredit sudah aktif.</strong> Login dan mula bertanya tentang ePerolehan, tender, dan prosedur MOF.</p>
  </div>
</td></tr>
<tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
  <p style="color:#94a3b8;font-size:12px;margin:0 0 4px;">Soalan? Email <a href="mailto:support@tanyaler.my" style="color:#10b981;">support@tanyaler.my</a></p>
  <p style="color:#cbd5e1;font-size:11px;margin:0;">2026 ILHAM KREATIF - TanyaLer.my</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  await transporter.sendMail({
    from: `"TanyaLer" <${process.env.EMAIL_FROM ?? "no-reply@tanyaler.my"}>`,
    to,
    subject: `Resit Pembayaran - Plan ${plan.name} (${credits} kredit)`,
    html,
  });
}
