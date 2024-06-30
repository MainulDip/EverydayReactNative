import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/src/components/FormField'
import { PostVideo } from '@/src/lib/entities.dtype'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/src/constants'

const Create = () => {

  const [form, setForm] = useState<PostVideo>({
    title: undefined,
    video: undefined,
    thumbnail: undefined,
    prompt: undefined
  });

  const [uploading, setUploading] = useState(false);

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView className="px-4 mx-6">
        <Text className="text-2xl font-psemibold text-white">Create Videos Form</Text>
        <FormField title="Video Title" value={form.title || ""} placeholder="Give your video a catchy title!"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10" />

        <View className="mt-7 space-y2">
          <Text className="text-base text-gray-100 font-psemibold">Upload Video</Text>
          <TouchableOpacity>
            {
              form.video ? (
                <Video source={{ uri: form.video }} className="w-full h-64 rounded-2xl"
                  useNativeControls
                  resizeMode={ResizeMode.COVER} />
              ) : (<View className="w-full h-40 px-4 bg-black-100 justify-center items-center rounded-2xl">
                <View className="w-14 h-14 border border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" />
                </View>
              </View>)
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create