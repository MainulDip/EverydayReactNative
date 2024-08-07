import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'

const Page = () => {
  return (
    <SafeAreaView>
      <Stack.Screen options={{
        headerTitle: "Chats",
        headerRight: () => (
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color="black" />
            {/* Now set popup menu, which will contain logout (session delete) and other setting. Add popup option: create a view with adequate sizing (hidden). Show it by callback actions */}
          </TouchableOpacity>
        )
      }} />
      <Text>Page</Text>
    </SafeAreaView>
  )
}

export default Page