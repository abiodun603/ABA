import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";
import { FormProvider, useForm } from "react-hook-form";

// ** Third Party
import { styled } from 'nativewind';
import { Divider } from 'native-base';
import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";

// ** Layout
import Layout from '../../layouts/Layout';

// ** Hooks
import useGlobalState from '../../hooks/global.state';

// ** Components
import CustomButton from '../../components/CustomButton';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Input from '../../components/Input';

// ** Types
import { useUpdateProfileMutation, type ProfileRequest } from '../../stores/features/auth/authService';

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;
const StyledView = styled(View)

const defaultValues = {
  name: '',
}




const EditProfile: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const {profile, user} = useGlobalState()

  const methods= useForm({defaultValues});
  const {setValue} = methods

  //
  const toast = useToast()


  console.log(profile, user)


  const handleUpdate = async(data: any) =>{
    // Handle login logic here
    const formData = {
      id: user.id,
      name: data.name,
    }
    console.log(formData)

    try {
      await updateProfile(formData).unwrap().then((res) => console.log(res));
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Profile update successful!!!</ToastTitle>
              </VStack>
            </Toast>
          )
        },
      })
    } catch (err: any) {
      console.log(err)
      if(err.status === 401){
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="accent">
                <VStack space="xs">
                  <ToastTitle>Error updating profile!!!</ToastTitle>
                </VStack>
              </Toast>
            )
          },
        })
      }
    }
  }

  

  // Populate the form fields with the profile data when it's available
  useEffect(() => {
    if (user) {
      // Set the default values of the form fields using setValue
      setValue('name', user.name || ''); // Set the default value to an empty string if the property is undefined
      // setValue('username', user.username || '');
      // setValue('email', user?.email || '');
      // setValue('phone', 'No phone number');
    }
  }, [user, setValue]);

  return (
    <Layout
      title = "Profile Preview"
  >
    <View style={styles.container}>
      <FormProvider {...methods}>

        <View className='flex flex-col items-center  mt-10'>
          {/* Image */}
          <View className='h-[136px] w-[136px] rounded-2xl bg-slate-800'>

          </View>
          <CustomButton
            title='Edit Photo'
            buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1, marginTop: 15, width: 136}}
            titleColor= {Colors.gray}
            onPress={() => navigate('EditProfile')}
          />
        </View>
        <View className='flex flex-col '>
          <Divider className='my-8'/>
          <Input
            name='name'
            label="Full Name"
            placeholder=""
          />
          {/* <Input
            name='username'
            label="Display Name"
            placeholder="Advocate001"
          />
          <Divider className='mb-6 mt-1 bg-[#D2C2CB]'/>
          <Input
            name='email'
            label="Email address"
            placeholder="timothyhilda@gmail.com"
          />
          <Input
            name='phone'
            label="Phone"
            placeholder="+23490897656"
          /> */}
        </View>
        <CustomButton 
          title="Update" 
          isLoading={isLoading}
          onPress={methods.handleSubmit(handleUpdate)}              
        />
      </FormProvider>
    </View>
  </Layout>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  time: {
    fontSize: FontSize.small,
    fontFamily: Font['inter-regular'],
    color: Colors.gray,
    marginTop: 25
  },

})