import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Layout from "../components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import useUtils from "../utils";
import tailwindColors from "../constants/tailwindColors";
import { useState } from "react";

const FractionalizeNFTScreen = () => {
  const navigation = useNavigation();
  const { nft } = useRoute().params;
  const { shortenAddress } = useUtils();
  const [number, setNumber] = useState(0);
  return (
    <Layout>
      <ScrollView
        showsVerticalScrollIndicator="false"
        className="m-3 flex space-y-3"
      >
        <View
          className="flex flex-row p-4 rounded-2xl border border-gray-800 space-y-3"
        >
          <Image
            source={{
              uri: nft.image.originalUrl || nft.image.cachedUrl,
            }}
            resizeMode="cover"
            className="h-28 w-28 rounded-xl"
          />
          <View className="flex space-y-2 ml-3">
            <Text className="text-white font-semibold text-2xl">
              {nft.name}
            </Text>
            <Text className="font-medium text-gray-300 text-lg">
              Token ID: {nft.tokenId}
            </Text>
            <Text className="text-gray-400 font-medium text-lg">
              {shortenAddress(nft.contract.address)}
            </Text>
          </View>
        </View>

        <TextInput
          placeholder="Enter Number of Fractions"
          keyboardType="number-pad"
          className="h-16 text-white text-lg border rounded-2xl px-3 border-gray-400"
          placeholderTextColor={tailwindColors.gray["400"]}
          onChangeText={(text) => setNumber(text)}
          value={number}
        />

        <Pressable
          className="flex items-center justify-center bg-yellow-400 p-3 rounded-full"
        >
          <Text className="text-gray-900 text-xl font-semibold">Make Fractions</Text>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default FractionalizeNFTScreen;
