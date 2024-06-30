import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/constants'
import SearchInput from '@/src/components/SearchInput'
import Trending from '@/src/components/Trending'
import EmptyState from '@/src/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/src/lib/appwrite'
import { PostVideo } from '@/src/lib/entities.dtype'
import { useAppwrite } from '@/src/lib/useAppwrite'
import VideoCard from '@/src/components/VideoCard'

const Home = () => {

  // fetch data using the custom hook
  const { isLoading, data, reFetchData } = useAppwrite<PostVideo>(getAllPosts);
  const { isLoading: latestPostIsLoading, data: latestVideos, reFetchData: reFetchLatestPost } = useAppwrite<PostVideo>(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await reFetchData();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item, i) => item.$id || i.toString()}
        renderItem={({ item }) => (
          <>
            <VideoCard video={item} />
          </>
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 flex-col">
            <View className="justify-between items-start flex-row md-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Bismillah</Text>
                <Text className="text-2xl font-psemibold text-white" >Aora app</Text>
              </View>

              <View className="mt-1.5">
                <Image source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            {/* Latest Videos | Horizontal Sliding */}
            <View className="w-full flex-col justify-center items-center pt-4 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb3">
                Latest Videos Horizontal Sliders
              </Text>
              <Trending posts={latestVideos} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title={'No Videos Found'}
            subtitle={'Add Your Videos'} />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
    </SafeAreaView>
  )
}

export default Home