import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screen/LoginScreen";
import Home from "./src/screen/Home";
import Signup from "./src/screen/SignupScreen";
import MainScreen from './src/screen/MainScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="MainMenu" component={MainScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <MainScreen />
  );
}
