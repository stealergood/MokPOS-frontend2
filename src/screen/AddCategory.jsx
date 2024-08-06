import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { API_URL } from "../constant/Api";
import React, { useState } from "react";
import { useAuth } from "../helpers/AuthContext";
import { useDispatch } from "react-redux";
import { addCategory } from "../redux/slice/categorySlice";

const fetchAddCategory = async (category_name, user_id, token) => {
  try {
    const response = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id,
        category_name,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
    // return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const AddCategory = ({ navigation }) => {
  const [category_name, setCategoryName] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMesaaage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, userID } = useAuth();
  const user_id = userID;
  const dispatch = useDispatch();

  const categoryHandler = async () => {
    setLoading(true);

    if (category_name === "") {
      setAlertMessage("Category Name is required");
      setAlert(true);
      setLoading(false);
      return;
    } else {
      setAlert(false);
    }

    setCategoryName("");

    fetchAddCategory(category_name, user_id, token)
      .then((data) => {
        if (data.message === "Category already exists") {
          setAlertMessage("Category already exist");
          setAlert(true);
          setLoading(false);
          return;
        }
        setAlert(false);
        setLoading(false);
        const payload = [
          {
            category_id: data.data.category_id,
            category_name: data.data.category_name,
          },
        ];
        dispatch(addCategory(payload));
        navigation.navigate("CategoryList");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <View className="w-full h-full pt-5 relative">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className=" h-10 w-10 rounded-lg flex justify-center items-center"
            onPress={() => navigation.navigate("CategoryList")}
          >
            <Icon name="chevron-left" color="#1A72DD" size={34} />
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
            placeholder="Input Category Name"
            onChangeText={(text) => setCategoryName(text)}
            value={category_name}
          />
          {alert && <Text className="text-red-600">{alertMesaaage}</Text>}
        </View>
      </View>
      <View className=" w-full h-fit absolute bottom-8 flex  justify-center items-center gap-2 ">
        <Pressable
          className="h-14 w-5/6  mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5"
          onPress={categoryHandler}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffff" />
          ) : (
            <Text className="text-white">Add Category</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default AddCategory;
