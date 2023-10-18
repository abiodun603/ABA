import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// ** Types
import { RootStackParamList } from "../../types";


// ** Layout
import Layout from '../../layouts/Layout';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "About">;




const About: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <Layout
      title = "About ABA"
    >
      <View style={styles.container}>
        {/* search button */}
        <Text className='text-black text-sm font-normal text-justify'>
          The Autism Community App is a mobile application designed to connect and support educators, parents, caregivers, and advocates of autistic individuals. The app aims to create a vibrant community that fosters meaningful relationships, empowers education and shares resources to help those who care for individuals with Autism Spectrum Disorder (ASD).
        </Text>
      </View>
    </Layout>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  }
})