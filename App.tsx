import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation';
import fonts from "./config/fonts";
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NativeBaseProvider,  } from "native-base";
import Toast from 'react-native-toast-message';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GluestackUIProvider, config } from "@gluestack-ui/themed"
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import store from './stores/store';
import socket from './utils/socket';
import { Platform } from 'react-native';
import fetchCityFromCoordinates from './services/fetchCityFromCoordinates';
import { useAppDispatch } from './hooks/useTypedSelector';
import { setEventLocation } from './stores/features/event/eventSlice';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    underlineColor: 'transparent', // Set underline color to transparent
  },
};


export default function App() {
  const [fontsLoaded] = useFonts(fonts);
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

  console.log(currentCity)

  return !fontsLoaded ? null : (
    
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          {/* <PaperProvider theme={theme}> */}
            {/* <GluestackUIProvider config={config.theme}> */}
              <StatusBar style='auto' />
              <Navigation />
              <Toast/>
            {/* </GluestackUIProvider> */}
          {/* </PaperProvider> */}
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
