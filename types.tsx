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
  GroupCat: undefined;
  GroupJoin: undefined;
  //
  OtpScreen: undefined;
  ResetPassword: undefined;
  ResetSuccess: undefined;
  ProfileNotification: undefined;
  ProfilePreview: undefined;
  EditProfile: undefined;
  Events: undefined;
  EventDetails: undefined;
  Verification: undefined;
  Resources: undefined;
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