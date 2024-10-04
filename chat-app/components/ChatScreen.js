import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";

const ChatScreen = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.header}>
        <Text>Conversation</Text>
      </View>
      <View style={styles.body}>
        <Text>Chat Screen</Text>
        <ScrollView style={{ textAlign: "left", width: "100%" }}>
          <Text>Test</Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Text>Menu</Text>
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
    width: "100%",
  },
  body: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  footer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
});

export default ChatScreen;
