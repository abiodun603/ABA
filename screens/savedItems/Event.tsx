import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

// ** Constants 
import FontSize from '../../constants/FontSize';
import { Colors } from '../../constants';
import Font from '../../constants/Font';

// ** Third Pary
import Ionicons from "@expo/vector-icons/Ionicons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

// ** Store, Hooks
import { useGetSavedEventQuery } from '../../stores/features/event/eventService';

// ** Helpers
import { ShortenedWord } from '../../helpers/wordShorther';


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
          <MaterialIcons name = "more-vert" size={25} color="#4E444B" />
        </View>
    
    </TouchableOpacity>
  )
}


const Event = () => {
  const {data, isLoading} = useGetSavedEventQuery()
  console.log(data, isLoading)
  return (
    <View style={styles.container}> 
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
  )
}

export default Event


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // messageCard
  cardContainer: {
    width: "100%",
    height: 63,
    flexDirection: "row",
    paddingHorizontal: 12,
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
  badgeContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFD7F3",
    borderRadius: FontSize.xxLarge,
  },
  inputContainer:{
    height: 56,
    backgroundColor: '#EFE6E9',
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 28,
  }
})