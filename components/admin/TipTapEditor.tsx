'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'

interface Props {
  content: string
  onChange: (html: string) => void
}

/* ─── Toolbar atom ─────────────────────────────────────────── */
type TBtnProps = {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
  danger?: boolean
}
function TBtn({ onClick, active, title, children, danger }: TBtnProps) {
  const activeBg = danger ? '#c0392b' : 'var(--color-coffee-dark)'
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2.5 py-1.5 rounded text-sm transition-colors leading-none"
      style={{
        background: active ? activeBg : 'transparent',
        color: active ? '#fff' : 'var(--color-text-soft)',
      }}
      onMouseOver={e => {
        if (!active) e.currentTarget.style.background = 'var(--color-beige)'
      }}
      onMouseOut={e => {
        if (!active) e.currentTarget.style.background = 'transparent'
      }}
    >
      {children}
    </button>
  )
}

function Sep() {
  return <span className="w-px h-5 self-center mx-0.5 shrink-0" style={{ background: 'var(--color-beige)' }} />
}

/* ─── Paste helper — kaynak HTML stilini temizle ────────────── */
function stripSourceStyles(html: string): string {
  return html
    .replace(/\s*style="[^"]*"/gi, '')
    .replace(/\s*class="[^"]*"/gi, '')
    // Anlamlı olmayan span etiketlerini kaldır
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1')
    // Word / Google Docs artefaktları
    .replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '')
    .replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '')
}

/* ─── Editör ────────────────────────────────────────────────── */
export default function TipTapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: false }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      // Yapıştırılan HTML'den kaynak stillerini temizle
      transformPastedHTML: stripSourceStyles,
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  function handleSetLink() {
    const prev = editor!.getAttributes('link').href ?? ''
    const url = window.prompt('Link URL girin (boş bırakın kaldırmak için):', prev)
    if (url === null) return
    url.trim() === ''
      ? editor!.chain().focus().unsetLink().run()
      : editor!.chain().focus().setLink({ href: url.trim() }).run()
  }

  function handleClearFormat() {
    editor!.chain().focus().clearNodes().unsetAllMarks().run()
  }

  return (
    <div className="border border-beige rounded-xl overflow-hidden bg-white">
      {/* ── Toolbar ── */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-beige"
        style={{ background: 'var(--color-cream)' }}
      >
        {/* Metin biçimi */}
        <TBtn title="Kalın (Ctrl+B)" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </TBtn>
        <TBtn title="İtalik (Ctrl+I)" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>İ</em>
        </TBtn>
        <TBtn title="Altı çizili (Ctrl+U)" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </TBtn>
        <TBtn title="Üstü çizili" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </TBtn>
        <TBtn title="Vurgula" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <span style={{ background: '#ffe066', padding: '0 3px', borderRadius: 2 }}>A</span>
        </TBtn>

        <Sep />

        {/* Başlıklar */}
        <TBtn title="Başlık 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </TBtn>
        <TBtn title="Başlık 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </TBtn>

        <Sep />

        {/* Hizalama */}
        <TBtn title="Sola hizala" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.75"/><rect x="1" y="6" width="10" height="1.5" rx="0.75"/><rect x="1" y="10" width="14" height="1.5" rx="0.75"/><rect x="1" y="14" width="8" height="1.5" rx="0.75"/></svg>
        </TBtn>
        <TBtn title="Ortala" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.75"/><rect x="3" y="6" width="10" height="1.5" rx="0.75"/><rect x="1" y="10" width="14" height="1.5" rx="0.75"/><rect x="4" y="14" width="8" height="1.5" rx="0.75"/></svg>
        </TBtn>
        <TBtn title="Sağa hizala" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.75"/><rect x="5" y="6" width="10" height="1.5" rx="0.75"/><rect x="1" y="10" width="14" height="1.5" rx="0.75"/><rect x="7" y="14" width="8" height="1.5" rx="0.75"/></svg>
        </TBtn>

        <Sep />

        {/* Listeler & yapı */}
        <TBtn title="Madde listesi" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • —
        </TBtn>
        <TBtn title="Numaralı liste" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </TBtn>
        <TBtn title="Alıntı" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝
        </TBtn>
        <TBtn title="Yatay çizgi ekle" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          ——
        </TBtn>

        <Sep />

        {/* Link */}
        <TBtn title="Link ekle / kaldır" active={editor.isActive('link')} onClick={handleSetLink}>
          🔗
        </TBtn>

        <Sep />

        {/* Temizle & Geri/İleri */}
        <TBtn title="Tüm biçimlendirmeyi temizle (seçili metin)" onClick={handleClearFormat}>
          T<sub style={{ fontSize: '0.6em' }}>✕</sub>
        </TBtn>

        <Sep />

        <TBtn title="Geri al (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()}>↩</TBtn>
        <TBtn title="İleri al (Ctrl+Shift+Z)" onClick={() => editor.chain().focus().redo().run()}>↪</TBtn>
      </div>

      {/* ── Editör alanı ── */}
      <div className="px-6 py-5 tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
