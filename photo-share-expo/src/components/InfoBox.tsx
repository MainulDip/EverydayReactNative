import { View, Text } from 'react-native'
import React from 'react'
import { Users } from '../lib/entities.dtype'

type infoBoxProps = {
    user: Users;
    containerStyle: string;
    titleStyles: string;
}


const InfoBox = ({user, containerStyle, titleStyles}: infoBoxProps) => {
  return (
    <View className={`${containerStyle}`}>
      <Text className={`${titleStyles}`}>{user.username}</Text>
    </View>
  )
}

export default InfoBox