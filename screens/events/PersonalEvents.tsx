import {  Text, View , FlatList, Alert} from 'react-native'
import React from 'react'

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Types
import { RootStackParamList } from "../../types";

// ** Layout
import Layout from '../../layouts/Layout';


// **  Store Slice
import { useGetEventsQuery } from '../../stores/features/event/eventService';
import { EventCard } from './components/EventCard';

type Props = NativeStackScreenProps<RootStackParamList, "PersonalEvents">;


const PersonalEvents: React.FC<Props> = ({navigation}: {navigation: any}) => {
  const {data: getAllEvents, isError, isLoading} = useGetEventsQuery()
  // const {data: getMyEvents, isError, isLoading} = useGetMyEventsQuery()

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!getAllEvents?.docs) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  const handleDeleteEvent = async (community_id: any) => {
    console.log(community_id)
    Alert.alert(
      'Delete Event',
      'This action is irreversible!!!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // deleteCommunity(community_id)
            // .unwrap()
            // .then((data) => {
            //   console.log('res:', data);
            // })
            // .catch((error) => {
            //   toast.show({
            //     placement: 'top',
            //     render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
            //   })
            //   console.error(error);
            // });
          },
        },
      ],
    ); 
  };



  return (
    <Layout
      title = "My Events"
    >
      <View className='mt-1'>
        <FlatList
          data={getAllEvents.docs || []}
          renderItem={({item}) => <EventCard isEdit isDelete handleDeleteEvent={handleDeleteEvent} event_about={item.event_about} event_time={item.event_time} event_name={item.event_name} event_city={item.event_city} event_id={item.id} navigation={navigation} members = {item.members}/>}
          keyExtractor={item => item.id}
        />
      </View>
    </Layout>
  )
}

export default PersonalEvents
