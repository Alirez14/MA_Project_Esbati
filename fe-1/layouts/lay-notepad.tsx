import { useState } from 'react';
import ComFooter from '../components/com-footer';
import { ComHeader } from '../components/com-header';
import ComInputEditor from '../components/com-input-editor/com-input-editor';

type props = { converter: Function };

const LayNotepad = ({ converter }: props) => {
	const [convertedValue, setConvertedValue] = useState<string>('');
	const handelConvert = (htmlData: any) => {
		setConvertedValue(converter(htmlData));
	};

	return (
		<>
			<ComHeader></ComHeader>
			<div className='flex flex-row'>
				<div className='flex-1'>
					<ComInputEditor onChange={handelConvert}></ComInputEditor>
				</div>
				<textarea value={convertedValue} disabled className='flex-1'></textarea>
			</div>

			<ComFooter></ComFooter>
		</>
	);
};

export default LayNotepad;
