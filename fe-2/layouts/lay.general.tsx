import React from 'react';
import ComFooter from '../components/com-footer';
import { ComHeader } from '../components/com-header';

export const LayGeneral = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			<ComHeader></ComHeader>
			{children}
			<ComFooter></ComFooter>
		</>
	);
};
