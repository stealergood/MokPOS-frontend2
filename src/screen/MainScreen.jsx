import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Animated,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useRef } from "react";

const MainScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Initial position for the side menu

  const toggleMenu = () => {
    if (isMenuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsMenuVisible(false);
    });
  };

  return (
    <SafeAreaView>
      <Pressable onPress={closeMenu} className="w-full h-full pt-5">
        <View className="w-full h-16 flex flex-row border-b-2 border-slate-200">
          <View className="w-1/5 flex justify-center items-center">
            <Pressable
              className="h-10 w-10 rounded-lg flex justify-center items-center"
              onPress={toggleMenu}
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
        <View className="w-full h-full bg-latar"></View>
      </Pressable>

      {isMenuVisible && (
        <View
          className="pt-5"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{ transform: [{ translateX: slideAnim }] }}
              className="absolute h-full w-64 bg-blues shadow-lg"
            >
              <View className="p-4 border-b border-gray-200">
                <Image source={require("../../assets/MokPOS-w.png")} />
                <Text className="font-semibold text-xl text-white">
                  My Store
                </Text>
              </View>
              <View className="px-4 py-7 gap-y-5">
                <Pressable className="flex flex-row gap-x-2 items-center">
                  <Icon
                    name="cash-register"
                    type="material-community"
                    color={"#ffff"}
                    size={35}
                  />
                  <Text className="text-white text-lg font-semibold">
                    Cashier
                  </Text>
                </Pressable>
                <Pressable className="flex flex-row gap-x-2 items-center">
                  <Icon
                    name="storefront-outline"
                    type="ionicon"
                    color={"#ffff"}
                    size={33}
                  />
                  <Text className="text-white text-lg font-semibold">
                    Manage Store
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
