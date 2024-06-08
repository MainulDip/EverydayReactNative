import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/constants'
import SearchInput from '@/src/components/SearchInput'
import Trending from '@/src/components/Trending'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <Text className="text-3xl text-white">{item.id}</Text>
          </>
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
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

            {/* Latest Videos */}
            <View className="w-full flex-1 pt-4 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb3">
                Bismillah
              </Text>
              
              <Trending posts0={[{id:1}, {id:2}, {id: 3}]} />
            </View>

          </View>
        )}

      />
    </SafeAreaView>
  )
}

export default Home