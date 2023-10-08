import React, { useEffect } from 'react';
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

import store from './stores/store';
import socket from './utils/socket';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    underlineColor: 'transparent', // Set underline color to transparent
  },
};


export default function App() {

  const [fontsLoaded] = useFonts(fonts);

  // useEffect(() => {
  //   const reconnectHandler = (attempt: number) => {
  //     console.log(`Reconnected. Attempt: ${attempt}`);
  //   };

  //   // Add the "reconnect" event listener
  //   socket.on('reconnect', reconnectHandler);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     socket.off('reconnect', reconnectHandler);
  //   };
  // }, []);
  
  

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
