import { View, Text, FlatList, TextStyle, ViewStyle, ImageStyle, TouchableOpacity, ImageBackground, Image, ViewToken, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState } from 'react'
import EmptyState from './EmptyState';
import { PostVideo } from '../lib/entities.dtype';
import { CustomAnimation } from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

type TrendingItemProps = {
    activeItem: string;
    item: PostVideo;
}

const zoomIn = {
    0: {
        scaleX: 0.77,
        scaleY: 0.77
    },
    1: {
        scaleX: 1.1,
        scaleY: 1.1
    }
}

const zoomOut: CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
    0: {
        scaleX: 1.1,
        scaleY: 1.1
    },
    1: {
        scaleX: 0.77,
        scaleY: 0.77
    }
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {

    const [play, setPlay] = useState(false);
    const cardWidth = Dimensions.get("window").width / 2;
    const cardHeight = Dimensions.get("window").height / 4;

    const handleOnPressPlay = () => {
        // console.log(item.video)
        setPlay(!play)
    }

    return (
        <Animatable.View className=""
            animation={activeItem == item.$id ? zoomIn : zoomOut}
            duration={300}
        >
            {play ? (
                <TouchableOpacity style={{ width: cardWidth, height: cardHeight }} className="relative justify-center items-center" onPress={handleOnPressPlay}>
                    <Video shouldPlay resizeMode={ResizeMode.CONTAIN} useNativeControls style={{ width: cardWidth, height: cardHeight }} source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} />
                </TouchableOpacity>

            ) : (
                <TouchableOpacity style={{ width: cardWidth, height: cardHeight }} className="relative justify-center items-center" activeOpacity={0.7} onPress={handleOnPressPlay}>
                    <ImageBackground className={`w-full h-full rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40`} source={{ uri: item.thumbnail }} resizeMode="cover" />
                    <Image source={icons.play} className="absolute w-12 h-12" resizeMode="contain" />
                </TouchableOpacity>
            )}


        </Animatable.View>
    );
}

const Trending = ({ posts }: { posts: PostVideo[] }) => {

    const [activeItem, setActiveItem] = useState(posts[1]?.$id);

    const viewableItemChanged = ({ viewableItems, changed }: {
        viewableItems: ViewToken<PostVideo>[];
        changed: ViewToken<PostVideo>[];
    }) => {
        // console.log(viewableItems[0]?.key, changed.length)
        setActiveItem(viewableItems[0]?.key)
        // console.log("viewableItems.length", viewableItems.length)
    }

    return (
        <FlatList
            keyExtractor={(item, i) => item.$id || i.toString()}
            data={posts}
            renderItem={({ item }) => (
                <View className="my-7">
                    <TrendingItem activeItem={activeItem!} item={item} />
                </View>
            )}
            horizontal={true}
            ListEmptyComponent={() => (
                <EmptyState
                    title={'No Latest Videos Found'}
                    subtitle={'Add Your Videos'}
                />
            )}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={{
                waitForInteraction: false,
                viewAreaCoveragePercentThreshold: 100,
                // itemVisiblePercentThreshold: 100 // buggy
            }}
            contentOffset={{ x: Dimensions.get('window').width / 3, y: 0 }}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={Dimensions.get("window").width / 2}

            // ListHeaderComponent={() => ()}
        />
    )
}

export default Trending