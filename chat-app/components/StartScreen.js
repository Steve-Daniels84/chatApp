import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Background from "../assets/Background Image.png";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInAnonymously,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: "Login" });
  }, []);

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("ChatScreen", {
          userID: result.user.uid,
          backgroundColor: backgroundColor,
          name: name,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  return (
    <View style={styles.container}>
      {/* background image container  */}
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.background}
      >
        {/* App title */}
        <Text
          style={{
            marginBottom: 300,
            fontSize: 45,
            fontWeight: "600",
            color: "#FFFFFF",
          }}
        >
          Chat App
        </Text>

        {/* Main UI container */}
        <View
          style={{
            width: "88%",
            backgroundColor: "white",
            height: "44%",
            alignItems: "center",
          }}
        >
          {/* User input for name */}
          <TextInput
            style={styles.input}
            onChangeText={setName}
            placeholder="Your name"
            value={name}
            accessible={true}
            accessibilityLabel="Enter your name"
            accessibilityHint="Enter your name into this input"
            accessibilityValue={{text: name}}
          />
          {/* User background color choice */}
          <View style={styles.colorPicker}>
            <Text style={{ fontSize: 16, fontWeight: "300", color: "#787083" }}>
              Choose background colour:
            </Text>
            <View
              style={{ flex: 1, flexDirection: "row", marginTop: 10, gap: 15 }}
            >
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  {
                    backgroundColor: "#090C08",
                  },
                ]}
                onPress={() => {
                  setBackgroundColor("#090C08");
                }}
                accessible={true}
                accessibilityLabel="Set background color to black"
                accessibilityHint="Press this button to set your background color to black"
                accessibilityRole="button"
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  {
                    backgroundColor: "#474056",
                  },
                ]}
                onPress={() => {
                  setBackgroundColor("#474056");
                }}
                accessible={true}
                accessibilityLabel="Set background color to dark blue"
                accessibilityHint="Press this button to set your background color to dark blue"
                accessibilityRole="button"
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  {
                    backgroundColor: "#8A95A5",
                  },
                ]}
                onPress={() => {
                  setBackgroundColor("#8A95A5");
                }}
                accessible={true}
                accessibilityLabel="Set background color to light blue"
                accessibilityHint="Press this button to set your background color to light blue"
                accessibilityRole="button"
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  {
                    backgroundColor: "#B9C6AE",
                  },
                ]}
                onPress={() => {
                  setBackgroundColor("#B9C6AE");
                }}
                accessible={true}
                accessibilityLabel="Set background color to green"
                accessibilityHint="Press this button to set your background color to green"
                accessibilityRole="button"
              ></TouchableOpacity>
            </View>
          </View>

          <Pressable
            onPress={signInUser}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "white" : "grey",
              },
              styles.wrapperCustom,
            ]}
            accessible={true}
            accessibilityLabel="Start Chatting"
            accessibilityHint="Press this button to move to the chat screen"
            accessibilityRole="button"
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              Start Chatting
            </Text>
          </Pressable>
        </View>
        {Platform.OS === "ios" || "android" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
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
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    width: "88%",
    padding: 15,
    borderWidth: 1,
    margin: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colorPicker: {
    flex: 3,
    width: "88%",
  },
  colorChoice: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  wrapperCustom: {
    flex: 1,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});

export default StartScreen;
