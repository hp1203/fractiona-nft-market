import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";

const SettingRow = ({ title, subTitle, leftIcon, rightIcon, onPress }) => {
  return (
    <Pressable className="flex-row items-center space-x-3 bg-gray-800 rounded-md shadow-sm p-3 mb-3" onPress={onPress}>
      {leftIcon && leftIcon}
      <View className="flex-1">
        <Text className="text-lg text-gray-100 font-semibold">{title}</Text>
        <Text className="text-xs text-gray-400 font-semibold">{subTitle}</Text>
      </View>
      {rightIcon && rightIcon}
    </Pressable>
  );
};

export default SettingRow;
