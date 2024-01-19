import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Constants 
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";

// ** Layouts
import AuthHeader from "../../layouts/authHeader/AuthHeader";

// ** Thired Party
import { FormProvider, useForm } from 'react-hook-form';

// ** Component
import Input from "../../components/Input";
import Button from "../../components/CustomButton";


type Props = NativeStackScreenProps<RootStackParamList, "ResetCode">;


interface UserData {
  otp: string
}

const defaultValues = {
  otp: '',
}

const ResetCode: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});

  const handleResetCode = async (data: UserData) => {
    navigate("ResetPassword")
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
          head="Reset Code"
          description="Enter the reset code sent to your email account."
        />
          <FormProvider {...methods}>
            {/* ====== ======== */}
            <View style={{marginVertical: 20}} className="grow" >
              <Input
                label="Reset Code"
                placeholder="Enter reset Code"
                name="otp"
                rules={{
                  required: 'code is required',
                  // pattern: {
                  //   value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  //   message: 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character'
                  // }
                }}
              />
            </View>
            <View>
            <View style={{ backgroundColor: "red"}} className="bg-red-800" />
              <Button 
                title="Submit" 
                onPress={methods.handleSubmit(handleResetCode)}               
              />
            </View>
          </FormProvider>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetCode