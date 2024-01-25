import { FlatList, Image, ImageBackground, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// ** Constants 
import Colors from '../constants/Colors'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'

// ** Icons
import {Ionicons, MaterialIcons} from "@expo/vector-icons"

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import { Divider } from 'native-base';

// ** Utils
import socket from '../utils/socket'
import { GroupCatergory } from '../utils/dummy'

// ** Hooks
import MapView, { Marker } from 'react-native-maps'
import useLocation from '../hooks/useLocation'
import { useGetEventsByCatTypeQuery, useGetPopularEventsQuery } from '../stores/features/event/eventService'
import { ShortenedWord } from '../helpers/wordShorther'

const eventsDays =  ["Today", "Tomorrow", "This weekend", "Choose date", "All upcoming"]

interface IGridViewProps<T> {
  data: T[];
  renderItem(iem: T): JSX.Element;
  col?:number;
}

const GridView = <T extends any>(props: IGridViewProps<T>) => {
  const {data, renderItem, col = 2} = props;
  return (
    <View className='w-full flex-row flex-wrap'>
      {
        data.map((item, index) => {
          return (
            <View style = {{width: 100 / col + '%'}} key={index.toString()}>
              {renderItem(item)}
            </View>
          )
        })
      }
    </View>
  )
}


const Explore = ({navigation}: {navigation: any}) => {
  const [show, setShow ] = useState(false) 
  const [bookMark, setBookMark] = useState(false)
  const toggleBookMark = () => setBookMark(!bookMark)
  const {  cords } = useLocation()
  const {isLoading: isPopularEventsLoading, data: getPopularEvents} = useGetPopularEventsQuery()
  const {isLoading: isEventsByCatTypeLoading, data: getEventsByCatType} = useGetEventsByCatTypeQuery()

  // console.log(getEventsByCatType)

  if(isPopularEventsLoading && isEventsByCatTypeLoading){
    return <Text>Loading...</Text>;
  }

  if (!getPopularEvents && !getEventsByCatType) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }
  // const categories = Object.keys(getEventsByCatType.docs || {});
  console.log(getPopularEvents)

  const renderEventCard = (event_id: string,about: string, name: string, time: string, city: any,  toggleBookMark: any, bookMark: any, navigation: any) => {
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

    console.log( "popular events")
    return(
      <TouchableOpacity  className='h-60 w-56 rounded-lg mr-3' onPress={() => navigation.navigate("EventDetails", { eventId: event_id })}>
         <View style={{flex:1}} className='rounded-t-lg bg-blue-500'>
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            className='w-full'
          />
        </View>
        <View style={{flex:1}} className='rounded-b-lg bg-gray-100 p-2 justify-between'>
          <View className=''>
            <Text className='text-yellow-500 text-xs font-bold'><ShortenedWord word={time} maxLength={27}/></Text>
            {/* Event Description */}
            <Text className='text-xs text-black opacity-80 font-bold mt-2 h-' numberOfLines={2} ellipsizeMode="tail">{name}</Text>
            <Text className='text-gray-500 text-xs font-normal mt-1 ' ><ShortenedWord word={about} maxLength={27}/></Text>
          </View>
          <View className="flex-row items-center justify-between mt-2">
            <Text className="capitalize">{city}</Text>
            <View className='flex-row items-center'>
               <Ionicons name='share-outline' size={20} onPress={onShare}/> 
              {!bookMark ? <Ionicons name='bookmark-outline' size={18} onPress={toggleBookMark}  /> :  <Ionicons name='bookmark' size={18} color="#d82727"/>}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const mapRegion = {
    latitude : cords?.coords?.latitude,
    longitude: cords?.coords?.longitude,
    latitudeDelta: 0.0922, // You can adjust this value based on the desired zoom level
    longitudeDelta: 0.0421,
  }

  return (
    <Layout
      title='Explore'
      navigation={navigation}
      drawerNav
      onPress={()=> setShow(true)}
    >
      <ScrollView style={styles.container}>
      <View className='px-5'>
        {/* Image */}
        <View className='h-40  rounded-lg flex items-center justify-center mt-5'>
          <MapView region={mapRegion} style = {{height: 160, width: "100%",}} >
            <Marker coordinate={mapRegion} title='marker' />
          </MapView>
        </View>
        <Text className='text-black text-sm font-bold my-3'>Discover events by date</Text>

        <View className = "flex-row flex-wrap " style={{ flex: 0 }}>
          {
            eventsDays.map((items, index) => <TouchableOpacity onPress={() => navigation.navigate("EventFilter")} className='pl-2 pr-3 py-2 bg-[#333]  flex-row items-center justify-between rounded-lg  mr-2 mb-2' key={index.toString()} style={{ flex: 0 }} >
            <Text className='text-white text-xs font-medium'>{items}</Text>
            <MaterialIcons name = "keyboard-arrow-right"  size={20} color="#d1d5db" />
          </TouchableOpacity>)
          }
          
        </View>
      </View>
      <Divider mt={8} thickness={1}/>
        <TouchableOpacity onPress={() => navigation.navigate("GroupCat")} className='flex-row justify-between items-center my-4  px-4'>
          <View className='flex-row  space-x-2'>
            {/* icon calander */}
            <MaterialIcons name="location-searching" size={28} />
            <View className=''>
              {/* day / month / year */}
              <Text className='text-sm text-gray-800 font-bold'>Find a group</Text>
              {/* time */}
              <Text className='text-xs text-gray-700 font-medium'>Search by your interests</Text>
            </View>
          </View>
          {/* icon */}
          <MaterialIcons name = "keyboard-arrow-right"  size={18}/>
        </TouchableOpacity>
      <Divider thickness={8}/>

      <View className = "px-4">
        <Text className='text-black text-sm font-bold mt-3'>Explore Meetup</Text>

        <View className='mt-3'>
          <Text className='text-black text-xs font-bold my-2'>Popular now</Text>
          <View>
            <FlatList
              horizontal
              data = {getPopularEvents?.docs || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => renderEventCard(item.id, item.event_about, item.event_name, item.event_time, item.event_city, toggleBookMark, bookMark, navigation)}
              showsHorizontalScrollIndicator = {false}
            />
          </View> 
        </View>
        <View>
          {getEventsByCatType?.docs &&
            Object.keys(getEventsByCatType?.docs).map((category, index) => (
              <View key={index} className='mt-3'>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                  <Text className='text-black text-xs font-bold my-2 capitalize'>{category}</Text>
                  {/* touch button */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EventFilter")}
                  > 
                    <Text style={{color: Colors.primary, fontFamily: Font['inter-medium'], fontSize: FontSize.small}}>See all</Text>
                  </TouchableOpacity>              
                </View>
                <FlatList
                  horizontal
                  data={getEventsByCatType?.docs[category] || []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderEventCard(item.id, item.event_about, item.event_name, item.event_time, item.event_city, toggleBookMark, bookMark, navigation)}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))}
        </View>
      </View>
      {/* Divider */}
      <Divider mt={8} thickness={1}/>
        <View className='flex-row justify-between items-center my-4  px-4'>
          <View className='flex-row  space-x-2'>
            {/* icon calander */}
            <MaterialIcons name="location-searching" size={28} />
            <View className=''>
              {/* day / month / year */}
              <Text className='text-sm text-gray-800 font-bold'>Start a new group</Text>
              {/* time */}
              <Text className='text-xs text-gray-700 font-medium'>Organise your own events</Text>
            </View>
          </View>
          {/* icon */}
          <MaterialIcons name = "keyboard-arrow-right"  size={18}/>
        </View>
      <Divider thickness={8}/>

      <View className='px-4 mt-4 mb-28'>
        <View className="flex-row items-center justify-between mb-1 ">
          {/*  */}
          <Text className='text-black text-sm font-bold mt-3'>Browse by categories</Text>
        </View>
        <View>
          <GridView 
            data={GroupCatergory} 
            renderItem={(item) => (
              <TouchableOpacity className='mx-2 mt-4' onPress={() => navigation.navigate("GroupCat")}>
                <View className='h-[150px] bg-slate-400 rounded-lg  justify-center items-center'>
                  <ImageBackground
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 10}}
                    style={{ flex: 1, width: '100%' }}
                    source = {{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvVRjzi266UV2c8204Wa2FDqwwxkXFDU4Ybw&usqp=CAU'}}
                  />
                </View>
                <Text className='text-black text-xs font-semibold mt-1'>{item}</Text>
              </TouchableOpacity>
             
            )}
          />
        </View>
        {/* <Text className=''>No Photo yet !!!</Text> */}
      </View>
    </ScrollView>
    </Layout>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
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