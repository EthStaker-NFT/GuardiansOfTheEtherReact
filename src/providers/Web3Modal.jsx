import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { ReactNode } from "react";
import config from "../config";

// 2. Set chains
// const optimism = {
//   chainId: 10, // Correct chain ID for Optimism
//   name: 'Optimism', // Name of the chain
//   currency: 'ETH', // Currency used
//   explorerUrl: 'https://optimistic.etherscan.io', // Optimism-specific explorer URL
//   rpcUrl: 'https://mainnet.optimism.io' // Official Optimism RPC URL
// }

const sepolia = {
    chainId: 11155111, // Correct chain ID for Sepolia
    name: 'Sepolia', // Name of the chain
    currency: 'ETH', // Currency used
    explorerUrl: 'https://sepolia.etherscan.io', // Sepolia-specific explorer URL
}

const mainnet = {
  chainId: 1, // Correct chain ID for Mainnet
  name: 'Mainnet', // Name of the chain
  currency: 'ETH', // Currency used
  explorerUrl: 'https://etherscan.io', // Mainnet-specific explorer URL
}

// 3. Create modal
const metadata = {
  name: 'Guardians of the Ether',
  description: 'Guardians of the Ether',
  url: config.environment === 'local' ? 'http://localhost:3000' : 'https://www.etherguardians.xyz/',
  icons: [''],
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [config.network === 'main' ? mainnet : sepolia],
  projectId: config.walletConnectProjectID,
  includeWalletIds: [
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96' //metamask
  ],
  allWallets: 'HIDE',
});

export function Web3ModalProvider({ children }) {
  return children
}

