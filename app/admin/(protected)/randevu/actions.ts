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

export async function approveAppointment(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string
  const admin = createAdminClient()
  await admin.from('appointments').update({ status: 'approved' }).eq('id', id)
  revalidatePath('/admin/randevu')
}

export async function rejectAppointment(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string
  const admin = createAdminClient()
  await admin.from('appointments').update({ status: 'rejected' }).eq('id', id)
  revalidatePath('/admin/randevu')
}

export async function addBlockedSlot(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  await requireAuth()
  const admin = createAdminClient()

  const startRaw = formData.get('start_datetime') as string
  const endRaw = formData.get('end_datetime') as string
  const reason = (formData.get('reason') as string).trim() || null

  if (!startRaw || !endRaw) return 'Başlangıç ve bitiş saati gerekli.'

  const start = new Date(startRaw)
  const end = new Date(endRaw)

  if (end <= start) return 'Bitiş saati başlangıçtan sonra olmalı.'

  const { error } = await admin.from('blocked_slots').insert({
    start_datetime: start.toISOString(),
    end_datetime: end.toISOString(),
    reason,
  })

  if (error) return error.message

  revalidatePath('/admin/randevu')
  revalidatePath('/api/randevu/musait')
  return null
}

export async function deleteBlockedSlot(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string
  const admin = createAdminClient()
  await admin.from('blocked_slots').delete().eq('id', id)
  revalidatePath('/admin/randevu')
  revalidatePath('/api/randevu/musait')
}
