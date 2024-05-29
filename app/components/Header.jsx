import {
  W3mButton,
  W3mConnectButton,
  W3mNetworkButton,
} from "@web3modal/wagmi-react-native";
import { Pressable, Text, View } from "react-native";
import tailwindColors from "../constants/tailwindColors";
import ConnectButton from "./ConnectButton";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row justify-between items-center px-3">
      <View className="flex flex-row items-center space-x-3">
        {/* <Pressable onPress={() => navigation.openDrawer()}>
          <Feather name="bell" size={28} color={tailwindColors.gray[100]}/>
        </Pressable> */}
        {/* <Pressable onPress={() => navigation.openDrawer()} className="p-2">
          <Feather name="menu" size={28} color={tailwindColors.gray[100]}/>
        </Pressable> */}
        <Text className="text-3xl font-bold text-yellow-400">FractionalFi</Text>
      </View>
      <W3mButton
        accountStyle={{ backgroundColor: tailwindColors.gray[800] }}
        connectStyle={{ backgroundColor: tailwindColors.gray[800] }}
        label="Connect Wallet"
        // balance="show"
      />
      {/* <ConnectButton/> */}
      {/* <W3mNetworkButton/> */}
    </View>
  );
};

export default Header;
