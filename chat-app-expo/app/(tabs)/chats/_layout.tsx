import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Page = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Chats",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#fff"
                },
                headerSearchBarOptions: {
                    placeholder: "Search"
                },
                headerLeft: () => (
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <View style={{ flexDirection: "row", gap: 14 }}>
                        <TouchableOpacity>
                            <Ionicons name="camera-sharp" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                        <Link href="/" asChild>
                            <Ionicons name="add-circle" size={24} color={Colors.primary} />
                        </Link>
                    </View>

                )
            }} />
        </Stack>
    )
}

export default Page