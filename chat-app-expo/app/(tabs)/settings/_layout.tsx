import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { OptionsMenu } from '@/components/optionsMenu'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            title: "Settings", 
            headerTitleAlign: "center",
            headerLargeTitle: true,
            headerSearchBarOptions: {
                placeholder: "Search",
            }
            }} />
    </Stack>
  )
}

export default Layout