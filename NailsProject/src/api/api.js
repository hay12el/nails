//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://8b48-207-232-14-60.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;
