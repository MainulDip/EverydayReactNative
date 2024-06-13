import { View, Text, FlatList, TextStyle, ViewStyle, ImageStyle, TouchableOpacity, ImageBackground, Image, ViewToken, ViewabilityConfigCallbackPair } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useRef, useState } from 'react'
import EmptyState from './EmptyState';
import { PostVideo } from '../lib/entities.dtype';
import { CustomAnimation } from 'react-native-animatable';
import { icons } from '../constants';

type TrendingItemProps = {
    activeItem: string;
    item: PostVideo;
}

const zoomIn = {
    0: {
        scaleX: 0.9,
        scaleY: 0.9
    },
    1: {
        scaleX: 1,
        scaleY: 1
    }
}

const zoomOut: CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
    0: {
        scaleX: 1,
        scaleY: 1
    },
    1: {
        scaleX: 0.9,
        scaleY: 0.9
    }
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {

    const [play, setPlay] = useState(false);

    return (
        <Animatable.View className="mr-5"
            animation={activeItem == item.$id ? zoomIn : zoomOut}
            duration={300}
        >
            {play ? (
                <TouchableOpacity className="" onPress={() => setPlay(!play)}>
                    <ImageBackground className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40" source={{ uri: item.thumbnail }} />
                </TouchableOpacity>

            ) : (
                <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(!play)}>
                    <ImageBackground className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40" source={{ uri: item.thumbnail }} resizeMode="cover" />
                    <Image source={icons.play} className="absolute w-12 h-12" resizeMode="contain" />
                </TouchableOpacity>
            )}


        </Animatable.View>
    );
}

const Trending = ({ posts }: { posts: PostVideo[] }) => {

    const [activeItem, setActiveItem] = useState(posts[1]?.$id);
    console.log("posts[1]?.$id", activeItem, posts[1]?.$id);

    // info: ViewabilityConfigCallbackPair
    const viewableItemChanged = ({ viewableItems, changed }: {
        viewableItems: ViewToken<PostVideo>[];
        changed: ViewToken<PostVideo>[];
    }) => {
        setActiveItem(viewableItems[0].key)
        console.log(viewableItems[0].key, changed.length)
    }

    // const viewabilityConfigCallbackPairs = useRef([
    //     { viewableItemChanged },
    // ]);

    const fnref = useRef(viewableItemChanged);

    return (
        <FlatList
            keyExtractor={(item, i) => item.$id || i.toString()}
            data={posts}
            renderItem={({ item }) => (
                <>
                    <TrendingItem activeItem={activeItem!} item={item} />
                </>
            )}
            horizontal={true}
            ListEmptyComponent={() => (
                <EmptyState
                    title={'No Latest Videos Found'}
                    subtitle={'Add Your Videos'}
                />
            )}
            // onViewableItemsChanged={viewableItemChanged}
            onViewableItemsChanged={fnref.current}
            viewabilityConfig={{
                waitForInteraction: false,
                // viewAreaCoveragePercentThreshold: 70,
                itemVisiblePercentThreshold: 70
            }}
            // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentOffset={{x:70, y:0}}
        />
    )
}

export default Trending