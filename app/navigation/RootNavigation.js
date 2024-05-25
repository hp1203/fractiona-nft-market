import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import tailwindColors from "../constants/tailwindColors";
import { useSelector } from "react-redux";
import SingleNFTScreen from "../screens/SingleNFTScreen";
import FractionalizeNFTScreen from "../screens/FractionalizeNFTScreen";

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
        options={{
          headerShown: false
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
