import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform,
	TouchableOpacity,
} from "react-native";

import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker'
import { theme } from "../theme";
import BottomSheet from "./bottom-sheet/BottomSheet";
import CustomButton from "./CustomButton";
import * as FileSystem from 'expo-file-system';
import { Buffer } from '@craftzdog/react-native-buffer';

const ChatInput = ({ reply, closeReply, isLeft, username, onPress, message, setMessage , imageUri, setImageUri, arrayBuffer, setFileName, setArrayBuffer}: any) => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [show, setShow ] = useState(false) 


  const height = useSharedValue(70);

  // console.log(message)

  useEffect(() => {
		if (showEmojiPicker) {
			height.value = withTiming(400);
		} else {
			height.value = reply ? withSpring(130) : withSpring(70);
		}
	}, [showEmojiPicker]);

  useEffect(() => {
		if (reply) {
			height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
		} else {
			height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
		}
	}, [reply]);

	const heightAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: height.value
		}
	})

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.type === 'success') {
        // setSelectedDocument(result);
        // Handle additional logic or UI updates as needed
        // console.log('Selected document:', result);
        // Read the content of the document as a string
        const documentContent = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        
        if (documentContent === null) {
          console.error('Error reading document content. Document content is null.');
        } else {
          // Convert the string content to an ArrayBuffer
          const arrayBuffer = stringToArrayBuffer(documentContent);
          setArrayBuffer(arrayBuffer);
          setFileName(result.name);
          setShow(false);
          setMessage(`Send File to Community`);
        }
      }
    } catch (err) {
      // Handle errors
      console.error('Error picking document:', err);
    } finally {
      // closeBottomSheet();
    }
  };

  // Function to convert a string to an ArrayBuffer
  const stringToArrayBuffer = (str: any) => {
    const buffer = new ArrayBuffer(str.length);
    const bufferView = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++) {
      bufferView[i] = str.charCodeAt(i);
    }
    return buffer;
  };


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // Get the file name
      // Extract file name from the uri
      const uriComponents = result.assets[0].uri.split('/');
      const fileName = uriComponents[uriComponents.length - 1];

      // console.log('Selected image file name:', fileName);
      try {
        // const fileUri = imageUri;
        const fileStream = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const imageArrayBuffer = Buffer.from(fileStream, 'base64');
        setArrayBuffer(imageArrayBuffer);
        setFileName(fileName)
        setShow(false);
          setMessage(`Send File to Community`)
      } catch (error) {
        console.error('Error converting image to ArrayBuffer:', error);
      }
    }
  
  };

  // console.log(arrayBuffer, imageUri);

  return(
    <View>
      <Animated.View style={[styles.container, heightAnimatedStyle]}>
        {reply ? (
          <View style={styles.replyContainer}>
            <TouchableOpacity
              onPress={closeReply}
              style={styles.closeReply}
            >
              <Icon name="close" color="#000" size={20} />
            </TouchableOpacity>
            <Text style={styles.title}>
              Response to {isLeft ? username : "Me"}
            </Text>
            <Text style={styles.reply}>{reply}</Text>
          </View>
        ) : null}

        <View style={styles.innerContainer}>
          <View style={styles.inputAndMicrophone}>
            <TouchableOpacity
              style={styles.emoticonButton}
              onPress={() => setShowEmojiPicker((value) => !value)}
            >
              <Icon
                name={
                  showEmojiPicker ? "close" : "emoticon-outline"
                }
                size={23}
                color={theme.colors.description}
              />
            </TouchableOpacity>
            <TextInput
              // multiline
              placeholder={"Type something..."}
              style={styles.input}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity style={styles.rightIconButtonStyle} onPress={()=> setShow(true)}>
              <Icon
                name="paperclip"
                size={23}
                color={theme.colors.description}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightIconButtonStyle}>
              <Icon
                name="camera"
                size={23}
                color={theme.colors.description}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Icon
              name={message ? "send" : "microphone"}
              size={23}
              color={theme.colors.white}
              onPress={onPress}
            />
          </TouchableOpacity>
        </View>
        {/* BottomSheet component */}
        <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          height={0.27}
          enableBackdropDismiss
          isTransparent
          isHeaderTransparent
        >
           <CustomButton
              title="Photo" 
              buttonColor="#FFFFFF"
              titleColor="#0047ab"
              buttonStyle={{borderRadius: 10, marginBottom: 5}}
              onPress={pickImage}  
            />
           <CustomButton
            title="Document" 
            buttonColor="#FFFFFF"
            titleColor="#0047ab"
            buttonStyle={{borderRadius: 10, marginBottom: 10}}
            onPress={pickDocument}              
          />
          <CustomButton
            title="Cancel" 
            buttonColor="#FFFFFF"
            titleColor="#0047ab"
            buttonStyle={{borderRadius: 10, height: 60}}
            onPress={() => setShow(false)}
          />
        </BottomSheet>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: theme.colors.white,
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		// paddingHorizontal: 10,
		// marginHorizontal: 10,
    marginBottom: 40,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: theme.colors.inputBackground,
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: theme.colors.inputText,
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",
	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	},
	swipeToCancelView: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 30,
	},
	swipeText: {
		color: theme.colors.description,
		fontSize: 15,
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	recordingActive: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
	},
	recordingTime: {
		color: theme.colors.description,
		fontSize: 20,
		marginLeft: 5,
	},
	microphoneAndLock: {
		alignItems: "center",
		justifyContent: "flex-end",
	},
	lockView: {
		backgroundColor: "#eee",
		width: 60,
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: 130,
		paddingTop: 20,
	},
	sendButton: {
		backgroundColor: theme.colors.secondary,
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ChatInput;