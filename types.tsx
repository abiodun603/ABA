import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: undefined,
  AccountOption: undefined,
  AccountSuccess: undefined,
  IdentifySuccess: undefined,
  Identification: undefined,
  Login: undefined;
  CreateAccount: undefined;
  SetPassword: undefined;
  EmailVerification: undefined;
  ForgetPassword: undefined;
  AddContact: undefined;
  ResetCode: undefined;
  PdfPreview: undefined;
  // Groups
  Group: undefined;
  GroupConfirmation: undefined;
  GroupCat: undefined;
  PersonalGroups: undefined;
  GroupJoin: any;
  //Chats
  Members: any;
  Chat: any;
  ChatCommunity: any;
  // Resources
  //
  OtpScreen: any;
  ResetPassword: any;
  ResetSuccess: undefined;
  ProfileNotification: undefined;
  ProfilePreview: undefined;
  EditProfile: undefined;
  //*** */
  Events: undefined;
  EventDetails: undefined;
  EventCat: undefined;
  EventFilter: undefined;
  PersonalEvents: undefined;
  //***** */
  Verification: undefined;
  Resources: any;
  TopNavPanel: undefined;
  Settings:undefined;
  About: undefined;
  SavedItems: undefined;
  CommunityInvites: undefined;
  Notification: undefined;
  Message: undefined;
  Language: undefined;
  ViewResult: undefined;
  Payment: undefined;
  Active: undefined;
  CustomDrawer: undefined;
  ViewMessage: undefined;
  NewMessage: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;