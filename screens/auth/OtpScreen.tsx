import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from 'react'

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Layout
import Header from "../../layouts/authHeader/AuthHeader";

// ** Contants
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";

// ** Third Party
import { FormProvider, useForm } from "react-hook-form";
import Ionicons from '@expo/vector-icons/Ionicons';

// ** Component
import Input from "../../components/Input";
import Button from "../../components/CustomButton";

// ** Types
import { RootStackParamList } from "../../types";
import { useOtpMutation } from "../../stores/features/auth/authService";
import { useToast } from "@gluestack-ui/themed";
import Toaster from "../../components/Toaster/Toaster";
type Props = NativeStackScreenProps<RootStackParamList, "OtpScreen">;
// Define the type for your route parameters
type RouteParams = {
  email: any;
  code: any // Replace 'string' with the correct type for communityId
};
const defaultValues = {
  code: '',
}

interface UserData {
  code: string
}

const OtpScreen: React.FC<Props> = ({ navigation: { navigate }, route}) => {
  const { email } = route.params as unknown  as RouteParams;
  const methods = useForm({defaultValues});
  const [otp, { isLoading }] = useOtpMutation();
  const toast = useToast()


  const handleOtp = async (data: UserData) => {
    const crendentials = {
      email: email,
      otp: data.code
    }
   console.log(crendentials)
   try {
    await otp(crendentials).unwrap().then((res: any) => {
      console.log(res)
      toast.show({
        placement: "top",
        render: ({ id }) => <Toaster id = {id} message="Otp Authenticated successfully" type="success"  />
      })
      // Being that the result is handled in extraReducers in authSlice,
      // we know that we're authenticated after this, so the user
      // and token will be present in the store
      navigate("Login");
    });
  
  } catch (err: any) {
    console.log(err)
    if(err.status === 401){
      toast.show({
        placement: "top",
        render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
      })
    }
    if(err.status === 500){
      toast.show({
        placement: "top",
        render: ({ id }) => <Toaster id = {id} message="OTP validation failed"  />
      })
    }
    toast.show({
      placement: "top",
      render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
    });
  }
  }

  return (
    <SafeAreaView>
      <ScrollView 
        contentContainerStyle={{
          padding: 20,
          paddingHorizontal: 20
        }}
      >
        {/* ====== ======== */}
        <Header 
          title="Check your inbox"
          description="We sent an OTP code to you."
        />
        {/* ==== ======= */}
        <FormProvider {...methods}>
          {/* ====== ======== */}
          <View style={{marginVertical: 20}}>
            <Input
              name="code"
              label="Otp code"
              placeholder="Enter your otp code"
              rules={{
                required: 'Code is required',
              }}
            />

            <View style={{marginTop: Spacing*2}} />
            <Button title="Confirm" isLoading={isLoading} onPress={methods.handleSubmit(handleOtp)} />
          </View>
        {/* ===== ======= */}
        </FormProvider>
        <Text style={styles.text3}>Didn’t receive a code?<Text style={styles.text4} > Click to resend</Text>.</Text>

        {/* ===== ======== */}
        <TouchableOpacity onPress={() => navigate("Login")} style={{marginTop: Spacing, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          {/* icon */}
          <Ionicons name="ios-arrow-back" size={20} color="#000000" />
          <Text style={{color: Colors.text, fontFamily: Font["inter-regular"], fontSize: FontSize.small}}>Back to log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OtpScreen


const styles = StyleSheet.create({
  text3: {
    color: Colors.text,
    fontSize: FontSize.small,
    fontFamily: Font["inter-regular"],
    textAlign: "center",
    marginVertical: Spacing * 1.5
  },
  text4: {
    color: Colors.primary
  },
})