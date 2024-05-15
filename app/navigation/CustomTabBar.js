import React from 'react'; 

import {View, Pressable, Dimensions, StyleSheet, Text, useColorScheme} from 'react-native'
import tailwindColors from '../constants/tailwindColors';
// import NavigationIcon from './navigationIcon'; 

const {width} = Dimensions.get('window')

const CustomTabBar = ({ state, descriptors, navigation  }) =>{
  // console.log("Props", props)
  const scheme = useColorScheme();
  const bg = scheme == 'dark' ? "bg-gray-800 " : "bg-gray-50"
  const iconFocused = scheme == 'dark' ? "bg-gray-800 " : "bg-gray-50"
  return (
    <View className={`flex flex-row bg-gray-50 dark:bg-gray-900 shadow absolute rounded-3xl bottom-4 mx-4 border border-gray-100 dark:border-gray-800`}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const icon = options.tabBarIcon;
        // console.log("Icon",icon)

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
          <View key = {index} style = {[styles.mainItemContainer, {borderRightWidth: label=="notes"? 3:0}]}>
            <Pressable
              onPress = {onPress}
              // style={{backgroundColor: isFocused?"#030D16": "#182028", borderRadius: 20, }}
              className={`rounded-2xl ${
                  isFocused && "bg-cyan-100 dark:bg-gray-700"
              }`}
            >
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10 }}>
                {/* <NavigationIcon route={label} isFocused={isFocused}/> */}
                <Text style={{ color: isFocused ? tailwindColors.cyan[500] : '#414141' }}>{icon("#fff")}</Text>
                {/* <Text className={`${scheme == "dark" ? "text-gray-50" : "text-gray-700"} text-xs font-light`}>{label}</Text> */}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    backgroundColor: "#182028",
    borderRadius: 25,
    marginHorizontal: width*0.1
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 10,
    borderRadius: 1, 
    borderColor: "#333B42"
  }, 
})


export default CustomTabBar; 