import {useEffect} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ChatScreen = ({route, navigation}) => {

    const { name } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
      }, []);

    return (
        <View style={styles.container}>
            <Text>Chat Screen</Text>
            <Text value={name}></Text>
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