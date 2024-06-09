import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: Props) => {
    return (
        <View className="flex-1 justify-center items-center p-4">
            <Text className="text-white text-2xl">{title}</Text>
            <Text className="text-white">{subtitle}</Text>
        </View>
    )
}

export default EmptyState