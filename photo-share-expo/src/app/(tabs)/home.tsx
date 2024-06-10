import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/constants'
import SearchInput from '@/src/components/SearchInput'
import Trending, { VideoDataType } from '@/src/components/Trending'
import EmptyState from '@/src/components/EmptyState'

const Home = () => {

  const [videoList, setVideoList] = useState<VideoDataType[]>([]);
  const [latestVideos, setLatestVideos] = useState<VideoDataType[]>([]);
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);
    // recall videos -> if any new videos appeared
  }

  // call useEffect, check db for data, if empty return the [], and assign videoList to the FlatList's data prop
  useEffect(() => {
    let videos = [{ id: 1 }, { id: 2 }, { id: 3 }];
    // call appwrite to get the video list and update
    // setVideoList(videos);
    setLatestVideos(videos);
  }, [])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={videoList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <Text className="text-3xl text-white">{item.id}</Text>
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