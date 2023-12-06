import {  Dimensions, FlatList, ImageBackground, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'

// ** Constants 
import Colors from '../constants/Colors'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'

// ** Icons
import { Ionicons } from '@expo/vector-icons'; 

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import { FormProvider, useForm } from 'react-hook-form'
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// ** Helpers
import { formatTimestampToTime, formatTimestampToTimeWithMidday } from '../helpers/timeConverter'
import { formatDate } from '../helpers/formatDate'
import { ShortenedWord } from '../helpers/wordShorther'

// ** Components
import BottomSheet from '../components/bottom-sheet/BottomSheet'
import CustomButton from '../components/CustomButton'
import Input from '../components/Input'
import Toaster from '../components/Toaster/Toaster'

// ** Hooks
import { useCreateEventMutation, useGetEventsQuery, useGetEventTypesQuery, useSaveEventMutation } from '../stores/features/event/eventService'
import { useGetUsersQuery } from '../stores/features/users/UsersService'
import { useToast } from '@gluestack-ui/themed'
import { getTimeZone } from '../helpers/timeZoneformat'
import { DatePicker } from '../components/datepicker/DatePicker'


const data = [
  {key:'1', value:'Select event tags', disabled:true},
  {key:'event', value:'Event'},
  {key:'chster', value:'Chster'},
]

const status = [
  {key:'1', value:'Select status', disabled:true},
  {key:'private', value:'Private'},
  {key:'public', value:'Public'},
]

const members = [
  {key:'1', value:'Select members', disabled:true},
]

const types = [
  {key:'1', value:'Select event types', disabled:true},
]

const Badge = ({title}: {title: string | boolean}) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={{fontFamily: Font['inter-regular'], color: "#000000", fontSize: FontSize.xsmall}}>{title}</Text>
    </View>
  )
}





export const EventCard = ({event_about, event_time ,event_name, event_city, event_id, members, navigation}: any) => {
  const [bookMark, setBookMark] = useState(false)
  const [saveEvent, {isLoading: saveEventLoading}] = useSaveEventMutation()
  const toast = useToast()

  // Fucnc
  const toggleBookMark = async () => {
    const formData = {
      event_id: event_id
    }
    await saveEvent(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      console.log('res:', data);
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Thank you!!!. Event have been saved" />
      })
    })
    .catch((error) => {
      // Handle error
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
      })
      setBookMark(false)
      console.error(error);
    });
    setBookMark(!bookMark)
  }

  const onShare = async () => {
    const options = {
      message: "Telvida Conferences at London Texas.  i neva reach there before"
    }
    try {
      const result = await Share.share({
        message: (options.message)
      })

      if(result.action=== Share.sharedAction){
        if(result.activityType){
          console.log('share with activity of type', result.activityType)
        }else{
          console.log("shared")
        }
      }else if (result.action === Share.dismissedAction){
        console.log("dismissed")
      }
    }catch(error:any) {
      console.log(error?.message)
    }
  }
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
                  source={{uri: 'data:image/jpeg;base64,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'}} // Replace with your image path
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <Text >{members?.length || "0"} going <Text className='capitalize'>{event_city}</Text></Text>
            <View className='flex-row'>
              <Ionicons name='share-outline' size={23} onPress={onShare}/> 
              {!bookMark ? <Ionicons name='bookmark-outline' size={22} onPress={toggleBookMark} /> :  <Ionicons name='bookmark' size={22} color="#d82727" onPress={toggleBookMark}/>}
            </View>
          </View>
      </TouchableOpacity>
    </ScrollView>
    
  )
}

const defaultValues = {
  event_name: '',
  event_about: '',
  event_city: '',
  event_type: '',
  event_address: '',
}

const Contact = ({navigation}: {navigation: any}) => {
  const [selected, setSelected] = React.useState("");
  const [selectedEventType, setSelectedEventType] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])
  const [selectedHost, setSelectedHost] = useState<any[]>([])

  const [show, setShow ] = useState(false) 
  const methods = useForm({defaultValues});
  const {data: getAllEvents, isError, isLoading} = useGetEventsQuery()
  const {data: getEventTypes} = useGetEventTypesQuery()
  const {data: getAllUsers} = useGetUsersQuery()
  const [createEvent, {isLoading: createEventLoading}] = useCreateEventMutation()

  const toast = useToast()

  // Function
  const newArray = useMemo(() => {
    return (getAllUsers?.docs || []).map(
      (item: { id: string; name: string }) => ({
        key: item.id,
        value: item.name,
        disabled: false,
      })
    );
  }, [getAllUsers?.docs]);

  const newEventTypes  = useMemo(() => {
    return (getEventTypes?.docs?.map(
      (item: { id: string, event_types: string}) => ({
        key: item.id,
        value: item.event_types,
        disabled:false
      })
    ) || []);
  }, 
  [getEventTypes?.docs])

  // console.log(newEventTypes, getEventTypes)

  // Combine arrays using spread operator
  members.push(...newArray);    
  types.push(...newEventTypes);

  // End Funtion
  const [date1, setDate1] = useState(new Date());
  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(new Date());

  const dateCallback1 = (selectedDate: any) => {
    const currentDate = selectedDate || date1;
    setDate1(currentDate);
  };

  // Startt time
  const timeCallback1 = (selectedDate: any) => {
    const currentDate = selectedDate || time1;
    setTime1(currentDate);
  };

  // End Time
  const timeCallback2 = (selectedDate: any) => {
    const currentDate = selectedDate || time2;
    setTime2(currentDate);
  };

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!getAllEvents) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  const handleCreateEvent = (data: any) => {
    const formData = {
      event_name: data.event_name,
      event_about: data.event_about,
      event_city: data.event_city,
      event_date: date1,
      event_types: selectedEventType,
      event_time: `${formatTimestampToTimeWithMidday(time1)} - ${formatTimestampToTimeWithMidday(time2)} ${getTimeZone(date1)}`,
      event_address: data.event_address,
      event_tags: [{"tag":"event"},{"tag":"chster"}],
      hosted_by: selectedHost,
      members: selectedMembers,
      status: selectedStatus.toLowerCase(),
    }

    // console.log(formData, date1);
    createEvent(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      console.log('Event attendance updated:', data);
      methods.reset()
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Thank you!!!. Your sit have been reserved" />
      })
      setShow(false)

    })
    .catch((error) => {
      // Handle error
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
      })
      setShow(false)

      console.error(error);
    });

  }

  console.log(selectedMembers)

  return (
    <Layout
      title={show ? 'Create new Event': 'Events'}
      navigation={navigation}
      drawerNav
      iconName={!show && "plus"}
      onPress={()=> setShow(true)}
    >
      <ScrollView showsVerticalScrollIndicator={false} className='flex-col space-y-7'> 
        <FlatList
          data={getAllEvents.docs || []}
          renderItem={({item}) => <EventCard event_about={item.event_about} event_time={item.event_time} event_name={item.event_name} event_city={item.event_city} event_id={item.id} navigation={navigation} members = {item.members}/>}
          keyExtractor={item => item.id}
        />
        {/* BottomSheet component */}
        <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          height={0.9}
          enableBackdropDismiss
        >
          <FormProvider {...methods}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <Text className='font-medium text-2xl text-black '>Create a new events</Text> */}
              <View className='mt-4'>
                <Input
                  name='event_name'
                  label="Event name"
                  placeholder="Enter event name"
                />
                <Input
                  name='event_about'
                  label="Event description"
                  placeholder="Enter event description"
                />
                <Input
                  name='event_city'
                  label="Event city"
                  placeholder="Enter event city"
                />
                <Input
                  name='event_address'
                  label="Event address"
                  placeholder="Enter event address"
                />
                <DatePicker mode="date" selectedDateCallback={dateCallback1} datePickerPlaceholder={formatDate(date1)} datePickerlabel="Event date"/>
                <DatePicker mode="time" selectedDateCallback={timeCallback1} datePickerPlaceholder={formatTimestampToTime(time1)} datePickerlabel="Event start time"/>
                <DatePicker mode="time" selectedDateCallback={timeCallback2} datePickerPlaceholder={formatTimestampToTime(time2)} datePickerlabel="Event end time"/>
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <MultipleSelectList 
                    setSelected={(val: React.SetStateAction<any[]>) => setSelectedHost(val)} 
                    data={members} 
                    save="key"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                    search={false} 

                    placeholder='Select Host'
                  />
                </View>
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <SelectList 
                    setSelected={(val: React.SetStateAction<string>) => setSelectedEventType(val)} 
                    data={types} 
                    save="key"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", height:56, paddingLeft: 10}}
                    search={false} 
                    placeholder='Select event type'
                  />
                </View>
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <MultipleSelectList 
                    setSelected={(val: React.SetStateAction<any[]>) => setSelectedMembers(val)} 
                    data={members} 
                    save="key"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                    search={false} 

                    placeholder='Select Members'
                  />
                </View>
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <SelectList 
                    setSelected={(val: React.SetStateAction<string>) => setSelected(val)} 
                    data={data} 
                    save="value"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", height:56, paddingLeft: 10}}
                    search={false} 
                    placeholder='Select event tags'
                  />
                </View>
                <View className='flex flex-col mb-5'>
                  <SelectList 
                    setSelected={(val: React.SetStateAction<string>) => setSelectedStatus(val)} 
                    data={status} 
                    save="value"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", height:56, paddingLeft: 10}}
                    search={false} 
                    placeholder='Select event status'
                  />
                </View>
                <View className='mb-20'>
                  <CustomButton
                  title="Submit" 
                  isLoading={createEventLoading}
                  onPress={methods.handleSubmit(handleCreateEvent)}              
                  />
                </View>
              </View>
            </ScrollView>
            
          </FormProvider>
        </BottomSheet>
      </ScrollView>
    </Layout>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // messageCard
  cardContainer: {
    width: "100%",
    height: 63,
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: FontSize.base,
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
    flex: 1,
  }
})


/***
 * 
 * name: Create event for youth
 * description: this is the best description
 * city: Nigeria
 * address: 39, VI aiico build lagos
 * 
 */