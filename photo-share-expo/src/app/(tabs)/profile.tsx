import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserPosts, searchPost } from '@/src/lib/appwrite';
import { useAppwrite } from '@/src/lib/useAppwrite';
import EmptyState from '@/src/components/EmptyState';
import VideoCard from '@/src/components/VideoCard';
import SearchInput from '@/src/components/SearchInput';
import { PostVideo } from '@/src/lib/entities.dtype';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import { icons } from '@/src/constants';
import InfoBox from '@/src/components/InfoBox';
import Dummy from '@/src/components/Dummy';

const Profile = () => {

  const { user: currentUser } = useGlobalContext();
  const { isLoading: isloading, data: userPostedVideos, reFetchData: reFetchUserCreatedVideos } = useAppwrite<PostVideo>(() => getUserPosts(currentUser?.$id!));

  useEffect(() => {
    // reFetchUserCreatedVideos();
    // console.log(currentUser)
  }, []);

  const logOut = () => {

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={userPostedVideos}
        keyExtractor={(item, i) => item.$id || i.toString()}
        renderItem={({ item }) => (
          <>
            <VideoCard video={item} />
          </>
        )}

        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10"
              onPress={logOut}
            >
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            {isloading && <Text className="text-white">Loading</Text>}
            <Text className="text-white">You're logged in as : {currentUser?.username}', & there are {userPostedVideos.length} {userPostedVideos.length > 1 ? "results" : "result"} found on this account</Text>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image className="w-[90%] h-[90%] rounded-lg"
                source={{ uri: currentUser?.avatar }}
                resizeMode="cover" />
            </View>

            <InfoBox title={currentUser?.username!} titleStyles="text-white text-lg" containerStyle="" subtitle="" />

            <View className="flex-row gap-x-4">

              <Dummy />
              <Dummy />

              {/* <InfoBox title="1.2k" containerStyle="flex-row gap-x-4" subtitle="Posts" />
              <View className="w-7" />
              <InfoBox containerStyle="flex-row gap-x-4" title="1.2k" subtitle="Followers" /> */}
            </View>

          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title={'No Videos Found'}
            subtitle={'Add Your Videos'} />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile