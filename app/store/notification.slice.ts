"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  isOpen: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const initialState: NotificationState = {
  isOpen: false,
  message: "",
  severity: "info",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity: NotificationState["severity"];
      }>
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideSnackbar: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = notificationSlice.actions;
export default notificationSlice.reducer;
