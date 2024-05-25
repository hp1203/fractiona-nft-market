// import { Stack } from 'expo-router';
import { Feather } from "@expo/vector-icons";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Constants from "expo-constants";
import tailwindColors from "../constants/tailwindColors";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 350;

const ParallaxScrollView = () => {
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

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
        <Animated.Image
          source={{
            uri: require("../assets/images/nfts/4.png")
          }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View
          style={{ height: 2000 }}
          className="bg-gray-900 rounded-t-3xl -mt-5"
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Parallax Scroll
          </Text>
        </View>
      </Animated.ScrollView>
      <Animated.View 
        style={headerAnimatedStyle}
        className="flex w-full h-20 border bg-gray-900 flex-row justify-center items-center pt-3 absolute shadow-sm"
      >
        <Text className="text-white text-xl font-semibold text-center">Nft Name</Text>
        </Animated.View>
      <Animated.View
        className="flex w-full h-24 flex-row absolute justify-between items-center px-3"
      >
        <Pressable className="p-2 rounded-full bg-gray-900/70 flex items-center justify-center">
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
export default ParallaxScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  header: {
    // backgroundColor: '#fff',
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
