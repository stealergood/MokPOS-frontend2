import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Animated,
  Image,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useRef } from "react";
import { SearchBar } from "react-native-elements";
import { useAuth } from "../helpers/AuthContext";

const MainScreen = ({ navigation }) => {
  const { signOut } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Initial position for the side menu

  const data = [
    { id: "1", name: "Avocado Coffe", price: 2.3 },
    { id: "2", name: "Cappucino Coffe", price: 2.3 },
    { id: "3", name: "Americano Coffe", price: 2 },
    { id: "4", name: "Banana Coffe", price: 2.3 },
  ];

  const toggleGrid = () => {
    setIsGridVisible(!isGridVisible);
  };

  const SearchComponent = () => {
    setSearchTerm(!searchTerm);
  };

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

  const renderItem = ({ item }) => (
    <View className={`${isGridVisible ? "w-[95%] h-24 m-2 self-center flex flex-row" : "w-[45%] h-52 m-2 flex flex-col"} bg-white rounded-2xl`}>
      <View className={`${isGridVisible ? "h-full w-32 bg-blue-300 rounded-2xl" : "w-full h-28 bg-blue-300 rounded-2xl"}`}></View>
      <View className={`${isGridVisible ? "w-40 h-full rounded-2xl p-3" : "w-full h-16 rounded-2xl px-3 py-1"}`}>
        <Text className="text-lg font-semibold text-wrap">{item.name}</Text>
        {isGridVisible ?
          <Text className="text-lg font-medium text-blues">${item.price}</Text>
        :
          <View className="w-full h-full flex-row justify-between items-center">
            <Text className="text-lg font-medium text-blues">${item.price}</Text>
            <Pressable className="w-8 h-8 bg-blue-600 rounded-lg justify-center">
              <Icon name="plus" type="entypo" color="#ffff" size={25} />
            </Pressable>
          </View>
        }
        
      </View>
      {isGridVisible && 
        <View className="w-20 h-full rounded-2xl justify-center items-center">
          <Pressable className="w-10 h-10 bg-blues rounded-lg justify-center items-center">
            <Icon name="plus" type="entypo" color="#ffff" size={28} />
          </Pressable>
        </View>
      }
    </View>
  );

  return (
    <SafeAreaView flex={1}>
      <Pressable onPress={closeMenu} className="w-full h-full pt-5 items-stretch">
        <View className="w-full h-16 flex flex-row">
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
        <View className="w-full h-16 flex flex-row">
          <View className="w-4/6 h-full  border-t-2 border-b-2 border-slate-200">
            <Pressable className="w-4/6 h-full flex flex-row items-center px-5 gap-x-1 border-t-2 border-b-2 border-slate-200">
              <Text>All Product</Text>
              <Icon name="down" type="antdesign" size={13} />
            </Pressable>
          </View>
          <Pressable
            onPress={SearchComponent}
            className="w-1/6 flex justify-center items-center border-t-2 border-b-2 border-l-2 border-slate-200"
          >
            <Icon name="search1" type="antdesign" size={20} />
          </Pressable>

          <Pressable
            onPress={toggleGrid}
            className="w-1/6 flex justify-center items-center border-t-2 border-b-2 border-l-2 border-slate-200"
          >
            <Icon name="list-bullet" type="foundation" />
          </Pressable>
        </View>
        {searchTerm && (
          <View className="w-full h-16">
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
              searchIcon={false}
              clearIcon={false}
            />
          </View>
        )}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: isGridVisible ? 2 : 0, paddingBottom: 5 }}
          numColumns={isGridVisible ? 1 : 2}
          columnWrapperStyle={!isGridVisible && { justifyContent: 'space-between' }}
          style={{ width: '100%', height: '100%', backgroundColor: '#D1D1D1', paddingTop: 5 }}
          key={isGridVisible ? 'grid' : 'list'}
        />
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
                <Pressable
                  onPress={() => {
                    navigation.navigate("");
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
                <Pressable 
                className="flex flex-row gap-x-2 items-center"
                onPress={() => {signOut()}}
                >
                  <Icon
                    name="storefront-outline"
                    type="ionicon"
                    color={"#ffff"}
                    size={33}
                  />
                  <Text className="text-white text-lg font-semibold">
                    Logout
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
