import { SafeAreaView, Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { API_URL } from "../constant/Api";
import { useAuth } from "../helpers/AuthContext";
import { Icon } from "react-native-elements";
import React, { useState } from 'react'

const fetchLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON, got ${contentType}: ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    fetchLogin(email, password)
      .then((data) => {
        setLoading(false);
        signIn(data.data.accessToken);
      });
  }

  return (
    <SafeAreaView className="w-full h-ful pt-5">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable 
            className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center"
            onPress={() => navigation.navigate("Home")}
            >
            <Icon name="chevron-left" color="#ffff" size={34}/>
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">Log in</Text>
        </View>
      </View>

      <View className="w-full h-full flex p-6">
        <View className="gap-y-3">
          <View className="gap-y-2">
            <Text>Email or Phone Number</Text>
            <TextInput 
              className="w-full h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="Enter your email or phone number"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View className="gap-y-2">
            <Text>Password</Text>
            <TextInput 
              className="w-full h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="At least 8 characters"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
        </View>

        <View className=" mt-7 flex flex-col items-center">
          <View className=" w-full flex  items-end">
            <Text className="mb-1 text-blues font-semibold"> Forgot Password?</Text>
          </View>
          <Pressable 
            className="w-full bg-blues flex items-center h-14 rounded-2xl justify-center"
            onPress={handleLogin}
            >
            {loading ? <ActivityIndicator color="#ffff" /> : <Text className="text-white font-semibold">Log in</Text>}
          </Pressable>
          <View className="flex flex-row gap-x-1 mt-2">
            <Text className="">Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>

  )
}

export default LoginScreen