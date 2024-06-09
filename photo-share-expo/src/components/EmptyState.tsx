import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

type Props = {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: Props) => {
    return (
        <View className="flex-col justify-center items-center p-4">
            <Image className="w-[215px] h-[215px]" source={images.empty} resizeMode="contain" />
            <Text className="text-white text-2xl">{title}</Text>
            <Text className="text-white">{subtitle}</Text>
            {/* <CustomButton title={"Add Videos +"} handlePress={()=>{router.replace("/create")}} containerStyle={'my-4'} isLoading={false} textStyle={''}  /> */}
        </View>
    )
}

export default EmptyState