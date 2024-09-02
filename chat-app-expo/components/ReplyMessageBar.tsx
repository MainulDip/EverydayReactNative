import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { replyMessageBarHeight } from '@/constants/Chat.constants';

type ReplyMessageBarProps = {
    clearReply: () => void;
    message: { text: string };
}

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.replyImageContainer}>
                <Ionicons name="share-outline" style={styles.replyImage} />
            </View>

            <View style={styles.messageContainer}>
                <Text>{message.text}</Text>
            </View>

            <TouchableOpacity style={styles.crossButton} onPress={clearReply}>
                <Ionicons name="close-circle-outline" style={styles.crossButtonIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        height: replyMessageBarHeight
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