"use client";

import { configureStore } from "@reduxjs/toolkit";
import nodesSlice from "./node.slice";
import notificationReducer from "./notification.slice";

export const store = configureStore({
  reducer: {
    notificationReducer: notificationReducer,
    nodesReducer: nodesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
