import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import callsData from "@/assets/data/calls.json";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity onPress={onEdit}>
            <Text style={{ color: Colors.primary, fontSize: 18 }}>{isEditing ? "Done" : "Edit"}</Text>
          </TouchableOpacity>
        )
      }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={callsData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View>
              <Text style={{}}>{item.name}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  )
}

export default Page