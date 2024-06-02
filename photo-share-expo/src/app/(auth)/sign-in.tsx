import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/constants'
import FormField from '@/src/components/FormField'
import CustomButton from '@/src/components/CustomButton'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
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
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address" />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7" />

          <CustomButton title={'Sign In'}
            handlePress={() => { }}
            containerStyle={'mt-12'}
            isLoading={false}
            textStyle={''} />
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn