import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from '../../components/Input'
import { SelectList } from 'react-native-dropdown-select-list';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

// ** Third Party
import { FormProvider, useForm } from "react-hook-form";

const data = [
  {key:'1', value:'Select', disabled:true},
  {key:'2', value:'Professional'},
  {key:'3', value:'Advocate'},
  {key:'4', value:'Caregiver'},
] 

const defaultValues = {
  bio: '',
}


const Role = () => {
  const methods = useForm({defaultValues});
  const [selected, setSelected] = React.useState("");
  // 
  const navigation = useNavigation();

  return (
    <View className='mt-8' style={{flex: 1}}>
      <FormProvider {...methods}>
        <View className='relative'>
          <Text style={[styles.label]}>Role in Community</Text>
          <SelectList 
            setSelected={(val: React.SetStateAction<string>) => setSelected(val)} 
            data={data} 
            save="value"
            boxStyles={{borderRadius:4, borderColor: "#80747B", marginBottom: 25, paddingVertical: 17}}
            search={false} 
            placeholder='Other'
          />
        </View>

        <Input
          label="Info"
          placeholder="Tell us more information about you"
          name="bio"
        />

        <View className='absolute bottom-10 w-full'>
          <CustomButton title='Submit' onPress={() => navigation.navigate("IdentifySuccess") } />
        </View> 
      </FormProvider>

      
    </View>
  )
}

export default Role

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: -8,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#4E444B",
    zIndex: 10
  }
})