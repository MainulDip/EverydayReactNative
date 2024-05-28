import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function App () {
  return (
    <View  className="flex-1 items-center justify-center bg-black">
      <Text>App</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{color: "blue"}}>
        Profile
      </Link>
    </View>
  )
}