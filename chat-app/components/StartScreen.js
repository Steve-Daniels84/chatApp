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
        onPress={() => navigation.navigate("ChatScreen", {name: name})}
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
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
});

export default StartScreen;
