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

// ** Constants 
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";

// ** Components
import Input from "../../components/Input";
import Button from "../../components/CustomButton";

// ** Layouts
import AuthHeader from "../../layouts/authHeader/AuthHeader";

// ** Thired Party
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Checkbox } from "native-base";
import { styled } from "nativewind";
import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";

// ** Types
import { RootStackParamList } from "../../types";

// ** Store and Action
import { useLoginMutation } from "../../stores/features/auth/authService";
import { CustomMenu } from "../../components/Menu/Menu";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const StyledView = styled(View)

const defaultValues = {
  email: 'senatorugen@gmail.com',
  password: 'Telvida@123!!'
}

interface UserData {
  email: string
  password: string
}

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});
  const toast = useToast()
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data: UserData) => {
    // Handle login logic here
    try {
      const user = await login(data).unwrap().then((res) => console.log(res));
      console.log(user);
      // Being that the result is handled in extraReducers in authSlice,
      // we know that we're authenticated after this, so the user
      // and token will be present in the store
      navigate('CustomDrawer');
    } catch (err: any) {
      console.log(err.data)
      if(err.status === 401){
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="accent">
                <VStack space="xs">
                  <ToastTitle>New Message</ToastTitle>
                  <ToastDescription>
                    The email or password provided is incorrect.
                  </ToastDescription>
                </VStack>
              </Toast>
            )
          },
        })
      }
      if(err.status === 500){
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="accent">
                <VStack space="xs">
                  <ToastTitle>New Message</ToastTitle>
                  <ToastDescription>
                    Email verification required
                  </ToastDescription>
                </VStack>
              </Toast>
            )
          },
        })
      }
      // toast({
      //   status: 'error',
      //   title: 'Error',
      //   description: 'Oh no, there was an error!',
      //   isClosable: true,
      // });
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
          rightNavigation = "Sign up"
          rightNavPress={() => navigate("AccountOption")}
        />
          <FormProvider {...methods}>
            {/* ====== ======== */}
            <View style={{marginVertical: 20}} className="grow" >
              <Input
                label="Email"
                placeholder="Enter email address"
                name='email'
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                name="password"
                password
                passwordIcon
                rules={{
                  required: 'Password is required',
                  // pattern: {
                  //   value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  //   message: 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character'
                  // }
                }}
              />

              {/* remember me & forget password */}
              <View style={styles.forgetPassword}>
                <View style={{flex: 1, marginRight: -20}}>
                  <View className="flex flex-row items-center space-x-2">
                    <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" colorScheme="pink" />
                    <Text
                      style={{
                        color: Colors.gray,
                        fontSize: FontSize.small,
                        fontFamily:Font["inter-regular"],
                      }}
                    >Remember Me</Text>
                  </View>
                </View>
                <Text
                style={{
                  textAlign:"right",
                  color: Colors.secondary,
                  fontSize: FontSize.small,
                  fontFamily:Font["inter-regular"],
                }}
                onPress={() => navigate('ForgetPassword')}
                >Forgot Password?</Text>
              </View>
            
            </View>
            <View>
              <View style={{ backgroundColor: "red"}} className="bg-red-800" />
              <Button 
                title="Sign in" 
                isLoading={isLoading}
                onPress={methods.handleSubmit(handleLogin)}              
              />
              <Text style={styles.text3}>Or sign in with</Text>
              <StyledView className="flex flex-row  justify-center space-x-2 mt-6">
                <Box className=" text-black">
                  <Button
                    title='Google'
                    buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1, width: 117}}
                    titleColor= {Colors.secondary}

                  />
                </Box>
                <Box className=" text-black">
                  <Button
                    title='Apple'
                    buttonStyle={{backgroundColor: 'transparent', borderColor: "#B3B3B3", borderWidth: 1, width: 117}}
                    titleColor= {Colors.secondary}
                  />
                </Box>
              </StyledView>
            </View>
          </FormProvider>

         
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen

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