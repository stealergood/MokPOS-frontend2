import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { useAuth } from "../helpers/AuthContext";
import { API_URL } from "../constant/Api";
import { updateProduct, deleteProduct } from "../redux/slice/productSlice";

const UpdateProduct = ({ navigation, route }) => {
  const [alerts, setAlerts] = useState({
    product_name: "",
    price: "",
    category_id: "",
    stock: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const { token, userID } = useAuth();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    product_name: "",
    price: "",
    category_id: "",
    stock: "",
    image: null,
  });

  const { product_id } = route.params;
  const products = useSelector((state) => state.product);
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    const product = products.find((product) => product.product_id === product_id);
    if (product) {
      setPayload({
        product_name: product.product_name,
        price: product.price.toString(),
        category_id: product.category_id,
        stock: product.stock.toString(),
        image: product.image ? { uri: product.image } : null,
      });
    }
  }, [product_id, products]);
  
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1000 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const base64 = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: FileSystem.EncodingType.Base64 });
      setPayload({ ...payload, image: { uri: manipResult.uri, base64 } });
    }
  };

  const updateProductHandler = async () => {
    setLoading(true);
    let hasError = false;
    const newAlerts = { ...alerts };

    if (payload.product_name === "") {
      newAlerts.product_name = "Product Name is required";
      hasError = true;
    } else {
      newAlerts.product_name = "";
    }

    if (payload.price === "") {
      newAlerts.price = "Price is required";
      hasError = true;
    } else {
      newAlerts.price = "";
    }

    if (payload.category_id === "") {
      newAlerts.category_id = "Category is required";
      hasError = true;
    } else {
      newAlerts.category_id = "";
    }

    if (payload.stock === "") {
      newAlerts.stock = "Stock is required";
      hasError = true;
    } else {
      newAlerts.stock = "";
    }

    setAlerts(newAlerts);

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/product`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userID,
          product_id: product_id,
          product_name: payload.product_name,
          price: payload.price,
          stock: payload.stock,
          category_id: payload.category_id,
          image: payload.image && payload.image.base64 ? `data:image/jpeg;base64,${payload.image.base64}` : null,
        }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        console.log("Error: ", data.message);
        setLoading(false);
        return;
      }

      dispatch(updateProduct(data.data));
      setAlerts({
        product_name: "",
        price: "",
        category_id: "",
        stock: "",
        image: "",
      });
      setLoading(false);
      navigation.navigate("ProductList");
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => deleteProductHandler() 
        }
      ],
      { cancelable: false }
    );
  };

  const deleteProductHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userID,
          product_id: product_id,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status !== "success") {
        console.log("Error: ", data.message);
        setLoading(false);
        return;
      }

      dispatch(deleteProduct(product_id));
      setLoading(false);
      navigation.navigate("ProductList");
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="w-full h-full pt-5 relative">
      <View className="w-full h-16 flex flex-row">
        <View className="w-1/5 flex justify-center items-center">
          <Pressable
            className="bg-blues h-10 w-10 rounded-lg flex justify-center items-center"
            onPress={() => navigation.navigate("ProductList")}
          >
            <Icon name="chevron-left" color="#ffff" size={34} />
          </Pressable>
        </View>

        <View className="w-4/5 flex justify-center items-center">
          <Text className="mr-16 text-blue-600 font-semibold text-2xl">
            Update Product
          </Text>
        </View>
      </View>
      <ScrollView className="w-full px-5">
        <Text className="mr-16 font-semibold text-2xl">Detail Product</Text>
        <View className="mb-5">
          <Text>Name Product</Text>
          <TextInput
            className="w-full mt-2 h-14 bg-slate-200 rounded-2xl pl-5"
            placeholder="Nama Produk"
            onChangeText={(text) =>
              setPayload({ ...payload, product_name: text })
            }
            value={payload.product_name}
          />
          {alerts.product_name !== "" && (
            <Text className="text-red-600">{alerts.product_name}</Text>
          )}
        </View>
        <View>
          <Text>Selling Price </Text>
          <TextInput
            className="w-full h-14 mt-2 bg-slate-200 rounded-2xl pl-5"
            placeholder="Harga Produk"
            onChangeText={(text) => setPayload({ ...payload, price: text })}
            value={payload.price}
          />
          {alerts.price !== "" && (
            <Text className="text-red-600">{alerts.price}</Text>
          )}
        </View>
        <View className="mt-4">
          <Text className="mr-15 font-semibold text-2xl">Add on Details</Text>
          <Pressable
            className={`w-full ${
              payload.image ? "h-fit" : "h-14"
            } mt-2 flex flex-row justify-between items-center bg-slate-200 rounded-2xl pl-5 pr-10`}
            onPress={handleChoosePhoto}
          >
            {payload.image ? (
              <View>
                <Image
                  source={{ uri: payload.image.uri }}
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <Icon name="photo" />
            )}
            <View className="w-3/6 p-4 justify-center items-center bg-slate-300 rounded-2xl">
              <Text>{payload.image ? "Change Photo" : "Choose Photo"}</Text>
            </View>
          </Pressable>
          {alerts.image !== "" && (
            <Text className="text-red-600">{alerts.image}</Text>
          )}
        </View>
        <View className="w-full h-full gap-4 mt-4">
          <View>
            <Text>Category</Text>
            <Picker
              selectedValue={payload.category_id}
              onValueChange={(itemValue) =>
                setPayload({ ...payload, category_id: itemValue })
              }
              style={{
                width: "100%",
                height: 56,
                backgroundColor: "#e2e8f0",
                borderRadius: 16,
                paddingLeft: 20,
                marginTop: 8,
              }}
            >
              <Picker.Item label="Pilih Category" value="" />
              {categories.map((category) => (
                <Picker.Item
                  key={category.category_id}
                  label={category.category_name}
                  value={category.category_id}
                />
              ))}
            </Picker>
            {alerts.category_id !== "" && (
              <Text className="text-red-600">{alerts.category_id}</Text>
            )}
          </View>
          <View className="w-full h-full">
            <Text>SKU (Stock Keeping Unit) </Text>
            <TextInput
              className="w-full h-14 mt-2 bg-slate-200 rounded-2xl pl-5"
              placeholder="Stock"
              onChangeText={(text) => setPayload({ ...payload, stock: text })}
              value={payload.stock}
            />
            {alerts.stock !== "" && (
              <Text className="text-red-600">{alerts.stock}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="py-5 w-full h-fit flex justify-center items-center gap-2">
        <Pressable
          className="h-14 w-5/6 flex justify-center items-center bg-[#0D62CA] rounded px-5"
          onPress={updateProductHandler}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffff" />
          ) : (
            <Text className="text-white">Update Product</Text>
          )}
        </Pressable>
        <Pressable 
          className="flex flex-row justify-between items-center"
          onPress={handleDeleteProduct}
        >
          <Icon name="trash" type="evilicon" color={"red"} />
          <Text className="text-red-500">Delete Product</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProduct;