import {  StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { FontAwesome } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';


interface IChatTabProps {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  onPress: () => void
}

const ChatTab: FC<IChatTabProps> = ({message, setMessage, onPress}) => {
  

  return (
      <View style={styles.chatInputFieldContainer} className='mb-10 space-x-4'>
        {/* <TouchableOpacity
            onPress={() => null}
          >
          <MaterialCommunityIcons name='plus' color={Colors.gray} size={30}/>
        </TouchableOpacity> */}
        {/* ===== INPUT FIELD ===== */}
        <View  className='w-[95%]' >
          <TextInput
            placeholder='Text message'
            mode="outlined"
            style={{ backgroundColor: 'transparent' }}
            onChangeText={(text) => setMessage(text)}            
            value={message}
          />
        </View>
        {/* Send Button */}
        <TouchableOpacity
          onPress={onPress}
        >
          <FontAwesome name='send'  color="#A3229A" size={20} />
        </TouchableOpacity>
        {/* </View> */}
      </View>
  )
}

export default ChatTab

const styles = StyleSheet.create({
  chatInputFieldContainer:{
    width: "100%",
    // position: 'absolute', 
    // bottom: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20
  }
})