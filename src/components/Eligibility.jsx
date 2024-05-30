import React from 'react';

const Eligibility = () => {
	return (
		<div className="bg-black text-white pt-20 pb-30 px-4 text-center pb-section-bottom">
			<div style={{maxWidth: "480px"}} className="mx-auto">
				<h2 className="text-title font-bold mb-12">Eligibility</h2>
				<p>To be eligible, you must be either a solo staker or a RocketPool node operator on either of the snapshot dates below:</p>
				<ul className="list-disc list-inside my-4 mx-auto max-w-md text-left" style={{paddingLeft: "108px"}}>
					<li>September 15, 2022 (day of the merge)</li>
					<li>September 15, 2023</li>
				</ul>
				<p style={{ marginBottom: "16px" }}>You can check your address against <a href="https://your-list-url.com" target="_blank" rel="noreferrer noopener" className="text-link-green underline">this list</a>, maintained by <a href="https://twitter.com/GLCstaked" target="_blank" rel="noreferrer noopener" className="text-link-green underline">GLCStaked</a> and the <a href="https://stakecat.space/" target="_blank" rel="noreferrer noopener" className="text-link-green underline">StakeCat</a> team.</p>
				<p style={{ marginBottom: "16px" }}><span className="font-bold">Staker:</span> search for your deposit address<br />
				<span className="font-bold">RocketPool</span> Node Operator: use your withdrawal address</p>
				<p>If you believe your address should be listed, but isn’t, you can reach out to us in the <a target="_blank" rel="noreferrer noopener" href="https://discord.com" className="text-link-green underline">EthStaker discord server</a>.</p>
			</div>
		</div>
	);
};

export default Eligibility;
