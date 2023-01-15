import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        value: [],
    },
    reducers: {
        addDishCartRedux: (state, action) => {
            const tempDishes = state.value;
            const dishId = action.payload;
            const index = tempDishes.findIndex((dish) => dish['dishId'] === dishId);
            if (index === -1) {
                tempDishes.push({
                    dishId: dishId,
                    dishCount: 1,
                });
            } else {
                tempDishes[index]['dishCount'] += 1;
            }

            state.value = tempDishes;
        },
        removeDishCartRedux: (state, action) => {
            const tempDishes = state.value;
            const dishId = action.payload;
            const index = tempDishes.findIndex((dish) => dish['dishId'] === dishId);
            if (index !== -1) {
                tempDishes[index]['dishCount'] -= 1;
                if (tempDishes[index]['dishCount'] === 0) {
                    tempDishes.splice(index, 1);
                }
            }

            state.value = tempDishes;
        }
    },
});

// Action creators are generated for each case reducer function
export const { addDishCartRedux, removeDishCartRedux } = cartSlice.actions;
export default cartSlice.reducer;