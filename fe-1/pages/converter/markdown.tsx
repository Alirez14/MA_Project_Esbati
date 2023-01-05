import TurndownService from 'turndown';
import LayNotepad from '../../layouts/lay-notepad';

const Markdown = () => {
	const turndownServiceInstance = new TurndownService({
		headingStyle: 'atx',
	});
	const handleConvert = (htmlData: any) => {
		console.log(htmlData);
		const result = turndownServiceInstance.turndown(htmlData);
		return result.replaceAll(/\n\s{4,}\n/g, '\n');
	};
	return <LayNotepad converter={handleConvert}></LayNotepad>;
};

export default Markdown;
