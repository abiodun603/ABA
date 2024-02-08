import { StyleSheet, Text, View , FlatList} from 'react-native'
import React from 'react'

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Types
import { RootStackParamList } from "../../types";

// ** Layout
import Layout from '../../layouts/Layout';


// **  Store Slice
import { useGetMyCommunityQuery } from '../../stores/features/groups/groupsService';

// ** Components
import { GroupCard } from './components/MyGroupCard';

type Props = NativeStackScreenProps<RootStackParamList, "PersonalGroups">;


const PersonalGroups: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {data, isLoading} = useGetMyCommunityQuery();

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!data?.docs) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  console.log(data?.docs, "HMM");
  return (
    <Layout
      title = "My Community"
    >
      <View className='px-4 mt-4'>
        <FlatList
          keyExtractor={item => item?.id}
          data={data?.docs} 
          renderItem={({item}) => <GroupCard name = {item.community_name} members = {item.members} community_id={item.id} navigate={navigate} event_url={item.url}/> }
        />
      </View>
    </Layout>
  )
}

export default PersonalGroups

const styles = StyleSheet.create({})