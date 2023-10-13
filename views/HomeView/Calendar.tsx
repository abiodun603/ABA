import { View, Text,StyleSheet } from 'react-native'
import React, { FC } from 'react'

// 
import Layout from '../../layouts/Layout'
import TopNavPanel from '../../navigation/TopTabs';


// ** Types
import { RootStackParamList } from "../../types";

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Going from './Going';
import Saved from './Saved';
import Past from './Past';
import All from './All';

const TabData = [
  { name: "All", component: All },
  { name: "Going", component:   Going },
  { name: " Saved", component: Saved },
  { name: "Past", component: Past },
];

const Calendar = () => {
  return (

      <View style={{ flex: 1 }} className='px-4'>
        <TopNavPanel tabs={TabData} /> 
      </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15
  }
})