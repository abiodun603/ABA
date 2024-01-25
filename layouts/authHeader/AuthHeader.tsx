import { Dimensions, StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons"
import Font from '../../constants/Font';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
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
  iconColor? : any;
  head?: string
  description?: string
}

const AuthHeader: React.FC<HeaderProps> = ({ title, head, description, drawerNav, navigation, iconColor, iconName, onPress=()=>{},rightNavPress=()=>{}, iconButton, rightNavigation}) => {

  const navigate = useNavigation()

  return (
      <Animated.View className="">
        <View style={styles.header}>
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
            : <Ionicons name="ios-arrow-back" size={28} onPress={() => navigate.goBack()} style={styles.icon} />
          }
          
          <Text
            style={{color: "#101828", fontSize:16, fontFamily: Font["inter-medium"]}}
          >
            {title}
          </Text>
          <View>
            {rightNavigation && 
            <TouchableOpacity
              onPress={rightNavPress}
              className='w-[102px] h-[40px] items-center justify-center border border-[rgba(29 27 32 0.1)] rounded-full'
            >
              <Text style={{fontFamily: Font['inter-medium'], fontSize: FontSize.small}} className='text-kblack opacity-20'>{rightNavigation}</Text>
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
          
          </View>
        </View>
        {head && <Text  style={styles.head}>{head}</Text>}
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 
  },
  icon: {

  },
  title: {
    textAlign:"center",
    color: Colors.darkText,
    fontSize: FontSize.large,
    fontFamily:Font["inter-medium"],
    marginTop: 25
  },
  head: {
    color: "#1F1A1D",
    fontSize: FontSize.xLarge,
    fontFamily:Font["inter-medium"],
    marginTop: 15
  },
  description: {
    color: "#4E444B",
    fontSize: FontSize.small,
    fontFamily:Font["inter-medium"],
    marginVertical: 10,
    
  }
})