// Schema.org structured data — Google zengin sonuçları için <script> enjekte eder.
// Görünür çıktısı yoktur (head/body'de meta veridir).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
