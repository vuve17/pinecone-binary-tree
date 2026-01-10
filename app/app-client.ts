import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api/node",
  headers: {
    "Content-Type": "application/json",
  },
});