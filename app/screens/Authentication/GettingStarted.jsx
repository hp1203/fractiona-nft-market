import { Marquee } from "@animatereactnative/marquee";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import tailwindColors from "../../constants/tailwindColors";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../store/authConfig";
const GettingStarted = () => {
  const dispatch = useDispatch();
  const login = () => {
    dispatch(loginUser("sdsdfsdfsdf"))
  }

  return (
    <View className="flex h-full bg-gray-900 w-full relative">
    <View className="flex h-full bg-gray-900 w-full ">
      <View className="flex absolute right-0 left-0 gap-4 -skew-y-12">
        <Marquee spacing={16} speed={1}>
          <View className="flex flex-row gap-4 w-full">
            <Image
              source={require("../../assets/images/nfts/1.webp")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/2.webp")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/3.jpeg")}
              className="w-28 h-36 rounded-xl"
            />
          </View>
        </Marquee>
        <Marquee spacing={16} speed={1}>
          <View className="flex flex-row gap-4">
            <Image
              source={require("../../assets/images/nfts/4.png")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/5.webp")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/6.png")}
              className="w-28 h-36 rounded-xl"
            />
          </View>
        </Marquee>
        <Marquee spacing={16} speed={1}>
          <View className="flex flex-row gap-4">
            <Image
              source={require("../../assets/images/nfts/7.webp")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/8.webp")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/9.webp")}
              className="w-28 h-36 rounded-xl"
            />
          </View>
        </Marquee>
        <Marquee spacing={16} speed={1}>
          <View className="flex flex-row gap-4">
            <Image
              source={require("../../assets/images/nfts/1.webp")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/3.jpeg")}
              className="w-28 h-36 rounded-xl"
            />
            <Image
              source={require("../../assets/images/nfts/2.webp")}
              className="w-28 h-36 rounded-xl"
            />
          </View>
        </Marquee>
      </View>
      <LinearGradient
        colors={["rgba(17,24,39,1.0)", "transparent"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "20%",
          top: 0,
        }}
      />
      <LinearGradient
        colors={["transparent", "rgba(17,24,39,1.0)", "rgba(17,24,39,1.0)"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "60%",
          bottom: 0,
        }}
      >
        <View className="flex h-full justify-center p-7 space-y-5 items-center">
          <Text className="text-white font-bold text-4xl tracking-wider text-center">
            Discover Fractional {"\n"}NFT Collection
          </Text>
          <Text className="text-gray-300 text-center text-lg">
            Explore the top collection of NFTs and {"\n"} buy and sell NFTs in
            fractions.
          </Text>

          <TouchableOpacity className="bg-gray-50 absolute bottom-8 flex flex-row p-1 rounded-full" onPress={login}>
            <View className="flex-1 p-4">
              <Text className="text-xl font-semibold">Start Experience</Text>
            </View>
            <View className="bg-yellow-400 items-center justify-center rounded-full w-14 h-14">
                <Feather name="arrow-right-circle" size={28} color={tailwindColors.gray["900"]} />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
    </View>
  );
};

export default GettingStarted;
