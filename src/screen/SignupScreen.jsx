import { SafeAreaView, Pressable, Text, TextInput, View } from "react-native";

import { API_URL } from "../constant/api";
import { Icon } from "react-native-elements";
import React, { useState } from "react";

const Signup = ({ navigation }) => {
  const [store_name, onChangestore_name] = useState("");
  const [email, onChangeEmail] = useState("");
  const [phone, onChangephone] = useState("");
  const [password, onChangePassword] = useState("");

  const handleSignup = async () => {
    // const data = JSON.stringify({
    //   store_name,
    //   email,
    //   phone,
    //   password,
    // });
    // console.log(data);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_name,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="pt-8 w-full h-full">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center"
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="chevron-left" color="#ffff" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Sign Up
          </Text>
        </View>
      </View>

      <View className="w-full h-full flex p-6">
        <View className="gap-y-3">
          <View className="gap-y-2">
            <Text>Store Name</Text>
            <TextInput
              className="w-full h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="Enter your store name"
              onChangeText={onChangestore_name}
              value={store_name}
            />
          </View>

          <View className="gap-y-2">
            <Text>Email</Text>
            <TextInput
              className="w-full h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="Enter your email"
              onChangeText={onChangeEmail}
              value={email}
            />
          </View>

          <View className="gap-y-2">
            <Text>Phone Number</Text>
            <TextInput
              className="w-full h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="Enter your phone number"
              onChangeText={onChangephone}
              value={phone}
            />
          </View>

          <View className="gap-y-2">
            <Text>Password</Text>
            <TextInput
              className="w-full h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="Enter your password"
              onChangeText={onChangePassword}
              value={password}
            />
          </View>
        </View>

        <View className=" mt-7 flex flex-col items-center">
          <Pressable
            className="w-full bg-blues flex items-center h-14 rounded-2xl justify-center"
            onPress={handleSignup}
          >
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
