import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.find(item => item.product_id === action.payload);
      if (existingItem) {
        return state.filter(item => item.product_id !== action.payload);
      }
    },
    updateCart: (state, action) => {
      const { product_id, quantity } = action.payload;
      const productToUpdate = state.find(product => product.product_id === product_id);
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
    },
    clearCart: (state) => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;