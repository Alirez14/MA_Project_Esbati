import HardBreak from '@tiptap/extension-hard-break';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import style from './com-input-editor.module.scss';

const ComInputEditor = ({ onChange }: { onChange: Function }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight,
			HardBreak.extend({}),
		],
		content: `
			Try to select this text to see what we call the bubble menu.
		`,
	});
	editor?.setOptions({
		editorProps: {
			attributes: {
				class: style.ProseMirror,
			},
		},
	});
	useEffect(() => {
		if (editor) {
			editor.on('update', () => {
				// remove <p> tags
				// .replaceAll(/<p>|<\/p>/g, '')
				onChange(editor.getHTML());
			});
		}
	}, [editor]);

	return (
		<>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className={style['bubble-menu']}>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				h1
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				h2
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
			>
				h3
			</button>
			<button onClick={() => editor.chain().focus().setHardBreak().run()}>Set Break</button>

			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={editor.isActive('paragraph') ? 'is-active' : ''}
			>
				p
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? 'is-active' : ''}
			>
				b
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? 'is-active' : ''}
			>
				i
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={editor.isActive('strike') ? 'is-active' : ''}
			>
				strike
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				className={editor.isActive('highlight') ? 'is-active' : ''}
			>
				highlight
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				Bullet List
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				Ordered List
			</button>
			<button
				onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
				disabled={!editor.can().sinkListItem('listItem')}
			>
				sink List Item
			</button>
			<button
				onClick={() => editor.chain().focus().liftListItem('listItem').run()}
				disabled={!editor.can().liftListItem('listItem')}
			>
				lift List Item
			</button>
		</div>
	);
};

export default ComInputEditor;
