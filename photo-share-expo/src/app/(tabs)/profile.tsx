import { View, Text, FlatList, Image } from 'react-native'
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

const Profile = () => {

  const {user:currentUser} = useGlobalContext();
  const { isLoading: isloading, data: userPostedVideos, reFetchData: reFetchUserCreatedVideos } = useAppwrite<PostVideo>(() => getUserPosts(currentUser?.$id!));

  useEffect(() => {
    reFetchUserCreatedVideos();
  }, []);

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
          <View className="my-6 px-4 space-y-6 flex-col">
            <SearchInput />
            {isloading && <Text className="text-white">Loading</Text>}
            <Text className="text-white">You're logged in as : {currentUser?.username}', & there are {userPostedVideos.length} {userPostedVideos.length > 1 ? "results" : "result"} found on this account</Text>
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