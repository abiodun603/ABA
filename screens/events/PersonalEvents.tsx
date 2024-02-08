import {  Text, View , FlatList, Alert} from 'react-native'
import React from 'react'

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Types
import { RootStackParamList } from "../../types";

// ** Layout
import Layout from '../../layouts/Layout';


// **  Store Slice
import { useDeleteEventMutation, useGetEventsQuery } from '../../stores/features/event/eventService';
import { EventCard } from './components/EventCard';
import Toaster from '../../components/Toaster/Toaster';
import { useToast } from '@gluestack-ui/themed';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, "PersonalEvents">;


const PersonalEvents: React.FC<Props> = ({navigation}: {navigation: any}) => {
  const {data: getAllEvents, isError, isLoading} = useGetEventsQuery()
  const [deleteEvent, {isLoading: isDeleteEventLoading}] = useDeleteEventMutation()

  const toast = useToast()

  const showToast = () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Loading...',
      autoHide: true,
    });
  };

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if(isDeleteEventLoading){
    showToast()
  }

  if (!getAllEvents?.docs) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }
console.log(getAllEvents?.docs, "My All")
  // const handleDelete = async (event_id: any) => {
  //   console.log(event_id)
  //   Alert.alert(
  //     'Delete Event',
  //     'This action is irreversible!!!',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           deleteEvent(event_id)
  //           .unwrap()
  //           .then((data) => {
  //             toast.show({
  //               placement: 'top',
  //               render: ({ id }) => <Toaster id={id} type="success" message="Evented Deleted" />
  //             });
  //           })
  //           .catch((error) => {
  //             toast.show({
  //               placement: 'top',
  //               render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
  //             })
  //             console.error(error);
  //           });
  //         },
  //       },
  //     ],
  //   ); 
  // };


  return (
    <Layout
      title = "My Events"
    >
      <View className='mt-1'>
        <FlatList
          data={getAllEvents.docs || []}
          renderItem={({item}) => <EventCard isEdit isDelete event_about={item.event_about} event_time={item.event_time} event_name={item.event_name} event_city={item.event_city} event_id={item.id} navigation={navigation} members = {item.members} event_url = {item.url}/>}
          keyExtractor={item => item.id}
        />
      </View>
    </Layout>
  )
}

export default PersonalEvents
