import { SafeAreaView, Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screen/LoginScreen";
import Home from "./src/screen/Home";
import Signup from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";
import AddProduct from "./src/screen/AddProduct";
import UpdateProduct from "./src/screen/UpdateProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="MainMenu" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddProduct" component={AddProduct} options={{headerShown: false}}/>
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
