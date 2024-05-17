import React from 'react'; 

import {View, Pressable, Dimensions, StyleSheet, Text, useColorScheme} from 'react-native'
import tailwindColors from '../constants/tailwindColors';
// import NavigationIcon from './navigationIcon'; 

const {width} = Dimensions.get('window')

const CustomTabBar = ({ state, descriptors, navigation  }) =>{
  return (
    <View className={`flex flex-row justify-evenly p-2 bg-gray-50 dark:bg-gray-700 absolute rounded-full bottom-4 mx-3 border border-gray-100 dark:border-gray-800`}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key = {index} style = {[styles.mainItemContainer]}>
            <Pressable
              onPress = {onPress}
              className={`rounded-full ${
                  isFocused && "bg-yellow-400 dark:bg-gray-700"
              }`}
            >
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection:"row", padding: 10, gap: 5, paddingHorizontal:15 }} className="rounded-full">
                <Text style={{ color: isFocused ? tailwindColors.gray[900] : tailwindColors.gray[500] }}>{icon("#fff")}</Text>
                {isFocused && <Text className="text-sm font-semibold" style={{ color: isFocused ? tailwindColors.gray[900] : tailwindColors.gray[500], fontWeight: "700", fontSize: 12 }}>{label}</Text>}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    // margin: 10,
    // marginHorizontal:15,
    // borderWidth:1,
    borderRadius: 1, 
    borderColor: "#333B42"
  }, 
})


export default CustomTabBar; 