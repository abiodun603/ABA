import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

// ** Constants 
import FontSize from '../../constants/FontSize';
import { Colors } from '../../constants';
import Font from '../../constants/Font';



// ** Store, Hooks
import { useGetSavedEventQuery } from '../../stores/features/event/eventService';

// ** Helpers
import { useNavigation } from '@react-navigation/native';
import { EventCard } from '../events/components/EventCard';

interface ICardProps {
  id: string ;
  email: string;
  resource: string
  filename?: string
  onPress?: ()=>void;
}


const Event = () => {
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

export default Event


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