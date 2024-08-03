import {   Pressable, SafeAreaView, View, Text, FlatList } from 'react-native'
import { Icon } from 'react-native-elements';
import React from 'react'
import { SearchBar } from "react-native-elements";

const ProductList = ({ navigation }) => {
  const data = [
    {id: 1, name: "Wagyu sate", price: 12, category: "All category"},
    {id: 2, name: "Wagyu sate2", price: 13, category: "All branch"},
  ]

  const renderItem = ({ item }) => (
    <View className="w-full h-fit mt-5 flex flex-col items-center">
      <Pressable className=" h-20 w-5/6 flex justify-center bg-white rounded-[20px] px-5 ">
        <View className=" flex flex-row justify-between">
          <Text className="font-bold text-base">{item.name}</Text>
          <Text className="font-bold">${item.price}</Text>
        </View>
        <Text>{item.category}</Text>
      </Pressable>
    </View> 
  )

  return (
    <SafeAreaView className="w-full h-full py-5 relative">
      <View className="w-full h-16 flex flex-row border-b border-[#BDBDBD]">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable 
          className=" h-10 w-10 rounded-lg flex justify-center items-center"
          onPress={() => navigation.navigate("ManageScreen")}
          >
            <Icon name="chevron-left" color="#1A72DD" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Product List
          </Text>
        </View>
      </View>

      <View className="w-full h-16 flex">
        <SearchBar
          placeholder="Search name product..."
          containerStyle={{
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowColor: "#ffbf00",
            shadowOpacity: 0.1,
          }}
          inputContainerStyle={{
            backgroundColor: "#e1e1e1",
            borderRadius: 10,
            flexDirection: "row-reverse", // Move icon to the right
          }}
          searchIcon={{ color: "#2A3256" }}
        />
      </View>

      <View className="w-full h-full flex items-center bg-[#F6F7F9]">
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ width: "100%" }}
        />
      </View>
      <View className="w-full bottom-10 absolute items-center">
        <Pressable className="h-14 w-5/6 flex justify-center items-center bg-[#0D62CA] rounded px-5">
          <Text className="text-white">Add New product</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ProductList