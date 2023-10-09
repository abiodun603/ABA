import React, { FC, useEffect, useRef, useState } from 'react'
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
import { FlatList, Row } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { formatTimestampToTime } from '../../helpers/timeConverter';
type Props = NativeStackScreenProps<RootStackParamList, "ViewMessage">;

type IChatIdProps = {
  message: string
}

interface Message {
  id: string;
  message: string;
  time: string;
  chatId: string;
}

interface IMessageCardProps {
  id: string
  message: string
  chatId: IChatIdProps
}
const MessageCard = ({message, time, chatId}: {message: string, time: any, chatId: string}) => {
  const {user} = useGlobalState();
  const [containerWidth, setContainerWidth] = useState(null);
  const contentRef = useRef<View | null>(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.measure((width) => {
        setContainerWidth(width);
      });
    }
  }, []);

  // console.log(getFindContactId, chatId)
  return (
    <View style={user?.id === chatId ? [styles.cardContainer, styles.rightChat, { width: containerWidth }]: [styles.cardContainer, , styles.leftChat, { width: containerWidth }]}>
      <Text style={user?.id === chatId ? [styles.messageText]: {color: "#FFFFFF"}}>
        {message} 
      </Text>
      <Text style={[styles.time]} className="absolute -bottom-4 right-2">{formatTimestampToTime(time)}</Text>
    </View> 
  )
}

const ViewMessage: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<IMessageCardProps[] | null >(null);
  const [messagesRecieved, setMessagesReceived] = useState<any[]>([]);
  const flatListRef = useRef(null);  
  // const messagesColumnRef = useRef<HTMLDivElement | null>(null);

  const getFindContactId = useAppSelector(state => state.findContact.id)
  const getContactEmail = useAppSelector(state => state.findContact.email)
  const getContactId = useAppSelector(state => state.findContact.contactId)
  const {user} = useGlobalState();
  console.log(getContactEmail, getFindContactId)

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    // Listen for the server's response
    socket.on("latestMessage", (newData) => {
      console.log(newData)
      setMessagesReceived((state) => [
        ...state,
        {
          id: newData.id,
          message: newData.message,
          chatId: newData.senderId.id,
          time: newData.createdAt,
        },
      ]);
    });
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("latestMessage");
      // socket.off("getMessage");
      // socket.disconnect();
    };
  }, [socket]); 

  // Add this
  useEffect(() => {
    const data = {
      chatId: getFindContactId
    }
    socket.emit('recieveMessage', data)
    socket.on("getAllMessageByChatId", (data) => {
      console.log(data)
      setMessagesReceived((state) => [
        ...state,
        ...data.docs.map((doc: any) => ({
          id: doc.id,
          message: doc.message,
          chatId: doc.senderId.id,
          time: doc.createdAt,
        })),
      ]);
    });
  
    return () => {
      socket.off('recieveMessage')
      socket.off('getAllMessageByChatId')
    }
  }, [socket])

  useEffect(() => {
    // Scroll to the end of the list when messages are added or changed
    if (flatListRef.current && messagesRecieved.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messagesRecieved]);


  
  

  const handleSendMessage = () => {
    const data = {
      chatId: getFindContactId,
      currentUserId: user?.id,
      recipientId: getContactId,
      message: message
    }

    // socket.em
    socket.emit("sendMessage", data)
  }
  console.log(messagesRecieved)
  console.log(user?.id);
  return (
    <Layout 
      title = {`${getContactEmail}`}
      onPress={()=> navigate("NewMessage")}
      extraOneIcon="call-outline"
    >
      <KeyboardAvoidingView style={styles.container}>
        <View style={{flex: 1}}>
          {/* <Text style={[styles.time, {textAlign: 'center'}]}>Today</Text>*/}
            {
              messagesRecieved && messagesRecieved.length > 0 ? 
              <FlatList
              ref={flatListRef}
              data={messagesRecieved}
              keyExtractor={(item, index) => item?.id}
              renderItem={({ item }) => (
                <MessageCard  message={item.message} time={item.time} chatId= {item.chatId} />
              )}
              onContentSizeChange={() => {
                flatListRef.current?.scrollToEnd({ animated: true });
              }}
            />
              :  <Text className='text-center mt-6 '>No message yet</Text>
            } 
        </View>
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
    fontSize: 10,
    fontFamily: Font['inter-regular'],
    marginBottom: 25
  },

  // messageCard
  cardContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: FontSize.base,
    borderBottomLeftRadius: FontSize.base,
    borderBottomRightRadius: FontSize.base,
    marginBottom: 8,
    maxWidth: 200,
  },
  leftChat: {
  alignSelf: "flex-start",
  backgroundColor: "#470F48",
  paddingRight: 60,
  paddingLeft: 20,
  paddingVertical: 10,
  maxWidth: 200
  },
  rightChat: {
    alignSelf: "flex-end",
    paddingRight: 60,
    backgroundColor: "#F5E5F5",
    paddingLeft: 20,
    paddingVertical: 10,
    maxWidth: 200
  },
  messageText: {
    color: Colors.text,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.small
  },
})