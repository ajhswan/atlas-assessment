import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { 
  MdFormatBold,
  MdFormatItalic
} from 'react-icons/md';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const editorState = useEditorState({
    editor,
    selector: ctx => {
      if (!ctx.editor) {
        return {
          isBold: false,
          isItalic: false,
        };
      }
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
      };
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="flex gap-1 p-2 border-b border-gray-300 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editorState.isBold ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
          }`}
          title="Bold (Ctrl+B)"
        >
          <MdFormatBold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editorState.isItalic ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
          }`}
          title="Italic (Ctrl+I)"
        >
          <MdFormatItalic className="w-5 h-5" />
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className="tiptap prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
}
