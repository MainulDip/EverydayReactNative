import { View, Text } from 'react-native'
import React from 'react'

type TrendingProps = {
    posts0 ?: {
        id: number;
    }[];
    posts?: Array<{
        id: number;
    }>;
}

const Trending = ({posts}: TrendingProps) => {
    return (
        <View>
            <Text>Trending</Text>
        </View>
    )
}

export default Trending