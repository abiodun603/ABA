import { Dimensions, FlatList, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Constants 
import Colors from '../constants/Colors'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'

// ** Icons
import { Ionicons } from '@expo/vector-icons'; 

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary

// ** Utils
import socket from '../utils/socket'

// ** Hooks
import useGlobalState from '../hooks/global.state'
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector'
import { setGetData } from '../stores/features/contacts/contactSlice'
import { setContactID, setFindContactData, setFindContactEmail } from '../stores/features/findContact/findContactSlice'


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width
interface IEventCardProps {
  navigation?: any;
}

const Badge = ({title}: {title: string | boolean}) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={{fontFamily: Font['inter-regular'], color: "#000000", fontSize: FontSize.xsmall}}>{title}</Text>
    </View>
  )
}

export const EventCard: React.FC<IEventCardProps> = ({navigation}) => {
  const [bookMark, setBookMark] = useState(false)

  const toggleBookMark = () => setBookMark(!bookMark)

  const onShare = async () => {
    const options = {
      message: "Telvida Conferences at London Texas.  i neva reach there before"
    }

    try {
      const result = await Share.share({
        message: (options.message)
      })

      if(result.action=== Share.sharedAction){
        if(result.activityType){
          console.log('share with activity of type', result.activityType)
        }else{
          console.log("shared")
        }
      }else if (result.action === Share.dismissedAction){
        console.log("dismissed")
      }
    }catch(error:any) {
      console.log(error?.message)
    }
    
  }
  return(
    <ScrollView style= {{width: "100%"}} className='border-b border-gray-200 mt-6 px-4'>
      <TouchableOpacity 
        onPress={() => navigation.navigate("EventDetails") }
        className='mb-3'>
          <View className='flex-row ' >
            <View className='w-2/3'>
              <Text className='text-yellow-500 text-sm font-bold'>SAT, 21 OCT 10:00 WAT</Text>
              {/* Event Description */}
              <Text className='text-sm text-black opacity-80 font-semibold mt-2' numberOfLines={2} ellipsizeMode="tail">Azure Community Con23: Exploring Innovative and Az...</Text>
              <Text className='text-gray-500 font-normal mt-1'>Nigeria Microsoft Azure Meetup Group</Text>
            </View>
            <View className='w-1/3 bg-gray-800 rounded-lg'>
              {/* image */}
              <View className=' w h-24  '></View>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-5">
            <Text>68 going Lagos</Text>
            <View className='flex-row'>
              <Ionicons name='share-outline' size={28} onPress={onShare}/> 
              {!bookMark ? <Ionicons name='bookmark-outline' size={28} onPress={toggleBookMark} /> :  <Ionicons name='bookmark' size={28} color="#d82727" onPress={toggleBookMark}/>}
            </View>
          </View>
      </TouchableOpacity>
    </ScrollView>
    
  )
}


const Contact = ({navigation}: {navigation: any}) => {
  const [show, setShow ] = useState(false) 

  return (
    <Layout
      title='Events'
      navigation={navigation}
      drawerNav
      iconName="plus"
      onPress={()=> setShow(true)}
    >
      <ScrollView className='flex-col space-y-7'> 
        <EventCard  navigation={navigation}/>
        <EventCard  navigation={navigation}/>
        <EventCard  navigation={navigation}/>
        <EventCard  navigation={navigation}/>
        <EventCard  navigation={navigation}/>
      </ScrollView>
    </Layout>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // messageCard
  cardContainer: {
    width: "100%",
    height: 63,
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: FontSize.base,
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 8
  },
  circleImage: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: FontSize.medium,
    backgroundColor: Colors.secondary
  },
  title: {
    color: Colors.text,
    fontFamily: Font['inter-medium'],
    fontSize: FontSize.small
  },
  description: {
    color: Colors.gray,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.xsmall,
    lineHeight: 22
  },
  badgeContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFD7F3",
    borderRadius: FontSize.xxLarge,
  },
  inputContainer:{
    height: 56,
    backgroundColor: '#EFE6E9',
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 28,
    flex: 1,
  }
})