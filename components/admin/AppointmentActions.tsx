'use client'
import { approveAppointment, rejectAppointment } from '@/app/admin/(protected)/randevu/actions'

export default function AppointmentActions({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-2">
      <form action={approveAppointment}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg text-xs bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
        >
          Onayla
        </button>
      </form>
      <form action={rejectAppointment}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg text-xs bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          Reddet
        </button>
      </form>
    </div>
  )
}
