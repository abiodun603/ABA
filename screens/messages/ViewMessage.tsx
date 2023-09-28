import React, { FC, useEffect, useState } from 'react'
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {StyleSheet, Text, View } from 'react-native';
import Layout from '../../layouts/Layout';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';
import ChatTab from '../../components/ChatTab';
import { useAppSelector } from '../../hooks/useTypedSelector';
import socket from '../../utils/socket';
import useGlobalState from '../../hooks/global.state';
import { FlatList } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
type Props = NativeStackScreenProps<RootStackParamList, "ViewMessage">;

type IChatIdProps = {
  message: string
}

interface IMessageCardProps {
  id: string
  message: string
  chatId: IChatIdProps
}
const MessageCard = ({message}: {message: string}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.messageText}>
        {message}
      </Text>
      <Text style={[styles.time, {textAlign: "right"}]}>16:30</Text>
    </View> 
  )
}

const ViewMessage: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<IMessageCardProps[] | null >(null);
  const [messagesRecieved, setMessagesReceived] = useState<IMessageCardProps[]>([]);


  const getFindContactId = useAppSelector(state => state.findContact.id)
  const getContactEmail = useAppSelector(state => state.findContact.email)
  const getContactId = useAppSelector(state => state.findContact.contactId)
  const {user} = useGlobalState();
  console.log(getContactEmail, getFindContactId)

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    // Fetch contacts when the component mounts
    // socket.emit("getMessage", getFindContactId);
    // Listen for the server's response
    socket.on("getAllMessageByChatId", (data) => {
      console.log(data)
      setChats(data.docs)
      // dispatch(setGetData(data))
    });
    // Clean up the socket listener when the component unmounts
    return () => {
      // socket.off("getMessage");
      socket.off("getAllMessageByChatId");
      // socket.disconnect();
    };
  }, []); 

  // Add this
  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      console.log('Last 100 messages:', JSON.parse(last100Messages));
      const parsedMessages = JSON.parse(last100Messages);
      setMessagesReceived((prevMessages) => [...parsedMessages, ...prevMessages]);    
    })
  
    return () => {
      socket.off('last_100_messages')
    }
  }, [socket])
  

  const handleSendMessage = () => {
    const data = {
      chatId: getFindContactId,
      currentUserId: user?.id,
      recipientId: getContactId,
      message: message
    }

    console.log(data);
    // socket.em
    socket.emit("sendMessage", data)
  }

  console.log(chats)
  return (
    <Layout 
      title = {`${getContactEmail}`}
      onPress={()=> navigate("NewMessage")}
      extraOneIcon="call-outline"
    >
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          {/* <Text style={[styles.time, {textAlign: 'center'}]}>Today</Text>*/}
            {
              chats && chats.length > 0 ? 
              <FlatList
              data={messagesRecieved}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <MessageCard  message={item.chatId.message} />
              )}
            />
              :  <Text className='text-center mt-6 '>No message yet</Text>
            } 
        </ScrollView>
        <ChatTab message={message} setMessage={setMessage} onPress={handleSendMessage} />
      </KeyboardAvoidingView>
    </Layout>
  )
}

export default ViewMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  time: {
    fontSize: FontSize.xsmall,
    fontFamily: Font['inter-regular'],
    color: Colors.gray,
    marginBottom: 25
  },

  // messageCard
  cardContainer: {
    position: "relative",
    width: 232,
    height: 90,
    padding: 10,
    backgroundColor: "#F5E5F5",
    borderTopRightRadius: FontSize.base,
    borderBottomLeftRadius: FontSize.base,
    borderBottomRightRadius: FontSize.base,
    marginBottom: 8
  },
  messageText: {
    color: Colors.text,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.small
  },
})