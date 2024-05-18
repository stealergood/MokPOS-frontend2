import { Image, Button, Pressable, Text, TextInput, View } from "react-native";
import React from "react";

export default function App() {
  return (
    <View className="pt-8 w-full h-ful mt-10">
      <View className="w-full h-20 bg-slate-200 flex flex-row justify-center">
        <Image source={require("./assets/MokPOS.png")} />
      </View>

      <View className="w-full h-[400px] bg-slate-200 flex flex-row justify-center items-center">
        <Image source={require("./assets/Hero.png")} />
      </View>

      <View className="w-full h-20 bg-slate-200 flex flex-row justify-center">
        <Text>Easy Management For your Store.</Text>
      </View>

      <View className="w-full h-28 flex justify-around bg-slate-200">
        <Pressable className="w-full h-10 bg-blue-600 flex items-center  rounded-full justify-center">
          <Text>Create new account</Text>
        </Pressable>

        <Pressable className="w-full h-10 bg-white flex items-center rounded-full justify-center">
          <Text>Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}
