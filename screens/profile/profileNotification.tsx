import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// ** Constants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Types
import { RootStackParamList } from "../../types";

// ** Third Party
import { styled } from 'nativewind';
import { Box } from 'native-base';

// ** Layout
import Layout from '../../layouts/Layout';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "ProfileNotification">;
const StyledView = styled(View)

const DATA =[
  {
    id: 1,
    time: "15 minutes",
  },
  {
    id: 2,
    time: "30 minutes",
  },
  {
    id: 3,
    time: "1 hour",
  },
  {
    id: 4,
    time: "2 hours",
  }
]

const ProfileNotification: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <Layout
      title = "Pause Notifications"
  >
    <View style={styles.container}>
      {/* if no sip extension exit */}
      {/* <Text style={[styles.time, {textAlign: 'center'}]}>No extension added yet.</Text> */}
      {
        DATA.map((data, index) => {
          return (
            <View key={index}>
              <StyledView className="flex flex-row  items-center space-x-1 mt-6">
                <Box className="basis-1/3 text-black">
                  <Text>{data.time}</Text>
                </Box>
              </StyledView>
              <Box  className='mt-5'/>
            </View>
          )
        })
      }
    </View>
  </Layout>
  )
}

export default ProfileNotification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  time: {
    fontSize: FontSize.small,
    fontFamily: Font['inter-regular'],
    color: Colors.gray,
    marginTop: 25
  },

})