import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dishesReducer from "./slices/dishSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/orderSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        dishes: dishesReducer,
        cart: cartReducer,
        orders: ordersReducer,
    },
});