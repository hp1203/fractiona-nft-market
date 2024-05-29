import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import tailwindColors from "../constants/tailwindColors";
import { useSelector } from "react-redux";
import SingleNFTScreen from "../screens/SingleNFTScreen";
import FractionalizeNFTScreen from "../screens/FractionalizeNFTScreen";
import MyNFTsScreen from "../screens/MyNFTsScreen";
import DrawerNavigation from "./DrawerNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import MintNFTScreen from "../screens/MintNFTScreen";

const RootNavigation = () => {
  const RootStack = createNativeStackNavigator();
  const { isLogin, access_token } = useSelector((state) => state.authconfig);
  // console.log("Access Token", access_token);
  if (!isLogin) {
    return <AuthNavigation />;
  }
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: tailwindColors.cyan[500],
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        },
        headerTintColor: "#fff",
      }}
    >
      {/* <RootStack.Screen
        name="Auth"
        component={AuthNavigation}
        options={{
          headerShown: false,
        }}
      /> */}
      <RootStack.Screen
        name="Root"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SingleNFT"
        component={SingleNFTScreen}
        options={{
          headerShown: false
        }}
      />
      <RootStack.Screen
        name="FractionalizeNFT"
        component={FractionalizeNFTScreen}
        options={({navigation}) => ({
          headerTitle: "Fractionalize NFT",
          presentation: "formSheet",
          headerStyle: {
            backgroundColor: tailwindColors.gray["900"]
          },
          headerTintColor: tailwindColors.yellow["400"],
          headerRight: () => {
            return (
              <Pressable className="flex flex-row items-center space-x-1" onPress={() => navigation.goBack()}>
                <Ionicons name="close" color={tailwindColors.yellow["400"]} size={28}/>
              </Pressable>
            )
          }
        })}
      />
      <RootStack.Screen
        name="MyNFTs"
        component={MyNFTsScreen}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: tailwindColors.gray["900"]
          },
          headerTintColor: tailwindColors.yellow["400"],
          headerRight: () => {
            return (
              <Pressable className="flex flex-row items-center space-x-1" onPress={() => navigation.navigate("MintNFT")}>
                <Ionicons name="add-circle" color={tailwindColors.yellow["400"]} size={26}/>
                <Text className="text-yellow-400 font-semibold text-xl">Mint</Text>
              </Pressable>
            )
          }
        })}
      />
      <RootStack.Screen
        name="MintNFT"
        component={MintNFTScreen}
        options={({navigation}) => ({
          headerTitle: "Mint New NFT",
          presentation: "formSheet",
          headerStyle: {
            backgroundColor: tailwindColors.gray["900"]
          },
          headerTintColor: tailwindColors.yellow["400"],
          headerRight: () => {
            return (
              <Pressable className="flex flex-row items-center space-x-1" onPress={() => navigation.goBack()}>
                <Ionicons name="close" color={tailwindColors.yellow["400"]} size={28}/>
              </Pressable>
            )
          }
        })}
      />
      
    </RootStack.Navigator>
  );
};

export default RootNavigation;
