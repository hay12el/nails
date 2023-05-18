//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://befd-2a06-c701-4e62-f300-b0bb-4cf-2c42-a548.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;
