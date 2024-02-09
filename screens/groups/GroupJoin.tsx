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
import { useCreateCommunityMutation, useGetCategoryByIdQuery, useGetCategoryQuery, useGetCommunityQuery, useJoinCommunityMutation } from '../../stores/features/groups/groupsService';
import Input from '../../components/Input';
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import { FormProvider, useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import { useGetUsersQuery } from '../../stores/features/users/UsersService';
import Toaster from '../../components/Toaster/Toaster';
type Props = NativeStackScreenProps<RootStackParamList, "GroupJoin">;

// Define the type for your route parameters
type RouteParams = {
  id: string;
  category_name: string
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

export const GridView = <T extends any>(props: IGridViewProps<T>) => {
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


const JoinCard = ({name, members, community_id, url, navigate}: any) => {
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
      <TouchableOpacity className=' mt-4 flex-row items-center space-x-2' onPress={()=>navigate("Group", { communityId: community_id })}>
        <View className='h-[80px] w-[80px]  bg-slate-400 rounded-lg  justify-center items-center'>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ borderRadius: 10}}
          style={{ flex: 1, width: '100%' }}
          source = {{uri: url}}
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
  const { id, category_name} = route.params as unknown  as RouteParams;
  const [show, setShow ] = useState(false) 
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])

  const methods = useForm({});

  const {isLoading, data} = useGetCategoryByIdQuery(id)
  const {data: getAllUsers} = useGetUsersQuery()
  const [createCommunity, {isLoading: createCommunityLoading}] = useCreateCommunityMutation()
  const {data:getAllCategory } = useGetCategoryQuery()

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
  console.log(data, "MyCategories")

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
      members: selectedMembers,
      community_category: id
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
  console.log(firstTwoCommunity)
  
  return (
    <Layout
      title = {show ? "Create new Community" : `${category_name.charAt(0).toUpperCase()}${category_name.slice(1)}`}
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
                  renderItem={({item}) => <JoinCard name = {item.community_name} members = {item.members} community_id={item.id} navigate={navigate} url={item.url} /> }
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
              <JoinCard name = {item.community_name} members = {item.members} community_id={item.id} navigate={navigate} url={item.url} /> )}
            />
          ): null}
        </View>
        
        <View className='px-4 mt-4 mb-28'>
          <View className="flex-row items-center justify-between mb-1 ">
            {/*  */}
            <Text className='text-black text-sm font-bold mt-3'>More to explore</Text>
          </View>
          <View>
            {
              !getAllCategory?.docs ? (
                <Text>No data available.</Text>
              ) : (
                <GridView 
                data={getAllCategory?.docs.slice(0, 3)} 
                renderItem={(item: any) => (
                  <TouchableOpacity className='mx-2 mt-4' onPress={() => navigate("GroupJoin", {id: item.id, category_name: item.category_name})}>
                    <View className='h-[150px] bg-slate-400 rounded-lg  justify-center items-center'>
                      <ImageBackground
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10}}
                        style={{ flex: 1, width: '100%' }}
                        source = {{uri: item.url}}
                      />
                    </View>
                    <Text className='text-black text-xs font-semibold mt-1 capitalize'>{item?.category_name}</Text>
                  </TouchableOpacity>
                
                )}
              />
              )
            }
          </View>
          {/* <Text className=''>No Photo yet !!!</Text> */}
        </View>
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