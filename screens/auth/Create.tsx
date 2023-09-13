import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Input from "../../components/Input";
import Button from "../../components/CustomButton";
import AuthHeader from "../../layouts/authHeader/AuthHeader";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";
import { Box, Checkbox } from "native-base";
import { styled } from "nativewind";

// ** Third Party
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  email: '',
}

interface UserData {
  email: string
}

type Props = NativeStackScreenProps<RootStackParamList, "CreateAccount">;
const StyledView = styled(View)

const Create: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});

  const handleLogin = (data: UserData) => {
    // Handle login logic here
    console.log(data);
  }

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
        {/* Email Address set up */}
        <AuthHeader 
          rightNavigation = "Sign in"
          head={`Enter your ${'\n'}email address`}
          description="Enter your email to get started"
          rightNavPress={() => navigate("Login")}
        />

        {/* Password  set up */}
        {/* <AuthHeader 
          rightNavigation = "Sign in"
          head={`Setup your ${'\n'}Password`}
          description="Secure your account by creating a password"
        /> */}
          
        {/* Email Verificaiton  set up */}
        {/* <AuthHeader 
          head={`Email Verification`}
          description="Secure your account by creating a password"
        /> */}

        <FormProvider {...methods}>
          {/* ====== ======== */}
          <View style={{marginVertical: 20}} className="grow" >
            {/* Email Address set up */}
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


          {/* Passwords  set up */}
          {/* <Input
              label="Confirmation code"
              placeholder="Enter confirmation code"
              passwordIcon
            />
            <Text style={styles.text1}>
              Didn’t get confirmation code? 
              <Text style={[styles.text2, {textDecorationLine: "underline"}]}>{" "}Resend</Text>
            </Text> */}
          </View>
          <View>
            <View style={{ backgroundColor: "red"}} className="bg-red-800" />
              {/* Email Address set up */}
              <Button title="Continue" onPress={() => navigate("SetPassword")} />
              {/* Password set up */}
                            {/* <Button title="Sign Up" onPress={() => navigate("CustomDrawer")} /> */}
              { /* Verification set up */}
                        {/* <Button title="Submit" onPress={() => navigate("CustomDrawer")} /> */}


            <Text style={styles.text1}>
              By continuing, you agree to One Reach’s{'\n'} 
              <Text style={styles.text2}>Terms & Conditions</Text> and <Text style={styles.text2}>Privacy Policy.</Text>
            </Text>

          </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

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