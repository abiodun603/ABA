import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../components/CustomButton";
type Props = NativeStackScreenProps<RootStackParamList, "IdentifySuccess">;

// ** Thirld Party
import Entypo from "@expo/vector-icons/Entypo"


// ** Image
import Location from "../../assets/location-dynamic-premium.png"

const IdentifySuccess: React.FC<Props> = ({ navigation: { navigate } }) => {

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
        <View className="h-[80px]">
          <TouchableWithoutFeedback onPress={() => navigate("Login")} className="w-6 h-6 rounded-full border border-[#4E444B] justify-center items-center">
            <Entypo name="cross" size={18} color={"#4E444B"} />
          </TouchableWithoutFeedback>
          
        </View>
        {/* ====== ======== */}
        <View style={{marginVertical: 20}} className="grow" >
          <Text className="text-[28px] text-kblack text-center">You’re all done!</Text>
          <Text className="text-[16px] text-ktext text-center mt-3">Go ahead to access groups, resources and events.</Text>
          <View className="items-center w-full mt-8">
            {/* Image */}
            <Image
              source={Location}
              
            />
          </View>
        </View>
        <View>
        <View style={{ backgroundColor: "red"}} className="bg-red-800" />
          <Button title="Go to Home" onPress={() => navigate("Login")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default IdentifySuccess
