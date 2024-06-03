import { SafeAreaView, Pressable, Text, TextInput, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screen/LoginScreen";
import Home from "./src/screen/Home";
import Signup from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";
import AddProduct from "./src/screen/AddProduct";
import UpdateProduct from "./src/screen/UpdateProduct";
import CategoryList from "./src/screen/CategoryList";
import AddCategory from "./src/screen/AddCategory";
import UpdateCategory from "./src/screen/UpdateCategory";
import PaymentMethod from "./src/screen/PaymentMethod";
import ProductList from "./src/screen/ProductList";
import OrderDetail from "./src/screen/OrderDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddProduct" component={AddProduct} options={{headerShown: false}}/>
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{headerShown: false}}/>
        <Stack.Screen name="CategoryList" component={CategoryList} options={{headerShown: false}}/>
        <Stack.Screen name="AddCategory" component={AddCategory} options={{headerShown: false}}/>
        <Stack.Screen name="UpdateCategory" component={UpdateCategory} options={{headerShown: false}}/>
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{headerShown: false}}/>
        <Stack.Screen name="ProductList" component={ProductList} options={{headerShown: false}}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>


  );
}
