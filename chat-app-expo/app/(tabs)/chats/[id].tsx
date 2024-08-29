import { View, Text, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import messageData from "@/assets/data/messages.json";
import backgroundChatPatternImg from "@/assets/images/pattern.png";

export type MessageProps = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  }
}

const Page = () => {

  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),

          user: {
            _id: message.from,
            name: message.from ? "You" : "Bob",
            avatar: message.img,
          },
        }
      }),
      {
        _id: 0,
        system: true,
        text: "Hi",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot"
        }
      }
    ])
  }, [])

  const onSend = useCallback((messages: any = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <ImageBackground source={backgroundChatPatternImg} style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </ImageBackground>
  )
}

export default Page