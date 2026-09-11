'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const MIN_LENGTH = 12

export async function changePassword(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) redirect('/admin/login')

  const current = formData.get('current_password') as string
  const next = formData.get('new_password') as string
  const confirm = formData.get('confirm_password') as string

  if (next.length < MIN_LENGTH) return `Yeni şifre en az ${MIN_LENGTH} karakter olmalı.`
  if (!/[a-zA-ZğüşıöçĞÜŞİÖÇ]/.test(next) || !/[0-9]/.test(next))
    return 'Yeni şifre en az bir harf ve bir rakam içermeli.'
  if (next !== confirm) return 'Yeni şifreler eşleşmiyor.'
  if (next === current) return 'Yeni şifre mevcut şifreyle aynı olamaz.'

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: current,
  })
  if (verifyError) return 'Mevcut şifre hatalı.'

  const { error } = await supabase.auth.updateUser({ password: next })
  if (error) return error.message

  await supabase.auth.signOut({ scope: 'others' })

  return 'saved'
}

export async function signOutEverywhere() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  await supabase.auth.signOut({ scope: 'global' })
  redirect('/admin/login')
}
