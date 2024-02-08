import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";

// ** Third Party
import {  Divider } from 'native-base';

// ** Layout
import Layout from '../../layouts/Layout';

// ** Components
import CustomButton from '../../components/CustomButton';

// ** Hooks
import useGlobalState from '../../hooks/global.state';

import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "ProfilePreview">;


const ProfilePreview: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { user} = useGlobalState()
  return (
    <Layout
      title = "Profile Preview"
    >
    <View style={styles.container}>
      {/* Image */}
      {/* <View className='h-[348px] w-full rounded-2xl bg-slate-800'>

      </View> */}
      {/* name */}
      <Text className='text-kblack font-normal text-[22px] mt-3'>{user?.name || ""}</Text>
      <Divider className='mt-2'/>

      {/* username */}
      <View className='mt-6 space-y-1'>
        {/* <Text className='text-kdesc text-[11px] text-medium'>@{profile && profile[0].username}</Text> */}
        <Text className='text-kblack text-sm font-normal'>{user && user.email}</Text>
        <Text className='text-kgreen text-[11px] font-normal'>Active</Text>
      </View>
      <Divider className='mt-5'/>

      {/* button */}
      <View className='mt-6'>
        <CustomButton
          title='Edit Profile'
          buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1, marginBottom: 20}}
          titleColor= {Colors.gray}
          onPress={() => navigate('EditProfile')}
        />

        {/* <CustomButton
          title='Set your Status'
          buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1}}
          titleColor= {Colors.gray}
        /> */}
      </View>
    </View>
  </Layout>
  )
}

export default ProfilePreview

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  time: {
    fontSize: FontSize.small,
    fontFamily: Font['inter-regular'],
    color: Colors.gray,
    marginTop: 25
  },

})