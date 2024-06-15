import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const { query } = useLocalSearchParams();

  console.log(query);
  return (
    <View>
      <Text className="text-white justify-center items-center">{query}</Text>
    </View>
  )
}

export default Search