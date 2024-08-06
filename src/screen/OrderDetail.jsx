import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Pressable, Text, View, ScrollView, Image, ToastAndroid, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../constant/Api';
import { useAuth } from '../helpers/AuthContext';
import { removeFromCart, updateCart, clearCart } from '../redux/slice/cartSlice';
import { Icon } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';

const OrderDetail = ({ navigation }) => {
  const [isPlacement, setIsPlacement] = useState('takeAway');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const cart = useSelector((state) => state.cart);
  const { token, userID } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [orderDetail, setOrderDetail] = useState({
    user_id: userID,
    product: [],
    amount: 0,
    payment: 'cash',
    placement_order: 'takeaway'
  });

  useEffect(() => {
    setOrderDetail(prevState => ({
      ...prevState,
      product: cart.map(item => ({ product_id: item.product_id, quantity: item.quantity })),
      amount: total,
      payment: paymentMethod,
      placement_order: isPlacement.toLowerCase()
    }));
  }, [cart, paymentMethod, isPlacement, total]);

  const handlePlacement = (placement) => {
    setIsPlacement(placement);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  }, [cart]);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleBackToMain = useCallback(() => {
    dispatch(updateCart(cart));
    navigation.navigate("MainScreen");
  }, [dispatch, cart, navigation]);

  const handleRemoveItem = useCallback((productId) => {
    dispatch(removeFromCart(productId));
  }, [dispatch]);

  const handlePlaceOrder = useCallback(async () => {
    setLoading(true);
    try {
      // console.log('Order Detail:', orderDetail);
      const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderDetail)
      });

      const data = await response.json();

      if (data.status === 'success') {
        ToastAndroid.show("Order Created", ToastAndroid.SHORT);
        dispatch(clearCart());
        setLoading(false);
        navigation.navigate('SuccesScreen', { total, paymentMethod: orderDetail.payment });
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      ToastAndroid.show("An error occurred while placing the order", ToastAndroid.SHORT);
      setLoading(false);
    }
  }, [orderDetail, token, dispatch, navigation]);

  return (
    <View className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-white py-8">
        <View className="flex-row items-center px-5">
          <Pressable
            className="bg-blue-500 h-10 w-10 rounded-lg justify-center items-center"
            onPress={handleBackToMain}
          >
            <Icon name="chevron-left" color="#ffffff" size={34} />
          </Pressable>
          <Text className="flex-1 text-center text-blue-600 font-semibold text-2xl">
            Order Details
          </Text>
        </View>
      </View>

      {/* Customer Info */}
      <View className="bg-white my-2 py-4 px-5 border-t border-b border-slate-200">
        <Text className="text-lg">Customer: Guest</Text>
      </View>

      {/* Order Type Selection */}
      <View className="flex-row justify-center space-x-4 my-4">
        {['takeAway', 'dine_in'].map((type) => (
          <Pressable 
            key={type}
            className={`py-2 px-4 rounded-2xl ${isPlacement === type ? 'bg-blue-500' : 'bg-slate-300'}`}
            onPress={() => handlePlacement(type)}
          >
            <Text className={isPlacement === type ? 'text-white' : 'text-black'}>
              {type === 'takeAway' ? 'Take Away' : 'Dine In'}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView className="flex-1 px-5">
        {/* Order Items */}
        {cart.map((item, index) => (
          <View key={item.product_id} className="flex-row items-center justify-between py-3 border-b border-slate-200">
            <View className="flex-row items-center space-x-4">
              <Image 
                source={{ uri: item.image }} 
                className="w-12 h-12 rounded-lg"
              />
              <View>
                <Text className="font-semibold">{item.product_name}</Text>
                <Text className="text-sm text-gray-500">Qty: {item.quantity}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text>Rp.{Number(item.price).toLocaleString()}</Text>
              <Pressable onPress={() => handleRemoveItem(item.product_id)}>
                <Icon name="trash" type="evilicon" color="red" size={24} />
              </Pressable>
            </View>
          </View>
        ))}

        {/* Subtotal */}
        <View className="flex-row justify-between items-center py-4 border-b border-slate-200">
          <Text className="text-lg font-semibold">Subtotal</Text>
          <Text className="text-lg font-semibold">Rp.{subtotal.toLocaleString()}</Text>
        </View>

        {/* Tax */}
        <View className="flex-row justify-between items-center py-4 border-b border-slate-200">
          <Text className="text-lg">Tax (10%)</Text>
          <Text className="text-lg">Rp.{tax.toLocaleString()}</Text>
        </View>

        {/* Payment Method */}
        <View className="py-4 border-b border-slate-200">
          <Text className="text-lg font-semibold mb-2">Payment Method</Text>
          <Picker
            selectedValue={paymentMethod}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            style={{ height: 50, width: '100%' }}
          >
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Non-Cash" value="non-cash" />
          </Picker>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="bg-white py-4 px-5 rounded-t-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold">Total</Text>
          <Text className="text-lg font-semibold">Rp.{total.toLocaleString()}</Text>
        </View>
        <Pressable 
          className="bg-[#0D62CA] py-4 rounded-lg items-center"
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-semibold text-lg">Place Order</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default OrderDetail;