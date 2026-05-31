'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

interface Props {
  content: string
  onChange: (html: string) => void
}

type ToolbarButtonProps = {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
  title: string
}

function ToolbarButton({ onClick, active, children, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2.5 py-1.5 rounded text-sm transition-colors"
      style={{
        background: active ? 'var(--color-coffee-dark)' : 'transparent',
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

function Divider() {
  return <span className="w-px h-6 self-center mx-1" style={{ background: 'var(--color-beige)' }} />
}

export default function TipTapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  function handleSetLink() {
    const prev = editor!.getAttributes('link').href ?? ''
    const url = window.prompt('Link URL girin (boş bırakın kaldırmak için):', prev)
    if (url === null) return
    if (url.trim() === '') {
      editor!.chain().focus().unsetLink().run()
    } else {
      editor!.chain().focus().setLink({ href: url.trim() }).run()
    }
  }

  return (
    <div className="border border-beige rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div
        className="flex flex-wrap gap-0.5 px-3 py-2 border-b border-beige"
        style={{ background: 'var(--color-cream)' }}
      >
        {/* Metin biçimi */}
        <ToolbarButton
          title="Kalın (Ctrl+B)"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          title="İtalik (Ctrl+I)"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>İ</em>
        </ToolbarButton>
        <ToolbarButton
          title="Altı çizili (Ctrl+U)"
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton
          title="Üstü çizili"
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </ToolbarButton>

        <Divider />

        {/* Başlıklar */}
        <ToolbarButton
          title="Başlık 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title="Başlık 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>

        <Divider />

        {/* Listeler & alıntı */}
        <ToolbarButton
          title="Madde listesi"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • —
        </ToolbarButton>
        <ToolbarButton
          title="Numaralı liste"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          title="Alıntı"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton
          title="Link ekle / kaldır"
          active={editor.isActive('link')}
          onClick={handleSetLink}
        >
          🔗
        </ToolbarButton>

        <Divider />

        {/* Geri / ileri */}
        <ToolbarButton
          title="Geri al"
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↩
        </ToolbarButton>
        <ToolbarButton
          title="İleri al"
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↪
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <div className="px-5 py-4 tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
