import { StyleSheet, View, Text, Button } from 'react-native';

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Chat Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: 'center'
    }
  });

export default ChatScreen