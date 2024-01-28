import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Layout
import Layout from '../../layouts/Layout';

// ** Utils
import socket from '../../utils/socket'

import { useAppDispatch } from '../../hooks/useTypedSelector';

//** Components 
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import CustomButton from '../../components/CustomButton';

// ** Store Slices
import useGlobalState from '../../hooks/global.state';

import { useAddCommunityAdminMutation, useGetCommunityMembersQuery } from '../../stores/features/groups/groupsService';
import {  setMemberEmailAndID } from '../../stores/features/chatMember/chatMemberDetail';

import { RootStackParamList } from '../../types';
type Props = NativeStackScreenProps<RootStackParamList, "Members">;

// Define the type for your route parameters
type RouteParams = {
  communityId: string; // Replace 'string' with the correct type for communityId
}

const Members: React.FC<Props> = ({ navigation: { navigate }, route }) => {
  const [show, setShow] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");


  const { communityId } = route.params as unknown  as RouteParams;
  const { data: getCommunityMembers, isLoading} =  useGetCommunityMembersQuery(communityId)
  const [addCommunityAdmin, {isLoading: isAddAdminLoading}] = useAddCommunityAdminMutation()
  const {user} = useGlobalState()

  const dispatch = useAppDispatch()
  console.log(getCommunityMembers)

  if(isLoading){
    return <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>Loading...</Text>;
  }

  if (!getCommunityMembers) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  const handleUserId = (userId: string, userRole: string) => {
    setSelectedUserId(userId);
    setSelectedUserRole(userRole);
    setShow(true)
  }

  const handleChatSession = async (id: string, email: string) => {
    try {
      const data = {
        current_user_id: user?.id,
        contact_user_id: id,
      };
  
      socket.emit("createChat", data);
      console.log(data);
  
      socket.on("findOneChat", (chat) => {
        try {
          if (chat && chat.docs && chat.docs.length > 0) {
            const chatId = chat.docs[0].id;
            console.log(chatId, chat);
            dispatch(setMemberEmailAndID({ email, id, chatId }));
            navigate("Chat");
          } else {
            console.error("Unexpected response format from server:", chat);
            // Handle unexpected response format
          }
        } catch (error) {
          console.error("Error processing findOneChat response:", error);
          // Handle error processing response
        }
      });
    } catch (error) {
      console.error("Error during handleChatSession:", error);
      // Handle other errors related to socket.emit or any other synchronous operations
    }
  };
  

  console.log(selectedUserId)

  const toggleAdminAccess = async() => {
    const formData = {
      communityId: communityId,
      userId: selectedUserId
    }
    try{
      await addCommunityAdmin(formData).unwrap().then((res: any) => {
        console.log(res)
      });
    }catch (err: any) {
      console.log(err)
      // if(err.status === 401){
      //   toast.show({
      //     placement: "top",
      //     render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
      //   })
      // }
      // if(err.status === 500){
      //   toast.show({
      //     placement: "top",
      //     render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
      //   })
      // }
      // toast.show({
      //   placement: "top",
      //   render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
      // });
    }
  }

  const handleRemoveFromGroup = () => {
    setShow(false);
    // const formData = {
    //   community_id: communityId 
    // }
    // Alert.alert(
    //   'Leave Group',
    //   'Are you sure you want to leave this group?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         leaveCommunity(formData)
    //         .unwrap()
    //         .then((data) => {
    //           // Handle success
    //           console.log('res:', data);
    //         })
    //         .catch((error) => {
    //           // Handle error
    //           toast.show({
    //             placement: 'top',
    //             render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
    //           })
    //           console.error(error);
    //         });
    //       },
    //     },
    //   ],
    // ); 
  }

    
  return (
    <Layout
      title = "Members"
      extraOneIcon="search"
  >
    <View style={styles.container}>
      <View className='mt-6'>
        <FlatList
          data={getCommunityMembers?.docs || []}
          keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
          renderItem={({ item }: any) => 
          <View className='flex-row items-center justify-between mb-5'>
            <TouchableOpacity onPress={() => handleChatSession(item.id, item.email)} onLongPress={()=> handleUserId(item.id, item.role)} className='flex-row items-center space-x-3'>
              <View className='w-16 h-16 rounded-full border border-black bg-blue-400 items-center justify-center'>
                <Text>{(item.name || '').charAt(0).toUpperCase()}</Text>
              </View>
              <Text className='text-lg text-gray-900 font-semibold'>{item.name}</Text>
            </TouchableOpacity>
            {item.role === 'admin' && <Text className='italic text-sm text-gray-800 capitalize'>{item.role}</Text>}
          </View>
        }
        />
        
      </View>

      {/* BottomSheet component */}
      <BottomSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        height={0.2}

        enableBackdropDismiss
      >
        <View className='space-y-2'>
          <CustomButton title={selectedUserRole === 'admin' ? 'Dismiss as Admin' : 'Make Group Admin'} onPress={toggleAdminAccess} buttonStyle={{borderRadius: 8, marginBottom: 8}} />
          <CustomButton title='Remove from Group' onPress={handleRemoveFromGroup} buttonStyle={{borderRadius: 8}}/>
        </View>
      </BottomSheet>
    </View>
  </Layout>
  )
}

export default Members

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  }
})

