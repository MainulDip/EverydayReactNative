import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = () => {
  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView className="">
        <View>
          <Text className="text-white">Create Videos Form</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create