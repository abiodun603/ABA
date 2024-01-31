import React, { useState } from 'react'
import {  Text, View, Image, TouchableOpacity, ImageSourcePropType, Modal } from 'react-native'
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer"
import {COLORS, SIZES, FONTS} from "../assets"
import document from "../assets/icons/document.png"
import calendar from "../assets/icons/calendar.png"
import setting from "../assets/icons/setting.png";
import star from "../assets/icons/star.png"
import support from "../assets/icons/support.png"
import logout from "../assets/images/icons/logout.png"
import {connect} from "react-redux"
import { setSelectedTab } from '../stores/tab/tabAction'
import { constants } from '../constants'
import MainLayout from '../screens/MainLayout'
import { Divider } from 'native-base'
import SimpleModal from '../components/modal/Modal'

const Drawer = createDrawerNavigator()

// const curr__user = {
//     display__name : "Olatunji Abiodun",
//     user__image : require("../assets/images/profile/about1.jpeg")
// }


const CustomDrawerItem = ({label, count, icon, onPress, isFocused}: {label: string, count?: string, icon: ImageSourcePropType, onPress?: ()=>void, isFocused?: boolean}) => {
    // const navigation = useNavigation()

    return(

      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <TouchableOpacity
          style ={{
          flexDirection: "row",
          height: 40,
          marginBottom: SIZES.base,
          alignItems: "center",
          paddingLeft: SIZES.radius,
          borderRadius: SIZES.radius,
          // backgroundColor: isFocused ? COLORS.white : null
        }}
          onPress = {onPress}
        >
          <Image 
            source={icon} 
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.black: COLORS.black
            }}
          />
          <Text style={{ marginLeft: 15, color: isFocused ? COLORS.blue : "#4E444B", ...FONTS.h4, letterSpacing: 0.9}}>{label}</Text>
        </TouchableOpacity>
        {count && <Text className='text-ktext text-sm font-medium'>{count}</Text>
}
      </View>
       
    )
}



const CustomDrawerContent = ({navigation, selectedTab, setSelectedTab}: {navigation: any, selectedTab: any, setSelectedTab: any}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [chooseData, setChooseData] = useState()
  const changeModalVisibility = (bool: boolean) => {
    setIsModalVisible(bool)
  }

  const setData = (data: any) => {
    setChooseData(data)
  }

  const handleLogout = () => {
    // Perform logout logic here if needed
    // socket.disconnect()
    setIsModalVisible(false);
    navigation.navigate('Login'); // Navigate to the login screen
  };

    // Close Delete Modal
    const onCloseModal = () => {
      changeModalVisibility(false)
    }

  return (
      <DrawerContentScrollView
          scrollEnabled={true}
          contentContainerStyle={{flex: 1, backgroundColor:"#FBF1F5"}}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20
          }}
        >
            {/*================== CLOSE BUTTON ================== */}
            <View 
              style = {{
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              {/* <TouchableOpacity
                style ={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => navigation.closeDrawer()}
              >
                <Image source={cross} style={{width: 15, height: 15, tintColor: COLORS.white}}/>
              </TouchableOpacity> */}
            </View>
            {/* ===================== PROFILE =================== */}
            <TouchableOpacity
                style={{
                    marginTop:SIZES.radius,
                    alignItems: "flex-start"
                }}
                onPress={() => console.log("Home Page")}
            >
                {/* <Image source={curr__user.user__image} 
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        marginTop: 25
                    }}
                /> */}
                {/* <Text style={{
                    marginTop: 20,
                    color: COLORS.white,
                    fontSize: 20,
                }}> 
                    {curr__user.display__name}
                </Text>
                <Text style = {{marginTop: 6, color: COLORS.white, fontFamily: Font["inter-regular"], fontSize: 14}}>View Profile</Text> */}
            </TouchableOpacity>
            {/* =========== DRAWER CONTENT =============== */}
            <View 
              style={{
                flex: 1,
                marginTop: SIZES.padding,
                justifyContent: 'space-between',
                paddingBottom: 20
              }}
            >
              <View>
                <CustomDrawerItem
                  label={constants.screens.contact}
                  icon = {document}
                  onPress= {() => {
                    setSelectedTab(constants.screens.contact)
                    navigation.navigate("MainLayout")
                }}
                  // count='100+'
                  isFocused={selectedTab == constants.screens.home}
                />
                <CustomDrawerItem
                  label={constants.screens.events}
                  icon = {calendar}
                  onPress= {() =>{
                      setSelectedTab(constants.screens.events)
                      navigation.navigate("MainLayout")
                  }}
                  // count='8'
                  isFocused = {selectedTab == constants.screens.settings}
                />
                <CustomDrawerItem
                  label={constants.screens.settings}
                  icon = {setting}
                  onPress= {() => {
                      navigation.navigate("Settings")
                  }}
                  isFocused = {selectedTab == constants.screens.settings}
                />
              </View>

              <View>
                <Divider style={{marginBottom: 20}}/>

                <CustomDrawerItem
                  label={constants.screens.rate}
                  icon = {star}
                  onPress= {() => {
                      navigation.navigate("Contact")
                  }}
                  isFocused = {selectedTab == constants.screens.contact}
                />
                {/* <CustomDrawerItem
                  label={constants.screens.support}
                  icon = {support}
                  onPress= {() => {
                      navigation.navigate("Account")
                  }}
                  isFocused = {selectedTab == constants.screens.contact}
                /> */}
                <CustomDrawerItem
                  label="Logout"
                  icon = {logout}
                  onPress={() => 
                    changeModalVisibility(!isModalVisible)
                    //  navigation.navigate("Login")
                  }
                />
                <Modal
                  transparent = {true}
                  animationType='fade'
                  visible = {isModalVisible}
                  onRequestClose={() => changeModalVisibility(false)}

                >
                  <SimpleModal
                    title='Log out?'
                    description={"Are you sure you want to logout out?\nThis action cannot be undone."}
                    buttonName='Log out'
                    onPressed = {handleLogout}
                    onCloseModal = {onCloseModal}
                  />
                </Modal>
              </View>
            </View>
        </View>
      </DrawerContentScrollView>
  )
}

const CustomDrawer = ({selectedTab, setSelectedTab}: {selectedTab: any, setSelectedTab:any}) => {
  return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FBF1F5",
        }}
      >
        <Drawer.Navigator
          initialRouteName="MainLayout"
          screenOptions={{headerShown: false}}
          drawerContent={(props: { navigation: any }) => {
            return (
              <CustomDrawerContent
                navigation ={props.navigation}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )
          }}
        >
          <Drawer.Screen name="MainLayout" >
            {(props) => <MainLayout {...props}/>}
          </Drawer.Screen>
        </Drawer.Navigator>
      </View>
  )
}

function  mapStateToProps (state: { tabReducer: { selectedTab: any } }){
  return {
    selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch:any){
  return {
    setSelectedTab: (selectedTab: any) => {
      return dispatch(setSelectedTab(selectedTab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)