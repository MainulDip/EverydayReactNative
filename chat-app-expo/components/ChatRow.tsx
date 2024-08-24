import { View, Text } from 'react-native'
import React, { FC } from 'react'

export type ChatRowProps = {
    item: {
        id: string;
        from: string;
        date: string;
        img: string;
        msg: string;
        read: boolean;
        unreadCount: number;
    },
    index: number;
}

const ChatRow: FC<ChatRowProps> = ({ item, index }) => {
    const { id, from, date, img, msg, read, unreadCount } = item;
    return (
        <View>
            <Text>{from}</Text>
            <Text>{date}</Text>
        </View>
    )
}

export default ChatRow