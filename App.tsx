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

import socket from './utils/socket';
import { Platform } from 'react-native';
import fetchCityFromCoordinates from './services/fetchCityFromCoordinates';
import { useAppDispatch } from './hooks/useTypedSelector';
import { setEventLocation } from './stores/features/event/eventSlice';
import store from './stores/store';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    underlineColor: 'transparent', // Set underline color to transparent
  },
};


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  // console.log(currentCity)

  return !fontsLoaded ? null : (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <GluestackUIProvider config={config.theme}>
              <StatusBar style='auto' />
              <Navigation />
              <Toast/>
            </GluestackUIProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
