//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://9740-77-127-183-151.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;
