import { LayGeneral } from '../layouts/lay-general';

export default function Home() {
	//write me a home page welcoming viewer with react and tailwind
	return (
		<LayGeneral>
			<div className={'flex flex-col items-center justify-center h-screen'}>
				<h1 className={'text-3xl font-bold'}>Welcome!</h1>
				<p className={'text-xl font-light'}>
					We are glad you are here. Please take a look around and see what we have to offer.
				</p>
			</div>
			);
		</LayGeneral>
	);
}
