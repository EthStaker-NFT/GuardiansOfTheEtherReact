import { useCallback, useEffect, useContext, useState } from "react";
import ConnectWallet from "../components/ConnectWallet";
import MintNFT from "../components/MintNFT";
import { PopupContext } from "../providers/PopupContextProvider";
import { Web3ModalProvider } from "../providers/Web3Modal";
import { useDisconnect } from "@web3modal/ethers/react";
import config from "../config";
import Eligibility from "../components/Eligibility";
import NFTLevels from "../components/NFTLevels";
import FuturePhases from "../components/FuturePhases";

export default function Home({isAndroid}) {
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [hasMinted, setHasMinted] = useState(false);
	const [txHash, setTxHash] = useState(undefined);
	const [imageURL, setImageURL] = useState(undefined);
	const [originalMessage, setOriginalMessage] = useState("");
	const popupContext = useContext(PopupContext);
	const [userAddress, setUserAddress] = useState(undefined);
	const { disconnect } = useDisconnect();

	const onConnectionStatusChange = useCallback(connected => {
		setIsWalletConnected(connected);
	}, []);

	const setUserAddressCallback = useCallback(address => {
		setUserAddress(address);
	}, []);

	return (
		<Web3ModalProvider>
			<div className="flex flex-col gap-4 text-center items-stretch w-74 mx-auto" style={{marginBottom: "100px"}}>

				{imageURL && (
					<div className="flex flex-col gap-4">
						<p className="text-green text-base font-bold">Your Guardians of the Ether NFT art</p>
						<img className="w-nft-image mx-auto my-6" src={imageURL} alt="Guardians of the Ether NFT art" />
					</div>
				)}

				<ConnectWallet enabled={true}
							   onConnectionStatusChange={onConnectionStatusChange}
							   setUserAddressCb={setUserAddressCallback}
							   setOriginalMessage={setOriginalMessage}
				/>
				<MintNFT enabled={isWalletConnected} originalMessage={originalMessage} setImageURL={setImageURL}/>
				{isAndroid && (
					<div className="flex flex-col gap-2">
						<span className="text-sm">Please close Metamask app after minting</span>
					</div>
				)}
			</div>

			<div className="text-sm">
				<Eligibility />
				<NFTLevels />
				<FuturePhases />
			</div>
		</Web3ModalProvider>
	);
}

