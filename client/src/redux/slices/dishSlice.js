import { createSlice } from "@reduxjs/toolkit";

export const dishSlice = createSlice({
    name: "dishSlice",
    initialState: {
        value: [],
    },
    reducers: {
        setDishesRedux: (state, action) => {
            state.value = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setDishesRedux } = dishSlice.actions;
export default dishSlice.reducer;