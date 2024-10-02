import { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const ChatScreen = ({ route, navigation }) => {
  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Test</Text>
      </View>
      <View  style={styles.body}>
        <Text>Chat Screen</Text>
      </View>
      <View  style={styles.footer}>
      <Text>Test</Text>
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
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "grey",
    width: '100%'
  },
  body: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: '100%'
  },
  footer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "grey",
    width: '100%'
  }
});

export default ChatScreen;
