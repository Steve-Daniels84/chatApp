import { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const ChatScreen = ({ route, navigation }) => {
  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View  style={styles.body}>
        <Text>Chat Screen</Text>
        <Text value={name}></Text>
      </View>
      <View  style={styles.footer}></View>
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
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "grey"
  },
  body: {
    flex: 14,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  footer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "grey"
  }
});

export default ChatScreen;
