import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'

// ** Constants 
import FontSize from '../constants/FontSize'

// ** Layouts
import Layout from '../layouts/Layout'

// ** Third Pary
import { Divider } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Fontisto from '@expo/vector-icons/Fontisto'
import BottomSheet from '../components/bottom-sheet/BottomSheet'
import { Colors, constants } from '../constants'
import Font from '../constants/Font'

//** Store and Action 
import { setSelectedTab } from '../stores/tab/tabAction'
import { connect } from 'react-redux'
import { useGetEventQuery, useGetEventsQuery } from '../stores/features/event/eventService'
import { useGetResourcesQuery } from '../stores/features/resources/resourcesService'

// ** Helpers
import { ShortenedWord } from '../helpers/wordShorther'

const conversations = [
  {
    id: 1,
    name: 'Communities',
    count: 100,
    route: 'Community'
  },
  {
    id: 2,
    name: 'Chats',
    count: 100,
    route: 'Community'
  }
]



interface ConversationCardProps {
  name: string ;
  count: number;
  id: number;
  onPress: ()=>void;
}

const ConversationCard: FC<ConversationCardProps> = ({id,name,onPress,count}) => {
  return (
    <View>
      <TouchableOpacity 
        onPress={onPress }
        key={id} 
        className='w-full h-14 border flex-row px-5 items-center justify-between mb-3 border-[#D2C2CB] rounded-xl'
      >
        <Text>{name}</Text>
        <Text>{count}+</Text>
      </TouchableOpacity>
    </View>
  )
}

type IUserProps = {
  email: string
}

type IContent = {
  id: string;
  title: string;
  filename: string; 
  email?: string
  user?: IUserProps;
}


interface IFeeds {
  title: string;
  contents: IContent[];
}

interface IEventBottomSheetModuleProps {
  id: string;
  show : boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const EventBottomSheetModule: FC<IEventBottomSheetModuleProps> = ({id, show, setShow}) => {
  const {data} = useGetEventQuery(id)

  console.log( data)
  return (
    <BottomSheet
      show={show}
      onDismiss={() => {
        setShow(false);
      }}
      height={0.85}
      enableBackdropDismiss
    >
      <View>
        {/* Image */}
        <View className='w-full h-[279px] bg-slate-400 rounded-2xl'>

        </View>
        {/*  */}
        <View className='flex-row items-center justify-between mt-4'>
          <View style={{marginLeft: 10}}>
            {/* name */}
            <Text style={styles.title}>{data?.title || "" }</Text>
            {/* incoming message type */}
            <Text style={styles.description}>{data?.user?.email || "" }</Text>
          </View>
          <View className=''>
            <Fontisto name ="bookmark" size={25} />
          </View>
        </View>
        <Divider className='my-5'/>
        <Text className='text-justify text-ktext text-sm'>
          {data?.description || ""}
        </Text>
        <Divider className='my-5'/>
        <View className='space-y-2'>
          <Text className='text-ktext text-sm'>Date: May 16 2023</Text>
          <Text className='text-ktext text-sm'>Time: 7pm </Text>
          <Text className='text-ktext text-sm'>Location: <Text className='text-ksecondary'>www.zoom.com/abaGTBmeeting </Text> </Text>
        </View>
      </View>
    </BottomSheet>
  )
} 

const Feeds: FC<IFeeds> = ({title, contents}) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  return (
    <View className='my-5'>
      {/* Header */}
      <View className='flex-row justify-between items-center'>
        <Text>{title}</Text>
        <Text className='text-ksecondary'>see more</Text>
      </View>
      <Divider className='my-4'/>
      <View className='space-y-4'>
        {
          contents?.length > 0 && contents?.map((content, index) => {
            return (
                <View className='flex-row items-center justify-between' key={index}>
                  {/* feed */}
                  <TouchableOpacity  
                    onPress={() => setSelectedItemId(content.id)} 
                    className='flex-row items-center space-x-3'>
                    {/* Image */}
                    <View className='h-12 w-12 flex items-center justify-center rounded-2xl bg-ksecondary'>
                      <Text className='text-white text-sm font-bold'>A</Text>
                    </View>
                    <View className='space-y-1'>
                      <Text className='text-kblack text-sm font-normal'><ShortenedWord word={content.title || content.filename} maxLength={30} /></Text>
                      <Text className='text-kdesc text-[11px] text-medium'>{content.email}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* more icon */}
                  <MaterialIcons name='more-vert' size={30} />

                  {/* Render EventBottomSheetModule conditionally */}
                  {selectedItemId === content.id && (
                    <EventBottomSheetModule
                      id={content.id}
                      show={true}
                      setShow={() => setSelectedItemId(null)}
                      key={content.id}
                    />
                  )}
                </View>
            )
          })
        }
      </View>
    </View>
  )
}


const NewEvents = () => {
  const {data, isError} = useGetEventsQuery()
  
   //Get all event data into the Feed Componennt
   const newEvents = [
    {
      id: 1,
      title: 'NEW EVENTS',
      contents: data?.docs.slice(0,3).map((item: IContent) => ({
        id: item.id,
        title: item.title,
        email: item.user?.email
      }))
    }
  ]

  if(isError) {
    console.log("error")
  }

  return (
    <Feeds title={newEvents[0].title} contents={newEvents[0].contents} />
  )
}

const NewResources = () => {
  const {data, isError} = useGetResourcesQuery()
  //  Get all event data into the Feed Componennt
   const newResources = [
    {
      id: 1,
      title: 'NEW RESOURCES',
      contents: data?.docs.slice(0,3).map((item: IContent) => ({
        id: item.id,
        filename: item.filename,
        email: item.user?.email
      }))
    }
  ]

  if(isError) {
    console.log("error")
  }
  console.log(data)
  
  return (
    <Feeds title={newResources[0].title} contents={newResources[0].contents} />
  )

}


const Home = ({navigation}: {navigation: any}) => {
  
  const handleConversationRoute = () => {
    setSelectedTab(constants.screens.community)
    navigation.navigate("MainLayout")
    console.log("route")
  }

  return (
    <Layout
      title='Hi, Loukia'
      navigation={navigation}
      iconName={"bell-outline"}
      iconColor="#000000"
      onPress={() => navigation.navigate("Notification")}
      drawerNav
      profileIcon
    >
      <ScrollView style={styles.container}>
        <View>
          <Text>CONVERSATIONS</Text>
          <Divider className='my-4'/>
          {
            conversations.map((conversation) => 
            <ConversationCard 
              key={conversation.id} 
              id={conversation.id} 
              name={conversation.name} 
              count={conversation.count}  
              onPress={() => {
                setSelectedTab(constants.screens.community)
                navigation.navigate("MainLayout")
                console.log("route")
              }}  
            />) 
          }
        </View>
        
        <View>
          
        </View>
        {/* New Events Feed */}
        <NewEvents />

        {/* New Resources Feed */}
        <NewResources />
        {/* <Feeds title={newResources[0].title} contents={newResources[0].contents} /> */}
      </ScrollView>
    </Layout>
  )
}

function  mapStateToProps (state: { tabReducer: { selectedTab: any } }){
  return {
      selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch:any){
  return {
  setSelectedTab: (selectedTab: any) => {
         return dispatch(setSelectedTab(selectedTab))
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
const styles = StyleSheet.create({
  // Home
  container: {
    padding: 20
  },
  // recent calls
  recentContainer: {
    width: "100%",
    height: 221,
    borderWidth: 1,
    borderRadius: FontSize.base,
    borderColor: "#EAECF0",
    paddingHorizontal: 15,
    paddingVertical: 18
  },
  title: {
    color: Colors.text,
    fontFamily: Font['inter-medium'],
    fontSize: FontSize.small
  },
  description: {
    color: Colors.gray,
    fontFamily: Font['inter-regular'],
    fontSize: FontSize.xsmall,
    lineHeight: 22
  },
})