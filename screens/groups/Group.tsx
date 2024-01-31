import {  ImageBackground, Share, StyleSheet, Text, Alert, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../layouts/Layout';
import { RootStackParamList } from '../../types';

// ** Icons
import {Ionicons} from "@expo/vector-icons"

// ** Helpers
import { Avatar, AvatarFallbackText, AvatarGroup, AvatarImage,useToast } from '@gluestack-ui/themed';
import { useGetCommunityEventQuery, useGetCommunityMembersQuery, useGetCommunityQuery, useGetCommunityResourcesQuery, useGetJoinedCommunityQuery, useGetOneCommunityQuery, useJoinCommunityMutation, useLeaveCommunityMutation } from '../../stores/features/groups/groupsService';


import { NativeStackScreenProps } from "@react-navigation/native-stack";

//** Components 
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import CustomButton from '../../components/CustomButton';
import Toaster from '../../components/Toaster/Toaster';
import { useGetUpcomingEventsQuery } from '../../stores/features/event/eventService';
import { formattedDateWithDay } from '../../helpers/formatDate';


type Props = NativeStackScreenProps<RootStackParamList, "Group">;

// Define the type for your route parameters
type RouteParams = {
  communityId: string; // Replace 'string' with the correct type for communityId
};

const renderEventCard = (item: any, toggleBookMark: any, bookMark: any, navigation: any) => {
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
    <TouchableOpacity className='h-44 w-48 rounded-lg mr-3'>
      <View style={{flex:1}} className='justify-between rounded-b-lg bg-gray-100 p-4'>
        <View className=''>
          <Text className='text-yellow-500 text-xs font-bold'>{formattedDateWithDay(item?.event_date)}</Text>
          {/* Event Description */}
          <Text className='truncate text-xs text-black opacity-80 font-bold mt-2' numberOfLines={2} ellipsizeMode="tail">{item?.event_name}</Text>

          <Text className='capitalize truncate text-xs text-black opacity-80 font-bold mt-2' numberOfLines={2} ellipsizeMode="tail">{item?.event_about}</Text>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <View className='ml-2'>
            <AvatarGroup>
              {
                item?.hosted_by.map((host: { name: string; }) => (
                  <Avatar size="xs">
                    <AvatarFallbackText>{host.name}</AvatarFallbackText>
                    {/* <AvatarImage
                      source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB80',
                      }}
                    />*/}
                  </Avatar> 
                ))
              }
            </AvatarGroup>
          </View>
          <View className='flex-row items-center'>
             <Ionicons name='share-outline' size={20} onPress={onShare}/> 
            {/* {!bookMark ? <Ionicons name='star-outline' size={18} onPress={toggleBookMark}  /> :  <Ionicons name='star' size={18} color="#d82727"/>} */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Group: React.FC<Props> = ({ navigation: { navigate } , route}) => {
  const [bookMark, setBookMark] = useState(false)
  const [show, setShow] = useState(false)
  const [showResources, setShowResources] = useState(false)

  const toggleShowResources =  () => {
    setShow(false)
    setShowResources(!showResources)
  }

  const toggleBookMark = () => setBookMark(!bookMark)
  // 
  const toast = useToast()

  const { communityId } = route.params as unknown  as RouteParams;
  const { isLoading, data } = useGetOneCommunityQuery(communityId);
  const {isLoading: isEventLoading, data: getCommunityEventData} = useGetCommunityEventQuery(communityId)
  const {data: getCommunityResources} = useGetCommunityResourcesQuery()
  const [leaveCommunity] = useLeaveCommunityMutation()
  const {  data: isJoinedCommunity, isLoading: isJoinedCommunityLoading } = useGetJoinedCommunityQuery(communityId);
  const { data: getCommunityMembers, isLoading: isCommunityMembersLoading}  =  useGetCommunityMembersQuery(communityId)
  const [joinCommunity, { isLoading: isJoining }, ] = useJoinCommunityMutation()

  // ** Fetch all Upcoming Events in this community
  const {data: getUpcomingEvents} = useGetUpcomingEventsQuery(communityId)
  // ** Fetch all community
  const {data: getAllCommunity} = useGetCommunityQuery(); 


  console.log(getCommunityResources)

  if(isLoading && isJoinedCommunityLoading && isCommunityMembersLoading){
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  console.log(getUpcomingEvents, "my upcoming events")

  const handleLeaveGroup = () => {
    setShow(false);
    const formData = {
      community_id: communityId 
    }
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            leaveCommunity(formData)
            .unwrap()
            .then((data) => {
              // Handle success
              console.log('res:', data);
            })
            .catch((error) => {
              // Handle error
              toast.show({
                placement: 'top',
                render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
              })
              console.error(error);
            });
          },
        },
      ],
    ); 
  }

  const handleJoinPress = async () => {
    try {
      const id = {
        community_id: communityId
      }
      const response: any = await joinCommunity(id);
      if (response) {
        console.log(response)       
        if(response?.error?.status === 500){
          toast.show({
            placement: "top",
            render: ({ id }) => <Toaster id = {id} message={response?.error?.data.error}  />
          })
          return;
        }
        return;
      } else {
      }
    } catch (err: any) {
      console.log('Error joining community:', err);
      if(err){
          toast.show({
            placement: "top",
            render: ({ id }) => <Toaster id = {id} message=" You already join this community"/>
          })
      }
    }
  };
  console.log(getCommunityEventData, "get community event")
  return (
    <Layout
      title = "Community Details"
      iconName="dots-horizontal"
      onPress={()=> setShow(true)}
   >
    <View style={styles.container}>
      <View className='px-5'>
        <View>
          {/* Image */}
          <View className='h-40 bg-blue-900 rounded-lg flex items-center justify-center mt-5'>
            <ImageBackground
              resizeMode="cover"
              imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10}}
              style={{ flex: 1, width: '100%' }}
              source = {{uri: 'data:image/jpeg;base64,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'}}
            />
          </View>
          <View className='flex-row items-center justify-between mt-3'>
            <Text className='text-black text-xs font-normal '>Part of {data?.community_name} ({getAllCommunity?.docs?.length} community)</Text>
            <TouchableOpacity onPress={()=> navigate("Resources", {communityId: communityId})}>
              <Text className="text-ksecondary text-sm opacity-50 font-normal">See Resources</Text>
            </TouchableOpacity>
          </View>
          
          <Text className='text-gray-800 text-lg font-bold mt-2 uppercase'>{data?.community_name}-community</Text>
        </View>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity 
            onPress={()=> navigate("Members", {communityId})}>
            <FlatList
              data={getCommunityMembers?.docs || []}
              horizontal
              showsHorizontalScrollIndicator = {false}
              keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
              renderItem={({ item }: any) => 
                <View className='w-10 mr-1 mt-3 h-10 rounded-full border border-black bg-blue-400 items-center justify-center'>
                  <Text>{(item.name || '').charAt(0).toUpperCase()}</Text>
                </View>
            }
            />
          </TouchableOpacity>
          <Ionicons name="chatbubbles-outline" size={30} onPress={() => navigate("ChatCommunity", {communityId: communityId})} />
        </View>

        <View>
          <Text className='text-black text-xs font-bold mt-3'>{getCommunityMembers?.docs?.length || 0} Members</Text>
          <Text className='text-gray text-xs font-normal'>Lagos, Nigeria Public community</Text>
        </View>
        {
          !isJoinedCommunity?.flag?
          <View className='mt-5'>
            <CustomButton title='Join Community' isLoading={isJoining}  onPress={handleJoinPress}/>
          </View> : null
        }
      
        <View className='mt-5'>
          <View className="flex-row items-center justify-between mb-3">
            {/*  */}
            <Text className="text-black text-sm  font-semibold">Event</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">See all</Text>
          </View>          
          <View>
          {
            getCommunityEventData?.docs.length > 0 ?
            <FlatList
              horizontal
              data = {getCommunityEventData?.docs}
              renderItem={({ item }) => renderEventCard(item, toggleBookMark, bookMark, navigate)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator = {false}
            /> : 
            <Text className='text-sm text-ksecondary'>No Event at the Moment!!!</Text>
          } 
          
          </View> 
        </View>
      </View>
      {/* BottomSheet component */}
      <BottomSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        height={0.18}

        enableBackdropDismiss
      >
        <View>
          <CustomButton title='Your resources' onPress={toggleShowResources} buttonStyle={{marginBottom: 10}} />
        </View>
        <View>
          <CustomButton title='Leave group' onPress={handleLeaveGroup} />
        </View>
      </BottomSheet>

      {/* <BottomSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        height={0.9}

        enableBackdropDismiss
      >
       <Resources />
      </BottomSheet> */}
    </View>
  </Layout>
  )
}

export default Group

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  }
})

