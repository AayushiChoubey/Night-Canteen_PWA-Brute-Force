import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
        value: [],
    },
    reducers: {
        setOrdersRedux: (state, action) => {
            state.value = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setOrdersRedux } = orderSlice.actions;
export default orderSlice.reducer;