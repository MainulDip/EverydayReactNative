import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/src/components/FormField'
import { PostVideo } from '@/src/lib/entities.dtype'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/src/constants'
import CustomButton from '@/src/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import { uploadUserVideoPost } from '@/src/lib/appwrite'
import { useGlobalContext } from '@/src/context/GlobalProvider'

export type VideoUploadFormFields = Pick<PostVideo,
  "title" |
  "video" |
  "thumbnail" |
  "prompt" 
>


const Create = () => {

  const [form, setForm] = useState<VideoUploadFormFields>({
    title: undefined,
    video: undefined,
    thumbnail: undefined,
    prompt: undefined
  });

  const [uploading, setUploading] = useState(false);
  const {user: currentUser} = useGlobalContext();
  // console.log(currentUser)
  const videoFileInfo = useRef<DocumentPicker.DocumentPickerAsset>();
  const thumbnailFileInfo = useRef<DocumentPicker.DocumentPickerAsset>();

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image"
        ? ["image/png", "image/jpeg"]
        : ["video/mp4", "video/gif"]
    })

    if (result.assets) {
      console.log(result)
      switch (selectType) {
        case "video":
          setForm({ ...form, video: result.assets[0].uri })
          videoFileInfo.current = result.assets[0]
          break;
        case "image":
          setForm({ ...form, thumbnail: result.assets[0].uri })
          thumbnailFileInfo.current = result.assets[0]
          break;
      }
    } else {
      Alert.alert("Empty Upload Bucket", "No file has been selected!")
    }
  }

  const submitForm = async () => {
    if (form.title && form.video && form.thumbnail && form.prompt) {
      // call appwrite to save image and video on its storage async and get the result 
      // show loading state while submitting
      // redirect to profile page and show updated video on there

      await uploadUserVideoPost({...form}, videoFileInfo.current!, thumbnailFileInfo.current!, currentUser?.$id!);
      console.log("Post Created")
    }
  }

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView className="px-4 mx-6">
        <Text className="text-2xl font-psemibold text-white">Create Videos Form</Text>
        <FormField title="Video Title" value={form.title || ""} placeholder="Give your video a catchy title!"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10" />

        <View className="mt-7 space-y2">
          <Text className="text-base text-gray-100 font-psemibold">Upload Video</Text>

          <TouchableOpacity onPress={() => {
            openPicker("video")
          }}>
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

        <View className="">
          <Text className="text-base text-gray-100 font-psemibold">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => {
            openPicker("image")
          }}>
            {
              form.thumbnail ? (
                <Image source={{ uri: form.thumbnail }} resizeMode="cover"
                  className="w-full h-64 rounded-2xl" />
              ) : (

                <View className="w-full h-16 px-4 border-2 bg-black-200 justify-center items-center rounded-2xl flex-row space-x-2">
                  <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                  <Text className="text-gray-100 font-psemibold text-sm">Choose a file</Text>
                </View>
              )
            }
          </TouchableOpacity>
        </View>

        <FormField title="Video Prompt" value={form.prompt || ""} placeholder="Provide the video generation prompt"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-10" />

        <CustomButton title="Submit" handlePress={submitForm} containerStyle="my-7" isLoading={uploading} textStyle={''} />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create