import utilAsciidoc from '../utils/util-asciidoc';

type ComConverterAsciidocProps = {
	htmlData: string;
};

const ComConverterAsciidoc = ({ htmlData }: ComConverterAsciidocProps) => {
	const handleConvert = (htmlData: any) => {
		console.log(htmlData);
		const result = utilAsciidoc(htmlData);
		console.log(result);
		return result.replaceAll(/\n\n/g, '\n');
	};
	return <textarea value={handleConvert(htmlData)} disabled className='flex-1'></textarea>;
};

export default ComConverterAsciidoc;
