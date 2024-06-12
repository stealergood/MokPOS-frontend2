import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { API_URL } from "../constant/Api";
import { useAuth } from "../helpers/AuthContext";

const UpdateCategory = ({ navigation }) => {
  const { token, userID } = useAuth();
  const categoryId = useSelector((state) => state.category.category_id);
  const [category_name, setCategory_name] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryUpdate = () => {
    setLoading(true);

    if (category_name === "") {
      setAlertMessage("Category Name is required");
      setAlert(true);
      setLoading(false);
      return;
    } else {
      setAlert(false);
    }

    setCategory_name("");

    const payload = {
      user_id: userID,
      category_id: categoryId,
      category_name: category_name,
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
          setAlertMessage("Category already exist");
          setAlert(true);
          setLoading(false);
          return;
        }

        setLoading(false);
        // console.log(data);
        navigation.navigate("CategoryList");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const handleCategoryDelete = () => {
    const payload = {
      user_id: userID,
      category_id: categoryId,
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
        // console.log(data);
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
      <View className=" w-full mt-7 flex justify-start px-5">
        <Text className=" mr-16 font-semibold text-2xl">Detail Category</Text>
        <View className=" mt-4">
          <Text>Category Name</Text>
          <TextInput
            className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
            placeholder="Input Category Name"
            value={category_name}
            onChangeText={(text) => setCategory_name(text)}
          />
          {alert && <Text className="text-red-500">{alertMessage}</Text>}
        </View>
      </View>
      <View className="w-full h-fit absolute bottom-5 justify-center items-center gap-2 ">
        <Pressable 
        className="h-14 w-5/6  mt-5 flex justify-center items-center bg-[#0D62CA] rounded px-5"
        onPress={handleCategoryUpdate}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold text-lg">Update Category</Text>}
        </Pressable>
        <Pressable 
        className=" flex  flex-row justify-between items-center"
        onPress={handleCategoryDelete}
        >
          <Icon name="trash" type="evilicon" color={"red"} />
          <Text className=" text-red-500">Delete Category</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default UpdateCategory