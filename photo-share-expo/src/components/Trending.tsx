import { View, Text, FlatList } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState';
import { Posts } from '../lib/entities.dtype';

export type VideoDataType = {
    id: number;
}

type TrendingVideoProps = {
    posts?: Posts[];
    // posts?: Array<VideoDataType>;
}

const Trending = ({ posts }: TrendingVideoProps) => {
    return (
        <FlatList
            keyExtractor={(item, i) => item.$id || i.toString()}
            data={posts}
            renderItem={({ item }) => (
                <>
                    <Text className="text-3xl text-white">{item.$id}</Text>
                </>
            )}
            horizontal={true} 
            // ListEmptyComponent={() => (
            //     <EmptyState 
            //     title={'No Latest Videos Found'} 
            //     subtitle={'Add Your Videos'} 
            //     />
            // )}
            
            />
    )
}

export default Trending