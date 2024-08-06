import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Pressable, FlatList, ToastAndroid } from "react-native";
import { Image } from "expo-image";
import { Icon, SearchBar } from "react-native-elements";
import { API_URL } from "../constant/Api";
import { useAuth } from "../helpers/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slice/productSlice";
import { setCategory } from "../redux/slice/categorySlice";
import SideMenu from "../component/sidenav/SideMenu";
import { toggleMenu } from "../redux/slice/sideMenuSlice";
import { addToCart, removeFromCart } from "../redux/slice/cartSlice";

const MainScreen = ({ navigation }) => {
  const { token, userID } = useAuth();
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(null);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  const products = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/product?user_id=${userID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.message === "No Product Exist") {
          setIsEmpty(true);
          return;
        }
        dispatch(setProducts(data.data));
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/category?user_id=${userID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.message == "No Category") {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
        dispatch(setCategory(data.data));
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchProduct();
    fetchCategory();
  }, [API_URL, userID, token, dispatch]);

  const toggleGrid = () => {
    setIsGridVisible(!isGridVisible);
  };

  const SearchComponent = () => {
    setSearchTerm(!searchTerm);
  };

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const getItemQuantity = (productId) => {
    const item = cart.find(cartItem => cartItem.product_id === productId);
    return item ? item.quantity : 0;
  };

  const Total = () => {
    return cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const orderHandler = () => {
    if (cart.length === 0) {
      ToastAndroid.show("Cart is empty", ToastAndroid.SHORT);
      return;
    };
    navigation.navigate("OrderDetail");
  }

  const renderItem = ({ item }) => (
    <View
      className={`${isGridVisible ? "w-[95%] h-24 m-2 self-center flex-row" : "w-[45%] h-52 m-2 flex flex-col"} bg-white rounded-2xl`}
    >
      <View className={`${isGridVisible ? "h-full w-32 rounded-2xl p-2 " : "w-full h-28 rounded-2x justify-center items-center p-3"}`}>
        <Image source={item.image ? { uri: item.image } : require("../../assets/noImage.png")} style={{ width: "100%", height: "100%", borderRadius: 5 }} />
      </View>
      <View className={`${isGridVisible ? "w-[65%] h-full rounded-2xl p-3  flex-wrap " : "w-full h-16 rounded-2xl px-3 py-1"}`}>
        <Text className="text-lg font-semibold text-wrap">{item.product_name}</Text>
        {isGridVisible ? (
          <View className="flex-row w-full items-center justify-between space-x-2">
            <View className="w-28">
              <Text className="text-lg font-medium text-blues">Rp.{item.price}</Text>
            </View>
            {getItemQuantity(item.product_id) === 0 ? (
              <View className="flex-row gap-1">
                <Pressable 
                  className="w-9 h-9 bg-blues rounded-lg justify-center items-center"
                  onPress={() => addItemToCart(item)}
                >
                  <Icon name="plus" type="entypo" color="#ffff" size={28} />
                </Pressable>
                </View>
            ) : (
              <View className="flex-row gap-2 items-center">
              <Pressable 
                className="w-7 h-7 bg-blues rounded-lg justify-center items-center"
                onPress={() => removeItemFromCart(item.product_id)}
              >
                <Icon name="minus" type="entypo" color="#ffff" size={25} />
              </Pressable>
              <Text>{getItemQuantity(item.product_id)}</Text>
              <Pressable 
                className="w-7 h-7 bg-blues rounded-lg justify-center items-center"
                onPress={() => addItemToCart(item)}
              >
                <Icon name="plus" type="entypo" color="#ffff" size={25} />
              </Pressable>
              </View>
            )}
          </View>
        ) : (
          <View className="w-full h-full flex-row justify-between items-center">
            <Text className="text-[18px] font-medium text-blues">Rp.{item.price}</Text>
            {getItemQuantity(item.product_id) === 0 ? (
              <View className="flex-row gap-1">
                <Pressable 
                  className="w-9 h-9 bg-blue-600 rounded-lg justify-center items-center"
                  onPress={() => addItemToCart(item)}
                >
                  <Icon name="plus" type="entypo" color="#ffff" size={25} />
                </Pressable>
              </View>
            ) : (
              <View className="flex-row gap-1">
                <Pressable 
                  className="w-6 h-6 bg-blue-600 rounded-lg justify-center items-center"
                  onPress={() => removeItemFromCart(item.product_id)}
                >
                  <Icon name="minus" type="entypo" color="#ffff" size={20} />
                </Pressable>
                <Text>{getItemQuantity(item.product_id)}</Text>
                <Pressable 
                  className="w-6 h-6 bg-blue-600 rounded-lg justify-center items-center"
                  onPress={() => addItemToCart(item)}
                >
                  <Icon name="plus" type="entypo" color="#ffff" size={20} />
                </Pressable>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView flex={1}>
      <Pressable
        className="w-full h-full pt-5 relative"
        onPress={() => dispatch(toggleMenu(false))}
      >
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
            <Text className="mr-14 text-blue-600 font-semibold text-2xl">Cashier</Text>
          </View>
        </View>
        <View className="w-full h-16 flex flex-row">
          <View className="w-4/6 h-full border-t-2 border-b-2 border-slate-200">
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

        {isEmpty && (
          <View className="w-full h-96 flex justify-center items-center">
            <Text className="text-2xl text-slate-200 font-semibold">No Product Exist</Text>
          </View>
        )}

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.product_id}
          contentContainerStyle={{ paddingHorizontal: isGridVisible ? 2 : 0, paddingBottom: 5 }}
          numColumns={isGridVisible ? 1 : 2}
          columnWrapperStyle={!isGridVisible && { justifyContent: 'space-between' }}
          style={{ width: '100%', height: '100%', backgroundColor: '#D1D1D1', paddingTop: 5 }}
          key={isGridVisible ? 'grid' : 'list'}
        />

        <View className="absolute bottom-5 w-full items-center">
          <Pressable 
            className="w-5/6 h-14 items-center flex-row justify-between bg-blues rounded py-2 px-5"
            onPress={orderHandler}
          >
            <View className="flex-row">
              <Icon name="cart-variant" type="material-community" color="#ffff" size={28} />
              <Text className="text-white text-lg">{cartItemCount} items</Text>
            </View>
            <Text className="text-white text-lg">Total: Rp.{Total()}</Text>
          </Pressable>
        </View>
      </Pressable>
      <SideMenu navigation={navigation} />
    </SafeAreaView>
  );
};

export default MainScreen;