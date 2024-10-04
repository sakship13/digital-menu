import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import CartReducer from "./CartSlice"


export const store = configureStore({
    reducer:{
        cart: CartReducer,
    }
});
