import { View, Text, ScrollView, RefreshControl, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllPosts, getLatestPosts, searchPost } from '@/src/lib/appwrite';
import { isLoading } from 'expo-font';
import { useAppwrite } from '@/src/lib/useAppwrite';
import EmptyState from '@/src/components/EmptyState';
import Trending from '@/src/components/Trending';
import { images } from '@/src/constants';
import VideoCard from '@/src/components/VideoCard';
import SearchInput from '@/src/components/SearchInput';
import { PostVideo } from '@/src/lib/entities.dtype';

const Search = () => {

  const { query } = useLocalSearchParams<{ query: string }>();
  const { isLoading: searchIsloading, data: searchRes, reFetchData: reFetchNewSearch } = useAppwrite<PostVideo>(() => searchPost(query!));

  useEffect(() => {
    reFetchNewSearch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchRes}
        keyExtractor={(item, i) => item.$id || i.toString()}
        renderItem={({ item }) => (
          <>
            <VideoCard video={item} />
          </>
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 flex-col">
            {/* <View className="justify-between items-start flex-row md-6">
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
            </View> */}
            <SearchInput />
            {searchIsloading && <Text className="text-white">Loading</Text>}
            <Text className="text-white">You Searched : {query}, there are {searchRes.length} {searchRes.length > 1 ? "results" : "result"} found</Text>
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

export default Search