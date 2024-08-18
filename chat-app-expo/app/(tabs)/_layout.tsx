import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'

const Page = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen name="chats" options={{ title: "Chats", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="chat" size={size} color={color} />) }} />
        <Tabs.Screen name="calls" options={{ title: "Calls", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="phone" size={size} color={color} />) }} />
        <Tabs.Screen name="communities" options={{ title: "Communities", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="users" size={size} color={color} />) }} />
        <Tabs.Screen name="settings" options={{ title: "Settings", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="cog" size={size} color={color} />) }} />
        <Tabs.Screen name="updates" options={{ title: "Update", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="thunder-cloud" size={size} color={color} />) }} />
      </Tabs>
    </GestureHandlerRootView>
  )
}

export default Page