'use client'
import { deletePost } from '@/app/admin/(protected)/blog/actions'

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-red-500 hover:text-red-700 transition-colors"
      >
        Sil
      </button>
    </form>
  )
}
