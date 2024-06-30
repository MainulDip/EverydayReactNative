import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserPosts, logOut } from '@/src/lib/appwrite';
import { useAppwrite } from '@/src/lib/useAppwrite';
import EmptyState from '@/src/components/EmptyState';
import VideoCard from '@/src/components/VideoCard';
import { PostVideo } from '@/src/lib/entities.dtype';
import { useGlobalContext } from '@/src/context/GlobalProvider';
import { icons } from '@/src/constants';
import InfoBox from '@/src/components/InfoBox';

const Profile = () => {

  const { user: currentUser } = useGlobalContext();
  const { isLoading: isloading, data: userPostedVideos, reFetchData: reFetchUserCreatedVideos } = useAppwrite<PostVideo>(() => getUserPosts(currentUser?.$id!));

  useEffect(() => {
    // reFetchUserCreatedVideos();
    // console.log(currentUser)
  }, []);

  const handleLogOut = async () => {
    await logOut();
    router.replace("/sign-in");
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
              onPress={handleLogOut}
            >
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            {isloading && <Text className="text-white">Loading</Text>}
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image className="w-[90%] h-[90%] rounded-lg"
                source={{ uri: currentUser?.avatar }}
                resizeMode="cover" />
            </View>

            <InfoBox title={currentUser?.username!} titleStyles="text-white text-lg" containerStyle="" subtitle="" />

            <View className="flex-row"  style={{gap: 40}}>
              <InfoBox title={userPostedVideos.length.toString()} containerStyle="" subtitle="Posts" />
              <InfoBox containerStyle="" title="1.2k" subtitle="Followers" />
              <InfoBox containerStyle="" title="7.1k" subtitle="Likes" />
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