import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    setCategory: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(...action.payload);
    },
    updateCategory: (state, action) => {
      const { category_id, category_name } = action.payload;
      const categoryToUpdate = state.find(
        (category) => category.category_id === category_id
      );
      if (categoryToUpdate) {
        categoryToUpdate.category_name = category_name;
      }
    },
    deleteCategory: (state, action) => {
      return state.filter(
        (category) => category.category_id !== action.payload.category_id
      );
    },
  },
});

export const { setCategory, addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
