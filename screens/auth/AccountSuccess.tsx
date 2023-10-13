import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../components/CustomButton";
type Props = NativeStackScreenProps<RootStackParamList, "AccountSuccess">;

// ** Thirld Party
import Entypo from "@expo/vector-icons/Entypo"


// ** Image
import Shield from "../../assets/sheild-dynamic-premium.png"

const AccountSuccess: React.FC<Props> = ({ navigation: { navigate } }) => {

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
          <View className="w-6 h-6 rounded-full border border-[#4E444B] justify-center items-center">
            <Entypo name="cross" size={18} color={"#4E444B"} />
          </View>
          
        </View>
        {/* ====== ======== */}
        <View style={{marginVertical: 20}} className="grow" >
          <Text className="text-[28px] text-kblack text-center">You’re signed up!</Text>
          {/* <Text className="text-[16px] text-ktext text-center mt-3">Verify your identity in two simple steps.</Text> */}
          <View className="items-center w-full mt-8">
            {/* Image */}
            <Image
              source={Shield}
              
            />
          </View>
        </View>
        <View>
        <View style={{ backgroundColor: "red"}} className="bg-red-800" />
          <Button title="Go to home" onPress={() => navigate("CustomDrawer")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountSuccess
