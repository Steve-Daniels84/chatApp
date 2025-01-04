import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import StartScreen from "./components/StartScreen";
import ChatScreen from "./components/ChatScreen";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnCBuuQzlvnQ9T_wabtVfXSwzEg63k_-g",
  authDomain: "shopping-list-demo-a80e9.firebaseapp.com",
  projectId: "shopping-list-demo-a80e9",
  storageBucket: "shopping-list-demo-a80e9.appspot.com",
  messagingSenderId: "385441683319",
  appId: "1:385441683319:web:e72b2158e00ed2778e3372",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

// Set up navigation stack
const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ChatScreen">
          {(props) => (
            <ChatScreen db={db} {...props} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles (if needed for future use)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;