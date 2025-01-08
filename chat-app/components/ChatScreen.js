import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo"; // Import NetInfo
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
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";
import { v4 as uuidv4 } from "uuid";

const ChatScreen = ({ db, route, navigation }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [image, setImage] = useState(null);

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          initialRegion={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // Connection status hook
  const netInfo = useNetInfo();

  //Monitor connection status & update state
  useEffect(() => {
    if (netInfo.isConnected) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [netInfo.isConnected]);

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
      const cachedMessages =
        JSON.parse(await AsyncStorage.getItem("messages")) || [];
      setMessages(cachedMessages);
    } catch (error) {
      console.error("Error loading cached messages:", error.message);
    }
  };

  // Handle sending a message
  const onSend = async (newMessages) => {
    console.log("newMessages", newMessages);

    if (newMessages.location) {
      let locationMessage = newMessages.location;
      locationMessage = {
        _id: uuidv4(),
        location: {
          latitude: locationMessage.latitude,
          longitude: locationMessage.longitude,
        },
        user: {
          _id: userID,
          name: name,
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, locationMessage)
      );
      return;
    }

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
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt?.toDate() || new Date(),
            user: {
              id: data.user._id,
              name: data.user.name,
            },
          };
        });
        setMessages(newMessages);
        cacheMessages(newMessages);
      });
    } else {
      disableNetwork(db);
      loadCachedMessages();
      renderInputToolbar();
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, db]);

  // Effect to sync offline messages when reconnected
  useEffect(() => {
    const syncOfflineMessages = async () => {
      if (!isConnected) {
        try {
          const cachedMessages =
            JSON.parse(await AsyncStorage.getItem("offlineMessages")) || [];
          for (const message of cachedMessages) {
            await addDoc(collection(db, "messages"), message);
          }
          await AsyncStorage.removeItem("offlineMessages");
        } catch (error) {
          console.error("Error syncing offline messages:", error.message);
        }
      }
    };
    syncOfflineMessages();
  }, [isConnected, db]);

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

  const renderCustomActions = (props) => {
    return <CustomActions onSend={onSend} {...props} />;
  };

  return (
    <View style={styles.container}>
      <Text
        accessibilityValue={{ text: "50%" }}
        style={styles.connectionStatus}
      >
        {isConnected ? "Currently Online" : "Currently Offline"}
      </Text>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <GiftedChat
        messages={messages}
        renderMessageText={renderMessageText}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderActions={renderCustomActions}
        onSend={(messages) => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {(Platform.OS === "ios" || "android") && (
        <KeyboardAvoidingView behavior="padding" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectionStatus: {
    textAlign: "center",
    padding: 10,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "right",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ChatScreen;
