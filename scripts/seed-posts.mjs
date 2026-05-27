import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
const get = (key) => env.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim()

const supabase = createClient(get('NEXT_PUBLIC_SUPABASE_URL'), get('NEXT_PUBLIC_SUPABASE_ANON_KEY'))

const posts = [
  {
    title: 'BDT Nedir? Çocuklarla Bilişsel Davranışçı Terapi',
    slug: 'bdt-nedir',
    category: 'BDT',
    status: 'published',
    excerpt: 'Bilişsel Davranışçı Terapi, düşünceler, duygular ve davranışlar arasındaki ilişkiyi anlamaya dayanan kanıt temelli bir yaklaşımdır.',
    content: `<p>Bilişsel Davranışçı Terapi (BDT), 1960'lı yıllarda Aaron Beck tarafından geliştirilen ve günümüzün en yaygın kullanılan, bilimsel olarak en sağlam temellere sahip terapi yaklaşımlarından biridir. BDT'nin temel varsayımı şudur: Düşüncelerimiz duygularımızı, duygularımız ise davranışlarımızı doğrudan etkiler.</p><h2>BDT'nin Temel İlkeleri</h2><p>BDT üç ana unsur üzerine kurulmaktadır: düşünceler (biliş), duygular ve davranışlar. Bu üç unsur birbirini sürekli etkileyen bir döngü içindedir. Bir çocuk "Kimse beni sevmiyor" diye düşündüğünde, bu düşünce hem üzüntüye hem de kendini geri çekme gibi bir davranışa yol açabilir.</p><h2>Çocuklarda BDT Nasıl Uygulanır?</h2><p>Çocuklarla çalışırken BDT, yaşa ve gelişim düzeyine göre uyarlanır. Küçük çocuklarda oyun temelli etkinlikler, hikâyeler ve görsel araçlar kullanılır. Daha büyük çocuklar ve ergenlerle düşünce günlükleri, davranışsal deneyler ve problem çözme egzersizleri ön plana çıkar.</p><h3>BDT'nin Kullanıldığı Alanlar</h3><p>BDT; anksiyete bozuklukları, depresyon, obsesif kompulsif bozukluk (OKB), travma sonrası stres bozukluğu ve davranış bozuklukları gibi pek çok alanda etkili biçimde kullanılmaktadır.</p><h2>Ebeveynlerin Rolü</h2><p>Çocuklarla yürütülen BDT sürecinde ebeveynler kritik bir role sahiptir. Terapide öğrenilen becerilerin ev ortamında da pekiştirilmesi, ilerlemenin hızlanmasına büyük katkı sağlar. Bu nedenle süreçte ebeveyn seanslarını da entegre etmeyi tercih ediyorum.</p><p>BDT, çocuğunuza uzun vadede işe yarayacak zihinsel araçlar kazandırmayı hedefler. Yalnızca bugünkü zorluğu aşmakla kalmaz; ilerleyen yıllarda karşılaşılacak güçlüklerle de daha sağlıklı başa çıkmanın zeminini hazırlar.</p>`,
  },
  {
    title: "Byron Norton'ın Deneyimsel Oyun Terapisi",
    slug: 'norton-oyun-terapisi',
    category: 'Oyun Terapisi',
    status: 'published',
    excerpt: "Deneyimsel Oyun Terapisi, çocukların doğal iletişim dili olan oyunu terapötik bir araç olarak kullanan güçlü ve yaratıcı bir yaklaşımdır.",
    content: `<p>Byron Norton ve Carol Norton tarafından geliştirilen Deneyimsel Oyun Terapisi (DÖT), çocukların duygusal zorluklarını oyun aracılığıyla işlemelerine olanak tanıyan bütüncül bir terapi modelidir. Bu yaklaşım, çocuğun iç dünyasına saygıyla yaklaşır ve onun kendi iyileşme sürecinin aktif bir öznesi olmasını destekler.</p><h2>Oyun Neden Bu Kadar Önemli?</h2><p>Çocuklar, yetişkinlerin dil aracılığıyla yaptığı şeyi oyun aracılığıyla yapar: deneyimlerini işler, anlamlandırır ve iletişim kurar. Bir çocuktan "Neden üzgün olduğunu anlat" demesini istemek çoğu zaman işe yaramaz. Ama o çocuğa oyuncaklar verdiğinizde ve bir oyun alanı sunduğunuzda, iç dünyası kendiliğinden açılmaya başlar.</p><h2>Deneyimsel Oyun Terapisinin Özellikleri</h2><p>Norton modelinin ayırt edici özelliği, terapistin çocuğun oyununu yönlendirmek yerine onu takip etmesidir. Terapist, çocuğun oyununa eşlik eder; bu oyunun altında yatan temaları, duyguları ve çözüm arayışlarını gözlemler ve destekler.</p><h3>Sürecin Aşamaları</h3><p>İlk aşamalarda çocuk terapiste güvenir ve kendini ifade etmeye başlar. Orta aşamalarda zor duygular ve çatışmalar oyun üzerinden ortaya çıkar ve işlenir. Son aşamalarda ise çocuk bir çözüme, bir bütünleşmeye ulaşır.</p><h2>Hangi Çocuklara Uygundur?</h2><p>Deneyimsel Oyun Terapisi özellikle travma yaşamış, ayrılık kaygısı olan, davranış güçlükleri yaşayan ve duygularını söze dökmekte zorlanan çocuklarda son derece etkilidir. Genel olarak 3–12 yaş aralığındaki çocuklara uygulanmakla birlikte ergenlerle de yaratıcı biçimlerde kullanılabilir.</p><h2>Yaklaşımım</h2><p>Norton modelini BDT ile harmanlayarak çalışıyorum. Bu sayede hem çocuğun oyun yoluyla duygusal işlemesini destekliyor hem de yaşa uygun bilişsel beceriler geliştirmesine katkı sağlıyorum.</p>`,
  },
]

const { error } = await supabase.from('posts').upsert(posts, { onConflict: 'slug' })

if (error) {
  console.error('Hata:', error.message)
  process.exit(1)
}

console.log(`✓ ${posts.length} yazı başarıyla eklendi.`)
