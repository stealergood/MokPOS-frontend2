import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/helpers/AuthContext";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
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
import SuccesScreen from "./src/screen/SuccesScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { token } = useAuth();

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryList" component={CategoryList} options={{ headerShown: false }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false }} />
          <Stack.Screen name="UpdateCategory" component={UpdateCategory} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
          <Stack.Screen name="SuccesScreen" component={SuccesScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}
