import dynamic from 'next/dynamic';
import { useState } from 'react';
import LayNotepad from '../../layouts/lay-notepad';

const MicroAsciiDynamic: any = dynamic(() => import('fe2/com-header'), { ssr: false });

const AsciiDoc = () => {
	const [htmlData, setHtmlData] = useState<string>('');
	const handleConvert = (htmlData: any) => {
		setHtmlData(htmlData);
	};
	return (
		<LayNotepad
			converter={handleConvert}
			converterComponent={<MicroAsciiDynamic htmlData={htmlData}></MicroAsciiDynamic>}
		></LayNotepad>
	);
};

export default AsciiDoc;
