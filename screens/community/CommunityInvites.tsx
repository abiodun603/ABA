import { View } from 'react-native'
import React from 'react'

// 
import Layout from '../../layouts/Layout'
import TopNavPanel from '../../navigation/TopTabs';
import Sent from './Sent';

//
import Recieved from './Recieved';

const TabData = [
  { name: "Received", component: Recieved },
  { name: "Sent", component: Sent },
];

const CommunityInvites = () => {
  return (
    <Layout 
      title = "Community Invites"
    >
      <View style={{ flex: 1 }}>
        <TopNavPanel tabs={TabData} /> 
      </View>
    </Layout>
  )
}

export default CommunityInvites
