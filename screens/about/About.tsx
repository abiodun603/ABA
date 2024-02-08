import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Types
import { RootStackParamList } from "../../types";

// ** Third Pary
import { FormProvider, useForm } from 'react-hook-form'
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

// ** Layout
import Layout from '../../layouts/Layout';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useGetUsersQuery } from '../../stores/features/users/UsersService';
import CustomButton from '../../components/CustomButton';
import Toaster from '../../components/Toaster/Toaster';
import { useToast } from '@gluestack-ui/themed';
import { useUpdateProfileMutation } from '../../stores/features/auth/authService';
type Props = NativeStackScreenProps<RootStackParamList, "About">;


const defaultValues = {}


const About: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>("");

  const {data: getAllUsers} = useGetUsersQuery()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();


  const methods = useForm({defaultValues});
  const toast = useToast()

  const handleMakeAdmin = async (data: any) => {
      // Handle login logic here
      try {
        await updateProfile(selectedUser).unwrap().then((res) => console.log(res));
        toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="success" message="Selected user is now an Admin" />
        });
      } catch (err: any) {
        toast.show({
          placement: 'top',
          render: ({ id }) => <Toaster id={id} type="error" message="Error Updating Admin"/>
        })
      }
  }

  // Update arrays when data changes
  useEffect(() => {
    if (getAllUsers && getAllUsers.docs) {
      const newArray = getAllUsers.docs.map((item: { id: string; name: string }) => ({
        key: item.id,
        value: item.name,
        disabled: false,
      }));
      setMembers(newArray);
    }
  }, [getAllUsers]);

  return (
    <Layout
      title = "About ABA"
    >
      <View style={styles.container}>
        {/* search button */}
        <Text className='text-black text-sm font-normal text-justify'>
          The Autism Community App is a mobile application designed to connect and support educators, parents, caregivers, and advocates of autistic individuals. The app aims to create a vibrant community that fosters meaningful relationships, empowers education and shares resources to help those who care for individuals with Autism Spectrum Disorder (ASD).
        </Text>


        <FormProvider {...methods}>
          <View className='flex flex-col mb-5'>
              {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
              <SelectList 
                setSelected={(val: React.SetStateAction<any[]>) => setSelectedUser(val)} 
                data={members} 
                save="key"
                boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                search={true} 
                placeholder='Select User'
              />

          </View>
          <View className='mb-20'>
            <CustomButton
              title="Submit" 
              // isLoading={createEventLoading}
              onPress={methods.handleSubmit(handleMakeAdmin)}              
            />
          </View>
        </FormProvider>
      </View>
    </Layout>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  }
})