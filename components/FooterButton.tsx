import {  View } from 'react-native'
import React from 'react'

interface CustomRouteBottomProps {
  children: any
}

const CustomFooterButton: React.FC<CustomRouteBottomProps> = ({children}) => {
  return (
    <View className='h-[84px] border border-gray-300 w-full px-4 flex justify-center items-center'>
      {children}
    </View>
  )
}

export default CustomFooterButton

