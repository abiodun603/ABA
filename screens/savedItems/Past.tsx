import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import React from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import { Colors } from '../../constants';
import Font from '../../constants/Font';


// ** Store, Features
import { ShortenedWord } from '../../helpers/wordShorther';
import { useGetPastEventQuery } from '../../stores/features/groups/groupsService';
import { useNavigation } from '@react-navigation/native';
import { isEventDateLessThanCurrent } from '../../helpers/isPastEvent';

export const EventCard = ({event_url, event_date, event_about, event_time ,event_name, event_city, members, event_id, navigation}: any) => {
  return(
    <ScrollView style= {{width: "100%"}} className='border-b border-gray-200 mt-6 px-4'>
      <TouchableOpacity
        onPress={() => navigation.navigate("EventDetails", { eventId: event_id })}
        // onPress={() =>handeViewEvent(event_id)}
        className='mb-3'>
          <View className='flex-row ' >
            <View className='w-2/3'>
              <Text className='text-yellow-500 text-sm font-bold'>{event_time}</Text>
              {/* Event Description */}
              <Text className='text-sm text-black opacity-80 font-semibold mt-2' numberOfLines={2} ellipsizeMode="tail"><ShortenedWord word={event_about} maxLength={60}/></Text>
              <Text className='text-gray-500 font-normal mt-1'><ShortenedWord word={event_name} maxLength={48} /></Text>
            </View>
            <View className='w-1/3 rounded-lg'>
              {/* image */}
              <View className=' w h-24  '>
                <ImageBackground
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 10}}
                  style={{flex: 1}}
                  source={{uri: event_url}} // Replace with your image path
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <Text >{members && members?.length || "0"} {isEventDateLessThanCurrent(event_date) ? "attended this event in" : "going"} <Text className='capitalize'>{event_city}</Text></Text>
            <View className='flex-row'>
              {/* <Ionicons name='share-outline' size={23} onPress={onShare}/> 
              {!bookMark ? <Ionicons name='bookmark-outline' size={22} onPress={toggleBookMark} /> :  <Ionicons name='bookmark' size={22} color="#d82727" onPress={toggleBookMark}/>} */}
            </View>
          </View>
      </TouchableOpacity>
    </ScrollView>
    
  )
}


const Past = () => {
  const {data, isLoading} = useGetPastEventQuery()
  const navigation = useNavigation();

  console.log(data)

  return (
    <View style={styles.container}> 
      {/* <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Search Resources'
          placeholderTextColor="#4E444B" 
          style={{color: '#4E444B', width: '90%'}}
        /> 
        <Ionicons
          style = {{ fontSize: FontSize.large, color: '#4E444B'}}
          name = "search"
        />
      </View>      */}
      <FlatList
        data={data?.docs}
        keyExtractor={item => item.id.toString()}
        renderItem={
          ({item}) => <EventCard event_date={item?.event_date} event_url={item?.url} event_about={item?.event_about} event_time={item?.event_time} event_name={item?.event_name} event_city={item?.event_city} event_id={item?.id} members = {item?.members} navigation={navigation}/>
        }
      />
    </View>
  )
}

export default Past


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardContainer: {
    width: "100%",
    height: 63,
    flexDirection: "row",
    paddingHorizontal: 12,
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
  }
})