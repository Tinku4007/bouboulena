// Store.js
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../utils/fetchBaseQuery";
import videoSlice from "./slice/VideoSlice";

const Store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [videoSlice.reducerPath]: videoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)
});

export default Store;
