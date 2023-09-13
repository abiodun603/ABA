import React from 'react'

// ** React Native Library 
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet, Text, View } from 'react-native';

// ** Layout
import Layout from '../../layouts/Layout';

// ** Contants
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Colors from '../../constants/Colors';

// ** Third Party
import { FormProvider, useForm } from "react-hook-form";

// ** Component
import Input from '../../components/Input';
import ChatTab from '../../components/ChatTab';

// ** Types
import { RootStackParamList } from "../../types";
type Props = NativeStackScreenProps<RootStackParamList, "NewMessage">;

const w = Dimensions.get('window').width

const defaultValues = {
  recipient: '',
}

interface UserData {
  recipient: string
}

const MessageCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.messageText}>
        Hello, kindly provide an estimate for 50 bags of Perfro oil seeds. Thank you.
      </Text>
      <Text style={[styles.time, {textAlign: "right"}]}>16:30</Text>
    </View> 
  )
}

const NewMessage: React.FC<Props> = ({ navigation: { navigate } }) => {
  const methods = useForm({defaultValues});

  const handleSubmit = (data: UserData) => {
    // Handle login logic here
    console.log(data);
  }
  
  return (
    <Layout 
      title = "New Message"
      // iconButton
      // onPress={()=> navigate("NewMessage")}
    >
      <FormProvider {...methods}>
        <View style={styles.container}>
          {/*  */}
          <Input name='recipient' placeholder='Recipient' suffixIcon />
          {/*  */}
          {/* ====== Chat Input Field ====== */}
          <ChatTab/>
        </View>
      </FormProvider>
    </Layout>
  )
}

export default NewMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  time: {
    fontSize: FontSize.xsmall,
    fontFamily: Font['inter-regular'],
    color: Colors.gray,
    marginBottom: 25
  },

  // messageCard
  cardContainer: {
    position: "relative",
    width: 232,
    height: 90,
    padding: 10,
    backgroundColor: "#F5E5F5",
    borderTopRightRadius: FontSize.base,
    borderBottomLeftRadius: FontSize.base,
    borderBottomRightRadius: FontSize.base,
  },
  messageText: {
    color: Colors.text,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.small
  },
  chatInputFieldContainer:{
    width: w*1,
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
})