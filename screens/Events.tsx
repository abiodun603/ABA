import {  FlatList, ImageBackground, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'

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
import { useCreateEventMutation, useGetEventsQuery, useGetEventTypesQuery, useSaveEventMutation, useUnSaveEventMutation } from '../stores/features/event/eventService'
import { useGetUsersQuery } from '../stores/features/users/UsersService'
import { useToast } from '@gluestack-ui/themed'
import { getTimeZone } from '../helpers/timeZoneformat'
import { DatePicker } from '../components/datepicker/DatePicker'
import { useGetCommunityQuery } from '../stores/features/groups/groupsService'
import Toast from 'react-native-toast-message'
import useGlobalState from '../hooks/global.state'


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



const Badge = ({title}: {title: string | boolean}) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={{fontFamily: Font['inter-regular'], color: "#000000", fontSize: FontSize.xsmall}}>{title}</Text>
    </View>
  )
}





export const EventCard = ({event_about, save_event, event_time ,event_name, event_city, event_id, members, navigation, url}: any) => {
  const [bookMark, setBookMark] = useState(false)
  const [saveEvent, {isLoading: saveEventLoading}] = useSaveEventMutation()
  const [unSaveEvent,  {isLoading: unsaveEventLoading}] = useUnSaveEventMutation()

  const toast = useToast()

  console.log(save_event)
  const showToast = () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Loading...',
      autoHide: true,
    });
  };

  if(saveEventLoading || unsaveEventLoading){
    showToast();
  }

  const toggleBookMark = async () => {
    console.log("save me ")

    try {
      const formData = {
        event_id: event_id
      };
      console.log(formData, "Save eventt Id")
      await saveEvent(formData).unwrap().then((res: any) => {
        if(res?.docs.length > 0){
          toast.show({
            placement: 'top',
            render: ({ id }) => <Toaster id={id} type="success" message={`Thank you!!!. Event has been ${!save_event ? "saved" : "unsaved"}`}/>
          });
          setBookMark(true);

        }else{
          toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="error" message="Event not saved. Try again!!!" />
        });
        }
      });
    
    } catch (error: any) {
      console.log(error, "error from server")
      if (error.data && error.data.errors && error.data.errors.length > 0) {
        toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="error" message={error.data.errors[0].message} />
        });
      } else {
        toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="error" message="An error occurred while saving the event." />
        });
      }
      setBookMark(false);
    }
  };

  const toggleUnBookMark = async () => {
    console.log("unsave me ")
    try {
      const formData = {
        event_id: event_id
      };
      console.log(event_id, "unsave me")

      await unSaveEvent(event_id)
      .unwrap()
      toast.show({
        placement: 'top',
        render: ({ id }) =>  <Toaster id={id} type="success" message={`Thank you!!!. Event has been unsaved`}/>
      });
      setBookMark(false);
    } catch (error: any) {
      // Handle error
      if (error.data && error.data.errors && error.data.errors.length > 0) {
        toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="error" message={error.data.errors[0].message} />
        });
      } else {
        toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="error" message="An error occurred while saving the event." />
        });
      }
    }
  };


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
        className='mb-3'>
          <View className='flex-row ' >
            <View className='w-2/3'>
              <Text className='text-yellow-500 text-sm font-bold'>{event_time}</Text>
              {/* Event Description */}
              <Text className='text-sm  capitalize text-gray-500 opacity-80 font-semibold mt-2' numberOfLines={2} ellipsizeMode="tail"><ShortenedWord word={event_about} maxLength={60}/></Text>
              <Text className=' font-normal mt-1 text-black '><ShortenedWord word={event_name} maxLength={48} /></Text>
            </View>
            <View className='w-1/3 rounded-lg'>
              {/* image */}
              <View className=' w h-24  '>
                <ImageBackground
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 10}}
                  style={{flex: 1}}
                  source={{uri : url}}
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <Text >{members?.length || "0"} going <Text className='text-2xl'>.</Text> <Text className='capitalize'>{event_city}</Text></Text>
            <TouchableOpacity disabled={saveEventLoading || unsaveEventLoading} className='flex-row'>
              <Ionicons name='share-outline' size={23} onPress={onShare}/> 
              {!save_event ? <Ionicons name='bookmark-outline' size={22} onPress={toggleBookMark} /> :  <Ionicons name='bookmark' size={22} color="#d82727" onPress={toggleUnBookMark}/>}
            </TouchableOpacity>
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
  const [selectedCommunity, setSelectedCommunity] = useState<any>("")
   // Initialize arrays
   const [members, setMembers] = useState<any[]>([]);
   const [types, setTypes] = useState<any[]>([]);
   const [community, setCommunity] = useState<any[]>([]);

  const [show, setShow ] = useState(false) 
  const methods = useForm({defaultValues});
  const {data: getAllEvents, isError, isLoading} = useGetEventsQuery()
  const {isLoading: isLoadingCommunity, data: getAllCommunity} = useGetCommunityQuery()
  const {data: getEventTypes} = useGetEventTypesQuery()
  const {data: getAllUsers} = useGetUsersQuery()
  const [createEvent, {isLoading: createEventLoading}] = useCreateEventMutation()



  const toast = useToast()
  const {user} = useGlobalState()
  console.log(user.id)



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

  if(isLoadingCommunity)return <Text>Loading...</Text>

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
      ...(selectedCommunity !== null && selectedCommunity !== '' && { community_id: selectedCommunity }),
      members: selectedMembers,
      status: selectedStatus.toLowerCase(),
    }

    // console.log(formData, date1);
    createEvent(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      // console.log('Event attendance updated:', data);
      methods.reset()
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Event Successfully created!!!" />
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

  // Update arrays when data changes
// Check if members state is empty and getAllUsers.docs is available
if (members.length === 0 && getAllUsers && getAllUsers.docs) {
  // Create a Set to keep track of unique user IDs
  const uniqueIds = new Set<string>();

  // Map through getAllUsers.docs and filter out duplicate user IDs
  const uniqueMembers = getAllUsers.docs.reduce((acc: any[], item: { id: string; name: string }) => {
    // Check if the current user ID is not already in the Set
    if (!uniqueIds.has(item.id)) {
      // If it's not, add it to the Set and push the user object to the accumulator array
      uniqueIds.add(item.id);
      acc.push({
        key: item.id,
        value: item.name,
        disabled: false,
      });
    }
    return acc;
  }, []);

  // Update the members state with the uniqueMembers array
  setMembers(uniqueMembers);
}

// Check if members state is empty and getAllUsers.docs is available
if (types.length === 0 && getEventTypes && getEventTypes.docs) {
  // Create a Set to keep track of unique user IDs
  const uniqueIds = new Set<string>();

  // Map through getAllUsers.docs and filter out duplicate user IDs
  const uniqueTypes = getEventTypes.docs.reduce((acc: any[], item: { id: string; event_types: string }) => {
    // Check if the current user ID is not already in the Set
    if (!uniqueIds.has(item.id)) {
      // If it's not, add it to the Set and push the user object to the accumulator array
      uniqueIds.add(item.id);
      acc.push({
        key: item.id,
        value: item.event_types,
        disabled: false,
      });
    }
    return acc;
  }, []);

  // Update the members state with the uniqueMembers array
  setTypes(uniqueTypes);
}

// Check if members state is empty and getAllUsers.docs is available
if (community.length === 0 && getAllCommunity && getAllCommunity.docs) {
  // Create a Set to keep track of unique user IDs
  const uniqueIds = new Set<string>();

  // Map through getAllUsers.docs and filter out duplicate user IDs
  const uniqueCom = getAllCommunity.docs.reduce((acc: any[], item: { id: string; community_name: string }) => {
    // Check if the current user ID is not already in the Set
    if (!uniqueIds.has(item.id)) {
      // If it's not, add it to the Set and push the user object to the accumulator array
      uniqueIds.add(item.id);
      acc.push({
        key: item.id,
        value: item.community_name,
        disabled: false,
      });
    }
    return acc;
  }, []);

  // Update the members state with the uniqueMembers array
  setCommunity(uniqueCom);
}


  // useEffect(() => {
  //   if (getEventTypes && getEventTypes.docs) {
  //     const newEventTypes = getEventTypes.docs.map((item: { id: string; event_types: string }) => ({
  //       key: item.id,
  //       value: item.event_types,
  //       disabled: false,
  //     }));
  //     setTypes(newEventTypes);
  //   }
  // }, [getEventTypes]);
  console.log(getAllCommunity, "bug")


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
          data={getAllEvents?.docs || []}
          renderItem={({item}) => 
            <EventCard 
              save_event={item.savedEvent.some((event: { user: { id: string } }) => event?.user?.id === user?.id)} // Check if any event_id matches the logged-in user ID
              event_about={item.event_about} 
              event_time={item.event_time} 
              event_name={item.event_name} 
              event_city={item.event_city} 
              event_id={item.id} 
              navigation={navigation} 
              members = {item.members} 
              url = {item.url}/>}
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
                  rules={{
                    required: 'This field is required',
                  }}
                />
                <Input
                  name='event_about'
                  label="Event description"
                  placeholder="Enter event description"
                  rules={{
                    required: 'This field is required',
                  }}
                />
                <Input
                  name='event_city'
                  label="Event city"
                  placeholder="Enter event city"
                  rules={{
                    required: 'This field is required',
                  }}
                />
                <Input
                  name='event_address'
                  label="Event address"
                  placeholder="Enter event address"
                  rules={{
                    required: 'This field is required',
                  }}
                />
                <DatePicker mode="date" selectedDateCallback={dateCallback1} datePickerPlaceholder={formatDate(date1)} datePickerlabel="Event date"/>
                <DatePicker mode="time" selectedDateCallback={timeCallback1} datePickerPlaceholder={formatTimestampToTime(time1)} datePickerlabel="Event start time"/>
                <DatePicker mode="time" selectedDateCallback={timeCallback2} datePickerPlaceholder={formatTimestampToTime(time2)} datePickerlabel="Event end time"/>
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <SelectList 
                    setSelected={(val: React.SetStateAction<any[]>) => setSelectedCommunity(val)} 
                    data={community} 
                    save="key"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                    search={true} 
                    placeholder='Select Community'
                  />
                </View>
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <MultipleSelectList 
                    setSelected={(val: React.SetStateAction<any[]>) => setSelectedHost(val)} 
                    data={members} 
                    save="key"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                    search={true} 

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
                    search={true} 
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
                    search={true} 

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
                    search={true} 
                    placeholder='Select event tags'
                  />
                </View>
                <View className='flex flex-col mb-5'>
                  <SelectList 
                    setSelected={(val: React.SetStateAction<string>) => setSelectedStatus(val)} 
                    data={status} 
                    save="value"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", height:56, paddingLeft: 10}}
                    search={true} 
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