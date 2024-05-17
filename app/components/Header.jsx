import { W3mButton, W3mConnectButton, W3mNetworkButton } from '@web3modal/wagmi-react-native'
import { Text, View } from 'react-native'
import tailwindColors from '../constants/tailwindColors'
import ConnectButton from './ConnectButton'

const Header = () => {
  return (
    <View className="flex flex-row justify-between items-center px-3">
      <Text className="text-3xl font-bold text-yellow-400">NFT</Text>
      <W3mButton accountStyle={{ backgroundColor: tailwindColors.gray[800] }} connectStyle={{ backgroundColor: tailwindColors.gray[800] }} label='Connect Wallet'/>
      {/* <ConnectButton/> */}
      {/* <W3mNetworkButton/> */}
    </View>
  )
}

export default Header
