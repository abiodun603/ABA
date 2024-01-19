import React, { FC } from 'react'

// ** Types
import { RootStackParamList } from "../../types";

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Calendar from '../../views/HomeView/Calendar';
type Props = NativeStackScreenProps<RootStackParamList, "Identification">;

const Identification: FC<Props> = () => {
  return (
   <Calendar />
  )
}

export default Identification
