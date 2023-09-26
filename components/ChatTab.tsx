import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import {MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 
import Input from './Input';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { TextInput } from 'react-native-paper';

const w = Dimensions.get('window').width

interface IChatTabProps {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  onPress: () => void
}

const ChatTab: FC<IChatTabProps> = ({message, setMessage, onPress}) => {
  

  return (
    <View style={styles.chatInputFieldContainer} className='mb-10'>
      <TouchableOpacity
        onPress={() => null}
      >
        <MaterialCommunityIcons name='plus' color={Colors.gray} size={30}/>
      </TouchableOpacity>
    {/* ===== INPUT FIELD ===== */}
      <View style={{flexGrow: 1}} className='mx-5' >
        <TextInput
          placeholder='Text message'
          mode="outlined"
          style={{ backgroundColor: 'transparent' }}
          onChangeText={setMessage}
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
    width: w*1,
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  }
})