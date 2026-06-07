import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Hande Pehlivan',
  description: 'Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.',
}

export default function KvkkPage() {
  return (
    <section className="max-w-[720px] mx-auto px-8 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.22em] uppercase text-coffee mb-3 font-sans">Yasal Bilgilendirme</p>
      <h1 className="font-serif text-[2rem] text-coffee-dark mb-2 leading-[1.25]">
        KVKK Aydınlatma Metni
      </h1>
      <p className="text-[0.85rem] text-text-soft mb-12">Son güncelleme: 7 Haziran 2026</p>

      <div className="prose-kvkk">

        <h2>1. Veri Sorumlusu</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz;
          veri sorumlusu sıfatıyla <strong>Hande Pehlivan (Klinik Psikolog)</strong> tarafından
          aşağıda açıklanan kapsamda işlenmektedir.
        </p>
        <p>
          Veri sorumlusuna ilişkin iletişim bilgisi:{' '}
          <a href="mailto:psk.handepehlivan@gmail.com" className="text-coffee hover:underline">
            psk.handepehlivan@gmail.com
          </a>
        </p>

        <h2>2. İşlenen Kişisel Veriler</h2>
        <p>Web sitesi üzerinden aşağıdaki kişisel veriler toplanmaktadır:</p>
        <ul>
          <li>
            <strong>Randevu talebi formu:</strong> Ad soyad, telefon numarası, e-posta adresi
            (isteğe bağlı), görüşme notları (isteğe bağlı)
          </li>
          <li>
            <strong>İletişim formu:</strong> Ad soyad, e-posta adresi, mesaj içeriği
          </li>
        </ul>
        <p>
          Randevu talebi formundaki "notunuz" alanında sağlık durumunuza ilişkin bilgi paylaşmanız
          hâlinde bu veriler özel nitelikli kişisel veri niteliği taşımaktadır.
        </p>

        <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
        <ul>
          <li>Randevu talebini almak, değerlendirmek ve randevu sürecini yönetmek</li>
          <li>İletişim taleplerine yanıt vermek</li>
          <li>Hizmetin yürütülmesi kapsamında seans planlaması yapmak</li>
        </ul>

        <h2>4. Hukuki Dayanak</h2>
        <p>Kişisel verileriniz aşağıdaki hukuki dayanaklar çerçevesinde işlenmektedir:</p>
        <ul>
          <li>
            <strong>KVKK Madde 5/2-c:</strong> Bir sözleşmenin kurulması veya ifasıyla doğrudan
            ilgili olması kaydıyla sözleşmenin taraflarına ait kişisel verilerin işlenmesinin
            gerekli olması (randevu sürecinin yürütülmesi)
          </li>
          <li>
            <strong>KVKK Madde 5/2-f:</strong> İlgili kişinin temel hak ve özgürlüklerine zarar
            vermemek kaydıyla veri sorumlusunun meşru menfaatleri için zorunlu olması
          </li>
          <li>
            <strong>KVKK Madde 5/1 (özel nitelikli veriler için Madde 6/3):</strong> Sağlık
            verilerinin işlenmesinde; kamu sağlığının korunması, koruyucu hekimlik, tıbbî teşhis,
            tedavi ve bakım hizmetlerinin yürütülmesi amacıyla, sır saklama yükümlülüğü altındaki
            kişiler veya yetkili kurum ve kuruluşlar tarafından açık rıza aranmaksızın
            işlenebileceği durumlarda bu hüküm uygulanır; aksi hâlde açık rızanıza dayanılır
          </li>
        </ul>

        <h2>5. Kişisel Verilerin Aktarımı</h2>
        <p>
          Kişisel verileriniz; randevu ve içerik yönetimi altyapısı için Supabase Inc. (ABD)
          ile e-posta bildirimleri için Resend Inc. (ABD) platformlarında işlenmektedir. Bu
          aktarımlar, yeterli koruma tedbirlerinin alınması kaydıyla gerçekleştirilmektedir.
          Üçüncü kişilerle pazarlama veya başka amaçlarla paylaşılmamaktadır.
        </p>

        <h2>6. Saklama Süresi</h2>
        <p>
          Kişisel verileriniz, işlenme amacının ortadan kalkması veya ilgili mevzuatta öngörülen
          azami sürenin dolmasıyla birlikte silinir, yok edilir ya da anonim hâle getirilir.
          Randevu verileri son randevu tarihinden itibaren en fazla 2 (iki) yıl, iletişim formu
          verileri ise talebinizin yanıtlanmasının ardından en fazla 1 (bir) yıl saklanır.
        </p>

        <h2>7. Veri Sahibi Olarak Haklarınız</h2>
        <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
          <li>Düzeltme ve silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
          <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi
            suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          <li>Kanuna aykırı işleme nedeniyle uğradığınız zararın giderilmesini talep etme</li>
        </ul>

        <h2>8. Başvuru Yöntemi</h2>
        <p>
          Yukarıda belirtilen haklarınızı kullanmak için{' '}
          <a href="mailto:psk.handepehlivan@gmail.com" className="text-coffee hover:underline">
            psk.handepehlivan@gmail.com
          </a>{' '}
          adresine kimliğinizi doğrulayıcı bilgilerle birlikte yazılı olarak başvurabilirsiniz.
          Başvurunuz en geç 30 (otuz) gün içinde yanıtlanacaktır.
        </p>

      </div>
    </section>
  )
}
