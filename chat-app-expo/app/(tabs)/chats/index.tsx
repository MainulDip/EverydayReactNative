import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated';
import chatData from "@/assets/data/chats.json";
import { defaultStyles } from '@/constants/Styles';
import ChatRow from '@/components/ChatRow';

const Page = () => {

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={defaultStyles.block}>
        <Animated.FlatList
          data={chatData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          // itemLayoutAnimation={transition}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
          renderItem={({ item, index }) => (
            <ChatRow item={item} index={index} />
          )}
        >
        </Animated.FlatList>
      </View>

    </ScrollView>
  )
}

export default Page