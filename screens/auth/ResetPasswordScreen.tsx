import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Types
import { RootStackParamList } from "../../types";

// ** Layouts
import AuthHeader from "../../layouts/authHeader/AuthHeader";

// ** Constants 
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";

// ** Thired Party
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from "nativewind";


// ** Component
import Input from "../../components/Input";
import Button from "../../components/CustomButton";
import { useToast } from "@gluestack-ui/themed";
import Toaster from "../../components/Toaster/Toaster";
import { useResetPasswordMutation } from "../../stores/features/auth/authService";


type Props = NativeStackScreenProps<RootStackParamList, "ResetPassword">;

// Define the type for your route parameters
type RouteParams = {
  email: any;
  otp: any // Replace 'string' with the correct type for communityId
};
interface UserData {
  new_password: string
  confirm_password: string
}

const defaultValues = {
  new_password: '',
  confirm_password: ''
}

const ForgetPassword: React.FC<Props> = ({ navigation: { navigate }, route }) => {
  // const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const methods = useForm({defaultValues});
  const { email , otp} = route.params as unknown  as RouteParams;
  const toast = useToast()

  // ****
  const [resetPassword, {isLoading}] = useResetPasswordMutation();


  const handleResetPassword = async (data: UserData) => {
    const crendentials = {
      email: email,
      otp: otp,
      password: data.new_password
    }
    console.log(crendentials)
   try {
    await resetPassword(crendentials).unwrap().then((res: any) => {
      console.log(res)
     
      // Being that the result is handled in extraReducers in authSlice,
      // we know that we're authenticated after this, so the user
      // and token will be present in the store
      // navigate("ResetSuccess") 

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
      render: ({ id }) => <Toaster id = {id} message="Error resetting password"   />
    });
  }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={{
          padding: 20,
          paddingHorizontal: 20,
          flex: 1
        }}
      >
        {/* ====== ======== */}
        <AuthHeader 
          head= "Reset your Password"
          description="Secure your account by creating a password"
        />
          <FormProvider {...methods}>
            {/* ====== ======== */}
            <View style={{marginVertical: 20}} className="grow" >
              <Input
                label="Password"
                placeholder="Enter password"
                passwordIcon
                name="new_password"
                rules={{
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character'
                  }
                }}
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                passwordIcon
                name = "password_confirmation"
                rules={{
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character'
                  }
                }}
              />
            </View>
            <View>
            <View style={{ backgroundColor: "red"}} className="bg-red-800" />
              <Button title="Reset Password" isLoading={isLoading} onPress={methods.handleSubmit(handleResetPassword)} />
            </View>
          </FormProvider>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  text1: {
    fontSize: FontSize.small,
    color: Colors.gray,
    fontFamily:Font["inter-regular"],
    textAlign: "center",
    lineHeight:25,
    marginVertical :20
  },

  text2: {
    color: Colors.primary,
    textDecorationColor: Colors.primary,
    textDecorationLine: "underline"
  },

  text3: {
    color: Colors.text,
    fontSize: FontSize.small,
    fontFamily: Font["inter-regular"],
    textAlign: "center",
    marginTop: Spacing * 2
  },
  text4: {
    color: Colors.primary
  },
  forgetPassword: {
    flexDirection: "row",
    marginVertical: Spacing
  }
})