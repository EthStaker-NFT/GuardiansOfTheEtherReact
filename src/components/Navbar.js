import React from 'react';

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center p-4 bg-black text-grey text-sm font-bold">
			<div className="flex gap-x-navbar m-auto">
				<a href="https://www.etherguardians.xyz/" >Home</a>
				<a href="https://www.etherguardians.xyz/about" >About</a>
				<a href="" className='text-link-green'>Claim</a>
				<a href="https://www.etherguardians.xyz/art" >Art</a>
				<a href="mailto:project-team@ethstakerincentives.org?subject=Eth%20Staker%20Incentives" >Contact</a>
			</div>
		</nav>
	);
};

export default Navbar;
