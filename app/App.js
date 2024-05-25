import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import * as Clipboard from "expo-clipboard";

import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum, polygonMumbai, polygonZkEvmTestnet } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.WALLETCONNECT_API_KEY;
console.log(projectId);
// 2. Create config
const metadata = {
  name: "NFTFraction",
  description: "Fractionalized NFT Marketplace",
  url: "https://nftfraction.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "nftfraction://",
  },
};

const chains = [mainnet, polygon, arbitrum, polygonMumbai, polygonZkEvmTestnet];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
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
            <RootNavigation />
          </NavigationContainer>
          <Web3Modal />
        </WagmiConfig>
      </PersistGate>
    </Provider>
  );
}
