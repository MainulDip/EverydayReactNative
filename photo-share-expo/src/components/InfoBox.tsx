/**
 * InfoBox Component | Used in Profile.tsx
 * Shows User Information, Like count of Posts, Followers, Likes, ect
 */

import { View, Text, TextProps, StyleProp, TextStyle, ViewProps } from 'react-native'
import React from 'react'

type infoBoxProps = {
  containerStyle?: string;
  titleStyles?: string;
  subtitle?: string;
  title?: string;
}


const InfoBox = ({ title, subtitle, containerStyle, titleStyles }: infoBoxProps) => {
  return (
    <View className={`${containerStyle}`}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className={`text-gray-100 text-center font-pregular ${titleStyles}`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox