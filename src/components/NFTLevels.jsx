import React from 'react';

const NFTLevels = () => {
	return (
		<div className="bg-white text-black pt-20 pb-30 px-4 text-center pb-section-bottom">
			<div style={{maxWidth: "355px"}} className="mx-auto text-center">
				<h2 className="text-title font-bold mb-10">NFT Levels</h2>
				<div className="mx-auto max-w-xl">
					<h3 className="text-sm font-bold text-center">Level 1 NFT:</h3>
					<p>If you had active validators on either of the snapshot dates, you will receive a Level 1 NFT.</p>
					<h3 className="text-sm font-bold mt-4 text-center">Level 2 NFT:</h3>
					<p>If you had active validators on both of the snapshot dates, you will receive a Level 2 NFT, denoting that you have been staking for 2 years.</p>
					<p className="mt-2">See <a href="https://your-details-url.com" className="text-green underline">here</a> for more details on how levels work.</p>
				</div>
			</div>
		</div>
	);
};

export default NFTLevels;
