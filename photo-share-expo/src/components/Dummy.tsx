/**
 * Testing Component
 */

import { View, Text } from 'react-native'
import React from 'react'

const Dummy = () => {
    return (
        <View className="" style={{columnGap: 4}}>
            <View><Text className="text-white">Hello</Text></View>
            <View><Text className="text-white">World</Text></View>
        </View>
    )
}

export default Dummy