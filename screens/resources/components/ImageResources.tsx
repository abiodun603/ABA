import { View, Text, Image, FlatList, Linking, TouchableOpacity } from 'react-native'
import React from 'react'

// ** Store / Slices
import { useGetCommunityImagesQuery } from '../../../stores/features/groups/groupsService'
import { RouteProp } from '@react-navigation/native';
import { formatTimestampToTime } from '../../../helpers/timeConverter';

interface ImageResourcesProps {
  route: any; // Adjust 'YourTabParamList' based on your route param structure
  // ... other props specific to ImageResources
}

const ImageCard = ({time, url}: any) => {


  const handleDownload = async () => {
    try {
      // Open the image in the device's default image viewer or prompt user to choose an app
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening image:', error);
    }
  };
  return(
    <TouchableOpacity onPress={handleDownload}>
      <Text className='mt-5 text-sm text-gray-700'>{formatTimestampToTime(time)}</Text>
      <View className='mt-3 rounded-md'>
        {/* Image */}
        <Image
          source={{uri: url}}
          resizeMode="cover"
          style={{height: 300, width: 200, borderRadius: 4}}
        />
      </View>
    </TouchableOpacity>
  )
}

const ImageResources: React.FC<ImageResourcesProps>  = ({ route, ...otherProps }) => {
  const { communityId: community_id } = route.params;

  const media_type = "image"
  console.log("Media type: " + community_id)
  const {data, isLoading} = useGetCommunityImagesQuery({community_id, media_type})

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  return (
    <View>
      <FlatList
        data={data?.docs}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: { id: { toString: () => any; }; createdAt: string; url: string}) => item.id.toString()}
        renderItem={
          ({item}) => 
            <ImageCard time = {item.createdAt} url = {item.url} /> 
        }
      />
      {/* <ImageCard/> */}
    </View>
  )
}

export default ImageResources