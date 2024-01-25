import { Linking, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

// ** Icons
import { Feather } from '@expo/vector-icons'; 
import { useGetCommunityFileQuery } from '../../../stores/features/groups/groupsService';

interface ImageResourcesProps {
  route: any; // Adjust 'YourTabParamList' based on your route param structure
  // ... other props specific to ImageResources
}

export const FileCard = ({url}:{url: string}) => {
  // Extract file name from the uri
  const uriComponents = url.split('/');
  let fileName = uriComponents[uriComponents.length - 1];

  // Decode URL-encoded characters
  fileName = decodeURIComponent(fileName);

  const handleDownload = async () => {
    console.log("click me ")
    try {
      // Open the file in the device's default application
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity className='h-20 z-50 w-full border-[2px] border-gray-400 rounded-md mt-5 flex flex-row items-center justify-start pl-6' onPress={handleDownload}>
        <Feather name="file" size={34} color="#A3229A" />
        <Text className='text-gray-700 text-lg font-semibold pl-2'>{fileName}</Text>
      </TouchableOpacity>
    </View>
  )
}

const FileResources: React.FC<ImageResourcesProps>  = ({ route, ...otherProps }) => {
  const { communityId: community_id } = route.params;
  const media_type = "application"
  console.log("Media type: " + community_id)
  const {data, isLoading} = useGetCommunityFileQuery({community_id, media_type})

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  console.log(data)
  return (
    <View>
       <FlatList
          data={data?.docs}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: { id: { toString: () => any; }; createdAt: string; url: string}) => item.id.toString()}
          renderItem={
            ({item}) => 
              <FileCard url = {item.url}  /> 
          }
        />
    </View>
  )
}

export default FileResources

const styles = StyleSheet.create({})