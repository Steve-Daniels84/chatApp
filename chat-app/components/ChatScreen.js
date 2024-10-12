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
  const [messages, setMessages] = useState([]);

  //Brings in the navigator parameters
  const { name, backgroundColor, userID } = route.params;

  // Sets the page title
  useEffect(() => {
    navigation.setOptions({
      title: name + " " + userID,
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
          user: data.user,
        });
      });
      setMessages(newMessages);
    });
    
    // Clean up code
    return () => {
        if (unsubMessages) unsubMessages();
    }

  }, [navigation, backgroundColor, name, userID]);

  // const onSend = async (newMessages) => {
  //   const newList = await addDoc(collection(db, "messages"), newMessages)
  //   if (newList.id) {
  //     setMessages([newList, ...messages]);
  //     Alert.alert("message sent")
  //   } else {
  //     Alert.alert("Message did not send!")
  //   }
  // };

  const renderBubble = (props) => {
    return (
      <Bubble
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
            padding: 10,
          },
        }}
      />
    );
  };

  // Custom message text rendering
  const renderMessageText = (props) => {
    return (
      <Text style={{ color: backgroundColor }}>
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
          _id: userID,
          userName: name
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
