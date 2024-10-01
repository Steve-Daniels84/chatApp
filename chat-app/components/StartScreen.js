import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <Text>Start Screen</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Enter your name"
        value={name}
      />
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate("ChatScreen")}
      />
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
    fontSize: "large",
  },
});

export default StartScreen;
