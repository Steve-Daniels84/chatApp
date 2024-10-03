import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
} from "react-native";

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: "Login" });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Start Screen</Text>
      <View
        style={{
          width: "70%",
          backgroundColor: "white",
          height: 300,
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={setName}
          placeholder="Enter your name"
          value={name}
        />

        <View style={styles.colorPicker}>

        </View>

        <Pressable
          onPress={() => navigation.navigate("ChatScreen", { name: name })}
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
              fontSize: "20",
              color: "white",
            }}
          >
            Start Chatting
          </Text>
        </Pressable>
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
  input: {
    flex: 1,
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  colorPicker: {
    flex: 5
  },
  wrapperCustom: {
    flex: 1,
    width: "88%",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default StartScreen;
