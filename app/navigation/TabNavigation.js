import {
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./CustomTabBar";
import tailwindColors from "../constants/tailwindColors";
import UserNFTsScreen from "../screens/UserNFTsScreen";
  
const TabNavigation = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#fdfdfd",
        headerTitleStyle:{
          fontWeight: "600",
          fontSize: 24
        },
        headerTintColor: tailwindColors.cyan[500],
      }}
          tabBar={(props) => <CustomTabBar {...props} />}
        // tabBar={props => <MyTabBar {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="UserNFT"
        component={UserNFTsScreen}
        options={{
          tabBarLabel: "NFTs",
          title: "Your Fractional NFTs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Staking"
        component={HomeScreen}
        options={{
          title: "Stake NFTs",
          tabBarIcon: ({ color }) => (
            <Feather name="bar-chart-2" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={HomeScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={24} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigation;