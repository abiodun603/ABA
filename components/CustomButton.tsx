import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import {Ionicons } from '@expo/vector-icons'; 

interface ButtonType {
  title: string;
  onPress?: ()=>void;
  style?: StyleProp<ViewStyle>;
  buttonColor? : any;
  titleColor? : any;
  buttonStyle? : any;
  textStyle? : any;
  iconName? : any;
  iconColor? : any;
  isLoading?: boolean;
}

const CustomButton: React.FC<ButtonType> = ({title, buttonStyle, isLoading = false, titleColor, buttonColor, textStyle,iconName, iconColor, onPress=()=>{}, ...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: buttonColor || Colors.secondary,
        ...buttonStyle,
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={titleColor || Colors.background} />
      ) : (
        <>
          {iconName && <Ionicons name={iconName} size={20} color={iconColor} />}
          <Text style={{ ...styles.title, ...textStyle, color: titleColor || Colors.background }}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 100,
    
  },
  title: {
    color: Colors.background, 
    fontSize: 14, 
    fontFamily: Font["inter-medium"]
  }
})