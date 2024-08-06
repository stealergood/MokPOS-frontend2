import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { API_URL } from "../constant/Api";
import { useAuth } from "../helpers/AuthContext";
import { updateCategory, deleteCategory } from "../redux/slice/categorySlice";

const UpdateCategory = ({ navigation, route }) => {
  const { token, userID } = useAuth();
  const dispatch = useDispatch();
  const { category_id } = route.params;
  const [categoryName, setCategoryName] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryUpdate = () => {
    setLoading(true);

    if (categoryName === "") {
      setAlertMessage("Category Name is required");
      setAlert(true);
      setLoading(false);
      return;
    } else {
      setAlert(false);
    }

    const payload = {
      user_id: userID,
      category_id: category_id,
      category_name: categoryName,
    };
    
    fetch(`${API_URL}/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Category already exists") {
          setAlertMessage("Category already exists");
          setAlert(true);
          setLoading(false);
          return;
        }
        dispatch(updateCategory({ category_id: data.data.category_id, category_name: data.data.category_name }));
        setLoading(false);
        navigation.navigate("CategoryList");
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  }

  const handleCategoryDelete = () => {
    const payload = {
      user_id: userID,
      category_id: category_id,
    };

    fetch(`${API_URL}/category`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deleteCategory({ category_id: category_id }));
        navigation.navigate("CategoryList");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <View className="w-full h-full pt-5 relative">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className="h-10 w-10 rounded-lg flex justify-center items-center"
            onPress={() => navigation.navigate("CategoryList")}
          >
            <Icon name="chevron-left" color="#1A72DD" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Update Category
          </Text>
        </View>
      </View>
      <View className="w-full mt-7 flex justify-start px-5">
        <Text className="mr-16 font-semibold text-2xl">Detail Category</Text>
        <View className="mt-4">
          <Text>Category Name</Text>
          <TextInput
            className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
            placeholder="Input Category Name"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
          {alert && <Text className="text-red-500">{alertMessage}</Text>}
        </View>
      </View>
      <View className="w-full h-fit absolute bottom-5 justify-center items-center gap-2">
        <Pressable 
        className="h-14 w-5/6 mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5"
        onPress={handleCategoryUpdate}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold text-lg">Update Category</Text>}
        </Pressable>
        <Pressable 
        className="flex flex-row justify-between items-center"
        onPress={handleCategoryDelete}
        >
          <Icon name="trash" type="evilicon" color={"red"} />
          <Text className="text-red-500">Delete Category</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default UpdateCategory
