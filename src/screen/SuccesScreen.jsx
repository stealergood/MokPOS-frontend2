import { Image, Button, Pressable, Text, TextInput, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const SuccesScreen = ({navigation}) => {
  return (
    <LinearGradient colors={["#2B32B2", "#1488CC"]} start={[0, 0]} end={[1, 1]}>
      <View className="w-full h-full flex justify-around items-center px-5 pt-5">
        <View className=" w-full h-[500px] items-center mt-10  bg-white">
          <Image
            className="mt-5  "
            source={require("../../assets/Succes.png")}
          />
          <View className=" mt-5 items-center">
            <Text className="text-blue-700 font-semibold text-2xl">
              Succesfull Place Order
            </Text>
            <View className=" w-3/4">
              <Text className=" text-black text-md text-center">
                NOTE: Do not forget to give smile to customers.
              </Text>
            </View>
          </View>
          <View className="w-4/5 h-28 bg-blue-600 flex items-center rounded-2xl justify-center mt-10">
            <Text className="text-white font-semibold mb-3">
              Total Payment: Rp.25000
            </Text>
            <View className=" w-3/4 h-[1px] mb-1 bg-white"></View>
            <Text className="text-white font-semibold ">
              Payment Method: Cash
            </Text>
          </View>
        </View>
        <View className="w-full gap-5">
          <Pressable
            className=" h-16 bg-transparent border border-white flex items-center rounded-xl justify-center"
            onPress={() => navigation.navigate("")}
          >
            <Text className="text-white font-semibold">PRINT RECEIPT</Text>
          </Pressable>
          <Pressable
            className=" h-16 bg-white border border-white flex items-center rounded-xl justify-center"
            onPress={() => navigation.navigate("MainScreen")}
          >
            <Text className=" text-blue-700 font-semibold">NEXT ORDER</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SuccesScreen;
