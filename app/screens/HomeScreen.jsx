import { Pressable, ScrollView, Text, View } from "react-native";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useState } from "react";
import NFTCard from "../components/NFTCard";

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recent");
  const categories = [
    "Recent",
    "Trending",
    "Top",
    "Art",
    "Sports",
    "Gaming",
    "Photography",
    "Music",
    "Memberships",
  ];
  return (
    <Layout>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex justify-center py-10 pb-8 px-3">
          <Text className="text-4xl tracking-wider text-white font-semibold">
            List of Top Sellers{"\n"}and Creators
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex h-fit px-3 space-x-3"
          >
            {categories.map((category, index) => (
              <Pressable
                className={`border border-gray-800 p-1 px-5 rounded-full ${
                  selectedCategory == category ? "bg-yellow-400" : ""
                }`}
                key={index}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  className={`text-lg ${
                    selectedCategory == category
                      ? "text-gray-900 font-semibold"
                      : "text-gray-300"
                  }`}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View className="flex space-y-2 p-3 mt-5">
          <View className="flex flex-row items-baseline justify-between">
            <Text className="text-2xl text-white font-semibold">
              {selectedCategory}
            </Text>
            <Pressable>
              <Text className="text-xl font-semibold text-gray-500">
                See all
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            <View>
              <NFTCard />
            </View>

            <View>
              <NFTCard />
            </View>

            <View>
              <NFTCard />
            </View>

            <View>
              <NFTCard />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
