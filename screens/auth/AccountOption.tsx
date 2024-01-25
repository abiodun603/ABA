import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import CustomButton from "../../components/CustomButton";

// ** Image
import Logo from "../../assets/logo.svg";
import { styled } from "nativewind";
type Props = NativeStackScreenProps<RootStackParamList, "AccountOption">;

// 
const StyledView = styled(View)

const {height} = Dimensions.get("window");

const AccountOption: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={{
          flex: 1,
          backgroundColor: Colors.primary
        }}
      >
       <StyledView style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.lowerBond} >
          <Logo style= {{height: height/3.0}} />
          <Text className="text-[28px] text-white mt-4">
            Create your{'\n'}
            account.
          </Text>
          <Text className="text-[#FFD7F3] text-sm font-medium mt-2">Join us in creating a more inclusive world for individuals with autism.</Text>
          <StyledView className="flex flex-col mt-5 ">
            <CustomButton title="Sign up with Email" onPress={() => navigate("CreateAccount")}/>
            {/* <CustomButton title="Sign up with Google" buttonColor="transparent" titleColor={"#FFD7F3"} buttonStyle={{borderWidth: 1, borderColor: "#FFD7F3", marginTop: 15}}/>
            <CustomButton title="Sign up with Apple" buttonColor="transparent" titleColor={"#FFD7F3"} buttonStyle={{borderWidth: 1, borderColor: "#FFD7F3", marginTop: 15}}/> */}
          </StyledView>
          <Text onPress={() => navigate("Login")} style={styles.text3}>Already have an account? <Text style={styles.text4} >Sign In</Text>.</Text>
        </View>
      </StyledView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountOption

const styles = StyleSheet.create({

  lowerBond: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 30,

  },

  text3: {
    color: "#FFD7F3",
    fontSize: FontSize.small,
    fontFamily: Font["inter-medium"],
    textAlign: "center",
    marginTop: 20
  },
  text4: {
    color: Colors.secondary,
    textDecorationLine: 'underline'
  }
})


// import React from 'react';
// import { View } from 'react-native';

// const App = () => {
//   return (
//     
//   );
// };

// export default App;