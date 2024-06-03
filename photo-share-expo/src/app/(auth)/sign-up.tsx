import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/constants'
import FormField from '@/src/components/FormField'
import CustomButton from '@/src/components/CustomButton'
import { Link, router } from 'expo-router'

import { createUser } from '@/src/lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all those fields")
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form);

      // set it to global context

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error :", (error as Error).message)
    } finally {
      setIsSubmitting(false);
    }

    const userCreate = await createUser(form);


  }

  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo}
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white font-psemibold'>Sign Up to Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address" />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7" />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7" />

          <CustomButton title={'Sign Up'}
            handlePress={submit}
            containerStyle={'mt-12'}
            isLoading={isSubmitting}
            textStyle={''} />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link className="text-lg font-psemibold text-secondary" href={`/sign-in`}> Sign In </Link>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp