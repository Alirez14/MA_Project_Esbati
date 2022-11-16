import BulletList from '@tiptap/extension-bullet-list';
import Highlight from '@tiptap/extension-highlight';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import style from './com-input-editor.module.scss';

const ComInputEditor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight,
			BulletList,
			ListItem,
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

	return (
		<>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
};

const MenuBar = ({ editor }: any) => {
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
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={editor.isActive('paragraph') ? 'is-active' : ''}
			>
				paragraph
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? 'is-active' : ''}
			>
				bold
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? 'is-active' : ''}
			>
				italic
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
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
			>
				left
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
			>
				center
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
			>
				right
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				toggleBulletList
			</button>
		</div>
	);
};

export default ComInputEditor;
