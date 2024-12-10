import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { productsReducer } from "./reducers/productsReducer";

export const store= configureStore({
   reducer:{
    userReducer,productsReducer
   }
});
