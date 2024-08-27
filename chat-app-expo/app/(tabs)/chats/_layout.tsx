import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link, Stack, Tabs } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Page = () => {
    return (
        <>
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
                            <Link href="/(modals)/new-chat" asChild>
                                <Ionicons name="add-circle" size={24} color={Colors.primary} />
                            </Link>
                        </View>

                    )
                }} />

                <Stack.Screen name="[id]" options={{
                    title: "",
                    headerBackTitleVisible: false,
                    headerTitle: () => (
                        <View style={{
                            flexDirection: "row",
                            gap: 10,
                            paddingBottom: 4,
                            alignItems: "center"
                        }}>
                            <Image source={{
                                uri: "https://i.pravatar.cc/150?u=myrnaduke@marketoid.com"
                            }} style={{ width: 40, height: 40, borderRadius: 50 }} />

                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Someone's Name</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <TouchableOpacity>
                                <Ionicons name="videocam-outline" color={Colors.primary} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="call-outline" color={Colors.primary} size={30} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    
                }} />
            </Stack>
        </>

    )
}

export default Page