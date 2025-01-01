import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./slices/selected-order-slice";
import addressReducer from "./slices/selected-address-slice.ts";

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
