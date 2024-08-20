import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {
    setIsEditing(!isEditing);
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity onPress={onEdit}>
            <Text style={{color: Colors.primary, fontSize: 18}}>{isEditing ? "Done" : "Edit"}</Text>
          </TouchableOpacity>
        )
      }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">

      </ScrollView>
    </View>
  )
}

export default Page