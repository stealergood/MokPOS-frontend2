import { Text, TextInput, View } from 'react-native';


export default function App() {
  return (
    <View className="pt-8 w-full h-full">
      <View className="w-full h-10 bg-slate-200 flex flex-row">
        <View className=" bg-slate-300 w-1/4 flex justify-center items-center">
          <Text>Logo</Text>
        </View>
        <View className=" bg-gray-400 w-full flex justify-center items-center">
          <Text>loggg</Text>
        </View>
      </View>

      <View className="w-full h-full bg-orange-600">
        <View className="">
          <Text>Email</Text>
          <TextInput></TextInput>
        </View>
        <View></View>
        <View></View>
      </View>
      
    </View>
  );
}

