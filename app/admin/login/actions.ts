'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return 'Geçersiz e-posta veya şifre.'

  redirect('/admin')
}
