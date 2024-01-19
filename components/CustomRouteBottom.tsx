import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

interface CustomRouteBottomProps {
  title: string;
  onPress: () => void
}

const CustomRouteBottom: React.FC<CustomRouteBottomProps> = ({title, onPress=()=>{}}) => {
  return (
    <View className='h-[84px] border border-gray-300 w-full px-4 flex justify-center items-center'>
      <CustomButton 
        title= {title}
        onPress={onPress}
      />
    </View>
  )
}

export default CustomRouteBottom

const styles = StyleSheet.create({
  
})