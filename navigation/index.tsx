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
import CustomDrawer from "./CustomDrawer";
import Welcome from "../screens/onboard/Welcome";
import AccountOption from "../screens/auth/AccountOption";
import ResetCode from "../screens/auth/ResetCode";
import AccountSuccess from "../screens/auth/AccountSuccess";
import IdentifySuccess from "../screens/auth/IdentifySuccess";
import ProfileNotification from "../screens/profile/profileNotification";
import ProfilePreview from "../screens/profile/ProfilePreview";
import EditProfile from "../screens/profile/EditProfile";
import Events from "../screens/events/Events";
import Resources from "../screens/resources/Resources";
import Settings from "../screens/settings/Settings";
import About from "../screens/about/About";
import Language from "../screens/language/Language";
import SavedItems from "../screens/savedItems/SavedItems";
import CommunityInvites from "../screens/community/CommunityInvites";
import SetPassword from "../screens/auth/SetPassword";
import EmailVerification from "../screens/auth/EmailVerification";
import Preview from "../screens/pdf/Preview";
import Notification from "../screens/notification/Notification";
import Identification from "../screens/auth/Identification";
import Role from "../screens/identification/Role";
import TopNavPanel from "./TopTabs";
import { AuthProvider } from "../contexts/AuthContext";
import EventDetails from "../screens/events/EventDetails";
import GroupCat from "../screens/groups/GroupCat";
import GroupJoin from "../screens/groups/GroupJoin";
import GroupConfirmation from "../screens/groups/GroupConfirmation";
import Group from "../screens/groups/Group";
import Members from "../screens/chat/Members";
import Chat from "../screens/chat/Chat";

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
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
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
      <Stack.Screen name="Welcome" component={Welcome} /> 
      <Stack.Screen name="ProfileNotification" component={ProfileNotification} /> 
      {/* Chat */}
      <Stack.Screen name="Members" component={Members} />  
      <Stack.Screen name="Chat" component={Chat} />
      {/* Group */}
      <Stack.Screen name = "Group" component={Group} />
      <Stack.Screen name = "GroupCat" component={GroupCat} />
      <Stack.Screen name = "GroupJoin" component={GroupJoin} />
      <Stack.Screen name = "GroupConfirmation" component={GroupConfirmation} />

      <Stack.Screen name="ProfilePreview" component={ProfilePreview} /> 
      <Stack.Screen name="EditProfile" component={EditProfile} /> 
      <Stack.Screen name="Events" component={Events} /> 
      <Stack.Screen name="EventDetails" component={EventDetails} /> 
      <Stack.Screen name="Resources" component={Resources} /> 
      <Stack.Screen name="Settings" component={Settings} /> 
      <Stack.Screen name="About" component={About} /> 
      <Stack.Screen name="Language" component={Language} /> 
      <Stack.Screen name="SavedItems" component={SavedItems} /> 
      <Stack.Screen name="CommunityInvites" component={CommunityInvites} /> 
      <Stack.Screen name="SetPassword" component={SetPassword} /> 
      <Stack.Screen name="EmailVerification" component={EmailVerification} /> 
      <Stack.Screen name="AccountOption" component={AccountOption} /> 
      <Stack.Screen name="CreateAccount" component={Create} /> 
      <Stack.Screen name="AccountSuccess" component={AccountSuccess} /> 
      <Stack.Screen name="IdentifySuccess" component={IdentifySuccess} /> 
      <Stack.Screen name="Login" component={LoginScreen}/> 
      <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
      <Stack.Screen name="ResetCode" component={ResetCode} />
      <Stack.Screen name="OtpScreen" component={OtpScreen}/>  
      <Stack.Screen name="ResetPassword" component={ResetPassword} />  
      <Stack.Screen name="ResetSuccess" component={ResetSuccess}/>  
      <Stack.Screen name="PdfPreview" component={Preview}/>
      <Stack.Screen name="Notification" component={Notification}/>
      <Stack.Screen name="Identification" component={Identification}/>
      {/* <Stack.Screen name="TopNavPanel" component={TopNavPanel}/> */}
      <Stack.Screen name="CustomDrawer" component={CustomDrawer} />   
    </Stack.Navigator>
  );
}

