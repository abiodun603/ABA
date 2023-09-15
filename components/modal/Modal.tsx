import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons"
import CustomButton from '../CustomButton';

const WIDTH = Dimensions.get('window').width
const HEIGHT_MODAL =220;

interface SimpleModalProps {
  title: string;
  description: string;
  buttonName: string;
  onCloseModal: () => void;
  onPressed: () => void;
}

const SimpleModal: FC<SimpleModalProps> = ({title, description, buttonName, onPressed, onCloseModal}) => {
  return (
    <TouchableOpacity
      disabled  = {true}
      style = {styles.container}
    >
      <View style={styles.modal}>
        <Ionicons
          size={40}
          color= '#FF4242'
          name = "wallet-outline"
        />
        <Text className='text-black text-sm font-normal mt-3'>{title}</Text>
        <Text className='text-[11px] text-kdesc mb-4 mt-3'>{description}</Text>
        <View className='flex flex-row'>
          <CustomButton title='cancel' onPress={onCloseModal}  buttonStyle={{width: 125, borderWidth: 1, borderColor: "#80747B", backgroundColor: "transparent", marginRight: 10}} titleColor="#80747B"/>
          <CustomButton title={buttonName} onPress={onPressed} buttonStyle={{width: 125, backgroundColor: "#BA1A1A"}} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SimpleModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 80,
    paddingTop: 10,
    paddingHorizontal:20,
    backgroundColor: 'white',
    borderRadius: 10
  }
})