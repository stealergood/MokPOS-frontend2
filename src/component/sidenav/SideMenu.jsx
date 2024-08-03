// SideMenu.js
import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useAuth } from "../../helpers/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/slice/sideMenuSlice";

const SideMenu = ({ navigation }) => {
  const { signOut } = useAuth();
  const dispatch = useDispatch();
  const isMenuVisible = useSelector((state) => state.sideMenu.isMenuVisible);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const openMenu = () => {
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
    }).start();
  };

  useEffect(() => {
    isMenuVisible ? openMenu() : closeMenu();
  }, [isMenuVisible]);


  return (
    isMenuVisible && (
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
              <Image source={require("../../../assets/MokPOS-w.png")} />
              <Text className="font-semibold text-xl text-white">My Store</Text>
            </View>
            <View className="justify-between h-full px-4 py-7">
              <View className="w-full h-64 gap-y-4">
                <Pressable
                  onPress={() => {
                    dispatch(toggleMenu(false));
                    navigation.navigate("MainScreen");
                  }}
                  className="flex flex-row gap-x-2 items-center"
                >
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
                <Pressable
                  className="flex flex-row gap-x-2 items-center"
                  onPress={() => {
                    dispatch(toggleMenu(false));
                    navigation.navigate("ManageScreen");
                  }}
                >
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
              <Pressable
                className="flex flex-row gap-x-2 items-center mb-20"
                onPress={() => {
                  signOut();
                }}
              >
                <Icon
                  name="logout"
                  type="simple-icon"
                  color={"#ffff"}
                  size={33}
                />
                <Text className="text-white text-lg font-semibold">Logout</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </View>
    )
  );
};

export default SideMenu;
