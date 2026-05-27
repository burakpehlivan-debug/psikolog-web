import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

function formatDT(iso: string) {
  const d = new Date(iso)
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} — ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
}

interface AppointmentEmailData {
  name: string
  phone: string
  email: string | null
  note: string | null
  start_datetime: string
  end_datetime: string
}

export async function sendNewAppointmentEmail(data: AppointmentEmailData) {
  const to = process.env.NOTIFICATION_EMAIL
  if (!to || !process.env.RESEND_API_KEY) return

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Başlık -->
        <tr>
          <td style="background:#4A3728;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#B89880;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${process.env.SITE_OWNER_NAME ?? ''}</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:400;">Yeni Randevu Talebi</h1>
          </td>
        </tr>

        <!-- İçerik -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(74,55,40,0.10);">

            <p style="margin:0 0 24px;color:#6B5448;font-size:14px;line-height:1.6;">
              Yeni bir randevu talebi aldınız. Aşağıdaki bilgileri inceleyip onaylayabilir veya reddedebilirsiniz.
            </p>

            <!-- Tarih kutusu -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:#FAF7F2;border-radius:10px;padding:16px 20px;border-left:3px solid #4A3728;">
                  <p style="margin:0 0 4px;color:#6B5448;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Tarih &amp; Saat</p>
                  <p style="margin:0;color:#2C1F17;font-size:16px;font-weight:500;">${formatDT(data.start_datetime)}</p>
                </td>
              </tr>
            </table>

            <!-- Bilgiler -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #EDE5D8;">
                  <p style="margin:0 0 2px;color:#6B5448;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Ad Soyad</p>
                  <p style="margin:0;color:#2C1F17;font-size:14px;">${data.name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #EDE5D8;">
                  <p style="margin:0 0 2px;color:#6B5448;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Telefon</p>
                  <p style="margin:0;color:#2C1F17;font-size:14px;">${data.phone}</p>
                </td>
              </tr>
              ${data.email ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #EDE5D8;">
                  <p style="margin:0 0 2px;color:#6B5448;font-size:11px;text-transform:uppercase;letter-spacing:1px;">E-posta</p>
                  <p style="margin:0;color:#2C1F17;font-size:14px;">${data.email}</p>
                </td>
              </tr>` : ''}
              ${data.note ? `
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0 0 2px;color:#6B5448;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Not</p>
                  <p style="margin:0;color:#2C1F17;font-size:14px;line-height:1.6;">${data.note}</p>
                </td>
              </tr>` : ''}
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
              <tr>
                <td align="center">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/randevu"
                     style="display:inline-block;background:#4A3728;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:14px;">
                    Admin Panelinde İncele
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#B89880;font-size:12px;">Bu e-posta otomatik olarak gönderilmiştir.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const resend = getResend()
  if (!resend) return

  await resend.emails.send({
    from: `${process.env.SITE_OWNER_NAME ?? 'Site'} <onboarding@resend.dev>`,
    to,
    subject: `Yeni Randevu Talebi — ${data.name}`,
    html,
  })
}
