import { View, Text } from 'react-native'
import React from 'react'

const FormField = ({title, value}: {title: string; value: {email: string; password: string;} }) => {
  return (
    <View className='space-y-2'>
      <Text className='text-white font-psemibold'>FormField</Text>
    </View>
  )
}

export default FormField