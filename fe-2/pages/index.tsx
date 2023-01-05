import Link from 'next/link';
import ComHeader from '../components/com-header';

export default function Home() {
	return (
		<ComHeader
			navOptions={[
				{
					title: 'Home',
					url: '/home',
					icon: 'home',
				},
				{
					title: 'About',
					url: '/about',
					icon: 'information-circle',
				},
				{
					title: 'Markdown Converter',
					url: '/converter/markdown',
					icon: 'code-working',
				},
			]}
			Link={Link}
		></ComHeader>
	);
}
