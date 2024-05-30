import { useEffect, useState } from 'react';
import UIButton from './ui/UIButton';
import { useWeb3Modal, useWeb3ModalEvents, useWeb3ModalState } from "@web3modal/ethers/react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import config from "../config";

const ConnectWallet = ({ enabled, onConnectionStatusChange, setUserAddressCb, setOriginalMessage, setSignedMessage }: { enabled: boolean, onConnectionStatusChange: (connected: boolean) => void, setUserAddressCb: (addr: string) => void }) => {
	const { open } = useWeb3Modal();
	const { open: opened } = useWeb3ModalState()
	const { walletProvider } = useWeb3ModalProvider();
	const events = useWeb3ModalEvents()
	const { address, isConnected } = useWeb3ModalAccount()

	const [isConnectedState, setIsConnectedState] = useState(false);
	const [isSigned, setIsSigned] = useState(false);

	useEffect(() => {
		if (events.data.event === "CONNECT_SUCCESS") {
			setIsConnectedState(true);
			setUserAddressCb(address);
			onConnectionStatusChange(true);
		} else {
			setIsConnectedState(false);
			onConnectionStatusChange(false);
		}
	}, [events]);

	useEffect(() => {
		if (isConnected) {
			setIsConnectedState(true);
			setUserAddressCb(address);
			onConnectionStatusChange(true);
		} else {
			setIsConnectedState(false);
			onConnectionStatusChange(false);
		}
	}, [opened, isConnected]);

	const connect = async () => {
		if (!enabled) return;
		try {
			if (!isConnected) {
				await open();
			} else {
				setIsConnectedState(true);
				setUserAddressCb(address);
			}
			return;
		} catch (error) {
			console.error(error);
		}
	}

return (
	<div className='flex flex-col items-center'>
		<p className="font-bold text-base text-green">Step 1: Connect your wallet</p>
		<UIButton
			text={config.connectWalletButtonText}
			loading={false}
			enabled={enabled}
			checked={isConnectedState && enabled}
			onClick={connect}
		/>
		<span className="text-xs mt-2">
			{address ? (
				<>
					Connected wallet:
					<br />
					<div>{address}</div>
				</>
			) : (
				''
			)}
</span>
	</div>
);
};

export default ConnectWallet;

