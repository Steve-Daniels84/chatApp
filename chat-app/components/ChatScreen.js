import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo"; // Import NetInfo
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  disableNetwork,
  enableNetwork,
  serverTimestamp,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = ({ db, route, navigation }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  // Cache messages locally
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.error("Error caching messages:", error.message);
    }
  };

  // Load cached messages
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = JSON.parse(await AsyncStorage.getItem("messages")) || [];
      setMessages(cachedMessages);
    } catch (error) {
      console.error("Error loading cached messages:", error.message);
    }
  };

  // Handle sending a message
  const onSend = async (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const newMessage = {
      ...newMessages[0],
      createdAt: serverTimestamp(),
    };

    if (isConnected) {
      try {
        await addDoc(collection(db, "messages"), newMessage);
      } catch (error) {
        console.error("Error sending message to Firebase:", error.message);
      }
    } else {
      try {
        const cachedMessages =
          JSON.parse(await AsyncStorage.getItem("offlineMessages")) || [];
        cachedMessages.push(newMessage);
        await AsyncStorage.setItem(
          "offlineMessages",
          JSON.stringify(cachedMessages)
        );
        Alert.alert("Message saved offline and will sync when reconnected.");
      } catch (error) {
        console.error("Error caching offline message:", error.message);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    });
  }, []);

  // Effect to fetch messages and handle connection state
  useEffect(() => {

    let unsubMessages;

    if (isConnected) {
      enableNetwork(db);
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      unsubMessages = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate() || new Date(),
            user: {
              _id: data.user.id,
              name: data.user.name,
            },
          };
          
        });
        setMessages(newMessages);
        cacheMessages(newMessages);
      });
    } else {
      Alert.alert("Connection lost!");
      disableNetwork(db);
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, db]);

  // Effect to sync offline messages when reconnected
  useEffect(() => {
    const syncOfflineMessages = async () => {
      if (isConnected) {
        try {
          const cachedMessages =
            JSON.parse(await AsyncStorage.getItem("offlineMessages")) || [];
          for (const message of cachedMessages) {
            await addDoc(collection(db, "messages"), message);
          }
          await AsyncStorage.removeItem("offlineMessages");
          console.log("Offline messages synced to Firebase.");
        } catch (error) {
          console.error("Error syncing offline messages:", error.message);
        }
      }
    };

    syncOfflineMessages();
  }, [isConnected, db]);

  // Listen for network changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
    };
  }, []);

  // Custom render methods
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          borderColor: backgroundColor,
          backgroundColor: "white",
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

  const renderMessageText = (props) => (
    <Text style={{ color: "white" }}>{props.currentMessage.text}</Text>
  );
  const renderInputToolbar = (props) => {
    if (isConnected)
      return (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: "#f5f5f5", // Light background color
            padding: 10, // Add padding for height
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            minHeight: 80, // Set a minimum height
          }}
        />
      );
    else return null;
  };
  
  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginHorizontal: 10,
        minHeight: 40, // Adjust height
      }}
      textInputProps={{
        marginRight: 1,
      }}
    />
  );
  
  const renderSend = (props) => (
    <Send
      {...props}
      containerStyle={{
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        padding: 10,
        backgroundColor: backgroundColor, // Match the header color
        borderRadius: 20,
        height: 40,
        width: 40, // Make the button round
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>➤</Text>
    </Send>
  );

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
          name: name,
        }}
      />
      {(Platform.OS === "ios" || "android") && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;