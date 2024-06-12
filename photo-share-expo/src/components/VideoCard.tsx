import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { PostVideo } from '../lib/entities.dtype'
import { icons } from '../constants'

const VideoCard = ({ video }: { video: PostVideo }) => {

    const [play, setPlay] = useState(false);

    return (
        <View className="flex-col items-start px-4 mb-14">
            <View className="flex-row items-center w-full justify-between">
                <View className="justify-center items-center flex-row">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-05">
                        <Image source={{ uri: video.users?.avatar }} className="w-[46px] h-[46px]" resizeMode="contain" />
                    </View>
                    <View className="justify-center ml-3 gap-y-1" >
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {video.title}
                        </Text>
                        <Text className="text-xs text-gray-50 font-pregular" numberOfLines={1}>
                            {video.users?.username}
                        </Text>
                    </View>
                </View>
                <View className="p-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {/* Video Container */}
            {play ? (
                <TouchableOpacity className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    onPress={() => { setPlay(!play) }}
                >
                    <Text className="text-white ">Playing</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    activeOpacity={.7} onPress={() => { setPlay(!play) }}>
                    <Image source={{ uri: video.thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
                    <Image source={icons.play} className="absolute w-12 h-12" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard