import { View, Text, Pressable } from 'react-native'
import React from 'react'

const manage = () => {
  return (
    <View className="w-full h-full bg-[#bdbdbd30]">
      <View className="w-full h-28 flex flex-row">
        <View className="h-full w-1/6 bg-white flex justify-center items-center">
            <Text>B</Text>
        </View>
        <View className="h-full w-5/6 bg-white flex justify-center items-center">
            <Text>Manage Store</Text>
        </View>
      </View>

      <View className="w-full h-full ">
        <View className="w-full h-40 p-6 space-y-4 ">
            <Text className="text-[#2A3256] font-semibold text-lg">Set Product</Text>
            <View className="space-y-3">
                <View className="w-full flex flex-row justify-between border-b border-[#BDBDBD]">
                    <Text className="text-[#2A3256]">Product</Text>
                    <Pressable className="">
                        <Text className="text-[#2A3256]">12 Items</Text>
                    </Pressable>
                </View>
                <View className="w-full flex flex-row justify-between border-b border-[#BDBDBD]">
                    <Text className="text-[#2A3256]">Category Product</Text>
                    <Pressable>
                        <Text className="text-[#2A3256]">0 Category</Text>
                    </Pressable>
                </View>
            </View>
        </View>
      </View>
    </View>
  )
}

export default manage