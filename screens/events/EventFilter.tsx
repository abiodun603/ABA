import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Icons
import { Entypo, FontAwesome } from '@expo/vector-icons'; 

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from 'nativewind';
import Layout from '../../layouts/Layout';
import { RootStackParamList } from '../../types';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetEventsQuery, useGetSortUpcomingEventQuery, useLazyGetSortUpcomingEventQuery } from '../../stores/features/event/eventService';
import { EventCard } from '../Events';
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { filterByDate } from '../../utils/dummy';
import CustomButton from '../../components/CustomButton';
type Props = NativeStackScreenProps<RootStackParamList, "EventFilter">;
const StyledView = styled(View)

export const interestTypes = ["Date", "All upcoming", "Volunteering", "Walking Tours"]

const FilterState = ({children}: {children: React.ReactNode}) => {
  return (
    <TouchableOpacity onPress={()=>null} className='h-fit rounded-lg p-2 bg-gray-800 mr-1 px-4'>
      {/* <Entypo name = "users" size={30}/> */}
      {children}
    </TouchableOpacity>
  )
}

const EventFilter: React.FC<Props> = ({navigation}: {navigation: any}) => {
  const [date, setDate] = useState("Date")
  const [show, setShow ] = useState(false) 
  const [value, setValue] = React.useState('upcoming');

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

  const handleDateSorting = async(value: string) => {
    console.log(value);
    await getSortUpcomingEvent(value);
    // Access the loading state from the results
    const { isLoading } = results;
    console.log('Loading state:', isLoading);
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='space-x-4 pl-4'>
          <FilterState>
            <View className='rotate-90 h-fit' >
              <Entypo name = "sound-mix" size={20} color="#FFFFFF" className='hidden'  />
            </View>
          </FilterState>
          <FilterState>
            <TouchableOpacity       
              onPress={()=> setShow(true)}
              className='flex-row items-center space-x-2' 
            >
              <Text style={{ color: 'white' }}>Date</Text>
              <FontAwesome name = "angle-down" size={20} color="#FFFFFF"/>
            </TouchableOpacity>
          </FilterState>
          <FilterState>
            <View className='flex-row items-center space-x-2'  >
              <Text style={{ color: 'white' }}>All upcoming</Text>
              <FontAwesome name = "angle-down" size={20} color="#FFFFFF"/>
            </View>
          </FilterState>
          <FilterState>
            <View className='flex-row items-center space-x-2' >
              <Text style={{ color: 'white' }}>Venue</Text>
              <FontAwesome name = "angle-down" size={20} color="#FFFFFF"/>
            </View>
          </FilterState>
          <FilterState>
            <View className='flex-row items-center space-x-2' >
              <Text style={{ color: 'white' }}>Any Distance</Text>
              <FontAwesome name = "angle-down" size={20} color="#FFFFFF"/>
            </View>
          </FilterState>
        </ScrollView>

        {/*  */}
        <FlatList
          data={results?.data?.docs || []}
          contentContainerStyle = {{marginTop: 10}}
          renderItem={({item}) => <EventCard event_about={item.event_about} event_time={item.event_time} event_name={item.event_name} event_city={item.event_city} event_id={item.id} navigation={navigation} members = {item.members}/>}
          keyExtractor={item => item.id}
        />
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
            <CustomButton title='Apply' onPress={() => handleDateSorting(value)} />
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
