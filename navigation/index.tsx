import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";
import Create from "../screens/auth/Create";
import LoginScreen from "../screens/auth/Login";
import ForgetPassword from "../screens/auth/ForgetPasswordScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import ResetPassword from "../screens/auth/ResetPasswordScreen";
import ResetSuccess from "../screens/auth/ResetSuccess";
import ChoosePilot from "../screens/registration/ChoosePilotScreen";
import PickPilot from "../screens/registration/PickPilotScreen";
import SelectPlan from "../screens/registration/SelectPlanScreen";
import Payment from "../screens/registration/PaymentScreen";
import CustomDrawer from "./CustomDrawer";
import ViewMessage from "../screens/messages/ViewMessage";
import NewMessage from "../screens/messages/NewMessage";
import RecentCalls from "../screens/RecentCalls";
import Call from "../screens/call/Call";
import Contact from "../screens/contact/Contact";
import AddContact from "../screens/contact/AddContact";
import ViewContact from "../screens/contact/ViewContact";
import EditContact from "../screens/contact/EditContact";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
 const Stack = createNativeStackNavigator<RootStackParamList>();
//  const Tab = createMaterialBottomTabNavigator();

 function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="CreateAccount" component={Create} options={{headerShown: false}} /> 
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> 
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown: false}}/>
      <Stack.Screen name="OtpScreen" component={OtpScreen} options={{headerShown: false}}/>  
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>  
      <Stack.Screen name="ResetSuccess" component={ResetSuccess} options={{headerShown: false}}/>  
      <Stack.Screen 
        name="ChoosePilot" 
        component={ChoosePilot} 
      />  
        
      <Stack.Screen 
        name="PickPilot" 
        component={PickPilot} 
      />  
      <Stack.Screen 
        name="SelectPlan" 
        component={SelectPlan} 
      />
      <Stack.Screen 
        name="Payment" 
        component={Payment} 
      />
      <Stack.Screen name="CustomDrawer" component={CustomDrawer} />  
      <Stack.Screen name="ViewMessage" component={ViewMessage} />  
      <Stack.Screen name="NewMessage" component={NewMessage} />   
      <Stack.Screen name="RecentCalls" component={RecentCalls} />   
      <Stack.Screen name="Call" component={Call} />   
      <Stack.Screen name="Contact" component={Contact} /> 
      <Stack.Screen name="AddContact" component={AddContact} />  
      <Stack.Screen name="ViewContact" component={ViewContact} />  
      <Stack.Screen name="EditContact" component={EditContact} />  
    </Stack.Navigator>
  );
}

