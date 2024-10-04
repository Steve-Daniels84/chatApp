import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TextInput } from "react-native";

const ChatScreen = ({ route, navigation }) => {

    //Brings in the navigator parameters
    const { name, backgroundColor } = route.params;

    // Sets the page title
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
        <ScrollView style={{ textAlign: "left", width: "100%", padding: 10 }}>
          <Text>Test</Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TextInput placeholder="Type your message here"/>
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
