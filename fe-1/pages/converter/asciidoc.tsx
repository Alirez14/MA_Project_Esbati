import LayNotepad from '../../layouts/lay-notepad';
import utilAsciidoc from '../../utils/util-asciidoc';

const AsciiDoc = () => {
	const handleConvert = (htmlData: any) => {
		console.log(htmlData);
		const result = utilAsciidoc(htmlData);
		console.log(result);
		return result.replaceAll(/\n\n/g, '\n');
	};
	return <LayNotepad converter={handleConvert}></LayNotepad>;
};

export default AsciiDoc;
