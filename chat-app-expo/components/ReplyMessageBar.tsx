import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

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
        height: 77
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
    }
});

export default ReplyMessageBar