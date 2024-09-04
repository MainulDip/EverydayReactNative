import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { replyMessageBarHeight } from '@/constants/Chat.constants';
import Animated, { FadeInDown, useSharedValue } from 'react-native-reanimated';
import FadeInUp from 'react-native-reanimated';

type ReplyMessageBarProps = {
    clearReply: () => void;
    message: { text: string };
}

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {

    return (

        // <View style={styles.container}>
            <Animated.View style={styles.container} entering={FadeInDown} >
                <View style={styles.replyImageContainer}>
                    <MaterialCommunityIcons name="reply" style={styles.replyImage} size={20} color={Colors.primary} />
                </View>

                <ScrollView contentContainerStyle={{}}>
                <View style={styles.messageContainer}>
                    <Text>{message.text}</Text>
                </View>
                </ScrollView>

                <TouchableOpacity style={styles.crossButton} onPress={clearReply}>
                    <Ionicons name="close-circle-outline" style={styles.crossButtonIcon} />
                </TouchableOpacity>
            </Animated.View>
        // </View>



    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        height: replyMessageBarHeight,
        // display: "none"
    },
    replyImage: {
        width: 20,
        height: 20
    },
    replyImageContainer: {
        paddingLeft: 8,
        paddingRight: 7,
        borderRightWidth: 2,
        borderRightColor: "#2196F3",
        marginRight: 6,
        height: "100%",
        justifyContent: "center",
    },
    crossButtonIcon: {
        width: 24,
        height: 24,
    },
    crossButton: {
        padding: 4,
    },
    messageContainer: {
        flex: 1
    }
});

export default ReplyMessageBar