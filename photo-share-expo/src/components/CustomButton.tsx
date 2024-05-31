import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { isLoading } from 'expo-font';

type btnProps = {
    title: string;
    handlePress: () => void;
    containerStyle: string;
    isLoading: boolean;
    textStyle: string;
}

const CustomButton = ({ title, handlePress, containerStyle, isLoading, textStyle }: btnProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={`bg-secondary px-4 pt-3 pb-2 items-center rounded ${containerStyle} ${ isLoading ? "opacity-50" : ""}`}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton