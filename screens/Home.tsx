import React, { FC, useEffect, useRef, useState } from 'react'
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

// ** Constants 

// ** Layouts
import Layout from '../layouts/Layout'

// ** Icons
import { Fontisto } from '@expo/vector-icons'; 

// ** Third Pary
import { ScrollView } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import Constants from 'expo-constants';


//** Store and Action 
import { setSelectedTab } from '../stores/tab/tabAction'
import { connect } from 'react-redux'

// ** Helpers

// ** Components
import { CustomMenu } from '../components/Menu/Menu'
import { useGetProfileQuery } from '../stores/features/auth/authService'
import useGlobalState from '../hooks/global.state'
import CustomButton from '../components/CustomButton'
import { interestTypes } from '../utils/dummy'

// ** Views
import All from '../views/HomeView/All'
import Going from '../views/HomeView/Going'
import Past from '../views/HomeView/Past'
import Saved from '../views/HomeView/Saved'
import TopNavPanel from '../navigation/TopTabs';

// ** Store Services
import { useGetProfileMeQuery } from '../stores/features/profile/profileService';
import { getFirstAndLastName } from '../helpers/getFirstAndLastName';
import useLocation from '../hooks/useLocation';
import { useGetNextEventQuery } from '../stores/features/event/eventService';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { Platform } from 'react-native';
import fetchCityFromCoordinates from '../services/fetchCityFromCoordinates';
import { setEventLocation } from '../stores/features/event/eventSlice';

const screenWidth = Dimensions.get("window").width

const viewConfigRef = { viewAreaCoveragePercentThreshold: 200 }

const RenderItems = () => {
  // const {location} = useLocation()
  // const {isLoading, data} = useGetNextEventQuery(location)
  // console.log(data)

  return (
    <View className='mr-6'>
      {/*  */}
      <View className='w-full p-4 border border-gray-400 shadow-sm rounded-md mt-8' >
        {/* Event Data */}
        <Text className='text-yellow-600 text-xs font-medium'>SAT,28 OCT 10:00 WAT</Text>
        {/* Event Description */}
        <Text className='text-sm text-black opacity-80 font-semibold mt-2'>Azure Community Con23: Exploring Innovative Possibilities with OpenAI, and Az...</Text>
        <Text className='text-gray-500 font-normal mt-1'>Nigeria Microsoft Azure Meetup Group</Text>

        {/* Action */}
        <View className="flex-row items-center justify-between mt-7">
          <Text>Lagos, LA</Text>
          <CustomButton title='View event' buttonStyle={{width: 150, height: 30, borderRadius: 6}} />
        </View>
      </View>
    </View>
  )
}

const Home = ({navigation}: {navigation: any}) => {
  let flatListRef = useRef< any | null>(null)
  const[currentIndex, setCurrentIndex] = useState(0);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string | null>(null); // State for the current city

  // 
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMessage('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      // Fetch the city based on coordinates
      const city:string = await fetchCityFromCoordinates(userLocation.coords.latitude, userLocation.coords.longitude);
      const data = {
        location: city,
      }
      dispatch(setEventLocation(data));
      setCurrentCity(city);
    })();
  }, []);

  // Store Service
  const {isFetching, data} = useGetProfileMeQuery()
 
  const fullName = data?.user?.name || ""
  const { firstName, lastName } = getFirstAndLastName(fullName);


  // Only needed if want to know the index
  const onViewRef = useRef(({changed}: {changed: any}) => {
    if(changed[0].isViewable) {
      setCurrentIndex(changed[0].index)
    }
  });

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({animated: true, index: index})
  }


  // const {user} = useGlobalState()
  // const id = user?.id;
  // const {data} = useGetProfileQuery(id)
  // const docs = data?.docs;

  const TabData = [
    { name: "All", component: All },
    { name: "Going", component: Going },
    { name: "Saved", component: Saved },
    { name: "Past", component: Past },
  ];

  return (
    <Layout
      // title={docs && docs[0]?.firstname || `firstname`}
      title='ABA'
      navigation={navigation}
      iconName={"bell-outline"}
      iconColor="#000000"
      onPress={() => navigation.navigate("Notification")}
      drawerNav
      profileIcon
    >
      <ScrollView style={styles.container}>
        <View>
          <Text className='text-black text-3xl font-bold'>Hi {firstName} {lastName} 👋</Text>
          {/* ==== ===== */}
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-black text-sm font-semibold">Suggested events 🔍</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">Calender</Text>
          </View>
          <View className=''>
            <FlatList
              horizontal
              data = {[1, 2, 3, 4]}
              renderItem={RenderItems}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator = {false}
              pagingEnabled
              ref = {(ref) => {
                flatListRef.current = ref;
              }}
              contentContainerStyle = {{maxWidth: screenWidth}}
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
              // style = {{width: screenWidth}}
            />
            <View style = {{flexDirection: "row", justifyContent: "center", marginVertical: 20}} >
              {[1,2,3,4].map((item, index:number) => {
                return (
                  <TouchableOpacity key = {index.toString()} style = {[styles.circle , {backgroundColor: index == currentIndex ? "black" : "grey"}]} />
                )
              })}
            </View>
          </View>
        </View>
        {/* Your Groups */}
        <View className='mt-1'>
          <View className="flex-row items-center justify-between mb-3">
            {/*  */}
            <Text className="text-black text-sm  font-semibold">Your groups</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">See all</Text>
          </View>
          {/* Groups */}
          <View className='flex-row space-x-4'>
            <View className='h-40 w-32 text-white text-sm font-semibold bg-slate-600 rounded-md justify-end pb-3 pl-2 pr-4'>
              <Text className='text-white text-sm font-semibold'>Astrology Dating New York</Text>
            </View>
            <View className='h-40 w-32 text-white text-sm font-semibold border border-gray-400 shadow-2xl rounded-md  justify-between py-5 pb-3 pl-2 pr-4 items-end'>
              <Text className='text-black text-sm font-semibold'>Discover more groups</Text>
              <Fontisto name='arrow-right-l' size={30}  className="rotate-90 self-end text-slate-400" />
            </View>
          </View>
        </View>

        {/* Your Interests */}
        <View className='mt-8' >
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-black text-sm font-semibold">Your Interests</Text>
            <Text className="text-ksecondary text-sm opacity-50 font-normal">Edit</Text>
          </View>
          {/* Interests */}
          <View >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex: 1, flexGrow: 1}}>
              {
                interestTypes.map((interest) => {
                  return (
                    <TouchableOpacity key={interest.id} onPress={() => null} className='mr-4'>
                      <View style={{ backgroundColor: '#333', borderRadius: 8, padding: 8 }}>
                        <Text style={{ color: 'white' }}>{interest.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
        <View className='mt-10 mb-56'>
          <View className="flex-row items-center justify-between mb-3">
            {/*  */}
            <Text className="text-black text-sm font-semibold">Your calendar</Text>
          </View>
          {/* Groups */}
          <View style={{ flex: 1, flexDirection: "row" }} className=''>
            <TopNavPanel tabs={TabData} /> 
          </View>
        </View>
      </ScrollView>
    </Layout>
  )
}

function  mapStateToProps (state: { tabReducer: { selectedTab: any } }){
  return {
      selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch:any){
  return {
  setSelectedTab: (selectedTab: any) => {
         return dispatch(setSelectedTab(selectedTab))
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
const styles = StyleSheet.create({
  // Home
  container: {
    padding: 20,
    flexDirection: "column",
    flex: 1,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: "grey",
    borderRadius: 50,
    marginHorizontal: 3
  }
})

