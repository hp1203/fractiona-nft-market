import 'react-native-gesture-handler';
import "@walletconnect/react-native-compat";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import * as Clipboard from "expo-clipboard";

import { WagmiConfig, configureChains } from "wagmi";
import { mainnet, polygon, arbitrum, polygonMumbai, polygonZkEvmTestnet } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  W3MChainPresets
} from "@web3modal/wagmi-react-native";
import ToastProvider from './components/ToastProvider';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { defineChain } from 'viem';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.WALLETCONNECT_API_KEY;
console.log(projectId);
// 2. Create config
const metadata = {
  name: "FractionalFi",
  description: "Fractionalized NFT Marketplace",
  url: "https://nftfraction.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "fractional-fi://",
  },
};

const polygonAmoy = defineChain({
  id: 80002,
  name: 'Polygon Amoy',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://rpc-amoy.polygon.technology/'] },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://www.oklink.com/amoy' },
  },
  testnet: true
});

const { chains, provider } = configureChains(
  [polygonAmoy],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.public }) })]
);


// const chains = [mainnet, polygon, arbitrum, polygonMumbai, polygonZkEvmTestnet];

const wagmiConfig = defaultWagmiConfig({ chains, provider, projectId, metadata });

// W3MChainPresets.chains.putIfAbsent('80002', () => polygonAmoy);


// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  // defaultChain: polygonAmoy,
  wagmiConfig,
  themeMode: "dark",
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  clipboardClient:{
    setString: async (value) => {
      await Clipboard.setStringAsync(value)
    }
  }
});

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig config={wagmiConfig}>
          <NavigationContainer>
            <ToastProvider>
            <RootNavigation />
            </ToastProvider>
          </NavigationContainer>
          <Web3Modal />
        </WagmiConfig>
      </PersistGate>
    </Provider>
  );
}
