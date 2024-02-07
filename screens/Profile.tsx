import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
// ** Constants 
import FontSize from '../constants/FontSize'
import Colors from '../constants/Colors'
import Font from '../constants/Font'

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { FormProvider, useForm } from "react-hook-form";

// ** Components
import Input from "../components/Input";
import { Divider } from 'native-base'
import BottomSheet from '../components/bottom-sheet/BottomSheet'

// ** Hooks
import useGlobalState from '../hooks/global.state'
import { useGetProfileMeQuery, useUpdateProfileMutation } from '../stores/features/auth/authService'
import { getFirstAndLastName } from '../helpers/getFirstAndLastName'
import { Toast, ToastTitle, VStack, useToast } from '@gluestack-ui/themed'
import { Image } from 'react-native'


const defaultValues = {
  bio: '',
}

interface UserData {
  bio: string
}

const Profile = ({navigation}: {navigation: any}) => {
  const [show, setShow ] = useState(false) 

  const methods = useForm({defaultValues});
  const {watch, setValue} = methods
  const bioValue = watch('bio');
  const debouncedValue = useDebounce<string>(bioValue, 2000)
  // Get Global State
  const {user, profile} = useGlobalState()
  const { data} = useGetProfileMeQuery()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  console.log(data, "Profile me")
  const fullName = data?.user?.name || ""

  const { firstName, lastName } = getFirstAndLastName(fullName);

  //
  const toast = useToast()

  // console.log(profile, user, "SEE USER AND PROFILE")

  useEffect(() => {
    console.log("file me")
    // Check if bioValue is not null before proceeding
      const fetchData = async () => {
        const formData = {
          id: user.id,
          bio: bioValue,
        };
  
        try {
          const res = await updateProfile(formData).unwrap();
          console.log(res);
  
          toast.show({
            placement: "top",
            render: ({ id }) => (
              <Toast nativeID={id} action="success" variant="accent">
                <VStack space="xs">
                  <ToastTitle>Profile update successful!!!</ToastTitle>
                </VStack>
              </Toast>
            ),
          });
        } catch (err) {
          toast.show({
            placement: "top",
            render: ({ id }) => (
              <Toast nativeID={id} action="error" variant="accent">
                <VStack space="xs">
                  <ToastTitle>Error updating profile!!!</ToastTitle>
                </VStack>
              </Toast>
            ),
          });
        }
    }
    fetchData(); // Call the async function immediately

  }, [ debouncedValue]);
  
  
  // Populate the form fields with the profile data when it's available
  useEffect(() => {
    if (profile) {
      setValue('bio', profile.bio || ''); // Set the default value to an empty string if the property is undefined
    }
  }, [profile, setValue]);

  return (
      <Layout
        title='Profile'
        navigation={navigation}
        drawerNav
      >
        <View
          style={styles.container}
        >
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              {/*  */}
              <View className='flex-row items-center justify-between'>
                {/* image  */}
                <View className='flex-row items-center space-x-3'>
                  {/* Image */}
                  {
                    user?.imageurl ? 
                    <View className='h-12 w-12 flex items-center justify-center rounded-ful'>
                      <Image source={{ uri: `${process.env.EXPO_PUBLIC_ABA_BASE_URL_KEY}${data?.user?.imageurl}`  }} alt={user?.name}  style={{ width: 48, height: 48, borderRadius: 68 }}/>
                    </View> : 
                     <View className='h-12 w-12 flex items-center justify-center rounded-full bg-ksecondary'>
                      <Text className='text-white text-sm font-bold'>{firstName.charAt(0)}</Text>
                    </View>
                  }
                  <View className='space-y-1'>
                    <Text className='text-kblack text-sm font-normal'>{firstName} {lastName}</Text>
                    <Text className='text-kdesc text-[11px] text-medium'>{user.email || "username"}</Text>
                  </View>
                </View>

                {/* more icon */}
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                  <MaterialCommunityIcons name='account-edit-outline' size={30} color="#4E444B"/>
                </TouchableOpacity>
              </View>

              {/*  */}
              <View style={{marginVertical: 25}} className="" >
                <FormProvider {...methods}>
                  {/* Email Address set up */}
                  <Input
                    label="Bio"
                    name='bio'
                    placeholder='Write a shote bio'
                    // placeholder={profile && profile[0]?.short_bio || "What's your bio"}
                  />
                </FormProvider>
              </View>

              <View className='space-y-8'>
                {/* <TouchableOpacity
                  onPress={() => setShow(true)}
                  className='flex-row items-center space-x-5 '
                >
                  <AntDesign name="user" size={15}/>
                  <Text className='text-kblack2 text-sm font-normal '>Set your status</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity  
                  onPress={() => navigation.navigate("ProfileNotification")}
                  className='flex-row items-center space-x-5'>
                  <Ionicons name="notifications-off-outline" size={28}/>
                  <Text className='text-kblack2 text-sm font-normal '>Pause Notifications</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity 
                  className='flex-row items-center space-x-5'
                  onPress={() => navigation.navigate("CommunityInvites")}
                >
                  <AntDesign name="user" size={15}/>
                  <Text className='text-kblack2 text-sm font-normal '>Community Invites</Text>
                </TouchableOpacity> */}
                <TouchableOpacity 
                  onPress={() => navigation.navigate("ProfilePreview")}
                  className='flex-row items-center space-x-5'>
                  {/* icon */}
                  <FontAwesome name="user-o" size={26}/>
                  {/* name */}
                  <Text className='text-kblack2 text-sm font-normal '>Profile Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className='flex-row items-center space-x-5'
                  onPress={() => navigation.navigate("SavedItems")}
                >
                  {/* icon */}
                  <MaterialIcons name="save-alt" size={28}/>
                  {/* name */}
                  <Text className='text-kblack2 text-sm font-normal ' >Saved Items</Text>
                </TouchableOpacity>
               
                {/* BottomSheet component */}
              </View>
            
            </View>
            {/* BottomSheet component */}
            <BottomSheet 
              show={show}
              onDismiss={() => {
                setShow(false);
              }}
              height={0.25}
              enableBackdropDismiss
            >
              <View>
                <Text className='text-medium text-[16px] text-black '>Set Status</Text>

                <View className='mt-6'>
                  <TouchableOpacity>
                    <Text className='text-ktext font-normal text-medium ml-4 text-[16px]'>Active </Text>
                  </TouchableOpacity>
                  <Divider className='my-4' />
                  <TouchableOpacity>
                    <Text className='text-ktext font-normal ml-4  text-[16px] '>Away</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </View>
        </View>
      </Layout>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  crmCardContainer: {
    width: '100%',
    height: 66,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EAECF0',
    borderRadius: FontSize.base,
    paddingVertical: 10,
    paddingHorizontal:20,
    marginVertical: 10,
    alignItems: 'center'
  },
  divider: {
    height: "100%",
    backgroundColor: Colors.text,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginHorizontal: 18
  },
  title: {
    fontFamily: Font['inter-medium'],
    fontSize: FontSize.small,
    color: Colors.text,
  },
  description: {
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.xsmall,
    color: Colors.gray,
  },

})