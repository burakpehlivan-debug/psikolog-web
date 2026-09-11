import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PasswordForm from '@/components/admin/PasswordForm'

export default async function HesapPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div>
      <h1 className="font-serif text-2xl text-coffee-dark mb-8">Hesap</h1>
      <div className="max-w-2xl">
        <PasswordForm email={user.email ?? ''} />
      </div>
    </div>
  )
}
