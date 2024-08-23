import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { OptionsMenu } from '@/components/optionsMenu'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Calls",
                headerTitleAlign: "center",
                // headerTransparent: true,
                headerLargeTitle: true,
                // headerBlurEffect: "dark",
                headerSearchBarOptions: {
                    placeholder: "Search",
                },
                headerRight: () => (
                    <TouchableOpacity>
                        <Ionicons name="call-outline" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                )
            }} />
        </Stack>
    )
}

export default Layout