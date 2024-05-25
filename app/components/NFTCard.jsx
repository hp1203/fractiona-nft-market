import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

const NFTCard = ({nftName, nftImage, contract, tokenId}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex p-4 rounded-2xl border border-gray-800 space-y-3"
      onPress={() => navigation.navigate("SingleNFT", {
        contract,
        tokenId
      })}
    >
      <Image
        source={{
          uri: nftImage
        }}
        resizeMode="cover"
        className="h-64 w-full rounded-xl"
      />
      <Text className="text-white font-semibold text-xl">{nftName}</Text>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center space-x-2">
          {/* <MaterialCommunityIcons name='ethereum' size={20} color={tailwindColors.gray["300"]}/> */}
          <View>
            <Text className="text-gray-500 text-xs font-bold">Price</Text>
            <Text className="text-white text-base font-medium">0.002 ETH</Text>
          </View>
        </View>
        <View className="flex flex-row items-center space-x-2">
          {/* <MaterialCommunityIcons name='ethereum' size={20} color={tailwindColors.gray["300"]}/> */}
          <View>
            <Text className="text-gray-500 text-xs font-bold">Volume</Text>
            <Text className="text-white text-base font-medium">2.5 ETH</Text>
          </View>
        </View>
      </View>
      {/* <Pressable className="p-3 rounded-full bg-yellow-400">
        <Text className="font-semibold text-gray-900 text-base text-center">Buy in Fraction</Text>
      </Pressable> */}
      <View className="flex border-t border-gray-800 pt-3 flex-row items-center space-x-2">
        <Image
          source={require("../assets/images/nfts/4.png")}
          className="w-8 h-8 rounded-full object-contain"
        />
        <View>
          <Text className="text-gray-500 text-xs font-bold">Listed By</Text>
          <Text className="text-white text-sm font-bold">XIBOT</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NFTCard;
