import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import StartScreen from "./components/StartScreen";
import ChatScreen from "./components/ChatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Sets up navigation stack
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

//Initiaizes Auth with Async Storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ChatScreen"> 
          {(props) => <ChatScreen db={db} {...props}/> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
