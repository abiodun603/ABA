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
import { SelectList } from 'react-native-dropdown-select-list';
import { useSignupMutation } from "../../stores/features/auth/authService";
import { useToast } from "@gluestack-ui/themed";
import Toaster from "../../components/Toaster/Toaster";

type Props = NativeStackScreenProps<RootStackParamList, "CreateAccount">;
const StyledView = styled(View)

const data = [
  {key:'1', value:'Select your gender', disabled:true},
  {key:'male', value:'Male'},
  {key:'female', value:'Female'},
]


const defaultValues = {
  email: '',
  password: '',
  name: '',
}

interface UserData {
  email: string;
  password: string;
  name: string;
}


const Create: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});
  const [selected, setSelected] = React.useState("");
  const [signup, { isLoading }] = useSignupMutation();

  const toast = useToast()


  const handleSignup = async (data: UserData) => {
    // Handle login logic here
    const signupData = {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: selected
    }
    try {
      await signup(signupData).unwrap().then((res: any) => {
        const userEmail = res?.doc.email
        console.log(res)
        toast.show({
          placement: "top",
          render: ({ id }) => <Toaster id = {id} message="User Created Successfully" type="success"  />
        })
        methods.reset()
        // Being that the result is handled in extraReducers in authSlice,
        // we know that we're authenticated after this, so the user
        // and token will be present in the store
        navigate("OtpScreen", { email: userEmail} as { email: any });
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
          render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
        })
      }
      toast.show({
        placement: "top",
        render: ({ id }) => <Toaster id = {id} message="Error Signing up"   />
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
        {/* Email Address set up */}
        <AuthHeader 
          rightNavigation = "Sign in"
          head={`Enter your ${'\n'}Information Details`}
          description="Enter your name to get started"
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
              label="Fullname"
              placeholder="Enter your name"
              name="name"
              rules={{
                required: 'Name is required',
              }}
            />
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
            <Input
              name="password"
              label="Password"
              placeholder="Enter password"
              password
              passwordIcon
            />

            <View className='flex flex-col mb-5'>
              {/* <Text className=' font-normal text-sm text-black'>Gender</Text> */}
              <SelectList 
                setSelected={(val: React.SetStateAction<string>) => setSelected(val)} 
                data={data} 
                save="value"
                boxStyles={{borderRadius:4, borderColor: "#80747B", height:56}}
                search={false} 
                placeholder='Select your gender'
              />
            </View>


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
              <Button title="Sign up" isLoading={isLoading} onPress={methods.handleSubmit(handleSignup)} />
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