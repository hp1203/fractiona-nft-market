import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";
import tailwindColors from "../constants/tailwindColors";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount } from "wagmi";

const ConnectButton = () => {
  const { open,  } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <Pressable
      className="flex flex-row px-4 pl-3 py-2 rounded-full space-x-2 bg-gray-800 items-center justify-between"
      onPress={() => open()}
    >
      <Ionicons
        name="wallet-outline"
        color={tailwindColors.gray["500"]}
        size={24}
      />
      {!address && <Text className="text-white font-medium text-base">Connect Wallet</Text>}
      {isConnecting && <Text className="text-white font-medium text-base">Connecting...</Text>}
      {address && <Text className="text-white font-medium text-base">{address}</Text>}
    </Pressable>
  );
};

export default ConnectButton;
