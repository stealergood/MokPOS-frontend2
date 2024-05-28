import { View, Text, Pressable, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const PaymentMethod = () => {
  return (
    <View className="w-full h-ful pt-5">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center">
            <Icon name="chevron-left" color="#ffff" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Payment Method
          </Text>
        </View>
      </View>
      <View className="justify-center border-b border-[#BDBDBD] px-5">
        <Pressable>
          <Text className="font-semibold mt-5 mb-1">Cash</Text>
        </Pressable>
      </View>
      <View className="justify-center border-b border-[#BDBDBD] px-5">
        <Pressable>
          <Text className="font-semibold mt-5 mb-1">Non Cash</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PaymentMethod