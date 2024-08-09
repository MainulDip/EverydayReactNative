import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
          <View style={styles.settingContainer}>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="black" />
              {/* Context Menu or React Native Popup Menu */}
            </TouchableOpacity>
            <View style={styles.settingsView}>
              <TouchableOpacity>
                <Text>LogOut</Text>
              </TouchableOpacity>
            </View>
          </View>

        )
      }} />
      <Text>Page</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  settingContainer : {
    position: "relative"
  },
  settingsView: {
    position: "absolute",
    bottom: -30,
    right: 0
  }
})

export default Page