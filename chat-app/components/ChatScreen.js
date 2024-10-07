import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TextInput } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);

    //Brings in the navigator parameters
    const { name, backgroundColor } = route.params;

    // Sets the page title
    useEffect(() => {
        navigation.setOptions({ title: name });
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

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.header}>
        <Text>Conversation</Text>
      </View>
      <View style={styles.body}>
        <Text>Chat Screen</Text>
        <ScrollView style={{ textAlign: "left", width: "100%", padding: 10 }}>
          <Text>Test</Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TextInput placeholder="Type your message here"/>
      </View>
    </View>
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
  footer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
});

export default ChatScreen;
