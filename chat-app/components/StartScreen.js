import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Background from "../assets/Background Image.png";

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("")

  useEffect(() => {
    navigation.setOptions({ title: "Login" });
  }, []);

  return (
    // Main container
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

        {/* Main UI comntainer */}
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
                style={{
                  backgroundColor: "#090C08",
                  borderRadius: 20,
                  height: 40,
                  width: 40,
                }}
                onPress={() => {setBackgroundColor("#090C08")}}
              ></TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#474056",
                  borderRadius: 20,
                  height: 40,
                  width: 40,
                }}
                onPress={() => {setBackgroundColor("#474056")}}
                ></TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#8A95A5",
                  borderRadius: 20,
                  height: 40,
                  width: 40,
                }}
                onPress={() => {setBackgroundColor("#8A95A5")}}
                ></TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#B9C6AE",
                  borderRadius: 20,
                  height: 40,
                  width: 40,
                }}
                onPress={() => {setBackgroundColor("#B9C6AE")}}
                ></TouchableOpacity>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate("ChatScreen", { name: name, backgroundColor: backgroundColor })}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "white" : "grey",
              },
              styles.wrapperCustom,
            ]}
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
  input: {
    flex: 1,
    width: "88%",
    padding: 15,
    borderWidth: 1,
    margin: 15,
    marginBottom: 15,
    position: "fixed",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colorPicker: {
    flex: 3,
    position: "fixed",
    width: "88%",
  },
  wrapperCustom: {
    flex: 1,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    position: "fixed",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default StartScreen;
