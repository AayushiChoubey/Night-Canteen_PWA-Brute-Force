import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dishesReducer from "./slices/dishSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        dishes: dishesReducer
    },
});