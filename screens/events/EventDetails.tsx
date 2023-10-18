import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// ** ICONS
import {Ionicons, MaterialIcons, FontAwesome} from "@expo/vector-icons"

// ** Layout
import Layout from '../../layouts/Layout';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'native-base';
type Props = NativeStackScreenProps<RootStackParamList, "EventDetails">;



const EventDetails: React.FC<Props>  = () => {
  return (
    <Layout
      title = "Event"
    >
      <ScrollView style={styles.container}>
        <View className='px-5'>
          {/* Image */}
          <View className='h-40 bg-blue-900 rounded-lg flex items-center justify-center'>
            <Text className='text-white text-center'>Image Banner Goes Here...</Text>
          </View>
          <Text className='text-black text-xl font-bold mt-3'>Telvida Conference Texas</Text>

          <View className='mt-4'>
            <View className='flex-row justify-between items-center mt-4 border-b border-b-gray-400 pb-2'>
              <View className='flex-row  space-x-2'>
                {/* icon calander */}
                <Ionicons name="calendar-outline" size={28} />
                <View className='space-y-2'>
                  {/* day / month / year */}
                  <Text className='text-sm text-gray-800 font-semibold'>Saturday, 21 October 2023</Text>
                  {/* time */}
                  <Text className='text-sm text-gray-800 font-medium'>17:00 - 23:00 WAT</Text>
                </View>
              </View>
              {/* icon */}
              <MaterialIcons name = "keyboard-arrow-right"  size={28}/>
            </View>
            <View className='flex-row justify-between items-center mt-4 border-b border-b-gray-400 pb-2'>
              <View className='flex-row items-center space-x-2'>
                {/* icon calander */}
                <Ionicons name="calendar-outline" size={28} />
                <View className='space-y-2'>
                  {/* day / month / year */}
                  <Text className='text-sm text-gray-800 font-semibold'>VR PLACE NIGERIA</Text>
                </View>
              </View>
              {/* icon */}
              <MaterialIcons name = "keyboard-arrow-right"  size={28}/>
            </View>
          </View>

          {/* Company Details */}
          <View className='mt-6 flex-row items-center space-x-4'>
            {/* logo */}
            <View className="h-24 w-24 rounded-lg bg-blue-900 items-center justify-center">
              <Text className='text-white'>Logo</Text>
            </View>
            <View>
              <Text className='text-lg font-bold'>Telvida Tech</Text>
              <Text className='text-lg font-normal text-gray-600'>Public</Text>
            </View>
          </View>

          {/* About */}
          <View>
            <Text className='text-black text-lg mt-4 font-bold'>About</Text>

            <View>
              <Text className='mt-2 text-gray-700 font-medium'>
                A MODERN EXPLORATION OF AFRICAN MUSIC THAT ADDS A NEW LAYER OF VIRTUAL INTERACTION THROUGH VIDEO GAMES. Explore an afrofuturistic metaverse experience inspired by 70s Afro Rock music.
              </Text>

              <View className='mt-3'>
                <Text className='text-gray-700 font-medium'>Ticket at Door N4,000</Text>
                <Text className='text-gray-700 font-medium'>Side Attractions Food, Games & Networking</Text>
                <Text className='text-gray-700 font-medium'>Contact telvida@gmail.com for Inquires</Text>
              </View>

              <TouchableOpacity ><Text className='text-blue-900 font-semibold mt-1'>Read More</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Divider */}
        <Divider mt={8} thickness={8}/>
        <View className='px-5'>
          <View className = "flex-row mt-3">
            <View className='w-1/2'>
              <Text>Hosting(0)</Text>
            </View>
            <View className='w-1/2'>
              <Text>Going(0)</Text>
            </View>
          </View>

          <View className = "space-y-3">
            <View className = "flex-row items-center space-x-3 mt-5">
              {/* Icon */}
              <FontAwesome name = "meetup" size={26} color="red"/>
              <Text className = "text-sm text-black font-semibold">Who will be there</Text>
            </View>
            <View className = "flex-row items-center space-x-3">
              {/* Icon */}
              <FontAwesome name = "tag" size={26} />
              <Text className = "text-sm text-black font-semibold">13 members attending for the first time</Text>
            </View>
            <View className = "flex-row items-center space-x-3">
              {/* Icon */}
              <FontAwesome name = "hashtag" size={22}/>
              <Text className = "text-sm text-black font-semibold">Attendees share your interests</Text>
            </View>
          </View>
        </View>
        {/* Divider */}
        <Divider mt={8} thickness={8}/>
        <View className = "px-4">
          <Text className='text-black text-lg font-bold mt-3'>Location</Text>
          <Text className='text-black text-sm font-semibold my-2'>VR PLACE NIGERIA</Text>
          <View className='h-40 bg-blue-500 rounded-lg flex items-center justify-center'>
            <Text className='text-white text-center'>Event Map Goes Here...</Text>
          </View>
        </View>

        {/* Divider */}
        <Divider mt={8} thickness={8}/>
        <Divider mt={8} thickness={8}/>

        <View className='px-4 mt-4'>
          <View className="flex-row items-center justify-between mb-6 ">
            {/*  */}
            <Text className='text-black text-lg font-bold mt-3'>Photos</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">Add photos</Text>
          </View>
          <Text className=''>No Photo yet !!!</Text>
        </View>

        <Divider mt={8} thickness={8}/>
        <View className='px-4 mt-4'>
          <View className="flex-row items-center justify-between mb-6 ">
            {/*  */}
            <Text className='text-black text-lg font-bold mt-3'>Comments</Text>
          </View>
          <Text className=''>No Comments yet !!!</Text>
        </View>
        <Divider mt={8} thickness={8}/>
        <View className='px-4 mt-4'>
          <View className="flex-row items-center justify-between mb-6 ">
            {/*  */}
            <Text className='text-black text-lg font-bold mt-3'>Upcoming events</Text>
          </View>
          <View><Text className=''>No upcoming events yet !!!</Text></View>
          <View className='flex-row justify-between items-center mt-4 pb-2'>
            <Text className='text-sm text-blue-900 font-semibold'>See all events from this group</Text>
            {/* icon */}
            <MaterialIcons name = "keyboard-arrow-right"  size={28}/>
          </View>
        </View>

        <Divider mt={8} thickness={8}/>
        <Text className='text-sm text-blue-900 font-semibold px-4 mt-5'>Report this event</Text>
      </ScrollView>
    </Layout>
  )
}

export default EventDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
})