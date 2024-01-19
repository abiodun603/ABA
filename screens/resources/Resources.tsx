import { StyleSheet, View } from 'react-native'
import React from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";

// ** Layout
import Layout from '../../layouts/Layout';

// ** Components

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FileResources from './components/FileResources';
import ImageResources from './components/ImageResources';
import TopNavPanel from '../../navigation/TopTabs';
type Props = NativeStackScreenProps<RootStackParamList, "Resources">;


const TabData = [
  { name: "Image", component: ImageResources },
  { name: "File", component: FileResources },
];

// Define the type for your route parameters
type RouteParams = {
  communityId: string; // Replace 'string' with the correct type for communityId
};


const Resources: React.FC<Props> = ({ navigation: { navigate }, route }) => {

  const { communityId } = route.params as unknown  as RouteParams;

  return (
    <Layout
      title = "Resources"
      iconName="plus"
      // extraOneIcon="bookmark-outline"
    >
    <View style={styles.container}>
      {/* search button */}
      {/* <View style={styles.inputContainer}>
        <TextInput
          placeholder='Search Resources'
          placeholderTextColor="#4E444B" 
          style={{color: '#4E444B', width: '90%'}}
        /> 
        <Ionicons
          style = {{ fontSize: FontSize.large, color: '#4E444B'}}
          name = "search"
        />
      </View>   */}
      <View className='mt-6' />
      {/* Events */}
      <TopNavPanel tabs={TabData} communityId={communityId} /> 
    </View>
  </Layout>
  )
}

export default Resources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  inputContainer:{
    height: 56,
    backgroundColor: '#EFE6E9',
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 28,
  },
  cardContainer: {
    width: "100%",
    height: 63,
    flexDirection: "row",
    borderRadius: FontSize.base,
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 8
  },
  circleImage: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: FontSize.medium,
    backgroundColor: Colors.secondary
  },
  title: {
    color: Colors.text,
    fontFamily: Font['inter-medium'],
    fontSize: FontSize.small
  },
  description: {
    color: Colors.gray,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.xsmall,
    lineHeight: 22
  },
})