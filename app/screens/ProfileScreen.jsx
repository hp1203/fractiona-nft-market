import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Layout from "../components/Layout";
import { useAccount } from "wagmi";
import useUtils from "../utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import tailwindColors from "../constants/tailwindColors";
import { W3mButton } from "@web3modal/wagmi-react-native";
import SettingRow from "../components/SettingRow";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const navigation = useNavigation();
  const { shortenAddress, copyToClipboard } = useUtils();
  const { address, isConnecting, isDisconnected } = useAccount();
  //   console.log(`https://api.dicebear.com/8.x/pixel-art/png?seed=${address}`);
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {address && (
          <View className="flex justify-center items-center py-6 space-y-3">
            <Image
              source={{
                uri: `https://api.dicebear.com/8.x/pixel-art/png?seed=${address}`,
              }}
              className="h-24 w-24 bg-gray-100 rounded-full"
            />
            <Text className="text-white text-lg font-semibold">
              {shortenAddress(address)}
            </Text>
            <Pressable
              className="flex-row items-center border border-gray-500 rounded-full p-1 px-2 space-x-1"
              onPress={() => copyToClipboard(address.toString())}
            >
              <Feather
                name="copy"
                size={16}
                color={tailwindColors.gray["400"]}
              />
              <Text className="text-gray-300 text-base font-semibold">
                Copy
              </Text>
            </Pressable>
          </View>
        )}
        {isDisconnected && (
          <View className="flex justify-center items-center py-6 space-y-3">
            <W3mButton />
          </View>
        )}
        <View className="flex space-y-2 p-3">
        <Text className="text-lg font-semibold mb-2 text-gray-500">
          General
        </Text>
        <SettingRow
          title="My NFTs"
          subTitle="Your wallet NFTs"
          leftIcon={
            <View className="bg-blue-100 p-2 rounded-full">
              <Ionicons name="wallet" size={26} color={tailwindColors.blue["500"]} />
            </View>
          }
          rightIcon={
            <Ionicons name="chevron-forward" size={22} color="#4a5568" />
          }
          onPress={() => navigation.navigate("MyNFTs")}
        />
        <Text className="text-lg font-semibold mb-2 text-gray-500">
          Others
        </Text>
        <SettingRow
          title="Security"
          subTitle="Your Account Security"
          leftIcon={
            <View className="bg-orange-100 p-2 rounded-full">
              <Ionicons name="shield-checkmark" size={26} color="orange" />
            </View>
          }
          rightIcon={
            <Ionicons name="chevron-forward" size={22} color="#4a5568" />
          }
          onPress={() => {}}
        />
        <SettingRow
          title="Help"
          subTitle="Need More Help"
          leftIcon={
            <View className="bg-red-100 p-2 rounded-full">
              <Ionicons name="help-circle" size={26} color="red" />
            </View>
          }
          rightIcon={
            <Ionicons name="chevron-forward" size={22} color="#4a5568" />
          }
          onPress={() => {}}
        />
        <SettingRow
          title="Privacy Policy"
          subTitle="Learn About Privacy Of App"
          leftIcon={
            <View className="bg-yellow-100 p-2 rounded-full">
              <Ionicons name="document-text-sharp" size={26} color="#d69e2e" />
            </View>
          }
          rightIcon={
            <Ionicons name="chevron-forward" size={22} color="#4a5568" />
          }
          onPress={() => {}}
        />
        <SettingRow
          title="Community"
          subTitle="Get Connected With Fellow Investors"
          leftIcon={
            <View className="bg-blue-200 p-2 rounded-full">
              <Ionicons name="people-circle" size={26} color="#4299e1" />
            </View>
          }
          rightIcon={
            <Ionicons name="chevron-forward" size={22} color="#4a5568" />
          }
          onPress={() => {}}
        />
      </View>
      {/* <View>
        {!!connector?.connected && (
          <TouchableOpacity
            className="flex items-center justify-center space-x-2 border border-gray-500 rounded-md shadow-sm p-3 mb-3 mx-3"
            onPress={killSession}
          >
              <Text className="text-lg text-gray-500 font-semibold">
                Disconnect
              </Text>
          </TouchableOpacity>
        )}
      </View> */}
      </ScrollView>
    </Layout>
  );
};

export default ProfileScreen;
