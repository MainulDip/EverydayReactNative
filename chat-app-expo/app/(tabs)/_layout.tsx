import { View, Text, BackHandler, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useNavigation, useRouter, useSegments } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { OptionsMenu } from '@/components/optionsMenu'

const Page = () => {
  const routeSegments = useSegments();
  // console.log(routeSegments);

  // const router = useRouter();

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     if (routeSegments[2] === "[id]") {
  //       router.back();
  //     }
  //     return true;
  //   });
  // }, [routeSegments]);

return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.background
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background
        },
        headerShadowVisible: false,
        headerRight: () => <OptionsMenu />
      }}
    >
      <Tabs.Screen name="calls" options={{ title: "Calls", headerShown: false, tabBarIcon: ({ size, color }) => (<Entypo name="phone" size={size} color={color} />) }} />
      <Tabs.Screen name="chats" options={{
        title: "Chats", headerShown: false, headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="chat" size={size} color={color} />),
        tabBarStyle: { backgroundColor: Colors.background, display: routeSegments[2] === "[id]" ? "none" : "flex" }
      }} />
      <Tabs.Screen name="communities" options={{ title: "Communities", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="users" size={size} color={color} />) }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", headerShown: false, tabBarIcon: ({ size, color }) => (<Entypo name="cog" size={size} color={color} />) }} />
      <Tabs.Screen name="updates" options={{ title: "Update", headerTitleAlign: "center", tabBarIcon: ({ size, color }) => (<Entypo name="thunder-cloud" size={size} color={color} />) }} />
      {/* <Tabs.Screen name="[id]" options={{ tabBarStyle: { backgroundColor: Colors.background, display: "none"}}} /> */}
    </Tabs>
  </GestureHandlerRootView>
)
}

export default Page