import React from 'react';
import ComFooter from '../components/com-footer';
import { ComHeader } from '../components/com-header';

export const LayGeneral = ({ children }: React.PropsWithChildren) => {
	return (
		<div className='h-screen'>
			<ComHeader></ComHeader>
			{children}
			<ComFooter></ComFooter>
		</div>
	);
};
