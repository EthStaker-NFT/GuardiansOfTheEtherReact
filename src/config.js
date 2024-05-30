//export configuration strings for use in other scripts
const config = {
	environment: process.env.REACT_APP_ENVIRONMENT || 'remote',//local or remote
	network: process.env.REACT_APP_NETWORK ||  'test',//test or main
	apiRoot: process.env.REACT_APP_API_ROOT ||'https://api.etherguardians.xyz',
	walletConnectProjectID: '2e26b0e5cc42c1db4648212872c8bc55',

	//UI
	successfulMintMessage: 'Your NFT has been minted successfully!',
	mintButtonText: 'Mint',
	connectWalletButtonText: 'Connect Wallet',
}

export default config;