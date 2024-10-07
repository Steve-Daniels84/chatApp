import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TextInput } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);

    //Brings in the navigator parameters
    const { name, backgroundColor } = route.params;

    // Sets the page title
    useEffect(() => {
        navigation.setOptions({ 
          title: name,
          headerStyle: {
            backgroundColor: backgroundColor
          }
         });
        setMessages([
          {
            _id: 1,
            text: "Hello Developer!",
            created: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          }
        ]);
    }, []);

    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

  return (

      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
      style={{}}
    />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  body: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
});

export default ChatScreen;
