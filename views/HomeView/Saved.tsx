import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useGetSavedEventQuery } from '../../stores/features/event/eventService';
import { FlatList } from 'react-native';
import { EventCard } from '../../screens/events/components/EventCard';

const Saved = () => {
  const {data, isLoading} = useGetSavedEventQuery()
  const navigation = useNavigation();
  console.log(data, isLoading)
  return (
    <View style={styles.container}> 
      <FlatList
        data={data?.docs  || []}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator = {false}
        renderItem={
          ({item}) => 
            <EventCard
              event_about={item?.event_id?.event_about} 
              event_time={item?.event_id?.event_time} 
              event_name={item?.event_id?.event_name} 
              event_city={item?.event_id?.event_city} 
              event_id={item?.event_id?.id} 
              members = {item?.event_id?.members}
              navigation={navigation}
              isSave
            />
        }
      />
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})