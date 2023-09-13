import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ** Layout
import AuthHeader from "../../layouts/authHeader/AuthHeader";

// ** Component
import Input from "../../components/Input";
import Button from "../../components/CustomButton";

// ** Contants
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";

// ** Third Party
import { FormProvider, useForm } from "react-hook-form";

// ** Types
import { RootStackParamList } from "../../types";
type Props = NativeStackScreenProps<RootStackParamList, "SetPassword">;



const defaultValues = {
  password: '',
  confirmPassword: '',
}

interface UserData {
  password: string
  confirmPassword: string
}

const SetPassword: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});

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
          head={`Setup your ${'\n'}Password`}
          description="Secure your account by creating a password"
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
        {/* ===========  */}
        <FormProvider {...methods}>

          {/* ====== ======== */}
          <View style={{marginVertical: 20}} className="grow" >
            {/* Email Address set up */}
            <Input
            name="password"
              label="Password"
              placeholder="Enter password"
              password
              passwordIcon
            />
            <Input
            name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              password
              passwordIcon
            />
          </View>
          <View>
            <View style={{ backgroundColor: "red"}} className="bg-red-800" />
            <Button title="Sign Up" onPress={() => navigate("EmailVerification")} />
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

export default SetPassword

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