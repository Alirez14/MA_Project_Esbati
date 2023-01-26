import { LayGeneral } from '../layouts/lay-general';

export default function About() {
	return (
		<LayGeneral>
			<div
				className='flex flex-col items-center h-screen text-center bg-cover'
				style={{
					backgroundImage:
						'url(https://images.pexels.com/photos/2255355/pexels-photo-2255355.jpeg?auto=compress&cs=tinysrgb&dpr=1)',
				}}
			>
				<h2 className='text-3xl font-bold text-gray-500'>About Us</h2>
				<p className='mt-4 text-base text-gray-200 text-xl'>
					We are a passionate team of developers who are dedicated to helping people convert text to Markdown
					and Asciidoc format. We understand the importance of having a simple and intuitive way to convert
					text, so we created this website to make it easy for everyone. Our goal is to provide a quick and
					accurate way to convert text, so that you can focus on the creative process without worrying about
					the formatting.
				</p>
				<p className='mt-4 text-base text-gray-200 text-xl'>
					We are always working on improving our website and making sure it is as user-friendly as possible.
					If you have any feedback or suggestions, please dont hesitate to contact us. We would love to hear
					from you!
				</p>
				<p className='mt-4 text-base text-gray-200 text-xl'>
					Thank you for visiting our website and we look forward to helping you convert text!
				</p>
			</div>
		</LayGeneral>
	);
}
