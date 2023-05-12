//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://83c6-2a06-c701-4e62-f300-2dad-be44-4eb2-8f5a.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;
