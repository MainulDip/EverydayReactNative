import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/constants'
import FormField from '@/src/components/FormField'

const SignIn = () => {

  const [email, setEmail] = useState({
    email:'',
    password: ''
  })

  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo}
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white font-psemibold'>Log into Aora</Text>
          <FormField 
          title="Email"
          value={email}
          />
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn