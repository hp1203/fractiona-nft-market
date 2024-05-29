import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigation";
import CustomDrawer from "../components/CustomDrawer";
import MyNFTsScreen from "../screens/MyNFTsScreen";
import tailwindColors from "../constants/tailwindColors";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="FractionNFT"
        component={TabNavigation}
        options={{
            headerShown: false
        }}
      />
      <Drawer.Screen
        name="MyNFTs"
        component={MyNFTsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
