import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Layout from '../../layouts/Layout';
import { RootStackParamList } from '../../types';
import { KeyboardAvoidingView } from 'native-base';

// ** Utils
import socket from '../../utils/socket'

import ChatTab from '../../components/ChatTab';
import useGlobalState from '../../hooks/global.state';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { Colors } from '../../constants';
import Font from '../../constants/Font';
import FontSize from '../../constants/FontSize';
import { formatTimestampToTime } from '../../helpers/timeConverter';
import { FlatList } from 'react-native';
import ChatInput from '../../components/ChatInput';
type Props = NativeStackScreenProps<RootStackParamList, "ChatCommunity">;

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

// Define the type for your route parameters
type RouteParams = {
  communityId: string; // Replace 'string' with the correct type for communityId
};

const MessageCard = ({message, time, chatId}: {message: string, time: any, chatId: string, name: string}) => {
  const {user} = useGlobalState();
  const [containerWidth, setContainerWidth] = useState<any>(null);
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
      <Text className='text-xs text-gray-400 mb-10 absolute -top-1 left-2 py-1 '>{chatId !== user?.id ? name : ''}</Text>
      <View>
        <Text style={styles.messageText}>
          {message} 
        </Text>
      </View>
      <Text style={[styles.time]} className="absolute -bottom-4 right-2 ">{formatTimestampToTime(time)}</Text>
    </View> 
  )
}

const ChatCommunity: React.FC<Props> = ({ navigation: { navigate } , route}) => {
  const [message, setMessage] = useState('');
  const [messagesRecieved, setMessagesReceived] = useState<any[]>([]);
  const [imageUri, setImageUri] = useState<any>(null);
  const [arrayBuffer, setArrayBuffer] = useState<any>(null);

  const flatListRef = useRef<FlatList<any>>(null);
  const { communityId } = route.params as unknown  as RouteParams;

   const {user} = useGlobalState()

  const handleSendMessage = async() => {
    if(arrayBuffer){
        socket.emit('uploadFile', {
          arrayBuffer,
          fileName: imageUri,
          communityId: communityId,
          currentUserId: user?.id,
          // type: 'video/mp4'
        });
        console.log("try me")
  
        socket.on('uploadComplete', (data) => {
          console.log('Received ArrayBuffer data:', data);
          // Process the ArrayBuffer here
        });
     
    }else{
      const data = {
        communityId: communityId,
        current_user_id: user?.id,
        message: message
      }
      // console.log(data);
      socket.emit("sendMessage", data)
    // }
    }
    
  }

  
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    // Listen for the server's response
    socket.on("newCommunityMessage", (newData) => {
      console.log(newData)
      setMessagesReceived((state) => [
        ...state,
        {
          id: newData.id,
          message: newData.message,
          chatId: newData.current_user_id,
          time: newData.createdAt,
        },
      ]);
    });
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("newCommunityMessage");
    };
  }, [socket]); 

  // Add this
  useEffect(() => {
    const data = {
      communityId: communityId,
      limit:40,
      page:1
    }
    console.log("fire me again", data)

    socket.emit('fetchAllMessage', data)
    socket.on("fetchAllCommunityMessage", (data) => {
      setMessagesReceived((state) => [
        ...state,
        ...data.docs.map((doc: any) => ({
          id: doc.id,
          message: doc.message,
          name: doc.communityId.created_by.name,
          chatId: doc.communityId.created_by.id,
          time: doc.createdAt
        })),
      ]);
    });
  
    return () => {
      socket.off('fetchAllMessage')
      socket.off('fetchAllCommunityMessage')
    }
  }, [socket]);

  useEffect(() => {
    // Scroll to the end of the list when messages are added or changed
    if (flatListRef.current && messagesRecieved.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messagesRecieved]);

  console.log(messagesRecieved)


  return (
    <Layout
      title = "Chats"
      iconName="dots-horizontal"
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
                  <MessageCard  message={item.message} time={item.time} chatId= {item.chatId} name={item.name} />
                )}
                onContentSizeChange={() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }}
              />
              :  <Text className='text-center mt-6 '>No message yet</Text>
            } 
        </View>
        <ChatInput imageUri={imageUri} setImageUri={setImageUri} arrayBuffer={arrayBuffer} setArrayBuffer={setArrayBuffer} message={message} setMessage={setMessage} onPress={handleSendMessage} />
      </KeyboardAvoidingView>
    </Layout>
  )
}

export default ChatCommunity

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  time: {
    fontSize: 10,
    fontFamily: Font['inter-regular'],
    color: Colors.gray,
    marginBottom: 25
  },

  // messageCard
  cardContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5E5F5",
    borderTopRightRadius: FontSize.base,
    borderBottomLeftRadius: FontSize.base,
    borderBottomRightRadius: FontSize.base,
    marginBottom: 8,
    maxWidth: 200,
  },
  leftChat: {
  alignSelf: "flex-start",
  paddingRight: 60,
  paddingLeft: 20,
  paddingVertical: 15,
  maxWidth: 200
  },
  rightChat: {
    alignSelf: "flex-end",
    paddingRight: 60,
    paddingLeft: 20,
    paddingVertical: 18,
    maxWidth: 200
  },
  messageText: {
    color: Colors.text,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.small
  },
})

    // if(arrayBuffer){
    //   setMessage("")
    //   try {
    //     socket.emit('uploadFile', {
    //       arrayBuffer,
    //       fileName: imageUri,
    //       communityId: "6535053f2fd2ee7715d143b5",
    //       currentUserId: "6565b9bfa82809c6aad0eb79",
    //       type: 'video/mp4'
    //     });
  
    //     socket.on('uploadComplete', (data) => {
    //       console.log('Received ArrayBuffer data:', data);
    //     });
    //   } catch (error) {
    //     console.error('Error sending data to server:', error);
    //   }
    // }else {