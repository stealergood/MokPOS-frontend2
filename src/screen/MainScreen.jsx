import { View, Text, SafeAreaView, Pressable, FlatList, Image} from "react-native";
import { Icon } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import { API_URL } from "../constant/Api";
import { useAuth } from "../helpers/AuthContext";
import { useDispatch } from "react-redux";
import SideMenu from "../component/sidenav/SideMenu";
import { toggleMenu } from "../redux/slice/sideMenuSlice";
import React, { useState, useEffect } from "react";

const MainScreen = ({ navigation }) => {
  const { token, userID } = useAuth();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(null);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  // console.log("Data:", data[0].image);

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
        // console.log(data);

        if(data.message == "No Product Exist"){
          setIsEmpty(true);
          return;
        }

        setData(data.data);

      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchProduct();
  }, []);

  const toggleGrid = () => {
    setIsGridVisible(!isGridVisible);
  };

  const SearchComponent = () => {
    setSearchTerm(!searchTerm);
  };

  const renderItem = ({ item }) => (
    <View className={`${isGridVisible ? "w-[95%] h-24 m-2 self-center flex flex-row" : "w-[45%] h-52 m-2 flex flex-col"} bg-white rounded-2xl`}>
      <View className={`${isGridVisible ? "h-full w-32  rounded-2xl p-2 " : "w-full h-28 rounded-2x justify-center items-center p-2"}`}>
      <Image source={require("../../assets/noImage.png")} style={{width: "100%", height: "100%"}} />
      </View>
      <View className={`${isGridVisible ? "w-40 h-full rounded-2xl p-3" : "w-full h-16 rounded-2xl px-3 py-1"}`}>
        <Text className="text-lg font-semibold text-wrap">{item.product_name}</Text>
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

        {isEmpty && (
          <View className="w-full h-96 flex justify-center items-center">
            <Text className="text-2xl text-slate-200 font-semibold">
              No Product Exist
            </Text>
          </View>
        )}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.product_id}
          contentContainerStyle={{ paddingHorizontal: isGridVisible ? 2 : 0, paddingBottom: 5 }}
          numColumns={isGridVisible ? 1 : 2}
          columnWrapperStyle={!isGridVisible && { justifyContent: 'space-between' }}
          style={{ width: '100%', height: '100%', backgroundColor: '#D1D1D1', paddingTop: 5 }}
          key={isGridVisible ? 'grid' : 'list'}
        />

        <View className="absolute bottom-5 w-full items-center">          
          <Pressable className="w-5/6 h-14 items-center flex-row justify-between bg-blues rounded py-2 px-5">
            <View className="flex-row">
              <Icon name="cart-variant" type="material-community" color="#ffff" size={28} />
              <Text className="text-white text-lg">items</Text>
            </View>
            <Text className="text-white text-lg">Total: $</Text>
          </Pressable>
        </View>
      </Pressable>
      <SideMenu navigation={navigation} />
    </SafeAreaView>
  );
};

export default MainScreen;
