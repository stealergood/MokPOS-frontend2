import { Button, Pressable, Text, TextInput, View } from "react-native";
import React from 'react'

const login = () => {
  return (
    <View className="pt-8 w-full h-ful">
      <View className="w-full h-10 bg-slate-200 flex flex-row">
        <View className=" bg-blue-600 w-1/4 flex justify-center items-center">
          <Text>Logo</Text>
        </View>

        <View className=" bg-gray-400 w-full flex justify-center items-center">
          <Text className="text-blue-600">Log in</Text>
        </View>
      </View>

      <View className="w-full h-full flex p-6">
        <View>
          <View className=" mt-36">
            <Text className=" mb-1">Email or Phone Number</Text>
            <TextInput className=" w-full h-10 bg-slate-400  rounded-full pl-5">
              Email or Phone Number
            </TextInput>
          </View>

          <View className=" mt-6">
            <Text className=" mb-1">Password</Text>
            <TextInput className=" w-full h-10 bg-slate-400  rounded-full pl-5">
              At least 8 characters
            </TextInput>
          </View>
        </View>

        <View className=" mt-7 flex flex-col items-center">
          <View className=" w-full flex  items-end">
            <Text className="mb-1"> Forgot Password?</Text>
          </View>
          <Pressable className="w-full bg-blue-600 flex items-center h-9 rounded-full justify-center">
            <Text>Login</Text>
          </Pressable>
          <Text className=" mt-1">Don't have an account? Sign up</Text>
        </View>
      </View>
    </View>

  )
}

export default login