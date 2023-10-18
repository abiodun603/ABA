import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import Font from '../../constants/Font';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import AntDesign from "@expo/vector-icons/AntDesign"
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import { COLORS, SIZES } from '../../assets';
import Animated from 'react-native-reanimated';
import menu from "../../assets/images/icons/menu-left.png"
// import { NavigationScreenProps } from '@react-navigation/native'
// import type { CompositeNavigationProp } from '@react-navigation/native';
// import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
const w = Dimensions.get('window').width


// 
interface HeaderProps {
  title?: string;
  onPress?: () => void;
  iconButton?: boolean;
  rightNavigation?: boolean | string;
  rightNavPress?: () => void;
  drawerNav?: boolean;
  navigation?:any;
  iconName? : any;
  extraOneIcon? : any;
  profileIcon?:boolean;
  iconColor? : any;
}

const Header: React.FC<HeaderProps> = ({ title, extraOneIcon, profileIcon, drawerNav, navigation, iconColor, iconName, onPress=()=>{},rightNavPress=()=>{}, iconButton, rightNavigation}) => {

  const navigate = useNavigation()

  return (
    // <SafeAreaView>
      <Animated.View style={styles.header}>
        {
          drawerNav ? 
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              borderRadius: SIZES.radius
            }}
            onPress = {() => navigation.openDrawer()}
          >
            <Image source={menu}/>
          </TouchableOpacity>
          : <MaterialIcons name="keyboard-arrow-left" size={28} onPress={() => navigate.goBack()} style={styles.icon} />
        }
        
        <Text
          style={{color: "#101828", fontSize:16, fontFamily: Font["inter-medium"]}}
        >
          {title}
        </Text>
        <View className='flex flex-row items-center space-x-2'>
          {rightNavigation && 
          <TouchableOpacity
            onPress={rightNavPress}
          >
            <Text style={{color: Colors.text, fontFamily: Font['inter-medium'], fontSize: FontSize.small}}>{rightNavigation}</Text>
          </TouchableOpacity>
          }
          
          
          {
            extraOneIcon && 
            <TouchableOpacity
              onPress={onPress}
            >
              <Ionicons name={extraOneIcon} size={25} color={iconColor}  />
            </TouchableOpacity>
          }
          {
            iconName && 
            <TouchableOpacity
              onPress={onPress}
            >
              <MaterialCommunityIcons name={iconName} size={25} color={iconColor}  />
            </TouchableOpacity>
          }
          {
            profileIcon && 
            <TouchableOpacity
              onPress={onPress}
              className='p-2 bg-[#FFD7F3] rounded-full '
              
            >
              <AntDesign name="user" size={20} color="#A3229A"  />
            </TouchableOpacity>
          }
        
        </View>
      </Animated.View>
    // </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: 50,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  icon: {

  }
})