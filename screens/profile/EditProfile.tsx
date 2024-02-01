import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";
import { FormProvider, useForm } from "react-hook-form";

// ** Third Party
import { Divider } from 'native-base';
import { Toast, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

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
import { useUpdateProfileImageMutation, useUpdateProfileMutation} from '../../stores/features/auth/authService';
import { Image } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

const defaultValues = {
  name: '',
}




const EditProfile: React.FC<Props> = ({ navigation: { navigate } }) => {

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [updateProfileImage, { isLoading: isLoadingProfileImage }] = useUpdateProfileImageMutation();

  // **** 
  const {profile, user} = useGlobalState()


  const [image, setImage] = useState<string | undefined>(`${process.env.EXPO_PUBLIC_ABA_BASE_URL_KEY}${user.imageurl}`)

  const methods= useForm({defaultValues});
  const {setValue} = methods

  //
  const toast = useToast()
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

  const pickImage = async () => {
    try {
      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Crop and set the selected image
        const croppedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ crop: { originX: 0, originY: 0, width: result.assets[0].width, height: result.assets[0].height } }],
          { compress: 1, format: SaveFormat.PNG, base64: false }
        );

        setImage(croppedImage.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const updatePofileImage = async () => {
    console.log
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: "image/png",
        name: "profile_image.png"
      });
      const res = await updateProfileImage(formData).unwrap();
      console.log(res);
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="success" variant="accent">
            <VStack space="xs">
              <ToastTitle>Image update successful!!!</ToastTitle>
            </VStack>
          </Toast>
        ),
      });
    } catch (err: any) {  
        console.log(err)
        toast.show({
          placement: "top",
          render: ({ id }) => (
            <Toast nativeID={id} action="error" variant="accent">
              <VStack space="xs">
                <ToastTitle>Error updating profile image!!!</ToastTitle>
              </VStack>
            </Toast>
          ),
        });
    }
  };
  
  

  // Populate the form fields with the profile data when it's available
  useEffect(() => {
    if (user) {
      setValue('name', user.name || ''); // Set the default value to an empty string if the property is undefined
    }
  }, [user, setValue]);

  useEffect(() => {
    // Request permission to access the user's media library
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
      }
    })();
  }, []);

  return (
    <Layout
      title = "Profile Preview"
  >
    <View style={styles.container}>
      <FormProvider {...methods}>

        <View className='flex flex-col items-center  mt-10'>
          {/* Image */}
          <TouchableOpacity onPress={pickImage}>
            <View className='h-[136px] w-[136px] rounded-full bg-ksecondary'>
              {image ? (
                <Image source={{ uri: image  }} style={{ width: 136, height: 136, borderRadius: 68 }} />
              ) : (<Text className="text-2xl">{user.firstname.charAt(0)}</Text>) }
            </View>
          </TouchableOpacity>
          <CustomButton
            title='Edit Photo'
            buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1, marginTop: 15, width: 136}}
            titleColor= {Colors.gray}
            onPress={updatePofileImage}
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