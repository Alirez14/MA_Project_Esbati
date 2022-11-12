import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from 'react';

const ComInputNotepad = () => {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	console.log(editorState);

	return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default ComInputNotepad;
