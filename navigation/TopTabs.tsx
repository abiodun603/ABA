import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
const Tab = createMaterialTopTabNavigator();

interface TabItem {
  name: string;
  component: React.ComponentType<any>;
}

interface MyTabsProps  {
  tabs: TabItem[];
  communityId?: string;
}

const TopNavPanel: React.FC<MyTabsProps> = ({ tabs , communityId}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          height: 2,
          borderRadius: 5,
          backgroundColor: '#A3229A', // Assuming Colors.primary is defined or imported correctly
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} initialParams={{ communityId }} />
      ))}
    </Tab.Navigator>
  );
}

export default TopNavPanel;