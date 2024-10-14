import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const ChatScreen = ({ db, route, navigation }) => {
  //Brings in the navigator parameters
  const { name, backgroundColor, userID } = route.params;

  const [messages, setMessages] = useState([]);

  // Sets the page title
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    });

    // Create Firestore query
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data();
        newMessages.push({
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(), // Convert Firestore timestamp to Date
          user: {
            _id: data.user.id,
            name: data.user.name
          }
        });
      });
      setMessages(newMessages);
    });
    
    // Clean up code
    return () => {
        if (unsubMessages) unsubMessages();
    }

  }, [navigation, backgroundColor, name, userID]);

  const onSend = async (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    let newItem = {
        ...newMessages[0],
    }
    await addDoc(collection(db, "messages"), newItem);
}

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderColor: backgroundColor,
            backgroundColor: "whitw",
            padding: 10,
          },
          left: {
            backgroundColor: backgroundColor,
            borderWidth: 1,
            padding: 10,
          },
        }}
      />
    );
  };

  // // Custom message text rendering
  const renderMessageText = (props) => {
    return (
      <Text style={{ color: backgroundColor, color: "white" }}>
        {props.currentMessage.text}
      </Text>
    );
  };

  // Custom input toolbar
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          padding: 20,
        }}
      />
    );
  };

  // Customer message text input
  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          borderRadius: 10,
          borderWidth: 1,
          padding: 5,
        }}
        textInputProps={{
          marginRight: 1,
        }}
      />
    );
  };

  // Custom send button
  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          minHeight: 60,
        }}
      />
    );
  };

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
          id: userID,
          name: name
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
