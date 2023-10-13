import { View, Text,StyleSheet } from 'react-native'
import React, { FC } from 'react'

// 
import Layout from '../../layouts/Layout'
import TopNavPanel from '../../navigation/TopTabs';


// ** Types
import { RootStackParamList } from "../../types";

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Personal from '../identification/Personal';
import Role from '../identification/Role';
import All from '../../views/HomeView/All';
import Saved from '../../views/HomeView/Saved';
import Calendar from '../../views/HomeView/Calendar';
type Props = NativeStackScreenProps<RootStackParamList, "Identification">;

const TabData = [
  { name: "Personal Info", component: All },
  { name: "Role & Verification", component: Saved },
  { name: " Info", component: All },
  { name: "Verification", component: Saved },
];

const Identification: FC<Props> = () => {
  return (
   <Calendar />
  )
}

export default Identification

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