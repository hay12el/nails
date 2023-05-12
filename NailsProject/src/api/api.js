//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://e69c-2001-4df7-1-e568-d177-f148-4eb9-85b6.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;
