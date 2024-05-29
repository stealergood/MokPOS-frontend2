import { SafeAreaView, Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import React from 'react'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('email', email);
    console.log('password', password);
    navigation.navigate('MainScreen');
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
            <Text className="text-white text-lg font-semibold">Login</Text>
          </Pressable>
          <View className="flex flex-row gap-x-1 mt-2">
            <Text className="">Don't have an account?</Text>
            <Pressable>
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>

  )
}

export default LoginScreen