import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import originalCallLog from "@/assets/data/calls.json";
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { SegmentedControl } from '@/components/SegmentedControl';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import SwipeableRow from '@/components/SwipeableRow';
import * as Haptics from "expo-haptics";
import callLog from '@/assets/data/calls.json';
import { getItemAsync } from 'expo-secure-store';

const transition = CurvedTransition.delay(100);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const [callLog, setCallLog] = useState(originalCallLog);
  const [isEditing, setIsEditing] = useState(false);
  const [callsData, setCallsData] = useState(callLog)
  const [selectedOption, setSelectedOption] = useState("All");
  const editing = useSharedValue(-30);
  const onEdit = () => {
    let editingNew = !isEditing
    editing.value = editingNew ? 0 : -30;
    setIsEditing(editingNew);
  }

  const deleteRow = (itemId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCallLog(callLog.filter((item) => item.id !== itemId));
  }

  const animatedRowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(editing.value) }]
    };
  })



  useEffect(() => {
    if (selectedOption === "All") {
      setCallsData(callLog);
    } else {
      setCallsData(callLog.filter((item) => item.missed === true))
    }
  }, [selectedOption, callLog])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen options={{
        headerTitle: () => (<SegmentedControl options={["All", "Missed"]} selectedOption={selectedOption} onOptionPress={setSelectedOption} />),
        headerLeft: () => (
          <TouchableOpacity onPress={onEdit}>
            <Text style={{ color: Colors.primary, fontSize: 18 }}>{isEditing ? "Done" : "Edit"}</Text>
          </TouchableOpacity>
        )
      }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={defaultStyles.block}>
          <Animated.FlatList
            data={callsData}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            // itemLayoutAnimation={transition}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => deleteRow(item.id)}>
                <Animated.View
                  entering={FadeInUp.delay(index * 10)}
                  exiting={FadeOutUp}
                  style={{ flexDirection: "row", alignItems: "center" }}>

                  <AnimatedTouchableOpacity onPress={() => deleteRow(item.id)} style={[animatedRowStyle, {paddingLeft: 7}]}>
                    <Ionicons name="remove-circle" size={24} color={Colors.red} />
                  </AnimatedTouchableOpacity>

                  <Animated.View style={[defaultStyles.item, animatedRowStyle]}>
                    <Image source={{ uri: item.img }} style={styles.avatar} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text style={{ fontSize: 18, color: item.missed ? Colors.red : "#000" }}>{item.name}</Text>
                      <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons name={item.video ? "videocam" : "call"}
                          size={16} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, flex: 1 }}>
                          {item.incoming ? "Incoming" : "Outgoing"}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                      <Text style={{ color: Colors.gray }}>{format(item.date, "MM.dd.yy")}</Text>
                      <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
          />
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
})

export default Page