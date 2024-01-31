import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useGetEventsQuery } from '../../stores/features/event/eventService';
import { FlatList } from 'react-native';
import { EventCard } from '../../screens/Events';

const Going = () => {
  const {data: getAllEvents, isError, isLoading} = useGetEventsQuery()
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

export default Going

const styles = StyleSheet.create({})