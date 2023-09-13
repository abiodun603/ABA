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
type Props = NativeStackScreenProps<RootStackParamList, "Verification">;

const defaultValues = {
  code: '',
}

interface UserData {
  code: string
}

const Verification: React.FC<Props> = ({ navigation: { navigate }}) => {
  const methods = useForm({defaultValues});

  const handleSubmit = (data: UserData) => {
    // Handle login logic here
    console.log(data);
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
          description="We sent a verification code to you."
        />
        {/* ====== ======== */}
        <FormProvider {...methods}>
          <View style={{marginVertical: 20}}>
            <Input
              name="code"
              label="Verification Code"
              placeholder="Enter your verification code"
            />

            <View style={{marginTop: Spacing*2}} />
            <Button title="Proceed" onPress={() => navigate('ResetSuccess')} />
          </View>
        </FormProvider>
        {/* ===== ======= */}
        <Text style={styles.text3}>Didn’t receive a code?<Text style={styles.text4} > Click to resend</Text>.</Text>

        {/* ===== ======== */}
        <TouchableOpacity onPress={() => navigate("Login")} style={{marginTop: Spacing, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          {/* icon */}
          <Ionicons name="ios-arrow-back" size={20} color="#000000" />
          <Text style={{color: Colors.text, fontFamily: Font["inter-regular"], fontSize: FontSize.small}}>Back to sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Verification


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