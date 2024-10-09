import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar, Composer, Send, MessageText } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  //Brings in the navigator parameters
  const { name, backgroundColor } = route.params;

  // Sets the page title
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    });
    setMessages([
      {
        _id: 1,
        text: "Hello Developer!",
        created: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return <Bubble 
      {...props}
      wrapperStyle={{
        right: {
          borderColor: backgroundColor,
          backgroundColor: "white",
          padding: 10,
        },
        left: {
          backgroundColor: "grey",
          borderWidth: 1,
          padding: 10
        }
      }}
    />
  }

  // Custom message text rendering
  const renderMessageText = (props) => {
    return (
      <Text style={{color: backgroundColor}}>
        {props.currentMessage.text}
      </Text>
    );
  };


  const renderInputToolbar = (props) => {
    return <InputToolbar 
    {...props}
    containerStyle={{
      padding: 20
    }}
    />
  }

  const renderComposer = (props) => {
    return <Composer 
    {...props}
    textInputStyle={{
      borderRadius: 10,
      borderWidth: 1,
      padding: 5,
    }}
    textInputProps={{
      marginRight: 1
    }}
    />
  }

  const renderSend = (props) => {
    return <Send 
    {...props}
    containerStyle={{
      minHeight: 60
    }}
    />
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderMessageText={renderMessageText}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        style={{}}
      />
      {Platform.OS === "ios" || "android" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
