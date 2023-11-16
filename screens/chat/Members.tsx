import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Layout from '../../layouts/Layout';

// ** Utils
import socket from '../../utils/socket'

import { RootStackParamList } from '../../types';
import { useGetCommunityMembersQuery } from '../../stores/features/groups/groupsService';
import {  setMemberEmailAndID } from '../../stores/features/chatMember/chatMemberDetail';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import useGlobalState from '../../hooks/global.state';
type Props = NativeStackScreenProps<RootStackParamList, "Members">;

// Define the type for your route parameters
type RouteParams = {
  communityId: string; // Replace 'string' with the correct type for communityId
}

const Members: React.FC<Props> = ({ navigation: { navigate }, route }) => {
  const { communityId } = route.params as unknown  as RouteParams;
  const { data: getCommunityMembers, isLoading} =  useGetCommunityMembersQuery(communityId)
  const {user} = useGlobalState()

  const dispatch = useAppDispatch()
  console.log(getCommunityMembers)

  if(isLoading){
    return <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>Loading...</Text>;
  }

  if (!getCommunityMembers) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }


  const handleChatSession = async(id: string, email: string) => {
    const data  = {
      current_user_id: user?.id,
      contact_user_id: id
    }
    socket.emit("createChat", data)
    console.log(data)

    socket.on("findOneChat", (chat) => {
      const chatId = chat?.docs[0].id
      console.log(chatId, chat)
      dispatch(setMemberEmailAndID({email, id, chatId}))

      if(chat){
        navigate("Chat")
      }
    })
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
          <TouchableOpacity onPress={() => handleChatSession(item.id, item.email)} className='flex-row items-center space-x-3 mb-5'>
            <View className='w-16 h-16 rounded-full border border-black bg-blue-400 items-center justify-center'>
              <Text>{(item.name || '').charAt(0).toUpperCase()}</Text>
            </View>
            <Text className='text-lg text-gray-900 font-semibold'>{item.name}</Text>
          </TouchableOpacity>
        }
        />
        
      </View>
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

