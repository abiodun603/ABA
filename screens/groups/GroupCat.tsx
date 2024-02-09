import { Text,View } from 'react-native'
import React, { useState } from 'react'

// ** Layout
import Layout from '../../layouts/Layout';
//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { useCreateCategoryMutation, useGetCategoryQuery } from '../../stores/features/groups/groupsService';
import Input from '../../components/Input';
import { ScrollView } from 'react-native';
import BottomSheet from '../../components/bottom-sheet/BottomSheet';
import CustomButton from '../../components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import { useToast } from '@gluestack-ui/themed';
import Toaster from '../../components/Toaster/Toaster';
import useGlobalState from '../../hooks/global.state';
type Props = NativeStackScreenProps<RootStackParamList, "GroupCat">;

interface IGridViewProps<T> {
  data: T[];
  renderItem(iem: T): JSX.Element;
  col?:number;
}

const GridView = <T extends any>(props: IGridViewProps<T>) => {
  const {data, renderItem, col = 1} = props;
  return (
    <View className='w-full flex-row flex-wrap'>
      {
        data.slice(0, 6).map((item, index) => {
          return (
            <View style = {{width: 100 / col + '%'}} key={index.toString()}>
              {renderItem(item)}
            </View>
          )
        })
      }
    </View>
  )
}

const GroupCat: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {data, isLoading, } = useGetCategoryQuery()
  const [show, setShow ] = useState(false) 
  const [createCommunity, {isLoading: createCategoryLoading}] = useCreateCategoryMutation()
  const {profile} = useGlobalState()
  console.log(profile, "Group Cat");
  const toast = useToast()

  const methods = useForm({});

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  const handleCreateCategory = (data: any) => {
    const formData = {
      category_name: data.category_name,
    }

    createCommunity(formData)
    .unwrap()
    .then((data) => {
      // Handle success
      console.log('res:', data);
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="success" message="Thank you!!!. Category Created" />
      })
      setShow(false)
      methods.reset();

    })
    .catch((error) => {
      // Handle error
      toast.show({
        placement: 'top',
        render: ({id}) => <Toaster id={id} type="error" message={error?.data.errors[0].message} />
      })
      setShow(false)

      console.error(error);
    });
  }

  return (
    <Layout
      title ={show ? "Create a new Category" : "Community"}
      iconName={!show && profile?.role === "admin" && "plus"}
      onPress={()=> setShow(true)}
    >
     <View className='px-4 mt-4'>
        <View className="flex-row items-center justify-between mb-1 ">
          {/*  */}
          <Text className='text-black text-sm font-bold mt-3'>Browse by categories</Text>
        </View>
        <View>
          {!data?.docs ? (
            <Text>No data available.</Text>
          ) : (
            <GridView 
              data={data?.docs} 
              renderItem={(item: any) => (
                <TouchableOpacity className=' mt-4 flex-row items-center space-x-2' onPress={() => navigate("GroupJoin", {id: item.id, category_name: item.category_name})}>
                  <View className='h-[80px] w-[80px] rounded-lg  justify-center items-center'>
                    <ImageBackground
                      resizeMode="cover"
                      imageStyle={{ borderRadius: 10}}
                      style={{ flex: 1, width: '100%' }}
                      source = {{uri: item.url }}
                    />
                  </View>
                  <Text className='text-black text-xs font-semibold mt-1 capitalize'>{item?.category_name}</Text>
                </TouchableOpacity>
              
              )}
            />
          )}
        </View>

        {/* BottomSheet component */}
        <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          height={0.87}
          enableBackdropDismiss
        >
          <FormProvider {...methods}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <Text className='font-medium text-2xl text-black '>Create a new events</Text> */}
              <View className='mt-4'>
                <Input
                  name='category_name'
                  label="Category name"
                  placeholder="Enter category name"
                />
                <View className='mb-20'>
                  <CustomButton
                  title="Submit" 
                  isLoading={createCategoryLoading}
                  onPress={methods.handleSubmit(handleCreateCategory)}              
                  />
                </View>
              </View>
            </ScrollView>
          </FormProvider>
        </BottomSheet>
      </View>
    </Layout>
  );
}

export default GroupCat