import React, { ReactNode } from 'react'
// import { Box } from 'native-base'
import {  StyleSheet, View } from 'react-native'
import Header from './appHeader/Header'
// import { ILinearGradientProps } from "native-base/lib/typescript/components/primitives/Box/types";
// import {
//   ResponsiveValue,
//   ColorType,
// } from "native-base/lib/typescript/components/types";

// type ColorProp = {
//   ColorName: ResponsiveValue<ColorType | (string & {}) | ILinearGradientProps>;
// };

interface LayoutProps {
  children?: ReactNode;
  title: string;
  onPress?: ()=>void;
  rightNavigation?: boolean | string;
  profileIcon?: boolean
  rightNavPress?: () => void;
  navigation?: any;
  drawerNav?:  boolean;
  iconName? : any;
  iconColor? : any;
  extraOneIcon?: any
  onPressProfile?: any
}

const Layout: React.FC<LayoutProps> = ({title,profileIcon,onPressProfile, extraOneIcon,  children, iconColor,iconName , rightNavigation, navigation,drawerNav, onPress=() =>{}, rightNavPress=()=>{} }) => {

   return (
    <View style={styles.selectPlanContainer}>
      <Header title={title} iconName={iconName} onPressProfile={onPressProfile} extraOneIcon={extraOneIcon} iconColor={iconColor} profileIcon = {profileIcon} onPress={onPress} rightNavigation={rightNavigation} rightNavPress={rightNavPress} navigation={navigation} drawerNav={drawerNav}/>
      {children}
    </View>
   )
}

export default Layout

const styles = StyleSheet.create({
  selectPlanContainer: {
    flex: 1
  }
})