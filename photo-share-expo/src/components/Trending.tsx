import { View, Text, FlatList } from 'react-native'
import React from 'react'

export type VideoDataType = {
    id: number;
}

type TrendingVideoProps = {
    posts?: VideoDataType[];
    // posts?: Array<VideoDataType>;
}

const Trending = ({ posts }: TrendingVideoProps) => {
    return (
        <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={posts}
            renderItem={({ item }) => (
                <>
                    <Text className="text-3xl text-white">{item.id}</Text>
                </>
            )}
            horizontal={true} />
    )
}

export default Trending