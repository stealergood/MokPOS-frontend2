import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(...action.payload);
    },
    updateProduct: (state, action) => {
      const { product_id, product_name, price, stock, category_id, image } =
        action.payload;
      const productToUpdate = state.find(
        (product) => product.product_id === product_id
      );
      if (productToUpdate) {
        productToUpdate.product_name = product_name;
        productToUpdate.price = price;
        productToUpdate.stock = stock;
        productToUpdate.category_id = category_id;
        productToUpdate.image = image;
      }
    },
    deleteProduct: (state, action) => {
      return state.filter(
        (product) => product.product_id !== action.payload.product_id
      );
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } =
  productSlice.actions;
export default productSlice.reducer;
