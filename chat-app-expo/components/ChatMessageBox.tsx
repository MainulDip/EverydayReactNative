import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMessage, isSameUser, isSameDay, Message, MessageProps } from 'react-native-gifted-chat'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Swipeable } from 'react-native-gesture-handler';

type ChatMessageBoxProps = {
    setReplyOnSwipeOpen: (message: IMessage | null) => void;
    updateRowRef: (ref: any) => void;
} & MessageProps<IMessage>


const ChatMessageBox = ({ setReplyOnSwipeOpen, updateRowRef, ...props }: ChatMessageBoxProps) => {
    
    const isNextMyMessage = props.currentMessage && props.nextMessage && isSameUser(props.currentMessage, props.nextMessage) && isSameDay(props.currentMessage, props.nextMessage)

    const renderRightAction = (progressAnimatedValue: Animated.AnimatedInterpolation<number>) => {

        const size = progressAnimatedValue.interpolate({
            inputRange: [0, 1, 100],
            outputRange: [0, 1, 1]
        })

        const trans = progressAnimatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, -4, -16]
        })

        return (
            <Animated.View style={[
                styles.container,
                { transform: [{ scale: size }, { translateX: trans }] },
                isNextMyMessage ? styles.defaultBottomOffset : styles.bottomOffsetNext,
                props.position === "right" && styles.leftOffset
            ]}>
                <View style={styles.replyImageWrapper}>
                    <MaterialCommunityIcons name="reply" size={30} color={Colors.lightPurple} />
                </View>
            </Animated.View>
        );
    }

    return (
        <Swipeable
            ref={updateRowRef}
            friction={2}
            rightThreshold={20}
            renderRightActions={renderRightAction}
            onSwipeableOpen={(_, swipeable) => {
                setReplyOnSwipeOpen(props.currentMessage)
                setTimeout(() => {
                    swipeable.close();
                }, 100);
            }}
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
    },
    defaultBottomOffset: {
        marginBottom: 2,
    },
    bottomOffsetNext: {
        marginBottom: 10
    },
    leftOffset: {
        marginLeft: 16
    }
})