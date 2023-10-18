import { StyleSheet, Text, View , TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'

// ** Layout
import Layout from '../../layouts/Layout';

// ** Third Pary
import { Divider } from 'native-base';

// ** Icons
import {Ionicons, MaterialIcons, FontAwesome} from "@expo/vector-icons"

//
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { GroupCatergory } from '../../utils/dummy';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
type Props = NativeStackScreenProps<RootStackParamList, "GroupJoin">;

const screenWidth = Dimensions.get("window").width

interface IGridViewProps<T> {
  data: T[];
  renderItem(iem: T): JSX.Element;
  col?:number;
}

const GridView = <T extends any>(props: IGridViewProps<T>) => {
  const {data, renderItem, col = 2} = props;
  return (
    <View className='w-full flex-row flex-wrap'>
      {
        data.map((item, index) => {
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


const JoinCard = () => {
  return (
    <View className = "flex-row items-center justify-between ">
      <TouchableOpacity className=' mt-4 flex-row items-center space-x-2'>
        <View className='h-[80px] w-[80px]  bg-slate-400 rounded-lg  justify-center items-center'></View>
        <View className=' flex-wrap space-y-2'>
          <Text className='text-black text-sm font-semibold mt-1' numberOfLines={2} ellipsizeMode="tail">EQUIPT West Afica - Career, Tech..</Text>
          <View className=''>
            <Text className='text-gray-400 text-xs font-semibold mt-1'>Lagos</Text>
            <Text className='text-gray-400 text-xs font-semibold mt-1'>176 Members</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/*  */}
      <TouchableOpacity className='w-fit bg-blue-500 px-3 py-1 rounded-lg'>
        <Text className='text-white'>Join</Text>
      </TouchableOpacity>
    </View>
  )
}


const GroupJoin: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <Layout
      title = "Group Join"
    >
      <ScrollView style = {styles.container} className=' mt-4'>
        <View className='px-4'>
          <View className="flex-row items-center justify-between mb-1 ">
            {/*  */}
            <Text className='text-black text-sm font-bold mt-3'>Browse by categories</Text>
          </View>
          <View className=''>
            <FlatList
              data={[1,2]}
              renderItem={JoinCard}
            />
          </View>
        </View>
          
        {/* Divider */}
        <Divider mt={8} thickness={1}/>
          <View className='flex-row justify-between items-center my-4  px-4'>
            <View className='flex-row  space-x-2'>
              {/* icon calander */}
              <MaterialIcons name="location-searching" size={28} />
              <View className=''>
                {/* day / month / year */}
                <Text className='text-sm text-gray-800 font-bold'>Start a new group</Text>
                {/* time */}
                <Text className='text-xs text-gray-700 font-medium'>Organise your own events</Text>
              </View>
            </View>
            {/* icon */}
            <MaterialIcons name = "keyboard-arrow-right"  size={18}/>
          </View>
        <Divider thickness={8}/>
        <View className='px-4'>
          <FlatList
            data={[1,2, 3]}
            renderItem={JoinCard}
          />
        </View>
        
        <View className='px-4 mt-4 mb-28'>
          <View className="flex-row items-center justify-between mb-1 ">
            {/*  */}
            <Text className='text-black text-sm font-bold mt-3'>More to explore</Text>
          </View>
          <View>
            <GridView 
              data={GroupCatergory} 
              renderItem={(item) => (
                <TouchableOpacity className='mx-2 mt-4' onPress={() => navigate("GroupCat")}>
                  <View className='h-[150px] bg-slate-400 rounded-lg  justify-center items-center'></View>
                  <Text className='text-black text-xs font-semibold mt-1'>{item}</Text>
                </TouchableOpacity>
              
              )}
            />
          </View>
          {/* <Text className=''>No Photo yet !!!</Text> */}
        </View>
          {/* <Text className=''>No Photo yet !!!</Text> */}
      </ScrollView>
    </Layout>
  )
}

export default GroupJoin

const styles = StyleSheet.create({
  container: {
    screenWidth,
    flex: 1
  }
})