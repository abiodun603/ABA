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
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

// 
const StyledView = styled(View)

const {height} = Dimensions.get("window");

const Welcome: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={{
          flex: 1
        }}
      >
       <StyledView style={{ flex: 1 }}>
        <View style={styles.upperBond} >
            <Logo style= {{height: height/3.0}} />
        </View>
        <View style={styles.lowerBond} >
          <Text className="text-[28px]">
            Welcome to our community! Join us in supporting individuals with autism.
          </Text>
          <StyledView className="flex flex-col mt-5 ">
            {/*   <CustomButton title="Continue to Onboarding" /> */}
            {/* <CustomButton title="Sign up" buttonColor="transparent" onPress={() => navigate("AccountOption")} titleColor={Colors.primary} buttonStyle={{borderWidth: 1, borderColor: Colors.primary, marginTop: 15}}/> */}
            <CustomButton title="Sign up" onPress={() => navigate("AccountOption")} />

          </StyledView>
          <Text onPress={() => navigate("Login")} style={styles.text3}>Already have an account? <Text style={styles.text4} >Sign In</Text>.</Text>
        </View>
      </StyledView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  upperBond: {
    backgroundColor: Colors.primary,
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  lowerBond: {
    flex: 4,
    paddingHorizontal: 20,
    marginTop: 30

  },

  text3: {
    color: Colors.primary,
    fontSize: FontSize.small,
    fontFamily: Font["inter-medium"],
    textAlign: "center",
    marginTop: 20
  },
  text4: {
    color: Colors.secondary
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