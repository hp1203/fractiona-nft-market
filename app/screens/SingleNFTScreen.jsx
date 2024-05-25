// import { Stack } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import tailwindColors from "../constants/tailwindColors";
import { Link, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";
const { width } = Dimensions.get("window");
const IMG_HEIGHT = 350;

const SingleNFTScreen = () => {
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contract, tokenId } = useRoute().params;

  const { getNFTMetadata } = useAlchemy();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      getNFTMetadata(contract, tokenId)
        .then((res) => {
          setNft(res);
          console.log("SingleNFT", res);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error", err);
        });
    };
    fetchData();
  }, [contract]);

  return (
    <View style={styles.container} className="bg-gray-900 relative">
      {/* <Stack.Screen
				options={{
					headerTransparent: true,
					headerLeft: () => <Text>Back</Text>,
					headerBackground: () => <Animated.View style={[styles.header, headerAnimatedStyle]} />
				}}
			/> */}

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {loading == false && nft !== null && (
          <>
            <Animated.Image
              source={{
                uri: nft
                  ? nft.image.originalUrl
                  : "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
              }}
              style={[styles.image, imageAnimatedStyle]}
            />
            <View className="bg-gray-900 rounded-t-3xl -mt-5 p-5 pt-8 flex flex-1 space-y-3">
              <Text className="text-2xl text-white font-bold mb-3">
                {nft?.name}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex flex-row space-x-3 mb-2"
              >
                <Pressable
                  className="flex flex-row space-x-2 items-center bg-gray-800 rounded-full w-fit p-2 px-3"
                  onPress={() => Linking.openURL(nft.tokenUri)}
                >
                  <Feather
                    name="external-link"
                    size={18}
                    color={tailwindColors.gray[500]}
                  />
                  <Text className="text-gray-500 font-medium">Token URL</Text>
                </Pressable>
                <Pressable className="flex flex-row space-x-2 items-center bg-gray-800 rounded-full w-fit p-2 px-3">
                  <MaterialCommunityIcons
                    name="ethereum"
                    size={18}
                    color={tailwindColors.gray[500]}
                  />
                  <Text className="text-gray-500 font-medium">
                    {nft.tokenType}
                  </Text>
                </Pressable>
              </ScrollView>
              <Text className="text-base text-white font-normal">
                {nft?.description}
              </Text>

              <View className="flex border border-gray-800 p-3 rounded-xl flex-row items-center space-x-2">
                <Image
                  source={{
                    uri: nft.collection.bannerImageUrl,
                  }}
                  className="w-16 h-16 rounded-full object-contain border border-gray-500"
                />
                <View>
                  <Text className="text-gray-500 text-base font-semibold">
                    Collection
                  </Text>
                  <Text className="text-white text-lg font-bold">
                    {nft.collection.name}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </Animated.ScrollView>
      {loading == false && nft !== null && (
      <View className="flex w-full p-3 absolute bottom-0 bg-gray-900">
        <Pressable className="rounded-full p-3 flex items-center justify-center bg-yellow-400" onPress={() => navigation.navigate("FractionalizeNFT", {
          nft
        })}>
          <Text className="text-gray-900 text-xl font-semibold">
            Fractionalize this NFT
          </Text>
        </Pressable>
      </View>
      )}
      <Animated.View
        style={headerAnimatedStyle}
        className="flex w-full h-20 border bg-gray-900 flex-row justify-center items-center pt-3 absolute shadow-sm"
      >
        <Text className="text-white text-xl font-semibold text-center">
          {nft?.name}
        </Text>
      </Animated.View>
      <Animated.View className="flex w-full h-24 flex-row absolute justify-between items-center px-3">
        <Pressable
          className="p-2 rounded-full bg-gray-900/70 flex items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="arrow-left"
            color={tailwindColors.gray[50]}
            size={28}
          />
        </Pressable>
        <Pressable className="p-2 rounded-full bg-gray-900/70 flex items-center justify-center">
          <Feather name="heart" color={tailwindColors.gray[50]} size={28} />
        </Pressable>
      </Animated.View>
    </View>
  );
};
export default SingleNFTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:80
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
    borderWidth: 1,
  },
  header: {
    // backgroundColor: '#fff',
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
