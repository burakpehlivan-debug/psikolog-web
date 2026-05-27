'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
}

export async function saveSettings(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  await requireAuth()
  const admin = createAdminClient()

  const workingDaysRaw = formData.getAll('working_days') as string[]
  const working_days = workingDaysRaw.map(Number)

  const { error } = await admin.from('settings').update({
    appointment_system_enabled: formData.get('appointment_system_enabled') === 'on',
    working_hours_start: formData.get('working_hours_start') as string,
    working_hours_end: formData.get('working_hours_end') as string,
    working_days,
    contact_email: (formData.get('contact_email') as string).trim() || null,
    contact_phone: (formData.get('contact_phone') as string).trim() || null,
    contact_address: (formData.get('contact_address') as string).trim() || null,
    instagram_url: (formData.get('instagram_url') as string).trim() || null,
    linkedin_url: (formData.get('linkedin_url') as string).trim() || null,
  }).eq('id', 1)

  if (error) return error.message

  revalidatePath('/admin/ayarlar')
  revalidatePath('/')
  revalidatePath('/randevu')
  return 'saved'
}
