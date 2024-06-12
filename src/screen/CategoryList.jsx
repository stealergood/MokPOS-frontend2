import { View, Text, Pressable, TextInput } from "react-native";
import { API_URL } from "../constant/Api";
import { useAuth } from "../helpers/AuthContext";
import { useDispatch } from "react-redux";
import { setCategoryName, setCategoryId } from "../redux/slice/categorySlice";
import { Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";

const CategoryList = ({ navigation }) => {
  const { token, userID } = useAuth();
  const [isEmpty, setIsEmpty] = useState(null);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
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
        setCategory(data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchCategory();
  });

  return (
    <View className="w-full h-ful pt-5 relative">
      <View className="w-full h-16 flex flex-row border-b border-[#BDBDBD]">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable className=" h-10 w-10 rounded-lg flex justify-center items-center">
            <Icon name="chevron-left" color="#1A72DD" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Category List
          </Text>
        </View>
      </View>
      <View className="w-full h-full">
        {isEmpty ? (
          <View className="w-full h-full items-center">
            <Text className="text-lg mt-3">Category is Empty</Text>
          </View>
        ) : (
          <View className="w-full h-full">
            {category.map((cat) => (
              <Pressable
                key={cat.category_id}
                className="w-full h-14 justify-center border-b border-[#BDBDBD] px-5"
                onPress={() => {
                  dispatch(setCategoryName(cat.category_name));
                  dispatch(setCategoryId(cat.category_id));
                  navigation.navigate("UpdateCategory");
                }}
              >
                <Text className="text-lg font-semibold">
                  {cat.category_name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <View className="w-full bottom-20 absolute justify-center items-center">
        <Pressable
          onPress={() => navigation.navigate("AddCategory")}
          className="h-14 w-5/6 flex justify-center items-center bg-blues rounded px-5"
        >
          <Text className="text-white font-semibold text-lg">Add Category</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryList;
