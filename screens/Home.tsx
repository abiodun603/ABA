import React, { FC, useEffect, useState } from 'react'
import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

// ** Constants 
import FontSize from '../constants/FontSize'

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import { Divider, FlatList } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import { Toast, ToastDescription, ToastTitle, VStack, useToast,AddIcon, Icon, MenuItem, MenuItemLabel } from "@gluestack-ui/themed";
import Fontisto from '@expo/vector-icons/Fontisto'
import BottomSheet from '../components/bottom-sheet/BottomSheet'
import { Colors, constants } from '../constants'
import Font from '../constants/Font'

//** Store and Action 
import { setSelectedTab } from '../stores/tab/tabAction'
import { connect } from 'react-redux'
import { useGetEventQuery, useGetEventsQuery, useSaveEventMutation } from '../stores/features/event/eventService'
import { useGetResourcesQuery, useSaveResourceMutation } from '../stores/features/resources/resourcesService'

// ** Helpers
import { ShortenedWord } from '../helpers/wordShorther'

// ** Components
import { CustomMenu } from '../components/Menu/Menu'
import { useGetProfileQuery } from '../stores/features/auth/authService'
import useGlobalState from '../hooks/global.state'
import socket from '../utils/socket'
import CustomButton from '../components/CustomButton'
import { interestTypes } from '../utils/dummy'
import All from '../views/HomeView/All'
import Going from '../views/HomeView/Going'
import Past from '../views/HomeView/Past'
import Saved from '../views/HomeView/Saved'
import TopNavavigationPanel from '../navigation/TopTabs'
import TopNavPanel from '../navigation/TopTabs'
import Calendar from '../views/HomeView/Calendar'

const Home = ({navigation}: {navigation: any}) => {
  const {user} = useGlobalState()
  const id = user?.id;
  const {data} = useGetProfileQuery(id)
  const docs = data?.docs;

  const TabData = [
    { name: "All", component: All },
    { name: "Going", component: Going },
    { name: "Saved", component: Saved },
    { name: "Past", component: Past },
  ];

  
  useEffect(() => {
    // Fetch contacts when the component mounts
    const addSocketId = () => {
      const data = {
        current_user : user?.id
      }
      console.log(data);
      socket.emit("addUser", data);
    };
    addSocketId();
   console.log("i just fired")
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("addUser");
      socket.disconnect();
    };
  }, []); 


  return (
    <Layout
      // title={docs && docs[0]?.firstname || `firstname`}
      title='ABA'
      navigation={navigation}
      iconName={"bell-outline"}
      iconColor="#000000"
      onPress={() => navigation.navigate("Notification")}
      drawerNav
      profileIcon
    >
      <ScrollView style={styles.container}>
        <View>
          <Text className='text-black text-3xl font-bold'>Hi Abiodun Olatunji 👋</Text>
          {/* ==== ===== */}
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-black text-sm opacity-50 font-semibold">Suggested events 🔍</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">Calender</Text>
          </View>
        </View>
        
        <View>
          {/*  */}
          <View className='w-full  p-4 border border-gray-400 shadow-sm rounded-md mt-8'>
            {/* Event Data */}
            <Text className='text-yellow-600 text-xs font-medium'>SAT,28 OCT 10:00 WAT</Text>
            {/* Event Description */}
            <Text className='text-sm text-black opacity-80 font-semibold mt-2'>Azure Community Con23: Exploring Innovative Possibilities with OpenAI, and Az...</Text>
            <Text className='text-gray-500 font-normal mt-1'>Nigeria Microsoft Azure Meetup Group</Text>

            {/* Action */}
            <View className="flex-row items-center justify-between mt-7">
              <Text>Lagos, LA</Text>
              <CustomButton title='View event' buttonStyle={{width: 150, height: 30, borderRadius: 6}} />
            </View>
          </View>
        </View>

        {/* Your Groups */}
        <View className='mt-10'>
          <View className="flex-row items-center justify-between mb-6">
            {/*  */}
            <Text className="text-black text-sm opacity-50 font-semibold">Your groups</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">See all</Text>
          </View>
          {/* Groups */}
          <View className='flex-row space-x-4'>
            <View className='h-40 w-32 text-white text-sm font-semibold bg-slate-600 rounded-md justify-end pb-3 pl-2 pr-4'>
              <Text className='text-white text-sm font-semibold'>Astrology Dating New York</Text>
            </View>
            <View className='h-40 w-32 text-white text-sm font-semibold border border-gray-400 shadow-2xl rounded-md  justify-center pb-3 pl-2 pr-4'>
              <Text className='text-black text-sm font-semibold'>Discover more groups</Text>
            </View>
          </View>
        </View>

        {/* Your Interests */}
        <View className='mt-10' >
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-black text-sm opacity-50 font-semibold">Your Interests</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">Edit</Text>
          </View>
          {/* Interests */}
          <View >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex: 1, flexGrow: 1}}>
              {
                interestTypes.map((interest) => {
                  return (
                    <TouchableOpacity key={interest.id} onPress={() => null} className='mr-4'>
                      <View style={{ backgroundColor: '#333', borderRadius: 8, padding: 8 }}>
                        <Text style={{ color: 'white' }}>{interest.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
        <View className='mt-10'>
          <View className="flex-row items-center justify-between mb-6">
            {/*  */}
            <Text className="text-black text-sm opacity-50 font-semibold">Your calendar</Text>
          </View>
          {/* Groups */}
          <View style={{ flex: 1 }} className='px-4'>
            <Calendar />
          </View>
        </View>
      </ScrollView>
    </Layout>
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


export default connect(mapStateToProps, mapDispatchToProps)(Home)
const styles = StyleSheet.create({
  // Home
  container: {
    padding: 20,
    flex: 1
  }
})

            {/* <FlatList
              data={interestTypes}
              keyExtractor={(item) => item.id.toString()}
              horizontal // or simply horizontal if you are using React Native 0.57 or above
              showsHorizontalScrollIndicator={false}
              scrollEnabled = {false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => null} style={{ padding: 10, marginRight: 10 }}>
                    <View style={{ backgroundColor: '#333', borderRadius: 8, padding: 8 }}>
                      <Text style={{ color: 'white' }}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            /> */}