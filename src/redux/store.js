import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import sideMenuSlice from "./slice/sideMenuSlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categoryReducer,
    sideMenu: sideMenuSlice,
    cart: cartSlice,
  },
});