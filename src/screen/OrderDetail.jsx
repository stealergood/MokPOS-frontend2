import { SafeAreaView, Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import React,{ useState } from 'react'

const OrderDetail = () => {
    const [isPlacement, setIsPlacement] = useState('takeAway');

    const handlePlacement = (placement) => {
        setIsPlacement(placement);
    };

  return (
    <View className="w-full h-ful pt-5 relative bg-slate-100">
      <View className="w-full h-16 flex flex-row bg-white">
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
            Order Details
          </Text>
        </View>
      </View>
      <View className="w-full h-16 mb-5 bg-white">
        <View className=" h-full w-full flex flex-row justify-between items-center px-5 gap-x-1 border-t border-b border-slate-200">
          <Text>Customer</Text>
        </View>
      </View>
      <View className=" w-2/3 h-16 flex flex-row justify-between px-5 bg-slate-100">
        <Pressable 
        className={`h-10 w-28 flex flex-row justify-center items-center ${isPlacement == 'takeAway' ? 'bg-blue-500' : 'bg-slate-300'} rounded-2xl  gap-x-1`}
        onPress={() => handlePlacement('takeAway')}
        >
          <Text className={`${isPlacement == 'takeAway' ? 'text-white' : 'text-black'}`}>Take Away</Text>
        </Pressable>
        <Pressable 
        className={`h-10  w-24 flex flex-row justify-center items-center ${isPlacement == 'dineIn' ? 'bg-blue-500' : 'bg-slate-300'} rounded-2xl  gap-x-1`}
        onPress={() => handlePlacement('dineIn')}
        >
          <Text className={`${isPlacement == 'dineIn' ? 'text-white' : 'text-black'}`}>Dine in</Text>
        </Pressable>
      </View>
      <View className=" w-full h-[77vh] items-center bg-slate-100">
        <View className=" w-[90%] h-12 flex flex-row justify-between border-b">
          <Pressable className="h-10  w-10 flex flex-row justify-center items-center bg-blue-500 rounded-lg ">
            <Text className="text-white">5</Text>
          </Pressable>
          <View className="h-10 w-32 flex flex-row justify-start items-center mr-20 ">
            <Text>Wagyu black paper</Text>
          </View>
          <View className="h-10  w-20 flex flex-row justify-center items-center rounded-xl  gap-x-1">
            <Text>Rp.20000</Text>
          </View>
        </View>
        <View className=" w-[90%] h-12 flex flex-row justify-between border-b mt-5">
          <Pressable className="h-10  w-10 flex flex-row justify-center items-center bg-blue-500 rounded-lg ">
            <Text className="text-white">1</Text>
          </Pressable>
          <View className="h-10 w-32 flex flex-row justify-start items-center mr-20 ">
            <Text>Wagyu Sate</Text>
          </View>
          <View className="h-10  w-20 flex flex-row justify-center items-center rounded-xl  gap-x-1">
            <Text>Rp.25000</Text>
          </View>
        </View>
        <View className=" w-full items-center mt-5">
          <View className=" w-[90%] h-10 flex flex-row justify-between items-center border-b">
            <Text className=" text-lg font-semibold">Subtotal [+ppn]</Text>
            <View>
              <Text className=" text-lg font-semibold text">Rp.25000</Text>
            </View>
          </View>
          <View className="w-full h-16 items-center  mt-5">
            <Pressable className=" w-[90%] h-10 flex flex-row justify-between items-center border-b">
              <Text className="text-lg font-semibold">PaymentMethod</Text>
              <Icon name="right" type="antdesign" size={13} />
            </Pressable>
          </View>
          <View>
            <Pressable className=" flex  flex-row justify-between items-center">
              <Icon name="trash" type="evilicon" color={"red"} />
              <Text className=" text-red-500">Delete Order</Text>
            </Pressable>
          </View>
        </View>
        <View className=" w-full h-32 absolute bottom-0 bg-white flex justify-center items-center rounded-t-3xl ">
          <View className=" w-[90%] h-10 flex flex-row justify-between px-5">
            <Text className="text-lg font-semibold">Subtotal</Text>
            <View>
              <Text className="text-lg font-semibold">Rp.25000</Text>
            </View>
          </View>
          <View className="w-full h-12 flex  justify-center items-center">
          <Pressable className="h-14 w-5/6 flex justify-center items-center bg-[#0D62CA] rounded px-5">
          <Text className="text-white">Place Order</Text>
        </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

export default OrderDetail