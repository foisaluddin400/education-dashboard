import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./api/Slice"
export const store = configureStore({
category:  categoryReducer
})