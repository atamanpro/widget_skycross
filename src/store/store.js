import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../slices/chatSlice.js";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
