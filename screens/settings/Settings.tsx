import {FlatList, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";

// ** Third Party
import { styled } from 'nativewind';
import Entypo from "@expo/vector-icons/Entypo"

// ** Layout
import Layout from '../../layouts/Layout';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Settings">;
const StyledView = styled(View)

const DATA: any = [
  {
    id: 1,
    name: "Storage",
    newMessage: "1",
    route: "About"
  },
  {
    id: 2,
    name: "Accessibility",
    newMessage: "2",
    route: "About"
  },
  {
    id: 3,
    name: "Language",
    newMessage: "2",
    route: "Language"
  },
  {
    id: 4,
    name: "Privacy and Visibility",
    newMessage: null,
    route: "About"
  },
  {
    id: 5,
    name: "Invite",
    newMessage: "2",
    route: "About"
  },
  {
    id: 6,
    name: "About ABA App",
    newMessage: null,
    route: "About"
  },
]

interface MessageCardProps {
  name: string ;
  onPress: any;
}

const MessageCard: React.FC<MessageCardProps> = ({name,  onPress}) => {
  return(
    <TouchableOpacity
      onPress={onPress }
      style={styles.cardContainer}>
        <View className='flex-row items-center space-x-3'>
          <View className='h-6 w-6 flex items-center justify-center rounded-2xl bg-black'>
          </View>
          <View style={{marginLeft: 10}}>
            {/* name */}
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
        <View>
          <Entypo name='chevron-right' size={20}  />
        </View>
    </TouchableOpacity>
  )
}

const Settings: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <Layout
      title = "Settings"

  >
    <View style={styles.container}>
      
      <View className='mt-6' />
      {/* Events */}
      <FlatList
          data={DATA}
          keyExtractor={item => item.id.toString()}
          renderItem={
            ({item}) => 
              <MessageCard  
                name = {item.name}
                onPress={() => navigate(item.route)}

            /> 
          }
        />

      
    </View>
  </Layout>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  inputContainer:{
    height: 56,
    backgroundColor: '#EFE6E9',
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 28,
  },
  cardContainer: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    borderRadius: FontSize.base,
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 8
  },
  circleImage: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: FontSize.medium,
    backgroundColor: Colors.secondary
  },
  title: {
    color: "#1F1A1D",
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.small
  },
  description: {
    color: Colors.gray,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.xsmall,
    lineHeight: 22
  },
})