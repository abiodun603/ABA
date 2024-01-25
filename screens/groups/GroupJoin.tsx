import { StyleSheet, Text, View , TouchableOpacity, Dimensions, ImageBackground, FlatList, ScrollView, TouchableWithoutFeedback} from 'react-native'
import React, { useMemo, useState } from 'react'

// ** Layout
import Layout from '../../layouts/Layout';

// ** Third Pary
import { Divider } from 'native-base';
import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";

// ** Icons
import { MaterialIcons} from "@expo/vector-icons"

// ** Helpers
import { ShortenedWord } from '../../helpers/wordShorther';

// ** Components
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { GroupCatergory } from '../../utils/dummy';
import { useCreateCommunityMutation, useGetCategoryByIdQuery, useGetCommunityQuery, useJoinCommunityMutation } from '../../stores/features/groups/groupsService';
import Input from '../../components/Input';
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import { FormProvider, useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import { useGetUsersQuery } from '../../stores/features/users/UsersService';
import Toaster from '../../components/Toaster/Toaster';
type Props = NativeStackScreenProps<RootStackParamList, "GroupJoin">;

// Define the type for your route parameters
type RouteParams = {
  id: any;
};
const screenWidth = Dimensions.get("window").width


const status = [
  {key:'1', value:'Select status', disabled:true},
  {key:'private', value:'Private'},
  {key:'public', value:'Public'},
]

const members = [
  {key:'1', value:'Select members', disabled:true},
]
interface IGridViewProps<T> {
  data: T[];
  renderItem(iem: T): JSX.Element;
  col?:number;
}

const GridView = <T extends any>(props: IGridViewProps<T>) => {
  const {data, renderItem, col = 2} = props;
  return (
    <View className='w-full flex-row flex-wrap'>
      {
        data.map((item, index) => {
          return (
            <View style = {{width: 100 / col + '%'}} key={index.toString()}>
              {renderItem(item)}
            </View>
          )
        })
      }
    </View>
  )
}


const JoinCard = ({name, members, community_id, navigate}: any) => {
  const [joinCommunity, { isLoading: isJoining }, ] = useJoinCommunityMutation()
  const toast = useToast()

  const handleJoinPress = async (community_id: any) => {
    console.log(community_id)
    try {
      console.log(community_id)
      const id = {
        community_id: community_id
      }
      // Make the API call to join the community
      const response: any = await joinCommunity(id);
      if (response) {
        console.log(response)
        // if(response?.data.status){
        //   navigate("GroupConfirmation")
        // }
       
        if(response?.error?.status === 500){
          toast.show({
            placement: "top",
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="error" variant="accent">
                  <VStack space="xs">
                    <ToastTitle>New Message</ToastTitle>
                    <ToastDescription>
                      {response?.error?.data.error}
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
          return;
          // navigate.("Group")
        }
        return;
      } else {
        // Handle any other specific cases, if needed
      }
    } catch (err: any) {
      // Handle errors, e.g., show an error message, log the error, etc.
      console.log('Error joining community:', err);
      if(err){
        // if(err?.error?.status === 500){
          toast.show({
            placement: "top",
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="error" variant="accent">
                  <VStack space="xs">
                    <ToastTitle>New Message</ToastTitle>
                    <ToastDescription>
                      You already join this community
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        // }
      }
    }
  };
  return (
    <View className = "flex-row items-center justify-between ">
      <TouchableOpacity className=' mt-4 flex-row items-center space-x-2'>
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
      <TouchableOpacity className='w-fit bg-blue-500 px-3 py-1 rounded-lg' onPress={() => handleJoinPress(community_id)}>
        <Text className='text-white'>Join</Text>
      </TouchableOpacity>
    </View>
  )
}


const GroupJoin: React.FC<Props> = ({ navigation: { navigate } , route}) => {
  const { id} = route.params as unknown  as RouteParams;
  const [show, setShow ] = useState(false) 
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])

  const methods = useForm({});

  const {isLoading, data} = useGetCategoryByIdQuery(id)
  const {data: getAllUsers} = useGetUsersQuery()
  const [createCommunity, {isLoading: createCommunityLoading}] = useCreateCommunityMutation()

  const toast = useToast()

  // Function
  const newArray = useMemo(() => {
    return (getAllUsers?.docs || []).map(
      (item: { id: string; name: string }) => ({
        key: item.id,
        value: item.name,
        disabled: false,
      })
    );
  }, [getAllUsers?.docs]);

  // Combine arrays using spread operator
  members.push(...newArray);    
  console.log(data)

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!data?.docs) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  const firstTwoCommunity = data?.docs?.slice(0, 2);
  const remainingCommunity = data?.docs?.slice(2);

  const handleCreateCommunity = (data: any) => {
    const formData = {
      community_name: data.community_name,
      community_description: data.community_description,
      status: selectedStatus.toLowerCase(),
      members: selectedMembers
    }

    createCommunity(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      console.log('res:', data);
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Thank you!!!. Community Created" />
      })
      setShow(false)
      methods.reset();

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
  
  return (
    <Layout
      title = {show ? "Create new Community" : "Community Join"}
      iconName={!show && "plus"}
      onPress={()=> setShow(true)}
    >
      <View style = {styles.container} className=' mt-4'>
        <View className='px-4'>
          <View className="flex-row items-center justify-between mb-1 ">
            {/*  */}
            <Text className='text-black text-sm font-bold mt-3'>Browse by categories</Text>
          </View>
          <View className=''>
            {
              firstTwoCommunity.length > 0 ? (
                <FlatList
                  keyExtractor={item => item?.id}
                  data={firstTwoCommunity || []} 
                  renderItem={({item}) => <JoinCard name = {item.community_name} members = {item.members} community_id={item.id} navigate={navigate}/> }
                /> ): (
                  <Text className='text-ksecondary text-sm'>This category do not have community yet !!!</Text>
                )
            }
          </View>
        </View>
          
        {/* Divider */}
        <Divider mt={8} thickness={1}/>
          <View className='flex-row justify-between items-center my-4  px-4'>
            <View className='flex-row  space-x-3'>
              {/* icon calander */}
              <MaterialIcons name="location-searching" size={28} className="" />
              <TouchableWithoutFeedback onPress={() => setShow(true)} className='mr-2'>
                <View>
                  {/* day / month / year */}
                  <Text className='text-sm text-gray-800 font-bold'>Start a new community</Text>
                  {/* time */}
                  <Text className='text-xs text-gray-700 font-medium'>Organise your own events</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* icon */}
            <MaterialIcons name = "keyboard-arrow-right"  size={18}/>
          </View>
        <Divider thickness={8}/>
        <View className='px-4'>
          {remainingCommunity.length > 0 ? (
            <FlatList
              keyExtractor={item => item?.id}
              data={remainingCommunity}
              renderItem={({ item }) => (
              <JoinCard name = {item.community_name} members = {item.members} community_id={item.id} navigate={navigate}/> )}
            />
          ): null}
        </View>
        
        <View className='px-4 mt-4 mb-28'>
          <View className="flex-row items-center justify-between mb-1 ">
            {/*  */}
            <Text className='text-black text-sm font-bold mt-3'>More to explore</Text>
          </View>
          <View>
            <GridView 
              data={GroupCatergory} 
              renderItem={(item) => (
                
                <TouchableOpacity className='mx-2 mt-4' onPress={() => navigate("GroupCat")}>
                  <View className='h-[150px] bg-slate-400 rounded-lg  justify-center items-center'>
                    <ImageBackground
                      resizeMode="cover"
                      imageStyle={{ borderRadius: 10}}
                      style={{ flex: 1, width: '100%' }}
                      source={{uri: 'data:image/jpeg;base64,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'}}
                    />
                  </View>
                  <Text className='text-black text-xs font-semibold mt-1'>{item}</Text>
                </TouchableOpacity>
              
              )}
            />
          </View>
          {/* <Text className=''>No Photo yet !!!</Text> */}
        </View>
          {/* <Text className=''>No Photo yet !!!</Text> */}

         {/* BottomSheet component */}
         <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          height={0.9}

          enableBackdropDismiss
        >
          <FormProvider {...methods}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <Text className='font-medium text-2xl text-black '>Create a new events</Text> */}
              <View className='mt-4'>
                <Input
                  name='community_name'
                  label="Community name"
                  placeholder="Enter community name"
                />
                <Input
                  name='community_description'
                  label="Community description"
                  placeholder="Enter community description"
                />
                <View className='flex flex-col mb-5'>
                  {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
                  <MultipleSelectList 
                    setSelected={(val: React.SetStateAction<any[]>) => setSelectedMembers(val)} 
                    data={members} 
                    save="key"
                    boxStyles={{borderRadius:4, borderColor: "#80747B", paddingLeft: 10}}
                    search={true} 

                    placeholder='Select community members'
                  />
                </View>
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
                  title="Submit" 
                  isLoading={createCommunityLoading}
                  onPress={methods.handleSubmit(handleCreateCommunity)}              
                  />
                </View>
              </View>
            </ScrollView>
          </FormProvider>
        </BottomSheet>
      </View>
    </Layout>
  )
}

export default GroupJoin

const styles = StyleSheet.create({
  container: {
    screenWidth,
    flex: 1
  }
})