import { View, Text, Pressable, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const UpdateCategory = () => {
  return (
    <View className="w-full h-ful pt-5">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center"
            // onPress={() => navigation.navigate("Home")}
          >
            <Icon name="chevron-left" color="#ffff" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Update Category
          </Text>
        </View>
      </View>
      <View className=" w-full mt-7 flex justify-start px-5">
        <Text className=" mr-16 font-semibold text-2xl">Detail Category</Text>
        <View className=" mt-4">
          <Text>Category Name</Text>
          <TextInput
            className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
            placeholder="Steak"
          />
        </View>
      </View>
      <View className=" w-full h-full flex  justify-center items-center gap-2 ">
        <Pressable className="h-14 w-5/6  mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5">
          <Text className="text-white">Add Category</Text>
        </Pressable>
        <Pressable className=" flex  flex-row justify-between items-center">
          <Icon name="trash" type="evilicon" color={"red"} />
          <Text className=" text-red-500">Delete Category</Text>
        </Pressable>
        </View>
    </View>
  )
}

export default UpdateCategory