import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import { ToastProvider as TP } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";

const ToastProvider = ({ children }) => {
  return (
    <TP
      offset={50} // offset for both top and bottom toasts
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      renderType={{
        custom_success: (toast) => (
          <View className="flex-row items-center space-x-1 p-3 rounded-full bg-gray-100 shadow-md">
            <Ionicons name="checkmark-circle" size={22} color="green" />
            <Text className="text-gray-800 font-semibold text-base">
              {toast.message}
            </Text>
          </View>
        ),
        custom_error: (toast) => (
          <View className="flex-row items-center space-x-1 p-3 rounded-full bg-gray-100 shadow-md">
            <Ionicons name="alert-circle" size={22} color="red" />
            <Text className="text-gray-800 font-semibold text-base">
              {toast.message}
            </Text>
          </View>
        ),
      }}
    >
      {children}
    </TP>
  );
};

export default ToastProvider;