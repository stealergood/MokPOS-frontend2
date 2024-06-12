import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        category_name: "",
        category_id: "",
    },
    reducers: {
        setCategoryName: (state, action) => {
            state.category_name = action.payload;
        },
        setCategoryId: (state, action) => {
            state.category_id = action.payload;
        },
    },
})

export const { setCategoryName, setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;