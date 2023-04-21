//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://f9c3-2a06-c701-4e65-4400-6990-7600-e4bf-f510.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;
