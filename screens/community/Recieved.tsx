import {
  Image,
  Text,
  View,
} from "react-native";
import React from "react";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "AccountSuccess">;

// ** Image
import Shield from "../../assets/sheild-dynamic-premium.png"

const Recieved: React.FC<Props> = ({ navigation: { navigate } }) => {

  return (
      <View>
        {/* ====== ======== */}
        <View style={{marginVertical: 20}} className="grow" >
          <View className="items-center w-full mt-8">
            {/* Image */}
            <Image
              source={Shield}
            />
          </View>
          <Text className="text-[28px] text-kblack text-center">No new Invites</Text>
          <Text className="text-[16px] text-ktext text-center mt-3">We’ll notify you when invitations come in</Text>
        </View>
      </View>
  )
}

export default Recieved
