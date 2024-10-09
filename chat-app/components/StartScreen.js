import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Background from "../assets/Background Image.png";

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: "Login" });
  }, []);

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
              ></TouchableOpacity>
            </View>
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate("ChatScreen", {
                name: name,
                backgroundColor: backgroundColor,
              })
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "white" : "grey",
              },
              styles.wrapperCustom,
            ]}
            accessible={true}
            accessibilityLabel="Start Chatting"
            accessibilityHint="Press this button to move to the chat screen"
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
        {Platform.OS === "ios" || "android" ?<KeyboardAvoidingView behavior="padding" />: null}
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
