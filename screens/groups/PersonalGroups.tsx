import { StyleSheet, Text, TouchableOpacity, View , ImageBackground, FlatList, Alert} from 'react-native'
import React from 'react'

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Types
import { RootStackParamList } from "../../types";

// ** Layout
import Layout from '../../layouts/Layout';

// ** Thirld Party
import { useToast } from '@gluestack-ui/themed';

// ** Utils
import { ShortenedWord } from '../../helpers/wordShorther';

// **  Store Slice
import { useDeleteCommunityMutation, useGetMyCommunityQuery } from '../../stores/features/groups/groupsService';
import Toaster from '../../components/Toaster/Toaster';

type Props = NativeStackScreenProps<RootStackParamList, "PersonalGroups">;

const GroupCard = ({name, members, community_id, navigate}: any) => {
  const [deleteCommunity, { isLoading: isJoining }, ] = useDeleteCommunityMutation()
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
      // { cancelable: false }
    ); 
    // try {
    //   console.log(community_id)
    //   const id = {
    //     community_id: community_id
    //   }
    //   const response: any = await joinCommunity(id);
    //   if (response) {
    //     console.log(response)
    //     if(response?.error?.status === 500){
    //       toast.show({
    //         placement: "top",
    //         render: ({ id }) => <Toaster id={id} type="error" message={response?.error?.data.error} />
    //       })
    //       return;
    //     }
    //     return;
    //   }
    // } catch (err: any) {
    //   console.log('Error joining community:', err);
    //   if(err){
    //       toast.show({
    //         placement: "top",
    //         render: ({ id }) => <Toaster id={id} type="error" message="You already join this community"/>
    //       })
    //   }
    // }
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
      <TouchableOpacity className='w-fit bg-red-700 px-3 py-1 rounded-lg' onPress={() => handleJoinPress(community_id)}>
        <Text className='text-white'>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}


const PersonalGroups: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {data, isLoading} = useGetMyCommunityQuery();

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!data?.docs) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  console.log(data?.docs);
  return (
    <Layout
      title = "My Community"
    >
      <View className='px-4 mt-4'>
        <FlatList
          keyExtractor={item => item?.id}
          data={data?.docs} 
          renderItem={({item}) => <GroupCard name = {item.community_name} members = {item.members} community_id={item.id} navigate={navigate}/> }
        />
      </View>
    </Layout>
  )
}

export default PersonalGroups

const styles = StyleSheet.create({})