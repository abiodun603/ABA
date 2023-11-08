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

// ** Hook
import { useAuth } from "../../hooks/useAuth";

// ** Component
import Input from "../../components/Input";
import Button from "../../components/CustomButton";




type Props = NativeStackScreenProps<RootStackParamList, "ForgetPassword">;

interface UserData {
  email: string
}

const defaultValues = {
  email: '',
}

const ForgetPassword: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const methods = useForm({defaultValues});

   // ** Hooks
   const auth = useAuth()

  const handleForgetPassword = async (data: UserData) => {
    const { email,  } = data
    // auth.forgetPass({ email }, () => {
      
    // })
    navigate("ResetCode")
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
          head="Forgot Password"
          description="Enter your email address. We’ll send you a reset
code."
        />
          <FormProvider {...methods}>

            {/* ====== ======== */}
            <View style={{marginVertical: 20}} className="grow" >
              <Input
                label="Email"
                placeholder="Enter email address"
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
              />
            </View>
            <View>
            <View style={{ backgroundColor: "red"}} className="bg-red-800" />
              <Button 
                title="Send reset code" 
                onPress={methods.handleSubmit(handleForgetPassword)}               />
              {/* <Button title="Send reset code" onPress={() => navigate("ResetCode")} /> */}
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