import { Image, Button, Pressable, Text, TextInput, View } from "react-native";

import LoginPage from "./src/screen/login.jsx";

export default function App() {
  return (
    <View className="pt-8 w-full h-ful mt-10">
      <View className="w-full h-20 bg-slate-200 flex flex-row justify-center">
          <Image source={require("./assets/MokPOS.png")} />
        </View>
      </View>
  );
}
