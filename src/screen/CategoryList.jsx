import { View, Text, Pressable, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

const CategoryList = ({ navigation }) => {
  const categories = useSelector((state) => state.category);

  return (
    <View className="w-full h-full pt-5 relative">
      <View className="w-full h-16 flex flex-row border-b border-[#BDBDBD]">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable 
            className="h-10 w-10 rounded-lg flex justify-center items-center"
            onPress={() => navigation.navigate("ManageScreen")}
          >
            <Icon name="chevron-left" color="#1A72DD" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Category List
          </Text>
        </View>
      </View>
      <ScrollView
        className="w-full h-full"
      >
        {categories.length === 0 ? (
          <View className="w-full h-full items-center">
            <Text className="text-lg mt-3">Category is Empty</Text>
          </View>
        ) : (
          <View className="w-full h-full">
            {categories.map((item) => (
              <Pressable
                key={item.category_id}
                className="w-full h-14 justify-center border-b border-[#BDBDBD] px-5"
                onPress={() => {
                  navigation.navigate("UpdateCategory", { category_id: item.category_id });
                }}
              >
                <Text className="text-lg font-semibold">
                  {item.category_name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
      <View className="w-full bottom-10 absolute justify-center items-center">
        <Pressable
          onPress={() => navigation.navigate("AddCategory")}
          className="h-14 w-5/6 flex justify-center items-center bg-blue-600 rounded px-5"
        >
          <Text className="text-white font-semibold text-lg">Add Category</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryList;