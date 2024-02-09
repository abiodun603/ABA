import { View } from 'react-native'
import React from 'react'

// 
import Layout from '../../layouts/Layout'
import TopNavPanel from '../../navigation/TopTabs';
import Event from './Event';
import Past from './Past';

const TabData = [
  { name: "Past", component: Past },
  { name: "Saved Events", component: Event },
];

const SavedItems = () => {
  return (
    <Layout 
      title = "Saved Items"
    >
      <View style={{ flex: 1 }}>
        <TopNavPanel tabs={TabData} /> 
      </View>
    </Layout>
  )
}

export default SavedItems