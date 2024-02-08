import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Third Party
import { useToast } from '@gluestack-ui/themed';
import {  useForm } from 'react-hook-form'
import { parseISO } from 'date-fns';
import { FormProvider } from 'react-hook-form';

// ** Store, Hooks
import { useUnSaveEventMutation, useGetEventByIdQuery, useUpdateEventMutation, useDeleteEventMutation } from '../../../stores/features/event/eventService';

// ** Component
import Toaster from '../../../components/Toaster/Toaster';

// ** Helper
import { ShortenedWord } from '../../../helpers/wordShorther';

// ** Icons
import { Ionicons, Feather } from '@expo/vector-icons'; 
import BottomSheet from '../../../components/bottom-sheet/BottomSheet';
import Input from '../../../components/Input';
import CustomButton from '../../../components/CustomButton';
import { isEventDateLessThanCurrent } from '../../../helpers/isPastEvent';
import Toast from 'react-native-toast-message';


const defaultValues = {
  event_name: '',
  event_about: '',
  event_city: '',
  event_address: '',
}

export const EventCard = ({event_url,event_about, event_time ,event_name, event_city, event_id, members, isDelete, isEdit, navigation,isSave ,event_date,  handleEdit}: any) => {
  const [bookMark, setBookMark] = useState(true)
  const [show, setShow ] = useState(false) 

  const methods = useForm({defaultValues});
  const {setValue} = methods


  // ** Slice Store
  const [unSaveEvent] = useUnSaveEventMutation()
  const [deleteEvent, {isLoading: isDeleteEventLoading}] = useDeleteEventMutation()
  const [updateEvent, {isLoading: isUpdateLoading}] = useUpdateEventMutation()
  const { isLoading: isEventIdLoading, data: EventDetails } = useGetEventByIdQuery(event_id);
  console.log(EventDetails)

// Parse the date string using date-fns parseISO function
  const initialDate = EventDetails?.event_date && parseISO(EventDetails?.event_date);
  const toast = useToast()

  const showToast = () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Loading...',
      autoHide: true,
    });
  };

  if(isDeleteEventLoading){
    showToast()
  }

  // End Funtion
  const [date1, setDate1] = useState(initialDate);
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


  // Fucnc
  const handleUpdateEvent =  async(data: any) => {
    const formData = {
      id: event_id,
      ...data
    }
    // console.log(formData, date1);
    updateEvent(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      console.log('Event updated:', data);
      methods.reset()
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Event updated!!!" />
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

  const toggleBookMark = async() => {
    console.log(event_id)
    try{
      await unSaveEvent(event_id)
      .unwrap()
      .then((data: any) => {
        console.log('res:', data);
      })
    }catch(error: any) {
      // Handle error
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
      })
      setBookMark(false)
    };
    setBookMark(!bookMark)
  }

  const handleDeleteEvent = async () => {
    console.log(event_id)
    Alert.alert(
      'Delete Group',
      'This action is irreversible!!!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteEvent(event_id)
            .unwrap()
            .then(() => {
              toast.show({
                placement: 'top',
                render: ({ id }) => <Toaster id={id} type="success" message="Event Deleted" />
              });
            })
            .catch((error: any) => {
              // toast.show({
              //   placement: 'top',
              //   render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
              // })
              console.error(error);
            });
          },
        },
      ],
    ); 
  };

  // Populate the form fields with the profile data when it's available
  useEffect(() => {
    if (EventDetails) {
      setValue('event_name',  EventDetails?.event_name ||'');
      setValue('event_about',  EventDetails?.event_about ||'');
      setValue('event_city',  EventDetails?.event_city ||'');
      setValue('event_address',  EventDetails?.event_address ||'');  
    }
  }, [EventDetails, setValue]);

  console.log(EventDetails?.event_date)

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
              <Text className='capitalize text-sm text-black opacity-80 font-semibold mt-2' numberOfLines={2} ellipsizeMode="tail"><ShortenedWord word={event_about} maxLength={60}/></Text>
              <Text className='text-gray-500 font-normal mt-1'><ShortenedWord word={event_name} maxLength={48} /></Text>
            </View>
            <View className='w-1/3 rounded-lg'>
              {/* image */}
              <View className=' w h-24  '>
                <ImageBackground
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 10}}
                  style={{flex: 1}}
                  source={{uri: event_url}}
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <Text >{members?.length || "0"} {isEventDateLessThanCurrent(event_date) ? "attended this event in" : "going"}  <Text className='capitalize'>{event_city}</Text></Text>

            {/* <Text >{members?.length || "0"} going <Text className='capitalize'>{event_city}</Text></Text> */}
            <View className='flex-row space-x-1'>
              {/* <Ionicons name='share-outline' size={23} onPress={onShare}/>  */}
              {
                isSave ? !bookMark ? <Ionicons  name='bookmark-outline' size={22} onPress={toggleBookMark} /> :  <Ionicons name='bookmark' size={22} color="#d82727" onPress={toggleBookMark}/> : ''
              }
              {isEdit &&
                <TouchableOpacity onPress={()=> setShow(true)}>
                  <Feather name='edit' size={22} onPress={handleEdit}/>
                </TouchableOpacity>
              }
              {isDelete &&
                <TouchableOpacity>
                  <Ionicons name='trash-bin-outline' size={22}  onPress={handleDeleteEvent}/>
                </TouchableOpacity>
              }
            </View>
          </View>
      </TouchableOpacity>

      {/* BottomSheet component */}
      <BottomSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        height={0.5}
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
              {/* <DatePicker mode="date" selectedDateCallback={dateCallback1} datePickerPlaceholder={formatDate(date1)} datePickerlabel="Event date"  />
              <DatePicker mode="time" selectedDateCallback={timeCallback1} datePickerPlaceholder={formatTimestampToTime(time1)} datePickerlabel="Event start time"/>
              <DatePicker mode="time" selectedDateCallback={timeCallback2} datePickerPlaceholder={formatTimestampToTime(time2)} datePickerlabel="Event end time"/> */}
              {/* <View className='flex flex-col mb-5'>
                <MultipleSelectList 
                  setSelected={(val: React.SetStateAction<any[]>) => setSelectedHost(val)} 
                  data={members} 
                  save="key"
                  boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                  search={false} 

                  placeholder='Select Host'
                />
              </View> */}
              {/* <View className='flex flex-col mb-5'>
                <SelectList 
                  setSelected={(val: React.SetStateAction<string>) => setSelectedEventType(val)} 
                  data={types} 
                  save="key"
                  boxStyles={{borderRadius:4, borderColor: "#80747B", height:56, paddingLeft: 10}}
                  search={false} 
                  placeholder='Select event type'
                />
              </View> */}
              {/* <View className='flex flex-col mb-5'>
                <MultipleSelectList
                  setSelected={(val: React.SetStateAction<any[]>) => setSelectedMembers(val)} 
                  data={members} 
                  save="key"
                  boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                  search={false} 

                  placeholder='Select Members'
                />
              </View> */}
              {/* <View className='flex flex-col mb-5'>
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
              </View> */}
              <View className='mb-20'>
                <CustomButton
                title="Update" 
                isLoading={isUpdateLoading}
                onPress={methods.handleSubmit(handleUpdateEvent)}              
                />
              </View>
            </View>
          </ScrollView>
        </FormProvider>
      </BottomSheet>
    </ScrollView>
  )
}
