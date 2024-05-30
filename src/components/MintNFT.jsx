import { useContext, useEffect, useState } from "react";
import UIButton from './ui/UIButton';
import { PopupContext } from "../providers/PopupContextProvider";
import config from "../config";
import * as uuid from "uuid";
import { BrowserProvider, Contract } from "ethers";
import {useWeb3ModalProvider, } from "@web3modal/ethers/react";

let txHash = "";
console.log("process.env.REACT_APP_API_ROOT", process.env.REACT_APP_API_ROOT)
const apiRoot = config.apiRoot;

const MintNFT = ({ enabled, onMint, setImageURL }) => {
	const [isMinted, setIsMinted] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const popupContext = useContext(PopupContext)
	const { walletProvider } = useWeb3ModalProvider();

	console.log('network:', config.network);

	const authAndMintNFT = async () => {
		if (!enabled) return;
		if (!walletProvider) {
			popupContext.showPopup({
				content: "No wallet provider found. Please connect your wallet.",
				status: "error",
			});
			return;
		}

		popupContext.showPopup({
			content: "Minting...",
			showButton: false,
		});

		setLoading(true);
		const apiEndpoint = `${apiRoot}/authorizeNFTMint`;
		try {
			const messages = await getMessages();
			// Make the HTTP POST request to the server
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				//body is JSON that contains messages and requestedTokenCategory
				body: JSON.stringify({...messages})
			});

			// Parse the JSON response from the server
			const data = await response.json();


			if (response.status === 200) {
				console.log('Success:');
				const {signature, nonce, tokenId, timestamp} = data;
				await mintNFTDirectly(messages, signature, nonce, tokenId, timestamp);

			} else {
				let content = data.error;
				if (data.tokenURI){
					getTokenImage(data.tokenURI);
				}
				// if (error.message === "Address not whitelisted.") {
				//check if message contains the string "Address not whitelisted."
				if (data.error.includes("Address not whitelisted.")) {
					console.log("Address not whitelisted message.");
					content = "It doesn't appear that the address you have connected is eligible for this NFT.";
				}

				popupContext.showPopup({
					content,
					status: "error",
				});
				console.error('Error response:', data.error);
			}
		} catch (error) {
			popupContext.showPopup({
				content: error.message,
				status: "error",
			});
			console.error('Network error:', error);
		}
		finally {
			// popupContext.hidePopup();
			setLoading(false);
		}
	}

	async function mintNFTDirectly(messages, signature, nonce, tokenId, timestamp) {
		console.log("Minting NFT...");

		const provider = new BrowserProvider(walletProvider);
		const signer = await provider.getSigner(); // Get the signer to sign transactions
		console.log('signer:', signer);
		const contractABI = await loadContractABI();
		const contractAddress = await loadContractAddress();
		console.log('contractAddress:', contractAddress);
		const contract = new Contract(contractAddress, contractABI, signer);
		try {
			const tx = await contract.mintWithSignature(signature, nonce, tokenId, timestamp);
			console.log("Transaction hash:", tx.hash);
			const txReceipt = await tx.wait();
			console.log("Transaction confirmed!", txReceipt);
			// Set up a filter for the NFTMinted event
			const filter = contract.filters.NFTMinted(tokenId, null, null);
			const events = await contract.queryFilter(filter, txReceipt.blockNumber, txReceipt.blockNumber);

			// Extract and log the NFTMinted event data
			if (events.length > 0) {
				const event = events[0];
				const { tokenId, tokenURI, recipient } = event.args;
				console.log(`NFT Minted! Token ID: ${tokenId}, Token URI: ${tokenURI}, Recipient: ${recipient}`);
				getTokenImage(tokenURI);
			} else {
				console.log("No NFTMinted event found in the transaction receipt.");
			}

			popupContext.showPopup({
				content: <div>
					<p className="font-bold mb-2">{config.successfulMintMessage}</p>
					<a target="_blank" rel="noreferrer noopener"
					   className="text-sm underline hover:text-black text-blue-600 mb-4"
					   href={ config.network === 'main' ? `https://etherscan.io/tx/${tx.hash}` :
						`https://sepolia.etherscan.io/tx/${tx.hash}`}>View transaction on Etherscan
					</a>
				</div>,
				status: "success",
			});
			setIsMinted(true)
		} catch (error) {
			console.log('Error minting NFT:');
			console.dir(error)
			const content = error.shortMessage ? error.shortMessage : error.message ? error.message : error;
			popupContext.showPopup({
				content,
				status: "error",
			});
		}
		finally {
			setLoading(false);
		}
	}

	const getTokenImage = (tokenURI) => {
		//example tokenURI:"ipfs://QmTP5zFukG2oGJbq5rwcWCrBDpShNkVReyyUBK152RDjas/39382.json"
		//get the part after "ipfs://"
		const path = tokenURI.split("ipfs://")[1];
		const gatewayUrl = `https://ipfs.io/ipfs/${path}`;
		//get the json file and extract the image url
		fetch(gatewayUrl)
			.then(response => response.json())
			.then(data => {
				const originalImageURL = data.image;
				//convert image url to use the gateway
				const imageUrl = `https://ipfs.io/ipfs/${originalImageURL.split("ipfs://")[1]}`;
				console.log('imageUrl:', imageUrl);
				setImageURL(imageUrl);
			})
			.catch(error => {
				console.error('Error getting image:', error);
			});
	}

	const getMessages = async (message) => {
		const nonce = uuid.v4();
		const originalMessage = `I am signing this message to authenticate my wallet address with Eth Staker Incentives. I understand that this does not incur any costs. Unique ID: ${nonce}.`
		console.log('originalMessage:', originalMessage);
		const signedMessage = await getSignedMessage(originalMessage);
		console.log('signedMessage:', signedMessage);
		return {signedMessage, originalMessage};
	}

	async function getSignedMessage(message) {
		if (typeof window.ethereum !== 'undefined') {
			// Request account access if needed
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

			// Accounts now exposed, use the first account to sign a message
			const account = accounts[0];

			// Sign the message
			try {
				const signature = await window.ethereum.request({
					method: 'personal_sign',
					params: [message, account],
				});

				return signature;
			} catch (error) {
				// showModal(errorModal, 'Error signing message: ' +  error)
				console.error('Error signing message:', error);
				throw error;
			}
		} else {
			// Handle the case where the user doesn't have MetaMask installed
			console.error('MetaMask is not installed!');
			popupContext.showPopup({
				content: 'No wallet installed.',
				status: "error",
			});
			throw new Error('MetaMask is not installed!');
		}
	}

	async function loadContractABI() {
		const url = `${apiRoot}/contractABI`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const contractJSON = await response.json();
		return  contractJSON.abi;
	}

	async function loadContractAddress() {
		const url = `${apiRoot}/contractAddress`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const json = await response.json();
		return  json.contractAddress;
	}

	useEffect(() => {
		if (isMinted && onMint) {
			onMint(txHash);
		}
	}, [isMinted]);

	return (
		<div className='flex flex-col items-center'>
			<p className="font-bold text-base mt-4 text-green">Step 2: Mint your NFT</p>
			<UIButton
				text={config.mintButtonText}
				loading={isLoading}
				checked={isMinted}
				enabled={enabled && !isLoading}
				onClick={authAndMintNFT}
			/>
		</div>
	);
}

export default MintNFT;

