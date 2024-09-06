import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMessage, Message, MessageProps } from 'react-native-gifted-chat'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Swipeable } from 'react-native-gesture-handler';

const ChatMessageBox = (props: MessageProps<IMessage>) => {

    const renderRightAction = (progressAnimatedValue: Animated.AnimatedInterpolation<number>) => {
        


        return (
            <View style={styles.container}>
                <View style={styles.replyImageWrapper}>
                    <MaterialCommunityIcons name="reply" size={30} color={Colors.lightPurple} />
                </View>
            </View>
        );
    }

    return (
        <Swipeable
            friction={2}
            rightThreshold={40}
            renderRightActions={renderRightAction}
        >
            <Message {...props} />
        </Swipeable>
    )
}

export default ChatMessageBox

const styles = StyleSheet.create({
    container: {
        width: 40
    },
    replyImageWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    replyImage: {
        width: 20,
        height: 20
    }
})