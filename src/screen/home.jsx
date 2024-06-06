import { Image, Button, Pressable, Text, TextInput, View } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View className="pt-5 w-full h-full">
      <View className="w-full h-[80%]">
        <View className="w-full h-32 flex items-center justify-center">
          <Image source={require("../../assets/MokPOS.png")} />
        </View>

        <View className="w-full h-[500px] flex justify-center items-center gap-y-6">
          <Image source={require("../../assets/Hero.png")} />
          <Text>Easy Management For your Store.</Text>
        </View>
      </View>

      <View className="w-full h-[20%] flex justify-around items-center">
        <Pressable
          className="w-5/6 h-14 bg-blue-600 flex items-center  rounded-2xl justify-center"
          onPress={() => navigation.navigate('Signup')}
          >
          <Text className="text-white font-semibold">Create new account</Text>
        </Pressable>

        <Pressable 
          className="w-5/6 h-14 bg-white flex items-center rounded-2xl justify-center border border-blues"
          onPress={() => navigation.navigate('SuccesScreen')}
          >
          <Text className="text-blues font-semibold">Log in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
