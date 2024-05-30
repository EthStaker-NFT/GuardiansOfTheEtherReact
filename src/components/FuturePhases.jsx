import React from 'react';

const FuturePhases = () => {
	return (
		<div className="bg-black text-white pt-20 pb-30 px-4 text-center pb-section-bottom">
			<div style={{maxWidth: "560px"}} className="mx-auto">
				<h2 className="text-title font-bold mb-10">Future Phases</h2>
				<p>In future phases, we will be adding more functionality:</p>
				<ul className="list-disc list-inside my-4 mx-auto max-w-md text-left">
					<li style={{ marginBottom: "16px" }}>Sign offline with your staking address so you never need to connect your staking wallet</li>
					<li style={{ marginBottom: "16px" }}>Designate an alternate destination address to mint the NFT</li>
					<li style={{ marginBottom: "16px" }}>Upgrade your NFT another level if you are still staking after the next snapshot (September 15, 2024)</li>
				</ul>
			</div>
		</div>
	);
};

export default FuturePhases;
