import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { API_URL } from "../constant/Api";
import React, { useState } from "react";
import { useAuth } from "../helpers/AuthContext";

const fetchAddCategory = async (category_name, user_id, token) => {
  // console.log(JSON.stringify({category_name, user_id}));
  try {
    const response = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id,
        category_name,
      }),
    });

    const data = await response.json();
    return data;
    // return response;
  } catch (error) {
    console.log("Error:");
  }
};

const AddCategory = ({ navigation }) => {
  const { token, userID } = useAuth();
  const user_id = userID;
  const [category_name, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const Addcategory = async() => {

    setLoading(true);
    fetchAddCategory(category_name, user_id, token)
      .then((data) => {
        setLoading(false);
        console.log(data);
        // navigation.navigate("CategoryList");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View className="w-full h-ful pt-5">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center"
            // onPress={() => navigation.navigate("Home")}
          >
            <Icon name="chevron-left" color="#ffff" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Add Category
          </Text>
        </View>
      </View>
      <View className=" w-full mt-7 flex justify-start px-5">
        <Text className=" mr-16 font-semibold text-2xl">Detail Category</Text>
        <View className=" mt-4">
          <Text>Category Name</Text>
          <TextInput
            className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
            placeholder="Steak"
            onChangeText={(text) => setCategoryName(text)}
            value={category_name}
          />
        </View>
      </View>
      <View className=" w-full h-full flex  justify-center items-center gap-2 ">
        <Pressable
          className="h-14 w-5/6  mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5"
          onPress={Addcategory}
        >
          {loading ? <ActivityIndicator color="#ffff" /> : <Text className="text-white">Add Category</Text>}
        </Pressable>
      </View>
    </View>
  );
};

export default AddCategory;
