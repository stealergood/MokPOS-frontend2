import { View, Text, Pressable, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const CategoryList = () => {
  return (
    <View className="w-full h-ful pt-5">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center"
          >
            <Icon name="chevron-left" color="#ffff" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Category List
          </Text>
        </View>
      </View>
      <View className="justify-center border-b border-[#BDBDBD] px-5">
        <Text className="font-semibold mt-5">Steak</Text>
      </View>
      <View className="justify-center border-b border-[#BDBDBD] px-5">
        <Text className="font-semibold mt-5">Beverage</Text>
      </View>
      <View className="w-full h-full  flex justify-center items-center">
        <Pressable className="h-14 w-5/6  mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5">
          <Text className="text-white">Add Category</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryList;
