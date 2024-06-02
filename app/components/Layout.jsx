import { Platform, SafeAreaView, ScrollView } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import tailwindColors from "../constants/tailwindColors";
const Layout = ({ children, ...otherProps }) => {
  return (
    <SafeAreaView
      style={{
          paddingTop:
            Platform.OS == "ios"
              ? Constants.statusBarHeight - 5
              : Constants.statusBarHeight + 8,
        }} className="flex flex-1 bg-gray-900 text-white" {...otherProps}>
          <StatusBar backgroundColor={tailwindColors.yellow[400]} style="light" />
        {children}
    </SafeAreaView>
  );
};

export default Layout;
