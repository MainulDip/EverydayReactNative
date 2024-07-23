import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
    const [code, setCode] = useState("");
    return (
        <View>
            <Text>{phone}</Text>
        </View>
    )
}

export default Page