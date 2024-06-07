import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'

export default function App() {

  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (

    <SafeAreaView className='bg-primary'  >
      <ScrollView className="h-full" contentContainerStyle={{ flexGrow: 1 /* , 'height': '100%' */ }}>
        <View className="w-full flex-1 items-center justify-center px-4">
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='font-pregular text-sm  text-gray-100 mt-7 text-center'>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => { router.push('/(auth)/sign-in') }}
            containerStyle="mt-7"
            isLoading={false}
            textStyle={''}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}