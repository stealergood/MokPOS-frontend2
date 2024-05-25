import { View, Text, Pressable, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const UpdateProduct = () => {
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
            Update Product
          </Text>
        </View>
      </View>
      <View className=" w-full flex justify-start px-5">
        <Text className=" mr-16 font-semibold text-2xl">Detail Product</Text>
        <View className=" mb-5">
          <Text>Name Product</Text>
          <TextInput
            className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
            placeholder="Wagyu"
          />
        </View>
        <View>
          <Text>Selling Price </Text>
          <TextInput
            className="w-full h-14 mt-2 bg-slate-200 rounded-2xl pl-5"
            placeholder="Rp.20000"
          />
        </View>
        <View className=" mt-4">
          <Text className=" mr-15 font-semibold text-2xl">
            Add on Details (Opsional)
          </Text>
          <Pressable className="w-full h-14 mt-2 flex flex-row justify-between items-center bg-slate-200 rounded-2xl pl-5 pr-10">
            <Icon name="photo" />
            <View className=" w-3/6 h-2/4 justify-center items-center bg-slate-300">
              <Text>Choose Photo</Text>
            </View>
          </Pressable>
        </View>
        <View className=" w-full flex justify-start">
          <View className=" mb-5 mt-5">
            <Text>Category</Text>
            <TextInput
              className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
              placeholder="Choose Category"
            />
          </View>
          <View>
            <Text>SKU (Stock Keeping Unit) </Text>
            <TextInput
              className="w-full h-14 mt-2 bg-slate-200 rounded-2xl pl-5"
              placeholder="P123456"
            />
          </View>
        </View>
      </View>
      <View className=" w-full h-52 flex  justify-center items-center gap-2 ">
        <Pressable className="h-14 w-5/6  mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5">
          <Text className="text-white">Update</Text>
        </Pressable>
        <Pressable className=" flex  flex-row justify-between items-center">
          <Icon name="trash" type="evilicon" color={"red"} />
          <Text className=" text-red-500">Delete Product</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UpdateProduct;
