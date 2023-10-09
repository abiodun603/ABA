import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Constants 
import Colors from '../../constants/Colors'
import Font from '../../constants/Font'
import FontSize from '../../constants/FontSize'

// ** Layouts
import Layout from '../../layouts/Layout'

// ** Third Pary
import { FormProvider, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons"
import BottomSheet from '../../components/bottom-sheet/BottomSheet'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'

// ** Utils
import socket from '../../utils/socket'

// ** Hooks
import useGlobalState from '../../hooks/global.state'
import { formatTimestampToTime } from '../../helpers/timeConverter'


interface MessageCardProps {
  name: string ;
  message: string;
  time?: any;
  newMessageNumber?: string | boolean;
  onPress: ()=>void;
}

const Badge = ({title}: {title: string | boolean}) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={{fontFamily: Font['inter-regular'], color: "#000000", fontSize: FontSize.xsmall}}>{title}</Text>
    </View>
  )
}

const MessageCard: React.FC<MessageCardProps> = ({name , message, newMessageNumber, onPress, time}) => {
  return(
    <TouchableOpacity 
      onPress={onPress }
      style={styles.cardContainer}>
        <View className='flex-row items-center space-x-3'>
          <View className='h-12 w-12 flex items-center justify-center rounded-2xl bg-ksecondary'>
            <Text className='text-white text-sm font-bold'>A</Text>
          </View>
          <View style={{marginLeft: 10}}>
            {/* name */}
            <Text style={styles.title}>{name}</Text>
            {/* incoming message type */}
            <Text style={styles.description}>{message}</Text>
            {/* === DON'T DELETE THE BELOW COMPONENT */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}> */}
              {/* icon */}
              {/* <Ionicons name='md-play-circle' color={Colors.gray} size={20}/> */}
              {/* text */}
              {/* <Text style={[styles.description, {marginLeft: 5}]}>Audio</Text> */}
            {/* </View> */}
          </View>
        </View>

        <View>
          {/* time */}
          <Text style={{color: Colors.gray, fontFamily: Font['inter-regular'], fontSize: FontSize.xsmall, marginBottom: 5}}>{formatTimestampToTime(time)}</Text>
          {/* new message */}
          {/* {
            typeof newMessageNumber === 'string' && <Badge title={newMessageNumber}/>
          } */}

        </View>
    </TouchableOpacity>
  )
}

const defaultValues = {
  email: '',
}

interface UserData {
  email: string
}


const Messages = ({navigation}: {navigation: any}) => {
  const [show, setShow ] = useState(false) 
  const [messages, setMessages] = useState<any[]>([])
  const {user} = useGlobalState()

  const handleAddContact = (data: UserData) => {
    const contact = {
      current_user: user?.id,
      email: data.email
    }

    // navigation.navigate("ViewMessage")
    socket.emit("addContact", contact)

    socket.on("getContact", (contact) => {
      console.log(contact)
    })
    // setShow(!show)
  }

  const methods = useForm({defaultValues});

  const handleSubmit = (data: UserData) => {
    // Handle login logic here
    console.log(data);
  }

  useEffect(() => {
    // Fetch contacts when the component mounts
    const userId = {
      current_user_id: user?.id,
    }

    const fetchContacts = () => {
      socket.emit("findAllChatByUserId", userId);
      // Listen for the server's response
      socket.on("findAllChat", (data) => {
        console.log(data)
        setMessages(data?.docs)
        // dispatch(setGetData(data))
      });
    };

    fetchContacts();
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("findAllChat");
      socket.disconnect();
    };
  }, []); 

  console.log(messages);
  function getUserConversations(conversations: any, currentUserId: any) {
    const userConversations = [];
  
    for (const conversation of conversations) {
      for (const member of conversation.members) {
        if (member.id !== currentUserId) {
          userConversations.push({
            id: conversation.id,
            email: member.email,
            contact_id: conversation.id,
            lastMessage: conversation.last_message,
            createdAt: conversation.createdAt
          });
          break; // No need to continue searching in this conversation
        }
      }
    }
  
    return userConversations;
  }

  const userConversations = getUserConversations(messages, user?.id);

  console.log(userConversations);

  const handleChatSession = (id: string) => {
    console.log(id);
  }

  
  return (
    <Layout
      title='Chats'
      navigation={navigation}
      drawerNav
      iconName="plus"
      onPress={()=> setShow(true)}
    >
      <ScrollView style={styles.container}> 
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Search chats'
            placeholderTextColor="#4E444B" 
            style={{color: '#4E444B', width: '90%'}}
          /> 
          <Ionicons
            style = {{ fontSize: FontSize.large, color: '#4E444B'}}
            name = "search"
          />
        </View>     
        <FlatList
          data={userConversations}
          keyExtractor={item => item.id.toString()}
          renderItem={
            ({item}) => 
              <MessageCard  
                name = {item?.email}
                message={item?.lastMessage !== undefined ? item.lastMessage : ""}
                time={item?.createdAt}
                // newMessageNumber={item.newMessage !== null && item.newMessage.toString()}
                onPress={() => handleChatSession(item.id)}                // onPress={() => navigation.navigate("ViewMessage")}
            /> 
          }
        />
        {/* BottomSheet component */}
        <BottomSheet 
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          height={0.28}
          enableBackdropDismiss
        >
          <FormProvider {...methods}>
            <View>
              <Text className='text-normal text-[28px] text-black '>Enter contact’s email address</Text>
              <View className='mt-6'>
                <Input
                  name='email'
                  label="Email"
                  placeholder="Enter email address"
                />
                <CustomButton
                  title="Submit" 
                  onPress={methods.handleSubmit(handleAddContact)}              
                  />
              </View>
            </View>
          </FormProvider>
        </BottomSheet>
      </ScrollView>
    </Layout>
  )
}

export default Messages

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