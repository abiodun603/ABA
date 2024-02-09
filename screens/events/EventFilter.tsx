import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Icons
import { Entypo, FontAwesome } from '@expo/vector-icons'; 

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Layout from '../../layouts/Layout';
import { RootStackParamList } from '../../types';
import { useLazyGetSortUpcomingEventQuery } from '../../stores/features/event/eventService';
import { EventCard } from '../Events';
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { filterByDate } from '../../utils/dummy';
import CustomButton from '../../components/CustomButton';
type Props = NativeStackScreenProps<RootStackParamList, "EventFilter">;

export const interestTypes = ["Date", "All upcoming", "Volunteering", "Walking Tours"]

// Define the type for your route parameters
type RouteParams = {
  filterName: any; // Replace 'string' with the correct type for communityId
};

const FilterState = ({children}: {children: React.ReactNode}) => {
  return (
    <TouchableOpacity onPress={()=>null} className='h-fit rounded-lg p-2 bg-gray-800 mr-1 px-4'>
      {/* <Entypo name = "users" size={30}/> */}
      {children}
    </TouchableOpacity>
  )
}

const EventFilter: React.FC<Props> = ({navigation, route}) => {
  const { filterName } = route.params as unknown  as RouteParams;
  console.log(filterName, "filterName")

  const [show, setShow ] = useState(false) 
  const [value, setValue] = useState(filterName.toLowerCase().split(' ').join(''));
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const [getSortUpcomingEvent, results] = useLazyGetSortUpcomingEventQuery()
  // const { data: getAllEvents, isError, isLoading, refetch: refetchEvents } = useGetSortUpcomingEventQuery(value, {
  //   skip: !value,
  // });

  // if(isLoading){
  //   return <Text>Loading...</Text>;
  // }

  // if (!getAllEvents) {
  //   return <Text>No data available.</Text>; // Display a message when there is no data
  // }

  const handleDateSorting = async (value: string) => {
    setIsLoading(true); // Set loading state to true when starting the sorting process
    try {
      // Perform the sorting operation
      const res = await getSortUpcomingEvent(value).unwrap();
      // Set loading state to false after the operation is completed
      setIsLoading(false);
      setShow(false)
    } catch (error) {
      // Handle errors if any
      console.error("Error occurred while sorting events:", error);
      // Set loading state to false in case of errors as well
      setIsLoading(false);
      setShow(false)
    }
  };

  useEffect(() => {
    getSortUpcomingEvent(value);

  }, [getSortUpcomingEvent]);

  console.log(results)

  console.log(value);
  return (
    <Layout
      title = ""
  >
    <View style={styles.container}>
      <View className='mt-3'>
        <View className='flex-row space-x-4 pl-4'>
          <View className='h-fit rounded-lg p-2 bg-gray-800 mr-1 px-4'>
            <View className='rotate-90 h-fit' >
              <Entypo name = "sound-mix" size={20} color="#FFFFFF" className='hidden'  />
            </View>
          </View>
          <View className='h-fit rounded-lg p-2 bg-gray-800 mr-1 px-4'>
            <TouchableOpacity       
              onPress={()=> setShow(true)}
              className='flex-row items-center space-x-2' 
            >
              <Text style={{ color: 'white' }}>Date</Text>
              <FontAwesome name = "angle-down" size={20} color="#FFFFFF"/>
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}
        <View className='h-auto grow'>
          {
            results?.data?.docs.length > 0 ? 
            <FlatList
              data={results?.data?.docs || []}
              contentContainerStyle = {{marginTop: 10}}
              renderItem={({item}) => <EventCard  url={item.url} event_about={item.event_about} event_time={item.event_time} event_name={item.event_name} event_city={item.event_city} event_id={item.id} navigation={navigation} members = {item.members}/>}
              keyExtractor={item => item.id}
            /> : (
              <View className='w-full flex items-center justify-center mt-10'>
                <Text className='flex items-center justify-center  text-sm text-ksecondary font-medium'>No Upcoming Event</Text>
              </View>
            )
          }
        </View>
      </View>
      <BottomSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        height={0.5}
        enableBackdropDismiss
      >
        <View>
          <Text className='text-lg font-bold text-black'>Dates</Text>
          <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
            {filterByDate.map((filter: any) => (
              <RadioButton.Item key={filter.id} label={filter.name} labelStyle={{textTransform: "capitalize"}} value={filter.name.toString()}   style={{}}/>
            ))}
          </RadioButton.Group>
          <View className='mt-10'>
            <CustomButton title='Apply' onPress={() => handleDateSorting(value)} isLoading={isLoading} />
          </View>
        </View>
      </BottomSheet>

    </View>
  </Layout>
  )
}

export default EventFilter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  }
})
