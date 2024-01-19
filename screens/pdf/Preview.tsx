import { StyleSheet, View } from 'react-native'
import React from 'react'

// ** Types
import { RootStackParamList } from "../../types";

// ** Layout
import Layout from '../../layouts/Layout';



//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "PdfPreview">;


const Preview: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout
      title = "Advantage.pdf"
      iconName="tray-arrow-up"
      extraOneIcon="bookmark-outline"
    >
    <View style={styles.container}>

    </View>
  </Layout>
  )
}

export default Preview

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  }
})