import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import sideMenuSlice from "./slice/sideMenuSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    sideMenu: sideMenuSlice,
  },
});