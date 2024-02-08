import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetEventMeEventQuery, useGetEventsQuery } from '../../stores/features/event/eventService'
import { EventCard } from '../../screens/Events'
import { useNavigation } from '@react-navigation/native';


const All = () => {
  const {data: getAllEvents, isError, isLoading} = useGetEventMeEventQuery()
  const navigation = useNavigation();

  return (
    <View>
      {
        getAllEvents?.docs.length > 0 ? (
          <FlatList
            data={getAllEvents?.docs || []}
            renderItem={({item}) => <EventCard save_event={item.saveFlag} event_about={item.event_about} event_time={item.event_time} event_name={item.event_name} event_city={item.event_city} event_id={item.id} navigation={navigation} members = {item.members} url = {item.url}/>}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text>No Event</Text>
        )
      }
       
    </View>
  )
}

export default All

const styles = StyleSheet.create({})