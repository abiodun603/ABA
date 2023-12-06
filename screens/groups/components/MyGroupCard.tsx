import { useEffect, useState } from "react";
import { Alert, View, ScrollView, TouchableOpacity , Text, ImageBackground} from "react-native";

// ** Thirld Party
import { useToast } from '@gluestack-ui/themed';
import {  useForm } from 'react-hook-form'
import { FormProvider } from 'react-hook-form';

// ** Utils
import { ShortenedWord } from '../../../helpers/wordShorther';

// **  Store Slice
import { useDeleteCommunityMutation, useGetMyCommunityQuery, useGetOneCommunityQuery, useUpdateMyCommunityMutation } from '../../../stores/features/groups/groupsService';

// ** Icons
import { Ionicons, Feather } from '@expo/vector-icons'; 

// ** Components
import Toaster from '../../../components/Toaster/Toaster';
import BottomSheet from "../../../components/bottom-sheet/BottomSheet";
import Input from "../../../components/Input";
import CustomButton from "../../../components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";

const defaultValues = {
  community_name: '',
  community_description: '',
}

const status = [
  {key:'1', value:'Select status', disabled:true},
  {key:'private', value:'Private'},
  {key:'public', value:'Public'},
]

export const GroupCard = ({name, members, community_id, navigate}: any) => {
  const [show, setShow ] = useState(false) 
  const [selectedStatus, setSelectedStatus] = useState("");

  const [deleteCommunity, { isLoading: isJoining }, ] = useDeleteCommunityMutation()
  const [updateMyCommunity, {isLoading: isUpdatingLoading}] = useUpdateMyCommunityMutation();
  const {  data: CommunityDetails } = useGetOneCommunityQuery(community_id);
  console.log(CommunityDetails)

  const methods = useForm({defaultValues});
  const {setValue} = methods
  const toast = useToast()

  const handleJoinPress = async (community_id: any) => {
    console.log(community_id)
    Alert.alert(
      'Delete Group',
      'This action is irreversible!!!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteCommunity(community_id)
            .unwrap()
            .then((data) => {
              console.log('res:', data);
            })
            .catch((error) => {
              toast.show({
                placement: 'top',
                render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
              })
              console.error(error);
            });
          },
        },
      ],
    ); 
  };

  // Fucnc
  const handleUpdateGroup =  async(data: any) => {
    const formData = {
      id: community_id,
      ...data
    }
    // console.log(formData, date1);
    updateMyCommunity(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      console.log('Event updated:', data);
      methods.reset()
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Event updated!!!" />
      })
      setShow(false)

    })
    .catch((error) => {
      // Handle error
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
      })
      setShow(false)

      console.error(error);
    });
  }

    // Populate the form fields with the profile data when it's available
    // useEffect(() => {
    //   if (CommunityDetails) {
    //     setValue('community_name',  CommunityDetails?.community_name ||'');
    //     setValue('community_description',  CommunityDetails?.community_description ||'');
    //   }
    // }, [CommunityDetails, setValue]);

  return (
    <View className = "flex-row items-center justify-between ">
      <TouchableOpacity className=' mt-4 flex-row items-center space-x-2'  onPress={()=>navigate("Group", { communityId: community_id })}>
        <View className='h-[80px] w-[80px]  bg-slate-400 rounded-lg  justify-center items-center'>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ borderRadius: 10}}
          style={{ flex: 1, width: '100%' }}
          source = {{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvVRjzi266UV2c8204Wa2FDqwwxkXFDU4Ybw&usqp=CAU'}}
        />
        </View>
        <View className=' flex-wrap space-y-2'>
          <Text className='text-black text-sm font-semibold mt-1' numberOfLines={2} ellipsizeMode="tail"><ShortenedWord word={name} maxLength={30} /></Text>
          <View className=''>
            <Text className='text-gray-400 text-xs font-semibold mt-1'>Lagos</Text>
            <Text className='text-gray-400 text-xs font-semibold mt-1'>{members?.length || 0} Members</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/*  */}
      <View className="flex-row space-x-2">
        <TouchableOpacity className='w-fit  py-1 rounded-lg' onPress={()=> setShow(true)}>
          <Feather name='edit' size={22} />
        </TouchableOpacity>
        <TouchableOpacity className='w-fit  py-1 rounded-lg' onPress={() => handleJoinPress(community_id)}>
           <Ionicons name='trash-bin-outline' size={22} />
        </TouchableOpacity>
      </View>
      {/* BottomSheet component */}
      <BottomSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        height={0.4}
        enableBackdropDismiss
      >
        <FormProvider {...methods}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Text className='font-medium text-2xl text-black '>Create a new events</Text> */}
            <View className='mt-4'>
              <Input
                name='community_name'
                label="Community name"
                placeholder="Enter event name"
              />
              <Input
                name='community_description'
                label="Community description"
                placeholder="Enter community description"
              />
              <View className='flex flex-col mb-5'>
                <SelectList
                  setSelected={(val: React.SetStateAction<string>) => setSelectedStatus(val)} 
                  data={status} 
                  save="value"
                  boxStyles={{borderRadius:4, borderColor: "#80747B", height:56, paddingLeft: 10}}
                  search={false} 
                  placeholder='Select community status'
                  
                />
              </View>
              <View className='mb-20'>
                <CustomButton
                title="Update" 
                isLoading={isUpdatingLoading}
                onPress={methods.handleSubmit(handleUpdateGroup)}              
                />
              </View>
            </View>
          </ScrollView>
          
        </FormProvider>
      </BottomSheet>
    </View>
  )
}