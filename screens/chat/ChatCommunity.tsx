import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Layout from '../../layouts/Layout';
import { RootStackParamList } from '../../types';
import { KeyboardAvoidingView } from 'native-base';

// ** Utils
import socket from '../../utils/socket'

import useGlobalState from '../../hooks/global.state';
import { Colors } from '../../constants';
import Font from '../../constants/Font';
import FontSize from '../../constants/FontSize';
import { formatTimestampToTime } from '../../helpers/timeConverter';
import { Buffer } from '@craftzdog/react-native-buffer';
import * as FileSystem from 'expo-file-system';
import ChatInput from '../../components/ChatInput';
import { getFileExtension } from '../../helpers/getFileExtension';
import { FileCard } from '../resources/components/FileResources';
import { ImageCard } from '../resources/components/ImageResources';
type Props = NativeStackScreenProps<RootStackParamList, "ChatCommunity">;

// Define the type for your route parameters
type RouteParams = {
  communityId: string; // Replace 'string' with the correct type for communityId
};

const MessageCard = ({message, time, chatId, name, fileUri}: {message: string, time: any, chatId: string, name: string,fileUri: any}) => {
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

  return (
    <View style={user?.id === chatId ? [styles.cardContainer, styles.rightChat, { width: containerWidth }]: [styles.cardContainer, styles.leftChat, { width: containerWidth }]}>
      <Text className=' mb-10 absolute -top-1 '>{chatId !== user?.id ? name : ''}</Text>
        {
          getFileExtension(message) === '.docx' || getFileExtension(message) === '.pdf' ? 
          <FileCard url={message} /> :
          getFileExtension(message) === '.jpg' || getFileExtension(message) === '.jpeg'?
          <ImageCard isImageTime url = {message} />

          : 
          <View className='bg-[#F5E5F5]  py-3 relative px-2 w-auto  min-w-[70px] rounded-sm'>
            <Text className='text-xs mb-2'>
              {message} 
            </Text>
            <Text style={[styles.time]} className="absolute right-2 -bottom-5">{formatTimestampToTime(time)}</Text>
          </View>
        
        }
    </View> 
  )
}

const ChatCommunity: React.FC<Props> = ({ navigation: { navigate } , route}) => {
  const [message, setMessage] = useState('');
  const [messagesRecieved, setMessagesReceived] = useState<any[]>([]);
  const [imageUri, setImageUri] = useState<any>(null);
  const [arrayBuffer, setArrayBuffer] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null)
  const [fileType, setFileType] = useState<any>(null)
  const [downloadedFileUri, setDownloadedFileUri] = useState('');

  const flatListRef = useRef<FlatList<any>>(null);
  const { communityId } = route.params as unknown  as RouteParams;

   const {user} = useGlobalState()

  const handleSendMessage = async() => {
    const data = {
      arrayBuffer: arrayBuffer,
      fileName: fileName,
      communityId: communityId,
      currentUserId: user?.id,
      type: fileType
    }
    console.log(data);
    if(arrayBuffer){
      console.log(data)
      socket.emit('uploadFile', data);
      setArrayBuffer("")
      setFileName("")
      setMessage("")
      // setFileType("")
    }else{
      const data = {
        communityId: communityId,
        current_user_id: user?.id,
        message: message
      }
      // console.log(data);
      socket.emit("sendMessage", data)
      setMessage("")
      setArrayBuffer("")
      setFileName("")
      // setFileType("")
    // }
    }
  }
  
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    // Listen for the server's response
    socket.on("newCommunityMessage", (newData) => {
      console.log("get Lastest Chat", newData)
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

  const convertArrayBufferToFile = async (arrayBuffer: any[], fileType: string) => {
    console.log(arrayBuffer, fileType , "i notice u")
    try {
      if (!arrayBuffer) {
        console.error('ArrayBuffer is empty or undefined.');
        return null;
      }

      let fileExtension = '';
      if(fileType === 'image/jpeg' || fileType === 'image/png') {
        console.log("Second choce")

        fileExtension = 'jpg'; // or 'png' based on the actual image type
      } else if (fileType === 'application/pdf') {
        console.log("Third choce")

        fileExtension = 'pdf';
      } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log("Fourth choce")

        fileExtension = 'docx';
      } else {
        console.error('Unsupported file type:', fileType);
        return null;
      }

      const uniqueFileName = `downloaded_file_${Date.now()}.${fileExtension}`;
      const fileUri = `${FileSystem.documentDirectory}${uniqueFileName}`;

      const base64Data = await Buffer.from(arrayBuffer).toString('base64');

      if (!base64Data) return null;

      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setDownloadedFileUri(fileUri);
      return fileUri;
    } catch (error) {
      console.error('Error converting ArrayBuffer to file:', error);
      return null;
    }
  };

  


  useEffect(() => {
    socket.on("uploadComplete", async (data) => {
      try {
        // Check if data is already an object, if not, parse it  
        if (!data.arrayBuffer) return null;
        console.log(data, "my data")
        const fileUri = await convertArrayBufferToFile(data.arrayBuffer, data.type);
        console.log(fileUri, "uploadComplete");
  
        if (fileUri) {
          setMessagesReceived((state) => [
            ...state,
            {
              id: data.id,
              message: fileUri,
              chatId: data.chatId,
              time: data.time,
            },
          ]);
          console.log(data + "image response");
        } else {
          console.error('Error converting ArrayBuffer to File. FileUri is undefined.');
        }
      } catch (error) {
        console.error('Error handling upload complete:', error);
      }
    });
  
    console.log("file me upload complete");
  
    // Cleanup the event listener when the component is unmounted
    return () => {
      socket.off("uploadComplete");
    };
  }, [socket]);
  
  

  // const handleClearMessage = () => setMessagesReceived([])



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
      console.log(data)
      setMessagesReceived((state) => [
        ...state,
        ...data.docs.map((doc: any) => ({
          id: doc.id,
          message: doc.message,
          name: doc.current_user_id.name,
          chatId: doc.current_user_id.id,
          time: doc.createdAt
        })),
      ]);
    });
  
    // return () => {
    //   socket.off('fetchAllMessage')
    //   socket.off('fetchAllCommunityMessage')
    // }
  }, []);

  useEffect(() => {
    // Scroll to the end of the list when messages are added or changed
    if (flatListRef.current && messagesRecieved.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messagesRecieved]);

  console.log(fileType)


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
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                  <MessageCard  message={item.message} time={item.time} chatId= {item.chatId} name={item.name}  fileUri = {item.file}/>
                )}
                onContentSizeChange={() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }}
              />
              :  <Text className='text-center mt-6 '>No message yet</Text>
            } 
        </View>
        {/* <TouchableOpacity onPress={handleClearMessage} className='mb-10'><Text>Clear</Text></TouchableOpacity> */}
        <ChatInput imageUri={imageUri} setImageUri={setImageUri} arrayBuffer={arrayBuffer} setArrayBuffer={setArrayBuffer} message={message} setMessage={setMessage} onPress={handleSendMessage} setFileName={setFileName}  setFileType={setFileType} />
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
    // backgroundColor: "#F5E5F5",
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
    // paddingRight: 60,
    // paddingLeft: 20,
    // paddingVertical: 18,
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