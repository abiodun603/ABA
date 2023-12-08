import { View, Text } from 'react-native'
import React from 'react'
import TopNavPanel from '../../navigation/TopTabs';
import Picture from '../../views/resources/Picture';
import File from '../../views/resources/File';
import Audio from '../../views/resources/Audio';

const TabData = [
  { name: "Past", component: Picture },
  { name: "Events", component: File },
  { name: "Events", component: Audio },
];

const Resources = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopNavPanel tabs={TabData} /> 
    </View>
  )
}

export default Resources
