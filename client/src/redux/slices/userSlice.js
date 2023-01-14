import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        value: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
        },

        logout: (state) => {
            state.value = null;
            localStorage.setItem(
                "user",
                JSON.stringify(null)
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;