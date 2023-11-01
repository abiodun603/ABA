import { Dimensions, FlatList, Image, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'

// ** Constants 
import Colors from '../constants/Colors'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'

// ** Icons
import {Ionicons, MaterialIcons, FontAwesome} from "@expo/vector-icons"

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import { Divider } from 'native-base';

// ** Utils
import socket from '../utils/socket'
import { GroupCatergory } from '../utils/dummy'

// ** Hooks
import useGlobalState from '../hooks/global.state'

interface IEventCardProps {
  navigation?: any;
}

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


const Contact = ({navigation}: {navigation: any}) => {
  const [show, setShow ] = useState(false) 
  const [bookMark, setBookMark] = useState(false)
  const toggleBookMark = () => setBookMark(!bookMark)

  const renderEventCard = (toggleBookMark: any, bookMark: any, navigation: any) => {
    // const [bookMark, setBookMark] = useState(false)
  
    // const toggleBookMark = () => setBookMark(!bookMark)
  
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
      <TouchableOpacity onPress={() => navigation.navigate("EventDetails")} className='h-60 w-52 rounded-lg mr-3'>
        <View style={{flex:1}} className='rounded-t-lg bg-blue-500'>
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            className='w-full'
          />
        </View>
        <View style={{flex:1}} className='rounded-b-lg bg-gray-100 p-2 '>
          <View className=''>
            <Text className='text-yellow-500 text-xs font-bold'>SAT, 21 OCT 10:00</Text>
            {/* Event Description */}
            <Text className='text-xs text-black opacity-80 font-bold mt-2' numberOfLines={2} ellipsizeMode="tail">Azure Community Con23: Exploring Innovative and Az...</Text>
            <Text className='text-gray-500 text-xs font-normal mt-1'>Nigeria Microsoft Azure Meetup...</Text>
          </View>
          <View className="flex-row items-center justify-between mt-2">
            <Text>Lagos</Text>
            <View className='flex-row items-center'>
               <Ionicons name='share-outline' size={20} onPress={onShare}/> 
              {!bookMark ? <Ionicons name='bookmark-outline' size={18} onPress={toggleBookMark}  /> :  <Ionicons name='bookmark' size={18} color="#d82727"/>}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }



  return (
    <Layout
      title='Explore'
      navigation={navigation}
      drawerNav
      iconName="plus"
      onPress={()=> setShow(true)}
    >
      <ScrollView style={styles.container}>
      <View className='px-5'>
        {/* Image */}
        <View className='h-40 bg-blue-900 rounded-lg flex items-center justify-center'>
          <Text className='text-white text-center'>Maps goes here...</Text>
        </View>
        <Text className='text-black text-sm font-bold my-3'>Discover events by date</Text>

        <View className = "flex-row flex-wrap " style={{ flex: 0 }}>
          {
            eventsDays.map((items, index) => <View className='pl-2 pr-3 py-2 bg-[#333]  flex-row items-center justify-between rounded-lg  mr-2 mb-2' key={index.toString()} style={{ flex: 0 }} >
            <Text className='text-white text-xs font-medium'>{items}</Text>
            <MaterialIcons name = "keyboard-arrow-right"  size={20} color="#d1d5db" />
          </View>)
          }
          
        </View>
      </View>
      <Divider mt={8} thickness={1}/>
        <View className='flex-row justify-between items-center my-4  px-4'>
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
        </View>
      <Divider thickness={8}/>

      <View className = "px-4">
        <Text className='text-black text-sm font-bold mt-3'>Explore Meetup</Text>

        <View className='mt-3'>
          <Text className='text-black text-xs font-bold my-2'>Popular now</Text>
          <View>
            <FlatList
              horizontal
              data = {[1, 2, 3, 4]}
              renderItem={() => renderEventCard(toggleBookMark, bookMark, navigation)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator = {false}
            />
          </View> 
        </View>
        <View className='mt-3'>
          <Text className='text-black text-xs font-bold my-2'>Movements</Text>
          <View>
            <FlatList
              horizontal
              data = {[1, 2, 3, 4]}
              renderItem={() => renderEventCard(toggleBookMark, bookMark, navigation)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator = {false}
            />
          </View> 
        </View>
        <View className='mt-3'>
          <Text className='text-black text-xs font-bold my-2'>Tech</Text>
          <View>
            <FlatList
              horizontal
              data = {[1, 2, 3, 4]}
              renderItem={() => renderEventCard(toggleBookMark, bookMark, navigation)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator = {false}
            />
          </View> 
        </View>
        <View className='mt-3'>
          <Text className='text-black text-xs font-bold my-2'>Career & Business</Text>
          <View>
            <FlatList
              horizontal
              data = {[1, 2, 3, 4]}
              renderItem={() => renderEventCard(toggleBookMark, bookMark, navigation)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator = {false}
            />
          </View> 
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
                <View className='h-[150px] bg-slate-400 rounded-lg  justify-center items-center'></View>
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

export default Contact

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