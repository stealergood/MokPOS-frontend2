import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        cart: [],
        product_name: "",
        product_price: "",
        product_image: "",
        product_category: "",
        product_stock: "",
    },
    
}) 