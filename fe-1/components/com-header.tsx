// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { constApp } from '../constants/const-app';

// const Header = dynamic(() => import('fe2/com-header'), {
// 	ssr: false,
// });
// export const ComHeader = () => {
// 	return (
// 		<>
// 			<div className=''>
// 				<Header navOptions={constApp.navOptions} Link={Link} />
// 			</div>
// 		</>
// 	);
// };

import Link from 'next/link';
import { constApp } from '../constants/const-app';

export const ComHeader = () => {
	const renderNavLinks = () => {
		return constApp.navOptions.map((navOption, index) => {
			return (
				<li key={index} className=''>
					<Link href={navOption.url} className=''>
						{navOption.title}
					</Link>
				</li>
			);
		});
	};

	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<a className='btn btn-ghost normal-case text-xl'>Master Converter</a>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						{renderNavLinks()}
					</ul>
				</div>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal p-0'>{renderNavLinks()}</ul>
			</div>
		</div>
	);
};
