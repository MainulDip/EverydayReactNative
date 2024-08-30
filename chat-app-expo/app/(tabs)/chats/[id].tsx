import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Bubble, GiftedChat, IMessage, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat';
import messageData from "@/assets/data/messages.json";
import backgroundChatPatternImg from "@/assets/images/pattern.png";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

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
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: Colors.background }}
        renderActions={() => (
          <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name="add" color={Colors.primary} size={28} />
          </View>
        )}
      />
    );
  };

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
    <ImageBackground source={backgroundChatPatternImg} style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: Colors.background }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={(props) => <SystemMessage {...props} textStyle={{ color: Colors.red }} />}
        renderBubble={(props) => <Bubble {...props}
          textStyle={{
            right: {
              color: "#000"
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: "#fff",
            },
            right: {
              backgroundColor: Colors.lightGreen
            }
          }}
        />}

        renderSend={(props) => (
          <View
            style={{
              height: 44,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              paddingHorizontal: 14,
            }}>
            {text === '' && (
              <>
                <Ionicons name="camera-outline" color={Colors.primary} size={28} />
                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
              </>
            )}
            {text !== '' && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}>
                <Ionicons name="send" color={Colors.primary} size={28} />
              </Send>
            )}
          </View>
        )}

        renderInputToolbar={renderInputToolbar}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});

export default Page