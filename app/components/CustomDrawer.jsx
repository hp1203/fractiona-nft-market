import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Feather, Ionicons } from '@expo/vector-icons'
import tailwindColors from '../constants/tailwindColors'
import { useNavigation, useRoute } from '@react-navigation/native'

const DrawerItem = ({icon, title, isActive, onPress}) => {
    
    return (
        <Pressable className={`flex flex-row space-x-3 mx-3 p-4 rounded-full ${isActive ? 'bg-gray-800': ''}`} onPress={onPress}>
            {icon}
            <Text className="text-white text-xl font-medium">{title}</Text>
        </Pressable>
    )
}
const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.path);
  return (
    <View className="flex flex-1 bg-gray-900">
        <DrawerContentScrollView {...props}>
            <DrawerItem
                title={'My NFTs'}
                isActive={route.name === "MyNFTs"}
                icon={<Ionicons name="wallet-outline" color={tailwindColors.gray["300"]} size={26}/>}
                onPress={() => navigation.navigate("MyNFTs")}
            />
        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer
