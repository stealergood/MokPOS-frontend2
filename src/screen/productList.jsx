import {   Pressable,SafeAreaView,View, Text } from 'react-native'
import React from 'react'
import { SearchBar } from "react-native-elements";

const productList = () => {
  return (
    <SafeAreaView className="w-full h-full">
      <View className="w-full h-28 flex flex-row">
        <View className="h-full w-1/6 bg-white flex justify-center items-center">
          <Text>B</Text>
        </View>
        <View className="h-full w-5/6 bg-white flex justify-center items-center">
          <Text>Product List</Text>
        </View>
      </View>
      <View className="w-full h-16 flex bg-slate-300">
        <SearchBar
          placeholder="Search name product..."
          containerStyle={{
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowColor: "#ffbf00",
            shadowOpacity: 0.1,
            elevation: 3,
          }}
          inputContainerStyle={{
            backgroundColor: "#e1e1e1",
            borderRadius: 10,
            flexDirection: "row-reverse", // Move icon to the right
          }}
          searchIcon={{ color: "#2A3256" }}
        />
      </View>

      <View className="w-full h-4/6 flex items-center bg-slate-300">
        <View className=" w-5/6 bg-[#0D62CA] rounded-[20px] px-5 py-3">
          <Text className=" text-white">Chose brand</Text>
          <Pressable>
            <Text className="text-white">All branch</Text>
          </Pressable>
        </View>
        <View className="w-full h-fit mt-5 flex flex-col items-center">
          <Pressable className=" h-20 w-5/6 flex justify-center bg-slate-200 rounded-[20px] px-5 ">
            <View className=" flex flex-row justify-between">
              <Text className="font-bold text-base"> Wagyu sate</Text>
              <Text className="font-bold"> 12rp</Text>
            </View>
            <Text>All branch</Text>
          </Pressable>
        </View>
      </View>
      <View className=" w-full h-full flex items-center bg-slate-300">
      <Pressable className="h-20 w-5/6 flex justify-center items-center bg-[#0D62CA] rounded px-5">
        <Text className="text-white">Add New product</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default productList