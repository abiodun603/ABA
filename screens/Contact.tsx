import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Constants 
import Colors from '../constants/Colors'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import { FormProvider, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons"
import BottomSheet from '../components/bottom-sheet/BottomSheet'
import Input from '../components/Input'
import CustomButton from '../components/CustomButton'

// ** Utils
import socket from '../utils/socket'

// ** Hooks
import useGlobalState from '../hooks/global.state'
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector'
import { setGetData } from '../stores/features/contacts/contactSlice'
import { setContactID, setFindContactData, setFindContactEmail } from '../stores/features/findContact/findContactSlice'

interface MessageCardProps {
  name: string ;
  message?: string;
  newMessageNumber?: string | boolean;
  onPress: ()=>void;
}

const Badge = ({title}: {title: string | boolean}) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={{fontFamily: Font['inter-regular'], color: "#000000", fontSize: FontSize.xsmall}}>{title}</Text>
    </View>
  )
}

const MessageCard: React.FC<MessageCardProps> = ({name , message, newMessageNumber, onPress}) => {
  return(
    <TouchableOpacity 
      onPress={onPress }
      style={styles.cardContainer}>
        <View className='flex-row items-center space-x-3'>
          <View className='h-12 w-12 flex items-center justify-center rounded-2xl bg-ksecondary'>
            <Text className='text-white text-sm font-bold'></Text>
          </View>
          <View style={{marginLeft: 10}}>
            {/* name */}
            <Text style={styles.title}>{name}</Text>
            {/* incoming message type */}
            <Text style={styles.description}>@username</Text>
            {/* === DON'T DELETE THE BELOW COMPONENT */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}> */}
              {/* icon */}
              {/* <Ionicons name='md-play-circle' color={Colors.gray} size={20}/> */}
              {/* text */}
              {/* <Text style={[styles.description, {marginLeft: 5}]}>Audio</Text> */}
            {/* </View> */}
          </View>
        </View>

        {/* <View>
          <Text style={{color: Colors.gray, fontFamily: Font['inter-regular'], fontSize: FontSize.xsmall, marginBottom: 5}}>16:30</Text>
          {
            typeof newMessageNumber === 'string' && <Badge title={newMessageNumber}/>
          }

        </View> */}
    </TouchableOpacity>
  )
}

const defaultValues = {
  email: '',
}

interface UserData {
  email: string
}


const Contact = ({navigation}: {navigation: any}) => {
  const [show, setShow ] = useState(false) 
  const methods = useForm({defaultValues});
  const {user} = useGlobalState()
  //
  const dispatch = useAppDispatch()

  // Get all contact
  const allContacts = useAppSelector(state => state.contact.docs)
  console.log(allContacts)

  const handleChatSession = async(id: string, email: string) => {
    const data  = {
      current_user_id: user?.id,
      contact_user_id: id
    }
    socket.emit("createChat", data)

    socket.on("findOneChat", (chat) => {
      console.log(chat)
      dispatch(setFindContactData(chat?.docs[0]))
      dispatch(setFindContactEmail(email))
      dispatch(setContactID(id))

      if(chat){
        navigation.navigate("ViewMessage")
      }
    })
  }

  const handleAddContact = (data: UserData) => {
    const contact = {
      current_user: user?.id,
      email: data.email
    }

    // navigation.navigate("ViewMessage")
    socket.emit("addContact", contact)

   socket.on("getContact", (contact) => {
      console.log(contact)
      dispatch(setGetData(contact))
    }) 
    // setShow(!show)
  }


  useEffect(() => {
    // Fetch contacts when the component mounts
    const fetchContacts = () => {
      socket.emit("findContact", user?.id);
      // Listen for the server's response
      socket.on("getContact", (data) => {
        console.log(data)
        dispatch(setGetData(data))
      });
    };
    fetchContacts();
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("getContact");
      socket.disconnect();
    };
  }, []); 
  
  return (
    <Layout
      title='Contacts'
      navigation={navigation}
      drawerNav
      iconName="plus"
      onPress={()=> setShow(true)}
    >
      <ScrollView style={styles.container}> 
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Search Contacts'
            placeholderTextColor="#4E444B" 
            style={{color: '#4E444B', width: '90%'}}
          /> 
          <Ionicons
            style = {{ fontSize: FontSize.large, color: '#4E444B'}}
            name = "search"
          />
        </View>     
        <FlatList
          data={allContacts}
          keyExtractor={item => item.id.toString()}
          renderItem={
            ({item}) => 
              <MessageCard  
                name = {item.contact_id.email}
                // message={item.message !== null ? item.message : ""}
                // newMessageNumber={item.newMessage !== null && item.newMessage.toString()}
                onPress={() => handleChatSession(item.contact_id.id, item.contact_id.email)}                // onPress={() => navigation.navigate("ViewMessage")}
            /> 
          }
        />
        {/* BottomSheet component */}
        <BottomSheet 
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          height={0.28}
          enableBackdropDismiss
        >
          <FormProvider {...methods}>
            <View>
              <Text className='text-normal text-[28px] text-black '>Enter contact’s email address</Text>
              <View className='mt-6'>
                <Input
                  name='email'
                  label="Email"
                  placeholder="Enter email address"
                />
                <CustomButton
                  title="Submit" 
                  onPress={methods.handleSubmit(handleAddContact)}              
                  />
              </View>
            </View>
          </FormProvider>
        </BottomSheet>
      </ScrollView>
    </Layout>
  )
}

export default Contact

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
    flex: 1,
  }
})