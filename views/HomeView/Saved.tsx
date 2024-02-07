import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useGetSavedEventQuery } from '../../stores/features/event/eventService';
import { FlatList } from 'react-native';
import { EventCard } from '../../screens/events/components/EventCard';

const Saved = () => {
  const {data, isLoading} = useGetSavedEventQuery()
  const navigation = useNavigation();
  console.log(data, "Save event")
  return (
    <View style={styles.container}> 
     {
        data?.docs.length > 0 ? (
      <FlatList
        data={data?.docs  || []}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator = {false}
        renderItem={
          ({item}) => 
            <EventCard
              event_about={item?.event_about} 
              event_time={item?.event_time} 
              event_name={item?.event_name} 
              event_city={item?.event_city} 
              event_url={item?.url}
              event_id={item?.id} 
              members = {item?.members}
              navigation={navigation}
              isSave
            />
        }
      />) : 
      <Text>No Event</Text>}
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

