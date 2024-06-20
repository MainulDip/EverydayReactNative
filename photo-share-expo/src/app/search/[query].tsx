import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchPost } from '@/src/lib/appwrite';
import { useAppwrite } from '@/src/lib/useAppwrite';
import EmptyState from '@/src/components/EmptyState';
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