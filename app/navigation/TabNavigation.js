import {
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./CustomTabBar";
import tailwindColors from "../constants/tailwindColors";

const TabBarButton = () => {

}
  
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
            <MaterialIcons name="home" color={color} size={36} />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="MyPets"
        component={PetsScreen}
        options={{
          title: "Pets",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pets" color={color} size={36} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          title: "More",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" color={color} size={36} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={36} />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
};

export default TabNavigation;