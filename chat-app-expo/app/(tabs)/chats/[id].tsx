import { View, Text, ImageBackground, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Bubble, GiftedChat, IMessage, InputToolbar, InputToolbarProps, Send, SystemMessage, Time, MessageProps, BubbleProps } from 'react-native-gifted-chat';
import messageData from "@/assets/data/messages.json";
import backgroundChatPatternImg from "@/assets/images/pattern.png";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ReplyMessageBar from '@/components/ReplyMessageBar';
import { replyMessageBarHeight } from '@/constants/Chat.constants';
import ChatMessageBox from '@/components/ChatMessageBox';
import { Swipeable } from 'react-native-gesture-handler';

// export type MessageProps = {
//   _id: number;
//   text: string;
//   createdAt: Date;
//   user: {
//     _id: number;
//     name: string;
//     avatar: string;
//   }
// }

export type MessageWithReply = IMessage & {
  replyMessage?: {
    text: string
  }
}

const Page = () => {

  const [messages, setMessages] = useState<IMessage[]>([])
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const color = "#ffffff";
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  const clearReplyMessage = () => {
    // setReplyMessage(null)
  };

  const updateRowRef = useCallback((ref: any) => {
    if (ref && replyMessage && ref.props.children.props.currentMessage?._id === replyMessage._id) {
      swipeableRowRef.current = ref;
      // ref.close();
    }
  }, [replyMessage])

  const renderMessageBox = (props: MessageProps<IMessage>) => {
    return (
      <ChatMessageBox
        setReplyOnSwipeOpen={(message: IMessage | null) => {
          setReplyMessage(message);
        }}
        updateRowRef={updateRowRef}
        {...props} />
    )
  }

  const customRenderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: Colors.background, flexDirection: "column-reverse", position: "relative" }}
        renderActions={() => (
          <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name="add" color={Colors.primary} size={28} />
          </View>
        )}
        accessoryStyle={replyMessage == null ? { height: "auto" } : { height: replyMessageBarHeight }}
      />
    );
  };

  const renderAccessory = () => {
    return replyMessage && (<ReplyMessageBar message={{ text: replyMessage.text }} clearReply={clearReplyMessage} />)
  }

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      // swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage])

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),

          user: {
            _id: message.from,
            name: message.from ? "You" : "BrederAccessoryob",
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

  const onSend = useCallback((messages: MessageWithReply[] = []) => {
    console.log(replyMessage)
    if (replyMessage) {
      messages[0].replyMessage = {
        text: replyMessage.text
      }
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    setReplyMessage(null);
  }, [replyMessage]);

  const renderReplyMessageView = (props: BubbleProps<MessageWithReply>) =>
    props.currentMessage && props.currentMessage.replyMessage && (
      <View style={styles.replyMessageContainer}>
        <Text>{props.currentMessage.replyMessage.text}</Text>
        <View style={styles.replyMessageDivider} />
      </View>
    )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={backgroundChatPatternImg} style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: Colors.background }}>
        {/* Move KeyboardAvoidingView to Layout */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, paddingTop: Platform.OS === "android" ? 0 : 0 }}>
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
                  backgroundColor: Colors.white,
                },
                right: {
                  backgroundColor: Colors.lightGreen
                }
              }}
              renderTime={(props) => <Time {...props} timeTextStyle={{
                right: {
                  color: Colors.gray,
                }
              }} />}
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

            renderInputToolbar={customRenderInputToolbar}
            // renderAccessory={replyMessage == null ? undefined : rederAccessory}
            renderAccessory={renderAccessory}
            onLongPress={(context, message) => {
              setReplyMessage(message)
            }}
            messagesContainerStyle={styles.messagesContainer}
            renderMessage={renderMessageBox}
            renderCustomView={renderReplyMessageView}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.red,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "column-reverse"
  },
  replyBarContainer: {
    height: "auto",
  },
  messagesContainer: {
    flex: 1
  },
  replyMessageContainer: {
    padding: 7,
    paddingBottom: 0,
  },
  replyMessageDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingTop: 6
  }
});

export default Page