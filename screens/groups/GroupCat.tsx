import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// ** Layout
import Layout from '../../layouts/Layout';

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { GroupCatergory } from '../../utils/dummy';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { useGetCategoryQuery } from '../../stores/features/groups/groupsService';
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
  const {data, isLoading} = useGetCategoryQuery()

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if (!data?.docs) {
    return <Text>No data available.</Text>; // Display a message when there is no data
  }

  console.log(data)

  return (
    <Layout
      title = "Community"
    >
     <View className='px-4 mt-4'>
        <View className="flex-row items-center justify-between mb-1 ">
          {/*  */}
          <Text className='text-black text-sm font-bold mt-3'>Browse by categories</Text>
        </View>
        <View>
          <GridView 
            data={data?.docs} 
            renderItem={(item: any) => (
              <TouchableOpacity className=' mt-4 flex-row items-center space-x-2' onPress={() => navigate("GroupJoin", {id: item.id })}>
                <View className='h-[80px] w-[80px] rounded-lg  justify-center items-center'>
                  <ImageBackground
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 10}}
                    style={{ flex: 1, width: '100%' }}
                    source = {{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvVRjzi266UV2c8204Wa2FDqwwxkXFDU4Ybw&usqp=CAU'}}
                  />
                </View>
                <Text className='text-black text-xs font-semibold mt-1'>{item?.category_name}</Text>
              </TouchableOpacity>
             
            )}
          />
        </View>
        {/* <Text className=''>No Photo yet !!!</Text> */}
      </View>
    </Layout>
  );
}

export default GroupCat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  }
})