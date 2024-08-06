import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SuccessScreen = ({ navigation, route }) => {
  const { total } = route.params;
  return (
    <LinearGradient
      colors={["#2B32B2", "#1488CC"]}
      start={[0, 0]}
      end={[1, 1]}
      className="flex-1"
    >
      <View className="flex-1 justify-between items-center px-5 py-10">
        <View className="w-full bg-white rounded-2xl shadow-lg p-5">
          <Image
            className="w-40 h-40 self-center mb-5"
            source={require("../../assets/Succes.png")}
            resizeMode="contain"
          />
          <View className=" items-center mb-5">
            <Text className="text-blue-700 text-center font-bold text-2xl mb-2">
              Successful Order Placement
            </Text>
            <Text className="text-gray-600 text-base text-center">
              NOTE: Don't forget to smile at your customers!
            </Text>
          </View>
          <View className="bg-blue-600 rounded-xl p-4">
            <Text className="text-white font-semibold text-lg text-center mb-2">
              Total Payment: Rp.{total.toLocaleString()}
            </Text>
            <View className="w-full h-[1px] bg-white mb-2" />
            <Text className="text-white font-semibold text-lg text-center">
              Payment Method: Cash
            </Text>
          </View>
        </View>
        <View className="w-full space-y-4">
          <Pressable
            className="h-14 bg-transparent border-2 border-white rounded-xl items-center justify-center"
            onPress={() => navigation.navigate("PrintReceipt")}
          >
            <Text className="text-white font-semibold text-lg">
              PRINT RECEIPT
            </Text>
          </Pressable>
          <Pressable
            className="h-14 bg-white rounded-xl items-center justify-center"
            onPress={() => navigation.navigate("MainScreen")}
          >
            <Text className="text-blue-700 font-semibold text-lg">
              NEXT ORDER
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SuccessScreen;