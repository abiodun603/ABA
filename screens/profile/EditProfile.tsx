import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";
import { FormProvider, useForm } from "react-hook-form";

// ** Third Party
import { styled } from 'nativewind';
import { Divider } from 'native-base';

// ** Layout
import Layout from '../../layouts/Layout';

// ** Components
import CustomButton from '../../components/CustomButton';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Input from '../../components/Input';
type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;
const StyledView = styled(View)

const defaultValues = {
  fname: '',
  dname: '',
  email: ''
}

interface UserData {
  fname: string
  dname: string
  email: string
}


const EditProfile: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});

  const handleSubmit = (data: UserData) => {
    // Handle login logic here
    console.log(data);
  }

  return (
    <Layout
      title = "Profile Preview"
  >
    <View style={styles.container}>
      <FormProvider {...methods}>

        <View className='flex flex-col items-center  mt-10'>
          {/* Image */}
          <View className='h-[136px] w-[136px] rounded-2xl bg-slate-800'>

          </View>
          <CustomButton
            title='Edit Photo'
            buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1, marginTop: 15, width: 136}}
            titleColor= {Colors.gray}
            onPress={() => navigate('EditProfile')}
          />
        </View>
        <View className='flex flex-col '>
          <Divider className='my-8'/>
          <Input
            name='fname'
            label="Full Name"
            placeholder="Timothy Hilda"
          />
          <Input
            name='dname'
            label="Display Name"
            placeholder="Advocate001"
          />
          <Divider className='mb-6 mt-1 bg-[#D2C2CB]'/>
          <Input
            name='emial'
            label="Email address"
            placeholder="timothyhilda@gmail.com"
          />
          <Input
            name='phone'
            label="Phone"
            placeholder="+23490897656"
          />
        </View>
      </FormProvider>
    </View>
  </Layout>
  )
}

export default EditProfile

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