import { createSlice } from "@reduxjs/toolkit";

export const sideMenuSlice = createSlice({
    name: "sideMenu",
    initialState: {
        isMenuVisible: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuVisible = !state.isMenuVisible;
        },
    },
})

export const { toggleMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;