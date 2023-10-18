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
import { Divider } from 'native-base';

// ** Layout
import Layout from '../../layouts/Layout';

// ** Components
import CustomButton from '../../components/CustomButton';
import { ShortenedWord } from '../../helpers/wordShorther';
import { useGetSavedEventQuery } from '../../stores/features/event/eventService';
//
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Events">;
const StyledView = styled(View)

interface ICardProps {
  id: string ;
  email: string;
  resource: string
  filename?: string
  onPress?: ()=>void;
}



const Card: React.FC<ICardProps> = ({id , email, resource, filename, onPress}) => {
  console.log(id, email, resource)
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
            <Text style={styles.title}><ShortenedWord word={resource} maxLength={30} /></Text>
            {/* incoming message type */}
            <Text style={styles.description}>{email}</Text>
          </View>
        </View>

        <View>
          {/* time */}
          {/* <MaterialIcons name = "more-vert" size={25} color="#4E444B" /> */}
        </View>
    
    </TouchableOpacity>
  )
}

const Events: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {data, isLoading} = useGetSavedEventQuery()

  return (
    <Layout
      title = "Events"
      iconName="tray-arrow-up"
      extraOneIcon="bookmark-outline"
    >
    <View style={styles.container}>
      {/* search button */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Search Events'
          placeholderTextColor="#4E444B" 
          style={{color: '#4E444B', width: '90%'}}
        /> 
        <Ionicons
          style = {{ fontSize: FontSize.large, color: '#4E444B'}}
          name = "search"
        />
      </View>  
      <View className='mt-6' />
      {/* Events */}
      <FlatList
        data={data?.docs}
        keyExtractor={item => item.id.toString()}
        renderItem={
          ({item}) => 
            <Card  
                resource = {item?.event?.title || ""}
                email={item?.user.email}
                id = {item?.id.toString()}
            /> 
        }
      />
    </View>
  </Layout>
  )
}

export default Events

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
    height: 63,
    flexDirection: "row",
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
})