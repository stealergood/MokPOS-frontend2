import { View, Text, Pressable, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/slice/sideMenuSlice";
import SideMenu from "../component/sidenav/SideMenu";
import React from "react";

const ManageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const products = useSelector((state) => state.product);

  return (
    <SafeAreaView flex={1}>
      <Pressable
      className="w-full h-full pt-5 items-stretch"
      onPress={() => dispatch(toggleMenu(false))}
      >
        <View className="w-full h-full bg-[#bdbdbd30]">
          <View className="w-full h-16 flex flex-row">
            <View className="w-1/5 flex justify-center items-center">
              <Pressable
                className="h-10 w-10 rounded-lg flex justify-center items-center"
                onPress={() => dispatch(toggleMenu(true))}
              >
                <Icon name="menu" type="feather" color="#1A72DD" size={30} />
              </Pressable>
            </View>
            <View className="w-4/5 flex justify-center items-center">
              <Text className="mr-14 text-blue-600 font-semibold text-2xl">
                Cashier
              </Text>
            </View>
          </View>

          <View className="w-full h-full ">
            <View className="w-full h-40 p-6 space-y-4 ">
              <Text className="text-[#2A3256] font-semibold text-lg">
                Set Product
              </Text>
              <View className="space-y-3">
                <Pressable 
                className="w-full flex flex-row justify-between border-b border-[#BDBDBD]"
                onPress={() => navigation.navigate("ProductList")}
                >
                  <Text className="text-[#2A3256]">Product</Text>
                  <View className="">
                    <Text className="text-[#2A3256]">{products.length} Items</Text>
                  </View>
                </Pressable>
                <Pressable 
                className="w-full flex flex-row justify-between border-b border-[#BDBDBD]"
                onPress={() => navigation.navigate("CategoryList")}
                >
                  <Text className="text-[#2A3256]">Category Product</Text>
                  <View>
                    <Text className="text-[#2A3256]">{categories.length} Category</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
      <SideMenu navigation={navigation} />
    </SafeAreaView>
  );
};

export default ManageScreen;
