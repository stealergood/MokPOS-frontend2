import { View, Text } from "react-native";
import React from "react";

const addProduct = () => {
  return (
    <View className="pt-8 w-full h-ful">
      <View className="w-full h-10 bg-slate-200 flex flex-row">
        <View className=" bg-blue-600 w-1/4 flex justify-center items-center">
          <Text>B</Text>
        </View>

        <View className=" bg-gray-400 w-full flex justify-center items-center">
          <Text className="text-blue-600">Add Product</Text>
        </View>
      </View>
    </View>
  );
};

export default addProduct;
