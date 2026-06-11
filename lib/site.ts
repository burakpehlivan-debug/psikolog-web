// Sitenin kanonik adresi. NEXT_PUBLIC_SITE_URL set edilmese bile production
// domain'e düşer; böylece sitemap/robots/metadata asla localhost'a kaçmaz.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.handepehlivan.org'
).replace(/\/+$/, '')

export const SITE_NAME = 'Hande Pehlivan'
export const SITE_TITLE = 'Hande Pehlivan | Klinik Psikolog'
export const SITE_DESCRIPTION =
  'Çocuk ve ergen psikolojisi alanında uzmanlaşmış klinik psikolog. Bilişsel Davranışçı Terapi ve Deneyimsel Oyun Terapisi.'

// Hande'nin profil görseli (Person / OG paylaşımları için)
export const PROFILE_IMAGE =
  'https://rhknksjslrvlrpewazhe.supabase.co/storage/v1/object/public/blog-images/D8132DC0-F116-4BF8-A1BD-C595AE0F90E8.png'
