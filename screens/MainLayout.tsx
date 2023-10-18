import React from 'react'
import {StyleSheet, Text, View,Image,TouchableWithoutFeedback, FlatList } from 'react-native'

// ** Third Party 
import {LinearGradient} from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

// ** Assets
import { COLORS, FONTS, SIZES } from '../assets'

// ** Image
import home from "../assets/icons/home.png"
import chat from "../assets/icons/chat.png"
import community from "../assets/icons/people.png"
import profile from "../assets/icons/profile.png"

// ** Constants
import {constants} from "../constants"
import {connect} from "react-redux"

// ** State Management
import { setSelectedTab } from '../stores/tab/tabAction'

// ** Components
import Colors from '../constants/Colors'
import Home from './Home'
import Messages from './messages/Messages'
import Community from './Community'
import Profile from './Profile'
import Contact from './Contact';

// ** Images



const TabButton = ({label, icon, isFocused,onPress, outerContainerStyle, innerContainerStyle}: {label: string, icon: any,isFocused: boolean, onPress: () => void, outerContainerStyle: any,  innerContainerStyle: any}) => {
    return (
        <TouchableWithoutFeedback
          onPress = {onPress} 
        >
          <Animated.View
            style={[{
              flex: 1,
              // alignItems: "center",
              // justifyContent: "center",
              height: 50,
              borderRadius: 25,
              paddingHorizontal: 15,
            }, outerContainerStyle]}
          >
            <Animated.View
              style={[{
                // flexDirection: "col",
                alignItems: "center",
                justifyContent: "center",
              }, innerContainerStyle]}
            >
              <View className={ isFocused ? 'px-4 py-1 rounded-2xl bg-[#FFD7F3]': undefined }>
                <Image 
                  source={icon} 
                  style={{
                    width: 20, 
                    height: 20, 
                    tintColor: isFocused? "#000000" : "#262626"
                    
                  }}

                />
              </View>
              

              {isFocused && 
                <Text
                  numberOfLines = {1}
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body5,
                    color: isFocused? "#1F1A1D" : "#262626"
                  }}
                >
                  {label}
                </Text>
              }
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
    )
   
 }
// const curr__user = {
//     display__name : "Olatunji Abiodun",
//     user__image : require("../assets/images/profile/about1.jpeg")
// }

const MainLayout = ({navigation, selectedTab, setSelectedTab}: {navigation: any, selectedTab: any, setSelectedTab: any}) => {
    const flatListRef = React.useRef<any>(null)
    
    // Reanimated Shared Value

    const homeTabFlex = useSharedValue(1)
    const homeTabColor = useSharedValue(COLORS.white)
    const messagesTabFlex = useSharedValue(1)
    const messagesTabColor = useSharedValue(COLORS.white)
    const contactTabFlex = useSharedValue(1)
    const contactTabColor = useSharedValue(COLORS.white)
    const padTabFlex = useSharedValue(1)
    const padTabColor = useSharedValue(COLORS.white)
    const notificationTabFlex = useSharedValue(1)
    const notificationTabColor = useSharedValue(COLORS.white)

    // Reanimated Animated Style
    const homeFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value
        }
    })

    const homeColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value
        }
    })

    const contactFlexStyle = useAnimatedStyle(() => {
      return {
          flex: contactTabFlex.value
      }
  })

  const contactColorStyle = useAnimatedStyle(() => {
      return {
          backgroundColor: contactTabColor.value
      }
  })

    
    const messagesFlexStyle = useAnimatedStyle(() => {
        return {
            flex: messagesTabFlex.value
        }
    })

    const messagesColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: messagesTabColor.value
        }
    })

    const padFlexStyle = useAnimatedStyle(() => {
      return {
          flex: padTabFlex.value
      }
  })

  const padColorStyle = useAnimatedStyle(() => {
      return {
          backgroundColor: padTabColor.value
      }
  })

    const notificationFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value
        }
    })

    const notificationColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: notificationTabColor.value
        }
    })
    
    React.useEffect(() => {
        setSelectedTab(constants.screens.home)
    }, [])

    React.useEffect(() =>{
        if(selectedTab == constants.screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                animated: false
            })
            homeTabFlex.value = withTiming(4 , {duration: 500})
            homeTabColor.value = withTiming(Colors.transparent, {duration: 500})
        }else {
            homeTabFlex.value = withTiming(1 , {duration: 500})
            homeTabColor.value = withTiming(COLORS.white, {duration: 500})
        }
        
        if(selectedTab == constants.screens.contact) {
          flatListRef?.current?.scrollToIndex({
              index: 1,
              animated: false
          })
          contactTabFlex.value = withTiming(4 , {duration: 500})
          contactTabColor.value = withTiming(Colors.transparent, {duration: 500})
        }else {
          contactTabFlex.value = withTiming(1 , {duration: 500})
          contactTabColor.value = withTiming(COLORS.white, {duration: 500})
        }

        if(selectedTab == constants.screens.chats) {
            flatListRef?.current?.scrollToIndex({
                index: 2,
                animated: false
            })
            messagesTabFlex.value = withTiming(4 , {duration: 500})
            messagesTabColor.value = withTiming(Colors.transparent, {duration: 500})
        }else {
            messagesTabFlex.value = withTiming(1 , {duration: 500})
            messagesTabColor.value = withTiming(COLORS.white, {duration: 500})
            
        }

        if(selectedTab == constants.screens.community) {
            flatListRef?.current?.scrollToIndex({
                index: 3,
                animated: false
            })
            padTabFlex.value = withTiming(4 , {duration: 500})
            padTabColor.value = withTiming(Colors.transparent, {duration: 500})
        }else {
            padTabFlex.value = withTiming(1 , {duration: 500})
            padTabColor.value = withTiming(COLORS.white, {duration: 500})
        }
        
        if(selectedTab == constants.screens.profile) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                animated: false
            })
            notificationTabFlex.value = withTiming(4 , {duration: 500})
            notificationTabColor.value = withTiming(Colors.transparent, {duration: 500})
        }else {
            notificationTabFlex.value = withTiming(1 , {duration: 500})
            notificationTabColor.value = withTiming(COLORS.white, {duration: 500})
        }
    },[selectedTab])
    return (
        <Animated.View style={{flex:1, backgroundColor: COLORS.white}}>


            <View style ={{flex:1}}>
              <FlatList
                ref={flatListRef}
                // horizontal
                scrollEnabled={false}
                pagingEnabled
                snapToAlignment="center"
                snapToInterval = {SIZES.width}
                showsHorizontalScrollIndicator={false}
                data={constants.sidebar__tabs}
                keyExtractor={item => `${item.id}`}
                renderItem={({item, index}) => {
                  return(
                    <View
                      style = {{
                        height: SIZES.height,
                        width: SIZES.width
                      }}
                    >
                      {item.label === constants.screens.home && <Home navigation={navigation}/>}
                      {item.label == constants.screens.contact && <Contact navigation={navigation}/>}
                      {item.label == constants.screens.chats && <Messages navigation={navigation}/>}
                      {item.label == constants.screens.community && <Community navigation={navigation}/>}
                      {item.label == constants.screens.profile && <Profile navigation={navigation}/>}
                    </View>
                  )
                }}
              />
            </View>

            <View style = {{
                // flex:1,
                height: 90,
                alignItems: "center",
                justifyContent: 'flex-end'
            }}>
              {/* Shadow */}
              <LinearGradient
                start={{x:0, y: 0}}
                end={{x: 0, y:4}}
                colors = {[
                  COLORS.transparent,
                  COLORS.transparent
                ]}
                style={{
                  position: 'absolute',
                  top: -1,
                  left: 0,
                  right: 0,
                  height: 90,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15
                }}
              />

                {/* Tabs */}
                <View
                  style={{
                    flex:1,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: SIZES.radius,
                    paddingBottom: 10,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    backgroundColor: COLORS.white
                  }}
                >
                  <TabButton
                    label="Home"
                    icon={home}
                    isFocused={selectedTab == constants.screens.home}
                    outerContainerStyle ={homeColorStyle}
                    innerContainerStyle = {homeFlexStyle}
                    onPress={() => setSelectedTab(constants.screens.home)}
                  />
                  <TabButton
                    label="Contact"
                    icon={chat}
                    isFocused={selectedTab == constants.screens.contact}
                    outerContainerStyle ={contactColorStyle}
                    innerContainerStyle = {contactFlexStyle}
                    onPress={() => setSelectedTab(constants.screens.contact)}
                  />

                  <TabButton
                    label="Chats"
                    icon={chat}
                    isFocused={selectedTab == constants.screens.chats}
                    outerContainerStyle ={messagesColorStyle}
                    innerContainerStyle = {messagesFlexStyle}
                    onPress={() => setSelectedTab(constants.screens.chats)}
                  />

                  <TabButton
                    label={constants.screens.community}
                    icon={community}
                    isFocused={selectedTab == constants.screens.community}
                    outerContainerStyle ={padColorStyle}
                    innerContainerStyle = {padFlexStyle}
                    onPress={() => setSelectedTab(constants.screens.community)}
                  />

                  <TabButton
                    label={constants.screens.profile}
                    icon={profile}
                    isFocused={selectedTab == constants.screens.profile}
                    outerContainerStyle ={notificationColorStyle}
                    innerContainerStyle = {notificationFlexStyle}
                    onPress={() => setSelectedTab(constants.screens.profile)}
                  />
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
})

function  mapStateToProps (state: { tabReducer: { selectedTab: any } }){
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch: any){
    return {
    setSelectedTab: (selectedTab: any) => {
           return dispatch(setSelectedTab(selectedTab))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)