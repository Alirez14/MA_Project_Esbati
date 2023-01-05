type navOptions = { title: string; url: string; icon: string }[];

const ComHeader = ({ navOptions, Link }: { navOptions: navOptions; Link: any }) => {
	console.log(navOptions);
	const renderNavLinks = () => {
		return navOptions?.map((navOption, index) => {
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
					<a className='btn btn-ghost normal-case text-xl'>daisyUI</a>
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
			<div className='navbar-end'>
				<a className='btn'>Get started</a>
			</div>
		</div>
	);
};
export default ComHeader;
