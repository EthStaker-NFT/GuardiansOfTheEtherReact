import React, { useState } from 'react';
import SimpleModal from '../components/ui/SimpleModal';
import UIButton from '../components/ui/UIButton';
import Home from './Home';
import config from "../config";

export default function HomeMobile({id}) {
	const [showFirstModal, setShowFirstModal] = useState(false);
	const [showSecondModal, setShowSecondModal] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center p-4 mb-14 text-white">
			{!showFirstModal && !showSecondModal && (
				<UIButton
					text={config.mintButtonText}
					enabled={true}
					onClick={() => setShowFirstModal(true)}
				/>
			)}
			<SimpleModal open={showFirstModal} onClose={() => setShowFirstModal(false)} >
				<div className="flex flex-col items-center justify-center gap-4">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Mint NFT</h1>
						<p className="text-md my-4">Metamask wallet is available on mobile.</p>
						<p>Additional wallets are supported on desktop</p>
					</div>
					<a href={'dapp://' + window.location.host + '?force-desktop=true' + `#${id}`}>
						<UIButton
							text="Continue with Metamask"
							enabled={true}
						/>
					</a>
				</div>
			</SimpleModal>
			<SimpleModal open={showSecondModal} onClose={() => setShowSecondModal(false)} >
				<Home />
			</SimpleModal>
		</div >
	);
}
