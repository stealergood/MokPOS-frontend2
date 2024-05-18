import { Image, Button, Pressable, Text, TextInput, View } from "react-native";

import LoginPage from "./src/screen/login.jsx";

export default function App() {
  return (
    <View className="pt-8 w-full h-ful">
      <View className="w-full h-10 bg-slate-200 flex flex-row">
        <View className=" bg-blue-600 w-1/4 flex justify-center items-center">
          <Text>Logo</Text>
        </View>

        <View className=" bg-gray-400 w-full flex justify-center items-center">
          <Text className="text-blue-600">Manage Store</Text>
        </View>
      </View>

      <View className="w-full h-full flex p-6 bg-black">
        <Text className=" mb-1">Email or Phone Number</Text>
            <TextInput className=" w-full h-10 bg-slate-400  rounded-full pl-5">
              Email or Phone Number
            </TextInput>
        </View>

    </View>
  );
}
